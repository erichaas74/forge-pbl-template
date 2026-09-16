import {
  SimulationDecisionRuntimeService
} from "./chunk-F6SP4N5W.js";
import {
  Component,
  HostListener,
  Injector,
  Input,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  viewChild,
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
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate5,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";

// src/app/templates/simulation-decision/ui/pages/final-showcase.component.ts
var _c0 = ["presentationStage"];
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.goodId;
var _forTrack2 = ($index, $item) => $item.definition.id;
function SimulationFinalShowcaseComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li")(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275classProp("complete", item_r1.complete);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.complete ? "\u2713" : "\u25CB");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r1.label, " ");
  }
}
function SimulationFinalShowcaseComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_For_34_Template_button_click_0_listener() {
      const \u0275$index_59_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setSlide(\u0275$index_59_r3));
    });
    \u0275\u0275domElementStart(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const slide_r5 = ctx.$implicit;
    const \u0275$index_59_r3 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r3.activeSlide() === \u0275$index_59_r3);
    \u0275\u0275attribute("aria-current", ctx_r3.activeSlide() === \u0275$index_59_r3 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slide_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_59_r3 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slide_r5.shortLabel);
  }
}
function SimulationFinalShowcaseComponent_Case_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 23)(1, "div", 24)(2, "span", 25);
    \u0275\u0275text(3, "Our trading season");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, " We will show the route we chose, the load we funded, the math that proves our result, and the change we would make next. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 26)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "i", 22);
    \u0275\u0275text(12, "\u2192");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(15, "div", 27)(16, "article")(17, "small");
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275domElementStart(21, "span");
    \u0275\u0275text(22, "/100");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(23, "article")(24, "small");
    \u0275\u0275text(25, "Net profit / loss");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(28, "article")(29, "small");
    \u0275\u0275text(30, "Final cash");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", "linear-gradient(90deg, #130c08ed 0 38%, #130c0870 64%, #130c082e), url(" + (ctx_r3.runtime.config.world.setupSceneAsset ?? ctx_r3.runtime.config.world.mapSceneAsset ?? "") + ")");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.state().companyName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.startLocation()?.shortName ?? "Starting post");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.destination()?.shortName ?? "Destination");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.readOnly() ? "Simulation score \xB7 not a grade" : "Verified game score");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.results().score);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.runtime.results().netProfitCents, true));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.runtime.results().endingCashCents));
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "image", 31);
  }
  if (rf & 2) {
    \u0275\u0275attribute("href", ctx);
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path", 37)(1, "path", 38);
  }
  if (rf & 2) {
    const selectedRoute_r6 = ctx;
    \u0275\u0275attribute("d", selectedRoute_r6.path);
    \u0275\u0275advance();
    \u0275\u0275attribute("d", selectedRoute_r6.path);
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "circle", 32);
  }
  if (rf & 2) {
    const start_r7 = ctx;
    \u0275\u0275attribute("cx", start_r7.mapX)("cy", start_r7.mapY);
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "circle", 33);
  }
  if (rf & 2) {
    const end_r8 = ctx;
    \u0275\u0275attribute("cx", end_r8.mapX)("cy", end_r8.mapY);
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selectedRoute_r9 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(selectedRoute_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", selectedRoute_r9.distanceMiles, " miles \xB7 ", selectedRoute_r9.estimatedDays, " days \xB7 ", ctx_r3.runtime.money(selectedRoute_r9.supplyCostCents), " supplies");
  }
}
function SimulationFinalShowcaseComponent_Case_40_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1, "No completed route record");
    \u0275\u0275domElementEnd();
  }
}
function SimulationFinalShowcaseComponent_Case_40_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div")(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "small");
    \u0275\u0275text(12, "spaces");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div")(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "small");
    \u0275\u0275text(17, "cost");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r10.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", row_r10.quantity, " units");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r10.cargoSpaces);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(row_r10.costCents));
  }
}
function SimulationFinalShowcaseComponent_Case_40_ForEmpty_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "No purchase records are available.");
    \u0275\u0275domElementEnd();
  }
}
function SimulationFinalShowcaseComponent_Case_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 15)(1, "header")(2, "span", 25);
    \u0275\u0275text(3, "Decision 1");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5, "Our route and load had to fit together");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, " Explain the constraint first, then point to the numbers that made the plan feasible. ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 28)(9, "figure", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(10, "svg", 30);
    \u0275\u0275conditionalCreate(11, SimulationFinalShowcaseComponent_Case_40_Conditional_11_Template, 1, 1, ":svg:image", 31);
    \u0275\u0275conditionalCreate(12, SimulationFinalShowcaseComponent_Case_40_Conditional_12_Template, 2, 2);
    \u0275\u0275conditionalCreate(13, SimulationFinalShowcaseComponent_Case_40_Conditional_13_Template, 1, 2, ":svg:circle", 32);
    \u0275\u0275conditionalCreate(14, SimulationFinalShowcaseComponent_Case_40_Conditional_14_Template, 1, 2, ":svg:circle", 33);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(15, "figcaption");
    \u0275\u0275conditionalCreate(16, SimulationFinalShowcaseComponent_Case_40_Conditional_16_Template, 4, 4)(17, SimulationFinalShowcaseComponent_Case_40_Conditional_17_Template, 2, 0, "strong");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(18, "section", 34)(19, "header")(20, "div")(21, "span", 25);
    \u0275\u0275text(22, "Original purchases");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(23, "h3");
    \u0275\u0275text(24, "What we loaded");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(27, "div", 35);
    \u0275\u0275domElement(28, "i");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(29, "div", 36);
    \u0275\u0275repeaterCreate(30, SimulationFinalShowcaseComponent_Case_40_For_31_Template, 18, 5, "article", null, _forTrack1, false, SimulationFinalShowcaseComponent_Case_40_ForEmpty_32_Template, 2, 0, "p");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.runtime.config.world.mapSceneAsset) ? 11 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r3.route()) ? 12 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r3.startLocation()) ? 13 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r3.destination()) ? 14 : -1, tmp_5_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_6_0 = ctx_r3.route()) ? 16 : 17, tmp_6_0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r3.plannedCargoSpaces(), " spaces purchased");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r3.runtime.capacity() === 0 ? 0 : ctx_r3.Math.min(100, ctx_r3.plannedCargoSpaces() / ctx_r3.runtime.capacity() * 100), "%");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.loadRows());
  }
}
function SimulationFinalShowcaseComponent_Case_41_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "span", 40);
    \u0275\u0275text(2, "1");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "small");
    \u0275\u0275text(5, "Forecast before departure");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const tripForecast_r11 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate3(" ", ctx_r3.runtime.money(tripForecast_r11.expectedSalesRevenueCents), " \u2212 ", ctx_r3.runtime.money(tripForecast_r11.goodsCostCents), " \u2212 ", ctx_r3.runtime.money(ctx_r3.route()?.supplyCostCents ?? 0), " = ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(tripForecast_r11.expectedTripProfitCents, true));
  }
}
function SimulationFinalShowcaseComponent_Case_41_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 42)(1, "small");
    \u0275\u0275text(2, "Forecast error \xB7 actual minus forecast");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "A smaller absolute difference means the forecast was more accurate.");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.forecastErrorCents(), true));
  }
}
function SimulationFinalShowcaseComponent_Case_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 16)(1, "header")(2, "span", 25);
    \u0275\u0275text(3, "Decision 2");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5, "The mathematics that proves our result");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "Read each equation aloud and explain what every number represents.");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 39);
    \u0275\u0275conditionalCreate(9, SimulationFinalShowcaseComponent_Case_41_Conditional_9_Template, 10, 4, "article");
    \u0275\u0275domElementStart(10, "article")(11, "span", 40);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div")(14, "small");
    \u0275\u0275text(15, "Actual trip profit after events");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(20, "article", 41)(21, "span", 40);
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(23, "div")(24, "small");
    \u0275\u0275text(25, "Final cash audit");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "p");
    \u0275\u0275text(27);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275conditionalCreate(32, SimulationFinalShowcaseComponent_Case_41_Conditional_32_Template, 7, 1, "div", 42);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.forecast()) ? 9 : -1, tmp_2_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.forecast() ? 2 : 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate5(" ", ctx_r3.runtime.money(ctx_r3.runtime.results().salesRevenueCents), " \u2212 ", ctx_r3.runtime.money(ctx_r3.forecast()?.goodsCostCents ?? ctx_r3.runtime.results().goodsPurchasedCents), " \u2212 ", ctx_r3.runtime.money(ctx_r3.runtime.results().supplyCostsCents), " \u2212 ", ctx_r3.runtime.money(ctx_r3.runtime.results().eventExpensesCents), " + ", ctx_r3.runtime.money(ctx_r3.runtime.results().eventIncomeCents), " = ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.actualTripProfitCents(), true));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.forecast() ? 3 : 2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.money(ctx_r3.runtime.results().startingCashCents), " \u2212 costs + revenue =");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.runtime.results().endingCashCents));
    \u0275\u0275advance();
    \u0275\u0275classProp("verified", ctx_r3.runtime.reconciled());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.runtime.reconciled() ? "\u2713 Official money record reconciles" : "Audit needs review", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.forecast() ? 32 : -1);
  }
}
function SimulationFinalShowcaseComponent_Case_42_Conditional_8_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1, "Our revised strategy");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.reportHighlights().at(-1)?.state?.response);
  }
}
function SimulationFinalShowcaseComponent_Case_42_Conditional_8_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1, "Defense sentence");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3, "\u201CWhen _____ changed by _____, we _____ because _____.\u201D");
    \u0275\u0275domElementEnd();
  }
}
function SimulationFinalShowcaseComponent_Case_42_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 43)(1, "article", 45)(2, "span", 46);
    \u0275\u0275text(3, "!");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div")(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "h3");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(11, "div", 47)(12, "article")(13, "small");
    \u0275\u0275text(14, "Cash before");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "span", 22);
    \u0275\u0275text(18, "\u2192");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "article")(20, "small");
    \u0275\u0275text(21, "Cash after");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(24, "article", 48)(25, "small");
    \u0275\u0275text(26, "Recorded change");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(29, "blockquote")(30, "small");
    \u0275\u0275text(31, "Our recorded reasoning");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(32, "p");
    \u0275\u0275text(33);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(34, "div", 49);
    \u0275\u0275conditionalCreate(35, SimulationFinalShowcaseComponent_Case_42_Conditional_8_Conditional_35_Template, 4, 1)(36, SimulationFinalShowcaseComponent_Case_42_Conditional_8_Conditional_36_Template, 4, 0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const event_r12 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Trail challenge \xB7 Day ", event_r12.day);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.eventTitle(event_r12));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r12.outcome);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(event_r12.cashBeforeCents));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(event_r12.cashAfterCents));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.eventCashChange(event_r12), true));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(event_r12.reasoning || "No written reasoning was recorded for this event.");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.readOnly() ? 35 : 36);
  }
}
function SimulationFinalShowcaseComponent_Case_42_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 44)(1, "span", 22);
    \u0275\u0275text(2, "\u25CB");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4, "No resolved trail event is available");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "Use a route, cargo, or price decision as the revision example.");
    \u0275\u0275domElementEnd()();
  }
}
function SimulationFinalShowcaseComponent_Case_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 17)(1, "header")(2, "span", 25);
    \u0275\u0275text(3, "Decision 3");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5, "What changed and how we adapted");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "Name the changed number, explain its effect, and defend the response.");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(8, SimulationFinalShowcaseComponent_Case_42_Conditional_8_Template, 37, 8, "div", 43)(9, SimulationFinalShowcaseComponent_Case_42_Conditional_9_Template, 7, 0, "div", 44);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.mostImpactfulEvent()) ? 8 : 9, tmp_2_0);
  }
}
function SimulationFinalShowcaseComponent_Case_43_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const sale_r14 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.goodName(sale_r14.entry));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.money(sale_r14.profitCents, true), " sale profit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r3.runtime.money(sale_r14.entry.cashChangeCents), " received \u2212 ", ctx_r3.runtime.money(sale_r14.entry.details?.costBasisCents ?? 0), " cost basis ");
  }
}
function SimulationFinalShowcaseComponent_Case_43_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3");
    \u0275\u0275text(1, "Our audited result");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5, "Use the final cash equation as the main evidence.");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.runtime.money(ctx_r3.runtime.results().netProfitCents, true));
  }
}
function SimulationFinalShowcaseComponent_Case_43_For_31_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "code");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r16.state.calculation);
  }
}
function SimulationFinalShowcaseComponent_Case_43_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, SimulationFinalShowcaseComponent_Case_43_For_31_Conditional_5_Template, 2, 1, "code");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r16.definition.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r16.state.response);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r16.state.calculation ? 5 : -1);
  }
}
function SimulationFinalShowcaseComponent_Case_43_ForEmpty_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1, "Complete the reflection to bring prepared claims into this presentation.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 7);
    \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Case_43_ForEmpty_32_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.navigate("report"));
    });
    \u0275\u0275text(3, "Open reflection");
    \u0275\u0275domElementEnd();
  }
}
function SimulationFinalShowcaseComponent_Case_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 18)(1, "header")(2, "span", 25);
    \u0275\u0275text(3, "Final defense");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2");
    \u0275\u0275text(5, "Make the claim, show the record, answer another group");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "Every answer should include one number and one saved game record.");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 50)(9, "section", 51)(10, "span", 25);
    \u0275\u0275text(11, "Our strongest evidence");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(12, SimulationFinalShowcaseComponent_Case_43_Conditional_12_Template, 6, 4)(13, SimulationFinalShowcaseComponent_Case_43_Conditional_13_Template, 6, 1);
    \u0275\u0275domElementStart(14, "div", 52)(15, "span");
    \u0275\u0275text(16, "Trade ");
    \u0275\u0275domElementStart(17, "b");
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "span");
    \u0275\u0275text(20, "Math ");
    \u0275\u0275domElementStart(21, "b");
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "span");
    \u0275\u0275text(24, "Explain ");
    \u0275\u0275domElementStart(25, "b");
    \u0275\u0275text(26);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(27, "section", 53)(28, "span", 25);
    \u0275\u0275text(29, "Prepared claims");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(30, SimulationFinalShowcaseComponent_Case_43_For_31_Template, 6, 3, "details", null, _forTrack2, false, SimulationFinalShowcaseComponent_Case_43_ForEmpty_32_Template, 4, 0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(33, "section", 54)(34, "span", 25);
    \u0275\u0275text(35, "Another group asks");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "blockquote");
    \u0275\u0275text(37);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(38, "button", 7);
    \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Case_43_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.nextAudiencePrompt());
    });
    \u0275\u0275text(39, "Draw another question \u21BB");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(40, "ol")(41, "li");
    \u0275\u0275text(42, "Questioning group asks the displayed question.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(43, "li");
    \u0275\u0275text(44, "Presenters answer with one number and one record.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(45, "li");
    \u0275\u0275text(46, "Questioning group names one clear strength and one follow-up.");
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.strongestSale()) ? 12 : 13, tmp_2_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.results().tradingScore, "/40");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.results().mathScore, "/40");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r3.runtime.results().explanationScore, "/20");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.reportHighlights().slice(0, 3));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r3.audiencePrompt());
  }
}
var SimulationFinalShowcaseComponent = class _SimulationFinalShowcaseComponent {
  runtime = inject(SimulationDecisionRuntimeService);
  readOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "readOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stage = viewChild(
    "presentationStage",
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  Math = Math;
  activeSlide = signal(
    0,
    ...ngDevMode ? [{ debugName: "activeSlide" }] : (
      /* istanbul ignore next */
      []
    )
  );
  presenting = signal(
    false,
    ...ngDevMode ? [{ debugName: "presenting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timerRunning = signal(
    false,
    ...ngDevMode ? [{ debugName: "timerRunning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  remainingSeconds = signal(
    this.runtime.config.finalShowcase?.pitchSeconds ?? 180,
    ...ngDevMode ? [{ debugName: "remainingSeconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audiencePromptIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "audiencePromptIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  slides = [
    { label: "Season result", shortLabel: "Result", icon: "\u2605" },
    { label: "Route and load", shortLabel: "Plan", icon: "\u2301" },
    { label: "Math proof", shortLabel: "Math", icon: "\xF7" },
    { label: "Adaptation", shortLabel: "Revise", icon: "\u21BB" },
    { label: "Team defense", shortLabel: "Defend", icon: "\u2726" }
  ];
  primaryJourney = computed(
    () => this.runtime.state().routeHistory.at(-1),
    ...ngDevMode ? [{ debugName: "primaryJourney" }] : (
      /* istanbul ignore next */
      []
    )
  );
  route = computed(
    () => this.primaryJourney()?.knownInfoSnapshot,
    ...ngDevMode ? [{ debugName: "route" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startLocation = computed(
    () => this.runtime.config.locations.find((location) => location.id === this.route()?.fromLocationId),
    ...ngDevMode ? [{ debugName: "startLocation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  destination = computed(
    () => this.runtime.config.locations.find((location) => location.id === this.route()?.toLocationId),
    ...ngDevMode ? [{ debugName: "destination" }] : (
      /* istanbul ignore next */
      []
    )
  );
  forecast = computed(
    () => this.primaryJourney()?.forecast,
    ...ngDevMode ? [{ debugName: "forecast" }] : (
      /* istanbul ignore next */
      []
    )
  );
  actualTripProfitCents = computed(
    () => this.runtime.results().salesRevenueCents - (this.forecast()?.goodsCostCents ?? this.runtime.results().goodsPurchasedCents) - this.runtime.results().supplyCostsCents - this.runtime.results().eventExpensesCents + this.runtime.results().eventIncomeCents,
    ...ngDevMode ? [{ debugName: "actualTripProfitCents" }] : (
      /* istanbul ignore next */
      []
    )
  );
  forecastErrorCents = computed(
    () => this.actualTripProfitCents() - (this.forecast()?.expectedTripProfitCents ?? 0),
    ...ngDevMode ? [{ debugName: "forecastErrorCents" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadRows = computed(
    () => {
      const rows = /* @__PURE__ */ new Map();
      const ledger = this.runtime.state().ledger;
      const firstTravelIndex = ledger.findIndex((entry) => entry.type === "travel");
      const openingEntries = ledger.slice(0, firstTravelIndex < 0 ? ledger.length : firstTravelIndex);
      for (const entry of openingEntries) {
        if (entry.type !== "purchase" || entry.details?.goodId === void 0)
          continue;
        const good = this.runtime.config.goods.find((item) => item.id === entry.details?.goodId);
        if (good === void 0)
          continue;
        const quantity = entry.details.quantity ?? 0;
        const current = rows.get(good.id);
        rows.set(good.id, {
          goodId: good.id,
          name: good.name,
          icon: good.icon,
          quantity: (current?.quantity ?? 0) + quantity,
          cargoSpaces: (current?.cargoSpaces ?? 0) + quantity * good.unitCargo,
          costCents: (current?.costCents ?? 0) + Math.abs(entry.cashChangeCents)
        });
      }
      return [...rows.values()].sort((left, right) => right.costCents - left.costCents);
    },
    ...ngDevMode ? [{ debugName: "loadRows" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plannedCargoSpaces = computed(
    () => this.loadRows().reduce((total, row) => total + row.cargoSpaces, 0),
    ...ngDevMode ? [{ debugName: "plannedCargoSpaces" }] : (
      /* istanbul ignore next */
      []
    )
  );
  strongestSale = computed(
    () => this.runtime.state().ledger.filter((entry) => entry.type === "sale").map((entry) => ({
      entry,
      profitCents: entry.cashChangeCents - (entry.details?.costBasisCents ?? 0)
    })).sort((left, right) => right.profitCents - left.profitCents)[0],
    ...ngDevMode ? [{ debugName: "strongestSale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mostImpactfulEvent = computed(
    () => [...this.runtime.state().eventHistory].sort((left, right) => this.eventImpact(right) - this.eventImpact(left))[0],
    ...ngDevMode ? [{ debugName: "mostImpactfulEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reportHighlights = computed(
    () => this.runtime.config.reportSections.map((definition) => ({
      definition,
      state: this.runtime.state().report.sections[definition.id]
    })).filter((item) => (item.state?.response.trim().length ?? 0) > 0),
    ...ngDevMode ? [{ debugName: "reportHighlights" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readiness = computed(
    () => [
      {
        label: "Season complete",
        complete: ["season_complete", "submitted"].includes(this.runtime.state().status)
      },
      { label: "Money audit reconciles", complete: this.runtime.reconciled() },
      { label: "Route record saved", complete: this.runtime.state().routeHistory.length > 0 },
      {
        label: "Math explanation ready",
        complete: this.runtime.config.reportSections.filter((section) => section.calculationRequired).every((section) => (this.runtime.state().report.sections[section.id]?.calculation.trim().length ?? 0) > 0)
      }
    ],
    ...ngDevMode ? [{ debugName: "readiness" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readyCount = computed(
    () => this.readiness().filter((item) => item.complete).length,
    ...ngDevMode ? [{ debugName: "readyCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audiencePrompts = computed(
    () => this.runtime.config.finalShowcase?.audiencePrompts ?? [
      "Which calculation best supports your strategy?"
    ],
    ...ngDevMode ? [{ debugName: "audiencePrompts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audiencePrompt = computed(
    () => this.audiencePrompts()[this.audiencePromptIndex()] ?? this.audiencePrompts()[0],
    ...ngDevMode ? [{ debugName: "audiencePrompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timerLabel = computed(
    () => {
      const minutes = Math.floor(this.remainingSeconds() / 60);
      const seconds = this.remainingSeconds() % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
    ...ngDevMode ? [{ debugName: "timerLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  usePresentationKeys(event) {
    const target = event.target;
    if (target?.matches('input, textarea, select, [contenteditable="true"]'))
      return;
    if (event.key === "ArrowRight" || event.key === "PageDown")
      this.moveSlide(1);
    else if (event.key === "ArrowLeft" || event.key === "PageUp")
      this.moveSlide(-1);
    else if (event.key === "Home")
      this.setSlide(0);
    else if (event.key === "End")
      this.setSlide(this.slides.length - 1);
    else if (event.key === "Escape" && this.presenting())
      this.presenting.set(false);
    else
      return;
    event.preventDefault();
  }
  setSlide(index) {
    this.activeSlide.set(Math.min(this.slides.length - 1, Math.max(0, index)));
    afterNextRender(() => {
      const element = this.stage()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  moveSlide(change) {
    this.setSlide(this.activeSlide() + change);
  }
  toggleTimer() {
    if (this.timerRunning()) {
      this.stopTimer();
      return;
    }
    if (this.remainingSeconds() === 0)
      this.resetTimer();
    this.timerRunning.set(true);
    this.timer = setInterval(() => {
      this.remainingSeconds.update((seconds) => Math.max(0, seconds - 1));
      if (this.remainingSeconds() === 0)
        this.stopTimer();
    }, 1e3);
  }
  resetTimer() {
    this.stopTimer();
    this.remainingSeconds.set(this.runtime.config.finalShowcase?.pitchSeconds ?? 180);
  }
  nextAudiencePrompt() {
    const count = this.audiencePrompts().length;
    if (count === 0)
      return;
    this.audiencePromptIndex.update((index) => (index + 1) % count);
  }
  goodName(entry) {
    return this.runtime.config.goods.find((good) => good.id === entry.details?.goodId)?.name ?? entry.description;
  }
  eventTitle(entry) {
    return this.runtime.config.events.find((event) => event.id === entry.eventId)?.title ?? "Trail event";
  }
  eventCashChange(entry) {
    return entry.cashAfterCents - entry.cashBeforeCents;
  }
  print() {
    window.print();
  }
  eventImpact(entry) {
    return Math.abs(this.eventCashChange(entry)) + Math.abs(entry.cargoAfter - entry.cargoBefore) * 100;
  }
  stopTimer() {
    clearInterval(this.timer);
    this.timer = void 0;
    this.timerRunning.set(false);
  }
  static \u0275fac = function SimulationFinalShowcaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SimulationFinalShowcaseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SimulationFinalShowcaseComponent, selectors: [["app-simulation-final-showcase"]], viewQuery: function SimulationFinalShowcaseComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.stage, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function SimulationFinalShowcaseComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function SimulationFinalShowcaseComponent_keydown_HostBindingHandler($event) {
        return ctx.usePresentationKeys($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { readOnly: [1, "readOnly"] }, decls: 54, vars: 16, consts: [["presentationStage", ""], ["aria-labelledby", "showcase-title", 1, "showcase-page"], [1, "showcase-header", "page-card"], [1, "eyebrow"], ["id", "showcase-title"], [1, "showcase-actions"], ["aria-live", "polite", 1, "pitch-timer"], ["type", "button", 3, "click"], ["aria-label", "Showcase readiness", 1, "showcase-readiness", "page-card"], [3, "complete"], ["aria-label", "Showcase sections", 1, "showcase-nav", "page-card"], ["type", "button", 3, "active"], ["tabindex", "-1", 1, "showcase-stage", "page-card"], [1, "slide-count"], [1, "showcase-slide", "opening-slide", 3, "background-image"], [1, "showcase-slide", "plan-slide"], [1, "showcase-slide", "math-slide"], [1, "showcase-slide", "revision-slide"], [1, "showcase-slide", "defense-slide"], [1, "showcase-footer", "page-card"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "primary", 3, "click", "disabled"], ["aria-hidden", "true"], [1, "showcase-slide", "opening-slide"], [1, "opening-copy"], [1, "slide-kicker"], [1, "opening-route"], [1, "headline-results"], [1, "plan-layout"], [1, "showcase-map"], ["viewBox", "0 0 100 80", "role", "img", "aria-label", "Selected company route"], ["width", "100", "height", "80", "preserveAspectRatio", "none"], ["r", "2.3", 1, "route-start"], ["r", "3", 1, "route-end"], [1, "load-proof"], ["aria-label", "Purchased cargo compared with capacity", 1, "capacity-bar"], [1, "load-rows"], [1, "route-glow"], [1, "route-line"], [1, "math-board"], [1, "equation-number"], [1, "audit-equation"], [1, "forecast-error"], [1, "revision-story"], [1, "missing-slide-data"], [1, "event-card"], ["aria-hidden", "true", 1, "event-mark"], [1, "before-after"], [1, "change"], [1, "revision-prompt"], [1, "defense-layout"], [1, "claim-card"], [1, "score-three"], [1, "reflection-proof"], [1, "audience-challenge"]], template: function SimulationFinalShowcaseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 1)(1, "header", 2)(2, "div")(3, "span", 3);
      \u0275\u0275text(4, "Final company defense");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1", 4);
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p");
      \u0275\u0275text(8, "Present the decision, prove the mathematics, explain the revision, and answer a peer.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 5)(10, "div", 6)(11, "small");
      \u0275\u0275text(12, "Pitch timer");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "strong");
      \u0275\u0275text(14);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(15, "button", 7);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_15_listener() {
        return ctx.toggleTimer();
      });
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "button", 7);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_17_listener() {
        return ctx.resetTimer();
      });
      \u0275\u0275text(18, "Reset");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "button", 7);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_19_listener() {
        return ctx.presenting.set(!ctx.presenting());
      });
      \u0275\u0275text(20);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 7);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_21_listener() {
        return ctx.print();
      });
      \u0275\u0275text(22, "Print slide");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(23, "section", 8)(24, "div")(25, "small");
      \u0275\u0275text(26, "Ready to present");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "strong");
      \u0275\u0275text(28);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(29, "ul");
      \u0275\u0275repeaterCreate(30, SimulationFinalShowcaseComponent_For_31_Template, 4, 4, "li", 9, _forTrack0);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(32, "nav", 10);
      \u0275\u0275repeaterCreate(33, SimulationFinalShowcaseComponent_For_34_Template, 7, 6, "button", 11, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "main", 12, 0)(37, "div", 13);
      \u0275\u0275text(38);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(39, SimulationFinalShowcaseComponent_Case_39_Template, 33, 9, "section", 14)(40, SimulationFinalShowcaseComponent_Case_40_Template, 33, 9, "section", 15)(41, SimulationFinalShowcaseComponent_Case_41_Template, 33, 15, "section", 16)(42, SimulationFinalShowcaseComponent_Case_42_Template, 10, 1, "section", 17)(43, SimulationFinalShowcaseComponent_Case_43_Template, 47, 6, "section", 18);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(44, "footer", 19)(45, "button", 20);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_45_listener() {
        return ctx.moveSlide(-1);
      });
      \u0275\u0275text(46, " \u2190 Previous ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(47, "div")(48, "strong");
      \u0275\u0275text(49);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(50, "span");
      \u0275\u0275text(51, "Use \u2190 and \u2192 to move during the presentation.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(52, "button", 21);
      \u0275\u0275domListener("click", function SimulationFinalShowcaseComponent_Template_button_click_52_listener() {
        return ctx.moveSlide(1);
      });
      \u0275\u0275text(53, " Next \u2192 ");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      let tmp_11_0;
      \u0275\u0275classProp("presenting", ctx.presenting());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.config.finalShowcase?.title ?? "Final Strategy Showcase", " ");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("warning", ctx.remainingSeconds() <= 30);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.timerLabel());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.timerRunning() ? "Pause" : ctx.remainingSeconds() === 0 ? "Restart" : "Start timer", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.presenting() ? "Exit presentation" : "Present", " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2("", ctx.readyCount(), " / ", ctx.readiness().length);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.readiness());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.slides);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.activeSlide() + 1, " / ", ctx.slides.length);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.activeSlide()) === 0 ? 39 : tmp_11_0 === 1 ? 40 : tmp_11_0 === 2 ? 41 : tmp_11_0 === 3 ? 42 : tmp_11_0 === 4 ? 43 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275domProperty("disabled", ctx.activeSlide() === 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.slides[ctx.activeSlide()].label);
      \u0275\u0275advance(3);
      \u0275\u0275domProperty("disabled", ctx.activeSlide() === ctx.slides.length - 1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #30271d;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%], \ndl[_ngcontent-%COMP%], \nfigure[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.page-card[_ngcontent-%COMP%] {\n  border: 1px solid #bda984;\n  border-radius: 0.55rem;\n  background: rgba(255, 251, 240, 0.96);\n  box-shadow: 0 0.2rem 0.8rem rgba(59, 40, 20, 0.12);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #825325;\n  font-size: 0.72rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.primary[_ngcontent-%COMP%], \n.secondary[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  border-radius: 0.38rem;\n  padding: 0.65rem 1rem;\n  font-weight: 800;\n}\n.primary[_ngcontent-%COMP%] {\n  border: 1px solid #174f5c;\n  color: #fffdf2;\n  background: linear-gradient(#176778, #0d4a57);\n}\n.secondary[_ngcontent-%COMP%] {\n  border: 1px solid #a68d67;\n  color: #3a2c1c;\n  background: #f6eddc;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \n[tabindex][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #167087;\n  outline-offset: 2px;\n}\n.signed-positive[_ngcontent-%COMP%] {\n  color: #2f672e;\n}\n.signed-negative[_ngcontent-%COMP%] {\n  color: #9d2e1e;\n}\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  color: #473a2a;\n  font-size: 0.8rem;\n  font-weight: 750;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #a99472;\n  border-radius: 0.35rem;\n  padding: 0.65rem;\n  color: #292117;\n  background: #fffdf7;\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  border-radius: 999px;\n  padding: 0.18rem 0.48rem;\n  color: #3b532c;\n  background: #dce6c8;\n  font-size: 0.68rem;\n  font-weight: 800;\n}\n@media (max-width: 700px) {\n  .desktop-table[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n[_nghost-%COMP%] {\n  display: block;\n}\n.showcase-page[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 92rem;\n  margin: 0 auto;\n  gap: 0.7rem;\n}\n.showcase-header[_ngcontent-%COMP%], \n.showcase-actions[_ngcontent-%COMP%], \n.showcase-readiness[_ngcontent-%COMP%], \n.showcase-readiness[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], \n.showcase-nav[_ngcontent-%COMP%], \n.showcase-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.showcase-header[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1rem;\n  color: #f7e7c7;\n  background:\n    linear-gradient(\n      115deg,\n      #21140c,\n      #52331b);\n}\n.showcase-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.12rem 0;\n  color: #fff1cf;\n  font: 800 clamp(1.5rem, 3vw, 2.35rem) Georgia, serif;\n}\n.showcase-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #d8c4a2;\n  font-size: 0.8rem;\n}\n.showcase-actions[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.35rem;\n}\n.showcase-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.showcase-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.defense-slide[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.4rem;\n  border: 1px solid #9c7846;\n  border-radius: 0.35rem;\n  padding: 0.42rem 0.65rem;\n  color: #fff0ca;\n  background: linear-gradient(#594022, #332213);\n  font-weight: 800;\n  cursor: pointer;\n}\n.showcase-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.showcase-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.showcase-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled), \n.showcase-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible {\n  border-color: #edc36c;\n  outline: 3px solid rgba(103, 212, 227, 0.4392156863);\n  outline-offset: 1px;\n}\n.pitch-timer[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 5rem;\n  border: 1px solid #9f7b49;\n  border-radius: 0.35rem;\n  padding: 0.22rem 0.5rem;\n  background: rgba(20, 13, 9, 0.7803921569);\n  text-align: center;\n}\n.pitch-timer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #cdb68d;\n  font-size: 0.55rem;\n  text-transform: uppercase;\n}\n.pitch-timer[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff0bd;\n  font:\n    900 1.25rem ui-monospace,\n    Consolas,\n    monospace;\n}\n.pitch-timer.warning[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff9c71;\n}\n.showcase-readiness[_ngcontent-%COMP%] {\n  gap: 1rem;\n  padding: 0.55rem 0.8rem;\n}\n.showcase-readiness[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  border-right: 1px solid #ccb995;\n  padding-right: 1rem;\n}\n.showcase-readiness[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #75644d;\n  font-size: 0.6rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.showcase-readiness[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1c6372;\n  font-size: 1.2rem;\n}\n.showcase-readiness[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.showcase-readiness[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n  border: 1px solid #c7b79b;\n  border-radius: 999px;\n  padding: 0.25rem 0.5rem;\n  color: #705e48;\n  background: #efe5d2;\n  font-size: 0.67rem;\n  font-weight: 750;\n}\n.showcase-readiness[_ngcontent-%COMP%]   li.complete[_ngcontent-%COMP%] {\n  border-color: #78966f;\n  color: #315d35;\n  background: #e8f0df;\n}\n.showcase-nav[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem;\n  background: #2b1b10;\n}\n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5rem 1rem auto;\n  align-items: center;\n  gap: 0.3rem;\n  min-width: 8rem;\n  color: #d8c4a3;\n  background: #3a2818;\n}\n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1rem;\n  height: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  background: #715232;\n  font-size: 0.55rem;\n}\n.showcase-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #72dbe7;\n  color: #18251e;\n  background: linear-gradient(#f4d990, #c99b45);\n  box-shadow: 0 0 0.8rem rgba(97, 221, 234, 0.3215686275);\n}\n.showcase-stage[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 39rem;\n  overflow: hidden;\n  border: 0.18rem solid #80582e;\n  padding: 0;\n  background: #efe3cc;\n  box-shadow: 0 0.9rem 2rem rgba(27, 16, 10, 0.3215686275);\n}\n.slide-count[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 8;\n  top: 0.7rem;\n  right: 0.7rem;\n  border-radius: 999px;\n  padding: 0.22rem 0.5rem;\n  color: #fff0c9;\n  background: rgba(29, 18, 11, 0.8196078431);\n  font-size: 0.65rem;\n  font-weight: 850;\n}\n.showcase-slide[_ngcontent-%COMP%] {\n  min-height: 39rem;\n  padding: clamp(1rem, 2.5vw, 2rem);\n}\n.showcase-slide[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  max-width: 55rem;\n  margin-bottom: 1rem;\n}\n.showcase-slide[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0.3rem;\n  color: #3c2816;\n  font: 800 clamp(1.55rem, 3vw, 2.5rem) Georgia, serif;\n}\n.showcase-slide[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #69563e;\n}\n.slide-kicker[_ngcontent-%COMP%] {\n  color: #97651f;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.opening-slide[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(18rem, 0.8fr) minmax(18rem, 1.2fr);\n  align-items: center;\n  gap: 2rem;\n  color: #fff0d0;\n  background-position: center;\n  background-size: cover;\n}\n.opening-copy[_ngcontent-%COMP%] {\n  max-width: 34rem;\n}\n.opening-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.8rem;\n  color: #fff1c9;\n  font: 800 clamp(2.4rem, 6vw, 5rem) Georgia, serif;\n  line-height: 0.95;\n  text-shadow: 0 0.2rem 0.35rem #000;\n}\n.opening-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #e1d0b1;\n  line-height: 1.6;\n}\n.opening-route[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 1rem;\n  border-top: 1px solid #b89152;\n  padding-top: 0.7rem;\n  font-size: 1.05rem;\n}\n.opening-route[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #58dcea;\n  font-style: normal;\n}\n.headline-results[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.7rem;\n}\n.headline-results[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  border: 1px solid #d8ad63;\n  border-radius: 0.55rem;\n  padding: 0.9rem;\n  background: rgba(27, 17, 11, 0.862745098);\n  box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.4);\n}\n.headline-results[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:first-child {\n  grid-column: 1/-1;\n}\n.headline-results[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #d3b77e;\n  text-transform: uppercase;\n}\n.headline-results[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff1c4;\n  font: 900 clamp(1.6rem, 4vw, 3.25rem) Georgia, serif;\n}\n.headline-results[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #ccb47f;\n  font-size: 0.4em;\n}\n.plan-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(20rem, 1.2fr) minmax(19rem, 0.8fr);\n  gap: 1rem;\n}\n.showcase-map[_ngcontent-%COMP%] {\n  position: relative;\n  margin: 0;\n  overflow: hidden;\n  border: 0.2rem solid #654525;\n  border-radius: 0.65rem;\n  background: #4b4930;\n  box-shadow: 0 0.6rem 1.1rem rgba(53, 32, 14, 0.3215686275);\n}\n.showcase-map[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 5/4;\n}\n.showcase-map[_ngcontent-%COMP%]   image[_ngcontent-%COMP%] {\n  filter: brightness(0.78) saturate(0.9);\n}\n.route-glow[_ngcontent-%COMP%], \n.route-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-linecap: round;\n  vector-effect: non-scaling-stroke;\n}\n.route-glow[_ngcontent-%COMP%] {\n  stroke: #21170e;\n  stroke-width: 3;\n  opacity: 0.65;\n}\n.route-line[_ngcontent-%COMP%] {\n  stroke: #e9d28d;\n  stroke-width: 1.5;\n  stroke-dasharray: 1.25 0.8;\n}\n.route-start[_ngcontent-%COMP%], \n.route-end[_ngcontent-%COMP%] {\n  stroke: #fff3c4;\n  stroke-width: 0.8;\n}\n.route-start[_ngcontent-%COMP%] {\n  fill: #4fa169;\n}\n.route-end[_ngcontent-%COMP%] {\n  fill: #df9e3f;\n  filter: drop-shadow(0 0 2px #fff0a0);\n}\n.showcase-map[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.7rem;\n  bottom: 0.7rem;\n  left: 0.7rem;\n  display: grid;\n  border: 1px solid #c49b5a;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  color: #fff0ca;\n  background: rgba(33, 20, 13, 0.9098039216);\n}\n.showcase-map[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #cfbea0;\n  font-size: 0.72rem;\n}\n.load-proof[_ngcontent-%COMP%] {\n  border: 1px solid #c7b18b;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background: #fff8e9;\n}\n.load-proof[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n}\n.load-proof[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.1rem 0;\n  font-family: Georgia, serif;\n}\n.load-proof[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #1e6673;\n  font-size: 0.78rem;\n}\n.capacity-bar[_ngcontent-%COMP%] {\n  height: 0.75rem;\n  margin: 0.7rem 0;\n  overflow: hidden;\n  border: 1px solid #9e875f;\n  border-radius: 999px;\n  background: #ded1b9;\n}\n.capacity-bar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #2f7d73,\n      #d9aa45);\n}\n.load-rows[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  max-height: 23rem;\n  overflow: auto;\n}\n.load-rows[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2rem 1fr auto auto;\n  gap: 0.5rem;\n  align-items: center;\n  border-top: 1px solid #dfd2bb;\n  padding: 0.45rem 0;\n}\n.load-rows[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n.load-rows[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 4rem;\n}\n.load-rows[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:not(:first-of-type) {\n  text-align: right;\n}\n.load-rows[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #74654e;\n  font-size: 0.62rem;\n}\n.math-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n}\n.math-board[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 15rem;\n  border: 1px solid #bd9e6c;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: linear-gradient(#fffaf0, #e8d5b4);\n  box-shadow: 0 0.45rem 0.8rem rgba(76, 46, 22, 0.1882352941);\n}\n.equation-number[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.25rem;\n  height: 2.25rem;\n  margin-bottom: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #216b78;\n  font-weight: 900;\n}\n.math-board[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.forecast-error[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #856127;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.math-board[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  font:\n    700 clamp(0.85rem, 1.6vw, 1.15rem) ui-monospace,\n    Consolas,\n    monospace;\n  line-height: 1.65;\n}\n.math-board[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #3d2a18;\n  font: 900 clamp(1.5rem, 3vw, 2.5rem) Georgia, serif;\n}\n.audit-equation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  display: block;\n  margin-top: 0.7rem;\n  color: #8d3d2b;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\n.audit-equation[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child.verified {\n  color: #346a3c;\n}\n.forecast-error[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.2rem 1rem;\n  margin-top: 0.8rem;\n  border-left: 0.35rem solid #cf8d30;\n  padding: 0.7rem 0.9rem;\n  background: #f8e8ca;\n}\n.forecast-error[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  grid-column: 2;\n  color: #5b3718;\n  font: 900 1.7rem Georgia, serif;\n}\n.forecast-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6d5c44;\n}\n.revision-story[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.8rem;\n}\n.event-card[_ngcontent-%COMP%], \n.before-after[_ngcontent-%COMP%], \n.revision-story[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%], \n.revision-prompt[_ngcontent-%COMP%], \n.claim-card[_ngcontent-%COMP%], \n.reflection-proof[_ngcontent-%COMP%], \n.audience-challenge[_ngcontent-%COMP%] {\n  border: 1px solid #c3a878;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: #fff8e9;\n  box-shadow: 0 0.4rem 0.8rem rgba(74, 44, 20, 0.1607843137);\n}\n.event-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.8rem;\n}\n.event-mark[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 3.2rem;\n  height: 3.2rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff2c8;\n  background: #9b452d;\n  font: 900 1.8rem Georgia, serif;\n}\n.event-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0.3rem;\n  font-family: Georgia, serif;\n}\n.before-after[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 0.5rem;\n}\n.before-after[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  text-align: center;\n}\n.before-after[_ngcontent-%COMP%]   article.change[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  border-top: 1px solid #d9c5a2;\n  padding-top: 0.5rem;\n}\n.before-after[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #746149;\n}\n.before-after[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #3e2b1a;\n  font: 900 1.5rem Georgia, serif;\n}\n.revision-story[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.revision-story[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  font: italic 1.05rem Georgia, serif;\n  line-height: 1.5;\n}\n.revision-prompt[_ngcontent-%COMP%] {\n  color: #e9ddc5;\n  background:\n    linear-gradient(\n      120deg,\n      #244d4d,\n      #163238);\n}\n.revision-prompt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  color: #fff1c7;\n  font: 700 1.1rem Georgia, serif;\n}\n.missing-slide-data[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 20rem;\n  place-items: center;\n  align-content: center;\n  color: #6d5b45;\n  text-align: center;\n}\n.missing-slide-data[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n.defense-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 0.8fr 0.9fr 1.1fr;\n  gap: 0.8rem;\n}\n.claim-card[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0.5rem 0;\n  color: #2f6570;\n  font: 900 1.7rem Georgia, serif;\n}\n.claim-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.reflection-proof[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0;\n  font-family: Georgia, serif;\n}\n.score-three[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  margin-top: 1rem;\n  border-top: 1px solid #d6c19c;\n  padding-top: 0.7rem;\n}\n.score-three[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.reflection-proof[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #d8c6a6;\n  padding: 0.55rem 0;\n}\n.reflection-proof[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  color: #3d3021;\n  font-weight: 850;\n  cursor: pointer;\n}\n.reflection-proof[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  color: #655640;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.reflection-proof[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  display: block;\n  border-left: 3px solid #37808c;\n  padding: 0.35rem;\n  white-space: pre-wrap;\n}\n.audience-challenge[_ngcontent-%COMP%] {\n  color: #eadbc0;\n  background:\n    linear-gradient(\n      135deg,\n      #2d1c10,\n      #51351d);\n}\n.audience-challenge[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0.6rem 0;\n  color: #fff0be;\n  font: 800 clamp(1.25rem, 2.4vw, 1.8rem) Georgia, serif;\n  line-height: 1.25;\n}\n.audience-challenge[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  border-color: #d5a955;\n  color: #2a1b10;\n  background: #edcf85;\n}\n.audience-challenge[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0.8rem 0 0;\n  padding-left: 1.2rem;\n  color: #dbc9aa;\n  font-size: 0.72rem;\n}\n.showcase-footer[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  gap: 0.8rem;\n  padding: 0.55rem 0.7rem;\n}\n.showcase-footer[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  text-align: center;\n}\n.showcase-footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #77654e;\n  font-size: 0.65rem;\n}\n.showcase-footer[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%] {\n  color: #fff;\n  background: #176b79;\n}\n.showcase-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.showcase-page.presenting[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  max-width: none;\n  overflow: auto;\n  padding: 0.6rem;\n  background: #170e09;\n}\n.showcase-page.presenting[_ngcontent-%COMP%]   .showcase-readiness[_ngcontent-%COMP%] {\n  display: none;\n}\n.showcase-page.presenting[_ngcontent-%COMP%]   .showcase-stage[_ngcontent-%COMP%], \n.showcase-page.presenting[_ngcontent-%COMP%]   .showcase-slide[_ngcontent-%COMP%] {\n  min-height: calc(100dvh - 12rem);\n}\n@media (max-width: 900px) {\n  .showcase-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .showcase-actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .showcase-nav[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    overflow-x: auto;\n  }\n  .showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 7rem;\n  }\n  .plan-layout[_ngcontent-%COMP%], \n   .opening-slide[_ngcontent-%COMP%], \n   .revision-story[_ngcontent-%COMP%], \n   .defense-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .math-board[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .math-board[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    min-height: 0;\n  }\n}\n@media (max-width: 600px) {\n  .showcase-readiness[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .showcase-readiness[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    border-right: 0;\n    border-bottom: 1px solid #ccb995;\n    padding: 0 0 0.5rem;\n  }\n  .showcase-slide[_ngcontent-%COMP%] {\n    padding: 0.8rem;\n  }\n  .headline-results[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .headline-results[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:first-child {\n    grid-column: auto;\n  }\n  .showcase-footer[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media print {\n  .showcase-actions[_ngcontent-%COMP%], \n   .showcase-readiness[_ngcontent-%COMP%], \n   .showcase-nav[_ngcontent-%COMP%], \n   .showcase-footer[_ngcontent-%COMP%], \n   .slide-count[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .showcase-stage[_ngcontent-%COMP%], \n   .showcase-slide[_ngcontent-%COMP%] {\n    min-height: 0;\n    break-inside: avoid;\n  }\n  .showcase-slide[_ngcontent-%COMP%] {\n    display: block !important;\n    break-after: page;\n  }\n}\n.showcase-page[_ngcontent-%COMP%] {\n  height: var(--%NS%presentation-available-height, calc(100dvh - 160px));\n  min-height: 460px;\n  grid-template-rows: auto auto auto minmax(0, 1fr) auto;\n  gap: 6px;\n  overflow: hidden;\n}\n.showcase-header[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n}\n.showcase-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 1.8vw, 28px);\n}\n.showcase-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.showcase-readiness[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n}\n.showcase-nav[_ngcontent-%COMP%] {\n  padding: 4px;\n}\n.showcase-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 6px 12px;\n}\n.showcase-stage[_ngcontent-%COMP%], \n.showcase-slide[_ngcontent-%COMP%] {\n  min-height: 0;\n  height: 100%;\n}\n.showcase-stage[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n.showcase-slide[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.opening-slide[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(26px, 3vw, 44px);\n}\n.showcase-footer[_ngcontent-%COMP%] {\n  background: #fbf4e4;\n}\n.showcase-page.presenting[_ngcontent-%COMP%] {\n  height: 100dvh;\n  min-height: 0;\n  box-sizing: border-box;\n  overflow: hidden;\n  grid-template-rows: auto auto minmax(0, 1fr) auto;\n}\n.showcase-page.presenting[_ngcontent-%COMP%]   .showcase-stage[_ngcontent-%COMP%], \n.showcase-page.presenting[_ngcontent-%COMP%]   .showcase-slide[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n@media (max-width: 700px) {\n  .showcase-page[_ngcontent-%COMP%] {\n    min-height: 560px;\n  }\n  .showcase-readiness[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .showcase-header[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n@media print {\n  .showcase-page[_ngcontent-%COMP%] {\n    height: auto;\n    overflow: visible;\n  }\n  .showcase-stage[_ngcontent-%COMP%], \n   .showcase-slide[_ngcontent-%COMP%] {\n    height: auto;\n    overflow: visible;\n  }\n}\n.showcase-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n/*# sourceMappingURL=final-showcase.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimulationFinalShowcaseComponent, [{
    type: Component,
    args: [{ selector: "app-simulation-final-showcase", template: `<section class="showcase-page" [class.presenting]="presenting()" aria-labelledby="showcase-title">
  <header class="showcase-header page-card">
    <div>
      <span class="eyebrow">Final company defense</span>
      <h1 id="showcase-title">
        {{ runtime.config.finalShowcase?.title ?? 'Final Strategy Showcase' }}
      </h1>
      <p>Present the decision, prove the mathematics, explain the revision, and answer a peer.</p>
    </div>
    <div class="showcase-actions">
      <div class="pitch-timer" [class.warning]="remainingSeconds() <= 30" aria-live="polite">
        <small>Pitch timer</small><strong>{{ timerLabel() }}</strong>
      </div>
      <button type="button" (click)="toggleTimer()">
        {{ timerRunning() ? 'Pause' : remainingSeconds() === 0 ? 'Restart' : 'Start timer' }}
      </button>
      <button type="button" (click)="resetTimer()">Reset</button>
      <button type="button" (click)="presenting.set(!presenting())">
        {{ presenting() ? 'Exit presentation' : 'Present' }}
      </button>
      <button type="button" (click)="print()">Print slide</button>
    </div>
  </header>

  <section class="showcase-readiness page-card" aria-label="Showcase readiness">
    <div>
      <small>Ready to present</small>
      <strong>{{ readyCount() }} / {{ readiness().length }}</strong>
    </div>
    <ul>
      @for (item of readiness(); track item.label) {
        <li [class.complete]="item.complete">
          <span aria-hidden="true">{{ item.complete ? '\u2713' : '\u25CB' }}</span
          >{{ item.label }}
        </li>
      }
    </ul>
  </section>

  <nav class="showcase-nav page-card" aria-label="Showcase sections">
    @for (slide of slides; track slide.label; let index = $index) {
      <button
        type="button"
        [class.active]="activeSlide() === index"
        [attr.aria-current]="activeSlide() === index ? 'step' : null"
        (click)="setSlide(index)"
      >
        <span aria-hidden="true">{{ slide.icon }}</span>
        <small>{{ index + 1 }}</small>
        <strong>{{ slide.shortLabel }}</strong>
      </button>
    }
  </nav>

  <main #presentationStage class="showcase-stage page-card" tabindex="-1">
    <div class="slide-count">{{ activeSlide() + 1 }} / {{ slides.length }}</div>
    @switch (activeSlide()) {
      @case (0) {
        <section
          class="showcase-slide opening-slide"
          [style.background-image]="
            'linear-gradient(90deg, #130c08ed 0 38%, #130c0870 64%, #130c082e), url(' +
            (runtime.config.world.setupSceneAsset ?? runtime.config.world.mapSceneAsset ?? '') +
            ')'
          "
        >
          <div class="opening-copy">
            <span class="slide-kicker">Our trading season</span>
            <h2>{{ runtime.state().companyName }}</h2>
            <p>
              We will show the route we chose, the load we funded, the math that proves our result,
              and the change we would make next.
            </p>
            <div class="opening-route">
              <span>{{ startLocation()?.shortName ?? 'Starting post' }}</span>
              <i aria-hidden="true">\u2192</i>
              <strong>{{ destination()?.shortName ?? 'Destination' }}</strong>
            </div>
          </div>
          <div class="headline-results">
            <article>
              <small>{{
                readOnly() ? 'Simulation score \xB7 not a grade' : 'Verified game score'
              }}</small>
              <strong>{{ runtime.results().score }}<span>/100</span></strong>
            </article>
            <article>
              <small>Net profit / loss</small>
              <strong>{{ runtime.money(runtime.results().netProfitCents, true) }}</strong>
            </article>
            <article>
              <small>Final cash</small>
              <strong>{{ runtime.money(runtime.results().endingCashCents) }}</strong>
            </article>
          </div>
        </section>
      }
      @case (1) {
        <section class="showcase-slide plan-slide">
          <header>
            <span class="slide-kicker">Decision 1</span>
            <h2>Our route and load had to fit together</h2>
            <p>
              Explain the constraint first, then point to the numbers that made the plan feasible.
            </p>
          </header>
          <div class="plan-layout">
            <figure class="showcase-map">
              <svg viewBox="0 0 100 80" role="img" aria-label="Selected company route">
                @if (runtime.config.world.mapSceneAsset; as mapAsset) {
                  <image
                    [attr.href]="mapAsset"
                    width="100"
                    height="80"
                    preserveAspectRatio="none"
                  />
                }
                @if (route(); as selectedRoute) {
                  <path class="route-glow" [attr.d]="selectedRoute.path" />
                  <path class="route-line" [attr.d]="selectedRoute.path" />
                }
                @if (startLocation(); as start) {
                  <circle
                    class="route-start"
                    [attr.cx]="start.mapX"
                    [attr.cy]="start.mapY"
                    r="2.3"
                  />
                }
                @if (destination(); as end) {
                  <circle class="route-end" [attr.cx]="end.mapX" [attr.cy]="end.mapY" r="3" />
                }
              </svg>
              <figcaption>
                @if (route(); as selectedRoute) {
                  <strong>{{ selectedRoute.name }}</strong>
                  <span
                    >{{ selectedRoute.distanceMiles }} miles \xB7
                    {{ selectedRoute.estimatedDays }} days \xB7
                    {{ runtime.money(selectedRoute.supplyCostCents) }} supplies</span
                  >
                } @else {
                  <strong>No completed route record</strong>
                }
              </figcaption>
            </figure>
            <section class="load-proof">
              <header>
                <div>
                  <span class="slide-kicker">Original purchases</span>
                  <h3>What we loaded</h3>
                </div>
                <strong>{{ plannedCargoSpaces() }} spaces purchased</strong>
              </header>
              <div class="capacity-bar" aria-label="Purchased cargo compared with capacity">
                <i
                  [style.width.%]="
                    runtime.capacity() === 0
                      ? 0
                      : Math.min(100, (plannedCargoSpaces() / runtime.capacity()) * 100)
                  "
                ></i>
              </div>
              <div class="load-rows">
                @for (row of loadRows(); track row.goodId) {
                  <article>
                    <span aria-hidden="true">{{ row.icon }}</span>
                    <div>
                      <strong>{{ row.name }}</strong
                      ><small>{{ row.quantity }} units</small>
                    </div>
                    <div>
                      <strong>{{ row.cargoSpaces }}</strong
                      ><small>spaces</small>
                    </div>
                    <div>
                      <strong>{{ runtime.money(row.costCents) }}</strong
                      ><small>cost</small>
                    </div>
                  </article>
                } @empty {
                  <p>No purchase records are available.</p>
                }
              </div>
            </section>
          </div>
        </section>
      }
      @case (2) {
        <section class="showcase-slide math-slide">
          <header>
            <span class="slide-kicker">Decision 2</span>
            <h2>The mathematics that proves our result</h2>
            <p>Read each equation aloud and explain what every number represents.</p>
          </header>
          <div class="math-board">
            @if (forecast(); as tripForecast) {
              <article>
                <span class="equation-number">1</span>
                <div>
                  <small>Forecast before departure</small>
                  <p>
                    {{ runtime.money(tripForecast.expectedSalesRevenueCents) }} \u2212
                    {{ runtime.money(tripForecast.goodsCostCents) }} \u2212
                    {{ runtime.money(route()?.supplyCostCents ?? 0) }} =
                  </p>
                  <strong>{{ runtime.money(tripForecast.expectedTripProfitCents, true) }}</strong>
                </div>
              </article>
            }
            <article>
              <span class="equation-number">{{ forecast() ? 2 : 1 }}</span>
              <div>
                <small>Actual trip profit after events</small>
                <p>
                  {{ runtime.money(runtime.results().salesRevenueCents) }} \u2212
                  {{
                    runtime.money(
                      forecast()?.goodsCostCents ?? runtime.results().goodsPurchasedCents
                    )
                  }}
                  \u2212 {{ runtime.money(runtime.results().supplyCostsCents) }} \u2212
                  {{ runtime.money(runtime.results().eventExpensesCents) }} +
                  {{ runtime.money(runtime.results().eventIncomeCents) }} =
                </p>
                <strong>{{ runtime.money(actualTripProfitCents(), true) }}</strong>
              </div>
            </article>
            <article class="audit-equation">
              <span class="equation-number">{{ forecast() ? 3 : 2 }}</span>
              <div>
                <small>Final cash audit</small>
                <p>{{ runtime.money(runtime.results().startingCashCents) }} \u2212 costs + revenue =</p>
                <strong>{{ runtime.money(runtime.results().endingCashCents) }}</strong>
                <span [class.verified]="runtime.reconciled()">
                  {{
                    runtime.reconciled()
                      ? '\u2713 Official money record reconciles'
                      : 'Audit needs review'
                  }}
                </span>
              </div>
            </article>
          </div>
          @if (forecast()) {
            <div class="forecast-error">
              <small>Forecast error \xB7 actual minus forecast</small>
              <strong>{{ runtime.money(forecastErrorCents(), true) }}</strong>
              <p>A smaller absolute difference means the forecast was more accurate.</p>
            </div>
          }
        </section>
      }
      @case (3) {
        <section class="showcase-slide revision-slide">
          <header>
            <span class="slide-kicker">Decision 3</span>
            <h2>What changed and how we adapted</h2>
            <p>Name the changed number, explain its effect, and defend the response.</p>
          </header>
          @if (mostImpactfulEvent(); as event) {
            <div class="revision-story">
              <article class="event-card">
                <span class="event-mark" aria-hidden="true">!</span>
                <div>
                  <small>Trail challenge \xB7 Day {{ event.day }}</small>
                  <h3>{{ eventTitle(event) }}</h3>
                  <p>{{ event.outcome }}</p>
                </div>
              </article>
              <div class="before-after">
                <article>
                  <small>Cash before</small>
                  <strong>{{ runtime.money(event.cashBeforeCents) }}</strong>
                </article>
                <span aria-hidden="true">\u2192</span>
                <article>
                  <small>Cash after</small>
                  <strong>{{ runtime.money(event.cashAfterCents) }}</strong>
                </article>
                <article class="change">
                  <small>Recorded change</small>
                  <strong>{{ runtime.money(eventCashChange(event), true) }}</strong>
                </article>
              </div>
              <blockquote>
                <small>Our recorded reasoning</small>
                <p>{{ event.reasoning || 'No written reasoning was recorded for this event.' }}</p>
              </blockquote>
              <div class="revision-prompt">
                @if (readOnly()) {
                  <strong>Our revised strategy</strong>
                  <p>{{ reportHighlights().at(-1)?.state?.response }}</p>
                } @else {
                  <strong>Defense sentence</strong>
                  <p>\u201CWhen _____ changed by _____, we _____ because _____.\u201D</p>
                }
              </div>
            </div>
          } @else {
            <div class="missing-slide-data">
              <span aria-hidden="true">\u25CB</span>
              <h3>No resolved trail event is available</h3>
              <p>Use a route, cargo, or price decision as the revision example.</p>
            </div>
          }
        </section>
      }
      @case (4) {
        <section class="showcase-slide defense-slide">
          <header>
            <span class="slide-kicker">Final defense</span>
            <h2>Make the claim, show the record, answer another group</h2>
            <p>Every answer should include one number and one saved game record.</p>
          </header>
          <div class="defense-layout">
            <section class="claim-card">
              <span class="slide-kicker">Our strongest evidence</span>
              @if (strongestSale(); as sale) {
                <h3>{{ goodName(sale.entry) }}</h3>
                <strong>{{ runtime.money(sale.profitCents, true) }} sale profit</strong>
                <p>
                  {{ runtime.money(sale.entry.cashChangeCents) }} received \u2212
                  {{ runtime.money(sale.entry.details?.costBasisCents ?? 0) }} cost basis
                </p>
              } @else {
                <h3>Our audited result</h3>
                <strong>{{ runtime.money(runtime.results().netProfitCents, true) }}</strong>
                <p>Use the final cash equation as the main evidence.</p>
              }
              <div class="score-three">
                <span
                  >Trade <b>{{ runtime.results().tradingScore }}/40</b></span
                >
                <span
                  >Math <b>{{ runtime.results().mathScore }}/40</b></span
                >
                <span
                  >Explain <b>{{ runtime.results().explanationScore }}/20</b></span
                >
              </div>
            </section>
            <section class="reflection-proof">
              <span class="slide-kicker">Prepared claims</span>
              @for (item of reportHighlights().slice(0, 3); track item.definition.id) {
                <details>
                  <summary>{{ item.definition.title }}</summary>
                  <p>{{ item.state.response }}</p>
                  @if (item.state.calculation) {
                    <code>{{ item.state.calculation }}</code>
                  }
                </details>
              } @empty {
                <p>Complete the reflection to bring prepared claims into this presentation.</p>
                <button type="button" (click)="runtime.navigate('report')">Open reflection</button>
              }
            </section>
            <section class="audience-challenge">
              <span class="slide-kicker">Another group asks</span>
              <blockquote>{{ audiencePrompt() }}</blockquote>
              <button type="button" (click)="nextAudiencePrompt()">Draw another question \u21BB</button>
              <ol>
                <li>Questioning group asks the displayed question.</li>
                <li>Presenters answer with one number and one record.</li>
                <li>Questioning group names one clear strength and one follow-up.</li>
              </ol>
            </section>
          </div>
        </section>
      }
    }
  </main>

  <footer class="showcase-footer page-card">
    <button type="button" [disabled]="activeSlide() === 0" (click)="moveSlide(-1)">
      \u2190 Previous
    </button>
    <div>
      <strong>{{ slides[activeSlide()].label }}</strong>
      <span>Use \u2190 and \u2192 to move during the presentation.</span>
    </div>
    <button
      class="primary"
      type="button"
      [disabled]="activeSlide() === slides.length - 1"
      (click)="moveSlide(1)"
    >
      Next \u2192
    </button>
  </footer>
</section>
`, styles: ["/* src/app/templates/simulation-decision/ui/pages/final-showcase.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #30271d;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\np,\ndl,\nfigure {\n  margin: 0;\n}\n.page-card {\n  border: 1px solid #bda984;\n  border-radius: 0.55rem;\n  background: rgba(255, 251, 240, 0.96);\n  box-shadow: 0 0.2rem 0.8rem rgba(59, 40, 20, 0.12);\n}\n.eyebrow {\n  color: #825325;\n  font-size: 0.72rem;\n  font-weight: 850;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.primary,\n.secondary {\n  min-height: 2.75rem;\n  border-radius: 0.38rem;\n  padding: 0.65rem 1rem;\n  font-weight: 800;\n}\n.primary {\n  border: 1px solid #174f5c;\n  color: #fffdf2;\n  background: linear-gradient(#176778, #0d4a57);\n}\n.secondary {\n  border: 1px solid #a68d67;\n  color: #3a2c1c;\n  background: #f6eddc;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nbutton:focus-visible,\ninput:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible,\n[tabindex]:focus-visible {\n  outline: 3px solid #167087;\n  outline-offset: 2px;\n}\n.signed-positive {\n  color: #2f672e;\n}\n.signed-negative {\n  color: #9d2e1e;\n}\n.field {\n  display: grid;\n  gap: 0.35rem;\n  color: #473a2a;\n  font-size: 0.8rem;\n  font-weight: 750;\n}\n.field input,\n.field textarea,\n.field select {\n  width: 100%;\n  border: 1px solid #a99472;\n  border-radius: 0.35rem;\n  padding: 0.65rem;\n  color: #292117;\n  background: #fffdf7;\n}\n.status-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  border-radius: 999px;\n  padding: 0.18rem 0.48rem;\n  color: #3b532c;\n  background: #dce6c8;\n  font-size: 0.68rem;\n  font-weight: 800;\n}\n@media (max-width: 700px) {\n  .desktop-table {\n    display: none !important;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n:host {\n  display: block;\n}\n.showcase-page {\n  display: grid;\n  max-width: 92rem;\n  margin: 0 auto;\n  gap: 0.7rem;\n}\n.showcase-header,\n.showcase-actions,\n.showcase-readiness,\n.showcase-readiness ul,\n.showcase-nav,\n.showcase-footer {\n  display: flex;\n  align-items: center;\n}\n.showcase-header {\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1rem;\n  color: #f7e7c7;\n  background:\n    linear-gradient(\n      115deg,\n      #21140c,\n      #52331b);\n}\n.showcase-header h1 {\n  margin: 0.12rem 0;\n  color: #fff1cf;\n  font: 800 clamp(1.5rem, 3vw, 2.35rem) Georgia, serif;\n}\n.showcase-header p {\n  color: #d8c4a2;\n  font-size: 0.8rem;\n}\n.showcase-actions {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.35rem;\n}\n.showcase-actions button,\n.showcase-nav button,\n.showcase-footer button,\n.defense-slide button {\n  min-height: 2.4rem;\n  border: 1px solid #9c7846;\n  border-radius: 0.35rem;\n  padding: 0.42rem 0.65rem;\n  color: #fff0ca;\n  background: linear-gradient(#594022, #332213);\n  font-weight: 800;\n  cursor: pointer;\n}\n.showcase-actions button:hover,\n.showcase-actions button:focus-visible,\n.showcase-nav button:hover,\n.showcase-nav button:focus-visible,\n.showcase-footer button:hover:not(:disabled),\n.showcase-footer button:focus-visible {\n  border-color: #edc36c;\n  outline: 3px solid rgba(103, 212, 227, 0.4392156863);\n  outline-offset: 1px;\n}\n.pitch-timer {\n  display: grid;\n  min-width: 5rem;\n  border: 1px solid #9f7b49;\n  border-radius: 0.35rem;\n  padding: 0.22rem 0.5rem;\n  background: rgba(20, 13, 9, 0.7803921569);\n  text-align: center;\n}\n.pitch-timer small {\n  color: #cdb68d;\n  font-size: 0.55rem;\n  text-transform: uppercase;\n}\n.pitch-timer strong {\n  color: #fff0bd;\n  font:\n    900 1.25rem ui-monospace,\n    Consolas,\n    monospace;\n}\n.pitch-timer.warning strong {\n  color: #ff9c71;\n}\n.showcase-readiness {\n  gap: 1rem;\n  padding: 0.55rem 0.8rem;\n}\n.showcase-readiness > div {\n  display: grid;\n  flex: 0 0 auto;\n  border-right: 1px solid #ccb995;\n  padding-right: 1rem;\n}\n.showcase-readiness small {\n  color: #75644d;\n  font-size: 0.6rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.showcase-readiness > div strong {\n  color: #1c6372;\n  font-size: 1.2rem;\n}\n.showcase-readiness ul {\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.showcase-readiness li {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n  border: 1px solid #c7b79b;\n  border-radius: 999px;\n  padding: 0.25rem 0.5rem;\n  color: #705e48;\n  background: #efe5d2;\n  font-size: 0.67rem;\n  font-weight: 750;\n}\n.showcase-readiness li.complete {\n  border-color: #78966f;\n  color: #315d35;\n  background: #e8f0df;\n}\n.showcase-nav {\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem;\n  background: #2b1b10;\n}\n.showcase-nav button {\n  display: grid;\n  grid-template-columns: 1.5rem 1rem auto;\n  align-items: center;\n  gap: 0.3rem;\n  min-width: 8rem;\n  color: #d8c4a3;\n  background: #3a2818;\n}\n.showcase-nav button > span {\n  font-size: 1.1rem;\n}\n.showcase-nav button small {\n  display: grid;\n  width: 1rem;\n  height: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  background: #715232;\n  font-size: 0.55rem;\n}\n.showcase-nav button.active {\n  border-color: #72dbe7;\n  color: #18251e;\n  background: linear-gradient(#f4d990, #c99b45);\n  box-shadow: 0 0 0.8rem rgba(97, 221, 234, 0.3215686275);\n}\n.showcase-stage {\n  position: relative;\n  min-height: 39rem;\n  overflow: hidden;\n  border: 0.18rem solid #80582e;\n  padding: 0;\n  background: #efe3cc;\n  box-shadow: 0 0.9rem 2rem rgba(27, 16, 10, 0.3215686275);\n}\n.slide-count {\n  position: absolute;\n  z-index: 8;\n  top: 0.7rem;\n  right: 0.7rem;\n  border-radius: 999px;\n  padding: 0.22rem 0.5rem;\n  color: #fff0c9;\n  background: rgba(29, 18, 11, 0.8196078431);\n  font-size: 0.65rem;\n  font-weight: 850;\n}\n.showcase-slide {\n  min-height: 39rem;\n  padding: clamp(1rem, 2.5vw, 2rem);\n}\n.showcase-slide > header {\n  max-width: 55rem;\n  margin-bottom: 1rem;\n}\n.showcase-slide > header h2 {\n  margin: 0.15rem 0 0.3rem;\n  color: #3c2816;\n  font: 800 clamp(1.55rem, 3vw, 2.5rem) Georgia, serif;\n}\n.showcase-slide > header p {\n  color: #69563e;\n}\n.slide-kicker {\n  color: #97651f;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.opening-slide {\n  display: grid;\n  grid-template-columns: minmax(18rem, 0.8fr) minmax(18rem, 1.2fr);\n  align-items: center;\n  gap: 2rem;\n  color: #fff0d0;\n  background-position: center;\n  background-size: cover;\n}\n.opening-copy {\n  max-width: 34rem;\n}\n.opening-copy h2 {\n  margin: 0.2rem 0 0.8rem;\n  color: #fff1c9;\n  font: 800 clamp(2.4rem, 6vw, 5rem) Georgia, serif;\n  line-height: 0.95;\n  text-shadow: 0 0.2rem 0.35rem #000;\n}\n.opening-copy p {\n  color: #e1d0b1;\n  line-height: 1.6;\n}\n.opening-route {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 1rem;\n  border-top: 1px solid #b89152;\n  padding-top: 0.7rem;\n  font-size: 1.05rem;\n}\n.opening-route i {\n  color: #58dcea;\n  font-style: normal;\n}\n.headline-results {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.7rem;\n}\n.headline-results article {\n  display: grid;\n  border: 1px solid #d8ad63;\n  border-radius: 0.55rem;\n  padding: 0.9rem;\n  background: rgba(27, 17, 11, 0.862745098);\n  box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.4);\n}\n.headline-results article:first-child {\n  grid-column: 1/-1;\n}\n.headline-results small {\n  color: #d3b77e;\n  text-transform: uppercase;\n}\n.headline-results strong {\n  color: #fff1c4;\n  font: 900 clamp(1.6rem, 4vw, 3.25rem) Georgia, serif;\n}\n.headline-results strong span {\n  color: #ccb47f;\n  font-size: 0.4em;\n}\n.plan-layout {\n  display: grid;\n  grid-template-columns: minmax(20rem, 1.2fr) minmax(19rem, 0.8fr);\n  gap: 1rem;\n}\n.showcase-map {\n  position: relative;\n  margin: 0;\n  overflow: hidden;\n  border: 0.2rem solid #654525;\n  border-radius: 0.65rem;\n  background: #4b4930;\n  box-shadow: 0 0.6rem 1.1rem rgba(53, 32, 14, 0.3215686275);\n}\n.showcase-map svg {\n  display: block;\n  width: 100%;\n  aspect-ratio: 5/4;\n}\n.showcase-map image {\n  filter: brightness(0.78) saturate(0.9);\n}\n.route-glow,\n.route-line {\n  fill: none;\n  stroke-linecap: round;\n  vector-effect: non-scaling-stroke;\n}\n.route-glow {\n  stroke: #21170e;\n  stroke-width: 3;\n  opacity: 0.65;\n}\n.route-line {\n  stroke: #e9d28d;\n  stroke-width: 1.5;\n  stroke-dasharray: 1.25 0.8;\n}\n.route-start,\n.route-end {\n  stroke: #fff3c4;\n  stroke-width: 0.8;\n}\n.route-start {\n  fill: #4fa169;\n}\n.route-end {\n  fill: #df9e3f;\n  filter: drop-shadow(0 0 2px #fff0a0);\n}\n.showcase-map figcaption {\n  position: absolute;\n  right: 0.7rem;\n  bottom: 0.7rem;\n  left: 0.7rem;\n  display: grid;\n  border: 1px solid #c49b5a;\n  border-radius: 0.35rem;\n  padding: 0.55rem;\n  color: #fff0ca;\n  background: rgba(33, 20, 13, 0.9098039216);\n}\n.showcase-map figcaption span {\n  color: #cfbea0;\n  font-size: 0.72rem;\n}\n.load-proof {\n  border: 1px solid #c7b18b;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background: #fff8e9;\n}\n.load-proof > header {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n}\n.load-proof h3 {\n  margin: 0.1rem 0;\n  font-family: Georgia, serif;\n}\n.load-proof > header > strong {\n  color: #1e6673;\n  font-size: 0.78rem;\n}\n.capacity-bar {\n  height: 0.75rem;\n  margin: 0.7rem 0;\n  overflow: hidden;\n  border: 1px solid #9e875f;\n  border-radius: 999px;\n  background: #ded1b9;\n}\n.capacity-bar i {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #2f7d73,\n      #d9aa45);\n}\n.load-rows {\n  display: grid;\n  gap: 0.35rem;\n  max-height: 23rem;\n  overflow: auto;\n}\n.load-rows article {\n  display: grid;\n  grid-template-columns: 2rem 1fr auto auto;\n  gap: 0.5rem;\n  align-items: center;\n  border-top: 1px solid #dfd2bb;\n  padding: 0.45rem 0;\n}\n.load-rows article > span {\n  font-size: 1.3rem;\n}\n.load-rows article > div {\n  display: grid;\n  min-width: 4rem;\n}\n.load-rows article > div:not(:first-of-type) {\n  text-align: right;\n}\n.load-rows small {\n  color: #74654e;\n  font-size: 0.62rem;\n}\n.math-board {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.8rem;\n}\n.math-board article {\n  position: relative;\n  min-height: 15rem;\n  border: 1px solid #bd9e6c;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: linear-gradient(#fffaf0, #e8d5b4);\n  box-shadow: 0 0.45rem 0.8rem rgba(76, 46, 22, 0.1882352941);\n}\n.equation-number {\n  display: grid;\n  width: 2.25rem;\n  height: 2.25rem;\n  margin-bottom: 1rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #216b78;\n  font-weight: 900;\n}\n.math-board small,\n.forecast-error small {\n  color: #856127;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.math-board p {\n  margin: 1rem 0;\n  font:\n    700 clamp(0.85rem, 1.6vw, 1.15rem) ui-monospace,\n    Consolas,\n    monospace;\n  line-height: 1.65;\n}\n.math-board article strong {\n  color: #3d2a18;\n  font: 900 clamp(1.5rem, 3vw, 2.5rem) Georgia, serif;\n}\n.audit-equation span:last-child {\n  display: block;\n  margin-top: 0.7rem;\n  color: #8d3d2b;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\n.audit-equation span:last-child.verified {\n  color: #346a3c;\n}\n.forecast-error {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.2rem 1rem;\n  margin-top: 0.8rem;\n  border-left: 0.35rem solid #cf8d30;\n  padding: 0.7rem 0.9rem;\n  background: #f8e8ca;\n}\n.forecast-error strong {\n  grid-row: 1/span 2;\n  grid-column: 2;\n  color: #5b3718;\n  font: 900 1.7rem Georgia, serif;\n}\n.forecast-error p {\n  margin: 0;\n  color: #6d5c44;\n}\n.revision-story {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.8rem;\n}\n.event-card,\n.before-after,\n.revision-story blockquote,\n.revision-prompt,\n.claim-card,\n.reflection-proof,\n.audience-challenge {\n  border: 1px solid #c3a878;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: #fff8e9;\n  box-shadow: 0 0.4rem 0.8rem rgba(74, 44, 20, 0.1607843137);\n}\n.event-card {\n  display: flex;\n  gap: 0.8rem;\n}\n.event-mark {\n  display: grid;\n  flex: 0 0 3.2rem;\n  height: 3.2rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff2c8;\n  background: #9b452d;\n  font: 900 1.8rem Georgia, serif;\n}\n.event-card h3 {\n  margin: 0.15rem 0 0.3rem;\n  font-family: Georgia, serif;\n}\n.before-after {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 0.5rem;\n}\n.before-after article {\n  display: grid;\n  text-align: center;\n}\n.before-after article.change {\n  grid-column: 1/-1;\n  border-top: 1px solid #d9c5a2;\n  padding-top: 0.5rem;\n}\n.before-after small {\n  color: #746149;\n}\n.before-after strong {\n  color: #3e2b1a;\n  font: 900 1.5rem Georgia, serif;\n}\n.revision-story blockquote {\n  margin: 0;\n}\n.revision-story blockquote p {\n  margin-top: 0.4rem;\n  font: italic 1.05rem Georgia, serif;\n  line-height: 1.5;\n}\n.revision-prompt {\n  color: #e9ddc5;\n  background:\n    linear-gradient(\n      120deg,\n      #244d4d,\n      #163238);\n}\n.revision-prompt p {\n  margin-top: 0.4rem;\n  color: #fff1c7;\n  font: 700 1.1rem Georgia, serif;\n}\n.missing-slide-data {\n  display: grid;\n  min-height: 20rem;\n  place-items: center;\n  align-content: center;\n  color: #6d5b45;\n  text-align: center;\n}\n.missing-slide-data > span {\n  font-size: 3rem;\n}\n.defense-layout {\n  display: grid;\n  grid-template-columns: 0.8fr 0.9fr 1.1fr;\n  gap: 0.8rem;\n}\n.claim-card > strong {\n  display: block;\n  margin: 0.5rem 0;\n  color: #2f6570;\n  font: 900 1.7rem Georgia, serif;\n}\n.claim-card h3,\n.reflection-proof h3 {\n  margin: 0.2rem 0;\n  font-family: Georgia, serif;\n}\n.score-three {\n  display: grid;\n  gap: 0.3rem;\n  margin-top: 1rem;\n  border-top: 1px solid #d6c19c;\n  padding-top: 0.7rem;\n}\n.score-three span {\n  display: flex;\n  justify-content: space-between;\n}\n.reflection-proof details {\n  border-bottom: 1px solid #d8c6a6;\n  padding: 0.55rem 0;\n}\n.reflection-proof summary {\n  color: #3d3021;\n  font-weight: 850;\n  cursor: pointer;\n}\n.reflection-proof p {\n  margin: 0.4rem 0;\n  color: #655640;\n  font-size: 0.78rem;\n  line-height: 1.45;\n}\n.reflection-proof code {\n  display: block;\n  border-left: 3px solid #37808c;\n  padding: 0.35rem;\n  white-space: pre-wrap;\n}\n.audience-challenge {\n  color: #eadbc0;\n  background:\n    linear-gradient(\n      135deg,\n      #2d1c10,\n      #51351d);\n}\n.audience-challenge blockquote {\n  margin: 0.6rem 0;\n  color: #fff0be;\n  font: 800 clamp(1.25rem, 2.4vw, 1.8rem) Georgia, serif;\n  line-height: 1.25;\n}\n.audience-challenge button {\n  width: 100%;\n  border-color: #d5a955;\n  color: #2a1b10;\n  background: #edcf85;\n}\n.audience-challenge ol {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0.8rem 0 0;\n  padding-left: 1.2rem;\n  color: #dbc9aa;\n  font-size: 0.72rem;\n}\n.showcase-footer {\n  justify-content: space-between;\n  gap: 0.8rem;\n  padding: 0.55rem 0.7rem;\n}\n.showcase-footer > div {\n  display: grid;\n  text-align: center;\n}\n.showcase-footer span {\n  color: #77654e;\n  font-size: 0.65rem;\n}\n.showcase-footer button.primary {\n  color: #fff;\n  background: #176b79;\n}\n.showcase-footer button:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.showcase-page.presenting {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  max-width: none;\n  overflow: auto;\n  padding: 0.6rem;\n  background: #170e09;\n}\n.showcase-page.presenting .showcase-readiness {\n  display: none;\n}\n.showcase-page.presenting .showcase-stage,\n.showcase-page.presenting .showcase-slide {\n  min-height: calc(100dvh - 12rem);\n}\n@media (max-width: 900px) {\n  .showcase-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .showcase-actions {\n    justify-content: flex-start;\n  }\n  .showcase-nav {\n    justify-content: flex-start;\n    overflow-x: auto;\n  }\n  .showcase-nav button {\n    min-width: 7rem;\n  }\n  .plan-layout,\n  .opening-slide,\n  .revision-story,\n  .defense-layout {\n    grid-template-columns: 1fr;\n  }\n  .math-board {\n    grid-template-columns: 1fr;\n  }\n  .math-board article {\n    min-height: 0;\n  }\n}\n@media (max-width: 600px) {\n  .showcase-readiness {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .showcase-readiness > div {\n    border-right: 0;\n    border-bottom: 1px solid #ccb995;\n    padding: 0 0 0.5rem;\n  }\n  .showcase-slide {\n    padding: 0.8rem;\n  }\n  .headline-results {\n    grid-template-columns: 1fr;\n  }\n  .headline-results article:first-child {\n    grid-column: auto;\n  }\n  .showcase-footer > div {\n    display: none;\n  }\n}\n@media print {\n  .showcase-actions,\n  .showcase-readiness,\n  .showcase-nav,\n  .showcase-footer,\n  .slide-count {\n    display: none !important;\n  }\n  .showcase-stage,\n  .showcase-slide {\n    min-height: 0;\n    break-inside: avoid;\n  }\n  .showcase-slide {\n    display: block !important;\n    break-after: page;\n  }\n}\n.showcase-page {\n  height: var(--presentation-available-height, calc(100dvh - 160px));\n  min-height: 460px;\n  grid-template-rows: auto auto auto minmax(0, 1fr) auto;\n  gap: 6px;\n  overflow: hidden;\n}\n.showcase-header {\n  padding: 8px 12px;\n}\n.showcase-header h1 {\n  font-size: clamp(20px, 1.8vw, 28px);\n}\n.showcase-header p {\n  margin: 4px 0;\n}\n.showcase-readiness {\n  padding: 6px 12px;\n}\n.showcase-nav {\n  padding: 4px;\n}\n.showcase-nav button {\n  min-height: 44px;\n  padding: 6px 12px;\n}\n.showcase-stage,\n.showcase-slide {\n  min-height: 0;\n  height: 100%;\n}\n.showcase-stage {\n  overflow: auto;\n}\n.showcase-slide {\n  padding: 16px;\n}\n.opening-slide h2 {\n  font-size: clamp(26px, 3vw, 44px);\n}\n.showcase-footer {\n  background: #fbf4e4;\n}\n.showcase-page.presenting {\n  height: 100dvh;\n  min-height: 0;\n  box-sizing: border-box;\n  overflow: hidden;\n  grid-template-rows: auto auto minmax(0, 1fr) auto;\n}\n.showcase-page.presenting .showcase-stage,\n.showcase-page.presenting .showcase-slide {\n  min-height: 0;\n}\n@media (max-width: 700px) {\n  .showcase-page {\n    min-height: 560px;\n  }\n  .showcase-readiness ul {\n    flex-wrap: wrap;\n  }\n  .showcase-header {\n    gap: 8px;\n  }\n}\n@media print {\n  .showcase-page {\n    height: auto;\n    overflow: visible;\n  }\n  .showcase-stage,\n  .showcase-slide {\n    height: auto;\n    overflow: visible;\n  }\n}\n.showcase-footer button {\n  min-height: 44px;\n}\n/*# sourceMappingURL=final-showcase.component.css.map */\n"] }]
  }], null, { readOnly: [{ type: Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }], stage: [{ type: ViewChild, args: ["presentationStage", { isSignal: true }] }], usePresentationKeys: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SimulationFinalShowcaseComponent, { className: "SimulationFinalShowcaseComponent", filePath: "src/app/templates/simulation-decision/ui/pages/final-showcase.component.ts", lineNumber: 32 });
})();

export {
  SimulationFinalShowcaseComponent
};
//# debugId=9ead6b85-5448-57af-ae42-de7333d05470
//# sourceMappingURL=chunk-B7GYN3PM.js.map
