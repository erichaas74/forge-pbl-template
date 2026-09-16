import {
  HallCorridorComponent,
  MuseumWalkthroughComponent
} from "./chunk-3QPUEH3H.js";
import {
  MuseumBoardComponent
} from "./chunk-EJZFN5UH.js";
import {
  EXHIBIT_RENDERER_COMPONENTS,
  isMuseumBoardSnapshotData
} from "./chunk-NP2TX5O3.js";
import "./chunk-ICIU3PCK.js";
import "./chunk-MNKXLJET.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
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
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  studentMuseumConfig
} from "./chunk-H3T5E4GB.js";
import "./chunk-X7Y4LULJ.js";
import "./chunk-WLIGGVEP.js";
import "./chunk-SUG7Z2TW.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/exhibit-hall/ui/exhibit-collection-presentation.component.ts
var _c0 = ["wingHeading"];
var _forTrack0 = ($index, $item) => $item.locationId;
function ExhibitCollectionPresentationComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 3)(1, "span");
    \u0275\u0275text(2, "CURATOR TOUR \xB7 COMPLETED SAMPLE TRANSCRIPT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "details")(8, "summary");
    \u0275\u0275text(9, "See the curator\u2019s learning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dl")(11, "dt");
    \u0275\u0275text(12, "First claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "dd");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dt");
    \u0275\u0275text(16, "Feedback question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "dd");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dt");
    \u0275\u0275text(20, "Revision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "dt");
    \u0275\u0275text(24, "Individual reflection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const record_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.selected().team.displayName, " explains");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r3.transcript);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(record_r3.initialClaim);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r3.feedback);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r3.revision);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r3.reflection);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-museum-walkthrough", 2);
    \u0275\u0275listener("opened", function ExhibitCollectionPresentationComponent_Conditional_0_Template_app_museum_walkthrough_opened_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectedId.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(1, ExhibitCollectionPresentationComponent_Conditional_0_Conditional_1_Template, 27, 6, "article", 3);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("locations", ctx_r1.locations());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.selectedId() && ctx_r1.curator()) ? 1 : -1, tmp_2_0);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function ExhibitCollectionPresentationComponent_Conditional_1_For_16_Template_button_click_0_listener() {
      const location_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.open(location_r6.hanging.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.selected().locationId === location_r6.locationId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", location_r6.position + 1, " \xB7 ", location_r6.snapshot?.accessibleData?.title, " ");
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-hall-corridor", 10);
    \u0275\u0275listener("opened", function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_17_Template_app_hall_corridor_opened_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.open($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("locations", ctx_r1.locations())("focusedHangingId", ctx_r1.selected().hanging?.id);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedId.set(void 0));
    });
    \u0275\u0275text(1, " \u2190 Return to all wings ");
    \u0275\u0275elementEnd();
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Conditional_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 15)(1, "span");
    \u0275\u0275text(2, "BUILDER GUIDANCE EXAMPLE \xB7 CURATOR THINKING");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dl")(4, "dt");
    \u0275\u0275text(5, "First claim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dd");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dt");
    \u0275\u0275text(9, "Feedback question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dt");
    \u0275\u0275text(13, "Revision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dt");
    \u0275\u0275text(17, "Individual reflection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r9 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(record_r9.initialClaim);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r9.feedback);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r9.revision);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(record_r9.reflection);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 3)(1, "span");
    \u0275\u0275text(2, "CURATOR TOUR \xB7 COMPLETED SAMPLE TRANSCRIPT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Conditional_5_Conditional_7_Template, 20, 4, "aside", 15);
  }
  if (rf & 2) {
    const location_r10 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", location_r10.team.displayName, " explains");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.transcript);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.teacherView() ? 7 : -1);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12)(1, "h2", 13, 0);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-museum-board", 14);
    \u0275\u0275conditionalCreate(5, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Conditional_5_Template, 8, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const location_r10 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(location_r10.snapshot?.accessibleData?.title);
    \u0275\u0275advance();
    \u0275\u0275property("data", location_r10.snapshot?.visitorSafeData);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.curator()) ? 5 : -1, tmp_7_0);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Conditional_0_Template, 6, 3, "section", 12);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.selected()) ? 0 : -1, tmp_2_0);
  }
}
function ExhibitCollectionPresentationComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 1)(1, "header")(2, "div")(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Small objects. Big stories.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Step into a wing, inspect its objects, and read the curator\u2019s explanation.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "nav", 4)(10, "button", 5);
    \u0275\u0275listener("click", function ExhibitCollectionPresentationComponent_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.teacherView.set(false));
    });
    \u0275\u0275text(11, " Family view");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 5);
    \u0275\u0275listener("click", function ExhibitCollectionPresentationComponent_Conditional_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.teacherView.set(true));
    });
    \u0275\u0275text(13, " Teacher view ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "nav", 6);
    \u0275\u0275repeaterCreate(15, ExhibitCollectionPresentationComponent_Conditional_1_For_16_Template, 2, 3, "button", 7, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_17_Template, 1, 2, "app-hall-corridor", 8)(18, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_18_Template, 2, 0, "button", 9);
    \u0275\u0275conditionalCreate(19, ExhibitCollectionPresentationComponent_Conditional_1_Conditional_19_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("THE CLASS MUSEUM \xB7 ", ctx_r1.locations().length, " COMPLETED WINGS");
    \u0275\u0275advance(6);
    \u0275\u0275attribute("aria-pressed", !ctx_r1.teacherView());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.teacherView());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.locations());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.selectedId() ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedId() ? 19 : -1);
  }
}
var ExhibitCollectionPresentationComponent = class _ExhibitCollectionPresentationComponent {
  locations = input.required(
    ...ngDevMode ? [{ debugName: "locations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  curators = input.required(
    ...ngDevMode ? [{ debugName: "curators" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherView = signal(
    false,
    ...ngDevMode ? [{ debugName: "teacherView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nativeMuseum = computed(
    () => this.locations().some((location) => isMuseumBoardSnapshotData(location.snapshot?.visitorSafeData) && location.snapshot?.visitorSafeData.museumRoom),
    ...ngDevMode ? [{ debugName: "nativeMuseum" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = computed(
    () => this.locations().find((item) => item.hanging?.id === this.selectedId()) ?? this.locations()[0],
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  curator = computed(
    () => this.curators().find((item) => item.hangingId === this.selected().hanging?.id),
    ...ngDevMode ? [{ debugName: "curator" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heading = viewChild(
    "wingHeading",
    ...ngDevMode ? [{ debugName: "heading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  open(id) {
    this.selectedId.set(id);
    afterNextRender(() => {
      const element = this.heading()?.nativeElement;
      element?.scrollIntoView({ block: "nearest" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function ExhibitCollectionPresentationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExhibitCollectionPresentationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExhibitCollectionPresentationComponent, selectors: [["app-exhibit-collection-presentation"]], viewQuery: function ExhibitCollectionPresentationComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.heading, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { locations: [1, "locations"], curators: [1, "curators"] }, decls: 2, vars: 1, consts: [["wingHeading", ""], [1, "collection"], [3, "opened", "locations"], [1, "curator"], ["aria-label", "Museum audience"], ["type", "button", 3, "click"], ["aria-label", "Gallery list \u2014 choose a wing", 1, "accessible-list"], ["type", "button"], [3, "locations", "focusedHangingId"], ["type", "button", 1, "return-corridor"], [3, "opened", "locations", "focusedHangingId"], ["type", "button", 1, "return-corridor", 3, "click"], [1, "walkup"], ["tabindex", "-1"], ["mode", "walkup", 3, "data"], [1, "curator", "revision"]], template: function ExhibitCollectionPresentationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ExhibitCollectionPresentationComponent_Conditional_0_Template, 2, 2)(1, ExhibitCollectionPresentationComponent_Conditional_1_Template, 20, 5, "section", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nativeMuseum() ? 0 : 1);
    }
  }, dependencies: [HallCorridorComponent, MuseumBoardComponent, MuseumWalkthroughComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.collection[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  overflow: hidden;\n  background: #f5ecdd;\n  border: 1px solid #b7a78c;\n}\n.collection[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  background: #203d3e;\n  color: #f6ecda;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  align-items: center;\n}\n.collection[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.curator[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 0.64rem;\n  letter-spacing: 0.14em;\n  font-weight: 700;\n}\nh2[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-weight: 500;\n  font-size: 2rem;\n  margin: 10px 0;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 0.76rem;\n  padding: 12px;\n  border: 1px solid #b9ad97;\n  background: #fff9ec;\n  color: #354646;\n  border-radius: 5px;\n  cursor: pointer;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #c39858;\n  color: #1c302f;\n  border-color: #c39858;\n}\n.accessible-list[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  background: #e8ddc8;\n}\n.accessible-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n}\n.walkup[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.walkup[_ngcontent-%COMP%]    > h2[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin: 0 0 16px;\n}\n.curator[_ngcontent-%COMP%] {\n  padding: 25px;\n  background: #fff9ed;\n  border: 1px solid #d7c8af;\n  margin-top: 18px;\n  border-radius: 6px;\n}\n.curator[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 1.4rem Georgia, serif;\n}\n.curator[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \ndd[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.85;\n  max-width: 1000px;\n}\n.revision[_ngcontent-%COMP%] {\n  background: #e8eee4;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.75rem;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 5px 0 18px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #9b671f;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .collection[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n    display: block;\n    padding: 23px;\n  }\n  .collection[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n    margin-top: 18px;\n  }\n  .walkup[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .curator[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .accessible-list[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .accessible-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 135px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n}\n/*# sourceMappingURL=exhibit-collection-presentation.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExhibitCollectionPresentationComponent, [{
    type: Component,
    args: [{ selector: "app-exhibit-collection-presentation", imports: [HallCorridorComponent, MuseumBoardComponent, MuseumWalkthroughComponent], template: `
    @if (nativeMuseum()) {
      <app-museum-walkthrough [locations]="locations()" (opened)="selectedId.set($event)" />
      @if (selectedId() && curator(); as record) {
        <article class="curator">
          <span>CURATOR TOUR \xB7 COMPLETED SAMPLE TRANSCRIPT</span>
          <h3>{{ selected().team.displayName }} explains</h3>
          <p>{{ record.transcript }}</p>
          <details>
            <summary>See the curator\u2019s learning</summary>
            <dl>
              <dt>First claim</dt>
              <dd>{{ record.initialClaim }}</dd>
              <dt>Feedback question</dt>
              <dd>{{ record.feedback }}</dd>
              <dt>Revision</dt>
              <dd>{{ record.revision }}</dd>
              <dt>Individual reflection</dt>
              <dd>{{ record.reflection }}</dd>
            </dl>
          </details>
        </article>
      }
    } @else {
      <section class="collection">
        <header>
          <div>
            <span>THE CLASS MUSEUM \xB7 {{ locations().length }} COMPLETED WINGS</span>
            <h2>Small objects. Big stories.</h2>
            <p>Step into a wing, inspect its objects, and read the curator\u2019s explanation.</p>
          </div>
          <nav aria-label="Museum audience">
            <button
              type="button"
              [attr.aria-pressed]="!teacherView()"
              (click)="teacherView.set(false)"
            >
              Family view</button
            ><button
              type="button"
              [attr.aria-pressed]="teacherView()"
              (click)="teacherView.set(true)"
            >
              Teacher view
            </button>
          </nav>
        </header>
        <nav class="accessible-list" aria-label="Gallery list \u2014 choose a wing">
          @for (location of locations(); track location.locationId) {
            <button
              type="button"
              [attr.aria-pressed]="selected().locationId === location.locationId"
              (click)="open(location.hanging!.id)"
            >
              {{ location.position + 1 }} \xB7 {{ location.snapshot?.accessibleData?.title }}
            </button>
          }
        </nav>
        @if (!selectedId()) {
          <app-hall-corridor
            [locations]="locations()"
            [focusedHangingId]="selected().hanging?.id"
            (opened)="open($event)"
          />
        } @else {
          <button class="return-corridor" type="button" (click)="selectedId.set(undefined)">
            \u2190 Return to all wings
          </button>
        }
        @if (selectedId()) {
          @if (selected(); as location) {
            <section class="walkup">
              <h2 #wingHeading tabindex="-1">{{ location.snapshot?.accessibleData?.title }}</h2>
              <app-museum-board [data]="location.snapshot?.visitorSafeData" mode="walkup" />
              @if (curator(); as record) {
                <article class="curator">
                  <span>CURATOR TOUR \xB7 COMPLETED SAMPLE TRANSCRIPT</span>
                  <h3>{{ location.team.displayName }} explains</h3>
                  <p>{{ record.transcript }}</p>
                </article>
                @if (teacherView()) {
                  <aside class="curator revision">
                    <span>BUILDER GUIDANCE EXAMPLE \xB7 CURATOR THINKING</span>
                    <dl>
                      <dt>First claim</dt>
                      <dd>{{ record.initialClaim }}</dd>
                      <dt>Feedback question</dt>
                      <dd>{{ record.feedback }}</dd>
                      <dt>Revision</dt>
                      <dd>{{ record.revision }}</dd>
                      <dt>Individual reflection</dt>
                      <dd>{{ record.reflection }}</dd>
                    </dl>
                  </aside>
                }
              }
            </section>
          }
        }
      </section>
    }
  `, styles: ['/* angular:styles/component:scss;ae815d406976790f5405dc53b577849d07e3d9626c3dfdd9d4faafd39dff644a;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/exhibit-collection-presentation.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.collection {\n  border-radius: 12px;\n  overflow: hidden;\n  background: #f5ecdd;\n  border: 1px solid #b7a78c;\n}\n.collection > header {\n  background: #203d3e;\n  color: #f6ecda;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  align-items: center;\n}\n.collection > header span,\n.curator > span {\n  font-size: 0.64rem;\n  letter-spacing: 0.14em;\n  font-weight: 700;\n}\nh2 {\n  font-family: Georgia, serif;\n  font-weight: 500;\n  font-size: 2rem;\n  margin: 10px 0;\n}\nheader p {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\nnav {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\nbutton {\n  font: inherit;\n  font-size: 0.76rem;\n  padding: 12px;\n  border: 1px solid #b9ad97;\n  background: #fff9ec;\n  color: #354646;\n  border-radius: 5px;\n  cursor: pointer;\n}\nbutton[aria-pressed=true] {\n  background: #c39858;\n  color: #1c302f;\n  border-color: #c39858;\n}\n.accessible-list {\n  padding: 10px 16px;\n  background: #e8ddc8;\n}\n.accessible-list button {\n  flex: 1;\n  min-width: 180px;\n}\n.walkup {\n  padding: 24px;\n}\n.walkup > h2 {\n  font-size: 1.2rem;\n  margin: 0 0 16px;\n}\n.curator {\n  padding: 25px;\n  background: #fff9ed;\n  border: 1px solid #d7c8af;\n  margin-top: 18px;\n  border-radius: 6px;\n}\n.curator h3 {\n  font: 1.4rem Georgia, serif;\n}\n.curator p,\ndd {\n  font-size: 0.9rem;\n  line-height: 1.85;\n  max-width: 1000px;\n}\n.revision {\n  background: #e8eee4;\n}\ndt {\n  font-weight: 700;\n  font-size: 0.75rem;\n}\ndd {\n  margin: 5px 0 18px;\n}\nbutton:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #9b671f;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .collection > header {\n    display: block;\n    padding: 23px;\n  }\n  .collection > header nav {\n    margin-top: 18px;\n  }\n  .walkup {\n    padding: 12px;\n  }\n  .curator {\n    padding: 18px;\n  }\n  .accessible-list {\n    padding: 12px;\n  }\n  .accessible-list button {\n    min-width: 135px;\n  }\n  h2 {\n    font-size: 1.7rem;\n  }\n}\n/*# sourceMappingURL=exhibit-collection-presentation.component.css.map */\n'] }]
  }], null, { locations: [{ type: Input, args: [{ isSignal: true, alias: "locations", required: true }] }], curators: [{ type: Input, args: [{ isSignal: true, alias: "curators", required: true }] }], heading: [{ type: ViewChild, args: ["wingHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExhibitCollectionPresentationComponent, { className: "ExhibitCollectionPresentationComponent", filePath: "src/app/templates/exhibit-hall/ui/exhibit-collection-presentation.component.ts", lineNumber: 253 });
})();

// src/app/projects/completed-samples/exhibit.sample-data.ts
function createExhibitSample() {
  return studentMuseumConfig.seedBoards.map((seed, index) => {
    const _a = seed.data, { immersiveGallery: _embed, videoPresentation: _prototype } = _a, original = __objRest(_a, ["immersiveGallery", "videoPresentation"]);
    const data = __spreadValues({}, original);
    const team = studentMuseumConfig.teams.find((item) => item.id === seed.teamId);
    const id = "sample-wing-" + index;
    const snapshotId = id + "-v2";
    return {
      locationId: team.locationId,
      position: index,
      team,
      hanging: {
        id,
        hallId: "sample-museum",
        locationId: team.locationId,
        artifactId: id,
        currentSnapshotId: snapshotId,
        publishedBy: "sample-curator",
        publishedAt: "2026-04-16T14:00:00.000Z"
      },
      snapshot: {
        id: snapshotId,
        artifactId: id,
        version: 2,
        rendererType: "museum-board",
        rendererVersion: 1,
        visitorSafeData: data,
        accessibleData: {
          title: data.title,
          summary: data.centralClaim,
          sections: data.objects.map((object) => ({
            heading: object.title,
            body: object.description + " " + object.evidenceConnection,
            sourceLinks: data.sources.filter((source) => object.sourceIds.includes(source.id)).map((source) => ({ label: source.citation, url: source.url }))
          }))
        },
        createdBy: "sample-curator",
        createdAt: "2026-04-16T14:00:00.000Z"
      }
    };
  });
}
var exhibitCurators = [
  {
    hangingId: "sample-wing-0",
    initialClaim: "These objects tell us how everyone lived.",
    feedback: "Can a royal image and a funerary ensemble represent every household?",
    revision: "We now compare shaped forms and decoration, and limit our claim to the supplied examples.",
    reflection: "Avery: I can describe visible features, but I need source records to establish materials and original context.",
    transcript: "Welcome to Materials and Skilled Making. Compare the Coffin of Ankh-Khonsu with the model of Nefertiti\u2019s bust. Rotate each one and describe a visible shape or decorated surface before offering an interpretation. Our first claim treated exceptional objects as evidence of everyone\u2019s life. We revised it to focus on craft and representation. The supplied models help us look closely, while the creator records provide a starting point for checking what the digital versions represent. A model alone cannot establish the original materials or the lives of every maker."
  },
  {
    hangingId: "sample-wing-1",
    initialClaim: "Royal images prove that everyone supported the ruler.",
    feedback: "Can a portrait or a temple show what every viewer believed?",
    revision: "We separated the presentation of authority from evidence of people\u2019s reactions.",
    reflection: "Lina: The bust and temple help me ask how images and spaces communicate, but they do not establish public agreement.",
    transcript: "Our wing pairs Nefertiti\u2019s bust with a digital interpretation of the Temple of Horus. Inspect the portrait\u2019s profile, then explore the temple\u2019s arrangement of spaces. These models let us compare how an image and a building can direct attention. We do not claim they came from the same moment or prove what every person believed. The temple asset is a game-ready reconstruction, so its details need checking against archaeological records. Our revised claim concerns the presentation of authority, with the limits of the digital evidence made explicit."
  },
  {
    hangingId: "sample-wing-2",
    initialClaim: "These coffins prove everyone believed exactly the same thing.",
    feedback: "Can two surviving funerary examples establish what every person believed?",
    revision: "We now describe funerary forms and decoration while acknowledging the limits of surviving burial evidence.",
    reflection: "Emery: I changed \u201Ceveryone\u201D to a narrower claim that these examples can support.",
    transcript: "Look closely at the Coffin of Ankh-Khonsu. Rotate the model to observe the relationship between shape and decorated surfaces. It helps us discuss funerary preparation and the work involved in making an enclosure. Our first claim was too broad: two surviving examples cannot establish what everyone in Egypt believed or how every burial was prepared. We distinguish observation from interpretation and use the linked museum model records as a starting point for further research."
  },
  {
    hangingId: "sample-wing-3",
    initialClaim: "Large buildings and small enclosures require the same methods.",
    feedback: "Does a similar shape establish a shared material or construction technique?",
    revision: "We compare scale and organization without assuming identical methods or original materials.",
    reflection: "Ivy: I can compare an entrance with an enclosure, but I need further evidence to explain exactly how each original was built.",
    transcript: "Measuring and Building compares the Temple of Horus model with the Coffin of Ankh-Khonsu. One organizes spaces that people could move through; the other is an enclosure at a very different scale. Rotate each model and identify repeated forms, edges, and openings. These observations support questions about planning and skilled work, but do not prove which tools or methods were used. The temple is a digital reconstruction. We use the creator and museum records to keep the representation separate from claims about original construction."
  }
];
var exhibitSampleGuide = {
  title: "The Museum Is Open",
  subtitle: "Four student-curated wings. Four supplied 3D models. Step into the class museum and discover how a label becomes an argument.",
  audience: "Social studies \xB7 Grade 6",
  duration: "Explore in 2\u20133 minutes",
  trail: [
    {
      label: "Challenge",
      title: "Tell a story through objects.",
      text: "Each team compared two supplied 3D objects and built a claim about life, power, belief, or technology.",
      evidence: "All four corridor wings open into the existing museum-board presentation."
    },
    {
      label: "Evidence",
      title: "Every object has a job.",
      text: "Description explains the object; \u201CWhy it matters\u201D connects it to the central claim. Sources remain available to visitors.",
      evidence: "Eight object labels across four paired collections and each wing\u2019s Sources section."
    },
    {
      label: "Feedback",
      title: "A claim can be too big.",
      text: "The Afterlife Curators first claimed that everyone believed exactly the same thing. Feedback challenged what two surviving funerary examples can establish.",
      evidence: "Teacher view \u2192 Preparing for the Afterlife."
    },
    {
      label: "Revision",
      title: "The tour explains the limit.",
      text: "The completed curator transcript narrows the claim and distinguishes reconstruction from archaeological evidence.",
      evidence: "Curator tour transcript, revised claim, and individual reflection."
    }
  ],
  review: {
    strength: "Objects are selected to support a shared idea, and the team explains the link instead of simply decorating the wing.",
    question: "If you removed one object, what part of your central claim would lose support?",
    revision: "Broad statements become bounded claims with explicit evidence and source limits.",
    assessment: "Assess historical explanation, source use, curation, and individual reasoning. A polished gallery alone does not establish mastery."
  }
};

// src/app/runtime/project-showcase/exhibit.sample.ts
function loadSample() {
  return __spreadProps(__spreadValues({}, exhibitSampleGuide), {
    component: ExhibitCollectionPresentationComponent,
    inputs: { locations: createExhibitSample(), curators: structuredClone(exhibitCurators) },
    providers: [
      {
        provide: EXHIBIT_RENDERER_COMPONENTS,
        useValue: [{ rendererType: "museum-board", component: MuseumBoardComponent }]
      }
    ]
  });
}
export {
  loadSample
};
//# debugId=c7f4b844-4118-58ce-8756-7fd1c10267e9
//# sourceMappingURL=chunk-ACIMCKJJ.js.map
