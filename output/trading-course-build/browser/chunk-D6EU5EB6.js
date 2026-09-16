import {
  JourneyReplayRuntimeService,
  detectVoyageIntersections
} from "./chunk-EHZR63UE.js";
import {
  LivingJourneyMapComponent
} from "./chunk-G7WLRBLS.js";
import {
  JOURNEY_REPLAY_DEMO_CLASS_SUMMARY
} from "./chunk-Q2RH2RH4.js";
import {
  Component,
  Input,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/journey-replay/ui/class-journey-map.component.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.voyageId;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.voyage.voyageId;
var _forTrack3 = ($index, $item) => $item.studentId;
function ClassJourneyMapComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Live class summary \xB7 ", ctx_r0.voyages().length, " voyages ");
  }
}
function ClassJourneyMapComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "strong");
    \u0275\u0275text(2, "Simulated class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.displaySummary()?.classLabel, " \xB7 expected showcase performance");
  }
}
function ClassJourneyMapComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_For_34_Template_button_click_0_listener() {
      const voyage_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectVoyage(voyage_r3.voyageId));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const voyage_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%team-color", voyage_r3.team.color);
    \u0275\u0275attribute("aria-pressed", ctx_r0.selectedVoyage()?.voyageId === voyage_r3.voyageId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(voyage_r3.team.emblem);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(voyage_r3.team.name);
  }
}
function ClassJourneyMapComponent_ForEmpty_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No class voyages are available in this view.");
    \u0275\u0275elementEnd();
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "article", 26)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 27)(15, "button", 28);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_36_Conditional_0_Conditional_15_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.previousSnapshot());
    });
    \u0275\u0275text(16, " \u2190 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 29);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_36_Conditional_0_Conditional_15_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.togglePlayback());
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 30);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_36_Conditional_0_Conditional_15_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.nextSnapshot());
    });
    \u0275\u0275text(20, " \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const snapshot_r5 = ctx;
    const selected_r6 = \u0275\u0275nextContext(2);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%team-color", selected_r6.team.color);
    \u0275\u0275attribute("data-event", snapshot_r5.eventType ?? "journey");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Snapshot ", snapshot_r5.sequence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.snapshotIcon(snapshot_r5.eventType), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(snapshot_r5.locationName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(snapshot_r5.eventType ?? "voyage log");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(snapshot_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(snapshot_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.activeSnapshotIndex() === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.playing() ? "Pause story" : "Play story", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.activeSnapshotIndex() >= ctx_r0.snapshots().length - 1);
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_0_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_36_Conditional_0_For_18_Template_button_click_0_listener() {
      const $index_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selectSnapshot($index_r8));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const snapshot_r9 = ctx.$implicit;
    const $index_r8 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-label", "Snapshot " + snapshot_r9.sequence + ": " + snapshot_r9.label)("aria-pressed", ctx_r0.activeSnapshotIndex() === $index_r8);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(snapshot_r9.sequence);
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 15)(2, "div", 16)(3, "div")(4, "span");
    \u0275\u0275text(5, "Single group voyage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 18)(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "journey snapshots");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(13, "app-living-journey-map", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "aside", 20);
    \u0275\u0275conditionalCreate(15, ClassJourneyMapComponent_Conditional_36_Conditional_0_Conditional_15_Template, 21, 12);
    \u0275\u0275elementStart(16, "div", 21);
    \u0275\u0275repeaterCreate(17, ClassJourneyMapComponent_Conditional_36_Conditional_0_For_18_Template, 3, 3, "button", 22, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "footer")(20, "strong");
    \u0275\u0275text(21, "Voyage outcome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const selected_r6 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", selected_r6.team.emblem, " ", selected_r6.team.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.activeSnapshotIndex() + 1, " / ", ctx_r0.snapshots().length);
    \u0275\u0275advance(3);
    \u0275\u0275property("map", ctx_r0.runtime.config.map)("route", \u0275\u0275pureFunction0(11, _c0))("team", selected_r6.team)("classVoyages", ctx_r0.storyVoyage())("featuredVoyageId", selected_r6.voyageId);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_10_0 = ctx_r0.activeSnapshot()) ? 15 : -1, tmp_10_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.snapshots());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(selected_r6.outcome);
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_1_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 36)(1, "span");
    \u0275\u0275text(2, "Preview data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, " These are fictional crew records showing how a completed class might look. They are never saved as student work and disappear when a live authorized summary is present. ");
    \u0275\u0275elementEnd()();
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_1_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "footer");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const beat_r10 = ctx.$implicit;
    const $index_r11 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r11 + 1 < 10 ? "0" + ($index_r11 + 1) : $index_r11 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(beat_r10.kicker);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(beat_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(beat_r10.body);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(beat_r10.stat);
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_1_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "header")(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "footer");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comparison_r12 = ctx.$implicit;
    \u0275\u0275styleProp("--%NS%team-color", comparison_r12.voyage.team.color);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(comparison_r12.voyage.team.emblem);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(comparison_r12.voyage.team.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", comparison_r12.uniqueLocationCount, " different named stop", comparison_r12.uniqueLocationCount === 1 ? "" : "s");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comparison_r12.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comparison_r12.voyage.outcome);
  }
}
function ClassJourneyMapComponent_Conditional_36_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14)(1, "div", 31)(2, "div")(3, "span");
    \u0275\u0275text(4, "Class view");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " The featured route stays bright. Other routes provide class context without combining student records. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "app-living-journey-map", 33);
    \u0275\u0275elementStart(10, "div", 34)(11, "article")(12, "span");
    \u0275\u0275text(13, "Journey progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "of all class chapters complete");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "article")(19, "span");
    \u0275\u0275text(20, "Reasoning ready");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "of reviewed criteria at proficient or advanced");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "article")(26, "span");
    \u0275\u0275text(27, "Teacher queue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "article", 35)(33, "span");
    \u0275\u0275text(34, "Featured outcome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "strong");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(39, ClassJourneyMapComponent_Conditional_36_Conditional_1_Conditional_39_Template, 5, 0, "aside", 36);
    \u0275\u0275elementStart(40, "section", 37)(41, "header")(42, "div")(43, "span");
    \u0275\u0275text(44, "Planned class story");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "h3", 38);
    \u0275\u0275text(46, "The moments worth putting on the big screen");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "p");
    \u0275\u0275text(48, " A teacher-led reveal can move from launch, to crisis, to global outcomes, to visible revision. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div");
    \u0275\u0275repeaterCreate(50, ClassJourneyMapComponent_Conditional_36_Conditional_1_For_51_Template, 11, 5, "article", null, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "section", 39)(53, "div", 40)(54, "span");
    \u0275\u0275text(55, "Route-by-route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "h3", 41);
    \u0275\u0275text(57, "What changed across the class?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p");
    \u0275\u0275text(59, " Compare shared decisions, different destinations, and the consequences each group recorded. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(60, ClassJourneyMapComponent_Conditional_36_Conditional_1_For_61_Template, 13, 8, "article", 42, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const selected_r6 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", selected_r6.team.name, " compared with ", ctx_r0.voyages().length - 1, " other voyages ");
    \u0275\u0275advance(3);
    \u0275\u0275property("map", ctx_r0.runtime.config.map)("route", \u0275\u0275pureFunction0(18, _c0))("team", selected_r6.team)("classVoyages", ctx_r0.compareVoyages())("featuredVoyageId", selected_r6.voyageId)("intersections", ctx_r0.intersections());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r0.classPerformance().completionPercent, "%");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.classPerformance().reasoningReadyPercent, "%");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.classPerformance().awaitingReviewCount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("awaiting review \xB7 ", ctx_r0.classPerformance().approvedCount, " approved");
    \u0275\u0275advance();
    \u0275\u0275styleProp("--%NS%team-color", selected_r6.team.color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", selected_r6.team.emblem, " ", selected_r6.team.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(selected_r6.outcome);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSimulatedSummary() ? 39 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r0.classStoryBeats());
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r0.comparisons());
  }
}
function ClassJourneyMapComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ClassJourneyMapComponent_Conditional_36_Conditional_0_Template, 24, 12, "section", 13)(1, ClassJourneyMapComponent_Conditional_36_Conditional_1_Template, 62, 19, "section", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.mode() === "snapshots" ? 0 : 1);
  }
}
function ClassJourneyMapComponent_Conditional_37_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "div")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "footer")(9, "button", 52);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_37_For_24_Template_button_click_9_listener() {
      const member_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.review(member_r15, "revision-requested"));
    });
    \u0275\u0275text(10, " Request revision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 53);
    \u0275\u0275listener("click", function ClassJourneyMapComponent_Conditional_37_For_24_Template_button_click_11_listener() {
      const member_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.review(member_r15, "approved"));
    });
    \u0275\u0275text(12, " Approve replay ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const member_r15 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", member_r15.completedStepCount, " / ", member_r15.totalStepCount, " chapters");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(member_r15.studentDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", member_r15.responsePreview || "Replay and journey record are ready for review.", " ");
  }
}
function ClassJourneyMapComponent_Conditional_37_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1, "No submitted journeys are waiting for review.");
    \u0275\u0275elementEnd();
  }
}
function ClassJourneyMapComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "header")(2, "div")(3, "span");
    \u0275\u0275text(4, "Authoritative assessment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 43);
    \u0275\u0275text(6, "Replay approval queue");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 44)(10, "label");
    \u0275\u0275text(11, "Mastery level ");
    \u0275\u0275elementStart(12, "select", 45);
    \u0275\u0275listener("change", function ClassJourneyMapComponent_Conditional_37_Template_select_change_12_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setReviewLevel($event));
    });
    \u0275\u0275elementStart(13, "option", 46);
    \u0275\u0275text(14, "Developing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 47);
    \u0275\u0275text(16, "Proficient");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 48);
    \u0275\u0275text(18, "Advanced");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "label");
    \u0275\u0275text(20, "Feedback");
    \u0275\u0275elementStart(21, "textarea", 49);
    \u0275\u0275listener("input", function ClassJourneyMapComponent_Conditional_37_Template_textarea_input_21_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setReviewFeedback($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 50);
    \u0275\u0275repeaterCreate(23, ClassJourneyMapComponent_Conditional_37_For_24_Template, 13, 4, "article", null, _forTrack3, false, ClassJourneyMapComponent_Conditional_37_ForEmpty_25_Template, 2, 0, "p", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r0.pendingReviews().length, " awaiting review");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r0.reviewLevel());
    \u0275\u0275advance(9);
    \u0275\u0275property("value", ctx_r0.reviewFeedback());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.pendingReviews());
  }
}
var ClassJourneyMapComponent = class _ClassJourneyMapComponent {
  runtime = inject(JourneyReplayRuntimeService);
  demoClassSummary = inject(JOURNEY_REPLAY_DEMO_CLASS_SUMMARY, {
    optional: true
  });
  initialMode = input(
    "snapshots",
    ...ngDevMode ? [{ debugName: "initialMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = signal(
    "snapshots",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedVoyageId = signal(
    this.runtime.config.classVoyages[0]?.voyageId ?? "",
    ...ngDevMode ? [{ debugName: "selectedVoyageId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeSnapshotIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "activeSnapshotIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = signal(
    false,
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewLevel = signal(
    "proficient",
    ...ngDevMode ? [{ debugName: "reviewLevel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewFeedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "reviewFeedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displaySummary = computed(
    () => this.runtime.classSummary() ?? this.demoClassSummary ?? void 0,
    ...ngDevMode ? [{ debugName: "displaySummary" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSimulatedSummary = computed(
    () => this.runtime.classSummary() === void 0 && this.demoClassSummary !== null,
    ...ngDevMode ? [{ debugName: "isSimulatedSummary" }] : (
      /* istanbul ignore next */
      []
    )
  );
  voyages = computed(
    () => {
      const summary = this.displaySummary();
      if (summary !== void 0) {
        return summary.members.map((member) => ({
          voyageId: member.voyageId,
          team: member.team,
          route: member.route,
          outcome: member.outcome
        }));
      }
      return this.runtime.session() === void 0 ? this.runtime.config.classVoyages : [];
    },
    ...ngDevMode ? [{ debugName: "voyages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedVoyage = computed(
    () => this.voyages().find((voyage) => voyage.voyageId === this.selectedVoyageId()) ?? this.voyages()[0],
    ...ngDevMode ? [{ debugName: "selectedVoyage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshots = computed(
    () => buildVoyageSnapshots(this.selectedVoyage(), this.runtime.config.map),
    ...ngDevMode ? [{ debugName: "snapshots" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeSnapshot = computed(
    () => this.snapshots()[Math.min(this.activeSnapshotIndex(), Math.max(0, this.snapshots().length - 1))],
    ...ngDevMode ? [{ debugName: "activeSnapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storyVoyage = computed(
    () => {
      const voyage = this.selectedVoyage();
      const snapshot = this.activeSnapshot();
      if (voyage === void 0)
        return [];
      return [
        __spreadProps(__spreadValues({}, voyage), {
          route: snapshot === void 0 ? voyage.route : voyage.route.slice(0, snapshot.routeIndex + 1)
        })
      ];
    },
    ...ngDevMode ? [{ debugName: "storyVoyage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compareVoyages = computed(
    () => {
      const selected = this.selectedVoyage();
      if (selected === void 0)
        return this.voyages();
      return [...this.voyages().filter((voyage) => voyage.voyageId !== selected.voyageId), selected];
    },
    ...ngDevMode ? [{ debugName: "compareVoyages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  intersections = computed(
    () => detectVoyageIntersections(this.voyages()),
    ...ngDevMode ? [{ debugName: "intersections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSharedStops = computed(
    () => {
      const selectedId = this.selectedVoyage()?.voyageId;
      return this.intersections().filter((intersection) => intersection.voyageIds.includes(selectedId ?? ""));
    },
    ...ngDevMode ? [{ debugName: "selectedSharedStops" }] : (
      /* istanbul ignore next */
      []
    )
  );
  comparisons = computed(
    () => compareVoyages(this.selectedVoyage(), this.voyages(), this.runtime.config.map),
    ...ngDevMode ? [{ debugName: "comparisons" }] : (
      /* istanbul ignore next */
      []
    )
  );
  namedDestinationCount = computed(
    () => new Set(this.voyages().flatMap((voyage) => voyage.route.flatMap((point) => point.locationId ?? []))).size,
    ...ngDevMode ? [{ debugName: "namedDestinationCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  classPerformance = computed(
    () => summarizeClassPerformance(this.displaySummary()),
    ...ngDevMode ? [{ debugName: "classPerformance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  classStoryBeats = computed(
    () => buildClassStoryBeats(this.voyages(), this.runtime.config.map, this.displaySummary()),
    ...ngDevMode ? [{ debugName: "classStoryBeats" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingReviews = computed(
    () => this.runtime.classSummary()?.members.filter((member) => member.submission?.status === "submitted") ?? [],
    ...ngDevMode ? [{ debugName: "pendingReviews" }] : (
      /* istanbul ignore next */
      []
    )
  );
  masteryTags = computed(
    () => [
      ...new Set(this.runtime.config.steps.flatMap((step) => step.masteryTags))
    ],
    ...ngDevMode ? [{ debugName: "masteryTags" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer;
  summarySubscription;
  ngOnInit() {
    this.mode.set(this.initialMode());
    this.summarySubscription = this.runtime.connectClassSummary();
  }
  setMode(mode) {
    this.stopPlayback();
    this.mode.set(mode);
  }
  selectVoyage(voyageId) {
    this.stopPlayback();
    this.selectedVoyageId.set(voyageId);
    this.activeSnapshotIndex.set(0);
  }
  selectSnapshot(index) {
    this.stopPlayback();
    this.activeSnapshotIndex.set(Math.max(0, Math.min(index, this.snapshots().length - 1)));
  }
  previousSnapshot() {
    this.selectSnapshot(this.activeSnapshotIndex() - 1);
  }
  nextSnapshot() {
    this.selectSnapshot(this.activeSnapshotIndex() + 1);
  }
  togglePlayback() {
    if (this.playing()) {
      this.stopPlayback();
      return;
    }
    if (this.snapshots().length === 0)
      return;
    if (this.activeSnapshotIndex() >= this.snapshots().length - 1)
      this.activeSnapshotIndex.set(0);
    this.playing.set(true);
    this.timer = setInterval(() => {
      if (this.activeSnapshotIndex() >= this.snapshots().length - 1) {
        this.stopPlayback();
        return;
      }
      this.activeSnapshotIndex.update((index) => index + 1);
    }, 2200);
  }
  snapshotIcon(eventType) {
    const icons = {
      storm: "\u26C8",
      decision: "\u2691",
      trade: "\u2696",
      conflict: "\u26A0",
      discovery: "\u2726",
      resupply: "\u2693",
      evidence: "\u25C8",
      encounter: "\u25C9"
    };
    return eventType === void 0 ? "\u2022" : icons[eventType];
  }
  setReviewLevel(event) {
    const value = event.target.value;
    if (value === "developing" || value === "proficient" || value === "advanced") {
      this.reviewLevel.set(value);
    }
  }
  setReviewFeedback(event) {
    this.reviewFeedback.set(event.target.value);
  }
  async review(member, decision) {
    if (member.submission === void 0)
      return;
    const mastery = this.masteryTags().map((masteryTag) => ({
      masteryTag,
      level: decision === "approved" ? this.reviewLevel() : "developing",
      feedback: this.reviewFeedback().trim() || void 0
    }));
    if (await this.runtime.reviewSubmission(member.submission.id, decision, this.reviewFeedback().trim(), mastery))
      this.reviewFeedback.set("");
  }
  stopPlayback() {
    if (this.timer !== void 0)
      clearInterval(this.timer);
    this.timer = void 0;
    this.playing.set(false);
  }
  ngOnDestroy() {
    this.stopPlayback();
    this.summarySubscription?.unsubscribe();
  }
  static \u0275fac = function ClassJourneyMapComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClassJourneyMapComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClassJourneyMapComponent, selectors: [["app-class-journey-map"]], inputs: { initialMode: [1, "initialMode"] }, decls: 38, vars: 6, consts: [["aria-labelledby", "class-map-title", 1, "class-map"], [1, "hero"], ["id", "class-map-title"], ["role", "status", 1, "live-status"], ["role", "status", 1, "demo-status"], ["aria-label", "Voyage presentation modes", 1, "mode-switch"], ["type", "button", 3, "click"], ["aria-labelledby", "voyage-picker-title", 1, "voyage-picker"], ["id", "voyage-picker-title"], [1, "team-options"], ["type", "button", 3, "--%NS%team-color"], ["aria-labelledby", "review-queue-title", 1, "review-queue"], ["aria-hidden", "true"], ["aria-labelledby", "story-title", 1, "story-mode"], ["aria-labelledby", "compare-title", 1, "compare-mode"], [1, "story-map"], [1, "section-heading"], ["id", "story-title"], [1, "story-progress"], ["mapLabel", "Single group voyage revealed one snapshot at a time", 3, "map", "route", "team", "classVoyages", "featuredVoyageId"], ["aria-label", "Journey snapshot", 1, "snapshot-panel"], ["aria-label", "Choose a journey snapshot", 1, "snapshot-dots"], ["type", "button"], [1, "snapshot-visual"], [1, "snapshot-number"], ["aria-hidden", "true", 1, "snapshot-icon"], ["aria-live", "polite"], [1, "snapshot-controls"], ["type", "button", "aria-label", "Previous snapshot", 3, "click", "disabled"], ["type", "button", 1, "play", 3, "click"], ["type", "button", "aria-label", "Next snapshot", 3, "click", "disabled"], [1, "section-heading", "compare-heading"], ["id", "compare-title"], ["mapLabel", "Selected group voyage highlighted against all other class voyages", 3, "map", "route", "team", "classVoyages", "featuredVoyageId", "intersections"], ["aria-label", "Class voyage summary", 1, "class-stats"], [1, "featured-outcome"], ["role", "note", 1, "simulation-note"], ["aria-labelledby", "story-plan-title", 1, "story-plan"], ["id", "story-plan-title"], ["aria-labelledby", "route-comparisons-title", 1, "comparison-grid"], [1, "comparison-intro"], ["id", "route-comparisons-title"], [3, "--%NS%team-color"], ["id", "review-queue-title"], [1, "review-settings"], [3, "change", "value"], ["value", "developing"], ["value", "proficient"], ["value", "advanced"], ["rows", "2", "placeholder", "Add evidence-based feedback", 3, "input", "value"], [1, "submission-list"], [1, "empty-review"], ["type", "button", 1, "revise", 3, "click"], ["type", "button", 1, "approve", 3, "click"]], template: function ClassJourneyMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "span");
      \u0275\u0275text(4, "Class voyage gallery");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2", 2);
      \u0275\u0275text(6, "One journey at a time. Then the whole class.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, " Follow a group\u2019s voyage through its key snapshots, then place that route beside every other class expedition. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, ClassJourneyMapComponent_Conditional_9_Template, 3, 1, "div", 3)(10, ClassJourneyMapComponent_Conditional_10_Template, 5, 1, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "nav", 5)(12, "button", 6);
      \u0275\u0275listener("click", function ClassJourneyMapComponent_Template_button_click_12_listener() {
        return ctx.setMode("snapshots");
      });
      \u0275\u0275elementStart(13, "span");
      \u0275\u0275text(14, "Mode 1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "strong");
      \u0275\u0275text(16, "Voyage snapshots");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "small");
      \u0275\u0275text(18, "Follow one group stop by stop");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 6);
      \u0275\u0275listener("click", function ClassJourneyMapComponent_Template_button_click_19_listener() {
        return ctx.setMode("compare");
      });
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "Mode 2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "strong");
      \u0275\u0275text(23, "Class comparison");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "small");
      \u0275\u0275text(25, "See one route against the class");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "section", 7)(27, "div")(28, "span");
      \u0275\u0275text(29, "Featured voyage");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "h3", 8);
      \u0275\u0275text(31, "Choose a group to follow");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 9);
      \u0275\u0275repeaterCreate(33, ClassJourneyMapComponent_For_34_Template, 5, 5, "button", 10, _forTrack0, false, ClassJourneyMapComponent_ForEmpty_35_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(36, ClassJourneyMapComponent_Conditional_36_Template, 2, 1);
      \u0275\u0275conditionalCreate(37, ClassJourneyMapComponent_Conditional_37_Template, 26, 4, "section", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.runtime.isTeacher() && !ctx.isSimulatedSummary() ? 9 : 10);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "snapshots");
      \u0275\u0275advance(7);
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "compare");
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.voyages());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_4_0 = ctx.selectedVoyage()) ? 36 : -1, tmp_4_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.isTeacher() ? 37 : -1);
    }
  }, dependencies: [LivingJourneyMapComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.class-map[_ngcontent-%COMP%] {\n  width: min(96rem, 100%);\n  margin: 0 auto;\n  padding: 1rem;\n  color: #ecdfbd;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #71d2da;\n  outline-offset: 2px;\n}\n.hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1.25rem;\n  margin-bottom: 1rem;\n}\n.hero[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  max-width: 72rem;\n}\n.hero[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.voyage-picker[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.comparison-intro[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.review-queue[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d2b463;\n  font-size: 0.67rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.22rem 0 0.45rem;\n  font-size: clamp(1.65rem, 3.2vw, 3rem);\n  line-height: 1;\n}\n.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b9c8bd;\n  line-height: 1.5;\n}\n.demo-status[_ngcontent-%COMP%], \n.live-status[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border: 1px solid #76663e;\n  border-radius: 999px;\n  padding: 0.55rem 0.8rem;\n  color: #d8c99f;\n  background: #172720;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\n.live-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.live-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.58rem;\n  height: 0.58rem;\n  border-radius: 50%;\n  background: #63c28a;\n  box-shadow: 0 0 0.6rem #63c28a;\n}\n.demo-status[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.12rem;\n  border-radius: 0.45rem;\n}\n.demo-status[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #efd27d;\n  font-size: 0.68rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.demo-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b9c7bd;\n  font-size: 0.64rem;\n  letter-spacing: normal;\n  text-transform: none;\n}\n.mode-switch[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.7rem;\n  margin-bottom: 0.8rem;\n}\n.mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.08rem 0.75rem;\n  min-height: 5rem;\n  align-content: center;\n  border: 1px solid #5e6045;\n  border-radius: 0.55rem;\n  padding: 0.7rem 1rem;\n  color: #d9cfb2;\n  background:\n    linear-gradient(\n      135deg,\n      #15241f,\n      #1c3029);\n  text-align: left;\n}\n.mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: auto 0 0;\n  height: 0.25rem;\n  border-radius: 0 0 0.55rem 0.55rem;\n  background: transparent;\n}\n.mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.mode-switch[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #d6b960;\n  background:\n    linear-gradient(\n      135deg,\n      #244337,\n      #172b25);\n}\n.mode-switch[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%]::after {\n  background: #e0bf65;\n}\n.mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-row: 1/3;\n  align-self: center;\n  border: 1px solid #8d7544;\n  border-radius: 999px;\n  padding: 0.35rem 0.5rem;\n  color: #e3c56f;\n  font-size: 0.67rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.mode-switch[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 800 1.05rem Georgia, serif;\n}\n.mode-switch[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #aabcb0;\n  font-size: 0.7rem;\n}\n.voyage-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  align-items: center;\n  gap: 1.2rem;\n  margin-bottom: 0.8rem;\n  border: 1px solid #514f39;\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.75rem;\n  background: #101d19;\n}\n.voyage-picker[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.14rem;\n  font-size: 1rem;\n}\n.team-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  overflow-x: auto;\n  padding: 0.15rem;\n}\n.team-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 8.5rem;\n  min-height: 2.8rem;\n  flex: 1 0 auto;\n  align-items: center;\n  gap: 0.45rem;\n  border: 1px solid #5f5e43;\n  border-left: 0.28rem solid var(--%NS%team-color);\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.6rem;\n  color: #d7ccb0;\n  background: #1b2b25;\n}\n.team-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.team-options[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: var(--%NS%team-color);\n  color: #17231f;\n  background: #e7d69e;\n}\n.team-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.team-options[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.73rem;\n}\n.story-mode[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(18rem, 25rem);\n  gap: 0.8rem;\n  align-items: stretch;\n}\n.story-map[_ngcontent-%COMP%] {\n  min-width: 0;\n  --%NS%journey-map-height: clamp(18rem, calc(100dvh - 43rem), 27rem);\n  --%NS%journey-map-min-height: 18rem;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1rem;\n  min-height: 4.1rem;\n  padding: 0.4rem 0.1rem 0.65rem;\n}\n.section-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: clamp(1.25rem, 2vw, 1.8rem);\n}\n.story-progress[_ngcontent-%COMP%] {\n  display: grid;\n  color: #a9b9ae;\n  font-size: 0.66rem;\n  text-align: right;\n}\n.story-progress[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e4c66e;\n  font: 800 1.1rem Georgia, serif;\n}\n.snapshot-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: minmax(12rem, 1fr) auto auto auto auto;\n  min-height: 30rem;\n  overflow: hidden;\n  border: 1px solid #a18850;\n  border-radius: 0.6rem;\n  color: #312b22;\n  background: #efe2bd;\n  box-shadow: 0 1rem 2rem rgba(4, 8, 7, 0.5333333333);\n}\n.snapshot-visual[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 9rem;\n  align-content: center;\n  justify-items: center;\n  overflow: hidden;\n  padding: 1rem;\n  color: #f7edcf;\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      color-mix(in srgb, var(--%NS%team-color), transparent 68%),\n      transparent 35%),\n    linear-gradient(\n      145deg,\n      #173d43,\n      #102926 60%,\n      #482f21);\n}\n.snapshot-visual[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: auto -15% 0;\n  height: 32%;\n  border-radius: 50% 50% 0 0;\n  background: rgba(11, 36, 39, 0.6666666667);\n  transform: rotate(-3deg);\n}\n.snapshot-visual[data-event=storm][_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle at 30% 18%,\n      #b7cbd0 0 2%,\n      transparent 3%),\n    linear-gradient(\n      145deg,\n      #273e49,\n      #172327 60%,\n      #0f171a);\n}\n.snapshot-visual[data-event=trade][_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      rgba(226, 187, 100, 0.5333333333),\n      transparent 30%),\n    linear-gradient(\n      145deg,\n      #244a40,\n      #17352d 60%,\n      #4c3522);\n}\n.snapshot-visual[data-event=discovery][_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      rgba(231, 206, 114, 0.6),\n      transparent 32%),\n    linear-gradient(\n      145deg,\n      #20526a,\n      #15313d 60%,\n      #263e2e);\n}\n.snapshot-number[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.75rem;\n  left: 0.75rem;\n  border: 1px solid rgba(234, 213, 149, 0.5333333333);\n  border-radius: 999px;\n  padding: 0.25rem 0.5rem;\n  background: rgba(10, 23, 22, 0.6666666667);\n  font-size: 0.65rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.snapshot-icon[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 5.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid rgba(240, 221, 154, 0.5333333333);\n  border-radius: 50%;\n  background: rgba(16, 37, 33, 0.6666666667);\n  font-size: 2.5rem;\n  box-shadow: 0 0 0 0.55rem rgba(247, 232, 176, 0.0509803922);\n}\n.snapshot-visual[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-top: 0.7rem;\n  font: italic 1.05rem Georgia, serif;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  padding: 1rem 1.1rem 0.7rem;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8a4f2d;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.4rem;\n  font-size: 1.35rem;\n  line-height: 1.05;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #5e503b;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.snapshot-controls[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2.8rem 1fr 2.8rem;\n  gap: 0.35rem;\n  padding: 0.2rem 1.1rem 0.65rem;\n}\n.snapshot-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.7rem;\n  border: 1px solid #8a7044;\n  border-radius: 0.35rem;\n  color: #493921;\n  background: #e1cf9e;\n  font-weight: 850;\n}\n.snapshot-controls[_ngcontent-%COMP%]   .play[_ngcontent-%COMP%] {\n  color: #f6edda;\n  background: #31594b;\n}\n.snapshot-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.42;\n  cursor: default;\n}\n.snapshot-dots[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.15rem 1rem 0.8rem;\n}\n.snapshot-dots[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  min-height: 2rem;\n  place-items: center;\n  border: 1px solid #9b8252;\n  border-radius: 50%;\n  color: #5c4a30;\n  background: transparent;\n  font-size: 0.66rem;\n  font-weight: 850;\n}\n.snapshot-dots[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #fff5da;\n  background: #31594b;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  border-top: 1px solid #baa574;\n  padding: 0.75rem 1.1rem;\n  background: #e5d29f;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #74502f;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.snapshot-panel[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #4d402f;\n  font-size: 0.78rem;\n  line-height: 1.4;\n}\n.compare-heading[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.compare-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 31rem;\n  color: #adbbb2;\n  font-size: 0.75rem;\n  line-height: 1.4;\n  text-align: right;\n}\n.class-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 0.55fr) 1.45fr;\n  gap: 0.55rem;\n  margin-top: 0.7rem;\n}\n.class-stats[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border: 1px solid #565840;\n  border-top: 0.22rem solid #bba15e;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #14221d;\n}\n.class-stats[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #bba86e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.class-stats[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0.18rem 0;\n  color: #f0dfad;\n  font: 800 1.35rem Georgia, serif;\n}\n.class-stats[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #a8b7ae;\n  font-size: 0.68rem;\n  line-height: 1.35;\n}\n.class-stats[_ngcontent-%COMP%]   .featured-outcome[_ngcontent-%COMP%] {\n  border-top-color: var(--%NS%team-color, #dfc16a);\n}\n.class-stats[_ngcontent-%COMP%]   .featured-outcome[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.simulation-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  margin-top: 0.55rem;\n  border: 1px dashed #7f7048;\n  border-radius: 0.4rem;\n  padding: 0.55rem 0.7rem;\n  color: #bcc8c0;\n  background: #101c19;\n}\n.simulation-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border-radius: 999px;\n  padding: 0.25rem 0.45rem;\n  color: #302919;\n  background: #d6b861;\n  font-size: 0.6rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.simulation-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.story-plan[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  border: 1px solid #78643d;\n  border-radius: 0.55rem;\n  padding: 0.85rem;\n  background:\n    linear-gradient(\n      145deg,\n      #253b32,\n      #14241f);\n}\n.story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.7rem;\n}\n.story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d7b963;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0.18rem;\n  font-size: 1.3rem;\n}\n.story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 30rem;\n  color: #b5c3ba;\n  font-size: 0.7rem;\n  line-height: 1.4;\n  text-align: right;\n}\n.story-plan[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.55rem;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-rows: auto auto 1fr auto;\n  min-height: 12rem;\n  overflow: hidden;\n  border: 1px solid #5a6049;\n  border-radius: 0.4rem;\n  padding: 0.8rem;\n  background: #10201b;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -0.25rem;\n  right: 0.45rem;\n  color: rgba(219, 192, 107, 0.1215686275);\n  font: 900 3.2rem Georgia, serif;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  position: relative;\n  color: #d0b460;\n  font-size: 0.59rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 0.45rem;\n  color: #f0e3bf;\n  font-size: 1rem;\n  line-height: 1.15;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  position: relative;\n  margin: 0.5rem 0 0.7rem;\n  color: #b9c5bd;\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.story-plan[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  border-top: 1px solid #46513f;\n  padding-top: 0.5rem;\n  color: #e0c675;\n  font-size: 0.66rem;\n  font-weight: 850;\n}\n.comparison-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 0.55rem;\n  margin-top: 0.7rem;\n}\n.comparison-intro[_ngcontent-%COMP%] {\n  grid-column: span 1;\n  border: 1px solid #846d40;\n  border-radius: 0.4rem;\n  padding: 0.8rem;\n  background: #273c31;\n}\n.comparison-intro[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.35rem;\n  font-size: 1.1rem;\n}\n.comparison-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #bcc8c0;\n  font-size: 0.7rem;\n  line-height: 1.4;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  border: 1px solid #565943;\n  border-top: 0.25rem solid var(--%NS%team-color);\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #14231e;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #9ead9f;\n  font-size: 0.58rem;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0.65rem 0;\n  color: #c5d0c7;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.comparison-grid[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  border-top: 1px solid #484e3a;\n  padding-top: 0.55rem;\n  color: #aab8ae;\n  font-size: 0.65rem;\n  line-height: 1.35;\n}\n.review-queue[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border: 1px solid #8c7443;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #342c20;\n  background: #efe0b9;\n}\n.review-queue[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.review-queue[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.review-queue[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.review-queue[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #8a4f2d;\n}\n.review-queue[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #315949;\n}\n.review-settings[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(10rem, 0.35fr) 1fr;\n  gap: 0.75rem;\n  margin: 0.85rem 0;\n}\n.review-settings[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.review-settings[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.review-settings[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #9b8356;\n  border-radius: 0.3rem;\n  padding: 0.55rem;\n  color: #30291f;\n  background: #fff8e6;\n}\n.submission-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n}\n.submission-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 1rem;\n  border: 1px solid #bea878;\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #fff6dc;\n}\n.submission-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #795b37;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.submission-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  color: #61523d;\n}\n.submission-list[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.submission-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 1px solid #755f39;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.7rem;\n  font-weight: 850;\n}\n.submission-list[_ngcontent-%COMP%]   .approve[_ngcontent-%COMP%] {\n  color: #eef9ef;\n  background: #315d49;\n}\n.submission-list[_ngcontent-%COMP%]   .revise[_ngcontent-%COMP%] {\n  color: #4b3325;\n  background: #e2bd72;\n}\n.empty-review[_ngcontent-%COMP%] {\n  color: #675943;\n}\n@media (max-width: 1050px) {\n  .story-mode[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .snapshot-panel[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(14rem, 0.75fr) 1fr;\n    grid-template-rows: auto auto auto;\n    min-height: 0;\n  }\n  .snapshot-visual[_ngcontent-%COMP%] {\n    grid-row: 1/4;\n  }\n  .snapshot-dots[_ngcontent-%COMP%] {\n    align-items: center;\n  }\n  .snapshot-panel[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n  .comparison-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .comparison-intro[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n  .story-plan[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 760px) {\n  .hero[_ngcontent-%COMP%], \n   .section-heading[_ngcontent-%COMP%], \n   .compare-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .mode-switch[_ngcontent-%COMP%], \n   .class-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .voyage-picker[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n  }\n  .story-progress[_ngcontent-%COMP%], \n   .compare-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n   .story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .snapshot-panel[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .comparison-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .comparison-intro[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n  .story-plan[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .review-settings[_ngcontent-%COMP%], \n   .submission-list[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .submission-list[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 520px) {\n  .class-map[_ngcontent-%COMP%] {\n    padding: 0.7rem;\n  }\n  .mode-switch[_ngcontent-%COMP%], \n   .class-stats[_ngcontent-%COMP%], \n   .story-plan[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 4.4rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=class-journey-map.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClassJourneyMapComponent, [{
    type: Component,
    args: [{ selector: "app-class-journey-map", imports: [LivingJourneyMapComponent], template: `<section class="class-map" aria-labelledby="class-map-title">
  <header class="hero">
    <div>
      <span>Class voyage gallery</span>
      <h2 id="class-map-title">One journey at a time. Then the whole class.</h2>
      <p>
        Follow a group\u2019s voyage through its key snapshots, then place that route beside every other
        class expedition.
      </p>
    </div>
    @if (runtime.isTeacher() && !isSimulatedSummary()) {
      <div class="live-status" role="status">
        <i aria-hidden="true"></i>Live class summary \xB7 {{ voyages().length }} voyages
      </div>
    } @else {
      <div class="demo-status" role="status">
        <strong>Simulated class</strong>
        <span>{{ displaySummary()?.classLabel }} \xB7 expected showcase performance</span>
      </div>
    }
  </header>

  <nav class="mode-switch" aria-label="Voyage presentation modes">
    <button
      type="button"
      [attr.aria-pressed]="mode() === 'snapshots'"
      (click)="setMode('snapshots')"
    >
      <span>Mode 1</span><strong>Voyage snapshots</strong
      ><small>Follow one group stop by stop</small>
    </button>
    <button type="button" [attr.aria-pressed]="mode() === 'compare'" (click)="setMode('compare')">
      <span>Mode 2</span><strong>Class comparison</strong
      ><small>See one route against the class</small>
    </button>
  </nav>

  <section class="voyage-picker" aria-labelledby="voyage-picker-title">
    <div>
      <span>Featured voyage</span>
      <h3 id="voyage-picker-title">Choose a group to follow</h3>
    </div>
    <div class="team-options">
      @for (voyage of voyages(); track voyage.voyageId) {
        <button
          type="button"
          [attr.aria-pressed]="selectedVoyage()?.voyageId === voyage.voyageId"
          [style.--team-color]="voyage.team.color"
          (click)="selectVoyage(voyage.voyageId)"
        >
          <span aria-hidden="true">{{ voyage.team.emblem }}</span>
          <strong>{{ voyage.team.name }}</strong>
        </button>
      } @empty {
        <p>No class voyages are available in this view.</p>
      }
    </div>
  </section>

  @if (selectedVoyage(); as selected) {
    @if (mode() === 'snapshots') {
      <section class="story-mode" aria-labelledby="story-title">
        <div class="story-map">
          <div class="section-heading">
            <div>
              <span>Single group voyage</span>
              <h3 id="story-title">{{ selected.team.emblem }} {{ selected.team.name }}</h3>
            </div>
            <div class="story-progress">
              <strong>{{ activeSnapshotIndex() + 1 }} / {{ snapshots().length }}</strong
              ><span>journey snapshots</span>
            </div>
          </div>
          <app-living-journey-map
            [map]="runtime.config.map"
            [route]="[]"
            [team]="selected.team"
            [classVoyages]="storyVoyage()"
            [featuredVoyageId]="selected.voyageId"
            mapLabel="Single group voyage revealed one snapshot at a time"
          />
        </div>

        <aside class="snapshot-panel" aria-label="Journey snapshot">
          @if (activeSnapshot(); as snapshot) {
            <div
              class="snapshot-visual"
              [attr.data-event]="snapshot.eventType ?? 'journey'"
              [style.--team-color]="selected.team.color"
            >
              <span class="snapshot-number">Snapshot {{ snapshot.sequence }}</span>
              <div class="snapshot-icon" aria-hidden="true">
                {{ snapshotIcon(snapshot.eventType) }}
              </div>
              <p>{{ snapshot.locationName }}</p>
            </div>
            <article aria-live="polite">
              <span>{{ snapshot.eventType ?? 'voyage log' }}</span>
              <h3>{{ snapshot.label }}</h3>
              <p>{{ snapshot.description }}</p>
            </article>
            <div class="snapshot-controls">
              <button
                type="button"
                aria-label="Previous snapshot"
                [disabled]="activeSnapshotIndex() === 0"
                (click)="previousSnapshot()"
              >
                \u2190
              </button>
              <button type="button" class="play" (click)="togglePlayback()">
                {{ playing() ? 'Pause story' : 'Play story' }}
              </button>
              <button
                type="button"
                aria-label="Next snapshot"
                [disabled]="activeSnapshotIndex() >= snapshots().length - 1"
                (click)="nextSnapshot()"
              >
                \u2192
              </button>
            </div>
          }
          <div class="snapshot-dots" aria-label="Choose a journey snapshot">
            @for (snapshot of snapshots(); track snapshot.id) {
              <button
                type="button"
                [attr.aria-label]="'Snapshot ' + snapshot.sequence + ': ' + snapshot.label"
                [attr.aria-pressed]="activeSnapshotIndex() === $index"
                (click)="selectSnapshot($index)"
              >
                <span>{{ snapshot.sequence }}</span>
              </button>
            }
          </div>
          <footer>
            <strong>Voyage outcome</strong>
            <p>{{ selected.outcome }}</p>
          </footer>
        </aside>
      </section>
    } @else {
      <section class="compare-mode" aria-labelledby="compare-title">
        <div class="section-heading compare-heading">
          <div>
            <span>Class view</span>
            <h3 id="compare-title">
              {{ selected.team.name }} compared with {{ voyages().length - 1 }} other voyages
            </h3>
          </div>
          <p>
            The featured route stays bright. Other routes provide class context without combining
            student records.
          </p>
        </div>

        <app-living-journey-map
          [map]="runtime.config.map"
          [route]="[]"
          [team]="selected.team"
          [classVoyages]="compareVoyages()"
          [featuredVoyageId]="selected.voyageId"
          [intersections]="intersections()"
          mapLabel="Selected group voyage highlighted against all other class voyages"
        />

        <div class="class-stats" aria-label="Class voyage summary">
          <article>
            <span>Journey progress</span
            ><strong>{{ classPerformance().completionPercent }}%</strong>
            <p>of all class chapters complete</p>
          </article>
          <article>
            <span>Reasoning ready</span
            ><strong>{{ classPerformance().reasoningReadyPercent }}%</strong>
            <p>of reviewed criteria at proficient or advanced</p>
          </article>
          <article>
            <span>Teacher queue</span><strong>{{ classPerformance().awaitingReviewCount }}</strong>
            <p>awaiting review \xB7 {{ classPerformance().approvedCount }} approved</p>
          </article>
          <article class="featured-outcome" [style.--team-color]="selected.team.color">
            <span>Featured outcome</span
            ><strong>{{ selected.team.emblem }} {{ selected.team.name }}</strong>
            <p>{{ selected.outcome }}</p>
          </article>
        </div>

        @if (isSimulatedSummary()) {
          <aside class="simulation-note" role="note">
            <span>Preview data</span>
            <p>
              These are fictional crew records showing how a completed class might look. They are
              never saved as student work and disappear when a live authorized summary is present.
            </p>
          </aside>
        }

        <section class="story-plan" aria-labelledby="story-plan-title">
          <header>
            <div>
              <span>Planned class story</span>
              <h3 id="story-plan-title">The moments worth putting on the big screen</h3>
            </div>
            <p>
              A teacher-led reveal can move from launch, to crisis, to global outcomes, to visible
              revision.
            </p>
          </header>
          <div>
            @for (beat of classStoryBeats(); track beat.id) {
              <article>
                <span>{{ $index + 1 < 10 ? '0' + ($index + 1) : $index + 1 }}</span>
                <small>{{ beat.kicker }}</small>
                <h4>{{ beat.title }}</h4>
                <p>{{ beat.body }}</p>
                <footer>{{ beat.stat }}</footer>
              </article>
            }
          </div>
        </section>

        <section class="comparison-grid" aria-labelledby="route-comparisons-title">
          <div class="comparison-intro">
            <span>Route-by-route</span>
            <h3 id="route-comparisons-title">What changed across the class?</h3>
            <p>
              Compare shared decisions, different destinations, and the consequences each group
              recorded.
            </p>
          </div>
          @for (comparison of comparisons(); track comparison.voyage.voyageId) {
            <article [style.--team-color]="comparison.voyage.team.color">
              <header>
                <span aria-hidden="true">{{ comparison.voyage.team.emblem }}</span>
                <div>
                  <strong>{{ comparison.voyage.team.name }}</strong
                  ><small
                    >{{ comparison.uniqueLocationCount }} different named stop{{
                      comparison.uniqueLocationCount === 1 ? '' : 's'
                    }}</small
                  >
                </div>
              </header>
              <p>{{ comparison.summary }}</p>
              <footer>{{ comparison.voyage.outcome }}</footer>
            </article>
          }
        </section>
      </section>
    }
  }

  @if (runtime.isTeacher()) {
    <section class="review-queue" aria-labelledby="review-queue-title">
      <header>
        <div>
          <span>Authoritative assessment</span>
          <h3 id="review-queue-title">Replay approval queue</h3>
        </div>
        <strong>{{ pendingReviews().length }} awaiting review</strong>
      </header>
      <div class="review-settings">
        <label
          >Mastery level
          <select [value]="reviewLevel()" (change)="setReviewLevel($event)">
            <option value="developing">Developing</option>
            <option value="proficient">Proficient</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label
          >Feedback<textarea
            rows="2"
            [value]="reviewFeedback()"
            (input)="setReviewFeedback($event)"
            placeholder="Add evidence-based feedback"
          ></textarea>
        </label>
      </div>
      <div class="submission-list">
        @for (member of pendingReviews(); track member.studentId) {
          <article>
            <div>
              <span>{{ member.completedStepCount }} / {{ member.totalStepCount }} chapters</span>
              <h4>{{ member.studentDisplayName }}</h4>
              <p>
                {{ member.responsePreview || 'Replay and journey record are ready for review.' }}
              </p>
            </div>
            <footer>
              <button type="button" class="revise" (click)="review(member, 'revision-requested')">
                Request revision</button
              ><button type="button" class="approve" (click)="review(member, 'approved')">
                Approve replay
              </button>
            </footer>
          </article>
        } @empty {
          <p class="empty-review">No submitted journeys are waiting for review.</p>
        }
      </div>
    </section>
  }
</section>
`, styles: ['/* src/app/templates/journey-replay/ui/class-journey-map.component.scss */\n:host {\n  display: block;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.class-map {\n  width: min(96rem, 100%);\n  margin: 0 auto;\n  padding: 1rem;\n  color: #ecdfbd;\n}\nh2,\nh3,\nh4,\np {\n  margin: 0;\n}\nh2,\nh3,\nh4 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\nbutton,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #71d2da;\n  outline-offset: 2px;\n}\n.hero {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1.25rem;\n  margin-bottom: 1rem;\n}\n.hero > div:first-child {\n  max-width: 72rem;\n}\n.hero span,\n.voyage-picker > div > span,\n.section-heading span,\n.comparison-intro > span,\n.review-queue header span {\n  color: #d2b463;\n  font-size: 0.67rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.hero h2 {\n  margin: 0.22rem 0 0.45rem;\n  font-size: clamp(1.65rem, 3.2vw, 3rem);\n  line-height: 1;\n}\n.hero p {\n  color: #b9c8bd;\n  line-height: 1.5;\n}\n.demo-status,\n.live-status {\n  flex: 0 0 auto;\n  border: 1px solid #76663e;\n  border-radius: 999px;\n  padding: 0.55rem 0.8rem;\n  color: #d8c99f;\n  background: #172720;\n  font-size: 0.72rem;\n  font-weight: 800;\n}\n.live-status {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.live-status i {\n  width: 0.58rem;\n  height: 0.58rem;\n  border-radius: 50%;\n  background: #63c28a;\n  box-shadow: 0 0 0.6rem #63c28a;\n}\n.demo-status {\n  display: grid;\n  gap: 0.12rem;\n  border-radius: 0.45rem;\n}\n.demo-status strong {\n  color: #efd27d;\n  font-size: 0.68rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.demo-status span {\n  color: #b9c7bd;\n  font-size: 0.64rem;\n  letter-spacing: normal;\n  text-transform: none;\n}\n.mode-switch {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.7rem;\n  margin-bottom: 0.8rem;\n}\n.mode-switch button {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.08rem 0.75rem;\n  min-height: 5rem;\n  align-content: center;\n  border: 1px solid #5e6045;\n  border-radius: 0.55rem;\n  padding: 0.7rem 1rem;\n  color: #d9cfb2;\n  background:\n    linear-gradient(\n      135deg,\n      #15241f,\n      #1c3029);\n  text-align: left;\n}\n.mode-switch button::after {\n  content: "";\n  position: absolute;\n  inset: auto 0 0;\n  height: 0.25rem;\n  border-radius: 0 0 0.55rem 0.55rem;\n  background: transparent;\n}\n.mode-switch button:hover,\n.mode-switch button[aria-pressed=true] {\n  border-color: #d6b960;\n  background:\n    linear-gradient(\n      135deg,\n      #244337,\n      #172b25);\n}\n.mode-switch button[aria-pressed=true]::after {\n  background: #e0bf65;\n}\n.mode-switch button > span {\n  grid-row: 1/3;\n  align-self: center;\n  border: 1px solid #8d7544;\n  border-radius: 999px;\n  padding: 0.35rem 0.5rem;\n  color: #e3c56f;\n  font-size: 0.67rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.mode-switch strong {\n  font: 800 1.05rem Georgia, serif;\n}\n.mode-switch small {\n  color: #aabcb0;\n  font-size: 0.7rem;\n}\n.voyage-picker {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  align-items: center;\n  gap: 1.2rem;\n  margin-bottom: 0.8rem;\n  border: 1px solid #514f39;\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.75rem;\n  background: #101d19;\n}\n.voyage-picker h3 {\n  margin-top: 0.14rem;\n  font-size: 1rem;\n}\n.team-options {\n  display: flex;\n  gap: 0.4rem;\n  overflow-x: auto;\n  padding: 0.15rem;\n}\n.team-options button {\n  display: flex;\n  min-width: 8.5rem;\n  min-height: 2.8rem;\n  flex: 1 0 auto;\n  align-items: center;\n  gap: 0.45rem;\n  border: 1px solid #5f5e43;\n  border-left: 0.28rem solid var(--team-color);\n  border-radius: 0.35rem;\n  padding: 0.45rem 0.6rem;\n  color: #d7ccb0;\n  background: #1b2b25;\n}\n.team-options button:hover,\n.team-options button[aria-pressed=true] {\n  border-color: var(--team-color);\n  color: #17231f;\n  background: #e7d69e;\n}\n.team-options button span {\n  font-size: 1.2rem;\n}\n.team-options strong {\n  font-size: 0.73rem;\n}\n.story-mode {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(18rem, 25rem);\n  gap: 0.8rem;\n  align-items: stretch;\n}\n.story-map {\n  min-width: 0;\n  --journey-map-height: clamp(18rem, calc(100dvh - 43rem), 27rem);\n  --journey-map-min-height: 18rem;\n}\n.section-heading {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 1rem;\n  min-height: 4.1rem;\n  padding: 0.4rem 0.1rem 0.65rem;\n}\n.section-heading h3 {\n  margin-top: 0.2rem;\n  font-size: clamp(1.25rem, 2vw, 1.8rem);\n}\n.story-progress {\n  display: grid;\n  color: #a9b9ae;\n  font-size: 0.66rem;\n  text-align: right;\n}\n.story-progress strong {\n  color: #e4c66e;\n  font: 800 1.1rem Georgia, serif;\n}\n.snapshot-panel {\n  display: grid;\n  grid-template-rows: minmax(12rem, 1fr) auto auto auto auto;\n  min-height: 30rem;\n  overflow: hidden;\n  border: 1px solid #a18850;\n  border-radius: 0.6rem;\n  color: #312b22;\n  background: #efe2bd;\n  box-shadow: 0 1rem 2rem rgba(4, 8, 7, 0.5333333333);\n}\n.snapshot-visual {\n  position: relative;\n  display: grid;\n  min-height: 9rem;\n  align-content: center;\n  justify-items: center;\n  overflow: hidden;\n  padding: 1rem;\n  color: #f7edcf;\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      color-mix(in srgb, var(--team-color), transparent 68%),\n      transparent 35%),\n    linear-gradient(\n      145deg,\n      #173d43,\n      #102926 60%,\n      #482f21);\n}\n.snapshot-visual::before {\n  content: "";\n  position: absolute;\n  inset: auto -15% 0;\n  height: 32%;\n  border-radius: 50% 50% 0 0;\n  background: rgba(11, 36, 39, 0.6666666667);\n  transform: rotate(-3deg);\n}\n.snapshot-visual[data-event=storm] {\n  background:\n    radial-gradient(\n      circle at 30% 18%,\n      #b7cbd0 0 2%,\n      transparent 3%),\n    linear-gradient(\n      145deg,\n      #273e49,\n      #172327 60%,\n      #0f171a);\n}\n.snapshot-visual[data-event=trade] {\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      rgba(226, 187, 100, 0.5333333333),\n      transparent 30%),\n    linear-gradient(\n      145deg,\n      #244a40,\n      #17352d 60%,\n      #4c3522);\n}\n.snapshot-visual[data-event=discovery] {\n  background:\n    radial-gradient(\n      circle at 70% 20%,\n      rgba(231, 206, 114, 0.6),\n      transparent 32%),\n    linear-gradient(\n      145deg,\n      #20526a,\n      #15313d 60%,\n      #263e2e);\n}\n.snapshot-number {\n  position: absolute;\n  top: 0.75rem;\n  left: 0.75rem;\n  border: 1px solid rgba(234, 213, 149, 0.5333333333);\n  border-radius: 999px;\n  padding: 0.25rem 0.5rem;\n  background: rgba(10, 23, 22, 0.6666666667);\n  font-size: 0.65rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.snapshot-icon {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 5.5rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid rgba(240, 221, 154, 0.5333333333);\n  border-radius: 50%;\n  background: rgba(16, 37, 33, 0.6666666667);\n  font-size: 2.5rem;\n  box-shadow: 0 0 0 0.55rem rgba(247, 232, 176, 0.0509803922);\n}\n.snapshot-visual > p {\n  position: relative;\n  z-index: 1;\n  margin-top: 0.7rem;\n  font: italic 1.05rem Georgia, serif;\n}\n.snapshot-panel > article {\n  padding: 1rem 1.1rem 0.7rem;\n}\n.snapshot-panel > article > span {\n  color: #8a4f2d;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.snapshot-panel > article h3 {\n  margin: 0.2rem 0 0.4rem;\n  font-size: 1.35rem;\n  line-height: 1.05;\n}\n.snapshot-panel > article p {\n  color: #5e503b;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.snapshot-controls {\n  display: grid;\n  grid-template-columns: 2.8rem 1fr 2.8rem;\n  gap: 0.35rem;\n  padding: 0.2rem 1.1rem 0.65rem;\n}\n.snapshot-controls button {\n  min-height: 2.7rem;\n  border: 1px solid #8a7044;\n  border-radius: 0.35rem;\n  color: #493921;\n  background: #e1cf9e;\n  font-weight: 850;\n}\n.snapshot-controls .play {\n  color: #f6edda;\n  background: #31594b;\n}\n.snapshot-controls button:disabled {\n  opacity: 0.42;\n  cursor: default;\n}\n.snapshot-dots {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.15rem 1rem 0.8rem;\n}\n.snapshot-dots button {\n  display: grid;\n  width: 2rem;\n  min-height: 2rem;\n  place-items: center;\n  border: 1px solid #9b8252;\n  border-radius: 50%;\n  color: #5c4a30;\n  background: transparent;\n  font-size: 0.66rem;\n  font-weight: 850;\n}\n.snapshot-dots button[aria-pressed=true] {\n  color: #fff5da;\n  background: #31594b;\n}\n.snapshot-panel > footer {\n  border-top: 1px solid #baa574;\n  padding: 0.75rem 1.1rem;\n  background: #e5d29f;\n}\n.snapshot-panel > footer strong {\n  color: #74502f;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n}\n.snapshot-panel > footer p {\n  margin-top: 0.25rem;\n  color: #4d402f;\n  font-size: 0.78rem;\n  line-height: 1.4;\n}\n.compare-heading {\n  align-items: center;\n}\n.compare-heading > p {\n  max-width: 31rem;\n  color: #adbbb2;\n  font-size: 0.75rem;\n  line-height: 1.4;\n  text-align: right;\n}\n.class-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 0.55fr) 1.45fr;\n  gap: 0.55rem;\n  margin-top: 0.7rem;\n}\n.class-stats article {\n  border: 1px solid #565840;\n  border-top: 0.22rem solid #bba15e;\n  border-radius: 0.4rem;\n  padding: 0.7rem;\n  background: #14221d;\n}\n.class-stats article > span {\n  color: #bba86e;\n  font-size: 0.6rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.class-stats article > strong {\n  display: block;\n  margin: 0.18rem 0;\n  color: #f0dfad;\n  font: 800 1.35rem Georgia, serif;\n}\n.class-stats article > p {\n  color: #a8b7ae;\n  font-size: 0.68rem;\n  line-height: 1.35;\n}\n.class-stats .featured-outcome {\n  border-top-color: var(--team-color, #dfc16a);\n}\n.class-stats .featured-outcome > strong {\n  font-size: 1rem;\n}\n.simulation-note {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  margin-top: 0.55rem;\n  border: 1px dashed #7f7048;\n  border-radius: 0.4rem;\n  padding: 0.55rem 0.7rem;\n  color: #bcc8c0;\n  background: #101c19;\n}\n.simulation-note span {\n  flex: 0 0 auto;\n  border-radius: 999px;\n  padding: 0.25rem 0.45rem;\n  color: #302919;\n  background: #d6b861;\n  font-size: 0.6rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.simulation-note p {\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.story-plan {\n  margin-top: 0.75rem;\n  border: 1px solid #78643d;\n  border-radius: 0.55rem;\n  padding: 0.85rem;\n  background:\n    linear-gradient(\n      145deg,\n      #253b32,\n      #14241f);\n}\n.story-plan > header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.7rem;\n}\n.story-plan > header span {\n  color: #d7b963;\n  font-size: 0.64rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.story-plan > header h3 {\n  margin-top: 0.18rem;\n  font-size: 1.3rem;\n}\n.story-plan > header p {\n  max-width: 30rem;\n  color: #b5c3ba;\n  font-size: 0.7rem;\n  line-height: 1.4;\n  text-align: right;\n}\n.story-plan > div {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.55rem;\n}\n.story-plan article {\n  position: relative;\n  display: grid;\n  grid-template-rows: auto auto 1fr auto;\n  min-height: 12rem;\n  overflow: hidden;\n  border: 1px solid #5a6049;\n  border-radius: 0.4rem;\n  padding: 0.8rem;\n  background: #10201b;\n}\n.story-plan article > span {\n  position: absolute;\n  top: -0.25rem;\n  right: 0.45rem;\n  color: rgba(219, 192, 107, 0.1215686275);\n  font: 900 3.2rem Georgia, serif;\n}\n.story-plan article > small {\n  position: relative;\n  color: #d0b460;\n  font-size: 0.59rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.story-plan article h4 {\n  position: relative;\n  margin-top: 0.45rem;\n  color: #f0e3bf;\n  font-size: 1rem;\n  line-height: 1.15;\n}\n.story-plan article p {\n  position: relative;\n  margin: 0.5rem 0 0.7rem;\n  color: #b9c5bd;\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.story-plan article footer {\n  border-top: 1px solid #46513f;\n  padding-top: 0.5rem;\n  color: #e0c675;\n  font-size: 0.66rem;\n  font-weight: 850;\n}\n.comparison-grid {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 0.55rem;\n  margin-top: 0.7rem;\n}\n.comparison-intro {\n  grid-column: span 1;\n  border: 1px solid #846d40;\n  border-radius: 0.4rem;\n  padding: 0.8rem;\n  background: #273c31;\n}\n.comparison-intro h3 {\n  margin: 0.2rem 0 0.35rem;\n  font-size: 1.1rem;\n}\n.comparison-intro p {\n  color: #bcc8c0;\n  font-size: 0.7rem;\n  line-height: 1.4;\n}\n.comparison-grid > article {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  border: 1px solid #565943;\n  border-top: 0.25rem solid var(--team-color);\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #14231e;\n}\n.comparison-grid > article header {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.comparison-grid > article header > span {\n  font-size: 1.3rem;\n}\n.comparison-grid > article header div {\n  display: grid;\n}\n.comparison-grid > article header strong {\n  font-size: 0.75rem;\n}\n.comparison-grid > article header small {\n  color: #9ead9f;\n  font-size: 0.58rem;\n}\n.comparison-grid > article > p {\n  margin: 0.65rem 0;\n  color: #c5d0c7;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.comparison-grid > article > footer {\n  border-top: 1px solid #484e3a;\n  padding-top: 0.55rem;\n  color: #aab8ae;\n  font-size: 0.65rem;\n  line-height: 1.35;\n}\n.review-queue {\n  margin-top: 1rem;\n  border: 1px solid #8c7443;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #342c20;\n  background: #efe0b9;\n}\n.review-queue > header {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.review-queue h3,\n.review-queue h4 {\n  margin: 0;\n}\n.review-queue header span {\n  color: #8a4f2d;\n}\n.review-queue header > strong {\n  color: #315949;\n}\n.review-settings {\n  display: grid;\n  grid-template-columns: minmax(10rem, 0.35fr) 1fr;\n  gap: 0.75rem;\n  margin: 0.85rem 0;\n}\n.review-settings label {\n  display: grid;\n  gap: 0.3rem;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.review-settings select,\n.review-settings textarea {\n  width: 100%;\n  border: 1px solid #9b8356;\n  border-radius: 0.3rem;\n  padding: 0.55rem;\n  color: #30291f;\n  background: #fff8e6;\n}\n.submission-list {\n  display: grid;\n  gap: 0.6rem;\n}\n.submission-list article {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 1rem;\n  border: 1px solid #bea878;\n  border-radius: 0.4rem;\n  padding: 0.75rem;\n  background: #fff6dc;\n}\n.submission-list article span {\n  color: #795b37;\n  font-size: 0.68rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.submission-list article p {\n  margin-top: 0.3rem;\n  color: #61523d;\n}\n.submission-list footer {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.submission-list button {\n  min-height: 2.5rem;\n  border: 1px solid #755f39;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.7rem;\n  font-weight: 850;\n}\n.submission-list .approve {\n  color: #eef9ef;\n  background: #315d49;\n}\n.submission-list .revise {\n  color: #4b3325;\n  background: #e2bd72;\n}\n.empty-review {\n  color: #675943;\n}\n@media (max-width: 1050px) {\n  .story-mode {\n    grid-template-columns: 1fr;\n  }\n  .snapshot-panel {\n    grid-template-columns: minmax(14rem, 0.75fr) 1fr;\n    grid-template-rows: auto auto auto;\n    min-height: 0;\n  }\n  .snapshot-visual {\n    grid-row: 1/4;\n  }\n  .snapshot-dots {\n    align-items: center;\n  }\n  .snapshot-panel > footer {\n    grid-column: 1/-1;\n  }\n  .comparison-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .comparison-intro {\n    grid-column: 1/-1;\n  }\n  .story-plan > div {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 760px) {\n  .hero,\n  .section-heading,\n  .compare-heading {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .mode-switch,\n  .class-stats {\n    grid-template-columns: 1fr 1fr;\n  }\n  .voyage-picker {\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n  }\n  .story-progress,\n  .compare-heading > p,\n  .story-plan > header p {\n    text-align: left;\n  }\n  .snapshot-panel {\n    display: block;\n  }\n  .comparison-grid {\n    grid-template-columns: 1fr;\n  }\n  .comparison-intro {\n    grid-column: auto;\n  }\n  .story-plan > header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .review-settings,\n  .submission-list article {\n    grid-template-columns: 1fr;\n  }\n  .submission-list footer {\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 520px) {\n  .class-map {\n    padding: 0.7rem;\n  }\n  .mode-switch,\n  .class-stats,\n  .story-plan > div {\n    grid-template-columns: 1fr;\n  }\n  .mode-switch button {\n    min-height: 4.4rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=class-journey-map.component.css.map */\n'] }]
  }], null, { initialMode: [{ type: Input, args: [{ isSignal: true, alias: "initialMode", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClassJourneyMapComponent, { className: "ClassJourneyMapComponent", filePath: "src/app/templates/journey-replay/ui/class-journey-map.component.ts", lineNumber: 58 });
})();
function buildVoyageSnapshots(voyage, map) {
  if (voyage === void 0)
    return [];
  const meaningfulPoints = voyage.route.map((point, routeIndex) => ({ point, routeIndex })).filter(({ point }, index) => point.locationId !== void 0 || point.eventLabel !== void 0 || index === voyage.route.length - 1);
  return meaningfulPoints.map(({ point, routeIndex }, index) => {
    const location = map.locations.find((item) => item.id === point.locationId);
    const isLast = routeIndex === voyage.route.length - 1;
    return {
      id: `${voyage.voyageId}-snapshot-${routeIndex}`,
      routeIndex,
      sequence: index + 1,
      locationName: location?.name ?? (isLast ? "Final position" : "At sea"),
      label: point.eventLabel ?? (isLast ? voyage.outcome : `Reached ${location?.name ?? "a new waypoint"}`),
      description: location?.description ?? (isLast ? voyage.outcome : "The voyage continued across open water."),
      eventType: point.eventType
    };
  });
}
function compareVoyages(selected, voyages, map) {
  if (selected === void 0)
    return [];
  const selectedLocations = new Set(selected.route.flatMap((point) => point.locationId ?? []));
  return voyages.filter((voyage) => voyage.voyageId !== selected.voyageId).map((voyage) => {
    const routeLocations = new Set(voyage.route.flatMap((point) => point.locationId ?? []));
    const sharedIds = [...selectedLocations].filter((locationId) => routeLocations.has(locationId));
    const sharedLocationNames = sharedIds.map((locationId) => map.locations.find((location) => location.id === locationId)?.shortName ?? locationId);
    const uniqueLocationCount = [...routeLocations].filter((locationId) => !selectedLocations.has(locationId)).length;
    const summary = sharedLocationNames.length > 0 ? `Shared ${sharedLocationNames.join(" and ")} before the routes separated.` : "This voyage followed a completely different set of named stops.";
    return { voyage, sharedLocationNames, uniqueLocationCount, summary };
  });
}
function summarizeClassPerformance(summary) {
  const members = summary?.members ?? [];
  const possibleSteps = members.reduce((total, member) => total + member.totalStepCount, 0);
  const completedSteps = members.reduce((total, member) => total + member.completedStepCount, 0);
  const assessments = members.flatMap((member) => member.submission?.mastery ?? []);
  const reasoningReady = assessments.filter((assessment) => assessment.level !== "developing").length;
  return {
    completionPercent: possibleSteps === 0 ? 0 : Math.round(completedSteps / possibleSteps * 100),
    reasoningReadyPercent: assessments.length === 0 ? 0 : Math.round(reasoningReady / assessments.length * 100),
    approvedCount: members.filter((member) => member.submission?.status === "approved").length,
    awaitingReviewCount: members.filter((member) => member.submission?.status === "submitted").length,
    revisionCount: members.filter((member) => member.submission?.status === "revision-requested" || (member.submission?.revision ?? 0) > 1).length
  };
}
function buildClassStoryBeats(voyages, map, summary) {
  if (voyages.length === 0)
    return [];
  const namedPoints = voyages.flatMap((voyage) => voyage.route.flatMap((point) => point.locationId ? [{ voyage, point }] : []));
  const startNames = [
    ...new Set(voyages.flatMap((voyage) => {
      const id = voyage.route.find((point) => point.locationId)?.locationId;
      return id ? [map.locations.find((location) => location.id === id)?.shortName ?? id] : [];
    }))
  ];
  const stormMoments = namedPoints.filter(({ point }) => point.eventType === "storm");
  const destinationNames = [
    ...new Set(voyages.flatMap((voyage) => {
      const id = [...voyage.route].reverse().find((point) => point.locationId)?.locationId;
      return id ? [map.locations.find((location) => location.id === id)?.shortName ?? id] : [];
    }))
  ];
  const revisedCount = summary?.members.filter((member) => member.submission?.status === "revision-requested" || (member.submission?.revision ?? 0) > 1).length ?? 0;
  return [
    {
      id: "class-story-departure",
      kicker: "Opening scene",
      title: `${voyages.length} crews leave the chart table`,
      body: `${startNames.join(" and ")} become the starting points for a class full of competing plans.`,
      stat: `${startNames.length} first recorded port${startNames.length === 1 ? "" : "s"}`
    },
    {
      id: "class-story-crisis",
      kicker: "Turning point",
      title: stormMoments.length > 0 ? "The storm redraws the race" : "The routes split",
      body: stormMoments.length > 0 ? `${stormMoments.map(({ point }) => point.eventLabel).join(" \xB7 ")}. One shared danger produces very different consequences.` : "Crews use the same map evidence but defend different passages and tradeoffs.",
      stat: `${stormMoments.length > 0 ? stormMoments.length : voyages.length} route-changing moment${(stormMoments.length > 0 ? stormMoments.length : voyages.length) === 1 ? "" : "s"}`
    },
    {
      id: "class-story-destinations",
      kicker: "Big reveal",
      title: `${destinationNames.length} endings\u2014no single version of success`,
      body: `The final map reaches ${destinationNames.join(", ")} and makes distance, safety, impact, and discovery visible together.`,
      stat: `${destinationNames.length} final destinations`
    },
    {
      id: "class-story-revision",
      kicker: "Reflection",
      title: `${revisedCount} crews change their thinking`,
      body: "The final story shows revisions beside the route, so learning is visible as a change in reasoning\u2014not just a finished line.",
      stat: `${revisedCount} revised records`
    }
  ];
}

export {
  ClassJourneyMapComponent
};
//# debugId=5e0fcd71-425f-5c34-b242-2bcb2660d652
//# sourceMappingURL=chunk-D6EU5EB6.js.map
