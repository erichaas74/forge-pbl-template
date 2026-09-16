import {
  ExhibitRenderHostComponent,
  HallCorridorComponent,
  MuseumWalkthroughComponent
} from "./chunk-3QPUEH3H.js";
import {
  ExhibitHallRuntimeService,
  MuseumPublicationError,
  museumRoomContent,
  museumScopeKey,
  wordCount
} from "./chunk-RPQYDRPF.js";
import {
  EXHIBIT_HALL_SESSION_CONTEXT,
  MUSEUM_PUBLICATION,
  MuseumSceneComponent
} from "./chunk-NP2TX5O3.js";
import {
  ObjectModelViewerComponent
} from "./chunk-ICIU3PCK.js";
import "./chunk-MNKXLJET.js";
import "./chunk-G626JLCU.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  DestroyRef,
  Injectable,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import "./chunk-WLIGGVEP.js";
import {
  museumRoomLayout
} from "./chunk-SUG7Z2TW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/exhibit-hall/ui/accessible-gallery-list.component.ts
var _forTrack0 = ($index, $item) => $item.locationId;
function AccessibleGalleryListComponent_For_2_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function AccessibleGalleryListComponent_For_2_Conditional_4_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const location_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.opened.emit(location_r2.hanging.id));
    });
    \u0275\u0275text(1, " Read this exhibit ");
    \u0275\u0275domElementEnd();
  }
}
function AccessibleGalleryListComponent_For_2_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong", 5);
    \u0275\u0275text(1, "Walk-up coming soon");
    \u0275\u0275domElementEnd();
  }
}
function AccessibleGalleryListComponent_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(8, AccessibleGalleryListComponent_For_2_Conditional_4_Conditional_8_Template, 2, 0, "button", 4)(9, AccessibleGalleryListComponent_For_2_Conditional_4_Conditional_9_Template, 2, 0, "strong", 5);
  }
  if (rf & 2) {
    const location_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(location_r2.team.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r2.snapshot.accessibleData.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r2.snapshot.accessibleData.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", location_r2.snapshot.accessibleData.sections.length, " reading sections \xB7 Snapshot v", location_r2.snapshot.version, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(location_r2.snapshot.corridorPreview?.walkUpAvailable !== false ? 8 : 9);
  }
}
function AccessibleGalleryListComponent_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5, "This team has not published an exhibit yet.");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(location_r2.team.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.emptyLabel());
  }
}
function AccessibleGalleryListComponent_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong", 3);
    \u0275\u0275text(1, "Class focus");
    \u0275\u0275domElementEnd();
  }
}
function AccessibleGalleryListComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li")(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div");
    \u0275\u0275conditionalCreate(4, AccessibleGalleryListComponent_For_2_Conditional_4_Template, 10, 6)(5, AccessibleGalleryListComponent_For_2_Conditional_5_Template, 6, 2);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, AccessibleGalleryListComponent_For_2_Conditional_6_Template, 2, 0, "strong", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("focused", location_r2.hanging?.id === ctx_r2.focusedHangingId());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r2.position + 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(location_r2.snapshot && location_r2.hanging ? 4 : 5);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(location_r2.hanging?.id === ctx_r2.focusedHangingId() ? 6 : -1);
  }
}
var AccessibleGalleryListComponent = class _AccessibleGalleryListComponent {
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
  opened = output();
  static \u0275fac = function AccessibleGalleryListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessibleGalleryListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessibleGalleryListComponent, selectors: [["app-accessible-gallery-list"]], inputs: { locations: [1, "locations"], focusedHangingId: [1, "focusedHangingId"], emptyLabel: [1, "emptyLabel"] }, outputs: { opened: "opened" }, decls: 3, vars: 0, consts: [["aria-label", "Class exhibits in corridor order", 1, "gallery-list"], [3, "focused"], [1, "number"], [1, "focus"], ["type", "button"], [1, "coming-soon"], ["type", "button", 3, "click"]], template: function AccessibleGalleryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "ol", 0);
      \u0275\u0275repeaterCreate(1, AccessibleGalleryListComponent_For_2_Template, 7, 5, "li", 1, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.locations());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.gallery-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\nli[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.8rem 1fr auto;\n  gap: 0.85rem;\n  align-items: start;\n  border: 1px solid #c8bda9;\n  border-left: 0.3rem solid #8a6a3c;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  background: #fffdf6;\n  box-shadow: 0 0.25rem 0.8rem rgba(38, 26, 16, 0.0784313725);\n}\nli.focused[_ngcontent-%COMP%] {\n  border-color: #b37c23;\n  box-shadow: 0 0 0 0.16rem #e0bd74;\n}\n.number[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff7e6;\n  background: #30271f;\n  font: 800 0.85rem Georgia, serif;\n}\nsmall[_ngcontent-%COMP%], \ndiv[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #766857;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0.35rem;\n  font: 800 1.25rem Georgia, serif;\n}\np[_ngcontent-%COMP%] {\n  max-width: 56rem;\n  margin: 0 0 0.55rem;\n  color: #514a42;\n  line-height: 1.45;\n}\nbutton[_ngcontent-%COMP%] {\n  display: block;\n  min-height: 2.5rem;\n  margin-top: 0.7rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.75rem;\n  color: white;\n  background: #245c65;\n  font-weight: 800;\n}\n.coming-soon[_ngcontent-%COMP%] {\n  display: block;\n  width: fit-content;\n  margin-top: 0.7rem;\n  border: 1px solid #bcae97;\n  border-radius: 999px;\n  padding: 0.5rem 0.75rem;\n  color: #675b4a;\n  background: #eee7da;\n  font-size: 0.72rem;\n}\n.focus[_ngcontent-%COMP%] {\n  align-self: start;\n  border-radius: 999px;\n  padding: 0.3rem 0.55rem;\n  color: #593c0e;\n  background: #f2d897;\n  font-size: 0.63rem;\n  white-space: nowrap;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #51aeb9;\n  outline-offset: 3px;\n}\n@media (max-width: 600px) {\n  li[_ngcontent-%COMP%] {\n    grid-template-columns: 2.4rem 1fr;\n  }\n  .focus[_ngcontent-%COMP%] {\n    grid-column: 2;\n    grid-row: 2;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=accessible-gallery-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessibleGalleryListComponent, [{
    type: Component,
    args: [{ selector: "app-accessible-gallery-list", template: `
    <ol class="gallery-list" aria-label="Class exhibits in corridor order">
      @for (location of locations(); track location.locationId) {
        <li [class.focused]="location.hanging?.id === focusedHangingId()">
          <span class="number">{{ location.position + 1 }}</span>
          <div>
            @if (location.snapshot && location.hanging) {
              <small>{{ location.team.displayName }}</small>
              <h2>{{ location.snapshot.accessibleData.title }}</h2>
              <p>{{ location.snapshot.accessibleData.summary }}</p>
              <span>
                {{ location.snapshot.accessibleData.sections.length }} reading sections \xB7 Snapshot
                v{{ location.snapshot.version }}
              </span>
              @if (location.snapshot.corridorPreview?.walkUpAvailable !== false) {
                <button type="button" (click)="opened.emit(location.hanging.id)">
                  Read this exhibit
                </button>
              } @else {
                <strong class="coming-soon">Walk-up coming soon</strong>
              }
            } @else {
              <small>{{ location.team.displayName }}</small>
              <h2>{{ emptyLabel() }}</h2>
              <p>This team has not published an exhibit yet.</p>
            }
          </div>
          @if (location.hanging?.id === focusedHangingId()) {
            <strong class="focus">Class focus</strong>
          }
        </li>
      }
    </ol>
  `, styles: ["/* angular:styles/component:scss;9b9494d2311d362aded5d124096f62d8f50c914d4ee1ec8f865dc2c73e189210;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/exhibit-hall/ui/accessible-gallery-list.component.ts */\n:host {\n  display: block;\n}\n.gallery-list {\n  display: grid;\n  gap: 0.65rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\nli {\n  position: relative;\n  display: grid;\n  grid-template-columns: 2.8rem 1fr auto;\n  gap: 0.85rem;\n  align-items: start;\n  border: 1px solid #c8bda9;\n  border-left: 0.3rem solid #8a6a3c;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  background: #fffdf6;\n  box-shadow: 0 0.25rem 0.8rem rgba(38, 26, 16, 0.0784313725);\n}\nli.focused {\n  border-color: #b37c23;\n  box-shadow: 0 0 0 0.16rem #e0bd74;\n}\n.number {\n  display: grid;\n  width: 2.4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff7e6;\n  background: #30271f;\n  font: 800 0.85rem Georgia, serif;\n}\nsmall,\ndiv > span {\n  color: #766857;\n  font-size: 0.68rem;\n  font-weight: 750;\n}\nh2 {\n  margin: 0.15rem 0 0.35rem;\n  font: 800 1.25rem Georgia, serif;\n}\np {\n  max-width: 56rem;\n  margin: 0 0 0.55rem;\n  color: #514a42;\n  line-height: 1.45;\n}\nbutton {\n  display: block;\n  min-height: 2.5rem;\n  margin-top: 0.7rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.75rem;\n  color: white;\n  background: #245c65;\n  font-weight: 800;\n}\n.coming-soon {\n  display: block;\n  width: fit-content;\n  margin-top: 0.7rem;\n  border: 1px solid #bcae97;\n  border-radius: 999px;\n  padding: 0.5rem 0.75rem;\n  color: #675b4a;\n  background: #eee7da;\n  font-size: 0.72rem;\n}\n.focus {\n  align-self: start;\n  border-radius: 999px;\n  padding: 0.3rem 0.55rem;\n  color: #593c0e;\n  background: #f2d897;\n  font-size: 0.63rem;\n  white-space: nowrap;\n}\nbutton:focus-visible {\n  outline: 3px solid #51aeb9;\n  outline-offset: 3px;\n}\n@media (max-width: 600px) {\n  li {\n    grid-template-columns: 2.4rem 1fr;\n  }\n  .focus {\n    grid-column: 2;\n    grid-row: 2;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=accessible-gallery-list.component.css.map */\n"] }]
  }], null, { locations: [{ type: Input, args: [{ isSignal: true, alias: "locations", required: true }] }], focusedHangingId: [{ type: Input, args: [{ isSignal: true, alias: "focusedHangingId", required: false }] }], emptyLabel: [{ type: Input, args: [{ isSignal: true, alias: "emptyLabel", required: false }] }], opened: [{ type: Output, args: ["opened"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessibleGalleryListComponent, { className: "AccessibleGalleryListComponent", filePath: "src/app/templates/exhibit-hall/ui/accessible-gallery-list.component.ts", lineNumber: 146 });
})();

// src/app/templates/exhibit-hall/ui/artifact-composer.component.ts
var _c0 = ["composerDialog"];
var _c1 = ["stepHeading"];
var _forTrack02 = ($index, $item) => $item.shortLabel;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.fieldId;
var _forTrack3 = ($index, $item) => $item.message;
function ArtifactComposerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToEditing());
    });
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275text(2, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Back to editing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12)(5, "span");
    \u0275\u0275text(6, "Full visitor review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h1", 13);
    \u0275\u0275text(8, "Inspect the complete exhibit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Walk through the final snapshot exactly as visitors will experience it.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 14)(12, "button", 15);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_3_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.publishedRequested.emit());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 16);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_3_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275text(15, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", !ctx_r1.validation().valid || ctx_r1.submissionLocked() || ctx_r1.published() && ctx_r1.rehangsRemaining() === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submissionLocked() ? "Submissions locked" : ctx_r1.publishLabel(), " ");
  }
}
function ArtifactComposerComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2, "Student curator studio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Build one part at a time. Your work becomes the visitor-ready museum snapshot.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 18)(8, "div")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "i", 19);
    \u0275\u0275element(14, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 14)(16, "button", 16);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_4_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275text(17, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.starterExample() ? "Inspect a worked example" : "Build your final exhibit", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.starterExample() ? "Example content readiness \u2014 not your progress" : "Your draft readiness");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.completedStepCount(), " of ", ctx_r1.editingStepCount, " stations ready");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-valuenow", ctx_r1.completionPercent());
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.completionPercent(), "%");
  }
}
function ArtifactComposerComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 20);
    \u0275\u0275listener("click", function ArtifactComposerComponent_For_8_Template_button_click_1_listener() {
      const \u0275$index_66_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToStep(\u0275$index_66_r5));
    });
    \u0275\u0275elementStart(2, "span", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 22)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const \u0275$index_66_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.activeStep() === \u0275$index_66_r5)("complete", ctx_r1.isStepComplete(\u0275$index_66_r5));
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-current", ctx_r1.activeStep() === \u0275$index_66_r5 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_66_r5 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r6.shortLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeStep() === \u0275$index_66_r5 ? "Now" : ctx_r1.isStepComplete(\u0275$index_66_r5) ? "Ready" : "To do", " ");
  }
}
function ArtifactComposerComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prompt_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prompt_r7);
  }
}
function ArtifactComposerComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeStep() === 2 && !ctx_r1.coreReady() ? "Finish my first ideas" : "Next", " \u2192 ");
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_17_Case_8_For_5_Template_button_click_0_listener() {
      const \u0275$index_121_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.inspectedObject.set(\u0275$index_121_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const object_r13 = ctx.$implicit;
    const \u0275$index_121_r12 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r1.inspectedObject() === \u0275$index_121_r12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", object_r13.title, " ");
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-object-model-viewer", 42);
  }
  if (rf & 2) {
    \u0275\u0275property("model", ctx)("autoLoad", true);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 43);
  }
  if (rf & 2) {
    const object_r14 = \u0275\u0275nextContext();
    \u0275\u0275property("src", object_r14.imageAssetId, \u0275\u0275sanitizeUrl)("alt", object_r14.imageAlt || object_r14.title);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Conditional_0_Template, 1, 2, "app-object-model-viewer", 42)(1, ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Conditional_1_Template, 1, 2, "img", 43);
  }
  if (rf & 2) {
    let tmp_6_0;
    const object_r14 = ctx;
    \u0275\u0275conditional((tmp_6_0 = object_r14.model) ? 0 : object_r14.imageAssetId ? 1 : -1, tmp_6_0);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 41)(1, "span");
    \u0275\u0275text(2, "Name my exhibit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 44);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_8_Conditional_12_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.titleChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.draft().title);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 29)(1, "div", 34)(2, "div", 35)(3, "div", 36);
    \u0275\u0275repeaterCreate(4, ArtifactComposerComponent_Conditional_17_Case_8_For_5_Template, 2, 2, "button", 37, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ArtifactComposerComponent_Conditional_17_Case_8_Conditional_6_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38)(8, "label", 39)(9, "span");
    \u0275\u0275text(10, "My first idea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "textarea", 40);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_8_Template_textarea_input_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.claimChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, ArtifactComposerComponent_Conditional_17_Case_8_Conditional_12_Template, 4, 1, "label", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.draft().objects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.draft().objects[ctx_r1.inspectedObject()]) ? 6 : -1, tmp_5_0);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.draft().centralClaim);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.draft().centralClaim.trim() ? 12 : -1);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_9_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "header")(2, "span", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "small");
    \u0275\u0275text(6, "Display object");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "label")(10, "span");
    \u0275\u0275text(11, "Artifact name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 44);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_9_For_3_Template_input_input_12_listener($event) {
      const object_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.objectChanged.emit({ objectId: object_r17.id, field: "title", value: ctx_r1.value($event) }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label")(14, "span");
    \u0275\u0275text(15, "What is it?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "small");
    \u0275\u0275text(17, "Describe material, use, date, and context.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 47);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_9_For_3_Template_textarea_input_18_listener($event) {
      const object_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.objectChanged.emit({ objectId: object_r17.id, field: "description", value: ctx_r1.value($event) }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label", 48)(20, "span");
    \u0275\u0275text(21, "Why does it belong?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "small");
    \u0275\u0275text(23, "Connect this object directly to the collection claim.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 49);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_9_For_3_Template_textarea_input_24_listener($event) {
      const object_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.objectChanged.emit({ objectId: object_r17.id, field: "evidenceConnection", value: ctx_r1.value($event) }));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const object_r17 = ctx.$implicit;
    const \u0275$index_154_r18 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_154_r18 + 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(object_r17.title || "Untitled artifact");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", object_r17.title);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", object_r17.description);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", object_r17.evidenceConnection);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 30)(1, "div", 45);
    \u0275\u0275repeaterCreate(2, ArtifactComposerComponent_Conditional_17_Case_9_For_3_Template, 25, 5, "article", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.draft().objects);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_10_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "span")(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Museum or scholarly source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 53);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_10_For_11_Template_textarea_input_5_listener($event) {
      const source_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.sourceChanged.emit({ sourceId: source_r20.id, citation: ctx_r1.value($event) }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r20 = ctx.$implicit;
    const \u0275$index_215_r21 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_215_r21 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", source_r20.citation);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 31)(1, "div", 50)(2, "span", 11);
    \u0275\u0275text(3, "\u2315");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6, "Leave a research trail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Visitors should be able to tell where your facts came from and why the source is trustworthy. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 51);
    \u0275\u0275repeaterCreate(10, ArtifactComposerComponent_Conditional_17_Case_10_For_11_Template, 6, 2, "label", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 52)(13, "strong");
    \u0275\u0275text(14, "A strong citation usually answers:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Who made it?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "What is it called?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Where is it kept?");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.draft().sources);
  }
}
function ArtifactComposerComponent_Conditional_17_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 32)(1, "div", 54)(2, "div", 55)(3, "span");
    \u0275\u0275text(4, "3D");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "span");
    \u0275\u0275text(8, "Shared museum connection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10, "Link the entrance to MetaSteps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, " This connection lets visitors leave the exhibit label and walk into the space your team designed. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "label")(14, "span");
    \u0275\u0275text(15, "Wing title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 56);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_11_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.galleryTitleChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label")(18, "span");
    \u0275\u0275text(19, "MetaSteps public embed code or viewer URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "textarea", 57);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_11_Template_textarea_input_20_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.galleryEmbedChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small", 58);
    \u0275\u0275text(22, " Use the public viewer embed. Never paste a password or private API key. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 59);
    \u0275\u0275element(24, "i", 11);
    \u0275\u0275elementStart(25, "span")(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "small");
    \u0275\u0275text(29, "Test the public view before the final showcase.");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("value", ctx_r1.draft().immersiveGallery?.title ?? "");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.draft().immersiveGallery?.embedUrl ?? "");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("connected", ctx_r1.isStepComplete(3));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isStepComplete(3) ? "Entrance connected" : "Waiting for a link");
  }
}
function ArtifactComposerComponent_Conditional_17_Case_12_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62)(1, "strong");
    \u0275\u0275text(2, "Prototype station:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " A demonstration player is standing in for the final student video. The real presentation can be connected later. ");
    \u0275\u0275elementEnd();
  }
}
function ArtifactComposerComponent_Conditional_17_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 33)(1, "div", 60)(2, "div", 61);
    \u0275\u0275element(3, "i");
    \u0275\u0275text(4, " Curator recording station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ol")(6, "li")(7, "span");
    \u0275\u0275text(8, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, "Introduce the collection claim.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "li")(11, "span");
    \u0275\u0275text(12, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, "Use the artifacts as evidence.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "li")(15, "span");
    \u0275\u0275text(16, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, "Invite visitors to explore the 3D wing.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(18, ArtifactComposerComponent_Conditional_17_Case_12_Conditional_18_Template, 4, 0, "p", 62);
    \u0275\u0275elementStart(19, "label")(20, "span");
    \u0275\u0275text(21, "Presentation title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 63);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_12_Template_input_input_22_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.videoTitleChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label")(24, "span");
    \u0275\u0275text(25, "Public video URL or iframe code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "textarea", 64);
    \u0275\u0275listener("input", function ArtifactComposerComponent_Conditional_17_Case_12_Template_textarea_input_26_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.videoUrlChanged.emit(ctx_r1.value($event)));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "small", 65);
    \u0275\u0275text(28, " Check sharing permissions. Do not include surnames or private information in a public video. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275conditional(ctx_r1.draft().videoPresentation?.prototype ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.draft().videoPresentation?.title ?? "");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.draft().videoPresentation?.videoUrl ?? "");
  }
}
function ArtifactComposerComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 25);
    \u0275\u0275listener("submit", function ArtifactComposerComponent_Conditional_17_Template_form_submit_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.publishedRequested.emit());
    });
    \u0275\u0275elementStart(1, "div", 26)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 27, 1);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 28);
    \u0275\u0275conditionalCreate(8, ArtifactComposerComponent_Conditional_17_Case_8_Template, 13, 3, "section", 29)(9, ArtifactComposerComponent_Conditional_17_Case_9_Template, 4, 0, "section", 30)(10, ArtifactComposerComponent_Conditional_17_Case_10_Template, 21, 0, "section", 31)(11, ArtifactComposerComponent_Conditional_17_Case_11_Template, 30, 5, "section", 32)(12, ArtifactComposerComponent_Conditional_17_Case_12_Template, 29, 3, "section", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Station ", (ctx_r1.activeStep() + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeStep() === 0 ? "What connects these objects?" : ctx_r1.currentStep().title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.activeStep()) === 0 ? 8 : tmp_5_0 === 1 ? 9 : tmp_5_0 === 2 ? 10 : tmp_5_0 === 3 ? 11 : tmp_5_0 === 4 ? 12 : -1);
  }
}
function ArtifactComposerComponent_Conditional_18_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 20);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_18_For_20_Template_button_click_8_listener() {
      const \u0275$index_377_r26 = \u0275\u0275restoreView(_r25).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToStep(\u0275$index_377_r26));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r27 = ctx.$implicit;
    const \u0275$index_377_r26 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("complete", ctx_r1.isStepComplete(\u0275$index_377_r26));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isStepComplete(\u0275$index_377_r26) ? "\u2713" : \u0275$index_377_r26 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r27.shortLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r27.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isStepComplete(\u0275$index_377_r26) ? "Edit" : "Finish", " ");
  }
}
function ArtifactComposerComponent_Conditional_18_Conditional_21_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r28.message);
  }
}
function ArtifactComposerComponent_Conditional_18_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "strong");
    \u0275\u0275text(2, "Fix before showcasing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, ArtifactComposerComponent_Conditional_18_Conditional_21_For_5_Template, 2, 1, "li", null, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.validation().errors);
  }
}
function ArtifactComposerComponent_Conditional_18_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warning_r29 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(warning_r29.message);
  }
}
function ArtifactComposerComponent_Conditional_18_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275repeaterCreate(1, ArtifactComposerComponent_Conditional_18_Conditional_22_For_2_Template, 2, 1, "p", null, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.validation().warnings);
  }
}
function ArtifactComposerComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 66)(1, "div", 67)(2, "span");
    \u0275\u0275text(3, "Visitor-ready snapshot");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7, "Review the complete reading order, 3D entrance, video station, and sources.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 68);
    \u0275\u0275element(9, "app-exhibit-render-host", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "aside", 70)(11, "span");
    \u0275\u0275text(12, "Final inspection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "h2", 27, 1);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ol");
    \u0275\u0275repeaterCreate(19, ArtifactComposerComponent_Conditional_18_For_20_Template, 10, 6, "li", 71, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, ArtifactComposerComponent_Conditional_18_Conditional_21_Template, 6, 0, "div", 72);
    \u0275\u0275conditionalCreate(22, ArtifactComposerComponent_Conditional_18_Conditional_22_Template, 3, 0, "div", 73);
    \u0275\u0275elementStart(23, "button", 74);
    \u0275\u0275listener("click", function ArtifactComposerComponent_Conditional_18_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToEditing());
    });
    \u0275\u0275elementStart(24, "span", 11);
    \u0275\u0275text(25, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Back to editing ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.draft().title || "Untitled exhibit");
    \u0275\u0275advance(4);
    \u0275\u0275property("snapshot", ctx_r1.previewSnapshot());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.validation().valid ? "Ready for visitors" : "Finish these pieces", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.validation().valid ? "Every required exhibit part is present." : "Return to the marked station and complete the missing work.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.steps.slice(0, 5));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.validation().errors.length ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.validation().warnings.length ? 22 : -1);
  }
}
var COMPOSER_STEPS = [
  {
    shortLabel: "Story",
    title: "Choose the collection story",
    guidance: "Decide what these artifacts reveal when a visitor sees them together.",
    prompts: [
      "Name the collection in 12 words or fewer.",
      "Make one claim that every artifact can help prove.",
      "Write for students and families\u2014not only for the teacher."
    ]
  },
  {
    shortLabel: "Labels",
    title: "Write the artifact labels",
    guidance: "Turn research notes into clear museum labels that support the collection claim.",
    prompts: [
      "Identify each artifact precisely.",
      "Explain material, use, date, or context.",
      "Show how each artifact connects to the central claim."
    ]
  },
  {
    shortLabel: "Sources",
    title: "Credit the research",
    guidance: "Give visitors a trustworthy trail back to museum and scholarly sources.",
    prompts: [
      "Include at least two reliable sources.",
      "Name the museum, author, collection, or resource.",
      "Check that every citation is understandable on its own."
    ]
  },
  {
    shortLabel: "3D wing",
    title: "Connect the MetaSteps wing",
    guidance: "Attach the shared 3D space visitors will enter from the exhibit hall.",
    prompts: [
      "Give the wing a visitor-friendly title.",
      "Paste the public MetaSteps embed code or viewer URL.",
      "Test sharing without using a private account or password."
    ]
  },
  {
    shortLabel: "Video",
    title: "Prepare the curator presentation",
    guidance: "Add the short explanation that will greet students and family visitors.",
    prompts: [
      "Use a title that tells visitors what they will learn.",
      "Explain why the artifacts belong together.",
      "Check public sharing and protect student privacy."
    ]
  },
  {
    shortLabel: "Review",
    title: "Inspect and showcase",
    guidance: "Check the complete visitor experience before creating the next snapshot.",
    prompts: [
      "Read the exhibit once as a first-time visitor.",
      "Open the 3D wing and verify the presentation station.",
      "Fix every flagged item before showcasing."
    ]
  }
];
var ArtifactComposerComponent = class _ArtifactComposerComponent {
  injector = inject(Injector);
  dialog = viewChild(
    "composerDialog",
    ...ngDevMode ? [{ debugName: "dialog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    afterNextRender(() => this.stepHeading()?.nativeElement.focus({ preventScroll: true }));
  }
  draft = input.required(
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  starterExample = input(
    false,
    ...ngDevMode ? [{ debugName: "starterExample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewSnapshot = input.required(
    ...ngDevMode ? [{ debugName: "previewSnapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  validation = input.required(
    ...ngDevMode ? [{ debugName: "validation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publishLabel = input(
    "Publish",
    ...ngDevMode ? [{ debugName: "publishLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  published = input(
    false,
    ...ngDevMode ? [{ debugName: "published" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rehangsRemaining = input(
    0,
    ...ngDevMode ? [{ debugName: "rehangsRemaining" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submissionLocked = input(
    false,
    ...ngDevMode ? [{ debugName: "submissionLocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closed = output();
  titleChanged = output();
  claimChanged = output();
  objectChanged = output();
  sourceChanged = output();
  galleryTitleChanged = output();
  galleryEmbedChanged = output();
  videoTitleChanged = output();
  videoUrlChanged = output();
  publishedRequested = output();
  steps = COMPOSER_STEPS;
  inspectedObject = signal(
    0,
    ...ngDevMode ? [{ debugName: "inspectedObject" }] : (
      /* istanbul ignore next */
      []
    )
  );
  coreReady = computed(
    () => [0, 1, 2].every((index) => this.isStepComplete(index)),
    ...ngDevMode ? [{ debugName: "coreReady" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleSteps = computed(
    () => this.steps.slice(0, this.coreReady() ? this.steps.length : Math.max(3, this.activeStep() + 1)),
    ...ngDevMode ? [{ debugName: "visibleSteps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextStep() {
    if (this.activeStep() === 2 && !this.coreReady()) {
      this.goToStep([0, 1, 2].find((index) => !this.isStepComplete(index)) ?? 0);
    } else
      this.goToStep(this.activeStep() + 1);
  }
  activeStep = signal(
    0,
    ...ngDevMode ? [{ debugName: "activeStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastEditingStep = signal(
    0,
    ...ngDevMode ? [{ debugName: "lastEditingStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stepHeading = viewChild(
    "stepHeading",
    ...ngDevMode ? [{ debugName: "stepHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentStep = computed(
    () => this.steps[this.activeStep()],
    ...ngDevMode ? [{ debugName: "currentStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedStepCount = computed(
    () => this.steps.slice(0, -1).filter((_, index) => this.isStepComplete(index)).length,
    ...ngDevMode ? [{ debugName: "completedStepCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editingStepCount = this.steps.length - 1;
  completionPercent = computed(
    () => Math.round(this.completedStepCount() / this.editingStepCount * 100),
    ...ngDevMode ? [{ debugName: "completionPercent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  words(value) {
    return wordCount(value);
  }
  value(event) {
    return event.target.value;
  }
  goToStep(index) {
    const next = Math.min(Math.max(index, 0), this.steps.length - 1);
    if (next === this.steps.length - 1 && this.activeStep() < this.steps.length - 1) {
      this.lastEditingStep.set(this.activeStep());
    }
    this.activeStep.set(next);
    afterNextRender(() => {
      const surface = this.dialog()?.nativeElement.querySelector(".work-surface");
      if (surface)
        surface.scrollTop = 0;
      this.stepHeading()?.nativeElement.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  backToEditing() {
    this.goToStep(this.lastEditingStep());
  }
  isStepComplete(index) {
    const draft = this.draft();
    switch (index) {
      case 0:
        return draft.title.trim().length > 0 && draft.centralClaim.trim().length > 0;
      case 1:
        return draft.objects.length >= 2 && draft.objects.every((object) => object.title.trim().length > 0 && object.description.trim().length > 0 && object.evidenceConnection.trim().length > 0);
      case 2:
        return draft.sources.length >= 2 && draft.sources.every((source) => source.citation.trim().length > 0);
      case 3:
        return (draft.immersiveGallery?.title.trim().length ?? 0) > 0 && (draft.immersiveGallery?.embedUrl.trim().length ?? 0) > 0;
      case 4:
        return (draft.videoPresentation?.title.trim().length ?? 0) > 0 && (draft.videoPresentation?.prototype === true || (draft.videoPresentation?.videoUrl?.trim().length ?? 0) > 0);
      case 5:
        return this.validation().valid;
      default:
        return false;
    }
  }
  static \u0275fac = function ArtifactComposerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtifactComposerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtifactComposerComponent, selectors: [["app-artifact-composer"]], viewQuery: function ArtifactComposerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dialog, _c0, 5)(ctx.stepHeading, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { draft: [1, "draft"], starterExample: [1, "starterExample"], previewSnapshot: [1, "previewSnapshot"], validation: [1, "validation"], publishLabel: [1, "publishLabel"], published: [1, "published"], rehangsRemaining: [1, "rehangsRemaining"], submissionLocked: [1, "submissionLocked"] }, outputs: { closed: "closed", titleChanged: "titleChanged", claimChanged: "claimChanged", objectChanged: "objectChanged", sourceChanged: "sourceChanged", galleryTitleChanged: "galleryTitleChanged", galleryEmbedChanged: "galleryEmbedChanged", videoTitleChanged: "videoTitleChanged", videoUrlChanged: "videoUrlChanged", publishedRequested: "publishedRequested" }, decls: 19, vars: 9, consts: [["composerDialog", ""], ["stepHeading", ""], ["aria-labelledby", "composer-title", 1, "composer"], [1, "composer-header"], ["aria-label", "Exhibit build steps", 1, "studio-map"], [3, "active", "complete"], [3, "title"], ["type", "button", 1, "header-next"], [1, "composer-layout"], [1, "workbench"], ["type", "button", 1, "back-to-editing", 3, "click"], ["aria-hidden", "true"], [1, "studio-title", "review-title"], ["id", "composer-title"], [1, "header-actions"], ["type", "button", 1, "header-showcase", 3, "click", "disabled"], ["type", "button", "aria-label", "Return to exhibit hall", 1, "close", 3, "click"], [1, "studio-title"], [1, "studio-progress"], ["role", "progressbar", "aria-label", "Exhibit build progress", "aria-valuemin", "0", "aria-valuemax", "100"], ["type", "button", 3, "click"], [1, "step-number"], [1, "step-name"], [1, "step-state"], ["type", "button", 1, "header-next", 3, "click"], [1, "workbench", 3, "submit"], [1, "workbench-heading"], ["tabindex", "-1"], ["tabindex", "0", "role", "region", "aria-label", "Active station fields \u2014 scroll for more", 1, "work-surface"], ["aria-label", "Collection story", 1, "step-sheet", "story-sheet"], ["data-field-id", "selected-objects", "aria-label", "Artifact labels", 1, "step-sheet", "artifact-sheet"], ["data-field-id", "source-list", "aria-label", "Research sources", 1, "step-sheet", "source-sheet"], ["data-field-id", "immersive-gallery", "aria-label", "MetaSteps gallery connection", 1, "step-sheet", "connection-sheet"], ["data-field-id", "video-presentation", "aria-label", "Curator video presentation", 1, "step-sheet", "video-sheet"], [1, "objects-to-ideas"], [1, "object-study"], ["aria-label", "Objects to examine", 1, "object-tabs"], ["type", "button"], [1, "first-claim"], ["data-field-id", "central-claim", 1, "claim-field"], ["rows", "4", "placeholder", "Together, these objects show\u2026", 3, "input", "value"], ["data-field-id", "exhibit-title", 1, "plaque-field"], [3, "model", "autoLoad"], [3, "src", "alt"], ["type", "text", 3, "input", "value"], ["data-field-id", "object-captions", 1, "object-editors"], [1, "object-number"], ["rows", "5", 3, "input", "value"], [1, "claim-link"], ["rows", "4", 3, "input", "value"], [1, "source-intro"], [1, "source-slips"], [1, "source-check"], ["rows", "4", "placeholder", "Museum or author, resource title, collection or publisher, date or URL", 3, "input", "value"], [1, "connection-model"], ["aria-hidden", "true", 1, "model-door"], ["type", "text", "placeholder", "Example: Life Along the Nile \u2014 3D Wing", 3, "input", "value"], ["rows", "7", "placeholder", "Paste the public embed code copied from MetaSteps", "aria-describedby", "metasteps-help", 3, "input", "value"], ["id", "metasteps-help"], [1, "connection-status"], [1, "recording-plan"], [1, "recording-light"], [1, "prototype-field-note"], ["type", "text", "placeholder", "Example: How these artifacts reveal everyday life", 3, "input", "value"], ["rows", "6", "placeholder", "Paste a YouTube, Vimeo, MP4, WebM, or Ogg link", "aria-describedby", "video-help", 3, "input", "value"], ["id", "video-help"], ["aria-label", "Complete visitor exhibit review", 1, "review-experience"], [1, "review-stage-heading"], [1, "full-preview"], ["mode", "preview", 3, "snapshot"], ["aria-label", "Final review checklist", 1, "review-inspector"], [3, "complete"], ["role", "alert", 1, "validation-errors"], [1, "warnings"], ["type", "button", 1, "back-review", 3, "click"]], template: function ArtifactComposerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2, 0)(2, "header", 3);
      \u0275\u0275conditionalCreate(3, ArtifactComposerComponent_Conditional_3_Template, 16, 2)(4, ArtifactComposerComponent_Conditional_4_Template, 18, 7);
      \u0275\u0275elementStart(5, "nav", 4)(6, "ol");
      \u0275\u0275repeaterCreate(7, ArtifactComposerComponent_For_8_Template, 9, 8, "li", 5, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "app-task-guide", 6)(10, "p");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "ul");
      \u0275\u0275repeaterCreate(13, ArtifactComposerComponent_For_14_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(15, ArtifactComposerComponent_Conditional_15_Template, 2, 1, "button", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 8);
      \u0275\u0275conditionalCreate(17, ArtifactComposerComponent_Conditional_17_Template, 13, 3, "form", 9)(18, ArtifactComposerComponent_Conditional_18_Template, 27, 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275classProp("review-header", ctx.activeStep() === ctx.steps.length - 1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeStep() === ctx.steps.length - 1 ? 3 : 4);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.visibleSteps());
      \u0275\u0275advance(2);
      \u0275\u0275property("title", ctx.currentStep().shortLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentStep().guidance);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.currentStep().prompts);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeStep() < ctx.steps.length - 1 ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("reviewing", ctx.activeStep() === ctx.steps.length - 1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeStep() < ctx.steps.length - 1 ? 17 : 18);
    }
  }, dependencies: [ExhibitRenderHostComponent, TaskGuideComponent, ObjectModelViewerComponent], styles: ['\n[_nghost-%COMP%] {\n  --%NS%ink: #29231c;\n  --%NS%muted: #746a5c;\n  --%NS%paper: #f5eedc;\n  --%NS%paper-light: #fffaf0;\n  --%NS%brass: #c69a45;\n  --%NS%brass-dark: #765323;\n  --%NS%teal: #245e63;\n  --%NS%charcoal: #1d1c1d;\n  position: fixed;\n  z-index: 75;\n  inset: 0;\n  display: block;\n  overflow-y: auto;\n  color: var(--%NS%ink);\n  background:\n    radial-gradient(\n      circle at 14% 8%,\n      #eadfca 0 9rem,\n      transparent 27rem),\n    repeating-linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.0196078431) 0 1px,\n      transparent 1px 5.5rem),\n    linear-gradient(\n      135deg,\n      #d8ceba,\n      #eee8da 45%,\n      #d4cab7);\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.composer[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.composer-header[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 10;\n  top: 0;\n  display: grid;\n  grid-template-columns: minmax(18rem, 1fr) minmax(16rem, 23rem) auto;\n  gap: clamp(1rem, 3vw, 2.6rem);\n  align-items: center;\n  min-height: 6.5rem;\n  border-bottom: 0.24rem solid var(--%NS%brass);\n  padding: 0.85rem max(1rem, (100vw - 98rem) / 2);\n  color: #fff8e8;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.031372549) 1px,\n      transparent 1px) 0 0/5rem 100%,\n    linear-gradient(\n      112deg,\n      #121315,\n      #282421 66%,\n      #161616);\n  box-shadow: 0 0.35rem 1.1rem rgba(33, 23, 13, 0.4);\n}\n.studio-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.studio-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.workbench-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.field-view-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.review-stage-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.review-inspector[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #d8b25e;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0.12rem 0;\n  font: 800 clamp(1.55rem, 2.4vw, 2.25rem) Georgia, serif;\n}\n.studio-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 42rem;\n  color: #c9bdac;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n  align-items: center;\n}\n.back-to-editing[_ngcontent-%COMP%], \n.header-showcase[_ngcontent-%COMP%], \n.close[_ngcontent-%COMP%] {\n  min-height: 2.7rem;\n  border: 1px solid #7f6e55;\n  color: #fff6df;\n  background: #2b2825;\n}\n.back-to-editing[_ngcontent-%COMP%], \n.header-showcase[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.3rem;\n  padding: 0.55rem 0.8rem;\n  font-size: 0.72rem;\n  font-weight: 850;\n}\n.header-showcase[_ngcontent-%COMP%] {\n  color: #2c2113;\n  background: #e0bc66;\n}\n.header-showcase[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\n.back-to-editing[_ngcontent-%COMP%] {\n  justify-self: start;\n}\n.review-header[_ngcontent-%COMP%] {\n  grid-template-columns: auto 1fr auto;\n}\n.review-title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.close[_ngcontent-%COMP%] {\n  width: 2.7rem;\n  border-radius: 50%;\n  font-size: 1.4rem;\n}\n.composer-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 15rem minmax(30rem, 1fr) minmax(19rem, 23rem);\n  gap: 1rem;\n  align-items: start;\n  width: min(98rem, 100% - 2rem);\n  margin: 1rem auto 2rem;\n}\n.composer-layout.reviewing[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) minmax(19rem, 23rem);\n  width: min(104rem, 100% - 2rem);\n}\n.studio-map[_ngcontent-%COMP%], \n.workbench[_ngcontent-%COMP%], \n.studio-sidecar[_ngcontent-%COMP%] {\n  border: 1px solid #8c7657;\n  box-shadow: 0 0.7rem 1.7rem rgba(53, 36, 17, 0.1725490196), 0 0 0 0.18rem rgba(255, 255, 255, 0.2509803922);\n}\n.studio-map[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 7.5rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n  color: #f3ead8;\n  background:\n    radial-gradient(\n      circle at 30% 0,\n      rgba(255, 255, 255, 0.0470588235),\n      transparent 45%),\n    #24211f;\n}\n.studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #66543d;\n  padding: 1rem;\n}\n.studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0.2rem 0;\n  font: 800 1.05rem Georgia, serif;\n}\n.studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #bdb09e;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0;\n  margin: 0;\n  padding: 0.5rem;\n  list-style: none;\n}\n.studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n}\n.studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child)::after {\n  position: absolute;\n  z-index: 0;\n  top: 2.55rem;\n  bottom: -0.55rem;\n  left: 1.47rem;\n  width: 1px;\n  background: #6b5d4a;\n  content: "";\n}\n.studio-map[_ngcontent-%COMP%]   li.complete[_ngcontent-%COMP%]:not(:last-child)::after {\n  background: #b99550;\n}\n.studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr auto;\n  gap: 0.65rem;\n  align-items: center;\n  width: 100%;\n  border: 0;\n  border-radius: 0.35rem;\n  padding: 0.6rem 0.55rem;\n  color: #e7dcc9;\n  text-align: left;\n  background: transparent;\n}\n.studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.0392156863);\n}\n.studio-map[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #241a0d;\n  background:\n    linear-gradient(\n      100deg,\n      #efd084,\n      #d4a64d);\n  box-shadow: 0 0.35rem 0.9rem rgba(0, 0, 0, 0.3333333333);\n}\n.step-number[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #7e6e59;\n  border-radius: 50%;\n  color: #d9cbaf;\n  background: #171616;\n  font: 800 0.62rem Georgia, serif;\n}\n.complete[_ngcontent-%COMP%]   .step-number[_ngcontent-%COMP%] {\n  border-color: #c8a75c;\n  color: #251b0e;\n  background: #d7b15c;\n}\n.active[_ngcontent-%COMP%]   .step-number[_ngcontent-%COMP%] {\n  border-color: #3e2d16;\n  color: #f8e5b4;\n  background: #39291a;\n}\n.step-name[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n}\n.step-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n}\n.step-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #a99d8d;\n  font-size: 0.56rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.active[_ngcontent-%COMP%]   .step-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #5b4526;\n}\n.step-state[_ngcontent-%COMP%] {\n  color: #9e9282;\n  font-size: 0.53rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.complete[_ngcontent-%COMP%]   .step-state[_ngcontent-%COMP%] {\n  color: #dfbe70;\n}\n.active[_ngcontent-%COMP%]   .step-state[_ngcontent-%COMP%] {\n  color: #4c391e;\n}\n.studio-map[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.55rem;\n  border-top: 1px solid #544838;\n  padding: 0.8rem 1rem;\n  color: #b7aa98;\n  font-size: 0.6rem;\n  line-height: 1.4;\n}\n.studio-map[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: 0.55rem;\n  height: 0.55rem;\n  margin-top: 0.12rem;\n  border-radius: 50%;\n  background: #70a875;\n  box-shadow: 0 0 0 0.2rem rgba(112, 168, 117, 0.1254901961);\n}\n.workbench[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 0.55rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.031372549) 1px,\n      transparent 1px) 0 0/4rem 100%,\n    #e5d8c0;\n}\n.workbench-heading[_ngcontent-%COMP%] {\n  position: relative;\n  border-bottom: 1px solid #bdaa87;\n  padding: 1.1rem 1.25rem 1rem 1.5rem;\n  background:\n    linear-gradient(\n      90deg,\n      #fffdf6,\n      #efe2c8),\n    var(--%NS%paper);\n}\n.workbench-heading[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 1.1rem;\n  bottom: 1rem;\n  left: 0.55rem;\n  width: 0.2rem;\n  background: var(--%NS%brass);\n  content: "";\n}\n.workbench-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.12rem 0 0.2rem;\n  font: 800 clamp(1.35rem, 2vw, 1.8rem) Georgia, serif;\n}\n.workbench-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.workbench-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 48rem;\n  color: var(--%NS%muted);\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.work-surface[_ngcontent-%COMP%] {\n  min-height: 32rem;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.0431372549) 1px,\n      transparent 1px) 0 0/7rem 100%,\n    linear-gradient(#c7ad87, #d8c4a2);\n}\n.step-sheet[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 1rem;\n  min-height: 30rem;\n  border: 1px solid #b8aa8e;\n  padding: clamp(1rem, 2vw, 1.5rem);\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0 2.3rem,\n      rgba(182, 90, 74, 0.1254901961) 2.3rem 2.36rem,\n      transparent 2.36rem),\n    repeating-linear-gradient(#fffdf8 0 2.1rem, #d9d0bd 2.14rem 2.18rem);\n  box-shadow: 0 0.5rem 0.9rem rgba(81, 55, 25, 0.1490196078), inset 0 0 2.2rem rgba(153, 125, 77, 0.0470588235);\n}\n.step-sheet[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 0.45rem;\n  right: 0.7rem;\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #b49355;\n  box-shadow: inset 0 0.1rem 0.15rem rgba(255, 255, 255, 0.6), 0 0.15rem 0.2rem rgba(0, 0, 0, 0.3333333333);\n  content: "";\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n}\nlabel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n  color: #463a2c;\n  font-size: 0.72rem;\n  font-weight: 900;\n}\nlabel[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%], \nlabel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #766b5c;\n  font-size: 0.61rem;\n  font-weight: 650;\n}\n.over-limit[_ngcontent-%COMP%] {\n  color: #a33e32 !important;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #9c896b;\n  border-radius: 0.18rem;\n  padding: 0.72rem;\n  color: #28231e;\n  background: rgba(255, 253, 248, 0.9098039216);\n  box-shadow: inset 0 0.12rem 0.25rem rgba(62, 45, 23, 0.0745098039), 0 1px #fff;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\ninput[_ngcontent-%COMP%]::placeholder, \ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #958878;\n}\n.desk-note[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  width: min(27rem, 92%);\n  margin: -0.3rem auto 0.2rem;\n  padding: 0.9rem 1rem;\n  color: #f9e8bb;\n  text-align: center;\n  background: #2a2622;\n  box-shadow: 0 0.35rem 0.7rem rgba(47, 33, 15, 0.3019607843);\n  transform: rotate(-0.7deg);\n}\n.desk-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d8b461;\n  font-size: 0.56rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.desk-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.95rem/1.35 Georgia, serif;\n}\n.story-sheet[_ngcontent-%COMP%] {\n  align-content: start;\n}\n.plaque-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 0.2rem double #8d713f;\n  font: 700 1.15rem Georgia, serif;\n}\n.claim-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font: italic 0.9rem/1.65 Georgia, serif;\n}\n.curator-test[_ngcontent-%COMP%], \n.source-intro[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  border-left: 0.25rem solid var(--%NS%teal);\n  padding: 0.8rem;\n  background: rgba(227, 238, 232, 0.9098039216);\n}\n.curator-test[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.source-intro[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f8f1df;\n  background: var(--%NS%teal);\n  font-weight: 900;\n}\n.curator-test[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.source-intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4f574f;\n  font-size: 0.69rem;\n  line-height: 1.45;\n}\n.object-editors[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0.75rem;\n  align-items: start;\n}\n.object-editors[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  border: 1px solid #a99370;\n  padding: 0.75rem;\n  background: rgba(248, 241, 226, 0.9333333333);\n  box-shadow: 0 0.35rem 0.75rem rgba(58, 40, 23, 0.1254901961);\n}\n.object-editors[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  border-bottom: 1px solid #caba9e;\n  padding-bottom: 0.6rem;\n}\n.object-number[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  width: 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  color: #fff3d1;\n  background: #7f5a27;\n  font: 800 0.8rem Georgia, serif;\n  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);\n}\n.object-editors[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n}\n.object-editors[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #8d6530;\n  font-size: 0.54rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.object-editors[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font: 700 0.95rem Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.claim-link[_ngcontent-%COMP%] {\n  border-top: 1px dashed #ae9c7e;\n  padding-top: 0.65rem;\n}\n.source-sheet[_ngcontent-%COMP%] {\n  align-content: start;\n}\n.source-intro[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  background: rgba(237, 241, 233, 0.9098039216);\n}\n.source-intro[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 800 1rem Georgia, serif;\n}\n.source-slips[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.8rem;\n}\n.source-slips[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  border: 1px solid #bcae94;\n  padding: 0.8rem;\n  background: rgba(255, 253, 247, 0.9098039216);\n  box-shadow: 0 0.25rem 0.55rem rgba(62, 46, 27, 0.0862745098);\n}\n.source-slips[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  align-items: center;\n}\n.source-slips[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff5d9;\n  background: #805d2a;\n  font-style: normal;\n  font-size: 0.64rem;\n}\n.source-check[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  align-items: center;\n  border-top: 1px dashed #9f8d71;\n  padding-top: 0.75rem;\n  font-size: 0.66rem;\n}\n.source-check[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #ad9b7c;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  background: #eee4d0;\n}\n.connection-sheet[_ngcontent-%COMP%], \n.video-sheet[_ngcontent-%COMP%] {\n  align-content: start;\n}\n.connection-model[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 8rem 1fr;\n  gap: 1rem;\n  align-items: center;\n  border: 1px solid #6f5b42;\n  padding: 1rem;\n  color: #f5e9d1;\n  background:\n    radial-gradient(\n      circle at 14% 42%,\n      rgba(243, 205, 111, 0.1411764706),\n      transparent 26%),\n    #262322;\n}\n.connection-model[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child    > span[_ngcontent-%COMP%] {\n  color: #d4ad5a;\n  font-size: 0.58rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.connection-model[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0.35rem;\n  font: 800 1.25rem Georgia, serif;\n}\n.connection-model[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #c7b9a6;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.model-door[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  height: 6rem;\n  place-items: center;\n  border: 0.32rem ridge #b79046;\n  color: #f2cf79;\n  background:\n    linear-gradient(\n      135deg,\n      #45403a,\n      #161515);\n  box-shadow: inset 0 0 1.6rem #000;\n  perspective: 20rem;\n}\n.model-door[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 800 1.2rem Georgia, serif;\n}\n.model-door[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.25rem;\n  bottom: 0.25rem;\n  left: 0.25rem;\n  height: 28%;\n  background:\n    linear-gradient(\n      150deg,\n      transparent 49%,\n      rgba(201, 164, 87, 0.2666666667) 50%);\n  transform: rotateX(55deg);\n}\n.connection-status[_ngcontent-%COMP%], \n.guide-status[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  border: 1px solid #ac9b80;\n  padding: 0.65rem;\n  color: #655b4e;\n  background: #eee7da;\n}\n.connection-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.guide-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.65rem;\n  height: 0.65rem;\n  border-radius: 50%;\n  background: #9e7744;\n  box-shadow: 0 0 0 0.22rem rgba(158, 119, 68, 0.1254901961);\n}\n.connection-status.connected[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.guide-status.complete[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background: #53805d;\n  box-shadow: 0 0 0 0.22rem rgba(83, 128, 93, 0.1254901961);\n}\n.connection-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.guide-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n}\n.connection-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.guide-status[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #817567;\n  font-size: 0.59rem;\n}\n.recording-plan[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(10rem, 0.8fr) 1fr;\n  gap: 1rem;\n  align-items: center;\n  border: 1px solid #5f5548;\n  padding: 1rem;\n  color: #f2e7d0;\n  background: #272523;\n}\n.recording-light[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  font: 800 0.86rem Georgia, serif;\n}\n.recording-light[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.65rem;\n  height: 0.65rem;\n  border-radius: 50%;\n  background: #b64b3e;\n  box-shadow: 0 0 0.8rem #db594b;\n}\n.recording-plan[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.recording-plan[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.45rem;\n  align-items: center;\n  color: #c8bba8;\n  font-size: 0.65rem;\n}\n.recording-plan[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.35rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #8a775c;\n  border-radius: 50%;\n  color: #e5c77c;\n}\n.prototype-field-note[_ngcontent-%COMP%] {\n  border: 1px dashed #a8844e;\n  border-left: 0.25rem solid #a8844e;\n  padding: 0.7rem 0.8rem;\n  color: #66481d;\n  background: rgba(249, 237, 205, 0.9019607843);\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  border: 1px solid #bc7d6c;\n  border-left: 0.3rem solid #9e4338;\n  padding: 0.8rem;\n  color: #6b3027;\n  background: #f8e2db;\n}\n.validation-errors[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  padding-left: 1.1rem;\n  font-size: 0.68rem;\n}\n.video-screen[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.6rem;\n  min-height: 10rem;\n  align-items: center;\n  padding: 1rem;\n  color: #f1dfb1;\n  background:\n    radial-gradient(\n      circle at 25% 35%,\n      rgba(197, 153, 78, 0.3137254902),\n      transparent 22%),\n    #19191b;\n  box-shadow: inset 0 0 0 1px #9f814d;\n}\n.video-screen[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 800 0.85rem Georgia, serif;\n}\n.video-screen[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #241b0f;\n  background: #e3c36f;\n  font-style: normal;\n}\n.review-experience[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #7b684d;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.0274509804) 1px,\n      transparent 1px) 0 0/4rem 100%,\n    #262322;\n  box-shadow: 0 0.8rem 2rem rgba(44, 29, 16, 0.3137254902);\n}\n.review-stage-heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  align-items: baseline;\n  padding: 0.25rem 0.2rem 0.8rem;\n  color: #f6ead4;\n}\n.review-stage-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 800 1.3rem Georgia, serif;\n}\n.review-stage-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #bfb1a0;\n  font-size: 0.62rem;\n}\n.full-preview[_ngcontent-%COMP%] {\n  border: 0.5rem ridge #b88f47;\n  background: #f4eedf;\n}\n.review-inspector[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 7.5rem;\n  display: grid;\n  gap: 0.75rem;\n  border: 1px solid #8c7657;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: #f6efdf;\n  box-shadow: 0 0.7rem 1.7rem rgba(53, 36, 17, 0.1725490196);\n}\n.review-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 800 1.45rem Georgia, serif;\n}\n.review-inspector[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.review-inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #6f6456;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.8rem 1fr auto;\n  gap: 0.5rem;\n  align-items: center;\n  border: 1px solid #c0b096;\n  padding: 0.55rem;\n  background: #fffaf0;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #957042;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   li.complete[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #53805d;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #776b5d;\n  font-size: 0.53rem;\n}\n.review-inspector[_ngcontent-%COMP%]    > ol[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #9b896d;\n  border-radius: 999px;\n  padding: 0.3rem 0.48rem;\n  color: #54442f;\n  background: #eee4d2;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.back-review[_ngcontent-%COMP%] {\n  min-height: 2.7rem;\n  border: 1px solid #796548;\n  color: #f6ead3;\n  background: #292622;\n  font-weight: 900;\n}\n.warnings[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  border: 1px solid #9b7f53;\n  padding: 0.55rem;\n  color: #dac8a9;\n  background: #1d1a18;\n  font-size: 0.65rem;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #53b9c3;\n  outline-offset: 2px;\n}\n@media (max-width: 1180px) {\n  .composer-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr auto;\n  }\n  .composer-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.62fr);\n  }\n  .composer-layout.reviewing[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.45fr);\n  }\n  .studio-map[_ngcontent-%COMP%] {\n    position: static;\n    grid-column: 1/-1;\n  }\n  .studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%], \n   .studio-map[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%], \n   .step-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(6, 1fr);\n    padding: 0.4rem;\n  }\n  .studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:last-child)::after {\n    top: 50%;\n    right: -0.5rem;\n    bottom: auto;\n    left: auto;\n    width: 1rem;\n    height: 1px;\n  }\n  .studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .step-state[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 760px) {\n  .composer-header[_ngcontent-%COMP%] {\n    position: static;\n    grid-template-columns: 1fr auto;\n    min-height: auto;\n  }\n  .studio-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .composer-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    width: calc(100% - 0.8rem);\n  }\n  .composer-layout.reviewing[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .studio-map[_ngcontent-%COMP%] {\n    grid-column: auto;\n    overflow-x: auto;\n  }\n  .studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    grid-auto-columns: minmax(7.5rem, 1fr);\n    grid-auto-flow: column;\n    grid-template-columns: none;\n  }\n  .studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    grid-template-columns: 2rem 1fr;\n  }\n  .review-inspector[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .review-header[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr auto;\n  }\n  .review-header[_ngcontent-%COMP%]   .review-title[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-showcase[_ngcontent-%COMP%] {\n    font-size: 0.65rem;\n  }\n  .workbench[_ngcontent-%COMP%] {\n    grid-row: 3;\n  }\n  .work-surface[_ngcontent-%COMP%] {\n    min-height: auto;\n    padding: 0.5rem;\n  }\n  .step-sheet[_ngcontent-%COMP%] {\n    min-height: auto;\n    padding: 0.8rem;\n  }\n  .object-editors[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .connection-model[_ngcontent-%COMP%], \n   .recording-plan[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .model-door[_ngcontent-%COMP%] {\n    width: 9rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n  }\n}\n[_nghost-%COMP%] {\n  overflow: hidden;\n}\n.composer[_ngcontent-%COMP%] {\n  height: 100dvh;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n}\n.composer-header[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  min-height: 0;\n  padding: 12px 20px;\n  position: static;\n}\n.studio-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(23px, 2vw, 32px);\n}\n.composer-layout[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  margin: 12px auto;\n  align-items: stretch;\n  grid-template-columns: 210px minmax(0, 1fr) minmax(230px, 320px);\n}\n.workbench[_ngcontent-%COMP%] {\n  min-height: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n}\n.workbench-heading[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n}\n.work-surface[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n  padding: 12px;\n  scrollbar-gutter: stable;\n}\n.step-sheet[_ngcontent-%COMP%] {\n  min-height: 0;\n  padding: 16px;\n  gap: 12px;\n}\n.studio-map[_ngcontent-%COMP%], \n.studio-sidecar[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: auto;\n}\n.composer-layout.reviewing[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n@media (max-width: 1100px) {\n  .composer-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 180px minmax(0, 1fr);\n  }\n}\n@media (max-width: 700px) {\n  .composer-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 8px;\n  }\n  .composer-layout[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    width: calc(100% - 16px);\n    gap: 8px;\n    margin: 8px;\n  }\n  .studio-map[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    max-height: 66px;\n  }\n  .studio-map[_ngcontent-%COMP%]   header[_ngcontent-%COMP%], \n   .studio-map[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%], \n   .step-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .step-state[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 0;\n    padding: 0;\n  }\n  .studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px;\n    min-width: 90px;\n    gap: 4px;\n  }\n  .workbench[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\ndialog.composer[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: none;\n  max-height: none;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  inset: 0;\n  color: var(--%NS%ink);\n  background: #e8dfce;\n}\ndialog.composer[_ngcontent-%COMP%]:not([open]) {\n  display: none;\n}\n.composer-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px;\n  min-height: 0;\n  padding: 10px 22px;\n}\n.studio-title[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.studio-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font: 700 16px Arial;\n}\n.studio-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.studio-title[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.studio-progress[_ngcontent-%COMP%] {\n  display: none;\n}\n.composer-header[_ngcontent-%COMP%]   .studio-map[_ngcontent-%COMP%] {\n  width: auto;\n  border: 0;\n  padding: 0;\n  background: none;\n  box-shadow: none;\n}\n.studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin: 0;\n  padding: 0;\n}\n.studio-map[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.studio-map[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 8px 10px;\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.studio-map[_ngcontent-%COMP%]   .step-number[_ngcontent-%COMP%], \n.studio-map[_ngcontent-%COMP%]   .step-state[_ngcontent-%COMP%] {\n  display: none;\n}\n.header-next[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 0;\n  border-radius: 8px;\n  padding: 10px 18px;\n  background: #d3b571;\n  color: #242d26;\n  font: 700 14px Arial;\n}\n.composer-layout[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 1200px;\n  margin: auto;\n  padding: 24px;\n}\n.composer-layout[_ngcontent-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: none;\n}\n.workbench-heading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 0 0 20px;\n}\n.workbench-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: none;\n}\n.workbench-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n.work-surface[_ngcontent-%COMP%] {\n  max-height: none;\n  overflow: visible;\n}\n.objects-to-ideas[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  gap: 30px;\n  align-items: center;\n}\n.object-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-bottom: 14px;\n}\n.object-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 10px;\n  border: 1px solid #a1967c;\n  border-radius: 8px;\n  background: #fff9e9;\n}\n.object-tabs[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #285d59;\n  color: #fff9e9;\n}\n.object-study[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 260px;\n  object-fit: contain;\n}\n.first-claim[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 180px;\n  font: 20px/1.5 Georgia;\n}\n.first-claim[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.first-claim[_ngcontent-%COMP%]   .plaque-field[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.story-sheet[_ngcontent-%COMP%] {\n  background: none;\n  padding: 0;\n}\n.composer-layout.reviewing[_ngcontent-%COMP%] {\n  display: grid;\n}\n@media (max-width: 750px) {\n  .composer-header[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n  }\n  .studio-map[_ngcontent-%COMP%] {\n    order: 5;\n    flex: 1 0 100%;\n  }\n  .studio-map[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n  .composer-layout[_ngcontent-%COMP%] {\n    padding: 18px 12px;\n  }\n  .objects-to-ideas[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 18px;\n  }\n  .workbench-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n}\n[_nghost-%COMP%] {\n  position: static;\n  inset: auto;\n  overflow: visible;\n  background: #e8dfce;\n  min-height: calc(100dvh - 52px);\n}\n.composer[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: calc(100dvh - 52px);\n  color: var(--%NS%ink);\n  background: #e8dfce;\n}\n.composer-layout[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.object-study[_ngcontent-%COMP%] {\n  --%NS%model-height: 320px;\n}\n.work-surface[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n.composer-layout[_ngcontent-%COMP%]   .workbench[_ngcontent-%COMP%] {\n  display: block;\n}\n.studio-map[_ngcontent-%COMP%] {\n  overflow: visible;\n  max-height: none;\n}\n/*# sourceMappingURL=artifact-composer.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtifactComposerComponent, [{
    type: Component,
    args: [{ selector: "app-artifact-composer", imports: [ExhibitRenderHostComponent, TaskGuideComponent, ObjectModelViewerComponent], template: `<section #composerDialog class="composer" aria-labelledby="composer-title">
  <header class="composer-header" [class.review-header]="activeStep() === steps.length - 1">
    @if (activeStep() === steps.length - 1) {
      <button type="button" class="back-to-editing" (click)="backToEditing()">
        <span aria-hidden="true">\u2190</span> Back to editing
      </button>
      <div class="studio-title review-title">
        <span>Full visitor review</span>
        <h1 id="composer-title">Inspect the complete exhibit</h1>
        <p>Walk through the final snapshot exactly as visitors will experience it.</p>
      </div>
      <div class="header-actions">
        <button
          type="button"
          class="header-showcase"
          [disabled]="
            !validation().valid || submissionLocked() || (published() && rehangsRemaining() === 0)
          "
          (click)="publishedRequested.emit()"
        >
          {{ submissionLocked() ? 'Submissions locked' : publishLabel() }}
        </button>
        <button
          type="button"
          class="close"
          (click)="closed.emit()"
          aria-label="Return to exhibit hall"
        >
          \xD7
        </button>
      </div>
    } @else {
      <div class="studio-title">
        <span>Student curator studio</span>
        <h1 id="composer-title">
          {{ starterExample() ? 'Inspect a worked example' : 'Build your final exhibit' }}
        </h1>
        <p>Build one part at a time. Your work becomes the visitor-ready museum snapshot.</p>
      </div>

      <div class="studio-progress">
        <div>
          <span>{{
            starterExample()
              ? 'Example content readiness \u2014 not your progress'
              : 'Your draft readiness'
          }}</span>
          <strong>{{ completedStepCount() }} of {{ editingStepCount }} stations ready</strong>
        </div>
        <i
          role="progressbar"
          aria-label="Exhibit build progress"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-valuenow]="completionPercent()"
        >
          <b [style.width.%]="completionPercent()"></b>
        </i>
      </div>

      <div class="header-actions">
        <button
          type="button"
          class="close"
          (click)="closed.emit()"
          aria-label="Return to exhibit hall"
        >
          \xD7
        </button>
      </div>
    }
    <nav class="studio-map" aria-label="Exhibit build steps">
      <ol>
        @for (step of visibleSteps(); track step.shortLabel; let index = $index) {
          <li [class.active]="activeStep() === index" [class.complete]="isStepComplete(index)">
            <button
              type="button"
              (click)="goToStep(index)"
              [attr.aria-current]="activeStep() === index ? 'step' : null"
            >
              <span class="step-number">{{ (index + 1).toString().padStart(2, '0') }}</span>
              <span class="step-name">
                <strong>{{ step.shortLabel }}</strong>
              </span>
              <span class="step-state">
                {{ activeStep() === index ? 'Now' : isStepComplete(index) ? 'Ready' : 'To do' }}
              </span>
            </button>
          </li>
        }
      </ol>
    </nav>
    <app-task-guide [title]="currentStep().shortLabel"
      ><p>{{ currentStep().guidance }}</p>
      <ul>
        @for (prompt of currentStep().prompts; track prompt) {
          <li>{{ prompt }}</li>
        }
      </ul></app-task-guide
    >
    @if (activeStep() < steps.length - 1) {
      <button class="header-next" type="button" (click)="nextStep()">
        {{ activeStep() === 2 && !coreReady() ? 'Finish my first ideas' : 'Next' }} \u2192
      </button>
    }
  </header>

  <div class="composer-layout" [class.reviewing]="activeStep() === steps.length - 1">
    @if (activeStep() < steps.length - 1) {
      <form class="workbench" (submit)="$event.preventDefault(); publishedRequested.emit()">
        <div class="workbench-heading">
          <span>Station {{ (activeStep() + 1).toString().padStart(2, '0') }}</span>
          <h2 #stepHeading tabindex="-1">
            {{ activeStep() === 0 ? 'What connects these objects?' : currentStep().title }}
          </h2>
        </div>

        <div
          class="work-surface"
          tabindex="0"
          role="region"
          aria-label="Active station fields \u2014 scroll for more"
        >
          @switch (activeStep()) {
            @case (0) {
              <section class="step-sheet story-sheet" aria-label="Collection story">
                <div class="objects-to-ideas">
                  <div class="object-study">
                    <div class="object-tabs" aria-label="Objects to examine">
                      @for (object of draft().objects; track object.id; let index = $index) {
                        <button
                          type="button"
                          [attr.aria-pressed]="inspectedObject() === index"
                          (click)="inspectedObject.set(index)"
                        >
                          {{ object.title }}
                        </button>
                      }
                    </div>
                    @if (draft().objects[inspectedObject()]; as object) {
                      @if (object.model; as model) {
                        <app-object-model-viewer [model]="model" [autoLoad]="true" />
                      } @else if (object.imageAssetId) {
                        <img [src]="object.imageAssetId" [alt]="object.imageAlt || object.title" />
                      }
                    }
                  </div>
                  <div class="first-claim">
                    <label class="claim-field" data-field-id="central-claim"
                      ><span>My first idea</span
                      ><textarea
                        rows="4"
                        [value]="draft().centralClaim"
                        (input)="claimChanged.emit(value($event))"
                        placeholder="Together, these objects show\u2026"
                      ></textarea>
                    </label>
                    @if (draft().centralClaim.trim()) {
                      <label class="plaque-field" data-field-id="exhibit-title"
                        ><span>Name my exhibit</span
                        ><input
                          type="text"
                          [value]="draft().title"
                          (input)="titleChanged.emit(value($event))"
                      /></label>
                    }
                  </div>
                </div>
              </section>
            }

            @case (1) {
              <section
                class="step-sheet artifact-sheet"
                data-field-id="selected-objects"
                aria-label="Artifact labels"
              >
                <div class="object-editors" data-field-id="object-captions">
                  @for (object of draft().objects; track object.id; let index = $index) {
                    <article>
                      <header>
                        <span class="object-number">{{ index + 1 }}</span>
                        <div>
                          <small>Display object</small>
                          <strong>{{ object.title || 'Untitled artifact' }}</strong>
                        </div>
                      </header>
                      <label>
                        <span>Artifact name</span>
                        <input
                          type="text"
                          [value]="object.title"
                          (input)="
                            objectChanged.emit({
                              objectId: object.id,
                              field: 'title',
                              value: value($event),
                            })
                          "
                        />
                      </label>
                      <label>
                        <span>What is it?</span>
                        <small>Describe material, use, date, and context.</small>
                        <textarea
                          rows="5"
                          [value]="object.description"
                          (input)="
                            objectChanged.emit({
                              objectId: object.id,
                              field: 'description',
                              value: value($event),
                            })
                          "
                        ></textarea>
                      </label>
                      <label class="claim-link">
                        <span>Why does it belong?</span>
                        <small>Connect this object directly to the collection claim.</small>
                        <textarea
                          rows="4"
                          [value]="object.evidenceConnection"
                          (input)="
                            objectChanged.emit({
                              objectId: object.id,
                              field: 'evidenceConnection',
                              value: value($event),
                            })
                          "
                        ></textarea>
                      </label>
                    </article>
                  }
                </div>
              </section>
            }

            @case (2) {
              <section
                class="step-sheet source-sheet"
                data-field-id="source-list"
                aria-label="Research sources"
              >
                <div class="source-intro">
                  <span aria-hidden="true">\u2315</span>
                  <div>
                    <strong>Leave a research trail</strong>
                    <p>
                      Visitors should be able to tell where your facts came from and why the source
                      is trustworthy.
                    </p>
                  </div>
                </div>
                <div class="source-slips">
                  @for (source of draft().sources; track source.id; let index = $index) {
                    <label>
                      <span
                        ><i>{{ index + 1 }}</i> Museum or scholarly source</span
                      >
                      <textarea
                        rows="4"
                        [value]="source.citation"
                        (input)="
                          sourceChanged.emit({ sourceId: source.id, citation: value($event) })
                        "
                        placeholder="Museum or author, resource title, collection or publisher, date or URL"
                      ></textarea>
                    </label>
                  }
                </div>
                <div class="source-check">
                  <strong>A strong citation usually answers:</strong>
                  <span>Who made it?</span><span>What is it called?</span
                  ><span>Where is it kept?</span>
                </div>
              </section>
            }

            @case (3) {
              <section
                class="step-sheet connection-sheet"
                data-field-id="immersive-gallery"
                aria-label="MetaSteps gallery connection"
              >
                <div class="connection-model">
                  <div class="model-door" aria-hidden="true">
                    <span>3D</span>
                    <i></i>
                  </div>
                  <div>
                    <span>Shared museum connection</span>
                    <h3>Link the entrance to MetaSteps</h3>
                    <p>
                      This connection lets visitors leave the exhibit label and walk into the space
                      your team designed.
                    </p>
                  </div>
                </div>
                <label>
                  <span>Wing title</span>
                  <input
                    type="text"
                    [value]="draft().immersiveGallery?.title ?? ''"
                    (input)="galleryTitleChanged.emit(value($event))"
                    placeholder="Example: Life Along the Nile \u2014 3D Wing"
                  />
                </label>
                <label>
                  <span>MetaSteps public embed code or viewer URL</span>
                  <textarea
                    rows="7"
                    [value]="draft().immersiveGallery?.embedUrl ?? ''"
                    (input)="galleryEmbedChanged.emit(value($event))"
                    placeholder="Paste the public embed code copied from MetaSteps"
                    aria-describedby="metasteps-help"
                  ></textarea>
                  <small id="metasteps-help">
                    Use the public viewer embed. Never paste a password or private API key.
                  </small>
                </label>
                <div class="connection-status" [class.connected]="isStepComplete(3)">
                  <i aria-hidden="true"></i>
                  <span>
                    <strong>{{
                      isStepComplete(3) ? 'Entrance connected' : 'Waiting for a link'
                    }}</strong>
                    <small>Test the public view before the final showcase.</small>
                  </span>
                </div>
              </section>
            }

            @case (4) {
              <section
                class="step-sheet video-sheet"
                data-field-id="video-presentation"
                aria-label="Curator video presentation"
              >
                <div class="recording-plan">
                  <div class="recording-light"><i></i> Curator recording station</div>
                  <ol>
                    <li><span>1</span>Introduce the collection claim.</li>
                    <li><span>2</span>Use the artifacts as evidence.</li>
                    <li><span>3</span>Invite visitors to explore the 3D wing.</li>
                  </ol>
                </div>
                @if (draft().videoPresentation?.prototype) {
                  <p class="prototype-field-note">
                    <strong>Prototype station:</strong> A demonstration player is standing in for
                    the final student video. The real presentation can be connected later.
                  </p>
                }
                <label>
                  <span>Presentation title</span>
                  <input
                    type="text"
                    [value]="draft().videoPresentation?.title ?? ''"
                    (input)="videoTitleChanged.emit(value($event))"
                    placeholder="Example: How these artifacts reveal everyday life"
                  />
                </label>
                <label>
                  <span>Public video URL or iframe code</span>
                  <textarea
                    rows="6"
                    [value]="draft().videoPresentation?.videoUrl ?? ''"
                    (input)="videoUrlChanged.emit(value($event))"
                    placeholder="Paste a YouTube, Vimeo, MP4, WebM, or Ogg link"
                    aria-describedby="video-help"
                  ></textarea>
                  <small id="video-help">
                    Check sharing permissions. Do not include surnames or private information in a
                    public video.
                  </small>
                </label>
              </section>
            }
          }
        </div>
      </form>
    } @else {
      <main class="review-experience" aria-label="Complete visitor exhibit review">
        <div class="review-stage-heading">
          <span>Visitor-ready snapshot</span>
          <strong>{{ draft().title || 'Untitled exhibit' }}</strong>
          <small>Review the complete reading order, 3D entrance, video station, and sources.</small>
        </div>
        <div class="full-preview">
          <app-exhibit-render-host [snapshot]="previewSnapshot()" mode="preview" />
        </div>
      </main>

      <aside class="review-inspector" aria-label="Final review checklist">
        <span>Final inspection</span>
        <h2 #stepHeading tabindex="-1">
          {{ validation().valid ? 'Ready for visitors' : 'Finish these pieces' }}
        </h2>
        <p>
          {{
            validation().valid
              ? 'Every required exhibit part is present.'
              : 'Return to the marked station and complete the missing work.'
          }}
        </p>
        <ol>
          @for (step of steps.slice(0, 5); track step.shortLabel; let index = $index) {
            <li [class.complete]="isStepComplete(index)">
              <span>{{ isStepComplete(index) ? '\u2713' : index + 1 }}</span>
              <div>
                <strong>{{ step.shortLabel }}</strong
                ><small>{{ step.title }}</small>
              </div>
              <button type="button" (click)="goToStep(index)">
                {{ isStepComplete(index) ? 'Edit' : 'Finish' }}
              </button>
            </li>
          }
        </ol>
        @if (validation().errors.length) {
          <div class="validation-errors" role="alert">
            <strong>Fix before showcasing</strong>
            <ul>
              @for (error of validation().errors; track error.fieldId) {
                <li>{{ error.message }}</li>
              }
            </ul>
          </div>
        }
        @if (validation().warnings.length) {
          <div class="warnings">
            @for (warning of validation().warnings; track warning.message) {
              <p>{{ warning.message }}</p>
            }
          </div>
        }
        <button type="button" class="back-review" (click)="backToEditing()">
          <span aria-hidden="true">\u2190</span> Back to editing
        </button>
      </aside>
    }
  </div>
</section>
`, styles: ['/* src/app/templates/exhibit-hall/ui/artifact-composer.component.scss */\n:host {\n  --ink: #29231c;\n  --muted: #746a5c;\n  --paper: #f5eedc;\n  --paper-light: #fffaf0;\n  --brass: #c69a45;\n  --brass-dark: #765323;\n  --teal: #245e63;\n  --charcoal: #1d1c1d;\n  position: fixed;\n  z-index: 75;\n  inset: 0;\n  display: block;\n  overflow-y: auto;\n  color: var(--ink);\n  background:\n    radial-gradient(\n      circle at 14% 8%,\n      #eadfca 0 9rem,\n      transparent 27rem),\n    repeating-linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.0196078431) 0 1px,\n      transparent 1px 5.5rem),\n    linear-gradient(\n      135deg,\n      #d8ceba,\n      #eee8da 45%,\n      #d4cab7);\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: not-allowed;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\n.composer {\n  min-height: 100dvh;\n}\n.composer-header {\n  position: sticky;\n  z-index: 10;\n  top: 0;\n  display: grid;\n  grid-template-columns: minmax(18rem, 1fr) minmax(16rem, 23rem) auto;\n  gap: clamp(1rem, 3vw, 2.6rem);\n  align-items: center;\n  min-height: 6.5rem;\n  border-bottom: 0.24rem solid var(--brass);\n  padding: 0.85rem max(1rem, (100vw - 98rem) / 2);\n  color: #fff8e8;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.031372549) 1px,\n      transparent 1px) 0 0/5rem 100%,\n    linear-gradient(\n      112deg,\n      #121315,\n      #282421 66%,\n      #161616);\n  box-shadow: 0 0.35rem 1.1rem rgba(33, 23, 13, 0.4);\n}\n.studio-title > span,\n.studio-progress span,\n.studio-map header > span,\n.workbench-heading > span,\n.field-view-heading > span,\n.review-stage-heading > span,\n.review-inspector > span {\n  color: #d8b25e;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: 0.12rem 0;\n  font: 800 clamp(1.55rem, 2.4vw, 2.25rem) Georgia, serif;\n}\n.studio-title p {\n  max-width: 42rem;\n  color: #c9bdac;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n  align-items: center;\n}\n.back-to-editing,\n.header-showcase,\n.close {\n  min-height: 2.7rem;\n  border: 1px solid #7f6e55;\n  color: #fff6df;\n  background: #2b2825;\n}\n.back-to-editing,\n.header-showcase {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.3rem;\n  padding: 0.55rem 0.8rem;\n  font-size: 0.72rem;\n  font-weight: 850;\n}\n.header-showcase {\n  color: #2c2113;\n  background: #e0bc66;\n}\n.header-showcase:disabled {\n  opacity: 0.45;\n}\n.back-to-editing {\n  justify-self: start;\n}\n.review-header {\n  grid-template-columns: auto 1fr auto;\n}\n.review-title {\n  text-align: center;\n}\n.close {\n  width: 2.7rem;\n  border-radius: 50%;\n  font-size: 1.4rem;\n}\n.composer-layout {\n  display: grid;\n  grid-template-columns: 15rem minmax(30rem, 1fr) minmax(19rem, 23rem);\n  gap: 1rem;\n  align-items: start;\n  width: min(98rem, 100% - 2rem);\n  margin: 1rem auto 2rem;\n}\n.composer-layout.reviewing {\n  grid-template-columns: minmax(0, 1fr) minmax(19rem, 23rem);\n  width: min(104rem, 100% - 2rem);\n}\n.studio-map,\n.workbench,\n.studio-sidecar {\n  border: 1px solid #8c7657;\n  box-shadow: 0 0.7rem 1.7rem rgba(53, 36, 17, 0.1725490196), 0 0 0 0.18rem rgba(255, 255, 255, 0.2509803922);\n}\n.studio-map {\n  position: sticky;\n  top: 7.5rem;\n  overflow: hidden;\n  border-radius: 0.55rem;\n  color: #f3ead8;\n  background:\n    radial-gradient(\n      circle at 30% 0,\n      rgba(255, 255, 255, 0.0470588235),\n      transparent 45%),\n    #24211f;\n}\n.studio-map header {\n  border-bottom: 1px solid #66543d;\n  padding: 1rem;\n}\n.studio-map header strong {\n  display: block;\n  margin: 0.2rem 0;\n  font: 800 1.05rem Georgia, serif;\n}\n.studio-map header p {\n  color: #bdb09e;\n  font-size: 0.66rem;\n  line-height: 1.4;\n}\n.studio-map ol {\n  display: grid;\n  gap: 0;\n  margin: 0;\n  padding: 0.5rem;\n  list-style: none;\n}\n.studio-map li {\n  position: relative;\n}\n.studio-map li:not(:last-child)::after {\n  position: absolute;\n  z-index: 0;\n  top: 2.55rem;\n  bottom: -0.55rem;\n  left: 1.47rem;\n  width: 1px;\n  background: #6b5d4a;\n  content: "";\n}\n.studio-map li.complete:not(:last-child)::after {\n  background: #b99550;\n}\n.studio-map li button {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 2.1rem 1fr auto;\n  gap: 0.65rem;\n  align-items: center;\n  width: 100%;\n  border: 0;\n  border-radius: 0.35rem;\n  padding: 0.6rem 0.55rem;\n  color: #e7dcc9;\n  text-align: left;\n  background: transparent;\n}\n.studio-map li button:hover {\n  background: rgba(255, 255, 255, 0.0392156863);\n}\n.studio-map li.active button {\n  color: #241a0d;\n  background:\n    linear-gradient(\n      100deg,\n      #efd084,\n      #d4a64d);\n  box-shadow: 0 0.35rem 0.9rem rgba(0, 0, 0, 0.3333333333);\n}\n.step-number {\n  display: grid;\n  width: 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #7e6e59;\n  border-radius: 50%;\n  color: #d9cbaf;\n  background: #171616;\n  font: 800 0.62rem Georgia, serif;\n}\n.complete .step-number {\n  border-color: #c8a75c;\n  color: #251b0e;\n  background: #d7b15c;\n}\n.active .step-number {\n  border-color: #3e2d16;\n  color: #f8e5b4;\n  background: #39291a;\n}\n.step-name {\n  display: grid;\n  min-width: 0;\n}\n.step-name strong {\n  font-size: 0.74rem;\n}\n.step-name small {\n  overflow: hidden;\n  color: #a99d8d;\n  font-size: 0.56rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.active .step-name small {\n  color: #5b4526;\n}\n.step-state {\n  color: #9e9282;\n  font-size: 0.53rem;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.complete .step-state {\n  color: #dfbe70;\n}\n.active .step-state {\n  color: #4c391e;\n}\n.studio-map footer {\n  display: flex;\n  gap: 0.55rem;\n  border-top: 1px solid #544838;\n  padding: 0.8rem 1rem;\n  color: #b7aa98;\n  font-size: 0.6rem;\n  line-height: 1.4;\n}\n.studio-map footer i {\n  flex: 0 0 auto;\n  width: 0.55rem;\n  height: 0.55rem;\n  margin-top: 0.12rem;\n  border-radius: 50%;\n  background: #70a875;\n  box-shadow: 0 0 0 0.2rem rgba(112, 168, 117, 0.1254901961);\n}\n.workbench {\n  min-width: 0;\n  overflow: hidden;\n  border-radius: 0.55rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.031372549) 1px,\n      transparent 1px) 0 0/4rem 100%,\n    #e5d8c0;\n}\n.workbench-heading {\n  position: relative;\n  border-bottom: 1px solid #bdaa87;\n  padding: 1.1rem 1.25rem 1rem 1.5rem;\n  background:\n    linear-gradient(\n      90deg,\n      #fffdf6,\n      #efe2c8),\n    var(--paper);\n}\n.workbench-heading::before {\n  position: absolute;\n  top: 1.1rem;\n  bottom: 1rem;\n  left: 0.55rem;\n  width: 0.2rem;\n  background: var(--brass);\n  content: "";\n}\n.workbench-heading h2 {\n  margin: 0.12rem 0 0.2rem;\n  font: 800 clamp(1.35rem, 2vw, 1.8rem) Georgia, serif;\n}\n.workbench-heading h2:focus {\n  outline: none;\n}\n.workbench-heading p {\n  max-width: 48rem;\n  color: var(--muted);\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.work-surface {\n  min-height: 32rem;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.0431372549) 1px,\n      transparent 1px) 0 0/7rem 100%,\n    linear-gradient(#c7ad87, #d8c4a2);\n}\n.step-sheet {\n  position: relative;\n  display: grid;\n  gap: 1rem;\n  min-height: 30rem;\n  border: 1px solid #b8aa8e;\n  padding: clamp(1rem, 2vw, 1.5rem);\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0 2.3rem,\n      rgba(182, 90, 74, 0.1254901961) 2.3rem 2.36rem,\n      transparent 2.36rem),\n    repeating-linear-gradient(#fffdf8 0 2.1rem, #d9d0bd 2.14rem 2.18rem);\n  box-shadow: 0 0.5rem 0.9rem rgba(81, 55, 25, 0.1490196078), inset 0 0 2.2rem rgba(153, 125, 77, 0.0470588235);\n}\n.step-sheet::after {\n  position: absolute;\n  top: 0.45rem;\n  right: 0.7rem;\n  width: 0.55rem;\n  height: 0.55rem;\n  border-radius: 50%;\n  background: #b49355;\n  box-shadow: inset 0 0.1rem 0.15rem rgba(255, 255, 255, 0.6), 0 0.15rem 0.2rem rgba(0, 0, 0, 0.3333333333);\n  content: "";\n}\nlabel {\n  display: grid;\n  gap: 0.35rem;\n}\nlabel > span {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n  color: #463a2c;\n  font-size: 0.72rem;\n  font-weight: 900;\n}\nlabel > small,\nlabel > span small {\n  color: #766b5c;\n  font-size: 0.61rem;\n  font-weight: 650;\n}\n.over-limit {\n  color: #a33e32 !important;\n}\ninput,\ntextarea {\n  width: 100%;\n  border: 1px solid #9c896b;\n  border-radius: 0.18rem;\n  padding: 0.72rem;\n  color: #28231e;\n  background: rgba(255, 253, 248, 0.9098039216);\n  box-shadow: inset 0 0.12rem 0.25rem rgba(62, 45, 23, 0.0745098039), 0 1px #fff;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\ntextarea {\n  resize: vertical;\n}\ninput::placeholder,\ntextarea::placeholder {\n  color: #958878;\n}\n.desk-note {\n  display: grid;\n  gap: 0.25rem;\n  width: min(27rem, 92%);\n  margin: -0.3rem auto 0.2rem;\n  padding: 0.9rem 1rem;\n  color: #f9e8bb;\n  text-align: center;\n  background: #2a2622;\n  box-shadow: 0 0.35rem 0.7rem rgba(47, 33, 15, 0.3019607843);\n  transform: rotate(-0.7deg);\n}\n.desk-note span {\n  color: #d8b461;\n  font-size: 0.56rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.desk-note strong {\n  font: 700 0.95rem/1.35 Georgia, serif;\n}\n.story-sheet {\n  align-content: start;\n}\n.plaque-field input {\n  border: 0.2rem double #8d713f;\n  font: 700 1.15rem Georgia, serif;\n}\n.claim-field textarea {\n  font: italic 0.9rem/1.65 Georgia, serif;\n}\n.curator-test,\n.source-intro {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  border-left: 0.25rem solid var(--teal);\n  padding: 0.8rem;\n  background: rgba(227, 238, 232, 0.9098039216);\n}\n.curator-test > span,\n.source-intro > span {\n  display: grid;\n  flex: 0 0 auto;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #f8f1df;\n  background: var(--teal);\n  font-weight: 900;\n}\n.curator-test p,\n.source-intro p {\n  color: #4f574f;\n  font-size: 0.69rem;\n  line-height: 1.45;\n}\n.object-editors {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0.75rem;\n  align-items: start;\n}\n.object-editors article {\n  display: grid;\n  gap: 0.7rem;\n  border: 1px solid #a99370;\n  padding: 0.75rem;\n  background: rgba(248, 241, 226, 0.9333333333);\n  box-shadow: 0 0.35rem 0.75rem rgba(58, 40, 23, 0.1254901961);\n}\n.object-editors article > header {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  border-bottom: 1px solid #caba9e;\n  padding-bottom: 0.6rem;\n}\n.object-number {\n  display: grid;\n  flex: 0 0 auto;\n  width: 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  color: #fff3d1;\n  background: #7f5a27;\n  font: 800 0.8rem Georgia, serif;\n  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);\n}\n.object-editors article > header div {\n  display: grid;\n  min-width: 0;\n}\n.object-editors article > header small {\n  color: #8d6530;\n  font-size: 0.54rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.object-editors article > header strong {\n  overflow: hidden;\n  font: 700 0.95rem Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.claim-link {\n  border-top: 1px dashed #ae9c7e;\n  padding-top: 0.65rem;\n}\n.source-sheet {\n  align-content: start;\n}\n.source-intro {\n  align-items: flex-start;\n  background: rgba(237, 241, 233, 0.9098039216);\n}\n.source-intro strong {\n  font: 800 1rem Georgia, serif;\n}\n.source-slips {\n  display: grid;\n  gap: 0.8rem;\n}\n.source-slips label {\n  border: 1px solid #bcae94;\n  padding: 0.8rem;\n  background: rgba(255, 253, 247, 0.9098039216);\n  box-shadow: 0 0.25rem 0.55rem rgba(62, 46, 27, 0.0862745098);\n}\n.source-slips label > span {\n  justify-content: flex-start;\n  align-items: center;\n}\n.source-slips label i {\n  display: grid;\n  width: 1.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff5d9;\n  background: #805d2a;\n  font-style: normal;\n  font-size: 0.64rem;\n}\n.source-check {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  align-items: center;\n  border-top: 1px dashed #9f8d71;\n  padding-top: 0.75rem;\n  font-size: 0.66rem;\n}\n.source-check span {\n  border: 1px solid #ad9b7c;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  background: #eee4d0;\n}\n.connection-sheet,\n.video-sheet {\n  align-content: start;\n}\n.connection-model {\n  display: grid;\n  grid-template-columns: 8rem 1fr;\n  gap: 1rem;\n  align-items: center;\n  border: 1px solid #6f5b42;\n  padding: 1rem;\n  color: #f5e9d1;\n  background:\n    radial-gradient(\n      circle at 14% 42%,\n      rgba(243, 205, 111, 0.1411764706),\n      transparent 26%),\n    #262322;\n}\n.connection-model > div:last-child > span {\n  color: #d4ad5a;\n  font-size: 0.58rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.connection-model h3 {\n  margin: 0.15rem 0 0.35rem;\n  font: 800 1.25rem Georgia, serif;\n}\n.connection-model p {\n  color: #c7b9a6;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.model-door {\n  position: relative;\n  display: grid;\n  height: 6rem;\n  place-items: center;\n  border: 0.32rem ridge #b79046;\n  color: #f2cf79;\n  background:\n    linear-gradient(\n      135deg,\n      #45403a,\n      #161515);\n  box-shadow: inset 0 0 1.6rem #000;\n  perspective: 20rem;\n}\n.model-door span {\n  font: 800 1.2rem Georgia, serif;\n}\n.model-door i {\n  position: absolute;\n  right: 0.25rem;\n  bottom: 0.25rem;\n  left: 0.25rem;\n  height: 28%;\n  background:\n    linear-gradient(\n      150deg,\n      transparent 49%,\n      rgba(201, 164, 87, 0.2666666667) 50%);\n  transform: rotateX(55deg);\n}\n.connection-status,\n.guide-status {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  border: 1px solid #ac9b80;\n  padding: 0.65rem;\n  color: #655b4e;\n  background: #eee7da;\n}\n.connection-status i,\n.guide-status i {\n  width: 0.65rem;\n  height: 0.65rem;\n  border-radius: 50%;\n  background: #9e7744;\n  box-shadow: 0 0 0 0.22rem rgba(158, 119, 68, 0.1254901961);\n}\n.connection-status.connected i,\n.guide-status.complete i {\n  background: #53805d;\n  box-shadow: 0 0 0 0.22rem rgba(83, 128, 93, 0.1254901961);\n}\n.connection-status span,\n.guide-status span {\n  display: grid;\n}\n.connection-status small,\n.guide-status small {\n  color: #817567;\n  font-size: 0.59rem;\n}\n.recording-plan {\n  display: grid;\n  grid-template-columns: minmax(10rem, 0.8fr) 1fr;\n  gap: 1rem;\n  align-items: center;\n  border: 1px solid #5f5548;\n  padding: 1rem;\n  color: #f2e7d0;\n  background: #272523;\n}\n.recording-light {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  font: 800 0.86rem Georgia, serif;\n}\n.recording-light i {\n  width: 0.65rem;\n  height: 0.65rem;\n  border-radius: 50%;\n  background: #b64b3e;\n  box-shadow: 0 0 0.8rem #db594b;\n}\n.recording-plan ol {\n  display: grid;\n  gap: 0.4rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.recording-plan li {\n  display: flex;\n  gap: 0.45rem;\n  align-items: center;\n  color: #c8bba8;\n  font-size: 0.65rem;\n}\n.recording-plan li span {\n  display: grid;\n  width: 1.35rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #8a775c;\n  border-radius: 50%;\n  color: #e5c77c;\n}\n.prototype-field-note {\n  border: 1px dashed #a8844e;\n  border-left: 0.25rem solid #a8844e;\n  padding: 0.7rem 0.8rem;\n  color: #66481d;\n  background: rgba(249, 237, 205, 0.9019607843);\n  font-size: 0.68rem;\n  line-height: 1.45;\n}\n.validation-errors {\n  border: 1px solid #bc7d6c;\n  border-left: 0.3rem solid #9e4338;\n  padding: 0.8rem;\n  color: #6b3027;\n  background: #f8e2db;\n}\n.validation-errors ul {\n  margin: 0.3rem 0 0;\n  padding-left: 1.1rem;\n  font-size: 0.68rem;\n}\n.video-screen {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.6rem;\n  min-height: 10rem;\n  align-items: center;\n  padding: 1rem;\n  color: #f1dfb1;\n  background:\n    radial-gradient(\n      circle at 25% 35%,\n      rgba(197, 153, 78, 0.3137254902),\n      transparent 22%),\n    #19191b;\n  box-shadow: inset 0 0 0 1px #9f814d;\n}\n.video-screen span {\n  font: 800 0.85rem Georgia, serif;\n}\n.video-screen i {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #241b0f;\n  background: #e3c36f;\n  font-style: normal;\n}\n.review-experience {\n  min-width: 0;\n  border: 1px solid #7b684d;\n  border-radius: 0.55rem;\n  padding: 0.8rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.0274509804) 1px,\n      transparent 1px) 0 0/4rem 100%,\n    #262322;\n  box-shadow: 0 0.8rem 2rem rgba(44, 29, 16, 0.3137254902);\n}\n.review-stage-heading {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  align-items: baseline;\n  padding: 0.25rem 0.2rem 0.8rem;\n  color: #f6ead4;\n}\n.review-stage-heading strong {\n  font: 800 1.3rem Georgia, serif;\n}\n.review-stage-heading small {\n  margin-left: auto;\n  color: #bfb1a0;\n  font-size: 0.62rem;\n}\n.full-preview {\n  border: 0.5rem ridge #b88f47;\n  background: #f4eedf;\n}\n.review-inspector {\n  position: sticky;\n  top: 7.5rem;\n  display: grid;\n  gap: 0.75rem;\n  border: 1px solid #8c7657;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  background: #f6efdf;\n  box-shadow: 0 0.7rem 1.7rem rgba(53, 36, 17, 0.1725490196);\n}\n.review-inspector h2 {\n  font: 800 1.45rem Georgia, serif;\n}\n.review-inspector h2:focus {\n  outline: none;\n}\n.review-inspector > p {\n  color: #6f6456;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.review-inspector > ol {\n  display: grid;\n  gap: 0.45rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.review-inspector > ol li {\n  display: grid;\n  grid-template-columns: 1.8rem 1fr auto;\n  gap: 0.5rem;\n  align-items: center;\n  border: 1px solid #c0b096;\n  padding: 0.55rem;\n  background: #fffaf0;\n}\n.review-inspector > ol li > span {\n  display: grid;\n  width: 1.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #957042;\n  font-size: 0.62rem;\n  font-weight: 900;\n}\n.review-inspector > ol li.complete > span {\n  background: #53805d;\n}\n.review-inspector > ol div {\n  display: grid;\n}\n.review-inspector > ol small {\n  color: #776b5d;\n  font-size: 0.53rem;\n}\n.review-inspector > ol button {\n  border: 1px solid #9b896d;\n  border-radius: 999px;\n  padding: 0.3rem 0.48rem;\n  color: #54442f;\n  background: #eee4d2;\n  font-size: 0.55rem;\n  font-weight: 900;\n}\n.back-review {\n  min-height: 2.7rem;\n  border: 1px solid #796548;\n  color: #f6ead3;\n  background: #292622;\n  font-weight: 900;\n}\n.warnings {\n  margin-top: 0.6rem;\n  border: 1px solid #9b7f53;\n  padding: 0.55rem;\n  color: #dac8a9;\n  background: #1d1a18;\n  font-size: 0.65rem;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #53b9c3;\n  outline-offset: 2px;\n}\n@media (max-width: 1180px) {\n  .composer-header {\n    grid-template-columns: 1fr auto;\n  }\n  .composer-layout {\n    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.62fr);\n  }\n  .composer-layout.reviewing {\n    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.45fr);\n  }\n  .studio-map {\n    position: static;\n    grid-column: 1/-1;\n  }\n  .studio-map header,\n  .studio-map footer,\n  .step-name small {\n    display: none;\n  }\n  .studio-map ol {\n    grid-template-columns: repeat(6, 1fr);\n    padding: 0.4rem;\n  }\n  .studio-map li:not(:last-child)::after {\n    top: 50%;\n    right: -0.5rem;\n    bottom: auto;\n    left: auto;\n    width: 1rem;\n    height: 1px;\n  }\n  .studio-map li button {\n    grid-template-columns: auto 1fr;\n  }\n  .step-state {\n    display: none;\n  }\n}\n@media (max-width: 760px) {\n  .composer-header {\n    position: static;\n    grid-template-columns: 1fr auto;\n    min-height: auto;\n  }\n  .studio-title p {\n    display: none;\n  }\n  .composer-layout {\n    grid-template-columns: 1fr;\n    width: calc(100% - 0.8rem);\n  }\n  .composer-layout.reviewing {\n    grid-template-columns: 1fr;\n  }\n  .studio-map {\n    grid-column: auto;\n    overflow-x: auto;\n  }\n  .studio-map ol {\n    grid-auto-columns: minmax(7.5rem, 1fr);\n    grid-auto-flow: column;\n    grid-template-columns: none;\n  }\n  .studio-map li button {\n    grid-template-columns: 2rem 1fr;\n  }\n  .review-inspector {\n    position: static;\n  }\n  .review-header {\n    grid-template-columns: 1fr auto;\n  }\n  .review-header .review-title {\n    display: none;\n  }\n  .header-showcase {\n    font-size: 0.65rem;\n  }\n  .workbench {\n    grid-row: 3;\n  }\n  .work-surface {\n    min-height: auto;\n    padding: 0.5rem;\n  }\n  .step-sheet {\n    min-height: auto;\n    padding: 0.8rem;\n  }\n  .object-editors {\n    grid-template-columns: 1fr;\n  }\n  .connection-model,\n  .recording-plan {\n    grid-template-columns: 1fr;\n  }\n  .model-door {\n    width: 9rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n  }\n}\n:host {\n  overflow: hidden;\n}\n.composer {\n  height: 100dvh;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n}\n.composer-header {\n  flex: 0 0 auto;\n  min-height: 0;\n  padding: 12px 20px;\n  position: static;\n}\n.studio-title h1 {\n  font-size: clamp(23px, 2vw, 32px);\n}\n.composer-layout {\n  flex: 1;\n  min-height: 0;\n  margin: 12px auto;\n  align-items: stretch;\n  grid-template-columns: 210px minmax(0, 1fr) minmax(230px, 320px);\n}\n.workbench {\n  min-height: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr) auto;\n}\n.workbench-heading {\n  padding: 12px 20px;\n}\n.work-surface {\n  min-height: 0;\n  overflow: auto;\n  padding: 12px;\n  scrollbar-gutter: stable;\n}\n.step-sheet {\n  min-height: 0;\n  padding: 16px;\n  gap: 12px;\n}\n.studio-map,\n.studio-sidecar {\n  min-height: 0;\n  overflow: auto;\n}\n.composer-layout.reviewing {\n  overflow: auto;\n}\n@media (max-width: 1100px) {\n  .composer-layout {\n    grid-template-columns: 180px minmax(0, 1fr);\n  }\n}\n@media (max-width: 700px) {\n  .composer-header {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 8px;\n  }\n  .composer-layout {\n    display: flex;\n    flex-direction: column;\n    width: calc(100% - 16px);\n    gap: 8px;\n    margin: 8px;\n  }\n  .studio-map {\n    flex: 0 0 auto;\n    max-height: 66px;\n  }\n  .studio-map header,\n  .studio-map footer,\n  .step-name small,\n  .step-state {\n    display: none;\n  }\n  .studio-map ol {\n    display: flex;\n    margin: 0;\n    padding: 0;\n  }\n  .studio-map li button {\n    padding: 8px;\n    min-width: 90px;\n    gap: 4px;\n  }\n  .workbench {\n    flex: 1;\n  }\n}\ndialog.composer {\n  width: 100%;\n  max-width: none;\n  max-height: none;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  inset: 0;\n  color: var(--ink);\n  background: #e8dfce;\n}\ndialog.composer:not([open]) {\n  display: none;\n}\n.composer-header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 12px;\n  min-height: 0;\n  padding: 10px 22px;\n}\n.studio-title {\n  margin-right: auto;\n}\n.studio-title h1 {\n  font: 700 16px Arial;\n}\n.studio-title > span,\n.studio-title > p,\n.studio-progress {\n  display: none;\n}\n.composer-header .studio-map {\n  width: auto;\n  border: 0;\n  padding: 0;\n  background: none;\n  box-shadow: none;\n}\n.studio-map ol {\n  display: flex;\n  gap: 4px;\n  margin: 0;\n  padding: 0;\n}\n.studio-map li {\n  margin: 0;\n}\n.studio-map button {\n  min-height: 44px;\n  padding: 8px 10px;\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.studio-map .step-number,\n.studio-map .step-state {\n  display: none;\n}\n.header-next {\n  min-height: 44px;\n  border: 0;\n  border-radius: 8px;\n  padding: 10px 18px;\n  background: #d3b571;\n  color: #242d26;\n  font: 700 14px Arial;\n}\n.composer-layout {\n  display: block;\n  max-width: 1200px;\n  margin: auto;\n  padding: 24px;\n}\n.composer-layout .workbench {\n  width: 100%;\n  max-height: none;\n}\n.workbench-heading {\n  text-align: center;\n  padding: 0 0 20px;\n}\n.workbench-heading > span {\n  display: none;\n}\n.workbench-heading h2 {\n  font-size: 30px;\n}\n.work-surface {\n  max-height: none;\n  overflow: visible;\n}\n.objects-to-ideas {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  gap: 30px;\n  align-items: center;\n}\n.object-tabs {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-bottom: 14px;\n}\n.object-tabs button {\n  min-height: 44px;\n  padding: 10px;\n  border: 1px solid #a1967c;\n  border-radius: 8px;\n  background: #fff9e9;\n}\n.object-tabs button[aria-pressed=true] {\n  background: #285d59;\n  color: #fff9e9;\n}\n.object-study img {\n  width: 100%;\n  height: 260px;\n  object-fit: contain;\n}\n.first-claim textarea {\n  min-height: 180px;\n  font: 20px/1.5 Georgia;\n}\n.first-claim input {\n  font-size: 20px;\n}\n.first-claim .plaque-field {\n  margin-top: 22px;\n}\n.story-sheet {\n  background: none;\n  padding: 0;\n}\n.composer-layout.reviewing {\n  display: grid;\n}\n@media (max-width: 750px) {\n  .composer-header {\n    padding: 8px 12px;\n  }\n  .studio-map {\n    order: 5;\n    flex: 1 0 100%;\n  }\n  .studio-map ol {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n  .composer-layout {\n    padding: 18px 12px;\n  }\n  .objects-to-ideas {\n    grid-template-columns: 1fr;\n    gap: 18px;\n  }\n  .workbench-heading h2 {\n    font-size: 25px;\n  }\n}\n:host {\n  position: static;\n  inset: auto;\n  overflow: visible;\n  background: #e8dfce;\n  min-height: calc(100dvh - 52px);\n}\n.composer {\n  height: auto;\n  min-height: calc(100dvh - 52px);\n  color: var(--ink);\n  background: #e8dfce;\n}\n.composer-layout {\n  width: 100%;\n  box-sizing: border-box;\n}\n.object-study {\n  --model-height: 320px;\n}\n.work-surface {\n  overflow: visible;\n}\n.composer-layout .workbench {\n  display: block;\n}\n.studio-map {\n  overflow: visible;\n  max-height: none;\n}\n/*# sourceMappingURL=artifact-composer.component.css.map */\n'] }]
  }], () => [], { dialog: [{ type: ViewChild, args: ["composerDialog", { isSignal: true }] }], draft: [{ type: Input, args: [{ isSignal: true, alias: "draft", required: true }] }], starterExample: [{ type: Input, args: [{ isSignal: true, alias: "starterExample", required: false }] }], previewSnapshot: [{ type: Input, args: [{ isSignal: true, alias: "previewSnapshot", required: true }] }], validation: [{ type: Input, args: [{ isSignal: true, alias: "validation", required: true }] }], publishLabel: [{ type: Input, args: [{ isSignal: true, alias: "publishLabel", required: false }] }], published: [{ type: Input, args: [{ isSignal: true, alias: "published", required: false }] }], rehangsRemaining: [{ type: Input, args: [{ isSignal: true, alias: "rehangsRemaining", required: false }] }], submissionLocked: [{ type: Input, args: [{ isSignal: true, alias: "submissionLocked", required: false }] }], closed: [{ type: Output, args: ["closed"] }], titleChanged: [{ type: Output, args: ["titleChanged"] }], claimChanged: [{ type: Output, args: ["claimChanged"] }], objectChanged: [{ type: Output, args: ["objectChanged"] }], sourceChanged: [{ type: Output, args: ["sourceChanged"] }], galleryTitleChanged: [{ type: Output, args: ["galleryTitleChanged"] }], galleryEmbedChanged: [{ type: Output, args: ["galleryEmbedChanged"] }], videoTitleChanged: [{ type: Output, args: ["videoTitleChanged"] }], videoUrlChanged: [{ type: Output, args: ["videoUrlChanged"] }], publishedRequested: [{ type: Output, args: ["publishedRequested"] }], stepHeading: [{ type: ViewChild, args: ["stepHeading", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtifactComposerComponent, { className: "ArtifactComposerComponent", filePath: "src/app/templates/exhibit-hall/ui/artifact-composer.component.ts", lineNumber: 100 });
})();

// src/app/templates/exhibit-hall/ui/defense-panel.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function DefensePanelComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3)(1, "span", 4);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Defense submitted");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "Your individual evidence is recorded.");
    \u0275\u0275domElementEnd()()();
  }
}
function DefensePanelComponent_Conditional_12_For_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const prompt_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prompt_r4.guidance);
  }
}
function DefensePanelComponent_Conditional_12_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label", 8)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, DefensePanelComponent_Conditional_12_For_11_Conditional_5_Template, 2, 1, "small");
    \u0275\u0275domElementStart(6, "textarea", 12);
    \u0275\u0275domListener("input", function DefensePanelComponent_Conditional_12_For_11_Template_textarea_input_6_listener($event) {
      const prompt_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.update(prompt_r4.id, $event));
    })("blur", function DefensePanelComponent_Conditional_12_For_11_Template_textarea_blur_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const prompt_r4 = ctx.$implicit;
    const \u0275$index_51_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("htmlFor", "defense-" + prompt_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_51_r5 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(prompt_r4.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(prompt_r4.guidance ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275domProperty("id", "defense-" + prompt_r4.id)("value", ctx_r1.answers()[prompt_r4.id]);
  }
}
function DefensePanelComponent_Conditional_12_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9)(1, "strong");
    \u0275\u0275text(2, "No visitor card?");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.fallbackChallenge());
  }
}
function DefensePanelComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "fieldset")(1, "legend");
    \u0275\u0275text(2, "Completion mode");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "label")(4, "input", 5);
    \u0275\u0275domListener("change", function DefensePanelComponent_Conditional_12_Template_input_change_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mode.set("live"));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275text(5, " Live opening");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "label")(7, "input", 6);
    \u0275\u0275domListener("change", function DefensePanelComponent_Conditional_12_Template_input_change_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mode.set("makeup"));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275text(8, " Makeup");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 7);
    \u0275\u0275repeaterCreate(10, DefensePanelComponent_Conditional_12_For_11_Template, 7, 6, "label", 8, _forTrack03);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(12, DefensePanelComponent_Conditional_12_Conditional_12_Template, 4, 1, "p", 9);
    \u0275\u0275domElementStart(13, "footer")(14, "small");
    \u0275\u0275text(15, "Draft answers save on this device.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "button", 10);
    \u0275\u0275domListener("click", function DefensePanelComponent_Conditional_12_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(17, "Save draft");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "button", 11);
    \u0275\u0275domListener("click", function DefensePanelComponent_Conditional_12_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(19, "Submit defense");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("checked", ctx_r1.mode() === "live");
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("checked", ctx_r1.mode() === "makeup");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.prompts());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.fallbackChallenge() ? 12 : -1);
  }
}
var DefensePanelComponent = class _DefensePanelComponent {
  prompts = input.required(
    ...ngDevMode ? [{ debugName: "prompts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fallbackChallenge = input(
    void 0,
    ...ngDevMode ? [{ debugName: "fallbackChallenge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initialAnswers = input(
    {},
    ...ngDevMode ? [{ debugName: "initialAnswers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  alreadySubmitted = input(
    false,
    ...ngDevMode ? [{ debugName: "alreadySubmitted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closed = output();
  draftSaved = output();
  submitted = output();
  answers = signal(
    {},
    ...ngDevMode ? [{ debugName: "answers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = signal(
    "live",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => this.answers.set(__spreadValues({}, this.initialAnswers())));
  }
  update(promptId, event) {
    const value = event.target.value;
    this.answers.update((answers) => __spreadProps(__spreadValues({}, answers), { [promptId]: value }));
  }
  save() {
    this.draftSaved.emit({ answers: this.answers(), mode: this.mode() });
  }
  submit() {
    this.submitted.emit({ answers: this.answers(), mode: this.mode() });
  }
  static \u0275fac = function DefensePanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefensePanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DefensePanelComponent, selectors: [["app-defense-panel"]], inputs: { prompts: [1, "prompts"], fallbackChallenge: [1, "fallbackChallenge"], initialAnswers: [1, "initialAnswers"], alreadySubmitted: [1, "alreadySubmitted"] }, outputs: { closed: "closed", draftSaved: "draftSaved", submitted: "submitted" }, decls: 13, vars: 1, consts: [["role", "dialog", "aria-modal", "true", "aria-labelledby", "defense-title", 1, "defense-panel"], ["id", "defense-title"], ["type", "button", "aria-label", "Close defense form", 1, "close", 3, "click"], [1, "submitted-message"], ["aria-hidden", "true"], ["type", "radio", "name", "mode", "value", "live", 3, "change", "checked"], ["type", "radio", "name", "mode", "value", "makeup", 3, "change", "checked"], [1, "prompt-list"], [3, "for"], [1, "fallback"], ["type", "button", 1, "secondary", 3, "click"], ["type", "button", 3, "click"], ["rows", "3", 3, "input", "blur", "id", "value"]], template: function DefensePanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header")(2, "div")(3, "span");
      \u0275\u0275text(4, "Individual evidence");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h2", 1);
      \u0275\u0275text(6, "Defend your understanding");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p");
      \u0275\u0275text(8, "Your answers belong to you, not the team submission.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "button", 2);
      \u0275\u0275domListener("click", function DefensePanelComponent_Template_button_click_9_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275text(10, " \xD7 ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(11, DefensePanelComponent_Conditional_11_Template, 8, 0, "div", 3)(12, DefensePanelComponent_Conditional_12_Template, 20, 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.alreadySubmitted() ? 11 : 12);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  position: fixed;\n  z-index: 80;\n  inset: 0;\n  display: grid;\n  overflow-y: auto;\n  place-items: start center;\n  padding: 1.2rem;\n  background: rgba(13, 11, 10, 0.8509803922);\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.defense-panel[_ngcontent-%COMP%] {\n  width: min(47rem, 100%);\n  margin-block: auto;\n  border: 0.35rem double #a88349;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #2b251f;\n  background: #fbf4e4;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.6666666667);\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #cbb996;\n  padding-bottom: 0.85rem;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #8c642d;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.18rem 0;\n  font: 800 1.65rem Georgia, serif;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6d6050;\n  font-size: 0.78rem;\n}\n.close[_ngcontent-%COMP%] {\n  width: 2.4rem;\n  height: 2.4rem;\n  border: 0;\n  border-radius: 50%;\n  color: #fff;\n  background: #41372d;\n  font-size: 1.35rem;\n}\nfieldset[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin: 0.8rem 0;\n  border: 1px solid #d0bea0;\n  padding: 0.6rem 0.75rem;\n}\nlegend[_ngcontent-%COMP%] {\n  padding-inline: 0.3rem;\n  color: #72532a;\n  font-size: 0.68rem;\n  font-weight: 850;\n}\nfieldset[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 750;\n}\n.prompt-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n.prompt-list[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.7rem 1fr;\n  gap: 0.15rem 0.55rem;\n}\n.prompt-list[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-row: 1/span 2;\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #8f672f;\n  font: 800 0.68rem Georgia, serif;\n}\n.prompt-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 0.88rem/1.35 Georgia, serif;\n}\n.prompt-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #786b5c;\n  font-size: 0.63rem;\n}\ntextarea[_ngcontent-%COMP%] {\n  grid-column: 2;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #b9a98c;\n  border-radius: 0.3rem;\n  padding: 0.55rem;\n  background: #fffdfa;\n  font: 0.8rem/1.45 inherit;\n}\n.fallback[_ngcontent-%COMP%] {\n  margin: 0.85rem 0 0 2.25rem;\n  border-left: 0.25rem solid #b58237;\n  padding: 0.65rem;\n  color: #5f503c;\n  background: #f1e5ca;\n  font-size: 0.73rem;\n  line-height: 1.45;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.55rem;\n  margin-top: 1rem;\n  border-top: 1px solid #d1c3a9;\n  padding-top: 0.8rem;\n}\nfooter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-right: auto;\n  color: #796c5d;\n}\nfooter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.6rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.8rem;\n  color: #fff;\n  background: #2b6670;\n  font-weight: 850;\n}\nfooter[_ngcontent-%COMP%]   button.secondary[_ngcontent-%COMP%] {\n  color: #473a2b;\n  border: 1px solid #ae9a79;\n  background: #eee2ca;\n}\n.submitted-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-top: 1rem;\n  border: 1px solid #82a27e;\n  padding: 1rem;\n  background: #e3efdd;\n}\n.submitted-message[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #4e7d4d;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #49a6b1;\n  outline-offset: 2px;\n}\n@media (max-width: 580px) {\n  [_nghost-%COMP%] {\n    padding: 0.4rem;\n  }\n  .defense-panel[_ngcontent-%COMP%] {\n    border-width: 0.2rem;\n  }\n  footer[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n}\n/*# sourceMappingURL=defense-panel.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefensePanelComponent, [{
    type: Component,
    args: [{ selector: "app-defense-panel", template: `<section class="defense-panel" role="dialog" aria-modal="true" aria-labelledby="defense-title">
  <header>
    <div>
      <span>Individual evidence</span>
      <h2 id="defense-title">Defend your understanding</h2>
      <p>Your answers belong to you, not the team submission.</p>
    </div>
    <button type="button" class="close" (click)="closed.emit()" aria-label="Close defense form">
      \xD7
    </button>
  </header>

  @if (alreadySubmitted()) {
    <div class="submitted-message">
      <span aria-hidden="true">\u2713</span>
      <div>
        <strong>Defense submitted</strong>
        <p>Your individual evidence is recorded.</p>
      </div>
    </div>
  } @else {
    <fieldset>
      <legend>Completion mode</legend>
      <label
        ><input
          type="radio"
          name="mode"
          value="live"
          [checked]="mode() === 'live'"
          (change)="mode.set('live')"
        />
        Live opening</label
      >
      <label
        ><input
          type="radio"
          name="mode"
          value="makeup"
          [checked]="mode() === 'makeup'"
          (change)="mode.set('makeup')"
        />
        Makeup</label
      >
    </fieldset>

    <div class="prompt-list">
      @for (prompt of prompts(); track prompt.id; let number = $index) {
        <label [for]="'defense-' + prompt.id">
          <span>{{ number + 1 }}</span>
          <strong>{{ prompt.label }}</strong>
          @if (prompt.guidance) {
            <small>{{ prompt.guidance }}</small>
          }
          <textarea
            [id]="'defense-' + prompt.id"
            rows="3"
            [value]="answers()[prompt.id]"
            (input)="update(prompt.id, $event)"
            (blur)="save()"
          ></textarea>
        </label>
      }
    </div>

    @if (fallbackChallenge()) {
      <p class="fallback"><strong>No visitor card?</strong> {{ fallbackChallenge() }}</p>
    }

    <footer>
      <small>Draft answers save on this device.</small>
      <button type="button" class="secondary" (click)="save()">Save draft</button>
      <button type="button" (click)="submit()">Submit defense</button>
    </footer>
  }
</section>
`, styles: ["/* src/app/templates/exhibit-hall/ui/defense-panel.component.scss */\n:host {\n  position: fixed;\n  z-index: 80;\n  inset: 0;\n  display: grid;\n  overflow-y: auto;\n  place-items: start center;\n  padding: 1.2rem;\n  background: rgba(13, 11, 10, 0.8509803922);\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.defense-panel {\n  width: min(47rem, 100%);\n  margin-block: auto;\n  border: 0.35rem double #a88349;\n  border-radius: 0.55rem;\n  padding: 1rem;\n  color: #2b251f;\n  background: #fbf4e4;\n  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.6666666667);\n}\nheader {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #cbb996;\n  padding-bottom: 0.85rem;\n}\nheader span {\n  color: #8c642d;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\nh2,\np {\n  margin: 0;\n}\nh2 {\n  margin: 0.18rem 0;\n  font: 800 1.65rem Georgia, serif;\n}\nheader p {\n  color: #6d6050;\n  font-size: 0.78rem;\n}\n.close {\n  width: 2.4rem;\n  height: 2.4rem;\n  border: 0;\n  border-radius: 50%;\n  color: #fff;\n  background: #41372d;\n  font-size: 1.35rem;\n}\nfieldset {\n  display: flex;\n  gap: 1rem;\n  margin: 0.8rem 0;\n  border: 1px solid #d0bea0;\n  padding: 0.6rem 0.75rem;\n}\nlegend {\n  padding-inline: 0.3rem;\n  color: #72532a;\n  font-size: 0.68rem;\n  font-weight: 850;\n}\nfieldset label {\n  font-size: 0.75rem;\n  font-weight: 750;\n}\n.prompt-list {\n  display: grid;\n  gap: 0.75rem;\n}\n.prompt-list label {\n  display: grid;\n  grid-template-columns: 1.7rem 1fr;\n  gap: 0.15rem 0.55rem;\n}\n.prompt-list label > span {\n  grid-row: 1/span 2;\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #8f672f;\n  font: 800 0.68rem Georgia, serif;\n}\n.prompt-list strong {\n  font: 700 0.88rem/1.35 Georgia, serif;\n}\n.prompt-list small {\n  color: #786b5c;\n  font-size: 0.63rem;\n}\ntextarea {\n  grid-column: 2;\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #b9a98c;\n  border-radius: 0.3rem;\n  padding: 0.55rem;\n  background: #fffdfa;\n  font: 0.8rem/1.45 inherit;\n}\n.fallback {\n  margin: 0.85rem 0 0 2.25rem;\n  border-left: 0.25rem solid #b58237;\n  padding: 0.65rem;\n  color: #5f503c;\n  background: #f1e5ca;\n  font-size: 0.73rem;\n  line-height: 1.45;\n}\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.55rem;\n  margin-top: 1rem;\n  border-top: 1px solid #d1c3a9;\n  padding-top: 0.8rem;\n}\nfooter small {\n  margin-right: auto;\n  color: #796c5d;\n}\nfooter button {\n  min-height: 2.6rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.5rem 0.8rem;\n  color: #fff;\n  background: #2b6670;\n  font-weight: 850;\n}\nfooter button.secondary {\n  color: #473a2b;\n  border: 1px solid #ae9a79;\n  background: #eee2ca;\n}\n.submitted-message {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  margin-top: 1rem;\n  border: 1px solid #82a27e;\n  padding: 1rem;\n  background: #e3efdd;\n}\n.submitted-message > span {\n  display: grid;\n  width: 2.2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #4e7d4d;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #49a6b1;\n  outline-offset: 2px;\n}\n@media (max-width: 580px) {\n  :host {\n    padding: 0.4rem;\n  }\n  .defense-panel {\n    border-width: 0.2rem;\n  }\n  footer {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  footer small {\n    margin: 0;\n  }\n}\n/*# sourceMappingURL=defense-panel.component.css.map */\n"] }]
  }], () => [], { prompts: [{ type: Input, args: [{ isSignal: true, alias: "prompts", required: true }] }], fallbackChallenge: [{ type: Input, args: [{ isSignal: true, alias: "fallbackChallenge", required: false }] }], initialAnswers: [{ type: Input, args: [{ isSignal: true, alias: "initialAnswers", required: false }] }], alreadySubmitted: [{ type: Input, args: [{ isSignal: true, alias: "alreadySubmitted", required: false }] }], closed: [{ type: Output, args: ["closed"] }], draftSaved: [{ type: Output, args: ["draftSaved"] }], submitted: [{ type: Output, args: ["submitted"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DefensePanelComponent, { className: "DefensePanelComponent", filePath: "src/app/templates/exhibit-hall/ui/defense-panel.component.ts", lineNumber: 10 });
})();

// src/app/templates/exhibit-hall/ui/peer-response-rail.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function PeerResponseRailComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "form", 7);
    \u0275\u0275domListener("submit", function PeerResponseRailComponent_Conditional_13_Template_form_submit_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.posted.emit(ctx_r1.draft()));
    });
    \u0275\u0275domElementStart(1, "label", 8);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "textarea", 9);
    \u0275\u0275domListener("input", function PeerResponseRailComponent_Conditional_13_Template_textarea_input_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.draftChanged.emit(ctx_r1.readValue($event)));
    })("blur", function PeerResponseRailComponent_Conditional_13_Template_textarea_blur_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.draftBlurred.emit());
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div")(5, "small", 10);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 11);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.prompt());
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r1.draft());
    \u0275\u0275attribute("aria-describedby", "peer-response-count");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("over", ctx_r1.words(ctx_r1.draft()) > ctx_r1.maxWords());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.words(ctx_r1.draft()), " / ", ctx_r1.maxWords(), " words \xB7 Draft saves privately ");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r1.draft().trim() || ctx_r1.words(ctx_r1.draft()) > ctx_r1.maxWords());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Post ", ctx_r1.responseName(), " ");
  }
}
function PeerResponseRailComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1, " Responses are unavailable here. They may be closed, or this may be your team\u2019s exhibit. ");
    \u0275\u0275domElementEnd();
  }
}
function PeerResponseRailComponent_For_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "em");
    \u0275\u0275text(1, "Hidden by teacher");
    \u0275\u0275domElementEnd();
  }
}
function PeerResponseRailComponent_For_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const response_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", response_r3.body, " ");
  }
}
function PeerResponseRailComponent_For_17_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 14);
    \u0275\u0275domListener("click", function PeerResponseRailComponent_For_17_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const response_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.moderated.emit({ responseId: response_r3.id, action: response_r3.status === "hidden" ? "restore" : "hide" }));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const response_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", response_r3.status === "hidden" ? "Restore" : "Hide", " ");
  }
}
function PeerResponseRailComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "span", 12);
    \u0275\u0275text(2, "?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275conditionalCreate(4, PeerResponseRailComponent_For_17_Conditional_4_Template, 2, 0, "em")(5, PeerResponseRailComponent_For_17_Conditional_5_Template, 1, 1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "footer")(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(11, PeerResponseRailComponent_For_17_Conditional_11_Template, 2, 1, "button", 13);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const response_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("hidden", response_r3.status === "hidden");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(response_r3.status === "hidden" ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(response_r3.authorDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Snapshot ", response_r3.snapshotId.split("-").at(-1));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.teacherMode() ? 11 : -1);
  }
}
function PeerResponseRailComponent_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "span", 12);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "No posted cards yet. Be the first visitor to ask a focused question.");
    \u0275\u0275domElementEnd()();
  }
}
var PeerResponseRailComponent = class _PeerResponseRailComponent {
  prompt = input.required(
    ...ngDevMode ? [{ debugName: "prompt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responseName = input(
    "response",
    ...ngDevMode ? [{ debugName: "responseName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  maxWords = input(
    40,
    ...ngDevMode ? [{ debugName: "maxWords" }] : (
      /* istanbul ignore next */
      []
    )
  );
  responses = input.required(
    ...ngDevMode ? [{ debugName: "responses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = input(
    "",
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canRespond = input(
    false,
    ...ngDevMode ? [{ debugName: "canRespond" }] : (
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
  draftChanged = output();
  draftBlurred = output();
  posted = output();
  moderated = output();
  words(value) {
    return wordCount(value);
  }
  readValue(event) {
    return event.target.value;
  }
  static \u0275fac = function PeerResponseRailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PeerResponseRailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PeerResponseRailComponent, selectors: [["app-peer-response-rail"]], inputs: { prompt: [1, "prompt"], responseName: [1, "responseName"], maxWords: [1, "maxWords"], responses: [1, "responses"], draft: [1, "draft"], canRespond: [1, "canRespond"], teacherMode: [1, "teacherMode"] }, outputs: { draftChanged: "draftChanged", draftBlurred: "draftBlurred", posted: "posted", moderated: "moderated" }, decls: 19, vars: 3, consts: [["aria-labelledby", "response-title", 1, "response-rail"], ["aria-hidden", "true", 1, "card-stack"], ["id", "response-title"], [1, "response-closed"], ["aria-label", "Posted question cards", 1, "posted-cards"], [3, "hidden"], [1, "no-cards"], [3, "submit"], ["for", "peer-response"], ["id", "peer-response", "rows", "4", "placeholder", "Ask a specific question about the claim or evidence\u2026", 3, "input", "blur", "value"], ["id", "peer-response-count"], ["type", "submit", 3, "disabled"], ["aria-hidden", "true"], ["type", "button"], ["type", "button", 3, "click"]], template: function PeerResponseRailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "header")(2, "div", 1);
      \u0275\u0275domElement(3, "i")(4, "i")(5, "i");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "div")(7, "span");
      \u0275\u0275text(8, "Visitor response rail");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "h2", 2);
      \u0275\u0275text(10, "Question cards");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(13, PeerResponseRailComponent_Conditional_13_Template, 9, 9, "form")(14, PeerResponseRailComponent_Conditional_14_Template, 2, 0, "p", 3);
      \u0275\u0275domElementStart(15, "div", 4);
      \u0275\u0275repeaterCreate(16, PeerResponseRailComponent_For_17_Template, 12, 6, "article", 5, _forTrack04, false, PeerResponseRailComponent_ForEmpty_18_Template, 5, 0, "div", 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.responses().length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canRespond() ? 13 : 14);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.responses());
    }
  }, styles: ["\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.response-rail[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 0.85rem;\n  height: 100%;\n  border-left: 1px solid #c3b394;\n  padding: 1rem;\n  color: #29231d;\n  background: repeating-linear-gradient(rgba(0, 0, 0, 0) 0 1.72rem, rgba(115, 137, 160, 0.0862745098) 1.75rem), #f7f0dd;\n}\nheader[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.65rem;\n  border-bottom: 1px solid #c7b799;\n  padding-bottom: 0.75rem;\n}\n.card-stack[_ngcontent-%COMP%] {\n  position: relative;\n  width: 2.7rem;\n  height: 2.2rem;\n}\n.card-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0.3rem;\n  border: 1px solid #ba9f65;\n  background: #fff9dd;\n  box-shadow: 0 0.1rem 0.3rem rgba(59, 45, 25, 0.2);\n}\n.card-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:first-child {\n  transform: rotate(-8deg);\n}\n.card-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(2) {\n  transform: rotate(6deg);\n}\n.card-stack[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  transform: none;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #8b6630;\n  font-size: 0.57rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font: 800 1.1rem Georgia, serif;\n}\nheader[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #6e4b22;\n  font-size: 0.72rem;\n}\nform[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #c5ac75;\n  padding: 0.75rem;\n  background: #fff8dc;\n  box-shadow: 0 0.25rem 0.65rem rgba(60, 43, 21, 0.1490196078);\n}\nlabel[_ngcontent-%COMP%] {\n  font: 700 0.8rem/1.45 Georgia, serif;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #af9d7e;\n  border-radius: 0.25rem;\n  padding: 0.55rem;\n  color: #2c2925;\n  background: #fffdf5;\n  font: 0.78rem/1.45 inherit;\n}\nform[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\nform[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #786b59;\n  font-size: 0.58rem;\n}\nform[_ngcontent-%COMP%]   small.over[_ngcontent-%COMP%] {\n  color: #a2392c;\n  font-weight: 800;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 2.3rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.42rem 0.65rem;\n  color: #fff;\n  background: #2d6168;\n  font-size: 0.65rem;\n  font-weight: 850;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\n.response-closed[_ngcontent-%COMP%] {\n  border: 1px dashed #bca98c;\n  padding: 0.7rem;\n  color: #6f6252;\n  background: rgba(242, 234, 216, 0.8);\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.posted-cards[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  overflow-y: auto;\n  padding: 0.15rem 0.2rem 0.7rem 0;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.55rem;\n  border: 1px solid #c6ad72;\n  padding: 0.7rem;\n  background: #fff5c9;\n  box-shadow: 0.12rem 0.2rem 0.45rem rgba(59, 43, 22, 0.2);\n  transform: rotate(-0.4deg);\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-child(even) {\n  background: #f1e8ca;\n  transform: rotate(0.5deg);\n}\n.posted-cards[_ngcontent-%COMP%]   article.hidden[_ngcontent-%COMP%] {\n  opacity: 0.62;\n  background: #ddd8cc;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #936b2f;\n  font: 800 0.8rem Georgia, serif;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font: 0.76rem/1.48 Georgia, serif;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  grid-column: 2;\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: #75654c;\n  font-size: 0.57rem;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.posted-cards[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 1.75rem;\n  padding: 0.2rem 0.45rem;\n  color: #5e3027;\n  background: #efc7b9;\n}\n.no-cards[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 8rem;\n  place-items: center;\n  align-content: center;\n  border: 1px dashed #c2b394;\n  padding: 1rem;\n  color: #756956;\n  text-align: center;\n}\n.no-cards[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a17b3e;\n  font-size: 1.3rem;\n}\n.no-cards[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 15rem;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\ntextarea[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #49a8b4;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=peer-response-rail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PeerResponseRailComponent, [{
    type: Component,
    args: [{ selector: "app-peer-response-rail", template: `<section class="response-rail" aria-labelledby="response-title">
  <header>
    <div class="card-stack" aria-hidden="true"><i></i><i></i><i></i></div>
    <div>
      <span>Visitor response rail</span>
      <h2 id="response-title">Question cards</h2>
    </div>
    <strong>{{ responses().length }}</strong>
  </header>

  @if (canRespond()) {
    <form (submit)="$event.preventDefault(); posted.emit(draft())">
      <label for="peer-response">{{ prompt() }}</label>
      <textarea
        id="peer-response"
        rows="4"
        [value]="draft()"
        [attr.aria-describedby]="'peer-response-count'"
        (input)="draftChanged.emit(readValue($event))"
        (blur)="draftBlurred.emit()"
        placeholder="Ask a specific question about the claim or evidence\u2026"
      ></textarea>
      <div>
        <small id="peer-response-count" [class.over]="words(draft()) > maxWords()">
          {{ words(draft()) }} / {{ maxWords() }} words \xB7 Draft saves privately
        </small>
        <button type="submit" [disabled]="!draft().trim() || words(draft()) > maxWords()">
          Post {{ responseName() }}
        </button>
      </div>
    </form>
  } @else {
    <p class="response-closed">
      Responses are unavailable here. They may be closed, or this may be your team\u2019s exhibit.
    </p>
  }

  <div class="posted-cards" aria-label="Posted question cards">
    @for (response of responses(); track response.id) {
      <article [class.hidden]="response.status === 'hidden'">
        <span aria-hidden="true">?</span>
        <p>
          @if (response.status === 'hidden') {
            <em>Hidden by teacher</em>
          } @else {
            {{ response.body }}
          }
        </p>
        <footer>
          <strong>{{ response.authorDisplayName }}</strong>
          <small>Snapshot {{ response.snapshotId.split('-').at(-1) }}</small>
          @if (teacherMode()) {
            <button
              type="button"
              (click)="
                moderated.emit({
                  responseId: response.id,
                  action: response.status === 'hidden' ? 'restore' : 'hide',
                })
              "
            >
              {{ response.status === 'hidden' ? 'Restore' : 'Hide' }}
            </button>
          }
        </footer>
      </article>
    } @empty {
      <div class="no-cards">
        <span aria-hidden="true">\u2726</span>
        <p>No posted cards yet. Be the first visitor to ask a focused question.</p>
      </div>
    }
  </div>
</section>
`, styles: ["/* src/app/templates/exhibit-hall/ui/peer-response-rail.component.scss */\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.response-rail {\n  display: grid;\n  align-content: start;\n  gap: 0.85rem;\n  height: 100%;\n  border-left: 1px solid #c3b394;\n  padding: 1rem;\n  color: #29231d;\n  background: repeating-linear-gradient(rgba(0, 0, 0, 0) 0 1.72rem, rgba(115, 137, 160, 0.0862745098) 1.75rem), #f7f0dd;\n}\nheader {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.65rem;\n  border-bottom: 1px solid #c7b799;\n  padding-bottom: 0.75rem;\n}\n.card-stack {\n  position: relative;\n  width: 2.7rem;\n  height: 2.2rem;\n}\n.card-stack i {\n  position: absolute;\n  inset: 0.3rem;\n  border: 1px solid #ba9f65;\n  background: #fff9dd;\n  box-shadow: 0 0.1rem 0.3rem rgba(59, 45, 25, 0.2);\n}\n.card-stack i:first-child {\n  transform: rotate(-8deg);\n}\n.card-stack i:nth-child(2) {\n  transform: rotate(6deg);\n}\n.card-stack i:last-child {\n  transform: none;\n}\nheader span {\n  color: #8b6630;\n  font-size: 0.57rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\nh2,\np {\n  margin: 0;\n}\nh2 {\n  font: 800 1.1rem Georgia, serif;\n}\nheader > strong {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #6e4b22;\n  font-size: 0.72rem;\n}\nform {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #c5ac75;\n  padding: 0.75rem;\n  background: #fff8dc;\n  box-shadow: 0 0.25rem 0.65rem rgba(60, 43, 21, 0.1490196078);\n}\nlabel {\n  font: 700 0.8rem/1.45 Georgia, serif;\n}\ntextarea {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #af9d7e;\n  border-radius: 0.25rem;\n  padding: 0.55rem;\n  color: #2c2925;\n  background: #fffdf5;\n  font: 0.78rem/1.45 inherit;\n}\nform > div {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\nform small {\n  color: #786b59;\n  font-size: 0.58rem;\n}\nform small.over {\n  color: #a2392c;\n  font-weight: 800;\n}\nbutton {\n  min-height: 2.3rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.42rem 0.65rem;\n  color: #fff;\n  background: #2d6168;\n  font-size: 0.65rem;\n  font-weight: 850;\n}\nbutton:disabled {\n  opacity: 0.45;\n}\n.response-closed {\n  border: 1px dashed #bca98c;\n  padding: 0.7rem;\n  color: #6f6252;\n  background: rgba(242, 234, 216, 0.8);\n  font-size: 0.72rem;\n  line-height: 1.45;\n}\n.posted-cards {\n  display: grid;\n  gap: 0.65rem;\n  overflow-y: auto;\n  padding: 0.15rem 0.2rem 0.7rem 0;\n}\n.posted-cards article {\n  position: relative;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.55rem;\n  border: 1px solid #c6ad72;\n  padding: 0.7rem;\n  background: #fff5c9;\n  box-shadow: 0.12rem 0.2rem 0.45rem rgba(59, 43, 22, 0.2);\n  transform: rotate(-0.4deg);\n}\n.posted-cards article:nth-child(even) {\n  background: #f1e8ca;\n  transform: rotate(0.5deg);\n}\n.posted-cards article.hidden {\n  opacity: 0.62;\n  background: #ddd8cc;\n}\n.posted-cards article > span {\n  display: grid;\n  width: 1.55rem;\n  height: 1.55rem;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #936b2f;\n  font: 800 0.8rem Georgia, serif;\n}\n.posted-cards article p {\n  font: 0.76rem/1.48 Georgia, serif;\n}\n.posted-cards article footer {\n  grid-column: 2;\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  color: #75654c;\n  font-size: 0.57rem;\n}\n.posted-cards article footer small {\n  margin-right: auto;\n}\n.posted-cards article footer button {\n  min-height: 1.75rem;\n  padding: 0.2rem 0.45rem;\n  color: #5e3027;\n  background: #efc7b9;\n}\n.no-cards {\n  display: grid;\n  min-height: 8rem;\n  place-items: center;\n  align-content: center;\n  border: 1px dashed #c2b394;\n  padding: 1rem;\n  color: #756956;\n  text-align: center;\n}\n.no-cards span {\n  color: #a17b3e;\n  font-size: 1.3rem;\n}\n.no-cards p {\n  max-width: 15rem;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\ntextarea:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #49a8b4;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=peer-response-rail.component.css.map */\n"] }]
  }], null, { prompt: [{ type: Input, args: [{ isSignal: true, alias: "prompt", required: true }] }], responseName: [{ type: Input, args: [{ isSignal: true, alias: "responseName", required: false }] }], maxWords: [{ type: Input, args: [{ isSignal: true, alias: "maxWords", required: false }] }], responses: [{ type: Input, args: [{ isSignal: true, alias: "responses", required: true }] }], draft: [{ type: Input, args: [{ isSignal: true, alias: "draft", required: false }] }], canRespond: [{ type: Input, args: [{ isSignal: true, alias: "canRespond", required: false }] }], teacherMode: [{ type: Input, args: [{ isSignal: true, alias: "teacherMode", required: false }] }], draftChanged: [{ type: Output, args: ["draftChanged"] }], draftBlurred: [{ type: Output, args: ["draftBlurred"] }], posted: [{ type: Output, args: ["posted"] }], moderated: [{ type: Output, args: ["moderated"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PeerResponseRailComponent, { className: "PeerResponseRailComponent", filePath: "src/app/templates/exhibit-hall/ui/peer-response-rail.component.ts", lineNumber: 11 });
})();

// src/app/templates/exhibit-hall/ui/teacher-hall-desk.component.ts
var _forTrack05 = ($index, $item) => $item.locationId;
var _forTrack12 = ($index, $item) => $item.id;
function TeacherHallDeskComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Live control");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h2");
    \u0275\u0275text(4, "Teacher hall desk");
    \u0275\u0275domElementEnd()();
  }
}
function TeacherHallDeskComponent_Conditional_7_For_21_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_For_21_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const location_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pointed.emit(location_r4.hanging.id));
    });
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const location_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.state().openingSession.currentHangingId === location_r4.hanging.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r4.position + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(location_r4.snapshot.accessibleData.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r4.team.displayName);
  }
}
function TeacherHallDeskComponent_Conditional_7_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TeacherHallDeskComponent_Conditional_7_For_21_Conditional_0_Template, 8, 5, "button", 12);
  }
  if (rf & 2) {
    const location_r4 = ctx.$implicit;
    \u0275\u0275conditional(location_r4.hanging && location_r4.snapshot ? 0 : -1);
  }
}
function TeacherHallDeskComponent_Conditional_7_For_37_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const location_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("value", location_r5.team.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(location_r5.team.displayName);
  }
}
function TeacherHallDeskComponent_Conditional_7_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TeacherHallDeskComponent_Conditional_7_For_37_Conditional_0_Template, 2, 2, "option", 13);
  }
  if (rf & 2) {
    const location_r5 = ctx.$implicit;
    \u0275\u0275conditional(location_r5.hanging ? 0 : -1);
  }
}
function TeacherHallDeskComponent_Conditional_7_Conditional_65_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const team_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(team_r6.displayName);
  }
}
function TeacherHallDeskComponent_Conditional_7_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 11)(1, "h3");
    \u0275\u0275text(2, "Not yet published");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, TeacherHallDeskComponent_Conditional_7_Conditional_65_For_4_Template, 2, 1, "span", null, _forTrack12);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.unpublishedTeams());
  }
}
function TeacherHallDeskComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 3)(1, "span");
    \u0275\u0275domElement(2, "i", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "section")(7, "h3");
    \u0275\u0275text(8, "Opening phase");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "div", 5)(10, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.phaseChanged.emit("async_walk"));
    });
    \u0275\u0275text(11, " Release to walk ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.phaseChanged.emit("live_opening"));
    });
    \u0275\u0275text(13, " Start live opening ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.phaseChanged.emit("closed_readable"));
    });
    \u0275\u0275text(15, " Close, keep readable ");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(16, "section")(17, "h3");
    \u0275\u0275text(18, "Class focus");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(19, "div", 6);
    \u0275\u0275repeaterCreate(20, TeacherHallDeskComponent_Conditional_7_For_21_Template, 1, 1, null, null, _forTrack05);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "div", 7)(23, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigationChanged.emit("independent"));
    });
    \u0275\u0275text(24, " Independent ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(25, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigationChanged.emit("teacher_follow"));
    });
    \u0275\u0275text(26, " Teacher follow ");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(27, "section")(28, "h3");
    \u0275\u0275text(29, "Presenter plate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(30, "label")(31, "span");
    \u0275\u0275text(32, "Presenting team");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(33, "select", 8);
    \u0275\u0275domListener("change", function TeacherHallDeskComponent_Conditional_7_Template_select_change_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.docentsSelected.emit(ctx_r1.readSelect($event)));
    });
    \u0275\u0275domElementStart(34, "option", 9);
    \u0275\u0275text(35, "Select docents\u2026");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(36, TeacherHallDeskComponent_Conditional_7_For_37_Template, 1, 1, null, null, _forTrack05);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(38, "section")(39, "h3");
    \u0275\u0275text(40, "Hall switches");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(41, "button", 10);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.controlToggled.emit("peerResponsesEnabled"));
    });
    \u0275\u0275domElementStart(42, "span")(43, "strong");
    \u0275\u0275text(44, "Question cards");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(45, "small");
    \u0275\u0275text(46, "Post and moderate");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(47, "i");
    \u0275\u0275text(48);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(49, "button", 10);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.controlToggled.emit("submissionLocked"));
    });
    \u0275\u0275domElementStart(50, "span")(51, "strong");
    \u0275\u0275text(52, "Submissions");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(53, "small");
    \u0275\u0275text(54, "Hang or rehang");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(55, "i");
    \u0275\u0275text(56);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(57, "button", 10);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.controlToggled.emit("familyViewEnabled"));
    });
    \u0275\u0275domElementStart(58, "span")(59, "strong");
    \u0275\u0275text(60, "Family view");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(61, "small");
    \u0275\u0275text(62, "Approved snapshots only");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(63, "i");
    \u0275\u0275text(64);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(65, TeacherHallDeskComponent_Conditional_7_Conditional_65_Template, 5, 0, "section", 11);
    \u0275\u0275domElementStart(66, "footer")(67, "button", 2);
    \u0275\u0275domListener("click", function TeacherHallDeskComponent_Conditional_7_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetRequested.emit());
    });
    \u0275\u0275text(68, "Reset demo data");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(69, "small");
    \u0275\u0275text(70, "High-impact controls are recorded by the runtime.");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.state().hallPhase.replaceAll("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Revision ", ctx_r1.state().openingSession.revision);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r1.state().hallPhase === "async_walk");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.state().hallPhase === "live_opening");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.state().hallPhase === "closed_readable");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.locations());
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.state().hall.controls.navigationMode === "independent");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.state().hall.controls.navigationMode === "teacher_follow");
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.locations());
    \u0275\u0275advance(11);
    \u0275\u0275classProp("on", ctx_r1.state().hall.controls.peerResponsesEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.state().hall.controls.peerResponsesEnabled ? "On" : "Off");
    \u0275\u0275advance(7);
    \u0275\u0275classProp("on", !ctx_r1.state().hall.controls.submissionLocked);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.state().hall.controls.submissionLocked ? "Locked" : "Open");
    \u0275\u0275advance(7);
    \u0275\u0275classProp("on", ctx_r1.state().hall.controls.familyViewEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.state().hall.controls.familyViewEnabled ? "On" : "Off");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.unpublishedTeams().length ? 65 : -1);
  }
}
var TeacherHallDeskComponent = class _TeacherHallDeskComponent {
  state = input.required(
    ...ngDevMode ? [{ debugName: "state" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locations = input.required(
    ...ngDevMode ? [{ debugName: "locations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unpublishedTeams = input.required(
    ...ngDevMode ? [{ debugName: "unpublishedTeams" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collapsed = input(
    false,
    ...ngDevMode ? [{ debugName: "collapsed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collapsedChanged = output();
  phaseChanged = output();
  navigationChanged = output();
  controlToggled = output();
  pointed = output();
  docentsSelected = output();
  resetRequested = output();
  readSelect(event) {
    return event.target.value;
  }
  static \u0275fac = function TeacherHallDeskComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeacherHallDeskComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherHallDeskComponent, selectors: [["app-teacher-hall-desk"]], inputs: { state: [1, "state"], locations: [1, "locations"], unpublishedTeams: [1, "unpublishedTeams"], collapsed: [1, "collapsed"] }, outputs: { collapsedChanged: "collapsedChanged", phaseChanged: "phaseChanged", navigationChanged: "navigationChanged", controlToggled: "controlToggled", pointed: "pointed", docentsSelected: "docentsSelected", resetRequested: "resetRequested" }, decls: 8, vars: 6, consts: [["aria-label", "Teacher hall desk", 1, "teacher-desk"], ["aria-hidden", "true", 1, "desk-seal"], ["type", "button", 3, "click"], [1, "desk-status"], [1, "live"], [1, "phase-grid"], [1, "focus-list"], ["role", "group", "aria-label", "Navigation mode", 1, "mode-toggle"], [3, "change"], ["value", ""], ["type", "button", 1, "switch", 3, "click"], [1, "not-ready"], ["type", "button", 3, "active"], [3, "value"]], template: function TeacherHallDeskComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "aside", 0)(1, "header")(2, "div", 1);
      \u0275\u0275text(3, "T");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, TeacherHallDeskComponent_Conditional_4_Template, 5, 0, "div");
      \u0275\u0275domElementStart(5, "button", 2);
      \u0275\u0275domListener("click", function TeacherHallDeskComponent_Template_button_click_5_listener() {
        return ctx.collapsedChanged.emit(!ctx.collapsed());
      });
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(7, TeacherHallDeskComponent_Conditional_7_Template, 71, 22);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("collapsed", ctx.collapsed());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.collapsed() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.collapsed() ? "Open teacher hall desk" : "Collapse teacher hall desk");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.collapsed() ? "\u203A" : "\u2039", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.collapsed() ? 7 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.teacher-desk[_ngcontent-%COMP%] {\n  width: 18rem;\n  max-height: calc(100dvh - 8.2rem);\n  overflow-y: auto;\n  border: 1px solid #856f51;\n  border-radius: 0.5rem;\n  color: #2e271f;\n  background: #f0e7d5;\n  box-shadow: 0 0.8rem 1.8rem rgba(17, 13, 9, 0.4);\n  scrollbar-width: thin;\n}\n.teacher-desk.collapsed[_ngcontent-%COMP%] {\n  width: 3.3rem;\n  overflow: hidden;\n}\nheader[_ngcontent-%COMP%] {\n  position: sticky;\n  z-index: 2;\n  top: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border-bottom: 0.2rem solid #bd8b3d;\n  padding: 0.55rem;\n  color: #fff7e7;\n  background: #27231f;\n}\n.desk-seal[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.1rem;\n  flex: 0 0 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d9bd76;\n  border-radius: 50%;\n  color: #efcf82;\n  font: 800 0.8rem Georgia, serif;\n}\nheader[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2) {\n  display: grid;\n  flex: 1;\n}\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d7b669;\n  font-size: 0.52rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Georgia, serif;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\nheader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border: 1px solid #655847;\n  border-radius: 0.25rem;\n  color: #fff;\n  background: #3e3831;\n  font-size: 1.25rem;\n}\n.desk-status[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.4rem;\n  padding: 0.5rem 0.65rem;\n  color: #6f5e48;\n  background: #dfd2ba;\n  font-size: 0.55rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.desk-status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n}\n.desk-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #b08642;\n}\n.desk-status[_ngcontent-%COMP%]   i.live[_ngcontent-%COMP%] {\n  background: #4d8c52;\n  box-shadow: 0 0 0.35rem #4f9c59;\n}\nsection[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  border-bottom: 1px solid #d2c1a4;\n  padding: 0.7rem;\n}\nh3[_ngcontent-%COMP%] {\n  color: #765425;\n  font-size: 0.72rem;\n}\n.phase-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.3rem;\n}\n.phase-grid[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  grid-column: 1/-1;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 2.2rem;\n  border: 1px solid #baa788;\n  border-radius: 0.25rem;\n  padding: 0.35rem 0.5rem;\n  color: #44392d;\n  background: #fff9ed;\n  font: 750 0.63rem/1.2 inherit;\n}\nbutton.active[_ngcontent-%COMP%] {\n  color: #fff;\n  border-color: #2b6b74;\n  background: #2c6972;\n}\n.focus-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n}\n.focus-list[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.35rem 1fr;\n  align-items: center;\n  gap: 0.4rem;\n  text-align: left;\n}\n.focus-list[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: grid;\n  width: 1.25rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #77613f;\n  font-size: 0.52rem;\n}\n.focus-list[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  min-width: 0;\n}\n.focus-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.focus-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.focus-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  opacity: 0.72;\n  font-size: 0.52rem;\n}\n.mode-toggle[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.mode-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border-radius: 0;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  color: #5a4b38;\n  font-size: 0.6rem;\n  font-weight: 800;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.2rem;\n  border: 1px solid #b6a080;\n  border-radius: 0.25rem;\n  padding: 0.35rem;\n  background: #fffaf0;\n  font: 0.64rem inherit;\n}\nbutton.switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  text-align: left;\n}\n.switch[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n}\n.switch[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #796b59;\n  font-size: 0.51rem;\n}\n.switch[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  min-width: 2.7rem;\n  border-radius: 999px;\n  padding: 0.24rem 0.4rem;\n  color: #65463c;\n  background: #ebc6b8;\n  font-size: 0.5rem;\n  font-style: normal;\n  text-align: center;\n}\n.switch[_ngcontent-%COMP%]   i.on[_ngcontent-%COMP%] {\n  color: #275b36;\n  background: #cde2c5;\n}\n.not-ready[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.not-ready[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.not-ready[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.25rem 0.45rem;\n  color: #704a1e;\n  background: #ead1a6;\n  font-size: 0.55rem;\n  font-weight: 800;\n}\nfooter[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n  padding: 0.7rem;\n}\nfooter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #6b2e27;\n  border-color: #c7a59e;\n  background: #f2dcd7;\n}\nfooter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7e705e;\n  font-size: 0.5rem;\n  line-height: 1.35;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #55adb7;\n  outline-offset: 2px;\n}\n@media (max-width: 950px) {\n  .teacher-desk[_ngcontent-%COMP%] {\n    width: 100%;\n    max-height: none;\n  }\n  .teacher-desk.collapsed[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 3.3rem;\n  }\n}\n/*# sourceMappingURL=teacher-hall-desk.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherHallDeskComponent, [{
    type: Component,
    args: [{ selector: "app-teacher-hall-desk", template: `<aside class="teacher-desk" [class.collapsed]="collapsed()" aria-label="Teacher hall desk">
  <header>
    <div class="desk-seal" aria-hidden="true">T</div>
    @if (!collapsed()) {
      <div>
        <span>Live control</span>
        <h2>Teacher hall desk</h2>
      </div>
    }
    <button
      type="button"
      (click)="collapsedChanged.emit(!collapsed())"
      [attr.aria-label]="collapsed() ? 'Open teacher hall desk' : 'Collapse teacher hall desk'"
    >
      {{ collapsed() ? '\u203A' : '\u2039' }}
    </button>
  </header>

  @if (!collapsed()) {
    <div class="desk-status">
      <span><i class="live"></i>{{ state().hallPhase.replaceAll('_', ' ') }}</span>
      <span>Revision {{ state().openingSession.revision }}</span>
    </div>

    <section>
      <h3>Opening phase</h3>
      <div class="phase-grid">
        <button
          type="button"
          [class.active]="state().hallPhase === 'async_walk'"
          (click)="phaseChanged.emit('async_walk')"
        >
          Release to walk
        </button>
        <button
          type="button"
          [class.active]="state().hallPhase === 'live_opening'"
          (click)="phaseChanged.emit('live_opening')"
        >
          Start live opening
        </button>
        <button
          type="button"
          [class.active]="state().hallPhase === 'closed_readable'"
          (click)="phaseChanged.emit('closed_readable')"
        >
          Close, keep readable
        </button>
      </div>
    </section>

    <section>
      <h3>Class focus</h3>
      <div class="focus-list">
        @for (location of locations(); track location.locationId) {
          @if (location.hanging && location.snapshot) {
            <button
              type="button"
              [class.active]="state().openingSession.currentHangingId === location.hanging.id"
              (click)="pointed.emit(location.hanging.id)"
            >
              <span>{{ location.position + 1 }}</span>
              <span
                ><strong>{{ location.snapshot.accessibleData.title }}</strong
                ><small>{{ location.team.displayName }}</small></span
              >
            </button>
          }
        }
      </div>
      <div class="mode-toggle" role="group" aria-label="Navigation mode">
        <button
          type="button"
          [class.active]="state().hall.controls.navigationMode === 'independent'"
          (click)="navigationChanged.emit('independent')"
        >
          Independent
        </button>
        <button
          type="button"
          [class.active]="state().hall.controls.navigationMode === 'teacher_follow'"
          (click)="navigationChanged.emit('teacher_follow')"
        >
          Teacher follow
        </button>
      </div>
    </section>

    <section>
      <h3>Presenter plate</h3>
      <label>
        <span>Presenting team</span>
        <select (change)="docentsSelected.emit(readSelect($event))">
          <option value="">Select docents\u2026</option>
          @for (location of locations(); track location.locationId) {
            @if (location.hanging) {
              <option [value]="location.team.id">{{ location.team.displayName }}</option>
            }
          }
        </select>
      </label>
    </section>

    <section>
      <h3>Hall switches</h3>
      <button type="button" class="switch" (click)="controlToggled.emit('peerResponsesEnabled')">
        <span><strong>Question cards</strong><small>Post and moderate</small></span>
        <i [class.on]="state().hall.controls.peerResponsesEnabled">{{
          state().hall.controls.peerResponsesEnabled ? 'On' : 'Off'
        }}</i>
      </button>
      <button type="button" class="switch" (click)="controlToggled.emit('submissionLocked')">
        <span><strong>Submissions</strong><small>Hang or rehang</small></span>
        <i [class.on]="!state().hall.controls.submissionLocked">{{
          state().hall.controls.submissionLocked ? 'Locked' : 'Open'
        }}</i>
      </button>
      <button type="button" class="switch" (click)="controlToggled.emit('familyViewEnabled')">
        <span><strong>Family view</strong><small>Approved snapshots only</small></span>
        <i [class.on]="state().hall.controls.familyViewEnabled">{{
          state().hall.controls.familyViewEnabled ? 'On' : 'Off'
        }}</i>
      </button>
    </section>

    @if (unpublishedTeams().length) {
      <section class="not-ready">
        <h3>Not yet published</h3>
        @for (team of unpublishedTeams(); track team.id) {
          <span>{{ team.displayName }}</span>
        }
      </section>
    }

    <footer>
      <button type="button" (click)="resetRequested.emit()">Reset demo data</button>
      <small>High-impact controls are recorded by the runtime.</small>
    </footer>
  }
</aside>
`, styles: ["/* src/app/templates/exhibit-hall/ui/teacher-hall-desk.component.scss */\n:host {\n  display: block;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.teacher-desk {\n  width: 18rem;\n  max-height: calc(100dvh - 8.2rem);\n  overflow-y: auto;\n  border: 1px solid #856f51;\n  border-radius: 0.5rem;\n  color: #2e271f;\n  background: #f0e7d5;\n  box-shadow: 0 0.8rem 1.8rem rgba(17, 13, 9, 0.4);\n  scrollbar-width: thin;\n}\n.teacher-desk.collapsed {\n  width: 3.3rem;\n  overflow: hidden;\n}\nheader {\n  position: sticky;\n  z-index: 2;\n  top: 0;\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border-bottom: 0.2rem solid #bd8b3d;\n  padding: 0.55rem;\n  color: #fff7e7;\n  background: #27231f;\n}\n.desk-seal {\n  display: grid;\n  width: 2.1rem;\n  flex: 0 0 2.1rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #d9bd76;\n  border-radius: 50%;\n  color: #efcf82;\n  font: 800 0.8rem Georgia, serif;\n}\nheader > div:nth-child(2) {\n  display: grid;\n  flex: 1;\n}\nheader span {\n  color: #d7b669;\n  font-size: 0.52rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\nh2,\nh3 {\n  margin: 0;\n  font-family: Georgia, serif;\n}\nh2 {\n  font-size: 0.9rem;\n}\nheader button {\n  width: 2rem;\n  height: 2rem;\n  border: 1px solid #655847;\n  border-radius: 0.25rem;\n  color: #fff;\n  background: #3e3831;\n  font-size: 1.25rem;\n}\n.desk-status {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.4rem;\n  padding: 0.5rem 0.65rem;\n  color: #6f5e48;\n  background: #dfd2ba;\n  font-size: 0.55rem;\n  font-weight: 800;\n  text-transform: capitalize;\n}\n.desk-status span {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n}\n.desk-status i {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #b08642;\n}\n.desk-status i.live {\n  background: #4d8c52;\n  box-shadow: 0 0 0.35rem #4f9c59;\n}\nsection {\n  display: grid;\n  gap: 0.45rem;\n  border-bottom: 1px solid #d2c1a4;\n  padding: 0.7rem;\n}\nh3 {\n  color: #765425;\n  font-size: 0.72rem;\n}\n.phase-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.3rem;\n}\n.phase-grid button:last-child {\n  grid-column: 1/-1;\n}\nbutton {\n  min-height: 2.2rem;\n  border: 1px solid #baa788;\n  border-radius: 0.25rem;\n  padding: 0.35rem 0.5rem;\n  color: #44392d;\n  background: #fff9ed;\n  font: 750 0.63rem/1.2 inherit;\n}\nbutton.active {\n  color: #fff;\n  border-color: #2b6b74;\n  background: #2c6972;\n}\n.focus-list {\n  display: grid;\n  gap: 0.3rem;\n}\n.focus-list > button {\n  display: grid;\n  grid-template-columns: 1.35rem 1fr;\n  align-items: center;\n  gap: 0.4rem;\n  text-align: left;\n}\n.focus-list > button > span:first-child {\n  display: grid;\n  width: 1.25rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #77613f;\n  font-size: 0.52rem;\n}\n.focus-list > button > span:last-child {\n  display: grid;\n  min-width: 0;\n}\n.focus-list strong,\n.focus-list small {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.focus-list small {\n  opacity: 0.72;\n  font-size: 0.52rem;\n}\n.mode-toggle {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.mode-toggle button {\n  border-radius: 0;\n}\nlabel {\n  display: grid;\n  gap: 0.3rem;\n  color: #5a4b38;\n  font-size: 0.6rem;\n  font-weight: 800;\n}\nselect {\n  width: 100%;\n  min-height: 2.2rem;\n  border: 1px solid #b6a080;\n  border-radius: 0.25rem;\n  padding: 0.35rem;\n  background: #fffaf0;\n  font: 0.64rem inherit;\n}\nbutton.switch {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n  text-align: left;\n}\n.switch > span {\n  display: grid;\n}\n.switch small {\n  color: #796b59;\n  font-size: 0.51rem;\n}\n.switch i {\n  min-width: 2.7rem;\n  border-radius: 999px;\n  padding: 0.24rem 0.4rem;\n  color: #65463c;\n  background: #ebc6b8;\n  font-size: 0.5rem;\n  font-style: normal;\n  text-align: center;\n}\n.switch i.on {\n  color: #275b36;\n  background: #cde2c5;\n}\n.not-ready {\n  display: flex;\n  flex-wrap: wrap;\n}\n.not-ready h3 {\n  width: 100%;\n}\n.not-ready span {\n  border-radius: 999px;\n  padding: 0.25rem 0.45rem;\n  color: #704a1e;\n  background: #ead1a6;\n  font-size: 0.55rem;\n  font-weight: 800;\n}\nfooter {\n  display: grid;\n  gap: 0.3rem;\n  padding: 0.7rem;\n}\nfooter button {\n  color: #6b2e27;\n  border-color: #c7a59e;\n  background: #f2dcd7;\n}\nfooter small {\n  color: #7e705e;\n  font-size: 0.5rem;\n  line-height: 1.35;\n}\nbutton:focus-visible,\nselect:focus-visible {\n  outline: 3px solid #55adb7;\n  outline-offset: 2px;\n}\n@media (max-width: 950px) {\n  .teacher-desk {\n    width: 100%;\n    max-height: none;\n  }\n  .teacher-desk.collapsed {\n    width: 100%;\n    height: 3.3rem;\n  }\n}\n/*# sourceMappingURL=teacher-hall-desk.component.css.map */\n"] }]
  }], null, { state: [{ type: Input, args: [{ isSignal: true, alias: "state", required: true }] }], locations: [{ type: Input, args: [{ isSignal: true, alias: "locations", required: true }] }], unpublishedTeams: [{ type: Input, args: [{ isSignal: true, alias: "unpublishedTeams", required: true }] }], collapsed: [{ type: Input, args: [{ isSignal: true, alias: "collapsed", required: false }] }], collapsedChanged: [{ type: Output, args: ["collapsedChanged"] }], phaseChanged: [{ type: Output, args: ["phaseChanged"] }], navigationChanged: [{ type: Output, args: ["navigationChanged"] }], controlToggled: [{ type: Output, args: ["controlToggled"] }], pointed: [{ type: Output, args: ["pointed"] }], docentsSelected: [{ type: Output, args: ["docentsSelected"] }], resetRequested: [{ type: Output, args: ["resetRequested"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherHallDeskComponent, { className: "TeacherHallDeskComponent", filePath: "src/app/templates/exhibit-hall/ui/teacher-hall-desk.component.ts", lineNumber: 15 });
})();

// src/app/templates/exhibit-hall/rooms/museum-publication.service.ts
var MuseumPublicationService = class _MuseumPublicationService {
  runtime = inject(ExhibitHallRuntimeService);
  host = inject(EXHIBIT_HALL_SESSION_CONTEXT, { optional: true });
  adapter = inject(MUSEUM_PUBLICATION, { optional: true });
  shared = this.host?.authorityMode === "serverAuthoritative";
  status = signal(
    this.shared ? "connecting" : "local",
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = computed(
    () => this.status() === "local" || this.status() === "ready",
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  submitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "submitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collection = signal(
    this.shared ? [] : void 0,
    ...ngDevMode ? [{ debugName: "collection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collectionLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "collectionLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collectionError = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "collectionError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scope;
  generation = 0;
  destroyed = false;
  constructor() {
    if (this.shared)
      void this.connect();
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.generation++;
  }
  async connect() {
    if (!this.shared)
      return true;
    const generation = ++this.generation;
    this.runtime.roomPublishingLock.set(true);
    this.status.set("connecting");
    this.error.set(void 0);
    try {
      if (!this.adapter || !this.host?.classId)
        throw new MuseumPublicationError("MUSEUM_UNAVAILABLE");
      const scope = {
        tenantId: this.host.tenantId,
        classId: this.host.classId,
        projectId: this.runtime.config.projectId,
        projectVersion: this.runtime.config.projectVersion,
        museumId: this.runtime.config.projectInstanceId
      };
      const session = await this.adapter.openSession(scope);
      if (this.destroyed || generation !== this.generation)
        return false;
      this.checkSession(session, scope);
      this.scope = scope;
      if (session.publishedRoom)
        this.accept(session.publishedRoom);
      this.runtime.roomPublishingLock.set(session.submissionLocked);
      this.status.set("ready");
      if (session.submissionLocked && !session.publishedRoom)
        this.error.set("Your teacher has closed room submissions. Your draft is still available in this room.");
      return true;
    } catch (error) {
      if (!this.destroyed && generation === this.generation) {
        this.status.set("error");
        this.error.set(publicationMessage(error));
      }
      return false;
    }
  }
  async submit() {
    if (!this.shared)
      return this.runtime.submitMuseumRoom();
    if (this.submitting() || !this.ready() || !this.runtime.canEditRoom() || !this.runtime.roomValidation().valid)
      return false;
    const content = museumRoomContent(this.runtime.composerDraft());
    this.submitting.set(true);
    this.runtime.roomPublishingLock.set(true);
    this.error.set(void 0);
    try {
      const session = await this.adapter.openSession(this.scope);
      if (this.destroyed)
        return false;
      this.checkSession(session, this.scope);
      if (session.publishedRoom) {
        this.accept(session.publishedRoom);
        return true;
      }
      if (session.submissionLocked)
        throw new MuseumPublicationError("MUSEUM_ASSIGNMENT_OR_LOCK_CHANGED");
      const published = await this.adapter.publish({
        scope: this.scope,
        operationId: "room-publication-v1:" + content.roomId,
        content
      });
      if (this.destroyed)
        return false;
      this.accept(published);
      return true;
    } catch (error) {
      if (!this.destroyed)
        this.error.set(publicationMessage(error));
      return false;
    } finally {
      if (!this.destroyed) {
        this.submitting.set(false);
        this.runtime.roomPublishingLock.set(false);
      }
    }
  }
  async refreshCollection() {
    if (!this.shared || !this.scope || !this.adapter || this.collectionLoading())
      return;
    this.collectionLoading.set(true);
    this.collectionError.set(void 0);
    try {
      const rooms = await this.adapter.loadCollection(this.scope);
      if (!this.destroyed)
        this.collection.set(rooms);
    } catch (error) {
      if (!this.destroyed)
        this.collectionError.set(publicationMessage(error));
    } finally {
      if (!this.destroyed)
        this.collectionLoading.set(false);
    }
  }
  checkSession(session, scope) {
    const assigned = this.runtime.assignedRoom();
    if (session.actorId !== this.host?.actorId || session.teamId !== this.runtime.config.viewer.teamId || museumScopeKey(session.scope) !== museumScopeKey(scope) || session.room.roomId !== assigned?.roomId || session.room.layoutId !== assigned?.layoutId) {
      throw new MuseumPublicationError("MUSEUM_ASSIGNMENT_UNAVAILABLE");
    }
  }
  accept(published) {
    if (published.teamId !== this.runtime.config.viewer.teamId || published.room.roomId !== this.runtime.assignedRoom()?.roomId || published.room.layoutId !== this.runtime.assignedRoom()?.layoutId)
      throw new MuseumPublicationError("INVALID_MUSEUM_RESPONSE");
    this.runtime.acceptSharedMuseumRoom(published.board);
  }
  static \u0275fac = function MuseumPublicationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumPublicationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MuseumPublicationService, factory: _MuseumPublicationService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumPublicationService, [{
    type: Injectable
  }], () => [], null);
})();
function publicationMessage(error) {
  const code = error instanceof MuseumPublicationError ? error.code : "";
  if (code === "AUTHENTICATION_REQUIRED")
    return "Sign in to your school account, then reconnect to your room.";
  if ([
    "MUSEUM_ENROLLMENT_REQUIRED",
    "MUSEUM_ASSIGNMENT_UNAVAILABLE",
    "MUSEUM_ROOM_NOT_ASSIGNED"
  ].includes(code))
    return "Your room assignment could not be confirmed. Your teacher needs to check your class and room assignment.";
  if (code === "MUSEUM_NOT_OPEN")
    return "Your room is submitted. The class museum will open when your teacher is ready.";
  if (code === "MUSEUM_ROOM_ALREADY_SUBMITTED")
    return "This room was submitted from another session. Reconnect to view the submitted room.";
  if (code === "MUSEUM_ASSIGNMENT_OR_LOCK_CHANGED")
    return "Your room assignment or submission deadline changed. Reconnect before submitting again.";
  return "The class museum could not be reached. Your draft is still here. Reconnect or try again before leaving.";
}

// src/app/templates/exhibit-hall/rooms/student-room-workspace.component.ts
var _c02 = ["panelHeading"];
var _c12 = ["validationPanel"];
var _forTrack06 = ($index, $item) => $item.id;
function StudentRoomWorkspaceComponent_Conditional_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_18_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.publication.connect());
    });
    \u0275\u0275text(1, " Reconnect to my room ");
    \u0275\u0275elementEnd();
  }
}
function StudentRoomWorkspaceComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "h1");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, StudentRoomWorkspaceComponent_Conditional_18_Conditional_5_Template, 2, 0, "button", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.publication.status() === "connecting" ? "Opening your assigned room\u2026" : "Reconnect to your room.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.publication.error() ?? "Checking your class and room assignment.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.publication.status() === "error" ? 5 : -1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_19_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_19_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.publication.refreshCollection());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.publication.collectionLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.publication.collectionLoading() ? "Loading rooms\u2026" : "Refresh rooms", " ");
  }
}
function StudentRoomWorkspaceComponent_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function StudentRoomWorkspaceComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 14);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.visiting.set(false));
    });
    \u0275\u0275text(2, "\u2190 Back to my room");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, StudentRoomWorkspaceComponent_Conditional_19_Conditional_5_Template, 2, 2, "button", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, StudentRoomWorkspaceComponent_Conditional_19_Conditional_6_Template, 2, 1, "div", 16);
    \u0275\u0275element(7, "app-museum-walkthrough", 17);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.publication.shared ? "Your submitted room is part of the class museum." : "Your submitted room is part of this preview museum.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.publication.shared ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.publication.collectionError()) ? 6 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275property("locations", ctx_r1.runtime.locations())("publishedRooms", ctx_r1.publication.collection());
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.preview.set(!ctx_r1.preview()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.preview());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.preview() ? "\u2190 Keep curating" : "Preview as a visitor", " ");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openMuseum());
    });
    \u0275\u0275text(1, " Visit the class museum \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_For_24_Template_button_click_0_listener() {
      const slot_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.select(slot_r9.id));
    });
    \u0275\u0275elementStart(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "i");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r9 = ctx.$implicit;
    const $index_r10 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.selectedSlot() === slot_r9.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r10 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(slot_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.objectAt(slot_r9.id)?.title ?? "Ready for an artifact");
    \u0275\u0275advance();
    \u0275\u0275classProp("filled", ctx_r1.objectAt(slot_r9.id));
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 37);
    \u0275\u0275text(1, "Room title ");
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "Up to 12 words");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "input", 38);
    \u0275\u0275listener("input", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.updateBoardTitle(ctx_r1.value($event)));
    })("blur", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template_input_blur_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveRoomDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label", 39);
    \u0275\u0275text(6, "What connects your artifacts? ");
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "Up to 60 words");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "textarea", 40);
    \u0275\u0275listener("input", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template_textarea_input_9_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.updateBoardClaim(ctx_r1.value($event)));
    })("blur", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template_textarea_blur_9_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveRoomDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 41)(11, "span", 42);
    \u0275\u0275text(12, "\u2727");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14, " A good collection helps visitors notice a connection. Start with something you can see in the objects. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 43);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addFirst());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.draft().title);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.draft().centralClaim);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.draft().objects.length ? "Choose a display spot" : "Add your first artifact", " \u2192 ");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 44);
    \u0275\u0275text(5, "Select a display to read its label and source credits.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.draft().title || "Your room title will appear here");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.draft().centralClaim || "Your introduction will welcome visitors here.");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_0_Template, 17, 3)(1, StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Conditional_1_Template, 6, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.editable() ? 0 : 1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_For_4_Template_button_click_0_listener() {
      const object_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.place(object_r13.id));
    });
    \u0275\u0275elementStart(1, "span", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 42);
    \u0275\u0275text(9, "+");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const object_r13 = ctx.$implicit;
    const $index_r14 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.used(object_r13.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r14 === 0 ? "\u265C" : $index_r14 === 1 ? "\u25B0" : "\u25A5");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(object_r13.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.used(object_r13.id) ? "Already in your room" : "3D artifact \xB7 " + ((object_r13.model?.sizeBytes ?? 0) / 1e6).toFixed(1) + " MB");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.choosing.set(false));
    });
    \u0275\u0275text(1, " Keep current artifact ");
    \u0275\u0275elementEnd();
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, " Choose an object from your teacher\u2019s collection. It will fit onto this display automatically. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 46);
    \u0275\u0275repeaterCreate(3, StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_For_4_Template, 10, 4, "button", 15, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 41)(6, "span", 42);
    \u0275\u0275text(7, "\u2727");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, " You choose the objects and write their stories. Their sources and creator credits stay attached. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_Conditional_10_Template, 2, 0, "button", 47);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.runtime.config.museum.catalog.objects);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.choosing() ? 10 : -1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 52);
    \u0275\u0275text(1, "Artifact title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 53);
    \u0275\u0275listener("input", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateLabel("title", $event));
    })("blur", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_input_blur_2_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveRoomDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 54);
    \u0275\u0275text(4, "Museum label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 55);
    \u0275\u0275listener("input", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_textarea_input_5_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateLabel("description", $event));
    })("blur", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_textarea_blur_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveRoomDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 56);
    \u0275\u0275text(7, "Why it matters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 57);
    \u0275\u0275listener("input", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_textarea_input_8_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateLabel("evidenceConnection", $event));
    })("blur", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template_textarea_blur_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.saveRoomDraft());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const object_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("value", object_r17.title);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", object_r17.description);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", object_r17.evidenceConnection);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h4");
    \u0275\u0275text(3, "Why it matters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const object_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(object_r17.description || "Your museum label will appear here.");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(object_r17.evidenceConnection || "Explain the connection to your collection.");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", source_r18.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r18.citation);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const source_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", source_r18.citation, " ");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275conditionalCreate(1, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Conditional_1_Template, 2, 2, "a", 58)(2, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r18.url ? 1 : 2);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Conditional_0_Template, 3, 1, "p");
  }
  if (rf & 2) {
    const source_r18 = ctx.$implicit;
    const object_r17 = \u0275\u0275nextContext();
    \u0275\u0275conditional(object_r17.sourceIds.includes(source_r18.id) ? 0 : -1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "button", 49);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.choosing.set(true));
    });
    \u0275\u0275text(2, " Change artifact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 59);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.remove());
    });
    \u0275\u0275text(4, " Remove from display ");
    \u0275\u0275elementEnd()();
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_0_Template, 9, 3)(1, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_1_Template, 6, 2);
    \u0275\u0275elementStart(2, "details", 50)(3, "summary");
    \u0275\u0275text(4, "Source & creator credit");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_For_6_Template, 1, 1, null, null, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Conditional_7_Template, 5, 0, "div", 51);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.editable() ? 0 : 1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.draft().sources);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editable() ? 7 : -1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "This display is empty. Return to curating to add an artifact.");
    \u0275\u0275elementEnd();
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_36_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r20.message);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 32, 1)(2, "strong");
    \u0275\u0275text(3, "A few things to finish");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul");
    \u0275\u0275repeaterCreate(5, StudentRoomWorkspaceComponent_Conditional_20_Conditional_36_For_6_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.runtime.roomValidation().errors);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 14);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_37_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.clearError());
    });
    \u0275\u0275text(4, "Dismiss");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx);
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_38_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.publication.connect());
    });
    \u0275\u0275text(4, " Reconnect to my room ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.publication.submitting());
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Conditional_47_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 42);
    \u0275\u0275text(3, "\u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.runtime.canEditRoom());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.publication.submitting() ? "Submitting your room\u2026" : "Submit my room", " ");
  }
}
function StudentRoomWorkspaceComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 19)(1, "div")(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 21);
    \u0275\u0275conditionalCreate(9, StudentRoomWorkspaceComponent_Conditional_20_Conditional_9_Template, 2, 2, "button", 22)(10, StudentRoomWorkspaceComponent_Conditional_20_Conditional_10_Template, 2, 0, "button", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 23)(12, "section", 24)(13, "app-museum-scene", 25);
    \u0275\u0275listener("selected", function StudentRoomWorkspaceComponent_Conditional_20_Template_app_museum_scene_selected_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.select($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "nav", 26)(15, "button", 14);
    \u0275\u0275listener("click", function StudentRoomWorkspaceComponent_Conditional_20_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.select());
    });
    \u0275\u0275elementStart(16, "span", 27);
    \u0275\u0275text(17, "\u25C7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span")(19, "strong");
    \u0275\u0275text(20, "Room story");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small");
    \u0275\u0275text(22, "Title & introduction");
    \u0275\u0275elementEnd()()();
    \u0275\u0275repeaterCreate(23, StudentRoomWorkspaceComponent_Conditional_20_For_24_Template, 9, 6, "button", 28, _forTrack06);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "aside", 29)(26, "div", 30)(27, "span", 20);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "h2", 31, 0);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, StudentRoomWorkspaceComponent_Conditional_20_Conditional_32_Template, 2, 1)(33, StudentRoomWorkspaceComponent_Conditional_20_Conditional_33_Template, 11, 1)(34, StudentRoomWorkspaceComponent_Conditional_20_Conditional_34_Template, 8, 2)(35, StudentRoomWorkspaceComponent_Conditional_20_Conditional_35_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(36, StudentRoomWorkspaceComponent_Conditional_20_Conditional_36_Template, 7, 0, "section", 32);
    \u0275\u0275conditionalCreate(37, StudentRoomWorkspaceComponent_Conditional_20_Conditional_37_Template, 5, 1, "div", 16);
    \u0275\u0275conditionalCreate(38, StudentRoomWorkspaceComponent_Conditional_20_Conditional_38_Template, 5, 2, "div", 16);
    \u0275\u0275elementStart(39, "footer", 33)(40, "div")(41, "strong");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "small");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, StudentRoomWorkspaceComponent_Conditional_20_Conditional_47_Template, 4, 2, "button", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_14_0;
    let tmp_15_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.roomSubmitted() ? "YOUR COLLECTION IS READY" : "A ROOM. YOUR IDEAS.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.roomSubmitted() ? "Your story is in the museum." : "Make this room yours.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.roomSubmitted() ? "Visitors see the room you submitted, with your artifacts, labels, and sources." : "Your teacher has prepared the room. Add an artifact to a display spot, then tell visitors why it matters.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.runtime.roomSubmitted() ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275property("content", ctx_r1.sceneContent())("activeDisplay", ctx_r1.selectedSlot());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", !ctx_r1.selectedSlot());
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.slots());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedDisplay()?.label ?? "WELCOME YOUR VISITORS");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedSlot() ? ctx_r1.selectedObject() && !ctx_r1.choosing() ? ctx_r1.selectedObject().title : "Add an artifact" : "The story of your room", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.selectedSlot() ? 32 : (!ctx_r1.selectedObject() || ctx_r1.choosing()) && ctx_r1.editable() ? 33 : (tmp_12_0 = ctx_r1.selectedObject()) ? 34 : 35, tmp_12_0);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.showValidation() && !ctx_r1.runtime.roomValidation().valid ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = ctx_r1.runtime.error()) ? 37 : -1, tmp_14_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = ctx_r1.publication.error()) ? 38 : -1, tmp_15_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.roomSubmitted() ? "Room submitted" : "Ready to welcome visitors?");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.roomSubmitted() ? "Your submitted collection is saved separately from drafts." : "Add at least one artifact, finish its labels, and give your room a story.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.publication.shared ? ctx_r1.runtime.roomSubmitted() ? "Submission confirmed by the class museum." : "Draft saves on this device. Submit to add your room to the class museum." : "Local preview \xB7 saves and submissions stay on this device.");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.runtime.roomSubmitted() ? 47 : -1);
  }
}
function StudentRoomWorkspaceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 10)(1, "h1");
    \u0275\u0275text(2, "Your room is being prepared.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Your teacher needs to assign you a museum room before you can add exhibits.");
    \u0275\u0275elementEnd()();
  }
}
var StudentRoomWorkspaceComponent = class _StudentRoomWorkspaceComponent {
  constructor() {
    bindLessonFocus((lesson) => {
      if (lesson.focusTarget === "edit" || lesson.focusTarget === "preview") {
        this.visiting.set(false);
        this.preview.set(lesson.focusTarget === "preview");
      }
    });
  }
  runtime = inject(ExhibitHallRuntimeService);
  publication = inject(MuseumPublicationService);
  selectedSlot = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "selectedSlot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  choosing = signal(
    false,
    ...ngDevMode ? [{ debugName: "choosing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preview = signal(
    false,
    ...ngDevMode ? [{ debugName: "preview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visiting = signal(
    false,
    ...ngDevMode ? [{ debugName: "visiting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showValidation = signal(
    false,
    ...ngDevMode ? [{ debugName: "showValidation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editable = computed(
    () => this.runtime.canEditRoom() && !this.preview(),
    ...ngDevMode ? [{ debugName: "editable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = this.runtime.composerDraft;
  slots = computed(
    () => museumRoomLayout(this.runtime.assignedRoom()?.layoutId ?? "")?.slots ?? [],
    ...ngDevMode ? [{ debugName: "slots" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedObject = computed(
    () => this.objectAt(this.selectedSlot()),
    ...ngDevMode ? [{ debugName: "selectedObject" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDisplay = computed(
    () => this.slots().find((slot) => slot.id === this.selectedSlot()),
    ...ngDevMode ? [{ debugName: "selectedDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sceneContent = computed(
    () => ({
      kind: "room",
      label: this.runtime.assignedRoom()?.label ?? "Your room",
      board: this.draft()
    }),
    ...ngDevMode ? [{ debugName: "sceneContent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  panelHeading = viewChild(
    "panelHeading",
    ...ngDevMode ? [{ debugName: "panelHeading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  validationPanel = viewChild(
    "validationPanel",
    ...ngDevMode ? [{ debugName: "validationPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  destroyRef = inject(DestroyRef);
  objectAt(slotId) {
    const objectId = this.draft().museumRoom?.placements.find((item) => item.slotId === slotId)?.objectId;
    return this.draft().objects.find((object) => object.id === objectId);
  }
  used(objectId) {
    return this.draft().museumRoom?.placements.some((item) => item.objectId === objectId && item.slotId !== this.selectedSlot()) ?? false;
  }
  select(id) {
    this.selectedSlot.set(id);
    this.choosing.set(false);
    afterNextRender(() => {
      const heading = this.panelHeading()?.nativeElement;
      heading?.scrollIntoView({ block: "nearest", behavior: "instant" });
      heading?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  place(objectId) {
    const slot = this.selectedSlot();
    if (slot)
      this.runtime.placeRoomObject(slot, objectId);
    this.select(slot);
  }
  remove() {
    const slot = this.selectedSlot();
    if (slot)
      this.runtime.placeRoomObject(slot);
    this.select(slot);
  }
  addFirst() {
    this.select(this.slots().find((slot) => !this.objectAt(slot.id))?.id ?? this.slots()[0]?.id);
  }
  value(event) {
    return event.target.value;
  }
  updateLabel(field, event) {
    const object = this.selectedObject();
    if (object)
      this.runtime.updateObject(object.id, field, this.value(event));
  }
  openMuseum() {
    this.visiting.set(true);
    void this.publication.refreshCollection();
  }
  async submit() {
    this.showValidation.set(true);
    const submitted = await this.publication.submit();
    if (this.destroyRef.destroyed)
      return;
    if (submitted) {
      this.preview.set(true);
      this.showValidation.set(false);
      this.selectedSlot.set(void 0);
    } else
      afterNextRender(() => {
        this.validationPanel()?.nativeElement.focus();
      }, { injector: this.injector });
  }
  static \u0275fac = function StudentRoomWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StudentRoomWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentRoomWorkspaceComponent, selectors: [["app-student-room-workspace"]], viewQuery: function StudentRoomWorkspaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.panelHeading, _c02, 5)(ctx.validationPanel, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, features: [\u0275\u0275ProvidersFeature([MuseumPublicationService])], decls: 22, vars: 5, consts: [["panelHeading", ""], ["validationPanel", ""], [1, "room-workspace"], [3, "error"], [1, "workspace-header"], [1, "museum-brand"], ["aria-hidden", "true", 1, "museum-monogram"], [1, "assignment"], ["role", "status", 1, "save-indicator"], ["aria-live", "polite", 1, "unassigned"], [1, "unassigned"], ["type", "button", 1, "primary"], ["type", "button", 1, "primary", 3, "click"], [1, "museum-return"], ["type", "button", 3, "click"], ["type", "button", 3, "disabled"], ["role", "alert", 1, "validation"], [3, "locations", "publishedRooms"], ["type", "button", 3, "click", "disabled"], [1, "room-introduction"], [1, "eyebrow"], [1, "room-actions"], ["type", "button", 1, "secondary"], [1, "studio-grid"], ["aria-label", "Your assigned room", 1, "room-stage"], [3, "selected", "content", "activeDisplay"], ["aria-label", "Room display spots", 1, "display-selector"], ["aria-hidden", "true", 1, "display-number"], ["type", "button"], ["aria-label", "Room contents", 1, "curator-panel"], [1, "panel-heading"], ["tabindex", "-1"], ["tabindex", "-1", "role", "alert", 1, "validation"], [1, "submission-bar"], ["type", "button", 1, "primary", 3, "disabled"], ["type", "button", 1, "secondary", 3, "click"], [1, "display-number"], ["for", "room-title"], ["id", "room-title", "maxlength", "160", "placeholder", "Give your collection a name", 3, "input", "blur", "value"], ["for", "room-story"], ["id", "room-story", "rows", "5", "maxlength", "700", "placeholder", "What should visitors discover in your room?", 3, "input", "blur", "value"], [1, "curator-tip"], ["aria-hidden", "true"], ["type", "button", 1, "primary", "wide", 3, "click"], [1, "muted"], [1, "panel-intro"], ["aria-label", "Available artifacts", 1, "artifact-library"], ["type", "button", 1, "text-button"], ["aria-hidden", "true", 1, "artifact-symbol"], ["type", "button", 1, "text-button", 3, "click"], [1, "source-credit"], [1, "artifact-actions"], ["for", "artifact-title"], ["id", "artifact-title", "maxlength", "120", 3, "input", "blur", "value"], ["for", "artifact-label"], ["id", "artifact-label", "rows", "3", "maxlength", "1000", "placeholder", "Describe what visitors can see. What is this object?", 3, "input", "blur", "value"], ["for", "artifact-connection"], ["id", "artifact-connection", "rows", "3", "maxlength", "1000", "placeholder", "How does this object help tell your room\u2019s story?", 3, "input", "blur", "value"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["type", "button", 1, "text-button", "remove", 3, "click"], ["type", "button", 1, "primary", 3, "click", "disabled"]], template: function StudentRoomWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 2)(1, "app-workspace-tools", 3)(2, "header", 4)(3, "div", 5)(4, "span", 6);
      \u0275\u0275text(5, "M");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div")(7, "span");
      \u0275\u0275text(8, "FORGE \xB7 CLASS MUSEUM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "strong");
      \u0275\u0275text(10, "Curator studio");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275element(12, "i");
      \u0275\u0275text(13);
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 8);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(18, StudentRoomWorkspaceComponent_Conditional_18_Template, 6, 3, "section", 9)(19, StudentRoomWorkspaceComponent_Conditional_19_Template, 8, 5)(20, StudentRoomWorkspaceComponent_Conditional_20_Template, 48, 17)(21, StudentRoomWorkspaceComponent_Conditional_21_Template, 5, 0, "section", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("error", ctx.runtime.saveState() === "save_failed" ? "Your room could not be saved. Keep this page open." : void 0);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.runtime.assignedRoom()?.label ?? "Room assignment pending");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.draft().teamCredit.displayName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.runtime.saveState() === "save_failed" ? "Could not save \xB7 try again" : ctx.runtime.saveState() === "saving" ? "Saving\u2026" : "Saved on this device", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.publication.ready() ? 18 : ctx.visiting() && ctx.runtime.roomSubmitted() ? 19 : ctx.runtime.assignedRoom() ? 20 : 21);
    }
  }, dependencies: [WorkspaceToolsComponent, MuseumSceneComponent, MuseumWalkthroughComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  background:\n    linear-gradient(\n      120deg,\n      #f8f1e2,\n      #f0e5cb);\n  color: #243f50;\n  min-height: 100vh;\n  font: 14px/1.5 Arial, sans-serif;\n}\napp-museum-scene[_ngcontent-%COMP%] {\n  --%NS%museum-scene-height: clamp(340px, calc(100svh - 355px), 560px);\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.5;\n}\n.room-workspace[_ngcontent-%COMP%] {\n  max-width: 1700px;\n  margin: auto;\n  padding: 0 34px 26px;\n}\n.workspace-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  justify-content: space-between;\n  min-height: 92px;\n  border-bottom: 1px solid #d8cfbb;\n  border-top: 4px solid #23495b;\n  box-shadow: 0 -2px 0 #bc8b39;\n}\n.museum-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.museum-monogram[_ngcontent-%COMP%] {\n  font: 29px Georgia, serif;\n  border: 1px solid #a7874a;\n  padding: 3px 10px;\n  outline: 1px solid #b79b63;\n  outline-offset: 3px;\n  background: #23495b;\n  color: #e3c787;\n}\n.museum-brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.museum-brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 0.14em;\n  color: #757665;\n}\n.museum-brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 21px/1.5 Georgia, serif;\n}\n.assignment[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.assignment[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #477c80;\n  border-radius: 50%;\n}\n.assignment[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border-left: 1px solid #c9c0ab;\n  padding-left: 12px;\n  margin-left: 3px;\n  color: #777967;\n  font-weight: 400;\n}\n.save-indicator[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6d725e;\n}\n.room-introduction[_ngcontent-%COMP%] {\n  padding: 29px 0 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: bold;\n  letter-spacing: 0.14em;\n  color: #95743b;\n}\nh1[_ngcontent-%COMP%] {\n  font: 38px/1.15 Georgia, serif;\n  font-weight: 400;\n  margin: 9px 0 12px;\n  letter-spacing: -0.02em;\n}\n.room-introduction[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #727461;\n  margin: 0;\n  max-width: 760px;\n  line-height: 1.6;\n}\n.room-actions[_ngcontent-%COMP%] {\n  flex: none;\n}\n.secondary[_ngcontent-%COMP%] {\n  border: 1px solid #bcb097;\n  color: #294c60;\n  background: #faf7ee;\n  padding: 11px 17px;\n  border-radius: 4px;\n  font-size: 12px;\n  min-height: 43px;\n}\n.secondary[_ngcontent-%COMP%]:hover {\n  background: #e8e6d7;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #23495b;\n  color: #fff8e7;\n  border: 1px solid #23495b;\n  border-radius: 4px;\n  min-height: 46px;\n  padding: 12px 22px;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.primary[_ngcontent-%COMP%]:hover:enabled {\n  background: #163747;\n}\n.primary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n.wide[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 12px;\n}\n.studio-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 325px;\n  gap: 24px;\n  align-items: start;\n}\n.room-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.curator-panel[_ngcontent-%COMP%] {\n  background: #fffaf0;\n  border: 1px solid #d9cfb7;\n  border-radius: 4px;\n  border-top: 3px solid #b28c4c;\n  box-shadow: inset 0 3px #23495b;\n  padding: 25px 23px;\n  min-height: 495px;\n}\n.panel-heading[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e1d8c5;\n  margin-bottom: 20px;\n  padding-bottom: 13px;\n}\n.panel-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: 400;\n  margin: 9px 0 0;\n}\n.panel-intro[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6a6f5d;\n  margin: 0 0 20px;\n  line-height: 1.7;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  margin: 17px 0 7px;\n  color: #365063;\n}\nlabel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  float: right;\n  font-size: 10px;\n  color: #969481;\n  font-weight: 400;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #cfc4aa;\n  border-radius: 3px;\n  background: #fffdf7;\n  color: #263f50;\n  padding: 11px 12px;\n  font-size: 12px;\n  line-height: 1.55;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\ninput[_ngcontent-%COMP%]::placeholder, \ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #989584;\n}\n.curator-tip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #eee7d5;\n  border: 1px solid #d9ccaf;\n  padding: 12px;\n  margin: 20px 0 12px;\n  border-radius: 3px;\n  color: #70765b;\n}\n.curator-tip[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #9b8649;\n  line-height: 1;\n}\n.curator-tip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.65;\n  margin: 0;\n}\n.display-selector[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 12px;\n}\n.display-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  text-align: left;\n  min-height: 63px;\n  padding: 11px;\n  border: 1px solid #d4c9b1;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #345367;\n  min-width: 0;\n}\n.display-selector[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #23495b;\n  border-color: #23495b;\n  color: #fff8e7;\n}\n.display-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2) {\n  display: block;\n  min-width: 0;\n  flex: 1;\n}\n.display-selector[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n}\n.display-selector[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  opacity: 0.67;\n  margin-top: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.display-number[_ngcontent-%COMP%] {\n  font: 22px Georgia, serif;\n  color: #b89450;\n}\n.display-selector[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border: 1px solid #9b947b;\n  border-radius: 50%;\n  flex: none;\n}\n.display-selector[_ngcontent-%COMP%]   i.filled[_ngcontent-%COMP%] {\n  background: #b79350;\n  border-color: #b79350;\n}\n.room-footnote[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  color: #91917c;\n  font-size: 10px;\n  margin-top: 11px;\n}\n.artifact-library[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.artifact-library[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 15px 12px;\n  border: 1px solid #d5cab0;\n  background: #f7f3e7;\n  border-radius: 4px;\n  color: #345367;\n  min-height: 83px;\n}\n.artifact-library[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:enabled {\n  background: #e9edeb;\n  border-color: #8ba2a4;\n}\n.artifact-library[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2) {\n  flex: 1;\n}\n.artifact-library[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 17px/1.25 Georgia, serif;\n  font-weight: 400;\n  display: block;\n}\n.artifact-library[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #93917d;\n  margin-top: 6px;\n  display: block;\n}\n.artifact-symbol[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #a88448;\n  width: 33px;\n  text-align: center;\n}\n.artifact-library[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  font-size: 23px;\n  font-weight: 300;\n}\n.source-credit[_ngcontent-%COMP%] {\n  font-size: 10px;\n  line-height: 1.7;\n  color: #797760;\n  border-top: 1px solid #e0d6be;\n  margin-top: 17px;\n  padding-top: 11px;\n}\n.source-credit[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #426276;\n}\n.source-credit[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #345c74;\n  text-underline-offset: 3px;\n  overflow-wrap: anywhere;\n}\n.artifact-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-top: 1px solid #e0d6be;\n  padding-top: 9px;\n  margin-top: 14px;\n}\n.text-button[_ngcontent-%COMP%] {\n  background: none;\n  border: 0;\n  font-size: 10px;\n  color: #426276;\n  padding: 10px 0;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.text-button.remove[_ngcontent-%COMP%] {\n  color: #93745a;\n}\n.curator-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 24px/1.3 Georgia, serif;\n}\n.curator-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.7;\n}\n.curator-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #99937b;\n}\n.submission-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 21px 0 0;\n  margin-top: 23px;\n  border-top: 1px solid #d8cfb9;\n}\n.submission-bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.submission-bar[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 19px Georgia, serif;\n  font-weight: 400;\n}\n.submission-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #80816d;\n}\n.submission-bar[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #989783;\n  margin-top: 3px;\n}\n.validation[_ngcontent-%COMP%] {\n  border: 1px solid #bd9971;\n  background: #fff4dc;\n  padding: 18px;\n  color: #6c4932;\n  margin-top: 20px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n.validation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.validation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.validation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  background: #fffaf0;\n  border: 1px solid #b7986e;\n  padding: 8px;\n  border-radius: 3px;\n  color: #6c4932;\n}\n.museum-return[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 22px 0;\n}\n.museum-return[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #faf5e7;\n  border: 1px solid #cdbf9d;\n  padding: 12px;\n  border-radius: 4px;\n  color: #345367;\n}\n.museum-return[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #81816a;\n}\n.unassigned[_ngcontent-%COMP%] {\n  padding: 80px 0;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #a9803b;\n  outline-offset: 3px;\n}\n@media (min-width: 1500px) {\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 355px;\n  }\n  .curator-panel[_ngcontent-%COMP%] {\n    padding: 28px;\n  }\n}\n@media (max-width: 1050px) {\n  .room-workspace[_ngcontent-%COMP%] {\n    padding: 0 20px 25px;\n  }\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 290px;\n    gap: 15px;\n  }\n  .curator-panel[_ngcontent-%COMP%] {\n    padding: 20px 17px;\n  }\n  .assignment[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .display-selector[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n}\n@media (max-width: 760px) {\n  .workspace-header[_ngcontent-%COMP%] {\n    min-height: 77px;\n    gap: 12px;\n  }\n  .museum-brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .museum-brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .museum-monogram[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .save-indicator[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .assignment[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .room-introduction[_ngcontent-%COMP%] {\n    display: block;\n    padding: 23px 0 18px;\n  }\n  .room-actions[_ngcontent-%COMP%] {\n    margin-top: 16px;\n  }\n  .studio-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .curator-panel[_ngcontent-%COMP%] {\n    min-height: 0;\n  }\n  .room-footnote[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n    display: none;\n  }\n  .submission-bar[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .submission-bar[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .museum-return[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .room-workspace[_ngcontent-%COMP%] {\n    padding: 0 13px 20px;\n  }\n}\n/*# sourceMappingURL=student-room-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentRoomWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-student-room-workspace", imports: [WorkspaceToolsComponent, MuseumSceneComponent, MuseumWalkthroughComponent], providers: [MuseumPublicationService], template: `<main class="room-workspace">\r
  <app-workspace-tools [error]="runtime.saveState() === 'save_failed' ? 'Your room could not be saved. Keep this page open.' : undefined"><header class="workspace-header">\r
    <div class="museum-brand">\r
      <span class="museum-monogram" aria-hidden="true">M</span>\r
      <div><span>FORGE \xB7 CLASS MUSEUM</span><strong>Curator studio</strong></div>\r
    </div>\r
    <div class="assignment">\r
      <i></i>{{ runtime.assignedRoom()?.label ?? 'Room assignment pending'\r
      }}<span>{{ draft().teamCredit.displayName }}</span>\r
    </div>\r
    <div class="save-indicator" role="status">\r
      {{\r
        runtime.saveState() === 'save_failed'\r
          ? 'Could not save \xB7 try again'\r
          : runtime.saveState() === 'saving'\r
            ? 'Saving\u2026'\r
            : 'Saved on this device'\r
      }}\r
    </div>\r
  </header></app-workspace-tools>\r
\r
  @if (!publication.ready()) {\r
    <section class="unassigned" aria-live="polite">\r
      <h1>\r
        {{\r
          publication.status() === 'connecting'\r
            ? 'Opening your assigned room\u2026'\r
            : 'Reconnect to your room.'\r
        }}\r
      </h1>\r
      <p>{{ publication.error() ?? 'Checking your class and room assignment.' }}</p>\r
      @if (publication.status() === 'error') {\r
        <button type="button" class="primary" (click)="publication.connect()">\r
          Reconnect to my room\r
        </button>\r
      }\r
    </section>\r
  } @else if (visiting() && runtime.roomSubmitted()) {\r
    <div class="museum-return">\r
      <button type="button" (click)="visiting.set(false)">\u2190 Back to my room</button\r
      ><span>{{\r
        publication.shared\r
          ? 'Your submitted room is part of the class museum.'\r
          : 'Your submitted room is part of this preview museum.'\r
      }}</span>\r
      @if (publication.shared) {\r
        <button\r
          type="button"\r
          [disabled]="publication.collectionLoading()"\r
          (click)="publication.refreshCollection()"\r
        >\r
          {{ publication.collectionLoading() ? 'Loading rooms\u2026' : 'Refresh rooms' }}\r
        </button>\r
      }\r
    </div>\r
    @if (publication.collectionError(); as error) {\r
      <div class="validation" role="alert">{{ error }}</div>\r
    }\r
    <app-museum-walkthrough\r
      [locations]="runtime.locations()"\r
      [publishedRooms]="publication.collection()"\r
    />\r
  } @else if (runtime.assignedRoom()) {\r
    <section class="room-introduction">\r
      <div>\r
        <span class="eyebrow">{{\r
          runtime.roomSubmitted() ? 'YOUR COLLECTION IS READY' : 'A ROOM. YOUR IDEAS.'\r
        }}</span>\r
        <h1>\r
          {{ runtime.roomSubmitted() ? 'Your story is in the museum.' : 'Make this room yours.' }}\r
        </h1>\r
        <p>\r
          {{\r
            runtime.roomSubmitted()\r
              ? 'Visitors see the room you submitted, with your artifacts, labels, and sources.'\r
              : 'Your teacher has prepared the room. Add an artifact to a display spot, then tell visitors why it matters.'\r
          }}\r
        </p>\r
      </div>\r
      <div class="room-actions">\r
        @if (!runtime.roomSubmitted()) {\r
          <button\r
            type="button"\r
            class="secondary"\r
            [attr.aria-pressed]="preview()"\r
            (click)="preview.set(!preview())"\r
          >\r
            {{ preview() ? '\u2190 Keep curating' : 'Preview as a visitor' }}\r
          </button>\r
        } @else {\r
          <button type="button" class="primary" (click)="openMuseum()">\r
            Visit the class museum \u2192\r
          </button>\r
        }\r
      </div>\r
    </section>\r
\r
    <div class="studio-grid">\r
      <section class="room-stage" aria-label="Your assigned room">\r
        <app-museum-scene\r
          [content]="sceneContent()"\r
          [activeDisplay]="selectedSlot()"\r
          (selected)="select($event)"\r
        />\r
        <nav class="display-selector" aria-label="Room display spots">\r
          <button type="button" [attr.aria-pressed]="!selectedSlot()" (click)="select()">\r
            <span class="display-number" aria-hidden="true">\u25C7</span\r
            ><span><strong>Room story</strong><small>Title & introduction</small></span>\r
          </button>\r
          @for (slot of slots(); track slot.id) {\r
            <button\r
              type="button"\r
              [attr.aria-pressed]="selectedSlot() === slot.id"\r
              (click)="select(slot.id)"\r
            >\r
              <span class="display-number">{{ $index + 1 }}</span\r
              ><span\r
                ><strong>{{ slot.label }}</strong\r
                ><small>{{ objectAt(slot.id)?.title ?? 'Ready for an artifact' }}</small></span\r
              ><i [class.filled]="objectAt(slot.id)"></i>\r
            </button>\r
          }\r
        </nav>\r
\r
      </section>\r
\r
      <aside class="curator-panel" aria-label="Room contents">\r
        <div class="panel-heading">\r
          <span class="eyebrow">{{ selectedDisplay()?.label ?? 'WELCOME YOUR VISITORS' }}</span>\r
          <h2 #panelHeading tabindex="-1">\r
            {{\r
              selectedSlot()\r
                ? selectedObject() && !choosing()\r
                  ? selectedObject()!.title\r
                  : 'Add an artifact'\r
                : 'The story of your room'\r
            }}\r
          </h2>\r
        </div>\r
        @if (!selectedSlot()) {\r
          @if (editable()) {\r
            <label for="room-title">Room title <small>Up to 12 words</small></label\r
            ><input\r
              id="room-title"\r
              [value]="draft().title"\r
              maxlength="160"\r
              placeholder="Give your collection a name"\r
              (input)="runtime.updateBoardTitle(value($event))"\r
              (blur)="runtime.saveRoomDraft()"\r
            />\r
            <label for="room-story"\r
              >What connects your artifacts? <small>Up to 60 words</small></label\r
            ><textarea\r
              id="room-story"\r
              rows="5"\r
              maxlength="700"\r
              [value]="draft().centralClaim"\r
              placeholder="What should visitors discover in your room?"\r
              (input)="runtime.updateBoardClaim(value($event))"\r
              (blur)="runtime.saveRoomDraft()"\r
            ></textarea>\r
            <div class="curator-tip">\r
              <span aria-hidden="true">\u2727</span>\r
              <p>\r
                A good collection helps visitors notice a connection. Start with something you can\r
                see in the objects.\r
              </p>\r
            </div>\r
            <button type="button" class="primary wide" (click)="addFirst()">\r
              {{ draft().objects.length ? 'Choose a display spot' : 'Add your first artifact' }} \u2192\r
            </button>\r
          } @else {\r
            <h3>{{ draft().title || 'Your room title will appear here' }}</h3>\r
            <p>{{ draft().centralClaim || 'Your introduction will welcome visitors here.' }}</p>\r
            <p class="muted">Select a display to read its label and source credits.</p>\r
          }\r
        } @else if ((!selectedObject() || choosing()) && editable()) {\r
          <p class="panel-intro">\r
            Choose an object from your teacher\u2019s collection. It will fit onto this display\r
            automatically.\r
          </p>\r
          <div class="artifact-library" aria-label="Available artifacts">\r
            @for (object of runtime.config.museum!.catalog.objects; track object.id) {\r
              <button type="button" [disabled]="used(object.id)" (click)="place(object.id)">\r
                <span class="artifact-symbol" aria-hidden="true">{{\r
                  $index === 0 ? '\u265C' : $index === 1 ? '\u25B0' : '\u25A5'\r
                }}</span\r
                ><span\r
                  ><strong>{{ object.title }}</strong\r
                  ><small>{{\r
                    used(object.id)\r
                      ? 'Already in your room'\r
                      : '3D artifact \xB7 ' +\r
                        ((object.model?.sizeBytes ?? 0) / 1000000).toFixed(1) +\r
                        ' MB'\r
                  }}</small></span\r
                ><span aria-hidden="true">+</span>\r
              </button>\r
            }\r
          </div>\r
          <div class="curator-tip">\r
            <span aria-hidden="true">\u2727</span>\r
            <p>\r
              You choose the objects and write their stories. Their sources and creator credits stay\r
              attached.\r
            </p>\r
          </div>\r
          @if (choosing()) {\r
            <button type="button" class="text-button" (click)="choosing.set(false)">\r
              Keep current artifact\r
            </button>\r
          }\r
        } @else if (selectedObject(); as object) {\r
          @if (editable()) {\r
            <label for="artifact-title">Artifact title</label\r
            ><input\r
              id="artifact-title"\r
              [value]="object.title"\r
              maxlength="120"\r
              (input)="updateLabel('title', $event)"\r
              (blur)="runtime.saveRoomDraft()"\r
            />\r
            <label for="artifact-label">Museum label</label\r
            ><textarea\r
              id="artifact-label"\r
              rows="3"\r
              maxlength="1000"\r
              [value]="object.description"\r
              placeholder="Describe what visitors can see. What is this object?"\r
              (input)="updateLabel('description', $event)"\r
              (blur)="runtime.saveRoomDraft()"\r
            ></textarea>\r
            <label for="artifact-connection">Why it matters</label\r
            ><textarea\r
              id="artifact-connection"\r
              rows="3"\r
              maxlength="1000"\r
              [value]="object.evidenceConnection"\r
              placeholder="How does this object help tell your room\u2019s story?"\r
              (input)="updateLabel('evidenceConnection', $event)"\r
              (blur)="runtime.saveRoomDraft()"\r
            ></textarea>\r
          } @else {\r
            <p>{{ object.description || 'Your museum label will appear here.' }}</p>\r
            <h4>Why it matters</h4>\r
            <p>{{ object.evidenceConnection || 'Explain the connection to your collection.' }}</p>\r
          }\r
          <details class="source-credit">\r
            <summary>Source & creator credit</summary>\r
            @for (source of draft().sources; track source.id) {\r
              @if (object.sourceIds.includes(source.id)) {\r
                <p>\r
                  @if (source.url) {\r
                    <a [href]="source.url" target="_blank" rel="noopener noreferrer">{{\r
                      source.citation\r
                    }}</a>\r
                  } @else {\r
                    {{ source.citation }}\r
                  }\r
                </p>\r
              }\r
            }\r
          </details>\r
          @if (editable()) {\r
            <div class="artifact-actions">\r
              <button type="button" class="text-button" (click)="choosing.set(true)">\r
                Change artifact</button\r
              ><button type="button" class="text-button remove" (click)="remove()">\r
                Remove from display\r
              </button>\r
            </div>\r
          }\r
        } @else {\r
          <p>This display is empty. Return to curating to add an artifact.</p>\r
        }\r
      </aside>\r
    </div>\r
\r
    @if (showValidation() && !runtime.roomValidation().valid) {\r
      <section #validationPanel tabindex="-1" class="validation" role="alert">\r
        <strong>A few things to finish</strong>\r
        <ul>\r
          @for (error of runtime.roomValidation().errors; track $index) {\r
            <li>{{ error.message }}</li>\r
          }\r
        </ul>\r
      </section>\r
    }\r
    @if (runtime.error(); as error) {\r
      <div class="validation" role="alert">\r
        <p>{{ error }}</p>\r
        <button type="button" (click)="runtime.clearError()">Dismiss</button>\r
      </div>\r
    }\r
    @if (publication.error(); as error) {\r
      <div class="validation" role="alert">\r
        <p>{{ error }}</p>\r
        <button type="button" [disabled]="publication.submitting()" (click)="publication.connect()">\r
          Reconnect to my room\r
        </button>\r
      </div>\r
    }\r
    <footer class="submission-bar">\r
      <div>\r
        <strong>{{\r
          runtime.roomSubmitted() ? 'Room submitted' : 'Ready to welcome visitors?'\r
        }}</strong\r
        ><span>{{\r
          runtime.roomSubmitted()\r
            ? 'Your submitted collection is saved separately from drafts.'\r
            : 'Add at least one artifact, finish its labels, and give your room a story.'\r
        }}</span\r
        ><small>{{\r
          publication.shared\r
            ? runtime.roomSubmitted()\r
              ? 'Submission confirmed by the class museum.'\r
              : 'Draft saves on this device. Submit to add your room to the class museum.'\r
            : 'Local preview \xB7 saves and submissions stay on this device.'\r
        }}</small>\r
      </div>\r
      @if (!runtime.roomSubmitted()) {\r
        <button\r
          type="button"\r
          class="primary"\r
          [disabled]="!runtime.canEditRoom()"\r
          (click)="submit()"\r
        >\r
          {{ publication.submitting() ? 'Submitting your room\u2026' : 'Submit my room' }}\r
          <span aria-hidden="true">\u2197</span>\r
        </button>\r
      }\r
    </footer>\r
  } @else {\r
    <section class="unassigned">\r
      <h1>Your room is being prepared.</h1>\r
      <p>Your teacher needs to assign you a museum room before you can add exhibits.</p>\r
    </section>\r
  }\r
</main>\r
`, styles: ['/* src/app/templates/exhibit-hall/rooms/student-room-workspace.component.scss */\n:host {\n  display: block;\n  background:\n    linear-gradient(\n      120deg,\n      #f8f1e2,\n      #f0e5cb);\n  color: #243f50;\n  min-height: 100vh;\n  font: 14px/1.5 Arial, sans-serif;\n}\napp-museum-scene {\n  --museum-scene-height: clamp(340px, calc(100svh - 355px), 560px);\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: default;\n  opacity: 0.5;\n}\n.room-workspace {\n  max-width: 1700px;\n  margin: auto;\n  padding: 0 34px 26px;\n}\n.workspace-header {\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  justify-content: space-between;\n  min-height: 92px;\n  border-bottom: 1px solid #d8cfbb;\n  border-top: 4px solid #23495b;\n  box-shadow: 0 -2px 0 #bc8b39;\n}\n.museum-brand {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.museum-monogram {\n  font: 29px Georgia, serif;\n  border: 1px solid #a7874a;\n  padding: 3px 10px;\n  outline: 1px solid #b79b63;\n  outline-offset: 3px;\n  background: #23495b;\n  color: #e3c787;\n}\n.museum-brand div {\n  display: flex;\n  flex-direction: column;\n}\n.museum-brand div > span {\n  font-size: 9px;\n  letter-spacing: 0.14em;\n  color: #757665;\n}\n.museum-brand strong {\n  font: 21px/1.5 Georgia, serif;\n}\n.assignment {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.assignment i {\n  width: 6px;\n  height: 6px;\n  background: #477c80;\n  border-radius: 50%;\n}\n.assignment span {\n  border-left: 1px solid #c9c0ab;\n  padding-left: 12px;\n  margin-left: 3px;\n  color: #777967;\n  font-weight: 400;\n}\n.save-indicator {\n  font-size: 11px;\n  color: #6d725e;\n}\n.room-introduction {\n  padding: 29px 0 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n}\n.eyebrow {\n  font-size: 9px;\n  font-weight: bold;\n  letter-spacing: 0.14em;\n  color: #95743b;\n}\nh1 {\n  font: 38px/1.15 Georgia, serif;\n  font-weight: 400;\n  margin: 9px 0 12px;\n  letter-spacing: -0.02em;\n}\n.room-introduction p {\n  font-size: 13px;\n  color: #727461;\n  margin: 0;\n  max-width: 760px;\n  line-height: 1.6;\n}\n.room-actions {\n  flex: none;\n}\n.secondary {\n  border: 1px solid #bcb097;\n  color: #294c60;\n  background: #faf7ee;\n  padding: 11px 17px;\n  border-radius: 4px;\n  font-size: 12px;\n  min-height: 43px;\n}\n.secondary:hover {\n  background: #e8e6d7;\n}\n.primary {\n  background: #23495b;\n  color: #fff8e7;\n  border: 1px solid #23495b;\n  border-radius: 4px;\n  min-height: 46px;\n  padding: 12px 22px;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.primary:hover:enabled {\n  background: #163747;\n}\n.primary span {\n  margin-left: 20px;\n}\n.wide {\n  width: 100%;\n  margin-top: 12px;\n}\n.studio-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 325px;\n  gap: 24px;\n  align-items: start;\n}\n.room-stage {\n  min-width: 0;\n}\n.curator-panel {\n  background: #fffaf0;\n  border: 1px solid #d9cfb7;\n  border-radius: 4px;\n  border-top: 3px solid #b28c4c;\n  box-shadow: inset 0 3px #23495b;\n  padding: 25px 23px;\n  min-height: 495px;\n}\n.panel-heading {\n  border-bottom: 1px solid #e1d8c5;\n  margin-bottom: 20px;\n  padding-bottom: 13px;\n}\n.panel-heading h2 {\n  font: 24px/1.25 Georgia, serif;\n  font-weight: 400;\n  margin: 9px 0 0;\n}\n.panel-intro {\n  font-size: 12px;\n  color: #6a6f5d;\n  margin: 0 0 20px;\n  line-height: 1.7;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  margin: 17px 0 7px;\n  color: #365063;\n}\nlabel small {\n  float: right;\n  font-size: 10px;\n  color: #969481;\n  font-weight: 400;\n}\ninput,\ntextarea {\n  width: 100%;\n  border: 1px solid #cfc4aa;\n  border-radius: 3px;\n  background: #fffdf7;\n  color: #263f50;\n  padding: 11px 12px;\n  font-size: 12px;\n  line-height: 1.55;\n}\ntextarea {\n  resize: vertical;\n  min-height: 70px;\n}\ninput::placeholder,\ntextarea::placeholder {\n  color: #989584;\n}\n.curator-tip {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  background: #eee7d5;\n  border: 1px solid #d9ccaf;\n  padding: 12px;\n  margin: 20px 0 12px;\n  border-radius: 3px;\n  color: #70765b;\n}\n.curator-tip > span {\n  font-size: 20px;\n  color: #9b8649;\n  line-height: 1;\n}\n.curator-tip p {\n  font-size: 11px;\n  line-height: 1.65;\n  margin: 0;\n}\n.display-selector {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 12px;\n}\n.display-selector button {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  text-align: left;\n  min-height: 63px;\n  padding: 11px;\n  border: 1px solid #d4c9b1;\n  border-radius: 4px;\n  background: #fffaf0;\n  color: #345367;\n  min-width: 0;\n}\n.display-selector button[aria-pressed=true] {\n  background: #23495b;\n  border-color: #23495b;\n  color: #fff8e7;\n}\n.display-selector button > span:nth-child(2) {\n  display: block;\n  min-width: 0;\n  flex: 1;\n}\n.display-selector strong {\n  display: block;\n  font-size: 11px;\n}\n.display-selector small {\n  display: block;\n  font-size: 9px;\n  opacity: 0.67;\n  margin-top: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.display-number {\n  font: 22px Georgia, serif;\n  color: #b89450;\n}\n.display-selector i {\n  width: 5px;\n  height: 5px;\n  border: 1px solid #9b947b;\n  border-radius: 50%;\n  flex: none;\n}\n.display-selector i.filled {\n  background: #b79350;\n  border-color: #b79350;\n}\n.room-footnote {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  color: #91917c;\n  font-size: 10px;\n  margin-top: 11px;\n}\n.artifact-library {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.artifact-library button {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  padding: 15px 12px;\n  border: 1px solid #d5cab0;\n  background: #f7f3e7;\n  border-radius: 4px;\n  color: #345367;\n  min-height: 83px;\n}\n.artifact-library button:hover:enabled {\n  background: #e9edeb;\n  border-color: #8ba2a4;\n}\n.artifact-library button > span:nth-child(2) {\n  flex: 1;\n}\n.artifact-library strong {\n  font: 17px/1.25 Georgia, serif;\n  font-weight: 400;\n  display: block;\n}\n.artifact-library small {\n  font-size: 9px;\n  color: #93917d;\n  margin-top: 6px;\n  display: block;\n}\n.artifact-symbol {\n  font-size: 32px;\n  color: #a88448;\n  width: 33px;\n  text-align: center;\n}\n.artifact-library button > span:last-child {\n  font-size: 23px;\n  font-weight: 300;\n}\n.source-credit {\n  font-size: 10px;\n  line-height: 1.7;\n  color: #797760;\n  border-top: 1px solid #e0d6be;\n  margin-top: 17px;\n  padding-top: 11px;\n}\n.source-credit summary {\n  cursor: pointer;\n  color: #426276;\n}\n.source-credit a {\n  color: #345c74;\n  text-underline-offset: 3px;\n  overflow-wrap: anywhere;\n}\n.artifact-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  border-top: 1px solid #e0d6be;\n  padding-top: 9px;\n  margin-top: 14px;\n}\n.text-button {\n  background: none;\n  border: 0;\n  font-size: 10px;\n  color: #426276;\n  padding: 10px 0;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.text-button.remove {\n  color: #93745a;\n}\n.curator-panel h3 {\n  font: 24px/1.3 Georgia, serif;\n}\n.curator-panel p {\n  font-size: 12px;\n  line-height: 1.7;\n}\n.curator-panel h4 {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n}\n.muted {\n  color: #99937b;\n}\n.submission-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 21px 0 0;\n  margin-top: 23px;\n  border-top: 1px solid #d8cfb9;\n}\n.submission-bar div {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.submission-bar strong {\n  font: 19px Georgia, serif;\n  font-weight: 400;\n}\n.submission-bar span {\n  font-size: 11px;\n  color: #80816d;\n}\n.submission-bar small {\n  font-size: 9px;\n  color: #989783;\n  margin-top: 3px;\n}\n.validation {\n  border: 1px solid #bd9971;\n  background: #fff4dc;\n  padding: 18px;\n  color: #6c4932;\n  margin-top: 20px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n.validation ul {\n  padding-left: 20px;\n}\n.validation p {\n  margin: 0;\n}\n.validation button {\n  margin-top: 8px;\n  background: #fffaf0;\n  border: 1px solid #b7986e;\n  padding: 8px;\n  border-radius: 3px;\n  color: #6c4932;\n}\n.museum-return {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 22px 0;\n}\n.museum-return button {\n  background: #faf5e7;\n  border: 1px solid #cdbf9d;\n  padding: 12px;\n  border-radius: 4px;\n  color: #345367;\n}\n.museum-return span {\n  font-size: 12px;\n  color: #81816a;\n}\n.unassigned {\n  padding: 80px 0;\n}\nbutton:focus-visible,\na:focus-visible,\nsummary:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #a9803b;\n  outline-offset: 3px;\n}\n@media (min-width: 1500px) {\n  .studio-grid {\n    grid-template-columns: minmax(0, 1fr) 355px;\n  }\n  .curator-panel {\n    padding: 28px;\n  }\n}\n@media (max-width: 1050px) {\n  .room-workspace {\n    padding: 0 20px 25px;\n  }\n  .studio-grid {\n    grid-template-columns: minmax(0, 1fr) 290px;\n    gap: 15px;\n  }\n  .curator-panel {\n    padding: 20px 17px;\n  }\n  .assignment span {\n    display: none;\n  }\n  .display-selector {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  h1 {\n    font-size: 32px;\n  }\n}\n@media (max-width: 760px) {\n  .workspace-header {\n    min-height: 77px;\n    gap: 12px;\n  }\n  .museum-brand div > span {\n    font-size: 7px;\n  }\n  .museum-brand strong {\n    font-size: 17px;\n  }\n  .museum-monogram {\n    font-size: 23px;\n  }\n  .save-indicator {\n    display: none;\n  }\n  .assignment {\n    font-size: 10px;\n  }\n  .room-introduction {\n    display: block;\n    padding: 23px 0 18px;\n  }\n  .room-actions {\n    margin-top: 16px;\n  }\n  .studio-grid {\n    grid-template-columns: 1fr;\n  }\n  .curator-panel {\n    min-height: 0;\n  }\n  .room-footnote span:last-child {\n    display: none;\n  }\n  .submission-bar {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .submission-bar .primary {\n    width: 100%;\n  }\n  .museum-return span {\n    display: none;\n  }\n  .room-workspace {\n    padding: 0 13px 20px;\n  }\n}\n/*# sourceMappingURL=student-room-workspace.component.css.map */\n'] }]
  }], () => [], { panelHeading: [{ type: ViewChild, args: ["panelHeading", { isSignal: true }] }], validationPanel: [{ type: ViewChild, args: ["validationPanel", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentRoomWorkspaceComponent, { className: "StudentRoomWorkspaceComponent", filePath: "src/app/templates/exhibit-hall/rooms/student-room-workspace.component.ts", lineNumber: 28 });
})();

// src/app/templates/exhibit-hall/ui/exhibit-hall-page.component.ts
var _c03 = () => ({});
function ExhibitHallPageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-student-room-workspace");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.usingStarter() ? ctx_r1.runtime.startOwnDraft() : ctx_r1.runtime.openComposer());
    });
    \u0275\u0275text(1, " My exhibit ");
    \u0275\u0275elementEnd();
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_56_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-object-model-viewer", 27);
  }
  if (rf & 2) {
    \u0275\u0275property("model", ctx)("autoLoad", true);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 18)(1, "h1");
    \u0275\u0275text(2, "What story can two objects tell?");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ExhibitHallPageComponent_Conditional_1_Conditional_56_Conditional_3_Template, 1, 2, "app-object-model-viewer", 27);
    \u0275\u0275elementStart(4, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_56_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.usingStarter() ? ctx_r1.runtime.startOwnDraft() : ctx_r1.runtime.openComposer());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.runtime.composerDraft().objects[0]?.model) ? 3 : -1, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.usingStarter() ? "Examine my objects" : "Continue my exhibit", " \u2192 ");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 19)(1, "div", 28);
    \u0275\u0275text(2, "\u25C7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Family publication is private by default");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "The public gallery is not open yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " A teacher must close the live opening and enable the time-limited family view. Question cards, defenses, grades, presence, private names, and empty locations will stay hidden. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_58_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.setRole("teacher"));
    });
    \u0275\u0275text(10, " Return to teacher preview ");
    \u0275\u0275elementEnd()();
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-teacher-hall-desk", 35);
    \u0275\u0275listener("collapsedChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_collapsedChanged_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.teacherDeskOpen.set(!$event));
    })("phaseChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_phaseChanged_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.setHallPhase($event));
    })("navigationChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_navigationChanged_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.setNavigationMode($event));
    })("controlToggled", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_controlToggled_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.toggleControl($event));
    })("pointed", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_pointed_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.pointTo($event));
    })("docentsSelected", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_docentsSelected_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.selectDocents($event));
    })("resetRequested", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template_app_teacher_hall_desk_resetRequested_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.resetDemo());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("state", ctx_r1.runtime.state())("locations", ctx_r1.runtime.locations())("unpublishedTeams", ctx_r1.runtime.unpublishedTeams())("collapsed", !ctx_r1.runtime.teacherDeskOpen());
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-hall-corridor", 36);
    \u0275\u0275listener("opened", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_3_Template_app_hall_corridor_opened_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.openHanging($event));
    })("pointed", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_3_Template_app_hall_corridor_pointed_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.pointTo($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("locations", ctx_r1.runtime.locations())("focusedHangingId", ctx_r1.runtime.focusedHangingId())("emptyLabel", ctx_r1.runtime.config.template.theme.emptyLocationLabel)("teacherMode", ctx_r1.runtime.role() === "teacher");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-accessible-gallery-list", 37);
    \u0275\u0275listener("opened", function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_4_Template_app_accessible_gallery_list_opened_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.openHanging($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("locations", ctx_r1.runtime.locations())("focusedHangingId", ctx_r1.runtime.focusedHangingId())("emptyLabel", ctx_r1.runtime.config.template.theme.emptyLocationLabel);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Upcoming wings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "i");
    \u0275\u0275element(6, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Tour the open Nile wing now. The remaining walk-ups and video presentations will be connected later. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.comingSoonCount(), " walk-ups coming soon");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", 25, "%");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Question cards");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "i");
    \u0275\u0275element(6, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Visit every Egyptian collection and post two thoughtful questions.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.responseProgress().current, " of ", ctx_r1.runtime.responseProgress().target, " posted");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.runtime.responseProgress().current / ctx_r1.runtime.responseProgress().target * 100, "%");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div")(2, "span");
    \u0275\u0275text(3, "Gallery walk progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "i");
    \u0275\u0275element(7, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Conditional_8_Template, 9, 3)(9, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Conditional_9_Template, 9, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.visitProgress().current, " of ", ctx_r1.runtime.visitProgress().target, " visits");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.runtime.visitProgress().current / ctx_r1.runtime.visitProgress().target * 100, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.comingSoonCount() > 0 ? 8 : 9);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275conditionalCreate(1, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_1_Template, 1, 4, "app-teacher-hall-desk", 30);
    \u0275\u0275elementStart(2, "section", 31);
    \u0275\u0275conditionalCreate(3, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_3_Template, 1, 4, "app-hall-corridor", 32)(4, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_4_Template, 1, 3, "app-accessible-gallery-list", 33);
    \u0275\u0275conditionalCreate(5, ExhibitHallPageComponent_Conditional_1_Conditional_59_Conditional_5_Template, 10, 5, "div", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("with-desk", ctx_r1.runtime.role() === "teacher");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.role() === "teacher" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.viewMode() === "corridor" ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.role() === "student" ? 5 : -1);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275element(1, "i");
    \u0275\u0275text(2, " Class standing here");
    \u0275\u0275elementEnd();
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.openDefense());
    });
    \u0275\u0275text(1, "Defend");
    \u0275\u0275elementEnd();
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-exhibit-render-host", 46);
  }
  if (rf & 2) {
    const location_r11 = \u0275\u0275nextContext();
    \u0275\u0275property("snapshot", location_r11.snapshot);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-peer-response-rail", 50);
    \u0275\u0275listener("draftChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template_app_peer_response_rail_draftChanged_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.updatePeerDraft($event));
    })("draftBlurred", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template_app_peer_response_rail_draftBlurred_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.savePeerDraft());
    })("posted", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template_app_peer_response_rail_posted_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.postPeerResponse($event));
    })("moderated", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template_app_peer_response_rail_moderated_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.moderateResponse($event.responseId, $event.action));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("prompt", ctx_r1.runtime.config.template.peerResponse.prompt)("responseName", ctx_r1.runtime.config.template.vocabulary.peerResponseName)("maxWords", ctx_r1.runtime.config.template.peerResponse.maxWords)("responses", ctx_r1.runtime.selectedResponses())("draft", ctx_r1.runtime.selectedDraft())("canRespond", ctx_r1.runtime.canRespondAtSelected())("teacherMode", ctx_r1.runtime.role() === "teacher");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 21)(1, "header", 38)(2, "button", 39);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.closeWalkUp());
    });
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "\u2190");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Back to hall ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h1", 40);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 41);
    \u0275\u0275conditionalCreate(12, ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_12_Template, 3, 0, "strong");
    \u0275\u0275elementStart(13, "button", 42);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.printSelected());
    });
    \u0275\u0275text(14, " Print ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_15_Template, 2, 0, "button", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 44)(17, "main", 45);
    \u0275\u0275conditionalCreate(18, ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_18_Template, 1, 1, "app-exhibit-render-host", 46);
    \u0275\u0275elementStart(19, "nav", 47)(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_60_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.closeWalkUp());
    });
    \u0275\u0275text(23, "Browse all frames");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(24, ExhibitHallPageComponent_Conditional_1_Conditional_60_Conditional_24_Template, 1, 7, "app-peer-response-rail", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const location_r11 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-labelledby", "walkup-title-" + location_r11.locationId);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2("", location_r11.team.displayName, " \xB7 Snapshot v", location_r11.snapshot?.version);
    \u0275\u0275advance();
    \u0275\u0275property("id", "walkup-title-" + location_r11.locationId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", location_r11.snapshot?.accessibleData?.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(location_r11.hanging?.id === ctx_r1.runtime.focusedHangingId() ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.runtime.role() === "student" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("family", ctx_r1.runtime.role() === "family");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(location_r11.snapshot ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Location ", location_r11.position + 1, " of ", ctx_r1.runtime.locations().length);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.runtime.role() !== "family" ? 24 : -1);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-artifact-composer", 51);
    \u0275\u0275listener("closed", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_closed_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.closeComposer());
    })("titleChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_titleChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateBoardTitle($event));
    })("claimChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_claimChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateBoardClaim($event));
    })("objectChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_objectChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateObject($event.objectId, $event.field, $event.value));
    })("sourceChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_sourceChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateSource($event.sourceId, $event.citation));
    })("galleryTitleChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_galleryTitleChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateGalleryTitle($event));
    })("galleryEmbedChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_galleryEmbedChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateGalleryEmbed($event));
    })("videoTitleChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_videoTitleChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateVideoTitle($event));
    })("videoUrlChanged", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_videoUrlChanged_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.updateVideoUrl($event));
    })("publishedRequested", function ExhibitHallPageComponent_Conditional_1_Conditional_61_Template_app_artifact_composer_publishedRequested_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.publishBoard());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("starterExample", ctx_r1.runtime.usingStarter())("draft", ctx_r1.runtime.composerDraft())("previewSnapshot", ctx_r1.previewSnapshot())("validation", ctx_r1.runtime.composerValidation())("publishLabel", ctx_r1.myBoardPublished() ? "Update showcase" : ctx_r1.runtime.config.template.vocabulary.publishAction)("published", ctx_r1.myBoardPublished())("rehangsRemaining", ctx_r1.runtime.rehangsRemaining())("submissionLocked", ctx_r1.runtime.state().hall.controls.submissionLocked);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-defense-panel", 52);
    \u0275\u0275listener("closed", function ExhibitHallPageComponent_Conditional_1_Conditional_62_Template_app_defense_panel_closed_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeDefense());
    })("draftSaved", function ExhibitHallPageComponent_Conditional_1_Conditional_62_Template_app_defense_panel_draftSaved_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.saveDefenseDraft($event.answers, $event.mode));
    })("submitted", function ExhibitHallPageComponent_Conditional_1_Conditional_62_Template_app_defense_panel_submitted_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.submitDefense($event.answers, $event.mode));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("prompts", ctx_r1.runtime.config.template.defense.prompts)("fallbackChallenge", ctx_r1.runtime.config.template.defense.fallbackChallenge)("initialAnswers", ctx_r1.runtime.currentDefense()?.answers ?? \u0275\u0275pureFunction0(4, _c03))("alreadySubmitted", ctx_r1.runtime.currentDefense()?.status === "submitted");
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 12);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 53);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_63_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.clearNotification());
    });
    \u0275\u0275text(6, " \xD7 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx);
  }
}
function ExhibitHallPageComponent_Conditional_1_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 12);
    \u0275\u0275text(2, "!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 54);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Conditional_64_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.clearError());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx);
  }
}
function ExhibitHallPageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 0);
    \u0275\u0275text(1, "Skip to exhibits");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 1)(3, "div", 2)(4, "app-workspace-tools")(5, "header", 3)(6, "div", 4)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "nav", 5)(12, "button", 6);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.browsingHall.set(true);
      return \u0275\u0275resetView(ctx_r1.runtime.composerOpen.set(false));
    });
    \u0275\u0275text(13, " Exhibit hall ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, ExhibitHallPageComponent_Conditional_1_Conditional_14_Template, 2, 0, "button", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "details", 8)(16, "summary");
    \u0275\u0275text(17, "View");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Preview as");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 9)(21, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.setRole("student"));
    });
    \u0275\u0275text(22, " Student ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.setRole("teacher"));
    });
    \u0275\u0275text(24, " Teacher ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.setRole("family"));
    });
    \u0275\u0275text(26, " Family ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 11)(28, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.setViewMode("corridor"));
    });
    \u0275\u0275elementStart(29, "span", 12);
    \u0275\u0275text(30, "\u25A5");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Immersive corridor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 10);
    \u0275\u0275listener("click", function ExhibitHallPageComponent_Conditional_1_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.setViewMode("list"));
    });
    \u0275\u0275elementStart(33, "span", 12);
    \u0275\u0275text(34, "\u2637");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " Accessible list ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "app-task-guide", 13)(37, "p");
    \u0275\u0275text(38, " Look closely at two objects. Find a connection. Use sources to check your idea, then build the labels that help a visitor see it. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "div", 14)(40, "div");
    \u0275\u0275element(41, "i");
    \u0275\u0275elementStart(42, "strong");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 15)(47, "span", 12);
    \u0275\u0275text(48, "\u25F7");
    \u0275\u0275elementEnd();
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 16)(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "small");
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "main", 17);
    \u0275\u0275conditionalCreate(56, ExhibitHallPageComponent_Conditional_1_Conditional_56_Template, 6, 2, "section", 18);
    \u0275\u0275elementStart(57, "div", 2);
    \u0275\u0275conditionalCreate(58, ExhibitHallPageComponent_Conditional_1_Conditional_58_Template, 11, 0, "section", 19)(59, ExhibitHallPageComponent_Conditional_1_Conditional_59_Template, 6, 5, "div", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(60, ExhibitHallPageComponent_Conditional_1_Conditional_60_Template, 25, 13, "section", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(61, ExhibitHallPageComponent_Conditional_1_Conditional_61_Template, 1, 8, "app-artifact-composer", 22);
    \u0275\u0275conditionalCreate(62, ExhibitHallPageComponent_Conditional_1_Conditional_62_Template, 1, 5, "app-defense-panel", 23);
    \u0275\u0275conditionalCreate(63, ExhibitHallPageComponent_Conditional_1_Conditional_63_Template, 7, 1, "div", 24);
    \u0275\u0275conditionalCreate(64, ExhibitHallPageComponent_Conditional_1_Conditional_64_Template, 7, 1, "div", 25);
    \u0275\u0275elementStart(65, "div", 26);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_25_0;
    let tmp_28_0;
    let tmp_29_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("teacher-view", ctx_r1.runtime.role() === "teacher")("family-view", ctx_r1.runtime.role() === "family");
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r1.runtime.composerOpen());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.classLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.config.title);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.runtime.role() === "student" ? 14 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("active", ctx_r1.runtime.role() === "student");
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.role() === "student");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.runtime.role() === "teacher");
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.role() === "teacher");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.runtime.role() === "family");
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.role() === "family");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.runtime.viewMode() === "corridor");
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.viewMode() === "corridor");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.runtime.viewMode() === "list");
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.viewMode() === "list");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.phaseLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().hall.controls.navigationMode.replace("_", " "));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.runtime.config.openingLabel, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.roleLabel());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.saveState().replace("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.role() === "student" && !ctx_r1.browsingHall() ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("hidden", ctx_r1.runtime.role() === "student" && !ctx_r1.browsingHall());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.role() === "family" && ctx_r1.runtime.locations().length === 0 ? 58 : 59);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_25_0 = ctx_r1.runtime.walkUpOpen() && ctx_r1.runtime.selectedLocation()) ? 60 : -1, tmp_25_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.composerOpen() ? 61 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.defenseOpen() ? 62 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_28_0 = ctx_r1.runtime.notification()) ? 63 : -1, tmp_28_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_29_0 = ctx_r1.runtime.error()) ? 64 : -1, tmp_29_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.liveAnnouncement(), " ");
  }
}
var ExhibitHallPageComponent = class _ExhibitHallPageComponent {
  browsingHall = signal(
    false,
    ...ngDevMode ? [{ debugName: "browsingHall" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runtime = inject(ExhibitHallRuntimeService);
  previewSnapshot = computed(
    () => ({
      id: "composer-preview",
      artifactId: `artifact-${this.runtime.config.viewer.teamId}`,
      version: this.runtime.state().snapshots.filter((snapshot) => snapshot.artifactId === `artifact-${this.runtime.config.viewer.teamId}`).length + 1,
      rendererType: this.runtime.config.template.rendererType,
      rendererVersion: 1,
      visitorSafeData: this.runtime.composerDraft(),
      accessibleData: {
        title: this.runtime.composerDraft().title,
        summary: this.runtime.composerDraft().centralClaim,
        sections: []
      },
      createdBy: this.runtime.actor().id,
      createdAt: ""
    }),
    ...ngDevMode ? [{ debugName: "previewSnapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  myBoardPublished = computed(
    () => this.runtime.state().artifacts.some((artifact) => artifact.ownerId === this.runtime.config.viewer.teamId && artifact.status === "published"),
    ...ngDevMode ? [{ debugName: "myBoardPublished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  phaseLabel = computed(
    () => {
      const phase = this.runtime.state().hallPhase;
      if (phase === "async_walk")
        return "Gallery walk open";
      if (phase === "live_opening")
        return "Live opening";
      if (phase === "closed_readable")
        return "Student & family showcase open";
      return "Hall dark";
    },
    ...ngDevMode ? [{ debugName: "phaseLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  roleLabel = computed(
    () => {
      if (this.runtime.role() === "teacher")
        return this.runtime.config.viewer.teacherDisplayName;
      if (this.runtime.role() === "family")
        return "Family visitor";
      const team = this.runtime.config.teams.find((item) => item.id === this.runtime.config.viewer.teamId);
      return `${this.runtime.config.viewer.studentDisplayName} \xB7 ${team?.displayName ?? "Student curator"}`;
    },
    ...ngDevMode ? [{ debugName: "roleLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedBoard = computed(
    () => {
      const value = this.runtime.selectedLocation()?.snapshot?.visitorSafeData;
      return typeof value === "object" && value !== null && "objects" in value ? value : void 0;
    },
    ...ngDevMode ? [{ debugName: "selectedBoard" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closeDefense() {
    this.runtime.defenseOpen.set(false);
  }
  static \u0275fac = function ExhibitHallPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExhibitHallPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExhibitHallPageComponent, selectors: [["app-exhibit-hall-page"]], decls: 2, vars: 1, consts: [["href", "#hall-content", 1, "skip-link"], [1, "hall-shell"], [3, "hidden"], [1, "topbar"], [1, "project-title"], ["aria-label", "Project spaces"], ["type", "button", 1, "active", 3, "click"], ["type", "button"], [1, "viewer-menu"], ["role", "group", "aria-label", "Preview role"], ["type", "button", 3, "click"], ["role", "group", "aria-label", "Gallery view", 1, "view-switch"], ["aria-hidden", "true"], ["title", "Curator guide"], ["role", "status", 1, "hall-status"], [1, "opening-label"], [1, "identity"], ["id", "hall-content"], [1, "curator-start"], [1, "family-gate"], [1, "hall-layout", 3, "with-desk"], ["role", "dialog", "aria-modal", "true", 1, "walkup"], [3, "starterExample", "draft", "previewSnapshot", "validation", "publishLabel", "published", "rehangsRemaining", "submissionLocked"], [3, "prompts", "fallbackChallenge", "initialAnswers", "alreadySubmitted"], ["role", "status", 1, "notice", "toast"], ["role", "alert", 1, "notice", "error"], ["aria-live", "polite", "aria-atomic", "true", 1, "sr-only"], [1, "curator-object", 3, "model", "autoLoad"], ["aria-hidden", "true", 1, "family-mark"], [1, "hall-layout"], [3, "state", "locations", "unpublishedTeams", "collapsed"], ["aria-label", "Exhibit collection", 1, "gallery-space"], [3, "locations", "focusedHangingId", "emptyLabel", "teacherMode"], [3, "locations", "focusedHangingId", "emptyLabel"], [1, "gallery-progress"], [3, "collapsedChanged", "phaseChanged", "navigationChanged", "controlToggled", "pointed", "docentsSelected", "resetRequested", "state", "locations", "unpublishedTeams", "collapsed"], [3, "opened", "pointed", "locations", "focusedHangingId", "emptyLabel", "teacherMode"], [3, "opened", "locations", "focusedHangingId", "emptyLabel"], [1, "walkup-header"], ["type", "button", 1, "back", 3, "click"], [3, "id"], [1, "walkup-actions"], ["type", "button", "aria-label", "Print this exhibit", 3, "click"], ["type", "button", 1, "defend"], [1, "walkup-layout"], [1, "artifact-stage"], ["mode", "walkup", 3, "snapshot"], ["aria-label", "Adjacent exhibits"], [3, "prompt", "responseName", "maxWords", "responses", "draft", "canRespond", "teacherMode"], ["type", "button", 1, "defend", 3, "click"], [3, "draftChanged", "draftBlurred", "posted", "moderated", "prompt", "responseName", "maxWords", "responses", "draft", "canRespond", "teacherMode"], [3, "closed", "titleChanged", "claimChanged", "objectChanged", "sourceChanged", "galleryTitleChanged", "galleryEmbedChanged", "videoTitleChanged", "videoUrlChanged", "publishedRequested", "starterExample", "draft", "previewSnapshot", "validation", "publishLabel", "published", "rehangsRemaining", "submissionLocked"], [3, "closed", "draftSaved", "submitted", "prompts", "fallbackChallenge", "initialAnswers", "alreadySubmitted"], ["type", "button", "aria-label", "Dismiss notification", 3, "click"], ["type", "button", "aria-label", "Dismiss error", 3, "click"]], template: function ExhibitHallPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ExhibitHallPageComponent_Conditional_0_Template, 1, 0, "app-student-room-workspace")(1, ExhibitHallPageComponent_Conditional_1_Template, 67, 37);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.runtime.config.museum ? 0 : 1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    StudentRoomWorkspaceComponent,
    ObjectModelViewerComponent,
    TaskGuideComponent,
    AccessibleGalleryListComponent,
    ArtifactComposerComponent,
    DefensePanelComponent,
    ExhibitRenderHostComponent,
    HallCorridorComponent,
    PeerResponseRailComponent,
    TeacherHallDeskComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  color: #292621;\n  background:\n    radial-gradient(\n      circle at 12% 5%,\n      #efe1be 0,\n      transparent 25rem),\n    #e7e1d8;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.hall-shell[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n}\n.skip-link[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 200;\n  top: 0.4rem;\n  left: 0.4rem;\n  padding: 0.7rem 1rem;\n  color: white;\n  background: #0c6674;\n  transform: translateY(-150%);\n}\n.skip-link[_ngcontent-%COMP%]:focus {\n  transform: none;\n}\n.topbar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 20;\n  display: grid;\n  grid-template-columns: auto minmax(11rem, 1fr) auto auto;\n  align-items: center;\n  min-height: 4.6rem;\n  border-bottom: 0.22rem solid #a97732;\n  color: #f8efe0;\n  background:\n    linear-gradient(\n      110deg,\n      #121419,\n      #292522 56%,\n      #302820);\n  box-shadow: 0 0.35rem 1.2rem rgba(10, 8, 6, 0.4196078431);\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  height: 100%;\n  border-right: 1px solid #4b4238;\n  padding: 0.65rem 1rem;\n  color: inherit;\n  text-decoration: none;\n}\n.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: grid;\n  width: 2.45rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.15rem double #d6b66f;\n  transform: rotate(45deg);\n  color: #e6c678;\n  font: 900 1.15rem Georgia, serif;\n}\n.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child::first-letter {\n  transform: rotate(-45deg);\n}\n.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n}\n.brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 800 0.9rem Georgia, serif;\n  letter-spacing: 0.05em;\n}\n.brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #ae9e8b;\n  font-size: 0.5rem;\n  text-transform: uppercase;\n}\n.project-title[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  padding: 0.5rem 1rem;\n}\n.project-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d4b56e;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.project-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font: 800 1.15rem Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.topbar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-self: stretch;\n}\n.topbar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-left: 1px solid #494138;\n  padding: 0.5rem 0.9rem;\n  color: #cfc3b4;\n  background: transparent;\n  font-weight: 800;\n}\n.topbar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff4d8;\n  background: rgba(117, 83, 38, 0.4);\n  box-shadow: inset 0 -0.2rem #deb75f;\n}\n.viewer-menu[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  border-left: 1px solid #4c4339;\n  padding: 0.5rem 0.8rem;\n}\n.viewer-menu[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #ad9e8a;\n  font-size: 0.48rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.viewer-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n}\n.viewer-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 1.8rem;\n  border: 1px solid #655b4f;\n  padding: 0.25rem 0.45rem;\n  color: #cfc6ba;\n  background: #25221f;\n  font-size: 0.55rem;\n  font-weight: 800;\n}\n.viewer-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  border-left: 0;\n}\n.viewer-menu[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #33240f;\n  background: #dfba68;\n}\n.hall-status[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  min-height: 2.4rem;\n  border-bottom: 1px solid #c5b89f;\n  padding: 0.35rem max(1rem, (100vw - 90rem) / 2);\n  color: #675b4d;\n  background: #f4eddd;\n  font-size: 0.6rem;\n}\n.hall-status[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.hall-status[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child   i[_ngcontent-%COMP%] {\n  width: 0.48rem;\n  height: 0.48rem;\n  border-radius: 50%;\n  background: #4b8a51;\n  box-shadow: 0 0 0.4rem #4e9357;\n}\n.hall-status[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child   span[_ngcontent-%COMP%] {\n  border-left: 1px solid #c6b89f;\n  padding-left: 0.45rem;\n  text-transform: capitalize;\n}\n.opening-label[_ngcontent-%COMP%] {\n  justify-self: center;\n  color: #795425;\n  font-weight: 800;\n}\n.identity[_ngcontent-%COMP%] {\n  justify-self: end;\n}\n.identity[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 0.18rem 0.4rem;\n  color: #315f41;\n  background: #d9e7d2;\n  text-transform: capitalize;\n}\nmain[_ngcontent-%COMP%] {\n  display: block;\n}\n.hall-introduction[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1.2rem;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto;\n  padding: 1.6rem 0 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #89602b;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.hall-introduction[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.12rem 0 0.3rem;\n  font: 800 clamp(2rem, 5vw, 3.7rem)/0.98 Georgia, serif;\n  letter-spacing: -0.035em;\n}\n.hall-introduction[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 48rem;\n  margin: 0;\n  color: #655b4f;\n  line-height: 1.5;\n}\n.hall-introduction[_ngcontent-%COMP%]   .prototype-scope[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  align-items: center;\n  margin-top: 0.7rem;\n  border-left: 0.22rem solid #a97732;\n  padding: 0.5rem 0.7rem;\n  color: #4f473d;\n  background: rgba(246, 238, 221, 0.7490196078);\n  font-size: 0.72rem;\n}\n.prototype-scope[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #795425;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.hall-introduction[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(5.5rem, 1fr));\n  align-self: center;\n  margin: 0;\n  border: 1px solid #c8baa0;\n  border-radius: 0.5rem;\n  background: #f6f0e5;\n  box-shadow: 0 0.3rem 0.8rem rgba(63, 48, 27, 0.0705882353);\n}\n.hall-introduction[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-height: 4.7rem;\n  padding: 0.55rem;\n}\n.hall-introduction[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-left: 1px solid #d4c8b3;\n}\n.hall-introduction[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #7e6e59;\n  font-size: 0.52rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.hall-introduction[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #573c1b;\n  font: 800 1.5rem Georgia, serif;\n}\n.hall-introduction[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 0.18rem;\n  color: #8c7a64;\n  font-size: 0.65rem;\n}\n.hall-toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 1rem;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto 0.75rem;\n  border: 1px solid #c6b89e;\n  border-radius: 0.45rem;\n  padding: 0.45rem;\n  background: #f7f2e9;\n}\n.view-switch[_ngcontent-%COMP%] {\n  display: flex;\n}\n.view-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.my-board[_ngcontent-%COMP%] {\n  min-height: 2.55rem;\n  border: 1px solid #b9aa91;\n  padding: 0.48rem 0.72rem;\n  color: #534737;\n  background: #eee5d5;\n  font-size: 0.67rem;\n  font-weight: 850;\n}\n.view-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  border-left: 0;\n}\n.view-switch[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: white;\n  border-color: #295f68;\n  background: #2d6871;\n}\n.view-switch[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.my-board[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 0.3rem;\n}\n.hall-toolbar[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6d6254;\n  font-size: 0.66rem;\n  text-align: center;\n}\n.hall-toolbar[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #855b22;\n}\n.my-board[_ngcontent-%COMP%] {\n  color: #33240f;\n  border-color: #be984f;\n  border-radius: 0.25rem;\n  background: #e0bd6e;\n}\n.hall-layout[_ngcontent-%COMP%] {\n  display: block;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto 1.5rem;\n}\n.hall-layout.with-desk[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  align-items: start;\n  gap: 0.7rem;\n}\n.hall-layout.with-desk[_ngcontent-%COMP%]   app-teacher-hall-desk[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0.7rem;\n  z-index: 6;\n}\n.gallery-space[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.gallery-progress[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(9rem, 1fr) minmax(9rem, 1fr) auto;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 0.65rem;\n  border: 1px solid #c9bba2;\n  border-radius: 0.45rem;\n  padding: 0.7rem 0.85rem;\n  color: #594c3c;\n  background: #f7f1e7;\n}\n.gallery-progress[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.2rem 0.6rem;\n}\n.gallery-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7c6b57;\n  font-size: 0.55rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.gallery-progress[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n}\n.gallery-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: block;\n  height: 0.34rem;\n  overflow: hidden;\n  border-radius: 99px;\n  background: #d8cbb5;\n}\n.gallery-progress[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  max-width: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #326c75,\n      #73a9a4);\n}\n.gallery-progress[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #786b5a;\n  font-size: 0.6rem;\n}\n.family-gate[_ngcontent-%COMP%] {\n  display: grid;\n  width: min(42rem, 100% - 2rem);\n  min-height: calc(100dvh - 11rem);\n  place-items: center;\n  align-content: center;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n.family-mark[_ngcontent-%COMP%] {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #b0833e;\n  transform: rotate(45deg);\n  color: #805824;\n  background: #f3e6c8;\n  font: 800 1.8rem Georgia, serif;\n}\n.family-gate[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-top: 1.7rem;\n  color: #8a612c;\n  font-size: 0.65rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.family-gate[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0.6rem;\n  font: 800 clamp(2rem, 5vw, 3rem) Georgia, serif;\n}\n.family-gate[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6f6252;\n  line-height: 1.6;\n}\n.family-gate[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 1.2rem;\n  min-height: 2.8rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.6rem 0.9rem;\n  color: white;\n  background: #2d6871;\n  font-weight: 850;\n}\n.site-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 1px solid #c9bda9;\n  padding: 1rem max(1rem, (100vw - 90rem) / 2);\n  color: #7c7061;\n  background: #ddd5c9;\n  font-size: 0.58rem;\n}\n.walkup[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 60;\n  inset: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  overflow: hidden;\n  color: #29231d;\n  background: #191719;\n}\n.walkup-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.8rem;\n  min-height: 4.8rem;\n  border-bottom: 0.2rem solid #a97a35;\n  padding: 0.6rem 1rem;\n  color: #fff5e1;\n  background: #27231f;\n}\n.walkup-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.5rem;\n  border: 1px solid #786a58;\n  border-radius: 0.28rem;\n  padding: 0.45rem 0.65rem;\n  color: #f9edda;\n  background: #3a332c;\n  font-weight: 800;\n}\n.walkup-header[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 0.3rem;\n}\n.walkup-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2) {\n  min-width: 0;\n  text-align: center;\n}\n.walkup-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2)   span[_ngcontent-%COMP%] {\n  color: #d6b468;\n  font-size: 0.55rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.walkup-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  overflow: hidden;\n  margin: 0.1rem 0 0;\n  font: 800 clamp(1.1rem, 3vw, 1.65rem) Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.walkup-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.4rem;\n}\n.walkup-actions[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  color: #49320f;\n  background: #edd18f;\n  font-size: 0.56rem;\n}\n.walkup-actions[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.42rem;\n  height: 0.42rem;\n  border-radius: 50%;\n  background: #9c3028;\n}\n.walkup-actions[_ngcontent-%COMP%]   button.defend[_ngcontent-%COMP%] {\n  color: #2e2313;\n  border-color: #d3b36d;\n  background: #dcb65f;\n}\n.walkup-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(17rem, 24rem);\n  min-height: 0;\n}\n.walkup-layout.family[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.artifact-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow-y: auto;\n  padding: clamp(0.7rem, 2vw, 1.5rem);\n  background:\n    radial-gradient(\n      circle at 50% 15%,\n      #5d5347,\n      #272220 70%);\n}\n.artifact-stage[_ngcontent-%COMP%]    > app-exhibit-render-host[_ngcontent-%COMP%] {\n  display: block;\n  width: min(62rem, 100%);\n  margin: 0 auto;\n  border: 0.8rem ridge #9b733a;\n  padding: 0.3rem;\n  background: #21160f;\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5333333333), 0 0 3rem rgba(233, 196, 107, 0.2196078431);\n}\n.artifact-stage[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n  width: min(62rem, 100%);\n  margin: 0.7rem auto 0;\n  color: #c8baa5;\n  font-size: 0.63rem;\n}\n.artifact-stage[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 2.2rem;\n  border: 1px solid #796b5d;\n  border-radius: 0.25rem;\n  padding: 0.4rem 0.6rem;\n  color: #f2e7d6;\n  background: #332d29;\n  font-weight: 800;\n}\n.notice[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 120;\n  right: 1rem;\n  bottom: 1rem;\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.6rem;\n  width: min(24rem, 100% - 2rem);\n  border: 1px solid #789578;\n  border-left: 0.32rem solid #4b7c50;\n  border-radius: 0.4rem;\n  padding: 0.65rem;\n  color: #28472c;\n  background: #e6f1df;\n  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.3333333333);\n}\n.notice[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 1.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #4e7c52;\n  font-weight: 900;\n}\n.notice[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.notice[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.25rem;\n}\n.notice.error[_ngcontent-%COMP%] {\n  color: #6a2720;\n  border-color: #b57368;\n  border-left-color: #a54034;\n  background: #f8e0da;\n}\n.notice.error[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  background: #a54034;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\nbutton[_ngcontent-%COMP%] {\n  font-family: inherit;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #55bec9;\n  outline-offset: 3px;\n}\n@media (max-width: 1050px) {\n  .topbar[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr auto;\n  }\n  .topbar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hall-layout.with-desk[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .hall-layout.with-desk[_ngcontent-%COMP%]   app-teacher-hall-desk[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .walkup-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(16rem, 20rem);\n  }\n}\n@media (max-width: 760px) {\n  .topbar[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .brand[_ngcontent-%COMP%] {\n    padding-inline: 0.7rem;\n  }\n  .brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child, \n   .project-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .viewer-menu[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    grid-row: 2;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-top: 1px solid #4c4339;\n    border-left: 0;\n  }\n  .hall-status[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr auto;\n  }\n  .opening-label[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .hall-introduction[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-top: 1.1rem;\n  }\n  .hall-introduction[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .hall-toolbar[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .hall-toolbar[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .view-switch[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .view-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .gallery-progress[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .gallery-progress[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n  .site-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .walkup[_ngcontent-%COMP%] {\n    overflow-y: auto;\n  }\n  .walkup-header[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .walkup-actions[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    justify-content: center;\n  }\n  .walkup-layout[_ngcontent-%COMP%] {\n    display: block;\n    overflow-y: visible;\n  }\n  .artifact-stage[_ngcontent-%COMP%] {\n    overflow: visible;\n  }\n  .walkup[_ngcontent-%COMP%]   app-peer-response-rail[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@media (max-width: 480px) {\n  .hall-introduction[_ngcontent-%COMP%], \n   .hall-toolbar[_ngcontent-%COMP%], \n   .hall-layout[_ngcontent-%COMP%] {\n    width: calc(100% - 0.8rem);\n  }\n  .hall-introduction[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    min-height: 4rem;\n    padding: 0.35rem;\n  }\n  .hall-introduction[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    font-size: 1.15rem;\n  }\n  .gallery-progress[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .gallery-progress[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n  .walkup-header[_ngcontent-%COMP%] {\n    padding: 0.45rem;\n  }\n  .walkup-header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:nth-child(2) {\n    text-align: left;\n  }\n  .walkup-actions[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .artifact-stage[_ngcontent-%COMP%] {\n    padding: 0.45rem;\n  }\n  .artifact-stage[_ngcontent-%COMP%]    > app-exhibit-render-host[_ngcontent-%COMP%] {\n    border-width: 0.35rem;\n  }\n}\n@media print {\n  .topbar[_ngcontent-%COMP%], \n   .hall-status[_ngcontent-%COMP%], \n   .hall-introduction[_ngcontent-%COMP%], \n   .hall-toolbar[_ngcontent-%COMP%], \n   .site-footer[_ngcontent-%COMP%], \n   app-teacher-hall-desk[_ngcontent-%COMP%], \n   app-peer-response-rail[_ngcontent-%COMP%], \n   .walkup-header[_ngcontent-%COMP%], \n   .artifact-stage[_ngcontent-%COMP%]    > nav[_ngcontent-%COMP%], \n   .notice[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .walkup[_ngcontent-%COMP%] {\n    position: static;\n    display: block;\n    overflow: visible;\n    background: white;\n  }\n  .walkup-layout[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .artifact-stage[_ngcontent-%COMP%] {\n    overflow: visible;\n    padding: 0;\n    background: white;\n  }\n  .artifact-stage[_ngcontent-%COMP%]    > app-exhibit-render-host[_ngcontent-%COMP%] {\n    width: 100%;\n    border: 0;\n    padding: 0;\n    box-shadow: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n    animation-duration: 0.01ms !important;\n  }\n}\n.curator-next[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin: 12px 24px;\n  padding: 16px;\n  background: #eff5e9;\n  border: 1px solid #61786c;\n  border-radius: 10px;\n}\n.curator-next[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1 1 350px;\n}\n.curator-next[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 6px 0 0;\n}\n.curator-next[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 12px;\n  min-height: 44px;\n  cursor: pointer;\n}\n.hall-introduction[_ngcontent-%COMP%] {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n.hall-introduction[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(26px, 2.6vw, 40px);\n}\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  padding: 10px 22px;\n  gap: 12px;\n}\n.project-title[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: none;\n}\n.viewer-menu[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 12px;\n}\n.viewer-menu[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px;\n}\n.viewer-menu[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 20;\n  right: 0;\n  top: 100%;\n  background: #faf5e7;\n  padding: 12px;\n  display: flex;\n  gap: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\n}\n.topbar[_ngcontent-%COMP%]   .view-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  min-height: 44px;\n}\n.hall-status[_ngcontent-%COMP%] {\n  padding: 6px 22px;\n  font-size: 11px;\n}\n.hall-status[_ngcontent-%COMP%]   .opening-label[_ngcontent-%COMP%] {\n  display: none;\n}\n.curator-start[_ngcontent-%COMP%] {\n  min-height: 520px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 24px;\n  background:\n    radial-gradient(\n      ellipse at 50% 40%,\n      #e8dfc3,\n      #faf8ef 65%);\n}\n.curator-start[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font: 700 clamp(26px, 3vw, 36px) Georgia;\n  max-width: 650px;\n}\n.curator-start[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.curator-symbol[_ngcontent-%COMP%] {\n  font-size: 90px;\n  color: #997033;\n}\n.curator-start[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 54px;\n  padding: 14px 24px;\n  border: 0;\n  border-radius: 10px;\n  color: #fff8e5;\n  background: #2e5d58;\n  font: 700 17px Arial;\n  cursor: pointer;\n  margin-top: 20px;\n}\n.curator-start[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 0;\n}\n.curator-start[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n}\n.curator-object[_ngcontent-%COMP%] {\n  --%NS%model-height: 280px;\n  width: min(100%, 500px);\n}\n.curator-start[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n/*# sourceMappingURL=exhibit-hall-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExhibitHallPageComponent, [{
    type: Component,
    args: [{ selector: "app-exhibit-hall-page", imports: [
      WorkspaceToolsComponent,
      StudentRoomWorkspaceComponent,
      ObjectModelViewerComponent,
      TaskGuideComponent,
      AccessibleGalleryListComponent,
      ArtifactComposerComponent,
      DefensePanelComponent,
      ExhibitRenderHostComponent,
      HallCorridorComponent,
      PeerResponseRailComponent,
      TeacherHallDeskComponent
    ], template: `@if (runtime.config.museum) {\r
  <app-student-room-workspace />\r
} @else {\r
  <a class="skip-link" href="#hall-content">Skip to exhibits</a>\r
\r
  <div\r
    class="hall-shell"\r
    [class.teacher-view]="runtime.role() === 'teacher'"\r
    [class.family-view]="runtime.role() === 'family'"\r
  >\r
    <div [hidden]="runtime.composerOpen()">\r
      <app-workspace-tools><header class="topbar">\r
        <div class="project-title">\r
          <span>{{ runtime.config.classLabel }}</span>\r
          <strong>{{ runtime.config.title }}</strong>\r
        </div>\r
        <nav aria-label="Project spaces">\r
          <button\r
            type="button"\r
            class="active"\r
            (click)="browsingHall.set(true); runtime.composerOpen.set(false)"\r
          >\r
            Exhibit hall\r
          </button>\r
          @if (runtime.role() === 'student') {\r
            <button\r
              type="button"\r
              (click)="runtime.usingStarter() ? runtime.startOwnDraft() : runtime.openComposer()"\r
            >\r
              My exhibit\r
            </button>\r
          }\r
        </nav>\r
        <details class="viewer-menu">\r
          <summary>View</summary>\r
          <span>Preview as</span>\r
          <div role="group" aria-label="Preview role">\r
            <button\r
              type="button"\r
              [class.active]="runtime.role() === 'student'"\r
              [attr.aria-pressed]="runtime.role() === 'student'"\r
              (click)="runtime.setRole('student')"\r
            >\r
              Student\r
            </button>\r
            <button\r
              type="button"\r
              [class.active]="runtime.role() === 'teacher'"\r
              [attr.aria-pressed]="runtime.role() === 'teacher'"\r
              (click)="runtime.setRole('teacher')"\r
            >\r
              Teacher\r
            </button>\r
            <button\r
              type="button"\r
              [class.active]="runtime.role() === 'family'"\r
              [attr.aria-pressed]="runtime.role() === 'family'"\r
              (click)="runtime.setRole('family')"\r
            >\r
              Family\r
            </button>\r
          </div>\r
        </details>\r
        <div class="view-switch" role="group" aria-label="Gallery view">\r
          <button\r
            type="button"\r
            [class.active]="runtime.viewMode() === 'corridor'"\r
            [attr.aria-pressed]="runtime.viewMode() === 'corridor'"\r
            (click)="runtime.setViewMode('corridor')"\r
          >\r
            <span aria-hidden="true">\u25A5</span> Immersive corridor\r
          </button>\r
          <button\r
            type="button"\r
            [class.active]="runtime.viewMode() === 'list'"\r
            [attr.aria-pressed]="runtime.viewMode() === 'list'"\r
            (click)="runtime.setViewMode('list')"\r
          >\r
            <span aria-hidden="true">\u2637</span> Accessible list\r
          </button>\r
        </div>\r
        <app-task-guide title="Curator guide"\r
          ><p>\r
            Look closely at two objects. Find a connection. Use sources to check your idea, then\r
            build the labels that help a visitor see it.\r
          </p></app-task-guide\r
        >\r
      </header></app-workspace-tools>\r
\r
      <div class="hall-status" role="status">\r
        <div>\r
          <i></i><strong>{{ phaseLabel() }}</strong\r
          ><span>{{ runtime.state().hall.controls.navigationMode.replace('_', ' ') }}</span>\r
        </div>\r
        <div class="opening-label">\r
          <span aria-hidden="true">\u25F7</span>{{ runtime.config.openingLabel }}\r
        </div>\r
        <div class="identity">\r
          <span>{{ roleLabel() }}</span\r
          ><small>{{ runtime.saveState().replace('_', ' ') }}</small>\r
        </div>\r
      </div>\r
\r
      <main id="hall-content">\r
        @if (runtime.role() === 'student' && !browsingHall()) {\r
          <section class="curator-start">\r
            <h1>What story can two objects tell?</h1>\r
            @if (runtime.composerDraft().objects[0]?.model; as model) {\r
              <app-object-model-viewer class="curator-object" [model]="model" [autoLoad]="true" />\r
            }\r
            <button\r
              type="button"\r
              (click)="runtime.usingStarter() ? runtime.startOwnDraft() : runtime.openComposer()"\r
            >\r
              {{ runtime.usingStarter() ? 'Examine my objects' : 'Continue my exhibit' }} \u2192\r
            </button>\r
          </section>\r
        }\r
        <div [hidden]="runtime.role() === 'student' && !browsingHall()">\r
          @if (runtime.role() === 'family' && runtime.locations().length === 0) {\r
            <section class="family-gate">\r
              <div class="family-mark" aria-hidden="true">\u25C7</div>\r
              <span>Family publication is private by default</span>\r
              <h1>The public gallery is not open yet</h1>\r
              <p>\r
                A teacher must close the live opening and enable the time-limited family view.\r
                Question cards, defenses, grades, presence, private names, and empty locations will\r
                stay hidden.\r
              </p>\r
              <button type="button" (click)="runtime.setRole('teacher')">\r
                Return to teacher preview\r
              </button>\r
            </section>\r
          } @else {\r
            <div class="hall-layout" [class.with-desk]="runtime.role() === 'teacher'">\r
              @if (runtime.role() === 'teacher') {\r
                <app-teacher-hall-desk\r
                  [state]="runtime.state()"\r
                  [locations]="runtime.locations()"\r
                  [unpublishedTeams]="runtime.unpublishedTeams()"\r
                  [collapsed]="!runtime.teacherDeskOpen()"\r
                  (collapsedChanged)="runtime.teacherDeskOpen.set(!$event)"\r
                  (phaseChanged)="runtime.setHallPhase($event)"\r
                  (navigationChanged)="runtime.setNavigationMode($event)"\r
                  (controlToggled)="runtime.toggleControl($event)"\r
                  (pointed)="runtime.pointTo($event)"\r
                  (docentsSelected)="runtime.selectDocents($event)"\r
                  (resetRequested)="runtime.resetDemo()"\r
                />\r
              }\r
\r
              <section class="gallery-space" aria-label="Exhibit collection">\r
                @if (runtime.viewMode() === 'corridor') {\r
                  <app-hall-corridor\r
                    [locations]="runtime.locations()"\r
                    [focusedHangingId]="runtime.focusedHangingId()"\r
                    [emptyLabel]="runtime.config.template.theme.emptyLocationLabel"\r
                    [teacherMode]="runtime.role() === 'teacher'"\r
                    (opened)="runtime.openHanging($event)"\r
                    (pointed)="runtime.pointTo($event)"\r
                  />\r
                } @else {\r
                  <app-accessible-gallery-list\r
                    [locations]="runtime.locations()"\r
                    [focusedHangingId]="runtime.focusedHangingId()"\r
                    [emptyLabel]="runtime.config.template.theme.emptyLocationLabel"\r
                    (opened)="runtime.openHanging($event)"\r
                  />\r
                }\r
\r
                @if (runtime.role() === 'student') {\r
                  <div class="gallery-progress">\r
                    <div>\r
                      <span>Gallery walk progress</span>\r
                      <strong\r
                        >{{ runtime.visitProgress().current }} of\r
                        {{ runtime.visitProgress().target }} visits</strong\r
                      >\r
                      <i\r
                        ><b\r
                          [style.width.%]="\r
                            (runtime.visitProgress().current / runtime.visitProgress().target) * 100\r
                          "\r
                        ></b\r
                      ></i>\r
                    </div>\r
                    @if (runtime.comingSoonCount() > 0) {\r
                      <div>\r
                        <span>Upcoming wings</span>\r
                        <strong>{{ runtime.comingSoonCount() }} walk-ups coming soon</strong>\r
                        <i><b [style.width.%]="25"></b></i>\r
                      </div>\r
                      <p>\r
                        Tour the open Nile wing now. The remaining walk-ups and video presentations\r
                        will be connected later.\r
                      </p>\r
                    } @else {\r
                      <div>\r
                        <span>Question cards</span>\r
                        <strong\r
                          >{{ runtime.responseProgress().current }} of\r
                          {{ runtime.responseProgress().target }} posted</strong\r
                        >\r
                        <i\r
                          ><b\r
                            [style.width.%]="\r
                              (runtime.responseProgress().current /\r
                                runtime.responseProgress().target) *\r
                              100\r
                            "\r
                          ></b\r
                        ></i>\r
                      </div>\r
                      <p>Visit every Egyptian collection and post two thoughtful questions.</p>\r
                    }\r
                  </div>\r
                }\r
              </section>\r
            </div>\r
          }\r
        </div>\r
      </main>\r
\r
      @if (runtime.walkUpOpen() && runtime.selectedLocation(); as location) {\r
        <section\r
          class="walkup"\r
          role="dialog"\r
          aria-modal="true"\r
          [attr.aria-labelledby]="'walkup-title-' + location.locationId"\r
        >\r
          <header class="walkup-header">\r
            <button type="button" class="back" (click)="runtime.closeWalkUp()">\r
              <span aria-hidden="true">\u2190</span> Back to hall\r
            </button>\r
            <div>\r
              <span\r
                >{{ location.team.displayName }} \xB7 Snapshot v{{ location.snapshot?.version }}</span\r
              >\r
              <h1 [id]="'walkup-title-' + location.locationId">\r
                {{ location.snapshot?.accessibleData?.title }}\r
              </h1>\r
            </div>\r
            <div class="walkup-actions">\r
              @if (location.hanging?.id === runtime.focusedHangingId()) {\r
                <strong><i></i> Class standing here</strong>\r
              }\r
              <button\r
                type="button"\r
                (click)="runtime.printSelected()"\r
                aria-label="Print this exhibit"\r
              >\r
                Print\r
              </button>\r
              @if (runtime.role() === 'student') {\r
                <button type="button" class="defend" (click)="runtime.openDefense()">Defend</button>\r
              }\r
            </div>\r
          </header>\r
\r
          <div class="walkup-layout" [class.family]="runtime.role() === 'family'">\r
            <main class="artifact-stage">\r
              @if (location.snapshot) {\r
                <app-exhibit-render-host [snapshot]="location.snapshot" mode="walkup" />\r
              }\r
              <nav aria-label="Adjacent exhibits">\r
                <span\r
                  >Location {{ location.position + 1 }} of {{ runtime.locations().length }}</span\r
                >\r
                <button type="button" (click)="runtime.closeWalkUp()">Browse all frames</button>\r
              </nav>\r
            </main>\r
            @if (runtime.role() !== 'family') {\r
              <app-peer-response-rail\r
                [prompt]="runtime.config.template.peerResponse.prompt"\r
                [responseName]="runtime.config.template.vocabulary.peerResponseName"\r
                [maxWords]="runtime.config.template.peerResponse.maxWords"\r
                [responses]="runtime.selectedResponses()"\r
                [draft]="runtime.selectedDraft()"\r
                [canRespond]="runtime.canRespondAtSelected()"\r
                [teacherMode]="runtime.role() === 'teacher'"\r
                (draftChanged)="runtime.updatePeerDraft($event)"\r
                (draftBlurred)="runtime.savePeerDraft()"\r
                (posted)="runtime.postPeerResponse($event)"\r
                (moderated)="runtime.moderateResponse($event.responseId, $event.action)"\r
              />\r
            }\r
          </div>\r
        </section>\r
      }\r
    </div>\r
    @if (runtime.composerOpen()) {\r
      <app-artifact-composer\r
        [starterExample]="runtime.usingStarter()"\r
        [draft]="runtime.composerDraft()"\r
        [previewSnapshot]="previewSnapshot()"\r
        [validation]="runtime.composerValidation()"\r
        [publishLabel]="\r
          myBoardPublished() ? 'Update showcase' : runtime.config.template.vocabulary.publishAction\r
        "\r
        [published]="myBoardPublished()"\r
        [rehangsRemaining]="runtime.rehangsRemaining()"\r
        [submissionLocked]="runtime.state().hall.controls.submissionLocked"\r
        (closed)="runtime.closeComposer()"\r
        (titleChanged)="runtime.updateBoardTitle($event)"\r
        (claimChanged)="runtime.updateBoardClaim($event)"\r
        (objectChanged)="runtime.updateObject($event.objectId, $event.field, $event.value)"\r
        (sourceChanged)="runtime.updateSource($event.sourceId, $event.citation)"\r
        (galleryTitleChanged)="runtime.updateGalleryTitle($event)"\r
        (galleryEmbedChanged)="runtime.updateGalleryEmbed($event)"\r
        (videoTitleChanged)="runtime.updateVideoTitle($event)"\r
        (videoUrlChanged)="runtime.updateVideoUrl($event)"\r
        (publishedRequested)="runtime.publishBoard()"\r
      />\r
    }\r
\r
    @if (runtime.defenseOpen()) {\r
      <app-defense-panel\r
        [prompts]="runtime.config.template.defense.prompts"\r
        [fallbackChallenge]="runtime.config.template.defense.fallbackChallenge"\r
        [initialAnswers]="runtime.currentDefense()?.answers ?? {}"\r
        [alreadySubmitted]="runtime.currentDefense()?.status === 'submitted'"\r
        (closed)="closeDefense()"\r
        (draftSaved)="runtime.saveDefenseDraft($event.answers, $event.mode)"\r
        (submitted)="runtime.submitDefense($event.answers, $event.mode)"\r
      />\r
    }\r
\r
    @if (runtime.notification(); as message) {\r
      <div class="notice toast" role="status">\r
        <span aria-hidden="true">\u2713</span>\r
        <p>{{ message }}</p>\r
        <button\r
          type="button"\r
          (click)="runtime.clearNotification()"\r
          aria-label="Dismiss notification"\r
        >\r
          \xD7\r
        </button>\r
      </div>\r
    }\r
    @if (runtime.error(); as message) {\r
      <div class="notice error" role="alert">\r
        <span aria-hidden="true">!</span>\r
        <p>{{ message }}</p>\r
        <button type="button" (click)="runtime.clearError()" aria-label="Dismiss error">\xD7</button>\r
      </div>\r
    }\r
    <div class="sr-only" aria-live="polite" aria-atomic="true">\r
      {{ runtime.liveAnnouncement() }}\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/templates/exhibit-hall/ui/exhibit-hall-page.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  color: #292621;\n  background:\n    radial-gradient(\n      circle at 12% 5%,\n      #efe1be 0,\n      transparent 25rem),\n    #e7e1d8;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.hall-shell {\n  min-height: 100dvh;\n}\n.skip-link {\n  position: fixed;\n  z-index: 200;\n  top: 0.4rem;\n  left: 0.4rem;\n  padding: 0.7rem 1rem;\n  color: white;\n  background: #0c6674;\n  transform: translateY(-150%);\n}\n.skip-link:focus {\n  transform: none;\n}\n.topbar {\n  position: relative;\n  z-index: 20;\n  display: grid;\n  grid-template-columns: auto minmax(11rem, 1fr) auto auto;\n  align-items: center;\n  min-height: 4.6rem;\n  border-bottom: 0.22rem solid #a97732;\n  color: #f8efe0;\n  background:\n    linear-gradient(\n      110deg,\n      #121419,\n      #292522 56%,\n      #302820);\n  box-shadow: 0 0.35rem 1.2rem rgba(10, 8, 6, 0.4196078431);\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  height: 100%;\n  border-right: 1px solid #4b4238;\n  padding: 0.65rem 1rem;\n  color: inherit;\n  text-decoration: none;\n}\n.brand > span:first-child {\n  display: grid;\n  width: 2.45rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.15rem double #d6b66f;\n  transform: rotate(45deg);\n  color: #e6c678;\n  font: 900 1.15rem Georgia, serif;\n}\n.brand > span:first-child::first-letter {\n  transform: rotate(-45deg);\n}\n.brand > span:last-child {\n  display: grid;\n}\n.brand strong {\n  font: 800 0.9rem Georgia, serif;\n  letter-spacing: 0.05em;\n}\n.brand small {\n  color: #ae9e8b;\n  font-size: 0.5rem;\n  text-transform: uppercase;\n}\n.project-title {\n  display: grid;\n  min-width: 0;\n  padding: 0.5rem 1rem;\n}\n.project-title span {\n  color: #d4b56e;\n  font-size: 0.55rem;\n  font-weight: 850;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.project-title strong {\n  overflow: hidden;\n  font: 800 1.15rem Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.topbar nav {\n  display: flex;\n  align-self: stretch;\n}\n.topbar nav button {\n  border: 0;\n  border-left: 1px solid #494138;\n  padding: 0.5rem 0.9rem;\n  color: #cfc3b4;\n  background: transparent;\n  font-weight: 800;\n}\n.topbar nav button.active {\n  color: #fff4d8;\n  background: rgba(117, 83, 38, 0.4);\n  box-shadow: inset 0 -0.2rem #deb75f;\n}\n.viewer-menu {\n  display: grid;\n  gap: 0.2rem;\n  border-left: 1px solid #4c4339;\n  padding: 0.5rem 0.8rem;\n}\n.viewer-menu > span {\n  color: #ad9e8a;\n  font-size: 0.48rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n.viewer-menu > div {\n  display: flex;\n}\n.viewer-menu button {\n  min-height: 1.8rem;\n  border: 1px solid #655b4f;\n  padding: 0.25rem 0.45rem;\n  color: #cfc6ba;\n  background: #25221f;\n  font-size: 0.55rem;\n  font-weight: 800;\n}\n.viewer-menu button + button {\n  border-left: 0;\n}\n.viewer-menu button.active {\n  color: #33240f;\n  background: #dfba68;\n}\n.hall-status {\n  position: relative;\n  z-index: 10;\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  min-height: 2.4rem;\n  border-bottom: 1px solid #c5b89f;\n  padding: 0.35rem max(1rem, (100vw - 90rem) / 2);\n  color: #675b4d;\n  background: #f4eddd;\n  font-size: 0.6rem;\n}\n.hall-status > div {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.hall-status > div:first-child i {\n  width: 0.48rem;\n  height: 0.48rem;\n  border-radius: 50%;\n  background: #4b8a51;\n  box-shadow: 0 0 0.4rem #4e9357;\n}\n.hall-status > div:first-child span {\n  border-left: 1px solid #c6b89f;\n  padding-left: 0.45rem;\n  text-transform: capitalize;\n}\n.opening-label {\n  justify-self: center;\n  color: #795425;\n  font-weight: 800;\n}\n.identity {\n  justify-self: end;\n}\n.identity small {\n  border-radius: 999px;\n  padding: 0.18rem 0.4rem;\n  color: #315f41;\n  background: #d9e7d2;\n  text-transform: capitalize;\n}\nmain {\n  display: block;\n}\n.hall-introduction {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1.2rem;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto;\n  padding: 1.6rem 0 1rem;\n}\n.eyebrow {\n  color: #89602b;\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.hall-introduction h1 {\n  margin: 0.12rem 0 0.3rem;\n  font: 800 clamp(2rem, 5vw, 3.7rem)/0.98 Georgia, serif;\n  letter-spacing: -0.035em;\n}\n.hall-introduction p {\n  max-width: 48rem;\n  margin: 0;\n  color: #655b4f;\n  line-height: 1.5;\n}\n.hall-introduction .prototype-scope {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  align-items: center;\n  margin-top: 0.7rem;\n  border-left: 0.22rem solid #a97732;\n  padding: 0.5rem 0.7rem;\n  color: #4f473d;\n  background: rgba(246, 238, 221, 0.7490196078);\n  font-size: 0.72rem;\n}\n.prototype-scope strong {\n  color: #795425;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.hall-introduction dl {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(5.5rem, 1fr));\n  align-self: center;\n  margin: 0;\n  border: 1px solid #c8baa0;\n  border-radius: 0.5rem;\n  background: #f6f0e5;\n  box-shadow: 0 0.3rem 0.8rem rgba(63, 48, 27, 0.0705882353);\n}\n.hall-introduction dl div {\n  display: grid;\n  place-items: center;\n  min-height: 4.7rem;\n  padding: 0.55rem;\n}\n.hall-introduction dl div + div {\n  border-left: 1px solid #d4c8b3;\n}\n.hall-introduction dt {\n  color: #7e6e59;\n  font-size: 0.52rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.hall-introduction dd {\n  margin: 0;\n  color: #573c1b;\n  font: 800 1.5rem Georgia, serif;\n}\n.hall-introduction dd small {\n  margin-left: 0.18rem;\n  color: #8c7a64;\n  font-size: 0.65rem;\n}\n.hall-toolbar {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 1rem;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto 0.75rem;\n  border: 1px solid #c6b89e;\n  border-radius: 0.45rem;\n  padding: 0.45rem;\n  background: #f7f2e9;\n}\n.view-switch {\n  display: flex;\n}\n.view-switch button,\n.my-board {\n  min-height: 2.55rem;\n  border: 1px solid #b9aa91;\n  padding: 0.48rem 0.72rem;\n  color: #534737;\n  background: #eee5d5;\n  font-size: 0.67rem;\n  font-weight: 850;\n}\n.view-switch button + button {\n  border-left: 0;\n}\n.view-switch button.active {\n  color: white;\n  border-color: #295f68;\n  background: #2d6871;\n}\n.view-switch span,\n.my-board span {\n  margin-right: 0.3rem;\n}\n.hall-toolbar > p {\n  margin: 0;\n  color: #6d6254;\n  font-size: 0.66rem;\n  text-align: center;\n}\n.hall-toolbar > p strong {\n  color: #855b22;\n}\n.my-board {\n  color: #33240f;\n  border-color: #be984f;\n  border-radius: 0.25rem;\n  background: #e0bd6e;\n}\n.hall-layout {\n  display: block;\n  width: min(90rem, 100% - 2rem);\n  margin: 0 auto 1.5rem;\n}\n.hall-layout.with-desk {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  align-items: start;\n  gap: 0.7rem;\n}\n.hall-layout.with-desk app-teacher-hall-desk {\n  position: sticky;\n  top: 0.7rem;\n  z-index: 6;\n}\n.gallery-space {\n  min-width: 0;\n}\n.gallery-progress {\n  display: grid;\n  grid-template-columns: minmax(9rem, 1fr) minmax(9rem, 1fr) auto;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 0.65rem;\n  border: 1px solid #c9bba2;\n  border-radius: 0.45rem;\n  padding: 0.7rem 0.85rem;\n  color: #594c3c;\n  background: #f7f1e7;\n}\n.gallery-progress > div {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 0.2rem 0.6rem;\n}\n.gallery-progress span {\n  color: #7c6b57;\n  font-size: 0.55rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.gallery-progress strong {\n  font-size: 0.68rem;\n}\n.gallery-progress i {\n  grid-column: 1/-1;\n  display: block;\n  height: 0.34rem;\n  overflow: hidden;\n  border-radius: 99px;\n  background: #d8cbb5;\n}\n.gallery-progress i b {\n  display: block;\n  height: 100%;\n  max-width: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #326c75,\n      #73a9a4);\n}\n.gallery-progress p {\n  margin: 0;\n  color: #786b5a;\n  font-size: 0.6rem;\n}\n.family-gate {\n  display: grid;\n  width: min(42rem, 100% - 2rem);\n  min-height: calc(100dvh - 11rem);\n  place-items: center;\n  align-content: center;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n.family-mark {\n  display: grid;\n  width: 4rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 0.25rem double #b0833e;\n  transform: rotate(45deg);\n  color: #805824;\n  background: #f3e6c8;\n  font: 800 1.8rem Georgia, serif;\n}\n.family-gate > span {\n  margin-top: 1.7rem;\n  color: #8a612c;\n  font-size: 0.65rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.family-gate h1 {\n  margin: 0.2rem 0 0.6rem;\n  font: 800 clamp(2rem, 5vw, 3rem) Georgia, serif;\n}\n.family-gate p {\n  margin: 0;\n  color: #6f6252;\n  line-height: 1.6;\n}\n.family-gate button {\n  margin-top: 1.2rem;\n  min-height: 2.8rem;\n  border: 0;\n  border-radius: 0.3rem;\n  padding: 0.6rem 0.9rem;\n  color: white;\n  background: #2d6871;\n  font-weight: 850;\n}\n.site-footer {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  border-top: 1px solid #c9bda9;\n  padding: 1rem max(1rem, (100vw - 90rem) / 2);\n  color: #7c7061;\n  background: #ddd5c9;\n  font-size: 0.58rem;\n}\n.walkup {\n  position: fixed;\n  z-index: 60;\n  inset: 0;\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  overflow: hidden;\n  color: #29231d;\n  background: #191719;\n}\n.walkup-header {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.8rem;\n  min-height: 4.8rem;\n  border-bottom: 0.2rem solid #a97a35;\n  padding: 0.6rem 1rem;\n  color: #fff5e1;\n  background: #27231f;\n}\n.walkup-header button {\n  min-height: 2.5rem;\n  border: 1px solid #786a58;\n  border-radius: 0.28rem;\n  padding: 0.45rem 0.65rem;\n  color: #f9edda;\n  background: #3a332c;\n  font-weight: 800;\n}\n.walkup-header .back span {\n  margin-right: 0.3rem;\n}\n.walkup-header > div:nth-child(2) {\n  min-width: 0;\n  text-align: center;\n}\n.walkup-header > div:nth-child(2) span {\n  color: #d6b468;\n  font-size: 0.55rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.walkup-header h1 {\n  overflow: hidden;\n  margin: 0.1rem 0 0;\n  font: 800 clamp(1.1rem, 3vw, 1.65rem) Georgia, serif;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.walkup-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.4rem;\n}\n.walkup-actions > strong {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  border-radius: 999px;\n  padding: 0.35rem 0.55rem;\n  color: #49320f;\n  background: #edd18f;\n  font-size: 0.56rem;\n}\n.walkup-actions > strong i {\n  width: 0.42rem;\n  height: 0.42rem;\n  border-radius: 50%;\n  background: #9c3028;\n}\n.walkup-actions button.defend {\n  color: #2e2313;\n  border-color: #d3b36d;\n  background: #dcb65f;\n}\n.walkup-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(17rem, 24rem);\n  min-height: 0;\n}\n.walkup-layout.family {\n  grid-template-columns: 1fr;\n}\n.artifact-stage {\n  min-width: 0;\n  overflow-y: auto;\n  padding: clamp(0.7rem, 2vw, 1.5rem);\n  background:\n    radial-gradient(\n      circle at 50% 15%,\n      #5d5347,\n      #272220 70%);\n}\n.artifact-stage > app-exhibit-render-host {\n  display: block;\n  width: min(62rem, 100%);\n  margin: 0 auto;\n  border: 0.8rem ridge #9b733a;\n  padding: 0.3rem;\n  background: #21160f;\n  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5333333333), 0 0 3rem rgba(233, 196, 107, 0.2196078431);\n}\n.artifact-stage > nav {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.7rem;\n  width: min(62rem, 100%);\n  margin: 0.7rem auto 0;\n  color: #c8baa5;\n  font-size: 0.63rem;\n}\n.artifact-stage > nav button {\n  min-height: 2.2rem;\n  border: 1px solid #796b5d;\n  border-radius: 0.25rem;\n  padding: 0.4rem 0.6rem;\n  color: #f2e7d6;\n  background: #332d29;\n  font-weight: 800;\n}\n.notice {\n  position: fixed;\n  z-index: 120;\n  right: 1rem;\n  bottom: 1rem;\n  display: grid;\n  grid-template-columns: 1.7rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.6rem;\n  width: min(24rem, 100% - 2rem);\n  border: 1px solid #789578;\n  border-left: 0.32rem solid #4b7c50;\n  border-radius: 0.4rem;\n  padding: 0.65rem;\n  color: #28472c;\n  background: #e6f1df;\n  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.3333333333);\n}\n.notice > span {\n  display: grid;\n  width: 1.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #4e7c52;\n  font-weight: 900;\n}\n.notice p {\n  margin: 0;\n  font-size: 0.72rem;\n  line-height: 1.4;\n}\n.notice button {\n  border: 0;\n  color: inherit;\n  background: transparent;\n  font-size: 1.25rem;\n}\n.notice.error {\n  color: #6a2720;\n  border-color: #b57368;\n  border-left-color: #a54034;\n  background: #f8e0da;\n}\n.notice.error > span {\n  background: #a54034;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\nbutton {\n  font-family: inherit;\n  cursor: pointer;\n}\nbutton:focus-visible,\na:focus-visible {\n  outline: 3px solid #55bec9;\n  outline-offset: 3px;\n}\n@media (max-width: 1050px) {\n  .topbar {\n    grid-template-columns: auto 1fr auto;\n  }\n  .topbar nav {\n    display: none;\n  }\n  .hall-layout.with-desk {\n    grid-template-columns: 1fr;\n  }\n  .hall-layout.with-desk app-teacher-hall-desk {\n    position: static;\n  }\n  .walkup-layout {\n    grid-template-columns: minmax(0, 1fr) minmax(16rem, 20rem);\n  }\n}\n@media (max-width: 760px) {\n  .topbar {\n    grid-template-columns: auto 1fr;\n  }\n  .brand {\n    padding-inline: 0.7rem;\n  }\n  .brand > span:last-child,\n  .project-title span {\n    display: none;\n  }\n  .viewer-menu {\n    grid-column: 1/-1;\n    grid-row: 2;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-top: 1px solid #4c4339;\n    border-left: 0;\n  }\n  .hall-status {\n    grid-template-columns: 1fr auto;\n  }\n  .opening-label {\n    display: none !important;\n  }\n  .hall-introduction {\n    grid-template-columns: 1fr;\n    padding-top: 1.1rem;\n  }\n  .hall-introduction dl {\n    width: 100%;\n  }\n  .hall-toolbar {\n    grid-template-columns: 1fr;\n  }\n  .hall-toolbar > p {\n    text-align: left;\n  }\n  .view-switch {\n    width: 100%;\n  }\n  .view-switch button {\n    flex: 1;\n  }\n  .gallery-progress {\n    grid-template-columns: 1fr 1fr;\n  }\n  .gallery-progress p {\n    grid-column: 1/-1;\n  }\n  .site-footer {\n    flex-direction: column;\n  }\n  .walkup {\n    overflow-y: auto;\n  }\n  .walkup-header {\n    grid-template-columns: auto 1fr;\n  }\n  .walkup-actions {\n    grid-column: 1/-1;\n    justify-content: center;\n  }\n  .walkup-layout {\n    display: block;\n    overflow-y: visible;\n  }\n  .artifact-stage {\n    overflow: visible;\n  }\n  .walkup app-peer-response-rail {\n    display: block;\n  }\n}\n@media (max-width: 480px) {\n  .hall-introduction,\n  .hall-toolbar,\n  .hall-layout {\n    width: calc(100% - 0.8rem);\n  }\n  .hall-introduction dl div {\n    min-height: 4rem;\n    padding: 0.35rem;\n  }\n  .hall-introduction dd {\n    font-size: 1.15rem;\n  }\n  .gallery-progress {\n    grid-template-columns: 1fr;\n  }\n  .gallery-progress p {\n    grid-column: auto;\n  }\n  .walkup-header {\n    padding: 0.45rem;\n  }\n  .walkup-header > div:nth-child(2) {\n    text-align: left;\n  }\n  .walkup-actions > strong {\n    display: none;\n  }\n  .artifact-stage {\n    padding: 0.45rem;\n  }\n  .artifact-stage > app-exhibit-render-host {\n    border-width: 0.35rem;\n  }\n}\n@media print {\n  .topbar,\n  .hall-status,\n  .hall-introduction,\n  .hall-toolbar,\n  .site-footer,\n  app-teacher-hall-desk,\n  app-peer-response-rail,\n  .walkup-header,\n  .artifact-stage > nav,\n  .notice {\n    display: none !important;\n  }\n  .walkup {\n    position: static;\n    display: block;\n    overflow: visible;\n    background: white;\n  }\n  .walkup-layout {\n    display: block;\n  }\n  .artifact-stage {\n    overflow: visible;\n    padding: 0;\n    background: white;\n  }\n  .artifact-stage > app-exhibit-render-host {\n    width: 100%;\n    border: 0;\n    padding: 0;\n    box-shadow: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n    animation-duration: 0.01ms !important;\n  }\n}\n.curator-next {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin: 12px 24px;\n  padding: 16px;\n  background: #eff5e9;\n  border: 1px solid #61786c;\n  border-radius: 10px;\n}\n.curator-next > div {\n  flex: 1 1 350px;\n}\n.curator-next p {\n  font-size: 14px;\n  margin: 6px 0 0;\n}\n.curator-next button {\n  padding: 12px;\n  min-height: 44px;\n  cursor: pointer;\n}\n.hall-introduction {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n.hall-introduction h1 {\n  font-size: clamp(26px, 2.6vw, 40px);\n}\n.topbar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  padding: 10px 22px;\n  gap: 12px;\n}\n.project-title {\n  margin-right: auto;\n}\n.project-title > span {\n  display: none;\n}\n.viewer-menu {\n  position: relative;\n  font-size: 12px;\n}\n.viewer-menu summary {\n  cursor: pointer;\n  min-height: 44px;\n  padding: 12px;\n}\n.viewer-menu > div {\n  position: absolute;\n  z-index: 20;\n  right: 0;\n  top: 100%;\n  background: #faf5e7;\n  padding: 12px;\n  display: flex;\n  gap: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\n}\n.topbar .view-switch button {\n  font-size: 12px;\n  min-height: 44px;\n}\n.hall-status {\n  padding: 6px 22px;\n  font-size: 11px;\n}\n.hall-status .opening-label {\n  display: none;\n}\n.curator-start {\n  min-height: 520px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 24px;\n  background:\n    radial-gradient(\n      ellipse at 50% 40%,\n      #e8dfc3,\n      #faf8ef 65%);\n}\n.curator-start h1 {\n  font: 700 clamp(26px, 3vw, 36px) Georgia;\n  max-width: 650px;\n}\n.curator-start p {\n  font-size: 18px;\n}\n.curator-symbol {\n  font-size: 90px;\n  color: #997033;\n}\n.curator-start button {\n  min-height: 54px;\n  padding: 14px 24px;\n  border: 0;\n  border-radius: 10px;\n  color: #fff8e5;\n  background: #2e5d58;\n  font: 700 17px Arial;\n  cursor: pointer;\n  margin-top: 20px;\n}\n.curator-start {\n  padding: 24px;\n  min-height: 0;\n}\n.curator-start h1 {\n  margin: 0 0 20px;\n}\n.curator-object {\n  --model-height: 280px;\n  width: min(100%, 500px);\n}\n.curator-start button {\n  margin-top: 12px;\n}\n/*# sourceMappingURL=exhibit-hall-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExhibitHallPageComponent, { className: "ExhibitHallPageComponent", filePath: "src/app/templates/exhibit-hall/ui/exhibit-hall-page.component.ts", lineNumber: 34 });
})();
export {
  ExhibitHallPageComponent
};
//# debugId=da77a6a8-230f-5869-b31d-b3080c600aee
//# sourceMappingURL=chunk-BFYSLR4W.js.map
