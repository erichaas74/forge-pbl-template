import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RadioControlValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  BrowserRepairPreviewPersistence,
  REPAIR_PREVIEW_PERSISTENCE,
  RepairPreviewRuntime,
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_SESSION,
  TimeRepairRuntime,
  nodeStatus
} from "./chunk-F4667FO2.js";
import {
  PROJECT_LESSON_FOCUS,
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import "./chunk-2WXJ5NX3.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
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
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/time-repair/ui/time-repair-week-source.component.ts
var _c0 = ["card"];
function RepairWeekSourceComponent_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 3);
    \u0275\u0275text(1, "Open original source \u2197");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", s_r1.url, \u0275\u0275sanitizeUrl);
  }
}
function RepairWeekSourceComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 1, 0)(2, "p", 2);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "h4");
    \u0275\u0275text(9, "What to keep in mind");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "small");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(14, RepairWeekSourceComponent_Conditional_0_Conditional_14_Template, 2, 1, "a", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const s_r1 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("SOURCE CARD \xB7 ", s_r1.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.content);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r1.perspective);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.citation);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r1.url ? 14 : -1);
  }
}
var RepairWeekSourceComponent = class _RepairWeekSourceComponent {
  source = input(
    ...ngDevMode ? [void 0, { debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  card = viewChild(
    "card",
    ...ngDevMode ? [{ debugName: "card" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  ngOnChanges() {
    if (!this.source())
      return;
    afterNextRender(() => {
      const el = this.card()?.nativeElement;
      el?.scrollIntoView({ block: "nearest", behavior: "instant" });
      el?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function RepairWeekSourceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairWeekSourceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RepairWeekSourceComponent, selectors: [["app-repair-week-source"]], viewQuery: function RepairWeekSourceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.card, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { source: [1, "source"] }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["card", ""], ["tabindex", "-1", "aria-label", "Selected source", 1, "source-card"], [1, "eyebrow"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function RepairWeekSourceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, RepairWeekSourceComponent_Conditional_0_Template, 15, 6, "article", 1);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.source()) ? 0 : -1, tmp_0_0);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #eff5ef;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%], \nbutton[aria-current=step][_ngcontent-%COMP%] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, a, summary):focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #116457;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid[_ngcontent-%COMP%], \n.timeline-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene[_ngcontent-%COMP%] {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card[_ngcontent-%COMP%] {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls[_ngcontent-%COMP%] {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.option-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.feedback[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.timeline-workbench[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  margin: 0 16px 12px;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.archive-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.ripple-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #c4dbc9;\n}\n.ripple-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle[_ngcontent-%COMP%] {\n  margin: 18px 0;\n}\n.ripple-lab[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  padding: 14px 0;\n}\n.ripple-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ripple-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired[_ngcontent-%COMP%] {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired.active[_ngcontent-%COMP%] {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf[_ngcontent-%COMP%] {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench[_ngcontent-%COMP%] {\n  padding: 4px 0 16px;\n}\n.panel-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.caption-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 9px;\n}\n.image-credit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor[_ngcontent-%COMP%]   .art-note[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-grid[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  max-height: 430px;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art[_ngcontent-%COMP%] {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ripple-banner[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ripple-steps[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-caption[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairWeekSourceComponent, [{
    type: Component,
    args: [{ selector: "app-repair-week-source", template: `@if (source(); as s) {
    <article class="source-card" #card tabindex="-1" aria-label="Selected source">
      <p class="eyebrow">SOURCE CARD \xB7 {{ s.kind }}</p>
      <h3>{{ s.title }}</h3>
      <p>{{ s.content }}</p>
      <h4>What to keep in mind</h4>
      <p>{{ s.perspective }}</p>
      <small>{{ s.citation }}</small>
      @if (s.url) {
        <a [href]="s.url" target="_blank" rel="noopener noreferrer">Open original source \u2197</a>
      }
    </article>
  }`, changeDetection: ChangeDetectionStrategy.OnPush, styles: ['/* src/app/templates/time-repair/ui/time-repair-week-activity.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton:hover {\n  background: #eff5ef;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true],\nbutton[aria-current=step] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n:is(button, input, select, textarea, a, summary):focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na {\n  color: #116457;\n}\np {\n  margin: 6px 0 14px;\n}\nh2 {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3 {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4 {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid,\n.timeline-workbench {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list button {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection p {\n  font-size: 12px;\n}\n.source-buttons {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons button {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card p {\n  font-size: 12px;\n}\n.source-card a {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls p {\n  font-size: 11px;\n}\n.option-card {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card small {\n  margin-top: 5px;\n}\n.feedback {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback:empty {\n  display: none;\n}\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row button {\n  font-size: 11px;\n}\n.toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar h3 {\n  margin: 5px 0;\n}\n.timeline-workbench .feedback {\n  margin: 0 16px 12px;\n}\n.event-list {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list li {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy h3 {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy p {\n  font-size: 11px;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect,\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea {\n  resize: vertical;\n}\n.archive-art {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab {\n  padding: 18px;\n}\n.ripple-banner {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner .eyebrow {\n  color: #c4dbc9;\n}\n.ripple-banner h3 {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner p {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle {\n  margin: 18px 0;\n}\n.ripple-lab .toolbar {\n  padding: 14px 0;\n}\n.ripple-steps {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps button {\n  font-size: 12px;\n}\n.ripple-steps span {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison article {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison h3 {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison .repaired {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison .repaired.active {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench {\n  padding: 4px 0 16px;\n}\n.panel-picker {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker button {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card > img {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption {\n  padding: 22px;\n}\n.caption-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption a {\n  font-size: 11px;\n}\n.exhibit-caption small {\n  margin-top: 9px;\n}\n.image-credit {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor .art-note {\n  padding: 0;\n}\n.touring .exhibit-grid {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring .exhibit-card > img {\n  max-height: 430px;\n}\n.touring .exhibit-caption h2 {\n  font-size: 32px;\n}\n.tour-controls {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes {\n    padding: 12px;\n  }\n  .exhibit-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: 1fr;\n  }\n  .field-notes {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab {\n    padding: 12px;\n  }\n  .ripple-banner {\n    padding: 18px;\n  }\n  .ripple-steps {\n    gap: 5px;\n  }\n  .ripple-steps button {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison article {\n    padding: 16px;\n  }\n  .exhibit-caption {\n    padding: 16px;\n  }\n  .exhibit-grid {\n    padding: 0 10px;\n  }\n  .touring .exhibit-caption h2 {\n    font-size: 27px;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */\n'] }]
  }], null, { source: [{ type: Input, args: [{ isSignal: true, alias: "source", required: false }] }], card: [{ type: ViewChild, args: ["card", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RepairWeekSourceComponent, { className: "RepairWeekSourceComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-source.component.ts", lineNumber: 32 });
})();

// src/app/templates/time-repair/ui/time-repair-week-scene.component.ts
var _c02 = ["inspector"];
var _forTrack0 = ($index, $item) => $item.id;
function RepairSceneWorkbenchComponent_For_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 16);
  }
  if (rf & 2) {
    const spot_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", spot_r2.x, "%")("top", spot_r2.y, "%");
    \u0275\u0275property("src", ctx_r2.r.trial()?.supported && spot_r2.restoredObjectImage ? spot_r2.restoredObjectImage : spot_r2.objectImage, \u0275\u0275sanitizeUrl);
  }
}
function RepairSceneWorkbenchComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_For_7_Template_button_click_0_listener() {
      const spot_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspect(spot_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, RepairSceneWorkbenchComponent_For_7_Conditional_2_Template, 1, 5, "img", 15);
  }
  if (rf & 2) {
    const spot_r2 = ctx.$implicit;
    const \u0275$index_12_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", spot_r2.x, "%")("top", spot_r2.y, "%");
    \u0275\u0275attribute("aria-label", "Inspect " + spot_r2.label)("aria-pressed", ctx_r2.r.activeHotspot() === spot_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275$index_12_r4 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(spot_r2.objectImage ? 2 : -1);
  }
}
function RepairSceneWorkbenchComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Trial ", ctx_r2.r.trial().id, " \xB7 ", ctx.objectLabel);
  }
}
function RepairSceneWorkbenchComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_For_13_Template_button_click_0_listener() {
      const spot_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspect(spot_r6.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const spot_r6 = ctx.$implicit;
    const \u0275$index_28_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.r.activeHotspot() === spot_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275$index_28_r7 + 1, " \xB7 ", spot_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.r.draft().inspectedIds.includes(spot_r6.id) ? "Viewed" : "Inspect");
  }
}
function RepairSceneWorkbenchComponent_Conditional_15_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r9 = ctx.$implicit;
    \u0275\u0275property("value", option_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r9.label);
  }
}
function RepairSceneWorkbenchComponent_Conditional_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.description);
  }
}
function RepairSceneWorkbenchComponent_Conditional_15_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_Conditional_15_For_20_Template_button_click_0_listener() {
      const trial_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.r.replayId.set(trial_r11.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Replay ", trial_r11.id, " \xB7 ", trial_r11.supported ? "Cargo removed" : "Conflict remains", " ");
  }
}
function RepairSceneWorkbenchComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 9)(1, "h3");
    \u0275\u0275text(2, "Choose what to change");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4, "Intervention");
    \u0275\u0275elementStart(5, "select", 18);
    \u0275\u0275listener("change", function RepairSceneWorkbenchComponent_Conditional_15_Template_select_change_5_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.selectOption($event.target.value));
    });
    \u0275\u0275elementStart(6, "option", 19);
    \u0275\u0275text(7, "Choose a repair");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, RepairSceneWorkbenchComponent_Conditional_15_For_9_Template, 2, 2, "option", 20, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, RepairSceneWorkbenchComponent_Conditional_15_Conditional_10_Template, 2, 1, "p");
    \u0275\u0275elementStart(11, "button", 21);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_Conditional_15_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.run());
    });
    \u0275\u0275text(12, "\u25B6 Run repair test");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 22);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "details")(16, "summary");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 23);
    \u0275\u0275repeaterCreate(19, RepairSceneWorkbenchComponent_Conditional_15_For_20_Template, 2, 2, "button", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r2.r.draft().optionId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.r.mission().repair.options);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.selectedOption()) ? 10 : -1, tmp_3_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.r.message());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Trial replays (", ctx_r2.r.draft().trials.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.r.draft().trials);
  }
}
function RepairSceneWorkbenchComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 10, 0)(2, "span", 24);
    \u0275\u0275text(3, "INSPECTION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const spot_r12 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(spot_r12.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(spot_r12.description);
  }
}
function RepairSceneWorkbenchComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 11)(1, "span", 24);
    \u0275\u0275text(2, "START HERE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "A crate in the wrong century?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 21);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_Conditional_17_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inspect(ctx_r2.r.mission().repair.targetHotspotId));
    });
    \u0275\u0275text(8, " Inspect flagged cargo ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.r.mission().signal);
  }
}
function RepairSceneWorkbenchComponent_For_22_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function RepairSceneWorkbenchComponent_For_22_For_1_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const id_r15 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.sourceId.set(id_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r16 = \u0275\u0275nextContext().$implicit;
    const id_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.r.sourceId() === id_r15);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r16.title, " \u2197 ");
  }
}
function RepairSceneWorkbenchComponent_For_22_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RepairSceneWorkbenchComponent_For_22_For_1_Conditional_0_Template, 2, 2, "button");
  }
  if (rf & 2) {
    const e_r16 = ctx.$implicit;
    const id_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(e_r16.id === id_r15 ? 0 : -1);
  }
}
function RepairSceneWorkbenchComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, RepairSceneWorkbenchComponent_For_22_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.r.config.evidence);
  }
}
var RepairSceneWorkbenchComponent = class _RepairSceneWorkbenchComponent {
  r = inject(RepairPreviewRuntime);
  hotspot = computed(
    () => this.r.scene().hotspots.find((h) => h.id === this.r.activeHotspot()),
    ...ngDevMode ? [{ debugName: "hotspot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  appliedOption = computed(
    () => this.r.mission().repair.options.find((o) => o.id === this.r.trial()?.optionId),
    ...ngDevMode ? [{ debugName: "appliedOption" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedOption = computed(
    () => this.r.mission().repair.options.find((o) => o.id === this.r.draft().optionId),
    ...ngDevMode ? [{ debugName: "selectedOption" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspector = viewChild(
    "inspector",
    ...ngDevMode ? [{ debugName: "inspector" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  inspect(id) {
    this.r.inspect(id);
    afterNextRender(() => {
      const el = this.inspector()?.nativeElement;
      el?.scrollIntoView({ block: "nearest", behavior: "instant" });
      el?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function RepairSceneWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairSceneWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RepairSceneWorkbenchComponent, selectors: [["app-repair-scene-workbench"]], viewQuery: function RepairSceneWorkbenchComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.inspector, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 24, vars: 7, consts: [["inspector", ""], [1, "scene-grid"], [1, "harbor-scene"], [1, "scene-image", 3, "src", "alt"], [1, "scene-date"], [1, "scene-result"], [1, "art-note"], ["aria-label", "Objects to inspect", 1, "hotspot-list"], [1, "field-notes"], ["aria-label", "Cargo intervention", 1, "repair-controls"], ["tabindex", "-1", 1, "inspection"], [1, "inspection"], [1, "source-buttons"], [3, "source"], [1, "hotspot", 3, "click"], ["alt", "", 1, "cargo-object", 3, "src", "left", "top"], ["alt", "", 1, "cargo-object", 3, "src"], [3, "click"], ["aria-label", "Cargo intervention", 3, "change", "value"], ["value", ""], [3, "value"], [1, "primary", 3, "click"], ["role", "status", 1, "feedback"], [1, "button-row"], [1, "eyebrow"]], template: function RepairSceneWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div")(2, "figure", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(6, RepairSceneWorkbenchComponent_For_7_Template, 3, 8, null, null, _forTrack0);
      \u0275\u0275conditionalCreate(8, RepairSceneWorkbenchComponent_Conditional_8_Template, 2, 2, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, " Imagined teaching scene. The date and cargo are scenario props; use the source cards to test them. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275repeaterCreate(12, RepairSceneWorkbenchComponent_For_13_Template, 4, 4, "button", null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "aside", 8);
      \u0275\u0275conditionalCreate(15, RepairSceneWorkbenchComponent_Conditional_15_Template, 21, 4, "section", 9);
      \u0275\u0275conditionalCreate(16, RepairSceneWorkbenchComponent_Conditional_16_Template, 8, 2, "article", 10)(17, RepairSceneWorkbenchComponent_Conditional_17_Template, 9, 1, "article", 11);
      \u0275\u0275elementStart(18, "h3");
      \u0275\u0275text(19, "Compare with a source");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 12);
      \u0275\u0275repeaterCreate(21, RepairSceneWorkbenchComponent_For_22_Template, 2, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-repair-week-source", 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_7_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.r.scene().image, \u0275\u0275sanitizeUrl)("alt", ctx.r.scene().imageAlt);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.scene().title);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.r.scene().hotspots);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_4_0 = ctx.appliedOption()) ? 8 : -1, tmp_4_0);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.r.scene().hotspots);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.r.session().mode === "repair" ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = ctx.hotspot()) ? 16 : 17, tmp_7_0);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.r.session().evidenceIds);
      \u0275\u0275advance(2);
      \u0275\u0275property("source", ctx.r.selectedSource());
    }
  }, dependencies: [RepairWeekSourceComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #eff5ef;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%], \nbutton[aria-current=step][_ngcontent-%COMP%] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, a, summary):focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #116457;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid[_ngcontent-%COMP%], \n.timeline-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene[_ngcontent-%COMP%] {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card[_ngcontent-%COMP%] {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls[_ngcontent-%COMP%] {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.option-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.feedback[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.timeline-workbench[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  margin: 0 16px 12px;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.archive-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.ripple-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #c4dbc9;\n}\n.ripple-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle[_ngcontent-%COMP%] {\n  margin: 18px 0;\n}\n.ripple-lab[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  padding: 14px 0;\n}\n.ripple-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ripple-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired[_ngcontent-%COMP%] {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired.active[_ngcontent-%COMP%] {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf[_ngcontent-%COMP%] {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench[_ngcontent-%COMP%] {\n  padding: 4px 0 16px;\n}\n.panel-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.caption-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 9px;\n}\n.image-credit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor[_ngcontent-%COMP%]   .art-note[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-grid[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  max-height: 430px;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art[_ngcontent-%COMP%] {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ripple-banner[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ripple-steps[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-caption[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairSceneWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-repair-scene-workbench", imports: [RepairWeekSourceComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="scene-grid">
  <div>
    <figure class="harbor-scene">
      <img class="scene-image" [src]="r.scene().image" [alt]="r.scene().imageAlt" />
      <span class="scene-date">{{ r.scene().title }}</span>
      @for (spot of r.scene().hotspots; track spot.id; let i = $index) {
        <button
          class="hotspot"
          [style.left.%]="spot.x"
          [style.top.%]="spot.y"
          [attr.aria-label]="'Inspect ' + spot.label"
          [attr.aria-pressed]="r.activeHotspot() === spot.id"
          (click)="inspect(spot.id)"
        >
          {{ i + 1 }}
        </button>
        @if (spot.objectImage) {
          <img
            class="cargo-object"
            [src]="
              r.trial()?.supported && spot.restoredObjectImage
                ? spot.restoredObjectImage
                : spot.objectImage
            "
            alt=""
            [style.left.%]="spot.x"
            [style.top.%]="spot.y"
          />
        }
      }
      @if (appliedOption(); as option) {
        <span class="scene-result">Trial {{ r.trial()!.id }} \xB7 {{ option.objectLabel }}</span>
      }
    </figure>
    <p class="art-note">
      Imagined teaching scene. The date and cargo are scenario props; use the source cards to test
      them.
    </p>
    <div class="hotspot-list" aria-label="Objects to inspect">
      @for (spot of r.scene().hotspots; track spot.id; let i = $index) {
        <button [attr.aria-pressed]="r.activeHotspot() === spot.id" (click)="inspect(spot.id)">
          {{ i + 1 }} \xB7 {{ spot.label
          }}<small>{{ r.draft().inspectedIds.includes(spot.id) ? 'Viewed' : 'Inspect' }}</small>
        </button>
      }
    </div>
  </div>
  <aside class="field-notes">
    @if (r.session().mode === 'repair') {
      <section class="repair-controls" aria-label="Cargo intervention">
        <h3>Choose what to change</h3>
        <label
          >Intervention<select
            aria-label="Cargo intervention"
            [value]="r.draft().optionId"
            (change)="r.selectOption($any($event.target).value)"
          >
            <option value="">Choose a repair</option>
            @for (option of r.mission().repair.options; track option.id) {
              <option [value]="option.id">{{ option.label }}</option>
            }
          </select></label
        >
        @if (selectedOption(); as option) {
          <p>{{ option.description }}</p>
        }
        <button class="primary" (click)="r.run()">\u25B6 Run repair test</button>
        <p class="feedback" role="status">{{ r.message() }}</p>
        <details>
          <summary>Trial replays ({{ r.draft().trials.length }})</summary>
          <div class="button-row">
            @for (trial of r.draft().trials; track trial.id) {
              <button (click)="r.replayId.set(trial.id)">
                Replay {{ trial.id }} \xB7 {{ trial.supported ? 'Cargo removed' : 'Conflict remains' }}
              </button>
            }
          </div>
        </details>
      </section>
    }
    @if (hotspot(); as spot) {
      <article class="inspection" #inspector tabindex="-1">
        <span class="eyebrow">INSPECTION</span>
        <h3>{{ spot.label }}</h3>
        <p>{{ spot.description }}</p>
      </article>
    } @else {
      <article class="inspection">
        <span class="eyebrow">START HERE</span>
        <h3>A crate in the wrong century?</h3>
        <p>{{ r.mission().signal }}</p>
        <button class="primary" (click)="inspect(r.mission().repair.targetHotspotId)">
          Inspect flagged cargo
        </button>
      </article>
    }
    <h3>Compare with a source</h3>
    <div class="source-buttons">
      @for (id of r.session().evidenceIds; track id) {
        @for (e of r.config.evidence; track e.id) {
          @if (e.id === id) {
            <button [attr.aria-pressed]="r.sourceId() === id" (click)="r.sourceId.set(id)">
              {{ e.title }} \u2197
            </button>
          }
        }
      }
    </div>
    <app-repair-week-source [source]="r.selectedSource()" />
  </aside>
</div>
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-week-activity.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton:hover {\n  background: #eff5ef;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true],\nbutton[aria-current=step] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n:is(button, input, select, textarea, a, summary):focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na {\n  color: #116457;\n}\np {\n  margin: 6px 0 14px;\n}\nh2 {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3 {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4 {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid,\n.timeline-workbench {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list button {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection p {\n  font-size: 12px;\n}\n.source-buttons {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons button {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card p {\n  font-size: 12px;\n}\n.source-card a {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls p {\n  font-size: 11px;\n}\n.option-card {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card small {\n  margin-top: 5px;\n}\n.feedback {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback:empty {\n  display: none;\n}\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row button {\n  font-size: 11px;\n}\n.toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar h3 {\n  margin: 5px 0;\n}\n.timeline-workbench .feedback {\n  margin: 0 16px 12px;\n}\n.event-list {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list li {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy h3 {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy p {\n  font-size: 11px;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect,\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea {\n  resize: vertical;\n}\n.archive-art {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab {\n  padding: 18px;\n}\n.ripple-banner {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner .eyebrow {\n  color: #c4dbc9;\n}\n.ripple-banner h3 {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner p {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle {\n  margin: 18px 0;\n}\n.ripple-lab .toolbar {\n  padding: 14px 0;\n}\n.ripple-steps {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps button {\n  font-size: 12px;\n}\n.ripple-steps span {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison article {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison h3 {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison .repaired {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison .repaired.active {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench {\n  padding: 4px 0 16px;\n}\n.panel-picker {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker button {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card > img {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption {\n  padding: 22px;\n}\n.caption-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption a {\n  font-size: 11px;\n}\n.exhibit-caption small {\n  margin-top: 9px;\n}\n.image-credit {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor .art-note {\n  padding: 0;\n}\n.touring .exhibit-grid {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring .exhibit-card > img {\n  max-height: 430px;\n}\n.touring .exhibit-caption h2 {\n  font-size: 32px;\n}\n.tour-controls {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes {\n    padding: 12px;\n  }\n  .exhibit-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: 1fr;\n  }\n  .field-notes {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab {\n    padding: 12px;\n  }\n  .ripple-banner {\n    padding: 18px;\n  }\n  .ripple-steps {\n    gap: 5px;\n  }\n  .ripple-steps button {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison article {\n    padding: 16px;\n  }\n  .exhibit-caption {\n    padding: 16px;\n  }\n  .exhibit-grid {\n    padding: 0 10px;\n  }\n  .touring .exhibit-caption h2 {\n    font-size: 27px;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */\n'] }]
  }], null, { inspector: [{ type: ViewChild, args: ["inspector", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RepairSceneWorkbenchComponent, { className: "RepairSceneWorkbenchComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-scene.component.ts", lineNumber: 21 });
})();

// src/app/templates/time-repair/ui/time-repair-week-timeline.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function RepairTimelineWorkbenchComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function RepairTimelineWorkbenchComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.checkSequence());
    });
    \u0275\u0275text(1, "Check date order");
    \u0275\u0275elementEnd();
  }
}
function RepairTimelineWorkbenchComponent_For_10_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function RepairTimelineWorkbenchComponent_For_10_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const \u0275$index_19_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.moveNode(\u0275$index_19_r4, -1));
    });
    \u0275\u0275text(2, " \u2191 Earlier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function RepairTimelineWorkbenchComponent_For_10_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const \u0275$index_19_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.moveNode(\u0275$index_19_r4, 1));
    });
    \u0275\u0275text(4, " \u2193 Later ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    const node_r6 = ctx_r4.$implicit;
    const \u0275$index_19_r4 = ctx_r4.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", \u0275$index_19_r4 === 0);
    \u0275\u0275attribute("aria-label", "Move " + node_r6.title + " earlier");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_19_r4 === ctx_r1.nodes().length - 1);
    \u0275\u0275attribute("aria-label", "Move " + node_r6.title + " later");
  }
}
function RepairTimelineWorkbenchComponent_For_10_Conditional_11_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r8 = ctx.$implicit;
    \u0275\u0275property("value", e_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r8.title);
  }
}
function RepairTimelineWorkbenchComponent_For_10_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Source for this event");
    \u0275\u0275elementStart(2, "select", 17);
    \u0275\u0275listener("change", function RepairTimelineWorkbenchComponent_For_10_Conditional_11_Template_select_change_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const node_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.link(node_r6.id, $event.target.value));
    });
    \u0275\u0275elementStart(3, "option", 18);
    \u0275\u0275text(4, "No source attached");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, RepairTimelineWorkbenchComponent_For_10_Conditional_11_For_6_Template, 2, 2, "option", 19, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.r.draft().links[node_r6.id] || "");
    \u0275\u0275attribute("aria-label", "Source for " + node_r6.title);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.sources());
  }
}
function RepairTimelineWorkbenchComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, RepairTimelineWorkbenchComponent_For_10_Conditional_10_Template, 5, 4, "div", 15)(11, RepairTimelineWorkbenchComponent_For_10_Conditional_11_Template, 7, 2, "label");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r6 = ctx.$implicit;
    const \u0275$index_19_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_19_r4 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(node_r6.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r6.summary);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.r.session().mode === "sequence" ? 10 : 11);
  }
}
function RepairTimelineWorkbenchComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function RepairTimelineWorkbenchComponent_For_21_Template_button_click_0_listener() {
      const e_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.sourceId.set(e_r10.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r1.r.sourceId() === e_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r10.title, " \u2197 ");
  }
}
var RepairTimelineWorkbenchComponent = class _RepairTimelineWorkbenchComponent {
  r = inject(RepairPreviewRuntime);
  nodes = computed(
    () => this.r.draft().nodeIds.map((id) => this.r.config.nodes.find((n) => n.id === id)),
    ...ngDevMode ? [{ debugName: "nodes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sources = computed(
    () => this.r.config.evidence.filter((e) => this.r.session().evidenceIds.includes(e.id)),
    ...ngDevMode ? [{ debugName: "sources" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function RepairTimelineWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairTimelineWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RepairTimelineWorkbenchComponent, selectors: [["app-repair-timeline-workbench"]], decls: 23, vars: 7, consts: [[1, "timeline-workbench"], ["aria-label", "Editable event sequence"], [1, "toolbar"], [1, "primary"], ["role", "status", 1, "feedback"], [1, "event-list"], [1, "field-notes"], [1, "archive-art", 3, "src", "alt"], [1, "art-note"], [1, "source-buttons"], [3, "source"], [1, "primary", 3, "click"], [1, "event-number"], [1, "event-copy"], [1, "eyebrow"], [1, "button-row"], [3, "click", "disabled"], [3, "change", "value"], ["value", ""], [3, "value"], [3, "click"]], template: function RepairTimelineWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h3");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, RepairTimelineWorkbenchComponent_Conditional_5_Template, 2, 0, "button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "ol", 5);
      \u0275\u0275repeaterCreate(9, RepairTimelineWorkbenchComponent_For_10_Template, 12, 5, "li", null, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "aside", 6);
      \u0275\u0275element(12, "img", 7);
      \u0275\u0275elementStart(13, "p", 8);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "h3");
      \u0275\u0275text(16, "Read before you connect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18, "Choose a source to see what it supports and where it stops.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 9);
      \u0275\u0275repeaterCreate(20, RepairTimelineWorkbenchComponent_For_21_Template, 2, 2, "button", null, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "app-repair-week-source", 10);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.r.session().mode === "sequence" ? "Rebuild the sequence" : "Attach the evidence", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.r.session().mode === "sequence" ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.message());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.nodes());
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.r.illustration().src, \u0275\u0275sanitizeUrl)("alt", ctx.r.illustration().alt);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.illustration().caption);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.sources());
      \u0275\u0275advance(2);
      \u0275\u0275property("source", ctx.r.selectedSource());
    }
  }, dependencies: [RepairWeekSourceComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #eff5ef;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%], \nbutton[aria-current=step][_ngcontent-%COMP%] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, a, summary):focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #116457;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid[_ngcontent-%COMP%], \n.timeline-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene[_ngcontent-%COMP%] {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card[_ngcontent-%COMP%] {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls[_ngcontent-%COMP%] {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.option-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.feedback[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.timeline-workbench[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  margin: 0 16px 12px;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.archive-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.ripple-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #c4dbc9;\n}\n.ripple-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle[_ngcontent-%COMP%] {\n  margin: 18px 0;\n}\n.ripple-lab[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  padding: 14px 0;\n}\n.ripple-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ripple-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired[_ngcontent-%COMP%] {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired.active[_ngcontent-%COMP%] {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf[_ngcontent-%COMP%] {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench[_ngcontent-%COMP%] {\n  padding: 4px 0 16px;\n}\n.panel-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.caption-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 9px;\n}\n.image-credit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor[_ngcontent-%COMP%]   .art-note[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-grid[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  max-height: 430px;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art[_ngcontent-%COMP%] {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ripple-banner[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ripple-steps[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-caption[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairTimelineWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-repair-timeline-workbench", imports: [RepairWeekSourceComponent], template: `<div class="timeline-workbench">
    <section aria-label="Editable event sequence">
      <div class="toolbar">
        <h3>
          {{ r.session().mode === 'sequence' ? 'Rebuild the sequence' : 'Attach the evidence' }}
        </h3>
        @if (r.session().mode === 'sequence') {
          <button class="primary" (click)="r.checkSequence()">Check date order</button>
        }
      </div>
      <p class="feedback" role="status">{{ r.message() }}</p>
      <ol class="event-list">
        @for (node of nodes(); track node.id; let i = $index) {
          <li>
            <span class="event-number">{{ i + 1 }}</span>
            <div class="event-copy">
              <span class="eyebrow">{{ node.dateLabel }}</span>
              <h3>{{ node.title }}</h3>
              <p>{{ node.summary }}</p>
              @if (r.session().mode === 'sequence') {
                <div class="button-row">
                  <button
                    [disabled]="i === 0"
                    [attr.aria-label]="'Move ' + node.title + ' earlier'"
                    (click)="r.moveNode(i, -1)"
                  >
                    \u2191 Earlier</button
                  ><button
                    [disabled]="i === nodes().length - 1"
                    [attr.aria-label]="'Move ' + node.title + ' later'"
                    (click)="r.moveNode(i, 1)"
                  >
                    \u2193 Later
                  </button>
                </div>
              } @else {
                <label
                  >Source for this event<select
                    [attr.aria-label]="'Source for ' + node.title"
                    [value]="r.draft().links[node.id] || ''"
                    (change)="r.link(node.id, $any($event.target).value)"
                  >
                    <option value="">No source attached</option>
                    @for (e of sources(); track e.id) {
                      <option [value]="e.id">{{ e.title }}</option>
                    }
                  </select></label
                >
              }
            </div>
          </li>
        }
      </ol>
    </section>
    <aside class="field-notes">
      <img class="archive-art" [src]="r.illustration().src" [alt]="r.illustration().alt" />
      <p class="art-note">{{ r.illustration().caption }}</p>
      <h3>Read before you connect</h3>
      <p>Choose a source to see what it supports and where it stops.</p>
      <div class="source-buttons">
        @for (e of sources(); track e.id) {
          <button [attr.aria-pressed]="r.sourceId() === e.id" (click)="r.sourceId.set(e.id)">
            {{ e.title }} \u2197
          </button>
        }
      </div>
      <app-repair-week-source [source]="r.selectedSource()" />
    </aside>
  </div>`, changeDetection: ChangeDetectionStrategy.OnPush, styles: ['/* src/app/templates/time-repair/ui/time-repair-week-activity.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton:hover {\n  background: #eff5ef;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true],\nbutton[aria-current=step] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n:is(button, input, select, textarea, a, summary):focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na {\n  color: #116457;\n}\np {\n  margin: 6px 0 14px;\n}\nh2 {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3 {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4 {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid,\n.timeline-workbench {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list button {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection p {\n  font-size: 12px;\n}\n.source-buttons {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons button {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card p {\n  font-size: 12px;\n}\n.source-card a {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls p {\n  font-size: 11px;\n}\n.option-card {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card small {\n  margin-top: 5px;\n}\n.feedback {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback:empty {\n  display: none;\n}\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row button {\n  font-size: 11px;\n}\n.toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar h3 {\n  margin: 5px 0;\n}\n.timeline-workbench .feedback {\n  margin: 0 16px 12px;\n}\n.event-list {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list li {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy h3 {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy p {\n  font-size: 11px;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect,\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea {\n  resize: vertical;\n}\n.archive-art {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab {\n  padding: 18px;\n}\n.ripple-banner {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner .eyebrow {\n  color: #c4dbc9;\n}\n.ripple-banner h3 {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner p {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle {\n  margin: 18px 0;\n}\n.ripple-lab .toolbar {\n  padding: 14px 0;\n}\n.ripple-steps {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps button {\n  font-size: 12px;\n}\n.ripple-steps span {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison article {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison h3 {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison .repaired {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison .repaired.active {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench {\n  padding: 4px 0 16px;\n}\n.panel-picker {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker button {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card > img {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption {\n  padding: 22px;\n}\n.caption-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption a {\n  font-size: 11px;\n}\n.exhibit-caption small {\n  margin-top: 9px;\n}\n.image-credit {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor .art-note {\n  padding: 0;\n}\n.touring .exhibit-grid {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring .exhibit-card > img {\n  max-height: 430px;\n}\n.touring .exhibit-caption h2 {\n  font-size: 32px;\n}\n.tour-controls {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes {\n    padding: 12px;\n  }\n  .exhibit-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: 1fr;\n  }\n  .field-notes {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab {\n    padding: 12px;\n  }\n  .ripple-banner {\n    padding: 18px;\n  }\n  .ripple-steps {\n    gap: 5px;\n  }\n  .ripple-steps button {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison article {\n    padding: 16px;\n  }\n  .exhibit-caption {\n    padding: 16px;\n  }\n  .exhibit-grid {\n    padding: 0 10px;\n  }\n  .touring .exhibit-caption h2 {\n    font-size: 27px;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RepairTimelineWorkbenchComponent, { className: "RepairTimelineWorkbenchComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-timeline.component.ts", lineNumber: 80 });
})();

// src/app/templates/time-repair/ui/time-repair-week-ripple.component.ts
var _forTrack03 = ($index, $item) => $item.nodeId;
var _forTrack1 = ($index, $item) => $item.id;
function RepairRippleWorkbenchComponent_Conditional_8_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    \u0275\u0275property("value", o_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r3.label);
  }
}
function RepairRippleWorkbenchComponent_Conditional_8_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Showing trial ", ctx_r1.r.trial().id, " \xB7 ", o_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r4.description);
  }
}
function RepairRippleWorkbenchComponent_Conditional_8_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Conditional_8_For_15_Template_button_click_0_listener() {
      const trial_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.r.replayId.set(trial_r6.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trial_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.r.trial()?.id === trial_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Replay ", trial_r6.id, " ");
  }
}
function RepairRippleWorkbenchComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "label");
    \u0275\u0275text(2, "Intervention");
    \u0275\u0275elementStart(3, "select", 14);
    \u0275\u0275listener("change", function RepairRippleWorkbenchComponent_Conditional_8_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.selectOption($event.target.value));
    });
    \u0275\u0275elementStart(4, "option", 15);
    \u0275\u0275text(5, "Choose what to change");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, RepairRippleWorkbenchComponent_Conditional_8_For_7_Template, 2, 2, "option", 16, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 17);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Conditional_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.run());
    });
    \u0275\u0275text(9, "\u25B6 Run repair test");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 18);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, RepairRippleWorkbenchComponent_Conditional_8_Conditional_12_Template, 4, 3);
    \u0275\u0275elementStart(13, "div", 19);
    \u0275\u0275repeaterCreate(14, RepairRippleWorkbenchComponent_Conditional_8_For_15_Template, 2, 2, "button", null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.r.draft().optionId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.r.mission().repair.options);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.r.message());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.option()) ? 12 : -1, tmp_4_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.r.draft().trials);
  }
}
function RepairRippleWorkbenchComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "button", 21);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.repaired.set(false));
    });
    \u0275\u0275text(2, "Damaged record");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Conditional_9_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.repaired.set(true));
    });
    \u0275\u0275text(4, "Cargo removed");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", !ctx_r1.repaired());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.repaired());
  }
}
function RepairRippleWorkbenchComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_For_12_Template_button_click_0_listener() {
      const \u0275$index_59_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.rippleIndex.set(\u0275$index_59_r9));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ripple_r10 = ctx.$implicit;
    const \u0275$index_59_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-current", ctx_r1.r.rippleIndex() === \u0275$index_59_r9 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_59_r9 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.date(ripple_r10.nodeId), " ");
  }
}
function RepairRippleWorkbenchComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Premature cargo removed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.ripple().after);
  }
}
function RepairRippleWorkbenchComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Run a comparison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Choose an intervention above to see whether this downstream interpretation changes.");
    \u0275\u0275elementEnd();
  }
}
function RepairRippleWorkbenchComponent_Conditional_28_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " The model does not accept this intervention as a source-supported repair. It leaves the downstream conflict unresolved. ");
    \u0275\u0275elementEnd();
  }
}
function RepairRippleWorkbenchComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, RepairRippleWorkbenchComponent_Conditional_28_Conditional_4_Template, 2, 0, "p");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.option()?.objectLabel || "Damaged record remains");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.ripple().before);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.r.session().mode === "compare" ? 4 : -1);
  }
}
function RepairRippleWorkbenchComponent_For_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_For_43_Template_button_click_0_listener() {
      const e_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.r.sourceId.set(e_r12.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r12.title);
  }
}
var RepairRippleWorkbenchComponent = class _RepairRippleWorkbenchComponent {
  r = inject(RepairPreviewRuntime);
  repaired = signal(
    false,
    ...ngDevMode ? [{ debugName: "repaired" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ripple = computed(
    () => this.r.mission().ripples[this.r.rippleIndex()],
    ...ngDevMode ? [{ debugName: "ripple" }] : (
      /* istanbul ignore next */
      []
    )
  );
  node = computed(
    () => this.r.config.nodes.find((n) => n.id === this.ripple().nodeId),
    ...ngDevMode ? [{ debugName: "node" }] : (
      /* istanbul ignore next */
      []
    )
  );
  option = computed(
    () => this.r.mission().repair.options.find((o) => o.id === this.r.trial()?.optionId),
    ...ngDevMode ? [{ debugName: "option" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previous = (index) => Math.max(0, index - 1);
  next = (index) => Math.min(this.r.mission().ripples.length - 1, index + 1);
  date(id) {
    return this.r.config.nodes.find((n) => n.id === id).dateLabel;
  }
  static \u0275fac = function RepairRippleWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairRippleWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RepairRippleWorkbenchComponent, selectors: [["app-repair-ripple-workbench"]], decls: 45, vars: 13, consts: [["aria-label", "Consequence model", 1, "ripple-lab"], [1, "ripple-banner"], [1, "eyebrow"], ["aria-label", "Record state", 1, "button-row", "record-toggle"], ["aria-label", "Downstream moments", 1, "ripple-steps"], [1, "moment-title"], ["aria-live", "polite", 1, "ripple-comparison"], [1, "damaged"], [1, "repaired"], [1, "toolbar"], [3, "click", "disabled"], [1, "source-shelf"], [1, "source-buttons"], [3, "source"], ["aria-label", "Compare intervention", 3, "change", "value"], ["value", ""], [3, "value"], [1, "primary", 3, "click"], ["role", "status", 1, "feedback"], [1, "button-row"], [1, "trial-label"], [3, "click"]], template: function RepairRippleWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "ONE CHANGE \xB7 THREE LATER MOMENTS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h3");
      \u0275\u0275text(5, "What follows the cargo?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, " Compare authored interpretations of the record. This model does not simulate alternate world history. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, RepairRippleWorkbenchComponent_Conditional_8_Template, 16, 3)(9, RepairRippleWorkbenchComponent_Conditional_9_Template, 5, 2, "div", 3);
      \u0275\u0275elementStart(10, "nav", 4);
      \u0275\u0275repeaterCreate(11, RepairRippleWorkbenchComponent_For_12_Template, 4, 3, "button", null, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "h3", 5);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 6)(16, "article", 7)(17, "span", 2);
      \u0275\u0275text(18, "DAMAGED BASELINE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "h3");
      \u0275\u0275text(20, "Cargo stays in 1490");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "article", 8)(24, "span", 2);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, RepairRippleWorkbenchComponent_Conditional_26_Template, 4, 1)(27, RepairRippleWorkbenchComponent_Conditional_27_Template, 4, 0)(28, RepairRippleWorkbenchComponent_Conditional_28_Template, 5, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 9)(30, "button", 10);
      \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Template_button_click_30_listener() {
        return ctx.r.rippleIndex.update(ctx.previous);
      });
      \u0275\u0275text(31, " \u2190 Previous moment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span");
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 10);
      \u0275\u0275listener("click", function RepairRippleWorkbenchComponent_Template_button_click_34_listener() {
        return ctx.r.rippleIndex.update(ctx.next);
      });
      \u0275\u0275text(35, " Next moment \u2192 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "details", 11)(37, "summary");
      \u0275\u0275text(38, "Sources and limits of this model");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "p");
      \u0275\u0275text(40, " These changes follow the configured evidence narrative; they are not proof of every later social effect. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 12);
      \u0275\u0275repeaterCreate(42, RepairRippleWorkbenchComponent_For_43_Template, 2, 1, "button", null, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275element(44, "app-repair-week-source", 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.r.session().mode === "compare" ? 8 : 9);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.r.mission().ripples);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.node().dateLabel, " \xB7 ", ctx.node().title);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.ripple().before);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.r.session().mode === "compare" ? ctx.r.trial()?.supported : ctx.repaired());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.session().mode === "compare" ? "SELECTED TRIAL" : "SELECTED RECORD");
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.r.session().mode === "compare" ? ctx.r.trial()?.supported : ctx.repaired()) ? 26 : ctx.r.session().mode === "compare" && !ctx.r.trial() ? 27 : 28);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.r.rippleIndex() === 0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.r.rippleIndex() + 1, " / ", ctx.r.mission().ripples.length);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.r.rippleIndex() === ctx.r.mission().ripples.length - 1);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.r.config.evidence);
      \u0275\u0275advance(2);
      \u0275\u0275property("source", ctx.r.selectedSource());
    }
  }, dependencies: [RepairWeekSourceComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #eff5ef;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%], \nbutton[aria-current=step][_ngcontent-%COMP%] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, a, summary):focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #116457;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid[_ngcontent-%COMP%], \n.timeline-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene[_ngcontent-%COMP%] {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card[_ngcontent-%COMP%] {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls[_ngcontent-%COMP%] {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.option-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.feedback[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.timeline-workbench[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  margin: 0 16px 12px;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.archive-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.ripple-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #c4dbc9;\n}\n.ripple-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle[_ngcontent-%COMP%] {\n  margin: 18px 0;\n}\n.ripple-lab[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  padding: 14px 0;\n}\n.ripple-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ripple-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired[_ngcontent-%COMP%] {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired.active[_ngcontent-%COMP%] {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf[_ngcontent-%COMP%] {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench[_ngcontent-%COMP%] {\n  padding: 4px 0 16px;\n}\n.panel-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.caption-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 9px;\n}\n.image-credit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor[_ngcontent-%COMP%]   .art-note[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-grid[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  max-height: 430px;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art[_ngcontent-%COMP%] {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ripple-banner[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ripple-steps[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-caption[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairRippleWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-repair-ripple-workbench", imports: [RepairWeekSourceComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="ripple-lab" aria-label="Consequence model">
  <div class="ripple-banner">
    <span class="eyebrow">ONE CHANGE \xB7 THREE LATER MOMENTS</span>
    <h3>What follows the cargo?</h3>
    <p>
      Compare authored interpretations of the record. This model does not simulate alternate world
      history.
    </p>
  </div>
  @if (r.session().mode === 'compare') {
    <div class="toolbar">
      <label
        >Intervention<select
          aria-label="Compare intervention"
          [value]="r.draft().optionId"
          (change)="r.selectOption($any($event.target).value)"
        >
          <option value="">Choose what to change</option>
          @for (o of r.mission().repair.options; track o.id) {
            <option [value]="o.id">{{ o.label }}</option>
          }
        </select></label
      ><button class="primary" (click)="r.run()">\u25B6 Run repair test</button>
    </div>
    <p class="feedback" role="status">{{ r.message() }}</p>
    @if (option(); as o) {
      <p class="trial-label">Showing trial {{ r.trial()!.id }} \xB7 {{ o.label }}</p>
      <p>{{ o.description }}</p>
    }
    <div class="button-row">
      @for (trial of r.draft().trials; track trial.id) {
        <button [attr.aria-pressed]="r.trial()?.id === trial.id" (click)="r.replayId.set(trial.id)">
          Replay {{ trial.id }}
        </button>
      }
    </div>
  } @else {
    <div class="button-row record-toggle" aria-label="Record state">
      <button [attr.aria-pressed]="!repaired()" (click)="repaired.set(false)">Damaged record</button
      ><button [attr.aria-pressed]="repaired()" (click)="repaired.set(true)">Cargo removed</button>
    </div>
  }
  <nav class="ripple-steps" aria-label="Downstream moments">
    @for (ripple of r.mission().ripples; track ripple.nodeId; let i = $index) {
      <button
        [attr.aria-current]="r.rippleIndex() === i ? 'step' : null"
        (click)="r.rippleIndex.set(i)"
      >
        <span>{{ i + 1 }}</span
        >{{ date(ripple.nodeId) }}
      </button>
    }
  </nav>
  <h3 class="moment-title">{{ node().dateLabel }} \xB7 {{ node().title }}</h3>
  <div class="ripple-comparison" aria-live="polite">
    <article class="damaged">
      <span class="eyebrow">DAMAGED BASELINE</span>
      <h3>Cargo stays in 1490</h3>
      <p>{{ ripple().before }}</p>
    </article>
    <article
      class="repaired"
      [class.active]="r.session().mode === 'compare' ? r.trial()?.supported : repaired()"
    >
      <span class="eyebrow">{{
        r.session().mode === 'compare' ? 'SELECTED TRIAL' : 'SELECTED RECORD'
      }}</span>
      @if (r.session().mode === 'compare' ? r.trial()?.supported : repaired()) {
        <h3>Premature cargo removed</h3>
        <p>{{ ripple().after }}</p>
      } @else if (r.session().mode === 'compare' && !r.trial()) {
        <h3>Run a comparison</h3>
        <p>Choose an intervention above to see whether this downstream interpretation changes.</p>
      } @else {
        <h3>{{ option()?.objectLabel || 'Damaged record remains' }}</h3>
        <p>{{ ripple().before }}</p>
        @if (r.session().mode === 'compare') {
          <p>
            The model does not accept this intervention as a source-supported repair. It leaves the
            downstream conflict unresolved.
          </p>
        }
      }
    </article>
  </div>
  <div class="toolbar">
    <button [disabled]="r.rippleIndex() === 0" (click)="r.rippleIndex.update(previous)">
      \u2190 Previous moment</button
    ><span>{{ r.rippleIndex() + 1 }} / {{ r.mission().ripples.length }}</span
    ><button
      [disabled]="r.rippleIndex() === r.mission().ripples.length - 1"
      (click)="r.rippleIndex.update(next)"
    >
      Next moment \u2192
    </button>
  </div>
  <details class="source-shelf">
    <summary>Sources and limits of this model</summary>
    <p>
      These changes follow the configured evidence narrative; they are not proof of every later
      social effect.
    </p>
    <div class="source-buttons">
      @for (e of r.config.evidence; track e.id) {
        <button (click)="r.sourceId.set(e.id)">{{ e.title }}</button>
      }
    </div>
    <app-repair-week-source [source]="r.selectedSource()" />
  </details>
</section>
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-week-activity.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton:hover {\n  background: #eff5ef;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true],\nbutton[aria-current=step] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n:is(button, input, select, textarea, a, summary):focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na {\n  color: #116457;\n}\np {\n  margin: 6px 0 14px;\n}\nh2 {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3 {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4 {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid,\n.timeline-workbench {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list button {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection p {\n  font-size: 12px;\n}\n.source-buttons {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons button {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card p {\n  font-size: 12px;\n}\n.source-card a {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls p {\n  font-size: 11px;\n}\n.option-card {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card small {\n  margin-top: 5px;\n}\n.feedback {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback:empty {\n  display: none;\n}\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row button {\n  font-size: 11px;\n}\n.toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar h3 {\n  margin: 5px 0;\n}\n.timeline-workbench .feedback {\n  margin: 0 16px 12px;\n}\n.event-list {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list li {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy h3 {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy p {\n  font-size: 11px;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect,\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea {\n  resize: vertical;\n}\n.archive-art {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab {\n  padding: 18px;\n}\n.ripple-banner {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner .eyebrow {\n  color: #c4dbc9;\n}\n.ripple-banner h3 {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner p {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle {\n  margin: 18px 0;\n}\n.ripple-lab .toolbar {\n  padding: 14px 0;\n}\n.ripple-steps {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps button {\n  font-size: 12px;\n}\n.ripple-steps span {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison article {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison h3 {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison .repaired {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison .repaired.active {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench {\n  padding: 4px 0 16px;\n}\n.panel-picker {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker button {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card > img {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption {\n  padding: 22px;\n}\n.caption-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption a {\n  font-size: 11px;\n}\n.exhibit-caption small {\n  margin-top: 9px;\n}\n.image-credit {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor .art-note {\n  padding: 0;\n}\n.touring .exhibit-grid {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring .exhibit-card > img {\n  max-height: 430px;\n}\n.touring .exhibit-caption h2 {\n  font-size: 32px;\n}\n.tour-controls {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes {\n    padding: 12px;\n  }\n  .exhibit-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: 1fr;\n  }\n  .field-notes {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab {\n    padding: 12px;\n  }\n  .ripple-banner {\n    padding: 18px;\n  }\n  .ripple-steps {\n    gap: 5px;\n  }\n  .ripple-steps button {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison article {\n    padding: 16px;\n  }\n  .exhibit-caption {\n    padding: 16px;\n  }\n  .exhibit-grid {\n    padding: 0 10px;\n  }\n  .touring .exhibit-caption h2 {\n    font-size: 27px;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RepairRippleWorkbenchComponent, { className: "RepairRippleWorkbenchComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-ripple.component.ts", lineNumber: 12 });
})();

// src/app/templates/time-repair/ui/time-repair-week-exhibit.component.ts
var _c03 = ["card"];
var _forTrack04 = ($index, $item) => $item.id;
function RepairExhibitWorkbenchComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_8_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.touring.set(false));
    });
    \u0275\u0275text(1, "Return to editing");
    \u0275\u0275elementEnd();
  }
}
function RepairExhibitWorkbenchComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_8_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.rehearse());
    });
    \u0275\u0275text(1, "\u25B6 Rehearse tour");
    \u0275\u0275elementEnd();
  }
}
function RepairExhibitWorkbenchComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, RepairExhibitWorkbenchComponent_Conditional_8_Conditional_0_Template, 2, 0, "button")(1, RepairExhibitWorkbenchComponent_Conditional_8_Conditional_1_Template, 2, 0, "button", 14);
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.download());
    });
    \u0275\u0275text(3, "Download draft");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.touring() ? 0 : 1);
  }
}
function RepairExhibitWorkbenchComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_For_11_Template_button_click_0_listener() {
      const \u0275$index_29_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(\u0275$index_29_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const panel_r7 = ctx.$implicit;
    const \u0275$index_29_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r2.r.panelIndex() === \u0275$index_29_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275$index_29_r6 + 1, " \xB7 ", panel_r7.title || "Untitled panel", " ");
  }
}
function RepairExhibitWorkbenchComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r8 = ctx;
    \u0275\u0275property("href", e_r8.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Source: ", e_r8.title, " \u2197");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r8.citation);
  }
}
function RepairExhibitWorkbenchComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "No source credit selected.");
    \u0275\u0275elementEnd();
  }
}
function RepairExhibitWorkbenchComponent_Conditional_30_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const image_r10 = ctx.$implicit;
    \u0275\u0275property("value", image_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(image_r10.title);
  }
}
function RepairExhibitWorkbenchComponent_Conditional_30_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r11 = ctx.$implicit;
    \u0275\u0275property("value", e_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r11.title);
  }
}
function RepairExhibitWorkbenchComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 12)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4, "Exhibit title");
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275listener("ngModelChange", function RepairExhibitWorkbenchComponent_Conditional_30_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.editPanel({ title: $event }));
    })("blur", function RepairExhibitWorkbenchComponent_Conditional_30_Template_input_blur_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.save());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Exhibit caption");
    \u0275\u0275elementStart(8, "textarea", 19);
    \u0275\u0275listener("ngModelChange", function RepairExhibitWorkbenchComponent_Conditional_30_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.editPanel({ caption: $event }));
    })("blur", function RepairExhibitWorkbenchComponent_Conditional_30_Template_textarea_blur_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.save());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "Illustration");
    \u0275\u0275elementStart(11, "select", 20);
    \u0275\u0275listener("ngModelChange", function RepairExhibitWorkbenchComponent_Conditional_30_Template_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.r.editPanel({ imageId: $event });
      return \u0275\u0275resetView(ctx_r2.r.save());
    });
    \u0275\u0275repeaterCreate(12, RepairExhibitWorkbenchComponent_Conditional_30_For_13_Template, 2, 2, "option", 21, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Source credit");
    \u0275\u0275elementStart(16, "select", 22);
    \u0275\u0275listener("ngModelChange", function RepairExhibitWorkbenchComponent_Conditional_30_Template_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.r.editPanel({ evidenceId: $event });
      return \u0275\u0275resetView(ctx_r2.r.save());
    });
    \u0275\u0275elementStart(17, "option", 23);
    \u0275\u0275text(18, "No source credit");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, RepairExhibitWorkbenchComponent_Conditional_30_For_20_Template, 2, 2, "option", 21, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 4)(22, "button", 24);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_30_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.movePanel(-1));
    });
    \u0275\u0275text(23, "\u2191 Move earlier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 24);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_30_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.r.movePanel(1));
    });
    \u0275\u0275text(25, " \u2193 Move later ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "p", 25);
    \u0275\u0275text(27, " This text is the actual exhibit product. You can rewrite or clear the sample. Images are illustrations, and captions still need human review. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Edit panel ", ctx_r2.r.panelIndex() + 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.r.activePanel().title);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.r.activePanel().caption);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.r.activePanel().imageId);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.r.config.previewWeeks.illustrations);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.r.activePanel().evidenceId);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.r.config.evidence);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.r.panelIndex() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.r.panelIndex() === ctx_r2.r.draft().panels.length - 1);
  }
}
function RepairExhibitWorkbenchComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 24);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_31_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(ctx_r2.r.panelIndex() - 1));
    });
    \u0275\u0275text(2, " \u2190 Previous panel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function RepairExhibitWorkbenchComponent_Conditional_31_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(ctx_r2.r.panelIndex() + 1));
    });
    \u0275\u0275text(6, " Next panel \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.r.panelIndex() === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.r.panelIndex() + 1, " of ", ctx_r2.r.draft().panels.length);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.r.panelIndex() === ctx_r2.r.draft().panels.length - 1);
  }
}
var RepairExhibitWorkbenchComponent = class _RepairExhibitWorkbenchComponent {
  r = inject(RepairPreviewRuntime);
  touring = signal(
    this.r.example,
    ...ngDevMode ? [{ debugName: "touring" }] : (
      /* istanbul ignore next */
      []
    )
  );
  illustration = computed(
    () => this.r.config.previewWeeks.illustrations.find((i) => i.id === this.r.activePanel().imageId),
    ...ngDevMode ? [{ debugName: "illustration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = computed(
    () => this.r.config.evidence.find((e) => e.id === this.r.activePanel().evidenceId),
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  card = viewChild(
    "card",
    ...ngDevMode ? [{ debugName: "card" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  select(index) {
    this.r.save();
    this.r.panelIndex.set(index);
    if (this.touring())
      this.focus();
  }
  rehearse() {
    this.r.save();
    this.touring.set(true);
    this.r.panelIndex.set(0);
    this.focus();
  }
  focus() {
    afterNextRender(() => {
      const el = this.card()?.nativeElement;
      el?.scrollIntoView({ block: "nearest", behavior: "instant" });
      el?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function RepairExhibitWorkbenchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RepairExhibitWorkbenchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RepairExhibitWorkbenchComponent, selectors: [["app-repair-exhibit-workbench"]], viewQuery: function RepairExhibitWorkbenchComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.card, _c03, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 32, vars: 15, consts: [["card", ""], ["aria-label", "Illustrated exhibit", 1, "exhibit-workbench"], [1, "toolbar"], [1, "eyebrow"], [1, "button-row"], ["aria-label", "Exhibit panels", 1, "panel-picker"], [1, "exhibit-grid"], ["tabindex", "-1", "aria-label", "Live exhibit panel", 1, "exhibit-card"], [3, "src", "alt"], [1, "exhibit-caption"], [1, "caption-text"], [1, "image-credit"], ["aria-label", "Edit exhibit panel", 1, "caption-editor"], [1, "toolbar", "tour-controls"], [1, "primary"], [3, "click"], [1, "primary", 3, "click"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["aria-label", "Exhibit title", "maxlength", "180", 3, "ngModelChange", "blur", "ngModel"], ["aria-label", "Exhibit caption", "maxlength", "2400", "rows", "7", 3, "ngModelChange", "blur", "ngModel"], ["aria-label", "Exhibit illustration", 3, "ngModelChange", "ngModel"], [3, "value"], ["aria-label", "Exhibit source credit", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "click", "disabled"], [1, "art-note"]], template: function RepairExhibitWorkbenchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "div")(3, "span", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h3");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275conditionalCreate(8, RepairExhibitWorkbenchComponent_Conditional_8_Template, 4, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "nav", 5);
      \u0275\u0275repeaterCreate(10, RepairExhibitWorkbenchComponent_For_11_Template, 2, 3, "button", null, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6)(13, "article", 7, 0);
      \u0275\u0275element(15, "img", 8);
      \u0275\u0275elementStart(16, "div", 9)(17, "span", 3);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "h2");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 10);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, RepairExhibitWorkbenchComponent_Conditional_23_Template, 4, 3)(24, RepairExhibitWorkbenchComponent_Conditional_24_Template, 2, 0, "small");
      \u0275\u0275elementStart(25, "details", 11)(26, "summary");
      \u0275\u0275text(27, "About this image");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(30, RepairExhibitWorkbenchComponent_Conditional_30_Template, 28, 7, "section", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(31, RepairExhibitWorkbenchComponent_Conditional_31_Template, 7, 4, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_11_0;
      \u0275\u0275classProp("touring", ctx.touring());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.r.example ? "ILLUSTRATED SAMPLE" : "EDITABLE SAMPLE STARTING CONTENT");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.touring() ? "The repaired record \xB7 a guided tour" : "Your exhibit studio");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.r.example ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.r.draft().panels);
      \u0275\u0275advance(5);
      \u0275\u0275property("src", ctx.illustration().src, \u0275\u0275sanitizeUrl)("alt", ctx.illustration().alt);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("PANEL ", ctx.r.panelIndex() + 1, " / ", ctx.r.draft().panels.length);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.activePanel().title || "Untitled panel");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.r.activePanel().caption || "This caption is intentionally empty. Add exhibit text when you are ready.", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.source()) ? 23 : 24, tmp_11_0);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.illustration().caption);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.touring() && !ctx.r.example ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.touring() ? 31 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #eff5ef;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%], \nbutton[aria-current=step][_ngcontent-%COMP%] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n[_ngcontent-%COMP%]:is(button, input, select, textarea, a, summary):focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na[_ngcontent-%COMP%] {\n  color: #116457;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0 14px;\n}\nh2[_ngcontent-%COMP%] {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid[_ngcontent-%COMP%], \n.timeline-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene[_ngcontent-%COMP%] {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-buttons[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card[_ngcontent-%COMP%] {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.source-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls[_ngcontent-%COMP%] {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.option-card[_ngcontent-%COMP%] {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n.feedback[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.button-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 5px 0;\n}\n.timeline-workbench[_ngcontent-%COMP%]   .feedback[_ngcontent-%COMP%] {\n  margin: 0 16px 12px;\n}\n.event-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.archive-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.ripple-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #c4dbc9;\n}\n.ripple-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle[_ngcontent-%COMP%] {\n  margin: 18px 0;\n}\n.ripple-lab[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  padding: 14px 0;\n}\n.ripple-steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ripple-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired[_ngcontent-%COMP%] {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison[_ngcontent-%COMP%]   .repaired.active[_ngcontent-%COMP%] {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf[_ngcontent-%COMP%] {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench[_ngcontent-%COMP%] {\n  padding: 4px 0 16px;\n}\n.panel-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.caption-text[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.exhibit-caption[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 9px;\n}\n.image-credit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor[_ngcontent-%COMP%]   .art-note[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-grid[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-card[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  max-height: 430px;\n}\n.touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.tour-controls[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid[_ngcontent-%COMP%], \n   .timeline-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-notes[_ngcontent-%COMP%] {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art[_ngcontent-%COMP%] {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .ripple-banner[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .ripple-steps[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .ripple-steps[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-caption[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .exhibit-grid[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .touring[_ngcontent-%COMP%]   .exhibit-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .source-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RepairExhibitWorkbenchComponent, [{
    type: Component,
    args: [{ selector: "app-repair-exhibit-workbench", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<section class="exhibit-workbench" [class.touring]="touring()" aria-label="Illustrated exhibit">
  <div class="toolbar">
    <div>
      <span class="eyebrow">{{
        r.example ? 'ILLUSTRATED SAMPLE' : 'EDITABLE SAMPLE STARTING CONTENT'
      }}</span>
      <h3>{{ touring() ? 'The repaired record \xB7 a guided tour' : 'Your exhibit studio' }}</h3>
    </div>
    <div class="button-row">
      @if (!r.example) {
        @if (touring()) {
          <button (click)="touring.set(false)">Return to editing</button>
        } @else {
          <button class="primary" (click)="rehearse()">\u25B6 Rehearse tour</button>
        }
        <button (click)="r.download()">Download draft</button>
      }
    </div>
  </div>
  <nav class="panel-picker" aria-label="Exhibit panels">
    @for (panel of r.draft().panels; track panel.id; let i = $index) {
      <button [attr.aria-pressed]="r.panelIndex() === i" (click)="select(i)">
        {{ i + 1 }} \xB7 {{ panel.title || 'Untitled panel' }}
      </button>
    }
  </nav>
  <div class="exhibit-grid">
    <article class="exhibit-card" #card tabindex="-1" aria-label="Live exhibit panel">
      <img [src]="illustration().src" [alt]="illustration().alt" />
      <div class="exhibit-caption">
        <span class="eyebrow">PANEL {{ r.panelIndex() + 1 }} / {{ r.draft().panels.length }}</span>
        <h2>{{ r.activePanel().title || 'Untitled panel' }}</h2>
        <p class="caption-text">
          {{
            r.activePanel().caption ||
              'This caption is intentionally empty. Add exhibit text when you are ready.'
          }}
        </p>
        @if (source(); as e) {
          <a [href]="e.url" target="_blank" rel="noopener noreferrer">Source: {{ e.title }} \u2197</a
          ><small>{{ e.citation }}</small>
        } @else {
          <small>No source credit selected.</small>
        }
        <details class="image-credit">
          <summary>About this image</summary>
          <p>{{ illustration().caption }}</p>
        </details>
      </div>
    </article>
    @if (!touring() && !r.example) {
      <section class="caption-editor" aria-label="Edit exhibit panel">
        <h3>Edit panel {{ r.panelIndex() + 1 }}</h3>
        <label
          >Exhibit title<input
            aria-label="Exhibit title"
            maxlength="180"
            [ngModel]="r.activePanel().title"
            (ngModelChange)="r.editPanel({ title: $event })"
            (blur)="r.save()"
        /></label>
        <label
          >Exhibit caption<textarea
            aria-label="Exhibit caption"
            maxlength="2400"
            rows="7"
            [ngModel]="r.activePanel().caption"
            (ngModelChange)="r.editPanel({ caption: $event })"
            (blur)="r.save()"
          ></textarea>
        </label>
        <label
          >Illustration<select
            aria-label="Exhibit illustration"
            [ngModel]="r.activePanel().imageId"
            (ngModelChange)="r.editPanel({ imageId: $event }); r.save()"
          >
            @for (image of r.config.previewWeeks!.illustrations; track image.id) {
              <option [value]="image.id">{{ image.title }}</option>
            }
          </select></label
        >
        <label
          >Source credit<select
            aria-label="Exhibit source credit"
            [ngModel]="r.activePanel().evidenceId"
            (ngModelChange)="r.editPanel({ evidenceId: $event }); r.save()"
          >
            <option value="">No source credit</option>
            @for (e of r.config.evidence; track e.id) {
              <option [value]="e.id">{{ e.title }}</option>
            }
          </select></label
        >
        <div class="button-row">
          <button [disabled]="r.panelIndex() === 0" (click)="r.movePanel(-1)">\u2191 Move earlier</button
          ><button
            [disabled]="r.panelIndex() === r.draft().panels.length - 1"
            (click)="r.movePanel(1)"
          >
            \u2193 Move later
          </button>
        </div>
        <p class="art-note">
          This text is the actual exhibit product. You can rewrite or clear the sample. Images are
          illustrations, and captions still need human review.
        </p>
      </section>
    }
  </div>
  @if (touring()) {
    <div class="toolbar tour-controls">
      <button [disabled]="r.panelIndex() === 0" (click)="select(r.panelIndex() - 1)">
        \u2190 Previous panel</button
      ><span>{{ r.panelIndex() + 1 }} of {{ r.draft().panels.length }}</span
      ><button
        [disabled]="r.panelIndex() === r.draft().panels.length - 1"
        (click)="select(r.panelIndex() + 1)"
      >
        Next panel \u2192
      </button>
    </div>
  }
</section>
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-week-activity.scss */\n:host {\n  display: block;\n  min-width: 0;\n  color: #173f40;\n  font:\n    13px/1.6 Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n  border: 1px solid #b9ccc4;\n  color: #234f49;\n  background: #fff;\n  padding: 9px 12px;\n  border-radius: 6px;\n  min-height: 42px;\n  line-height: 1.4;\n}\nbutton:hover {\n  background: #eff5ef;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[aria-pressed=true],\nbutton[aria-current=step] {\n  background: #dfede5;\n  border-color: #257666;\n  color: #124c41;\n  box-shadow: inset 0 0 0 1px #257666;\n}\nbutton.primary {\n  background: #176255;\n  color: white;\n  border-color: #176255;\n  font-weight: 700;\n}\n:is(button, input, select, textarea, a, summary):focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c3983d;\n  outline-offset: 3px;\n}\na {\n  color: #116457;\n}\np {\n  margin: 6px 0 14px;\n}\nh2 {\n  font: 700 27px/1.15 Georgia, serif;\n  margin: 7px 0 14px;\n}\nh3 {\n  font-size: 15px;\n  line-height: 1.35;\n  margin: 6px 0 12px;\n}\nh4 {\n  font-size: 12px;\n  margin: 16px 0 7px;\n}\nsmall {\n  display: block;\n  font-size: 10px;\n  line-height: 1.5;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n  color: #607775;\n}\n.scene-grid,\n.timeline-workbench {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 230px;\n}\n.harbor-scene {\n  margin: 0;\n  position: relative;\n  isolation: isolate;\n  background: #193d3e;\n}\n.scene-image {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4/3;\n  object-fit: cover;\n}\n.scene-date {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: rgba(23, 58, 54, 0.9098039216);\n  color: #fff3d5;\n  font-size: 11px;\n  padding: 6px 10px;\n  border-radius: 4px;\n}\n.hotspot {\n  position: absolute;\n  z-index: 3;\n  transform: translate(-50%, -50%);\n  width: 42px;\n  border-radius: 50%;\n  background: #ffefb7;\n  border: 2px solid white;\n  font-weight: 800;\n  box-shadow: 0 2px 12px rgba(16, 40, 32, 0.5019607843);\n}\n.cargo-object {\n  position: absolute;\n  width: 21%;\n  max-height: 30%;\n  object-fit: contain;\n  transform: translate(-60%, -20%);\n  z-index: 1;\n  pointer-events: none;\n}\n.scene-result {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  background: rgba(23, 58, 54, 0.9294117647);\n  color: #fff3d5;\n  padding: 8px;\n  font-size: 11px;\n}\n.art-note {\n  font-size: 10px;\n  color: #667a71;\n  padding: 0 12px;\n  margin: 8px 0 12px;\n}\n.hotspot-list {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  padding: 0 14px 14px;\n}\n.hotspot-list button {\n  text-align: left;\n  font-size: 12px;\n}\n.field-notes {\n  padding: 16px;\n  background: #f3f6f1;\n  border-left: 1px solid #d9e3da;\n  min-width: 0;\n}\n.inspection {\n  padding: 13px;\n  border: 1px solid #d6c8a0;\n  background: #fffaf0;\n  border-radius: 7px;\n  margin-bottom: 20px;\n}\n.inspection p {\n  font-size: 12px;\n}\n.source-buttons {\n  display: grid;\n  gap: 7px;\n}\n.source-buttons button {\n  text-align: left;\n  font-size: 11px;\n}\n.source-card {\n  border-top: 3px solid #a18a4f;\n  padding: 15px 0;\n  margin-top: 15px;\n}\n.source-card p {\n  font-size: 12px;\n}\n.source-card a {\n  display: block;\n  margin-top: 12px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.repair-controls {\n  padding: 0 0 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid #d6e1d9;\n}\n.repair-controls p {\n  font-size: 11px;\n}\n.option-card {\n  display: block;\n  text-align: left;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.option-card small {\n  margin-top: 5px;\n}\n.feedback {\n  margin: 12px 0;\n  color: #245b4f;\n  font-size: 12px;\n  padding: 10px;\n  border-radius: 5px;\n  background: #e8f2eb;\n}\n.feedback:empty {\n  display: none;\n}\n.button-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n.button-row button {\n  font-size: 11px;\n}\n.toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n}\n.toolbar h3 {\n  margin: 5px 0;\n}\n.timeline-workbench .feedback {\n  margin: 0 16px 12px;\n}\n.event-list {\n  list-style: none;\n  margin: 0;\n  padding: 0 16px 16px;\n}\n.event-list li {\n  display: flex;\n  gap: 10px;\n  padding: 15px 0;\n  border-top: 1px solid #dbe4dc;\n}\n.event-number {\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  height: 30px;\n  min-width: 30px;\n  background: #173f40;\n  color: #fff;\n  font-size: 11px;\n}\n.event-copy {\n  min-width: 0;\n  flex: 1;\n}\n.event-copy h3 {\n  margin: 4px 0;\n  font-size: 14px;\n}\n.event-copy p {\n  font-size: 11px;\n}\nlabel {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n}\nselect,\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #b4c7bd;\n  border-radius: 5px;\n  padding: 9px;\n  margin: 5px 0 12px;\n  color: #193f3a;\n  background: #fff;\n  font-size: 12px;\n}\ntextarea {\n  resize: vertical;\n}\n.archive-art {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.ripple-lab {\n  padding: 18px;\n}\n.ripple-banner {\n  background:\n    linear-gradient(\n      120deg,\n      #123c40,\n      #285b54);\n  color: #fff5d8;\n  padding: 24px;\n  border-radius: 8px;\n}\n.ripple-banner .eyebrow {\n  color: #c4dbc9;\n}\n.ripple-banner h3 {\n  font: 27px Georgia, serif;\n  margin: 8px 0;\n}\n.ripple-banner p {\n  font-size: 12px;\n  margin: 0;\n  color: #dae7dc;\n}\n.record-toggle {\n  margin: 18px 0;\n}\n.ripple-lab .toolbar {\n  padding: 14px 0;\n}\n.ripple-steps {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 16px 0;\n}\n.ripple-steps button {\n  font-size: 12px;\n}\n.ripple-steps span {\n  display: block;\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.moment-title {\n  font-family: Georgia, serif;\n  font-size: 22px;\n  margin: 24px 0 16px;\n}\n.ripple-comparison {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.ripple-comparison article {\n  padding: 22px;\n  background: #f8eee3;\n  border: 1px solid #dfc8ad;\n  border-radius: 8px;\n}\n.ripple-comparison h3 {\n  margin: 12px 0;\n  font-size: 16px;\n}\n.ripple-comparison .repaired {\n  background: #f2f5f1;\n  border-color: #d0dbcf;\n}\n.ripple-comparison .repaired.active {\n  background: #e5f0e5;\n  border-color: #83b593;\n}\n.source-shelf {\n  border-top: 1px solid #d3e0d5;\n  padding-top: 14px;\n  margin-top: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n  font-weight: 600;\n}\n.exhibit-workbench {\n  padding: 4px 0 16px;\n}\n.panel-picker {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n  padding: 0 16px 16px;\n}\n.panel-picker button {\n  flex: 1 1 120px;\n  text-align: left;\n  font-size: 11px;\n}\n.exhibit-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 1fr);\n  gap: 18px;\n  padding: 0 16px;\n  align-items: start;\n}\n.exhibit-card {\n  overflow: hidden;\n  border: 1px solid #e0d3b6;\n  border-radius: 8px;\n  background: #fffaf0;\n  min-width: 0;\n}\n.exhibit-card > img {\n  width: 100%;\n  aspect-ratio: 3/2;\n  display: block;\n  object-fit: cover;\n}\n.exhibit-caption {\n  padding: 22px;\n}\n.caption-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.exhibit-caption a {\n  font-size: 11px;\n}\n.exhibit-caption small {\n  margin-top: 9px;\n}\n.image-credit {\n  margin-top: 16px;\n  font-size: 10px;\n  color: #5c6d60;\n}\n.caption-editor {\n  padding: 14px;\n  background: #f1f5ef;\n  border-radius: 7px;\n}\n.caption-editor .art-note {\n  padding: 0;\n}\n.touring .exhibit-grid {\n  display: block;\n  max-width: 900px;\n  margin: auto;\n}\n.touring .exhibit-card > img {\n  max-height: 430px;\n}\n.touring .exhibit-caption h2 {\n  font-size: 32px;\n}\n.tour-controls {\n  margin: 0 16px;\n}\n@media (max-width: 1200px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: minmax(0, 1fr) 200px;\n  }\n  .field-notes {\n    padding: 12px;\n  }\n  .exhibit-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 980px) {\n  .scene-grid,\n  .timeline-workbench {\n    grid-template-columns: 1fr;\n  }\n  .field-notes {\n    border-top: 1px solid #d9e3da;\n    border-left: 0;\n  }\n  .archive-art {\n    max-height: 180px;\n    object-fit: cover;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr 1fr;\n  }\n  .scene-image {\n    aspect-ratio: 16/10;\n  }\n}\n@media (max-width: 520px) {\n  .ripple-comparison {\n    grid-template-columns: 1fr;\n  }\n  .ripple-lab {\n    padding: 12px;\n  }\n  .ripple-banner {\n    padding: 18px;\n  }\n  .ripple-steps {\n    gap: 5px;\n  }\n  .ripple-steps button {\n    padding: 8px 4px;\n    font-size: 10px;\n  }\n  .ripple-comparison article {\n    padding: 16px;\n  }\n  .exhibit-caption {\n    padding: 16px;\n  }\n  .exhibit-grid {\n    padding: 0 10px;\n  }\n  .touring .exhibit-caption h2 {\n    font-size: 27px;\n  }\n  .source-buttons {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto;\n  }\n}\n/*# sourceMappingURL=time-repair-week-activity.css.map */\n'] }]
  }], null, { card: [{ type: ViewChild, args: ["card", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RepairExhibitWorkbenchComponent, { className: "RepairExhibitWorkbenchComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-exhibit.component.ts", lineNumber: 22 });
})();

// src/app/templates/time-repair/ui/time-repair-week-workspace.component.ts
var _c04 = (a0) => ["/projects", a0, "final-demo"];
var _c1 = (a0) => ["/projects", a0, "lessons"];
var _c2 = (a0) => ({ lesson: a0 });
var _forTrack05 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.week;
function TimeRepairWeekWorkspaceComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function TimeRepairWeekWorkspaceComponent_Conditional_12_For_2_Template_button_click_0_listener() {
      const week_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.r.open(week_r2.week * 2 - 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const week_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.r.week().week === week_r2.week);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Week ", week_r2.week, " ");
  }
}
function TimeRepairWeekWorkspaceComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 6);
    \u0275\u0275repeaterCreate(1, TimeRepairWeekWorkspaceComponent_Conditional_12_For_2_Template, 2, 2, "button", null, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.r.weeks);
  }
}
function TimeRepairWeekWorkspaceComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const session_r4 = ctx.$implicit;
    const \u0275$index_31_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c1, ctx_r2.r.config.projectId))("queryParams", \u0275\u0275pureFunction1(7, _c2, ctx_r2.r.week().week * 2 - 1 + \u0275$index_31_r5));
    \u0275\u0275attribute("aria-current", ctx_r2.r.session().id === session_r4.id ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275$index_31_r5 + 1, " \xB7 ", session_r4.title);
  }
}
function TimeRepairWeekWorkspaceComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275repeaterCreate(1, TimeRepairWeekWorkspaceComponent_Conditional_13_For_2_Template, 2, 9, "a", 18, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 19)(4, "div", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "Do this now");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 21)(14, "strong");
    \u0275\u0275text(15, "How to check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "details")(18, "summary");
    \u0275\u0275text(19, "What will change");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.r.week().sessions);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("0", ctx_r2.r.lesson());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.r.session().title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.r.session().action);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r2.r.session().check);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.r.session().change);
  }
}
function TimeRepairWeekWorkspaceComponent_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-scene-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-scene-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-timeline-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-timeline-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-ripple-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-ripple-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-exhibit-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_Case_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-repair-exhibit-workbench");
  }
}
function TimeRepairWeekWorkspaceComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const session_r6 = ctx.$implicit;
    const \u0275$index_114_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("current", session_r6.id === ctx_r2.r.session().id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Session ", \u0275$index_114_r7 + 1, " \xB7 ", \u0275$index_114_r7 === 0 ? "Individual" : "Group activity");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(session_r6.product);
  }
}
function TimeRepairWeekWorkspaceComponent_For_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const q_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(q_r8);
  }
}
function TimeRepairWeekWorkspaceComponent_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r9);
  }
}
function TimeRepairWeekWorkspaceComponent_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r10);
  }
}
var TimeRepairWeekWorkspaceComponent = class _TimeRepairWeekWorkspaceComponent {
  r = inject(RepairPreviewRuntime);
  focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  standalone = !this.focus;
  constructor() {
    effect(() => {
      const lesson = this.focus?.();
      if (lesson && !this.r.example)
        untracked(() => this.r.open(lesson.number));
    });
  }
  static \u0275fac = function TimeRepairWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimeRepairWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TimeRepairWeekWorkspaceComponent, selectors: [["app-time-repair-week-workspace"]], features: [\u0275\u0275ProvidersFeature([
    RepairPreviewRuntime,
    {
      provide: REPAIR_PREVIEW_PERSISTENCE,
      useFactory: () => new BrowserRepairPreviewPersistence(inject(TIME_REPAIR_CONFIG), inject(TIME_REPAIR_SESSION))
    }
  ])], decls: 66, vars: 14, consts: [[1, "repair-week"], ["aria-label", "Time Repair interactive workspace", 1, "activity-column"], [1, "mission-heading"], [1, "eyebrow"], [1, "session-label"], [1, "mode-label"], ["aria-label", "Choose week", 1, "local-weeks"], [1, "work-surface"], [1, "workspace-note"], ["aria-label", "Weekly products and future tutor", 1, "planning"], ["open", "", 1, "plan-card", "products"], [1, "muted"], [3, "current"], [1, "example-link", 3, "routerLink"], ["open", "", 1, "plan-card", "tutor"], [1, "offline"], [3, "click"], ["aria-label", "This week\u2019s sessions", 1, "session-tabs"], [3, "routerLink", "queryParams"], ["aria-label", "Action and success criteria", 1, "next-action"], ["aria-hidden", "true", 1, "step-number"], [1, "check-copy"]], template: function TimeRepairWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "div")(4, "p", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 4);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "span", 5);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, TimeRepairWeekWorkspaceComponent_Conditional_12_Template, 3, 0, "nav", 6);
      \u0275\u0275conditionalCreate(13, TimeRepairWeekWorkspaceComponent_Conditional_13_Template, 22, 5);
      \u0275\u0275elementStart(14, "div", 7);
      \u0275\u0275conditionalCreate(15, TimeRepairWeekWorkspaceComponent_Case_15_Template, 1, 0, "app-repair-scene-workbench")(16, TimeRepairWeekWorkspaceComponent_Case_16_Template, 1, 0, "app-repair-scene-workbench")(17, TimeRepairWeekWorkspaceComponent_Case_17_Template, 1, 0, "app-repair-timeline-workbench")(18, TimeRepairWeekWorkspaceComponent_Case_18_Template, 1, 0, "app-repair-timeline-workbench")(19, TimeRepairWeekWorkspaceComponent_Case_19_Template, 1, 0, "app-repair-ripple-workbench")(20, TimeRepairWeekWorkspaceComponent_Case_20_Template, 1, 0, "app-repair-ripple-workbench")(21, TimeRepairWeekWorkspaceComponent_Case_21_Template, 1, 0, "app-repair-exhibit-workbench")(22, TimeRepairWeekWorkspaceComponent_Case_22_Template, 1, 0, "app-repair-exhibit-workbench");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "footer", 8);
      \u0275\u0275text(24);
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "No assessment, completion, or shared work is recorded.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "aside", 9)(28, "details", 10)(29, "summary")(30, "span", 3);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "h2");
      \u0275\u0275text(33, "Proposed weekly products");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "p", 11);
      \u0275\u0275text(35, "Potential work \xB7 no required submission");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "ol");
      \u0275\u0275repeaterCreate(37, TimeRepairWeekWorkspaceComponent_For_38_Template, 5, 5, "li", 12, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "a", 13);
      \u0275\u0275text(40, "View illustrated sample exhibit \u2197");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "details", 14)(42, "summary")(43, "span", 3);
      \u0275\u0275text(44, "BUILD PLANNING");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "h2");
      \u0275\u0275text(46, "AI Tutor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span", 15);
      \u0275\u0275text(48, "Not connected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "h3");
      \u0275\u0275text(50, "Questions to explore");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "ul");
      \u0275\u0275repeaterCreate(52, TimeRepairWeekWorkspaceComponent_For_53_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "h3");
      \u0275\u0275text(55, "Evidence it will inspect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "ul");
      \u0275\u0275repeaterCreate(57, TimeRepairWeekWorkspaceComponent_For_58_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "h3");
      \u0275\u0275text(60, "Future model controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "ul");
      \u0275\u0275repeaterCreate(62, TimeRepairWeekWorkspaceComponent_For_63_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "p", 11);
      \u0275\u0275text(65, " Planning only. The future tutor will guide, adjust the model, and review standards alignment before completion is recorded. ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      \u0275\u0275attribute("data-week", ctx.r.week().week)("data-session", ctx.r.session().id);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("TIME REPAIR AGENCY \xB7 WEEK ", ctx.r.week().week);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.r.example ? "Illustrated sample exhibit" : (ctx.r.lesson() % 2 === 1 ? "Individual learning" : "Group activity \xB7 local test") + " \xB7 Session " + ctx.r.lesson(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.r.example ? "Read-only example" : "Testing \xB7 all sessions open");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.standalone && !ctx.r.example ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.r.example ? 13 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_8_0 = ctx.r.session().mode) === "inspect" ? 15 : tmp_8_0 === "repair" ? 16 : tmp_8_0 === "sequence" ? 17 : tmp_8_0 === "sources" ? 18 : tmp_8_0 === "ripple" ? 19 : tmp_8_0 === "compare" ? 20 : tmp_8_0 === "exhibit" ? 21 : tmp_8_0 === "tour" ? 22 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.r.example ? "Sample content for inspiration. Open a session to make your own local draft." : ctx.r.saveStatus() || "Sample starting content \xB7 edits stay in this session until saved");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("WEEK ", ctx.r.week().week);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.r.week().sessions);
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c04, ctx.r.config.projectId));
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.r.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.r.week().evidence);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.r.week().controls);
    }
  }, dependencies: [
    RouterLink,
    RepairSceneWorkbenchComponent,
    RepairTimelineWorkbenchComponent,
    RepairRippleWorkbenchComponent,
    RepairExhibitWorkbenchComponent
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: #163b3d;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.repair-week[_ngcontent-%COMP%] {\n  background: #eef2ef;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 20px;\n  padding: 22px;\n  align-items: start;\n  max-width: 1800px;\n  margin: auto;\n}\n.activity-column[_ngcontent-%COMP%], \n.planning[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.mission-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  gap: 16px;\n  padding: 8px 0 20px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 0.13em;\n  margin: 0 0 8px;\n  color: #526c6b;\n}\nh1[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: clamp(27px, 2.5vw, 39px);\n  line-height: 1.1;\n  margin: 0 0 8px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 17px;\n  line-height: 1.35;\n  margin: 0 0 8px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 17px 0 6px;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.65;\n  margin: 6px 0 12px;\n}\n.session-label[_ngcontent-%COMP%] {\n  color: #5b7473;\n  margin: 0;\n}\n.mode-label[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #bacdc5;\n  border-radius: 6px;\n  color: #335f50;\n  background: #e0eae3;\n  font-size: 10px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.session-tabs[_ngcontent-%COMP%], \n.local-weeks[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.session-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.local-weeks[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #2b5350;\n  text-decoration: none;\n  padding: 10px 14px;\n  border: 1px solid #bccac4;\n  border-radius: 7px;\n  font:\n    600 12px Inter,\n    Arial,\n    sans-serif;\n  background: transparent;\n  min-height: 42px;\n}\n.session-tabs[_ngcontent-%COMP%]   [aria-current][_ngcontent-%COMP%], \n.local-weeks[_ngcontent-%COMP%]   [aria-pressed=true][_ngcontent-%COMP%] {\n  background: #153f41;\n  border-color: #153f41;\n  color: white;\n}\n.next-action[_ngcontent-%COMP%] {\n  padding: 17px;\n  display: grid;\n  grid-template-columns: 38px 1fr;\n  gap: 12px;\n  background: #fffdf4;\n  border: 1px solid #ded7bd;\n  border-left: 4px solid #b68a33;\n  border-radius: 9px;\n  margin: 0 0 16px;\n}\n.step-number[_ngcontent-%COMP%] {\n  font: 26px Georgia, serif;\n  color: #99722e;\n}\n.next-action[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.next-action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n}\n.next-action[_ngcontent-%COMP%]   .check-copy[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  color: #526047;\n  font-size: 12px;\n}\n.next-action[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  grid-column: 2;\n  font-size: 12px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 30px;\n}\n.next-action[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.work-surface[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ced8d2;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 6px 25px rgba(23, 61, 52, 0.062745098);\n}\n.workspace-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #526c65;\n  padding: 12px 2px;\n  line-height: 1.6;\n}\n.workspace-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.planning[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  padding-top: 8px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px solid #ced8d2;\n  border-radius: 10px;\n  background: #fff;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  position: relative;\n  padding-right: 12px;\n}\n.plan-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  display: inline;\n  font: 700 18px Georgia, serif;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  display: block;\n}\n.plan-card[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::marker {\n  color: #547e70;\n}\n.muted[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #5a6e6a;\n}\n.plan-card[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 10px 0;\n  padding: 0;\n}\n.plan-card[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  border-left: 2px solid #dbe3df;\n  padding: 12px;\n  margin: 6px 0;\n}\n.plan-card[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%] {\n  border-left-color: #ad8335;\n  background: #faf7ee;\n}\n.plan-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.plan-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 5px 0 0;\n}\n.example-link[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #12685f;\n  display: block;\n  margin-top: 16px;\n}\n.tutor[_ngcontent-%COMP%] {\n  background: #e3eeea;\n  border-color: #c6d9d0;\n}\n.offline[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 10px;\n  font-weight: 700;\n  background: #fff;\n  padding: 5px 7px;\n  margin: 8px 0 0 10px;\n  border-radius: 4px;\n}\n.tutor[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 17px;\n  font-size: 12px;\n  line-height: 1.65;\n  margin: 6px 0;\n}\n.tutor[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  touch-action: manipulation;\n}\n[_ngcontent-%COMP%]:is(button, a, summary):focus-visible {\n  outline: 3px solid #c39434;\n  outline-offset: 3px;\n}\n@media (max-width: 1050px) {\n  .repair-week[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 280px;\n    gap: 14px;\n    padding: 14px;\n  }\n  .mission-heading[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .mode-label[_ngcontent-%COMP%] {\n    display: inline-block;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 980px) {\n  .repair-week[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 520px) {\n  .repair-week[_ngcontent-%COMP%] {\n    padding: 10px;\n    gap: 10px;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .next-action[_ngcontent-%COMP%] {\n    padding: 12px;\n    grid-template-columns: 28px 1fr;\n    gap: 8px;\n  }\n  .session-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .plan-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=time-repair-week-workspace.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeRepairWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-time-repair-week-workspace", imports: [
      RouterLink,
      RepairSceneWorkbenchComponent,
      RepairTimelineWorkbenchComponent,
      RepairRippleWorkbenchComponent,
      RepairExhibitWorkbenchComponent
    ], providers: [
      RepairPreviewRuntime,
      {
        provide: REPAIR_PREVIEW_PERSISTENCE,
        useFactory: () => new BrowserRepairPreviewPersistence(inject(TIME_REPAIR_CONFIG), inject(TIME_REPAIR_SESSION))
      }
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="repair-week" [attr.data-week]="r.week().week" [attr.data-session]="r.session().id">
  <section class="activity-column" aria-label="Time Repair interactive workspace">
    <header class="mission-heading">
      <div>
        <p class="eyebrow">TIME REPAIR AGENCY \xB7 WEEK {{ r.week().week }}</p>
        <h1>{{ r.week().title }}</h1>
        <p class="session-label">
          {{
            r.example
              ? 'Illustrated sample exhibit'
              : (r.lesson() % 2 === 1 ? 'Individual learning' : 'Group activity \xB7 local test') +
                ' \xB7 Session ' +
                r.lesson()
          }}
        </p>
      </div>
      <span class="mode-label">{{
        r.example ? 'Read-only example' : 'Testing \xB7 all sessions open'
      }}</span>
    </header>
    @if (standalone && !r.example) {
      <nav class="local-weeks" aria-label="Choose week">
        @for (week of r.weeks; track week.week) {
          <button
            [attr.aria-pressed]="r.week().week === week.week"
            (click)="r.open(week.week * 2 - 1)"
          >
            Week {{ week.week }}
          </button>
        }
      </nav>
    }
    @if (!r.example) {
      <div class="session-tabs" aria-label="This week\u2019s sessions">
        @for (session of r.week().sessions; track session.id; let i = $index) {
          <a
            [routerLink]="['/projects', r.config.projectId, 'lessons']"
            [queryParams]="{ lesson: r.week().week * 2 - 1 + i }"
            [attr.aria-current]="r.session().id === session.id ? 'step' : null"
            >{{ i + 1 }} \xB7 {{ session.title }}</a
          >
        }
      </div>
      <section class="next-action" aria-label="Action and success criteria">
        <div class="step-number" aria-hidden="true">0{{ r.lesson() }}</div>
        <div>
          <h2>{{ r.session().title }}</h2>
          <strong>Do this now</strong>
          <p>{{ r.session().action }}</p>
          <p class="check-copy"><strong>How to check</strong> \xB7 {{ r.session().check }}</p>
        </div>
        <details>
          <summary>What will change</summary>
          <p>{{ r.session().change }}</p>
        </details>
      </section>
    }
    <div class="work-surface">
      @switch (r.session().mode) {
        @case ('inspect') {
          <app-repair-scene-workbench />
        }
        @case ('repair') {
          <app-repair-scene-workbench />
        }
        @case ('sequence') {
          <app-repair-timeline-workbench />
        }
        @case ('sources') {
          <app-repair-timeline-workbench />
        }
        @case ('ripple') {
          <app-repair-ripple-workbench />
        }
        @case ('compare') {
          <app-repair-ripple-workbench />
        }
        @case ('exhibit') {
          <app-repair-exhibit-workbench />
        }
        @case ('tour') {
          <app-repair-exhibit-workbench />
        }
      }
    </div>
    <footer class="workspace-note">
      {{
        r.example
          ? 'Sample content for inspiration. Open a session to make your own local draft.'
          : r.saveStatus() || 'Sample starting content \xB7 edits stay in this session until saved'
      }}<span>No assessment, completion, or shared work is recorded.</span>
    </footer>
  </section>
  <aside class="planning" aria-label="Weekly products and future tutor">
    <details class="plan-card products" open>
      <summary>
        <span class="eyebrow">WEEK {{ r.week().week }}</span>
        <h2>Proposed weekly products</h2>
      </summary>
      <p class="muted">Potential work \xB7 no required submission</p>
      <ol>
        @for (session of r.week().sessions; track session.id; let i = $index) {
          <li [class.current]="session.id === r.session().id">
            <strong>Session {{ i + 1 }} \xB7 {{ i === 0 ? 'Individual' : 'Group activity' }}</strong>
            <p>{{ session.product }}</p>
          </li>
        }
      </ol>
      <a class="example-link" [routerLink]="['/projects', r.config.projectId, 'final-demo']"
        >View illustrated sample exhibit \u2197</a
      >
    </details>
    <details class="plan-card tutor" open>
      <summary>
        <span class="eyebrow">BUILD PLANNING</span>
        <h2>AI Tutor</h2>
        <span class="offline">Not connected</span>
      </summary>
      <h3>Questions to explore</h3>
      <ul>
        @for (q of r.week().questions; track q) {
          <li>{{ q }}</li>
        }
      </ul>
      <h3>Evidence it will inspect</h3>
      <ul>
        @for (e of r.week().evidence; track e) {
          <li>{{ e }}</li>
        }
      </ul>
      <h3>Future model controls</h3>
      <ul>
        @for (c of r.week().controls; track c) {
          <li>{{ c }}</li>
        }
      </ul>
      <p class="muted">
        Planning only. The future tutor will guide, adjust the model, and review standards alignment
        before completion is recorded.
      </p>
    </details>
  </aside>
</main>
`, styles: ["/* src/app/templates/time-repair/ui/time-repair-week-workspace.component.scss */\n:host {\n  display: block;\n  color: #163b3d;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.repair-week {\n  background: #eef2ef;\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(270px, 3fr);\n  gap: 20px;\n  padding: 22px;\n  align-items: start;\n  max-width: 1800px;\n  margin: auto;\n}\n.activity-column,\n.planning {\n  min-width: 0;\n}\n.mission-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  gap: 16px;\n  padding: 8px 0 20px;\n}\n.eyebrow {\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 0.13em;\n  margin: 0 0 8px;\n  color: #526c6b;\n}\nh1 {\n  font-family: Georgia, serif;\n  font-size: clamp(27px, 2.5vw, 39px);\n  line-height: 1.1;\n  margin: 0 0 8px;\n}\nh2 {\n  font-size: 17px;\n  line-height: 1.35;\n  margin: 0 0 8px;\n}\nh3 {\n  font-size: 12px;\n  margin: 17px 0 6px;\n}\np {\n  font-size: 13px;\n  line-height: 1.65;\n  margin: 6px 0 12px;\n}\n.session-label {\n  color: #5b7473;\n  margin: 0;\n}\n.mode-label {\n  padding: 8px 10px;\n  border: 1px solid #bacdc5;\n  border-radius: 6px;\n  color: #335f50;\n  background: #e0eae3;\n  font-size: 10px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.session-tabs,\n.local-weeks {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.session-tabs a,\n.local-weeks button {\n  color: #2b5350;\n  text-decoration: none;\n  padding: 10px 14px;\n  border: 1px solid #bccac4;\n  border-radius: 7px;\n  font:\n    600 12px Inter,\n    Arial,\n    sans-serif;\n  background: transparent;\n  min-height: 42px;\n}\n.session-tabs [aria-current],\n.local-weeks [aria-pressed=true] {\n  background: #153f41;\n  border-color: #153f41;\n  color: white;\n}\n.next-action {\n  padding: 17px;\n  display: grid;\n  grid-template-columns: 38px 1fr;\n  gap: 12px;\n  background: #fffdf4;\n  border: 1px solid #ded7bd;\n  border-left: 4px solid #b68a33;\n  border-radius: 9px;\n  margin: 0 0 16px;\n}\n.step-number {\n  font: 26px Georgia, serif;\n  color: #99722e;\n}\n.next-action strong {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.next-action p {\n  margin: 4px 0 0;\n}\n.next-action .check-copy {\n  margin-top: 10px;\n  color: #526047;\n  font-size: 12px;\n}\n.next-action details {\n  grid-column: 2;\n  font-size: 12px;\n}\nsummary {\n  cursor: pointer;\n  min-height: 30px;\n}\n.next-action summary {\n  font-weight: 700;\n}\n.work-surface {\n  background: #fff;\n  border: 1px solid #ced8d2;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 6px 25px rgba(23, 61, 52, 0.062745098);\n}\n.workspace-note {\n  font-size: 10px;\n  color: #526c65;\n  padding: 12px 2px;\n  line-height: 1.6;\n}\n.workspace-note span {\n  display: block;\n}\n.planning {\n  display: grid;\n  gap: 16px;\n  padding-top: 8px;\n}\n.plan-card {\n  padding: 20px;\n  border: 1px solid #ced8d2;\n  border-radius: 10px;\n  background: #fff;\n}\n.plan-card summary {\n  position: relative;\n  padding-right: 12px;\n}\n.plan-card h2 {\n  display: inline;\n  font: 700 18px Georgia, serif;\n}\n.plan-card summary .eyebrow {\n  display: block;\n}\n.plan-card summary::marker {\n  color: #547e70;\n}\n.muted {\n  font-size: 11px;\n  color: #5a6e6a;\n}\n.plan-card ol {\n  list-style: none;\n  margin: 10px 0;\n  padding: 0;\n}\n.plan-card ol li {\n  border-left: 2px solid #dbe3df;\n  padding: 12px;\n  margin: 6px 0;\n}\n.plan-card ol li.current {\n  border-left-color: #ad8335;\n  background: #faf7ee;\n}\n.plan-card strong {\n  font-size: 11px;\n}\n.plan-card li p {\n  font-size: 12px;\n  margin: 5px 0 0;\n}\n.example-link {\n  font-size: 12px;\n  font-weight: 700;\n  color: #12685f;\n  display: block;\n  margin-top: 16px;\n}\n.tutor {\n  background: #e3eeea;\n  border-color: #c6d9d0;\n}\n.offline {\n  display: inline-block;\n  font-size: 10px;\n  font-weight: 700;\n  background: #fff;\n  padding: 5px 7px;\n  margin: 8px 0 0 10px;\n  border-radius: 4px;\n}\n.tutor ul {\n  padding-left: 17px;\n  font-size: 12px;\n  line-height: 1.65;\n  margin: 6px 0;\n}\n.tutor li {\n  margin: 6px 0;\n}\nbutton,\na,\nsummary {\n  touch-action: manipulation;\n}\n:is(button, a, summary):focus-visible {\n  outline: 3px solid #c39434;\n  outline-offset: 3px;\n}\n@media (max-width: 1050px) {\n  .repair-week {\n    grid-template-columns: minmax(0, 1fr) 280px;\n    gap: 14px;\n    padding: 14px;\n  }\n  .mission-heading {\n    display: block;\n  }\n  .mode-label {\n    display: inline-block;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 980px) {\n  .repair-week {\n    grid-template-columns: 1fr;\n  }\n  .planning {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 520px) {\n  .repair-week {\n    padding: 10px;\n    gap: 10px;\n  }\n  .planning {\n    grid-template-columns: 1fr;\n  }\n  .next-action {\n    padding: 12px;\n    grid-template-columns: 28px 1fr;\n    gap: 8px;\n  }\n  .session-tabs a {\n    flex: 1;\n  }\n  .plan-card {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=time-repair-week-workspace.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TimeRepairWeekWorkspaceComponent, { className: "TimeRepairWeekWorkspaceComponent", filePath: "src/app/templates/time-repair/ui/time-repair-week-workspace.component.ts", lineNumber: 39 });
})();

// src/app/templates/time-repair/ui/time-repair-investigation.component.ts
var _c05 = ["sourceTitle"];
var _c12 = ["boardTitle"];
var _forTrack06 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.evidenceId;
function TimeRepairInvestigationComponent_Conditional_11_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Conditional_11_For_5_Template_button_click_0_listener() {
      const evidence_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectSource(evidence_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const evidence_r2 = ctx.$implicit;
    const \u0275$index_27_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.source().id === evidence_r2.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.source().id === evidence_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", \u0275$index_27_r4 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(evidence_r2.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(evidence_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.state().collectedIds.includes(evidence_r2.id) ? "\u2713 Collected" : "Open source");
  }
}
function TimeRepairInvestigationComponent_Conditional_11_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275text(1, "Read original \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r2.source().url, \u0275\u0275sanitizeUrl);
  }
}
function TimeRepairInvestigationComponent_Conditional_11_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Conditional_11_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.collect());
    });
    \u0275\u0275text(1, "+ Collect evidence card");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 23);
    \u0275\u0275listener("ngSubmit", function TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.connect());
    });
    \u0275\u0275elementStart(1, "div", 24)(2, "label");
    \u0275\u0275text(3, "This source\u2026");
    \u0275\u0275elementStart(4, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.relationship, $event) || (ctx_r2.relationship = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 26);
    \u0275\u0275text(6, "Contradicts the reported anomaly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 27);
    \u0275\u0275text(8, "Supports the reported anomaly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 28);
    \u0275\u0275text(10, "Leaves the anomaly uncertain");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "My confidence");
    \u0275\u0275elementStart(13, "select", 29);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.confidence, $event) || (ctx_r2.confidence = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 30);
    \u0275\u0275text(15, "Still developing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 31);
    \u0275\u0275text(17, "Confident");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label");
    \u0275\u0275text(19, "What does it prove?");
    \u0275\u0275elementStart(20, "textarea", 32);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template_textarea_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.note, $event) || (ctx_r2.note = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 33)(22, "button", 34);
    \u0275\u0275text(23, "Save evidence connection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 9);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.relationship);
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.confidence);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.note);
    \u0275\u0275control();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.progress().links.length, " connected");
  }
}
function TimeRepairInvestigationComponent_Conditional_11_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "\u2713 Evidence preserved with your authorized defense.");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairInvestigationComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "nav", 8)(2, "p", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, TimeRepairInvestigationComponent_Conditional_11_For_5_Template, 10, 7, "button", 10, _forTrack06);
    \u0275\u0275elementStart(6, "div", 11);
    \u0275\u0275text(7, " Connect sources that establish the baseline and test the reported sequence. One detail rarely tells the whole story. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "article", 12)(9, "span", 3);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h3", 13, 0);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 14);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 15);
    \u0275\u0275text(17);
    \u0275\u0275conditionalCreate(18, TimeRepairInvestigationComponent_Conditional_11_Conditional_18_Template, 2, 1, "a", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 17)(20, "strong");
    \u0275\u0275text(21, "Read the source critically");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, TimeRepairInvestigationComponent_Conditional_11_Conditional_23_Template, 2, 0, "button", 18)(24, TimeRepairInvestigationComponent_Conditional_11_Conditional_24_Template, 26, 4, "form", 19)(25, TimeRepairInvestigationComponent_Conditional_11_Conditional_25_Template, 2, 0, "p", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.runtime.state().collectedIds.length, " / ", ctx_r2.runtime.config.evidence.length, " cards collected ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.config.evidence);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Evidence card \xB7 ", ctx_r2.source().kind);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.source().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.source().content);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.source().citation, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.source().url ? 18 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.source().perspective, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.collected() ? 23 : !ctx_r2.progress().authorized ? 24 : 25);
  }
}
function TimeRepairInvestigationComponent_Conditional_12_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 37)(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", link_r9.relationship, " \xB7 ", link_r9.confidence);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.title(link_r9.evidenceId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r9.note);
  }
}
function TimeRepairInvestigationComponent_Conditional_12_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No evidence connected yet. Read the archive and save what each source proves.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 39);
    \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Conditional_12_ForEmpty_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openSources());
    });
    \u0275\u0275text(3, "Open archive");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.jumpRequested.emit());
    });
    \u0275\u0275text(1, " Enter time-jump scene \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Repair already applied. Return to the control room to verify its ripple. ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Authorization granted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Your evidence has opened a path.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, " The system checked your evidence connections, classification, and source conclusion. Your written defense is saved for teacher review. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Conditional_6_Template, 2, 0, "button", 18)(7, TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Conditional_7_Template, 2, 0, "p", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!ctx_r2.progress().repaired ? 6 : 7);
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r12 = ctx.$implicit;
    \u0275\u0275property("value", category_r12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r12);
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 46)(1, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_For_22_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.defense.answerId, $event) || (ctx_r2.defense.answerId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.defense.answerId);
    \u0275\u0275property("value", option_r14.id);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r14.label);
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "Repair authorization / system checkpoint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Prove it before you change it.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label");
    \u0275\u0275text(5, "Classify the anomaly");
    \u0275\u0275elementStart(6, "select", 41);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.defense.category, $event) || (ctx_r2.defense.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 42);
    \u0275\u0275text(8, "Select a category");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, TimeRepairInvestigationComponent_Conditional_12_Conditional_16_For_10_Template, 2, 2, "option", 43, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 24)(12, "label");
    \u0275\u0275text(13, "Your claim");
    \u0275\u0275elementStart(14, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.defense.claim, $event) || (ctx_r2.defense.claim = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, "Cause \u2192 consequence");
    \u0275\u0275elementStart(17, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.defense.consequence, $event) || (ctx_r2.defense.consequence = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "fieldset")(19, "legend");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(21, TimeRepairInvestigationComponent_Conditional_12_Conditional_16_For_22_Template, 4, 3, "label", 46, _forTrack06);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "label");
    \u0275\u0275text(24, "Defend your source conclusion");
    \u0275\u0275elementStart(25, "textarea", 47);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.defense.explanation, $event) || (ctx_r2.defense.explanation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 9);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 34);
    \u0275\u0275text(29, "Request repair authorization \u2192");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.defense.category);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.mission().categories);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.defense.claim);
    \u0275\u0275property("minlength", ctx_r2.runtime.config.settings.minReasoningLength);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.defense.consequence);
    \u0275\u0275property("minlength", ctx_r2.runtime.config.settings.minReasoningLength);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.mission().defense.prompt);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.mission().defense.options);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.defense.explanation);
    \u0275\u0275property("minlength", ctx_r2.runtime.config.settings.minReasoningLength);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" At least ", ctx_r2.runtime.config.settings.minReasoningLength, " characters in each explanation. This checkpoint checks structure and source conclusions; it does not grade your writing. ");
  }
}
function TimeRepairInvestigationComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "aside", 35)(2, "span", 3);
    \u0275\u0275text(3, "Your evidence board");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 13, 1);
    \u0275\u0275text(6, "Evidence \u2192 claim \u2192 consequence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 36);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, TimeRepairInvestigationComponent_Conditional_12_For_10_Template, 7, 4, "article", 37, _forTrack13, false, TimeRepairInvestigationComponent_Conditional_12_ForEmpty_11_Template, 4, 0);
    \u0275\u0275elementStart(12, "p", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "form", 38);
    \u0275\u0275listener("ngSubmit", function TimeRepairInvestigationComponent_Conditional_12_Template_form_ngSubmit_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.defend());
    });
    \u0275\u0275conditionalCreate(15, TimeRepairInvestigationComponent_Conditional_12_Conditional_15_Template, 8, 1)(16, TimeRepairInvestigationComponent_Conditional_12_Conditional_16_Template, 30, 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.mission().signal);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.progress().links);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.progress().defenses.length, " defense ", ctx_r2.progress().defenses.length === 1 ? "attempt" : "attempts", " retained in the repair log. ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.progress().authorized ? 15 : 16);
  }
}
var TimeRepairInvestigationComponent = class _TimeRepairInvestigationComponent {
  runtime = inject(TimeRepairRuntime);
  mission = input.required(
    ...ngDevMode ? [{ debugName: "mission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  jumpRequested = output();
  mode = signal(
    "sources",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evidenceId = signal(
    this.runtime.config.evidence[0].id,
    ...ngDevMode ? [{ debugName: "evidenceId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = computed(
    () => this.runtime.config.evidence.find((e) => e.id === this.evidenceId()),
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = computed(
    () => this.runtime.state().missions[this.mission().id],
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  collected = computed(
    () => this.runtime.state().collectedIds.includes(this.evidenceId()),
    ...ngDevMode ? [{ debugName: "collected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sourceTitle = viewChild(
    "sourceTitle",
    ...ngDevMode ? [{ debugName: "sourceTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  boardTitle = viewChild(
    "boardTitle",
    ...ngDevMode ? [{ debugName: "boardTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  drafts = /* @__PURE__ */ new Map();
  relationship = "contradicts";
  confidence = "developing";
  note = "";
  defense = {
    category: "",
    claim: "",
    consequence: "",
    answerId: "",
    explanation: ""
  };
  defenseLoaded = false;
  ngOnInit() {
    const saved = this.progress().links.find((link) => link.evidenceId === this.evidenceId());
    if (saved) {
      this.note = saved.note;
      this.relationship = saved.relationship;
      this.confidence = saved.confidence;
    }
  }
  selectSource(id) {
    this.drafts.set(this.evidenceId(), {
      evidenceId: this.evidenceId(),
      relationship: this.relationship,
      note: this.note,
      confidence: this.confidence
    });
    this.evidenceId.set(id);
    const saved = this.drafts.get(id) ?? this.progress().links.find((l) => l.evidenceId === id);
    this.note = saved?.note ?? "";
    this.relationship = saved?.relationship ?? "contradicts";
    this.confidence = saved?.confidence ?? "developing";
    this.focus("source");
  }
  collect() {
    this.runtime.dispatch({ type: "collect", evidenceId: this.evidenceId() });
  }
  connect() {
    this.runtime.dispatch({
      type: "link",
      missionId: this.mission().id,
      link: {
        evidenceId: this.evidenceId(),
        note: this.note,
        relationship: this.relationship,
        confidence: this.confidence
      }
    });
  }
  openBoard() {
    if (!this.defenseLoaded) {
      this.defense = __spreadValues({}, this.progress().defenses.at(-1) ?? this.defense);
      this.defenseLoaded = true;
    }
    this.mode.set("defense");
    this.focus("board");
  }
  openSources() {
    this.mode.set("sources");
    this.focus("source");
  }
  defend() {
    this.runtime.dispatch({ type: "defend", missionId: this.mission().id, defense: this.defense });
  }
  title(id) {
    return this.runtime.config.evidence.find((e) => e.id === id)?.title ?? id;
  }
  focus(target) {
    afterNextRender(() => {
      const element = (target === "source" ? this.sourceTitle() : this.boardTitle())?.nativeElement;
      element?.scrollIntoView({ block: "nearest", behavior: "instant" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  static \u0275fac = function TimeRepairInvestigationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimeRepairInvestigationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TimeRepairInvestigationComponent, selectors: [["app-time-repair-investigation"]], viewQuery: function TimeRepairInvestigationComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.sourceTitle, _c05, 5)(ctx.boardTitle, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { mission: [1, "mission"] }, outputs: { jumpRequested: "jumpRequested" }, decls: 13, vars: 8, consts: [["sourceTitle", ""], ["boardTitle", ""], [1, "archive-header"], [1, "eyebrow"], ["aria-label", "Investigation workspace", 1, "segmented"], ["type", "button", 3, "click"], [1, "archive-layout"], [1, "defense-layout"], ["aria-label", "Evidence archive", 1, "source-list"], [1, "muted"], ["type", "button", 3, "selected"], [1, "archive-note"], [1, "source-detail"], ["tabindex", "-1"], [1, "excerpt"], [1, "citation"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "perspective"], ["type", "button", 1, "primary"], [1, "connection-form"], [1, "success"], [1, "source-number"], ["type", "button", 1, "primary", 3, "click"], [1, "connection-form", 3, "ngSubmit"], [1, "form-pair"], ["name", "relationship", 3, "ngModelChange", "ngModel"], ["value", "contradicts"], ["value", "supports"], ["value", "uncertain"], ["name", "confidence", 3, "ngModelChange", "ngModel"], ["value", "developing"], ["value", "confident"], ["name", "note", "rows", "2", "maxlength", "4000", "placeholder", "Connect a specific detail to the reported cargo and date.", "required", "", "minlength", "20", 3, "ngModelChange", "ngModel"], [1, "actions"], ["type", "submit", 1, "primary"], [1, "evidence-board"], [1, "reported"], [1, "linked-card"], [1, "defense-form", 3, "ngSubmit"], [3, "click"], [1, "eyebrow", "success"], ["name", "category", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["name", "claim", "rows", "3", "maxlength", "4000", "required", "", "placeholder", "What is wrong, and what does the evidence support instead?", 3, "ngModelChange", "ngModel", "minlength"], ["name", "consequence", "rows", "3", "maxlength", "4000", "required", "", "placeholder", "How could this error distort a later event or interpretation?", 3, "ngModelChange", "ngModel", "minlength"], [1, "radio"], ["name", "explanation", "rows", "2", "maxlength", "4000", "required", "", "placeholder", "Use a detail from each connected source. What remains uncertain?", 3, "ngModelChange", "ngModel", "minlength"], ["type", "radio", "name", "defenseAnswer", "required", "", 3, "ngModelChange", "ngModel", "value"]], template: function TimeRepairInvestigationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div")(2, "span", 3);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2");
      \u0275\u0275text(5, "Follow the evidence.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "button", 5);
      \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Template_button_click_7_listener() {
        return ctx.openSources();
      });
      \u0275\u0275text(8, " 01 \xB7 Read & connect ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function TimeRepairInvestigationComponent_Template_button_click_9_listener() {
        return ctx.openBoard();
      });
      \u0275\u0275text(10, " 02 \xB7 Defend the repair ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(11, TimeRepairInvestigationComponent_Conditional_11_Template, 26, 9, "div", 6)(12, TimeRepairInvestigationComponent_Conditional_12_Template, 17, 5, "div", 7);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Archive / ", ctx.mission().nodeId);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.mode() === "sources");
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "sources");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.mode() === "defense");
      \u0275\u0275attribute("aria-pressed", ctx.mode() === "defense");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.mode() === "sources" ? 11 : 12);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.65;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio][_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.archive-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1.5rem 1.7rem;\n  border-bottom: 1px solid #293c4a;\n}\n.archive-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.segmented[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n}\n.segmented[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  background: transparent;\n}\n.segmented[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #bff2da;\n  background: #203c40;\n  border-color: #6fada3;\n}\n.archive-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(230px, 0.8fr) 2fr;\n}\n.source-list[_ngcontent-%COMP%] {\n  padding: 1.4rem;\n  background: #0b1b27;\n  border-right: 1px solid #2c3c48;\n}\n.source-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.85rem;\n  text-align: left;\n  width: 100%;\n  padding: 1rem 0.85rem;\n  margin-bottom: 0.65rem;\n  background: transparent;\n  border-color: transparent;\n}\n.source-list[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #597b82;\n  background: #18323c;\n}\n.source-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.source-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.source-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin: 0.3rem 0 0.6rem;\n  line-height: 1.45;\n}\n.source-list[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: #a6bec9;\n}\n.source-number[_ngcontent-%COMP%] {\n  font: 0.8rem "Consolas", monospace;\n  color: #a7e6cd;\n  padding-top: 0.2rem;\n}\n.archive-note[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  border-left: 2px solid #a5dcca;\n  font-size: 0.8rem;\n  line-height: 1.7;\n  color: #a4b9c4;\n}\n.source-detail[_ngcontent-%COMP%] {\n  padding: 1.8rem 2rem;\n  min-width: 0;\n}\n.source-detail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 500 1.7rem/1.3 Georgia, serif;\n}\n.excerpt[_ngcontent-%COMP%] {\n  font: 1.15rem/1.8 Georgia, serif;\n  color: #e3e4de;\n  max-width: 66ch;\n}\n.citation[_ngcontent-%COMP%] {\n  color: #9fb3bd;\n  font-size: 0.73rem;\n  line-height: 1.6;\n}\n.citation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: 0.35rem;\n}\n.perspective[_ngcontent-%COMP%] {\n  border-top: 1px solid #2c404b;\n  padding-top: 1rem;\n  font-size: 0.8rem;\n  color: #adc0ca;\n}\n.perspective[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: #cde1e7;\n}\n.connection-form[_ngcontent-%COMP%], \n.defense-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.defense-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 0.9fr 1.8fr;\n}\n.evidence-board[_ngcontent-%COMP%] {\n  padding: 1.7rem;\n  background: #0b1b27;\n  border-right: 1px solid #293c48;\n}\n.reported[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #f1c592;\n  border: 1px solid #615042;\n  border-radius: 5px;\n  padding: 0.85rem;\n}\n.linked-card[_ngcontent-%COMP%] {\n  border: 1px solid #3e575b;\n  background: #152c34;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 5px;\n}\n.linked-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.linked-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.55rem;\n}\n.linked-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a8ebd0;\n  font-size: 0.66rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.linked-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 550;\n}\n.linked-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #b8cbd5;\n  margin: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.defense-form[_ngcontent-%COMP%] {\n  padding: 1.7rem 2rem;\n  align-content: start;\n}\n.defense-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n@media (max-width: 750px) {\n  .archive-layout[_ngcontent-%COMP%], \n   .defense-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .source-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n  .source-list[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n   .archive-note[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n  .source-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 200px;\n  }\n  .source-detail[_ngcontent-%COMP%], \n   .defense-form[_ngcontent-%COMP%], \n   .evidence-board[_ngcontent-%COMP%] {\n    padding: 1.2rem;\n  }\n  .segmented[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=time-repair-investigation.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeRepairInvestigationComponent, [{
    type: Component,
    args: [{ selector: "app-time-repair-investigation", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="archive-header">
  <div>
    <span class="eyebrow">Archive / {{ mission().nodeId }}</span>
    <h2>Follow the evidence.</h2>
  </div>
  <div class="segmented" aria-label="Investigation workspace">
    <button
      type="button"
      [class.active]="mode() === 'sources'"
      [attr.aria-pressed]="mode() === 'sources'"
      (click)="openSources()"
    >
      01 \xB7 Read & connect
    </button>
    <button
      type="button"
      [class.active]="mode() === 'defense'"
      [attr.aria-pressed]="mode() === 'defense'"
      (click)="openBoard()"
    >
      02 \xB7 Defend the repair
    </button>
  </div>
</div>
@if (mode() === 'sources') {
  <div class="archive-layout">
    <nav class="source-list" aria-label="Evidence archive">
      <p class="muted">
        {{ runtime.state().collectedIds.length }} / {{ runtime.config.evidence.length }} cards
        collected
      </p>
      @for (evidence of runtime.config.evidence; track evidence.id; let i = $index) {
        <button
          type="button"
          [class.selected]="source().id === evidence.id"
          [attr.aria-pressed]="source().id === evidence.id"
          (click)="selectSource(evidence.id)"
        >
          <span class="source-number">0{{ i + 1 }}</span
          ><span
            ><small>{{ evidence.kind }}</small
            ><strong>{{ evidence.title }}</strong>
            <small>{{
              runtime.state().collectedIds.includes(evidence.id) ? '\u2713 Collected' : 'Open source'
            }}</small></span
          >
        </button>
      }
      <div class="archive-note">
        Connect sources that establish the baseline and test the reported sequence. One detail
        rarely tells the whole story.
      </div>
    </nav>
    <article class="source-detail">
      <span class="eyebrow">Evidence card \xB7 {{ source().kind }}</span>
      <h3 #sourceTitle tabindex="-1">{{ source().title }}</h3>
      <p class="excerpt">{{ source().content }}</p>
      <p class="citation">
        {{ source().citation }}
        @if (source().url) {
          <a [href]="source().url" target="_blank" rel="noopener noreferrer">Read original \u2197</a>
        }
      </p>
      <p class="perspective">
        <strong>Read the source critically</strong>{{ source().perspective }}
      </p>
      @if (!collected()) {
        <button type="button" class="primary" (click)="collect()">+ Collect evidence card</button>
      } @else if (!progress().authorized) {
        <form (ngSubmit)="connect()" class="connection-form">
          <div class="form-pair">
            <label
              >This source\u2026<select name="relationship" [(ngModel)]="relationship">
                <option value="contradicts">Contradicts the reported anomaly</option>
                <option value="supports">Supports the reported anomaly</option>
                <option value="uncertain">Leaves the anomaly uncertain</option>
              </select></label
            >
            <label
              >My confidence<select name="confidence" [(ngModel)]="confidence">
                <option value="developing">Still developing</option>
                <option value="confident">Confident</option>
              </select></label
            >
          </div>
          <label
            >What does it prove?<textarea
              name="note"
              [(ngModel)]="note"
              rows="2"
              maxlength="4000"
              placeholder="Connect a specific detail to the reported cargo and date."
              required
              minlength="20"
            ></textarea>
          </label>
          <div class="actions">
            <button class="primary" type="submit">Save evidence connection</button
            ><span class="muted">{{ progress().links.length }} connected</span>
          </div>
        </form>
      } @else {
        <p class="success">\u2713 Evidence preserved with your authorized defense.</p>
      }
    </article>
  </div>
} @else {
  <div class="defense-layout">
    <aside class="evidence-board">
      <span class="eyebrow">Your evidence board</span>
      <h3 #boardTitle tabindex="-1">Evidence \u2192 claim \u2192 consequence</h3>
      <p class="reported">{{ mission().signal }}</p>
      @for (link of progress().links; track link.evidenceId) {
        <article class="linked-card">
          <small>{{ link.relationship }} \xB7 {{ link.confidence }}</small
          ><strong>{{ title(link.evidenceId) }}</strong>
          <p>{{ link.note }}</p>
        </article>
      } @empty {
        <p>No evidence connected yet. Read the archive and save what each source proves.</p>
        <button (click)="openSources()">Open archive</button>
      }
      <p class="muted">
        {{ progress().defenses.length }} defense
        {{ progress().defenses.length === 1 ? 'attempt' : 'attempts' }} retained in the repair log.
      </p>
    </aside>
    <form class="defense-form" (ngSubmit)="defend()">
      @if (progress().authorized) {
        <span class="eyebrow success">Authorization granted</span>
        <h3>Your evidence has opened a path.</h3>
        <p>
          The system checked your evidence connections, classification, and source conclusion. Your
          written defense is saved for teacher review.
        </p>
        @if (!progress().repaired) {
          <button type="button" class="primary" (click)="jumpRequested.emit()">
            Enter time-jump scene \u2192
          </button>
        } @else {
          <p class="success">
            Repair already applied. Return to the control room to verify its ripple.
          </p>
        }
      } @else {
        <span class="eyebrow">Repair authorization / system checkpoint</span>
        <h3>Prove it before you change it.</h3>
        <label
          >Classify the anomaly<select name="category" [(ngModel)]="defense.category" required>
            <option value="" disabled>Select a category</option>
            @for (category of mission().categories; track category) {
              <option [value]="category">{{ category }}</option>
            }
          </select></label
        >
        <div class="form-pair">
          <label
            >Your claim<textarea
              name="claim"
              [(ngModel)]="defense.claim"
              rows="3"
              maxlength="4000"
              [minlength]="runtime.config.settings.minReasoningLength"
              required
              placeholder="What is wrong, and what does the evidence support instead?"
            ></textarea>
          </label>
          <label
            >Cause \u2192 consequence<textarea
              name="consequence"
              [(ngModel)]="defense.consequence"
              rows="3"
              maxlength="4000"
              [minlength]="runtime.config.settings.minReasoningLength"
              required
              placeholder="How could this error distort a later event or interpretation?"
            ></textarea>
          </label>
        </div>
        <fieldset>
          <legend>{{ mission().defense.prompt }}</legend>
          @for (option of mission().defense.options; track option.id) {
            <label class="radio"
              ><input
                type="radio"
                name="defenseAnswer"
                [(ngModel)]="defense.answerId"
                [value]="option.id"
                required
              /><span>{{ option.label }}</span></label
            >
          }
        </fieldset>
        <label
          >Defend your source conclusion<textarea
            name="explanation"
            [(ngModel)]="defense.explanation"
            rows="2"
            maxlength="4000"
            [minlength]="runtime.config.settings.minReasoningLength"
            required
            placeholder="Use a detail from each connected source. What remains uncertain?"
          ></textarea>
        </label>
        <p class="muted">
          At least {{ runtime.config.settings.minReasoningLength }} characters in each explanation.
          This checkpoint checks structure and source conclusions; it does not grade your writing.
        </p>
        <button class="primary" type="submit">Request repair authorization \u2192</button>
      }
    </form>
  </div>
}
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-investigation.component.scss */\n:host {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\nh3,\np {\n  margin-top: 0;\n}\nh2 {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3 {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np {\n  line-height: 1.65;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton,\na {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na {\n  color: #a9ecce;\n}\n.eyebrow {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success {\n  color: #a9ecce;\n}\nlabel {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea,\nselect {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.archive-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  padding: 1.5rem 1.7rem;\n  border-bottom: 1px solid #293c4a;\n}\n.archive-header h2 {\n  margin-bottom: 0;\n}\n.segmented {\n  display: flex;\n  gap: 0.3rem;\n}\n.segmented button {\n  font-size: 0.75rem;\n  background: transparent;\n}\n.segmented button.active {\n  color: #bff2da;\n  background: #203c40;\n  border-color: #6fada3;\n}\n.archive-layout {\n  display: grid;\n  grid-template-columns: minmax(230px, 0.8fr) 2fr;\n}\n.source-list {\n  padding: 1.4rem;\n  background: #0b1b27;\n  border-right: 1px solid #2c3c48;\n}\n.source-list button {\n  display: flex;\n  gap: 0.85rem;\n  text-align: left;\n  width: 100%;\n  padding: 1rem 0.85rem;\n  margin-bottom: 0.65rem;\n  background: transparent;\n  border-color: transparent;\n}\n.source-list button.selected {\n  border-color: #597b82;\n  background: #18323c;\n}\n.source-list strong,\n.source-list small {\n  display: block;\n}\n.source-list strong {\n  font-weight: 500;\n  margin: 0.3rem 0 0.6rem;\n  line-height: 1.45;\n}\n.source-list small {\n  font-size: 0.65rem;\n  color: #a6bec9;\n}\n.source-number {\n  font: 0.8rem "Consolas", monospace;\n  color: #a7e6cd;\n  padding-top: 0.2rem;\n}\n.archive-note {\n  margin-top: 1rem;\n  padding: 1rem;\n  border-left: 2px solid #a5dcca;\n  font-size: 0.8rem;\n  line-height: 1.7;\n  color: #a4b9c4;\n}\n.source-detail {\n  padding: 1.8rem 2rem;\n  min-width: 0;\n}\n.source-detail h3 {\n  font: 500 1.7rem/1.3 Georgia, serif;\n}\n.excerpt {\n  font: 1.15rem/1.8 Georgia, serif;\n  color: #e3e4de;\n  max-width: 66ch;\n}\n.citation {\n  color: #9fb3bd;\n  font-size: 0.73rem;\n  line-height: 1.6;\n}\n.citation a {\n  display: inline-block;\n  margin-left: 0.35rem;\n}\n.perspective {\n  border-top: 1px solid #2c404b;\n  padding-top: 1rem;\n  font-size: 0.8rem;\n  color: #adc0ca;\n}\n.perspective strong {\n  display: block;\n  margin-bottom: 0.3rem;\n  color: #cde1e7;\n}\n.connection-form,\n.defense-form {\n  display: grid;\n  gap: 1rem;\n}\n.defense-layout {\n  display: grid;\n  grid-template-columns: 0.9fr 1.8fr;\n}\n.evidence-board {\n  padding: 1.7rem;\n  background: #0b1b27;\n  border-right: 1px solid #293c48;\n}\n.reported {\n  font-size: 0.85rem;\n  color: #f1c592;\n  border: 1px solid #615042;\n  border-radius: 5px;\n  padding: 0.85rem;\n}\n.linked-card {\n  border: 1px solid #3e575b;\n  background: #152c34;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 5px;\n}\n.linked-card small,\n.linked-card strong {\n  display: block;\n  margin-bottom: 0.55rem;\n}\n.linked-card small {\n  color: #a8ebd0;\n  font-size: 0.66rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.linked-card strong {\n  font-size: 0.85rem;\n  font-weight: 550;\n}\n.linked-card p {\n  font-size: 0.8rem;\n  color: #b8cbd5;\n  margin: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.defense-form {\n  padding: 1.7rem 2rem;\n  align-content: start;\n}\n.defense-form h3 {\n  margin: 0;\n}\n@media (max-width: 750px) {\n  .archive-layout,\n  .defense-layout {\n    grid-template-columns: 1fr;\n  }\n  .source-list {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n  .source-list > p,\n  .archive-note {\n    flex-basis: 100%;\n  }\n  .source-list button {\n    flex: 1 1 200px;\n  }\n  .source-detail,\n  .defense-form,\n  .evidence-board {\n    padding: 1.2rem;\n  }\n  .segmented {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=time-repair-investigation.component.css.map */\n'] }]
  }], null, { mission: [{ type: Input, args: [{ isSignal: true, alias: "mission", required: true }] }], jumpRequested: [{ type: Output, args: ["jumpRequested"] }], sourceTitle: [{ type: ViewChild, args: ["sourceTitle", { isSignal: true }] }], boardTitle: [{ type: ViewChild, args: ["boardTitle", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TimeRepairInvestigationComponent, { className: "TimeRepairInvestigationComponent", filePath: "src/app/templates/time-repair/ui/time-repair-investigation.component.ts", lineNumber: 25 });
})();

// src/app/templates/time-repair/ui/time-repair-scene.component.ts
var _c06 = ["inspectorTitle"];
var _forTrack07 = ($index, $item) => $item.id;
function TimeRepairSceneComponent_Conditional_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TimeRepairSceneComponent_Conditional_8_For_4_Template_button_click_0_listener() {
      const \u0275$index_21_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewIndex.set(\u0275$index_21_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const camera_r4 = ctx.$implicit;
    const \u0275$index_21_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.viewIndex() === \u0275$index_21_r2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.viewIndex() === \u0275$index_21_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", camera_r4.label, " ");
  }
}
function TimeRepairSceneComponent_Conditional_8_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 21);
  }
  if (rf & 2) {
    const hotspot_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("restored-object", ctx_r2.progress().repaired && hotspot_r6.id === ctx_r2.mission().repair.targetHotspotId);
    \u0275\u0275property("src", ctx_r2.progress().repaired && hotspot_r6.id === ctx_r2.mission().repair.targetHotspotId ? hotspot_r6.restoredObjectImage ?? hotspot_r6.objectImage : hotspot_r6.objectImage, \u0275\u0275sanitizeUrl);
  }
}
function TimeRepairSceneComponent_Conditional_8_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function TimeRepairSceneComponent_Conditional_8_For_9_Template_button_click_0_listener() {
      const hotspot_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.inspect(hotspot_r6.id));
    });
    \u0275\u0275conditionalCreate(1, TimeRepairSceneComponent_Conditional_8_For_9_Conditional_1_Template, 1, 3, "img", 20);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const hotspot_r6 = ctx.$implicit;
    const \u0275$index_31_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("left", hotspot_r6.x, "%")("top", hotspot_r6.y, "%");
    \u0275\u0275classProp("inspected", ctx_r2.progress().inspectedIds.includes(hotspot_r6.id))("selected", ctx_r2.selected() === hotspot_r6.id);
    \u0275\u0275attribute("aria-label", "Inspect " + hotspot_r6.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(hotspot_r6.objectImage ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_31_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(hotspot_r6.label);
  }
}
function TimeRepairSceneComponent_Conditional_8_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TimeRepairSceneComponent_Conditional_8_For_14_Template_button_click_0_listener() {
      const hotspot_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.inspect(hotspot_r9.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const hotspot_r9 = ctx.$implicit;
    const \u0275$index_48_r10 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.selected() === hotspot_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", \u0275$index_48_r10 + 1, " \xB7 ", hotspot_r9.label, " ", ctx_r2.progress().inspectedIds.includes(hotspot_r9.id) ? "\u2713" : "", " ");
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 24)(1, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_For_5_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r2.optionId, $event) || (ctx_r2.optionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(2, "span")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.optionId);
    \u0275\u0275property("value", option_r13.id);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(option_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r13.description);
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 23);
    \u0275\u0275listener("ngSubmit", function TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.repair());
    });
    \u0275\u0275elementStart(1, "fieldset")(2, "legend");
    \u0275\u0275text(3, "Choose an intervention");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_For_5_Template, 7, 4, "label", 24, _forTrack07);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 26);
    \u0275\u0275text(9, " Apply repair \xB7 1 charge ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.mission().repair.options);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" An intervention costs one charge. A wrong repair reduces stability by ", ctx_r2.runtime.config.settings.wrongRepairPenalty, " points. ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.optionId || ctx_r2.runtime.charges() === 0);
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1, "Object inspection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3", 22, 0);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, TimeRepairSceneComponent_Conditional_8_Conditional_18_Conditional_7_Template, 10, 2, "form");
  }
  if (rf & 2) {
    const object_r14 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(object_r14.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(object_r14.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(object_r14.id === ctx_r2.mission().repair.targetHotspotId && !ctx_r2.progress().repaired ? 7 : -1);
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1, "Inspect before intervening");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "A moment out of place.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, " Select a numbered object in the scene. Compare what you find with the evidence you brought. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 28);
    \u0275\u0275text(7, " Your defense earned the jump.");
    \u0275\u0275element(8, "br");
    \u0275\u0275text(9, "Your judgment determines the repair. ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 29);
    \u0275\u0275text(2, "Repair applied");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 30);
    \u0275\u0275listener("click", function TimeRepairSceneComponent_Conditional_8_Conditional_20_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.rippleRequested.emit());
    });
    \u0275\u0275text(6, "Follow the ripple \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.mission().canonicalSummary);
  }
}
function TimeRepairSceneComponent_Conditional_8_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, " Charges exhausted. Your attempts are saved. Open the repair log to export the evidence and discuss a new strategy. ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairSceneComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6);
    \u0275\u0275repeaterCreate(3, TimeRepairSceneComponent_Conditional_8_For_4_Template, 2, 4, "button", 7, _forTrack07);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 8)(6, "div", 9);
    \u0275\u0275element(7, "img", 10);
    \u0275\u0275repeaterCreate(8, TimeRepairSceneComponent_Conditional_8_For_9_Template, 6, 12, "button", 11, _forTrack07);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13);
    \u0275\u0275repeaterCreate(13, TimeRepairSceneComponent_Conditional_8_For_14_Template, 2, 4, "button", null, _forTrack07);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 14);
    \u0275\u0275text(16, " Reconstructed teaching scene \xB7 illustration and dialogue are not historical sources. Use your archive evidence to make decisions. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "aside", 15);
    \u0275\u0275conditionalCreate(18, TimeRepairSceneComponent_Conditional_8_Conditional_18_Template, 8, 3)(19, TimeRepairSceneComponent_Conditional_8_Conditional_19_Template, 10, 0);
    \u0275\u0275conditionalCreate(20, TimeRepairSceneComponent_Conditional_8_Conditional_20_Template, 7, 1, "div", 16)(21, TimeRepairSceneComponent_Conditional_8_Conditional_21_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.scene().views);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("transform-origin", ctx_r2.view().position);
    \u0275\u0275classProp("close-up", ctx_r2.viewIndex() > 0);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.scene().image, \u0275\u0275sanitizeUrl)("alt", ctx_r2.scene().imageAlt);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.scene().hotspots);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("repaired", ctx_r2.progress().repaired);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r2.progress().repaired ? "\u2713" : "\u25C7", " ", ctx_r2.objectLabel());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.scene().hotspots);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_10_0 = ctx_r2.inspected()) ? 18 : 19, tmp_10_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.progress().repaired ? 20 : ctx_r2.runtime.charges() === 0 ? 21 : -1);
  }
}
function TimeRepairSceneComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Complete the evidence defense to unlock this time jump.");
    \u0275\u0275elementEnd();
  }
}
var TimeRepairSceneComponent = class _TimeRepairSceneComponent {
  runtime = inject(TimeRepairRuntime);
  mission = input.required(
    ...ngDevMode ? [{ debugName: "mission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rippleRequested = output();
  scene = computed(
    () => this.runtime.config.scenes.find((s) => s.id === this.mission().sceneId),
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = computed(
    () => this.runtime.state().missions[this.mission().id],
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    "",
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "viewIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = computed(
    () => this.scene().views[this.viewIndex()] ?? this.scene().views[0],
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspected = computed(
    () => this.scene().hotspots.find((h) => h.id === this.selected()),
    ...ngDevMode ? [{ debugName: "inspected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inspectorTitle = viewChild(
    "inspectorTitle",
    ...ngDevMode ? [{ debugName: "inspectorTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  optionId = "";
  inspect(id) {
    if (this.runtime.dispatch({ type: "inspect", missionId: this.mission().id, hotspotId: id })) {
      this.selected.set(id);
      afterNextRender(() => {
        const element = this.inspectorTitle()?.nativeElement;
        element?.scrollIntoView({ block: "nearest", behavior: "instant" });
        element?.focus({ preventScroll: true });
      }, {
        injector: this.injector
      });
    }
  }
  repair() {
    this.runtime.dispatch({
      type: "repair",
      missionId: this.mission().id,
      optionId: this.optionId
    });
  }
  objectLabel() {
    const last = this.progress().attempts.at(-1);
    return this.mission().repair.options.find((o) => o.id === last?.optionId)?.objectLabel ?? "Scene awaiting inspection";
  }
  static \u0275fac = function TimeRepairSceneComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimeRepairSceneComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TimeRepairSceneComponent, selectors: [["app-time-repair-scene"]], viewQuery: function TimeRepairSceneComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.inspectorTitle, _c06, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { mission: [1, "mission"] }, outputs: { rippleRequested: "rippleRequested" }, decls: 10, vars: 4, consts: [["inspectorTitle", ""], [1, "scene-header"], [1, "eyebrow"], [1, "charge-counter"], [1, "scene-layout"], [1, "field"], ["aria-label", "Camera viewpoints", 1, "camera-tabs"], [3, "active"], [1, "viewport"], [1, "scene-plane"], [3, "src", "alt"], [1, "hotspot", 3, "inspected", "selected", "left", "top"], [1, "field-overlay"], ["aria-label", "Scene objects", 1, "object-list"], [1, "scene-caption"], [1, "inspector"], [1, "repair-complete"], [1, "exhausted"], [3, "click"], [1, "hotspot", 3, "click"], ["alt", "", "aria-hidden", "true", 1, "object-art", 3, "restored-object", "src"], ["alt", "", "aria-hidden", "true", 1, "object-art", 3, "src"], ["tabindex", "-1"], [3, "ngSubmit"], [1, "radio"], [1, "muted"], ["type", "submit", 1, "primary", 3, "disabled"], ["type", "radio", "name", "repairOption", "required", "", 3, "ngModelChange", "ngModel", "value"], [1, "field-tip"], [1, "eyebrow", "success"], [1, "primary", 3, "click"]], template: function TimeRepairSceneComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div")(2, "span", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "span", 3);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, TimeRepairSceneComponent_Conditional_8_Template, 22, 12, "div", 4)(9, TimeRepairSceneComponent_Conditional_9_Template, 2, 0, "p");
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Field operation / jump ", ctx.progress().jumped ? "confirmed" : "locked");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.scene().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.runtime.charges(), " repair charges");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.progress().jumped ? 8 : 9);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.65;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio][_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.scene-plane[_ngcontent-%COMP%]   .hotspot[_ngcontent-%COMP%]   .object-art[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 130px;\n  height: 112px;\n  max-width: none;\n  left: 50%;\n  bottom: 15px;\n  transform: translateX(-50%);\n  filter: drop-shadow(0 7px 8px rgba(7, 28, 36, 0.6));\n  pointer-events: none;\n  z-index: -1;\n}\n.scene-plane[_ngcontent-%COMP%]   .hotspot[_ngcontent-%COMP%]   .restored-object[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_object-restored 0.6s ease both;\n}\n@keyframes _ngcontent-%COMP%_object-restored {\n  from {\n    opacity: 0.15;\n    filter: drop-shadow(0 0 28px #afffc9);\n  }\n  to {\n    opacity: 1;\n    filter: drop-shadow(0 7px 8px rgba(7, 28, 36, 0.6));\n  }\n}\n.scene-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.3rem 1.6rem;\n  border-bottom: 1px solid #30434e;\n}\n.scene-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.charge-counter[_ngcontent-%COMP%] {\n  color: #f4cc91;\n  font: 0.75rem "Consolas", monospace;\n}\n.scene-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.8fr) minmax(300px, 1fr);\n}\n.field[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: #0a1922;\n}\n.camera-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  padding: 0.8rem 1rem;\n}\n.camera-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 0.73rem;\n  padding: 0.4rem 0.8rem;\n}\n.camera-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #26443f;\n  border-color: #8eb9a8;\n}\n.viewport[_ngcontent-%COMP%] {\n  aspect-ratio: 16/10;\n  overflow: hidden;\n  position: relative;\n  isolation: isolate;\n}\n.scene-plane[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  transition: transform 0.8s ease;\n}\n.scene-plane.close-up[_ngcontent-%COMP%] {\n  transform: scale(1.55);\n}\n.scene-plane[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.hotspot[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border: 0;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0;\n  color: white;\n  min-width: 44px;\n  text-shadow: 0 1px 5px #000;\n}\n.hotspot[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  border: 1px solid #fde1ac;\n  background: rgba(17, 38, 47, 0.9019607843);\n  box-shadow: 0 0 0 5px rgba(255, 242, 211, 0.2);\n  font: 0.9rem "Consolas", monospace;\n  flex-shrink: 0;\n}\n.hotspot[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: none;\n  font-size: 0.65rem;\n  background: rgba(17, 38, 47, 0.9215686275);\n  padding: 0.4rem;\n  border-radius: 4px;\n}\n.hotspot.selected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.hotspot[_ngcontent-%COMP%]:focus-visible   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n.hotspot.inspected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #195b4c;\n  border-color: #c6ffe1;\n}\n.hotspot[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: transparent;\n}\n.field-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1rem;\n  left: 1rem;\n  background: rgba(20, 34, 46, 0.9098039216);\n  padding: 0.65rem 1rem;\n  border: 1px solid #c59265;\n  color: #f6d1ab;\n  border-radius: 5px;\n  font-size: 0.76rem;\n}\n.field-overlay.repaired[_ngcontent-%COMP%] {\n  border-color: #9fd4b7;\n  color: #b5f1ce;\n}\n.object-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  padding: 0.8rem;\n}\n.object-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  flex: 1 1 130px;\n}\n.object-list[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #b1dac8;\n}\n.scene-caption[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  color: #93aab8;\n  padding: 0 1rem;\n}\n.inspector[_ngcontent-%COMP%] {\n  padding: 1.7rem;\n  border-left: 1px solid #31434c;\n}\n.inspector[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #b9cbd4;\n  font-size: 0.88rem;\n}\n.inspector[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  margin-top: 1.8rem;\n}\n.inspector[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  padding: 0.8rem;\n}\n.radio[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.radio[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.radio[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a4bac5;\n  margin-top: 0.4rem;\n  line-height: 1.6;\n}\n.radio[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 550;\n}\n.field-tip[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  border-left: 2px solid #adcdbc;\n  padding: 1rem;\n  font: 1.1rem/1.8 Georgia, serif;\n  color: #b8cccf;\n}\n.repair-complete[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  border-top: 1px solid #42625d;\n  padding-top: 1.5rem;\n}\n.repair-complete[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n}\n.exhausted[_ngcontent-%COMP%] {\n  color: #ffd2a6;\n  font-size: 0.82rem;\n  padding: 1rem;\n  border: 1px solid #866244;\n}\n@media (max-width: 850px) {\n  .scene-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .inspector[_ngcontent-%COMP%] {\n    border-left: 0;\n    border-top: 1px solid #31434c;\n  }\n  .viewport[_ngcontent-%COMP%] {\n    aspect-ratio: 16/10;\n  }\n}\n/*# sourceMappingURL=time-repair-scene.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeRepairSceneComponent, [{
    type: Component,
    args: [{ selector: "app-time-repair-scene", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="scene-header">
  <div>
    <span class="eyebrow"
      >Field operation / jump {{ progress().jumped ? 'confirmed' : 'locked' }}</span
    >
    <h2>{{ scene().title }}</h2>
  </div>
  <span class="charge-counter">{{ runtime.charges() }} repair charges</span>
</div>
@if (progress().jumped) {
  <div class="scene-layout">
    <div class="field">
      <div class="camera-tabs" aria-label="Camera viewpoints">
        @for (camera of scene().views; track camera.id; let i = $index) {
          <button
            [attr.aria-pressed]="viewIndex() === i"
            [class.active]="viewIndex() === i"
            (click)="viewIndex.set(i)"
          >
            {{ camera.label }}
          </button>
        }
      </div>
      <div class="viewport">
        <div
          class="scene-plane"
          [class.close-up]="viewIndex() > 0"
          [style.transform-origin]="view().position"
        >
          <img [src]="scene().image" [alt]="scene().imageAlt" />
          @for (hotspot of scene().hotspots; track hotspot.id; let i = $index) {
            <button
              class="hotspot"
              [class.inspected]="progress().inspectedIds.includes(hotspot.id)"
              [class.selected]="selected() === hotspot.id"
              [style.left.%]="hotspot.x"
              [style.top.%]="hotspot.y"
              [attr.aria-label]="'Inspect ' + hotspot.label"
              (click)="inspect(hotspot.id)"
            >
              @if (hotspot.objectImage) {
                <img
                  class="object-art"
                  [class.restored-object]="
                    progress().repaired && hotspot.id === mission().repair.targetHotspotId
                  "
                  [src]="
                    progress().repaired && hotspot.id === mission().repair.targetHotspotId
                      ? (hotspot.restoredObjectImage ?? hotspot.objectImage)
                      : hotspot.objectImage
                  "
                  alt=""
                  aria-hidden="true"
                />
              }
              <span>{{ i + 1 }}</span
              ><strong>{{ hotspot.label }}</strong>
            </button>
          }
        </div>
        <span class="field-overlay" [class.repaired]="progress().repaired"
          >{{ progress().repaired ? '\u2713' : '\u25C7' }} {{ objectLabel() }}</span
        >
      </div>
      <div class="object-list" aria-label="Scene objects">
        @for (hotspot of scene().hotspots; track hotspot.id; let i = $index) {
          <button [attr.aria-pressed]="selected() === hotspot.id" (click)="inspect(hotspot.id)">
            {{ i + 1 }} \xB7 {{ hotspot.label }}
            {{ progress().inspectedIds.includes(hotspot.id) ? '\u2713' : '' }}
          </button>
        }
      </div>
      <p class="scene-caption">
        Reconstructed teaching scene \xB7 illustration and dialogue are not historical sources. Use
        your archive evidence to make decisions.
      </p>
    </div>
    <aside class="inspector">
      @if (inspected(); as object) {
        <span class="eyebrow">Object inspection</span>
        <h3 #inspectorTitle tabindex="-1">{{ object.label }}</h3>
        <p>{{ object.description }}</p>
        @if (object.id === mission().repair.targetHotspotId && !progress().repaired) {
          <form (ngSubmit)="repair()">
            <fieldset>
              <legend>Choose an intervention</legend>
              @for (option of mission().repair.options; track option.id) {
                <label class="radio"
                  ><input
                    type="radio"
                    name="repairOption"
                    [(ngModel)]="optionId"
                    [value]="option.id"
                    required
                  /><span
                    ><strong>{{ option.label }}</strong
                    ><small>{{ option.description }}</small></span
                  ></label
                >
              }
            </fieldset>
            <p class="muted">
              An intervention costs one charge. A wrong repair reduces stability by
              {{ runtime.config.settings.wrongRepairPenalty }} points.
            </p>
            <button class="primary" type="submit" [disabled]="!optionId || runtime.charges() === 0">
              Apply repair \xB7 1 charge
            </button>
          </form>
        }
      } @else {
        <span class="eyebrow">Inspect before intervening</span>
        <h3>A moment out of place.</h3>
        <p>
          Select a numbered object in the scene. Compare what you find with the evidence you
          brought.
        </p>
        <div class="field-tip">
          Your defense earned the jump.<br />Your judgment determines the repair.
        </div>
      }
      @if (progress().repaired) {
        <div class="repair-complete">
          <span class="eyebrow success">Repair applied</span>
          <p>{{ mission().canonicalSummary }}</p>
          <button class="primary" (click)="rippleRequested.emit()">Follow the ripple \u2192</button>
        </div>
      } @else if (runtime.charges() === 0) {
        <p class="exhausted">
          Charges exhausted. Your attempts are saved. Open the repair log to export the evidence and
          discuss a new strategy.
        </p>
      }
    </aside>
  </div>
} @else {
  <p>Complete the evidence defense to unlock this time jump.</p>
}
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-scene.component.scss */\n:host {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\nh3,\np {\n  margin-top: 0;\n}\nh2 {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3 {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np {\n  line-height: 1.65;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton,\na {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na {\n  color: #a9ecce;\n}\n.eyebrow {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success {\n  color: #a9ecce;\n}\nlabel {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea,\nselect {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.scene-plane .hotspot .object-art {\n  position: absolute;\n  width: 130px;\n  height: 112px;\n  max-width: none;\n  left: 50%;\n  bottom: 15px;\n  transform: translateX(-50%);\n  filter: drop-shadow(0 7px 8px rgba(7, 28, 36, 0.6));\n  pointer-events: none;\n  z-index: -1;\n}\n.scene-plane .hotspot .restored-object {\n  animation: object-restored 0.6s ease both;\n}\n@keyframes object-restored {\n  from {\n    opacity: 0.15;\n    filter: drop-shadow(0 0 28px #afffc9);\n  }\n  to {\n    opacity: 1;\n    filter: drop-shadow(0 7px 8px rgba(7, 28, 36, 0.6));\n  }\n}\n.scene-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.3rem 1.6rem;\n  border-bottom: 1px solid #30434e;\n}\n.scene-header h2 {\n  margin: 0;\n}\n.charge-counter {\n  color: #f4cc91;\n  font: 0.75rem "Consolas", monospace;\n}\n.scene-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.8fr) minmax(300px, 1fr);\n}\n.field {\n  min-width: 0;\n  background: #0a1922;\n}\n.camera-tabs {\n  display: flex;\n  gap: 0.5rem;\n  padding: 0.8rem 1rem;\n}\n.camera-tabs button {\n  font-size: 0.73rem;\n  padding: 0.4rem 0.8rem;\n}\n.camera-tabs button.active {\n  background: #26443f;\n  border-color: #8eb9a8;\n}\n.viewport {\n  aspect-ratio: 16/10;\n  overflow: hidden;\n  position: relative;\n  isolation: isolate;\n}\n.scene-plane {\n  position: absolute;\n  inset: 0;\n  transition: transform 0.8s ease;\n}\n.scene-plane.close-up {\n  transform: scale(1.55);\n}\n.scene-plane img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.hotspot {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border: 0;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0;\n  color: white;\n  min-width: 44px;\n  text-shadow: 0 1px 5px #000;\n}\n.hotspot span {\n  display: grid;\n  place-items: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  border: 1px solid #fde1ac;\n  background: rgba(17, 38, 47, 0.9019607843);\n  box-shadow: 0 0 0 5px rgba(255, 242, 211, 0.2);\n  font: 0.9rem "Consolas", monospace;\n  flex-shrink: 0;\n}\n.hotspot strong {\n  display: none;\n  font-size: 0.65rem;\n  background: rgba(17, 38, 47, 0.9215686275);\n  padding: 0.4rem;\n  border-radius: 4px;\n}\n.hotspot.selected strong,\n.hotspot:focus-visible strong {\n  display: block;\n}\n.hotspot.inspected span {\n  background: #195b4c;\n  border-color: #c6ffe1;\n}\n.hotspot:hover:not(:disabled) {\n  background: transparent;\n}\n.field-overlay {\n  position: absolute;\n  bottom: 1rem;\n  left: 1rem;\n  background: rgba(20, 34, 46, 0.9098039216);\n  padding: 0.65rem 1rem;\n  border: 1px solid #c59265;\n  color: #f6d1ab;\n  border-radius: 5px;\n  font-size: 0.76rem;\n}\n.field-overlay.repaired {\n  border-color: #9fd4b7;\n  color: #b5f1ce;\n}\n.object-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  padding: 0.8rem;\n}\n.object-list button {\n  font-size: 0.68rem;\n  flex: 1 1 130px;\n}\n.object-list button[aria-pressed=true] {\n  border-color: #b1dac8;\n}\n.scene-caption {\n  font-size: 0.68rem;\n  color: #93aab8;\n  padding: 0 1rem;\n}\n.inspector {\n  padding: 1.7rem;\n  border-left: 1px solid #31434c;\n}\n.inspector > p {\n  color: #b9cbd4;\n  font-size: 0.88rem;\n}\n.inspector form {\n  margin-top: 1.8rem;\n}\n.inspector .radio {\n  font-size: 0.78rem;\n  padding: 0.8rem;\n}\n.radio strong,\n.radio small {\n  display: block;\n}\n.radio small {\n  color: #a4bac5;\n  margin-top: 0.4rem;\n  line-height: 1.6;\n}\n.radio strong {\n  font-weight: 550;\n}\n.field-tip {\n  margin-top: 2rem;\n  border-left: 2px solid #adcdbc;\n  padding: 1rem;\n  font: 1.1rem/1.8 Georgia, serif;\n  color: #b8cccf;\n}\n.repair-complete {\n  margin-top: 2rem;\n  border-top: 1px solid #42625d;\n  padding-top: 1.5rem;\n}\n.repair-complete p {\n  font-size: 0.86rem;\n}\n.exhausted {\n  color: #ffd2a6;\n  font-size: 0.82rem;\n  padding: 1rem;\n  border: 1px solid #866244;\n}\n@media (max-width: 850px) {\n  .scene-layout {\n    grid-template-columns: 1fr;\n  }\n  .inspector {\n    border-left: 0;\n    border-top: 1px solid #31434c;\n  }\n  .viewport {\n    aspect-ratio: 16/10;\n  }\n}\n/*# sourceMappingURL=time-repair-scene.component.css.map */\n'] }]
  }], null, { mission: [{ type: Input, args: [{ isSignal: true, alias: "mission", required: true }] }], rippleRequested: [{ type: Output, args: ["rippleRequested"] }], inspectorTitle: [{ type: ViewChild, args: ["inspectorTitle", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TimeRepairSceneComponent, { className: "TimeRepairSceneComponent", filePath: "src/app/templates/time-repair/ui/time-repair-scene.component.ts", lineNumber: 25 });
})();

// src/app/templates/time-repair/ui/time-repair-page.component.ts
var _c07 = ["workspace"];
var _c13 = ["report"];
var _c22 = (a0) => [a0];
var _forTrack08 = ($index, $item) => $item.id;
var _forTrack14 = ($index, $item) => $item.title;
var _forTrack2 = ($index, $item) => $item.nodeId;
var _forTrack3 = ($index, $item) => $item.evidenceId;
function TimeRepairPageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-time-repair-week-workspace");
  }
}
function TimeRepairPageComponent_Conditional_1_For_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_For_36_Template_button_click_0_listener() {
      const node_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectNode(node_r4.id));
    });
    \u0275\u0275elementStart(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.selectedNodeId() === node_r4.id);
    \u0275\u0275attribute("data-status", ctx_r1.status(node_r4.id))("aria-pressed", ctx_r1.selectedNodeId() === node_r4.id)("aria-label", node_r4.dateLabel + ": " + node_r4.title + ", " + ctx_r1.status(node_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r4.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.status(node_r4.id) === "anomaly" ? "!" : ctx_r1.status(node_r4.id) === "ripple" ? "\u25C7" : ctx_r1.status(node_r4.id) === "missing" ? "?" : "\u2022");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.status(node_r4.id));
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 41);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r1.scene().image, \u0275\u0275sanitizeUrl)("alt", ctx_r1.scene().imageAlt);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selectedNode().dateLabel);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275element(1, "span");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.showReport());
    });
    \u0275\u0275text(1, " Open restored timeline case file \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 51);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openSpace("ripple"));
    });
    \u0275\u0275text(3, " Replay the ripple ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openSpace("ripple"));
    });
    \u0275\u0275text(1, " Follow the ripple & verify \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.jump());
    });
    \u0275\u0275text(1, "Time jump available \u2192");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openSpace("archive"));
    });
    \u0275\u0275text(1, " Investigate the anomaly \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "ol", 48)(7, "li")(8, "span");
    \u0275\u0275text(9, "01");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, "Connect evidence to the anomaly ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "li")(12, "span");
    \u0275\u0275text(13, "02");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, "Defend your claim to unlock a jump ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "li")(16, "span");
    \u0275\u0275text(17, "03");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, "Repair the moment & follow its ripple ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_19_Template, 4, 0)(20, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_20_Template, 2, 0, "button", 49)(21, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_21_Template, 2, 0, "button", 49)(22, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Conditional_22_Template, 2, 0, "button", 49);
    \u0275\u0275elementStart(23, "p", 50);
    \u0275\u0275text(24, " Evidence unlocks time travel. Understanding repairs the timeline. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("success", ctx_r1.progress().repaired);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.progress().verification ? "Timeline restored" : ctx_r1.progress().repaired ? "Repair applied / ripple pending" : "Anomaly detected / " + ctx_r1.selectedNode().dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.progress().verification ? "You restored the sequence." : ctx_r1.progress().repaired ? "A change is only the beginning." : "What does the evidence say?", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.progress().repaired ? ctx_r1.mission().canonicalSummary : ctx_r1.config.briefing);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("done", ctx_r1.progress().links.length >= ctx_r1.mission().evidenceRequired.length);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("done", ctx_r1.progress().authorized);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("done", ctx_r1.progress().repaired);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.progress().verification ? 19 : ctx_r1.progress().repaired ? 20 : ctx_r1.progress().authorized ? 21 : 22);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275text(1, " This branch is affected by an earlier anomaly. Investigate the source of the change before intervening downstream. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectNode(ctx_r1.mission().nodeId));
    });
    \u0275\u0275text(3, " Trace the originating anomaly \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1, " This pilot does not call for a repair here. A stable moment helps establish the baseline. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectNode(ctx_r1.config.missions[0].nodeId));
    });
    \u0275\u0275text(3, " Return to the repair mission \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_6_Template, 4, 0)(7, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Conditional_7_Template, 4, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.status(ctx_r1.selectedNodeId()), " / archive record");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedNode().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedNode().summary);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.status(ctx_r1.selectedNodeId()) === "ripple" ? 6 : 7);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 40);
    \u0275\u0275conditionalCreate(2, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_2_Template, 1, 2, "img", 41)(3, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_3_Template, 2, 1, "span", 42);
    \u0275\u0275element(4, "div", 43);
    \u0275\u0275elementStart(5, "div", 44)(6, "span");
    \u0275\u0275text(7, "ARCHIVE WINDOW");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_10_Template, 2, 0, "div", 45);
    \u0275\u0275elementStart(11, "div", 46)(12, "span", 11);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "h2");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "aside", 47);
    \u0275\u0275conditionalCreate(19, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_19_Template, 25, 12)(20, TimeRepairPageComponent_Conditional_1_Conditional_53_Conditional_20_Template, 8, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("restored", ctx_r1.progress().repaired)("record-portal", !ctx_r1.selectedMission());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedMission() ? 2 : 3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedNode().dateLabel);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedMission() ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedMission() ? "Priority signal / investigation required" : "Timeline record / " + ctx_r1.status(ctx_r1.selectedNodeId()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedNode().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMission() && !ctx_r1.progress().repaired ? ctx_r1.mission().signal : ctx_r1.selectedNode().summary, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedMission() ? 19 : 20);
  }
}
function TimeRepairPageComponent_Conditional_1_For_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 25)(1, "app-time-repair-investigation", 53);
    \u0275\u0275listener("jumpRequested", function TimeRepairPageComponent_Conditional_1_For_55_Template_app_time_repair_investigation_jumpRequested_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.jump());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const currentMission_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", ctx_r1.space() !== "archive");
    \u0275\u0275advance();
    \u0275\u0275property("mission", currentMission_r12);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-time-repair-scene", 54);
    \u0275\u0275listener("rippleRequested", function TimeRepairPageComponent_Conditional_1_Conditional_56_Template_app_time_repair_scene_rippleRequested_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openSpace("ripple"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("mission", ctx_r1.mission());
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_57_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 62)(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 63)(4, "small");
    \u0275\u0275text(5, "Corrupted branch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 64);
    \u0275\u0275text(9, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 65)(11, "small");
    \u0275\u0275text(12, "Restored sequence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ripple_r14 = ctx.$implicit;
    const \u0275$index_248_r15 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("animation-delay", \u0275$index_248_r15 * 180, "ms");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("0", \u0275$index_248_r15 + 1, " / ", ctx_r1.nodeTitle(ripple_r14.nodeId));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ripple_r14.before);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ripple_r14.after);
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", link_r17.evidenceId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.sourceTitle(link_r17.evidenceId));
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 66);
    \u0275\u0275listener("ngSubmit", function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verify());
    });
    \u0275\u0275elementStart(1, "div")(2, "h3");
    \u0275\u0275text(3, "Verify the ripple.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Source to cite");
    \u0275\u0275elementStart(8, "select", 67);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.verificationEvidenceId, $event) || (ctx_r1.verificationEvidenceId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 68);
    \u0275\u0275text(10, "Select a connected source");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_For_12_Template, 2, 2, "option", 69, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label");
    \u0275\u0275text(15, "Your explanation");
    \u0275\u0275elementStart(16, "textarea", 70);
    \u0275\u0275twoWayListener("ngModelChange", function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_Template_textarea_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.verificationExplanation, $event) || (ctx_r1.verificationExplanation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 71);
    \u0275\u0275text(18, "Record verification \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.mission().verificationPrompt);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.verificationEvidenceId);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.progress().links);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.verificationExplanation);
    \u0275\u0275property("minlength", ctx_r1.config.settings.minReasoningLength);
    \u0275\u0275control();
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "div")(2, "span", 55);
    \u0275\u0275text(3, "Verification recorded");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_16_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showReport());
    });
    \u0275\u0275text(9, "View your case file \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.progress().verification?.explanation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Source: ", ctx_r1.sourceTitle(ctx_r1.progress().verification.evidenceId));
  }
}
function TimeRepairPageComponent_Conditional_1_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 55);
    \u0275\u0275text(2, "Ripple check / cause \u2192 consequence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "One repair. A sequence reconnected.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 56);
    \u0275\u0275text(6, " These branches model how the damaged record could distort our interpretation. They are not predictions of an alternate history. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 57)(8, "span");
    \u0275\u0275text(9, "REPAIRED MOMENT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 58);
    \u0275\u0275repeaterCreate(13, TimeRepairPageComponent_Conditional_1_Conditional_57_For_14_Template, 15, 6, "article", 59, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_15_Template, 19, 4, "form", 60)(16, TimeRepairPageComponent_Conditional_1_Conditional_57_Conditional_16_Template, 10, 2, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.mission().canonicalSummary);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.mission().ripples);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.progress().verification ? 15 : 16);
  }
}
function TimeRepairPageComponent_Conditional_1_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const stage_r19 = ctx.$implicit;
    const \u0275$index_338_r20 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Week 0", \u0275$index_338_r20 + 1, " ", \u0275$index_338_r20 > 0 ? "/ content roadmap" : "/ pilot");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stage_r19.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stage_r19.description);
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const link_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.sourceTitle(link_r21.evidenceId), " \xB7 ", link_r21.relationship);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", link_r21.note, " ");
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No evidence connected.");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Claim:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Consequence:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Source defense:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const defense_r22 = ctx.$implicit;
    const $index_r23 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Defense ", $index_r23 + 1, " \xB7 ", defense_r22.accepted ? "checkpoint passed" : "revision requested", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", defense_r22.claim);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", defense_r22.consequence);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", defense_r22.explanation);
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attempt_r24 = ctx.$implicit;
    const $index_r25 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", $index_r25 + 1, " \xB7 ", attempt_r24.optionId, " \xB7 ", attempt_r24.correct ? "applied" : "destabilized the timeline", " ");
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No interventions yet.");
    \u0275\u0275elementEnd();
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "Verification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const p_r26 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r26.verification.explanation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.sourceTitle(p_r26.verification.evidenceId));
  }
}
function TimeRepairPageComponent_Conditional_1_For_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "article", 35)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h4");
    \u0275\u0275text(7, "Evidence connections");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, TimeRepairPageComponent_Conditional_1_For_82_For_9_Template, 5, 3, "p", null, _forTrack3, false, TimeRepairPageComponent_Conditional_1_For_82_ForEmpty_10_Template, 2, 0, "p");
    \u0275\u0275repeaterCreate(11, TimeRepairPageComponent_Conditional_1_For_82_For_12_Template, 15, 5, "details", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(13, "h4");
    \u0275\u0275text(14, "Repair attempts");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, TimeRepairPageComponent_Conditional_1_For_82_For_16_Template, 2, 3, "p", null, \u0275\u0275repeaterTrackByIndex, false, TimeRepairPageComponent_Conditional_1_For_82_ForEmpty_17_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(18, TimeRepairPageComponent_Conditional_1_For_82_Conditional_18_Template, 6, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r27 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const p_r28 = \u0275\u0275storeLet(ctx_r1.runtime.state().missions[m_r27.id]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.nodeTitle(m_r27.nodeId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r27.signal);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(p_r28.links);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(p_r28.defenses);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(p_r28.attempts);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(p_r28.verification ? 18 : -1);
  }
}
function TimeRepairPageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "app-workspace-tools")(2, "header", 3)(3, "a", 4);
    \u0275\u0275text(4, "\u2190 ");
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Projects");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "span", 6);
    \u0275\u0275text(9, "\u2301");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "TIME REPAIR AGENCY");
    \u0275\u0275elementStart(12, "small");
    \u0275\u0275text(13, "Department of temporal integrity");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "span", 7);
    \u0275\u0275text(15, "LOCAL PILOT \xB7 01");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 8);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showReport());
    });
    \u0275\u0275text(17, " Repair log ");
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "main")(21, "section", 9)(22, "div", 10)(23, "span", 11);
    \u0275\u0275text(24, "Temporal scan / select a moment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 12)(26, "span");
    \u0275\u0275text(27, "\u25CF Stable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "\u25C7 Ripple");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "\u25C9 Anomaly");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 13)(33, "div", 14);
    \u0275\u0275element(34, "div", 15);
    \u0275\u0275repeaterCreate(35, TimeRepairPageComponent_Conditional_1_For_36_Template, 9, 9, "button", 16, _forTrack08);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 17)(38, "div", 18)(39, "button", 19);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSpace("control"));
    });
    \u0275\u0275text(40, " Control room");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 19);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSpace("archive"));
    });
    \u0275\u0275text(42, " Evidence archive ");
    \u0275\u0275elementStart(43, "small");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "button", 20);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.jump());
    });
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "span", 21);
    \u0275\u0275text(48, "01 / DETECT THE BREACH");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "p", 22);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "section", 23, 0);
    \u0275\u0275conditionalCreate(53, TimeRepairPageComponent_Conditional_1_Conditional_53_Template, 21, 11, "div", 24);
    \u0275\u0275repeaterCreate(54, TimeRepairPageComponent_Conditional_1_For_55_Template, 2, 2, "section", 25, _forTrack08);
    \u0275\u0275conditionalCreate(56, TimeRepairPageComponent_Conditional_1_Conditional_56_Template, 1, 1, "app-time-repair-scene", 26);
    \u0275\u0275conditionalCreate(57, TimeRepairPageComponent_Conditional_1_Conditional_57_Template, 17, 2, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "footer", 28)(59, "span");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span");
    \u0275\u0275text(62, "One playable repair \xB7 local exercise \xB7 no official grade");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "details", 29)(64, "summary");
    \u0275\u0275text(65, "Where this fits in the three-week mission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div");
    \u0275\u0275repeaterCreate(67, TimeRepairPageComponent_Conditional_1_For_68_Template, 7, 4, "article", null, _forTrack14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(69, "dialog", 30, 1)(71, "div", 31)(72, "div")(73, "span", 11);
    \u0275\u0275text(74, "Timeline repair agency / local case file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "h2", 32);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "button", 33);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReport());
    });
    \u0275\u0275text(78, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "p", 34);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(81, TimeRepairPageComponent_Conditional_1_For_82_Template, 19, 6, "article", 35, _forTrack08);
    \u0275\u0275elementStart(83, "button", 36);
    \u0275\u0275listener("click", function TimeRepairPageComponent_Conditional_1_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportReport());
    });
    \u0275\u0275text(84, "Export case file \xB7 JSON");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275textInterpolate2("", ctx_r1.verifiedCount(), "/", ctx_r1.config.missions.length);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r1.nodes);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.space() === "control");
    \u0275\u0275attribute("aria-pressed", ctx_r1.space() === "control");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.space() === "archive");
    \u0275\u0275attribute("aria-pressed", ctx_r1.space() === "archive");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.state().collectedIds.length);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.space() === "scene");
    \u0275\u0275property("disabled", !ctx_r1.progress().authorized || ctx_r1.progress().repaired);
    \u0275\u0275attribute("aria-pressed", ctx_r1.space() === "scene");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.progress().authorized ? "Time jump \u2197" : "Time jump \xB7 locked", " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("has-message", ctx_r1.runtime.message());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.message(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.space() === "control" ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction1(26, _c22, ctx_r1.mission()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.space() === "scene" ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.space() === "ripple" && ctx_r1.progress().repaired ? 57 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.storageNotice());
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.config.stages);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.completed() ? "Restored Timeline Case File" : "Investigation & Repair Log", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate4(" ", ctx_r1.verifiedCount(), " of ", ctx_r1.config.missions.length, " repairs verified \xB7 ", ctx_r1.runtime.stability(), "% stability \xB7 ", ctx_r1.runtime.charges(), " charges left. Written reasoning is recorded for review, not automatically graded. ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.config.missions);
  }
}
var TimeRepairPageComponent = class _TimeRepairPageComponent {
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === "control" || target === "archive" || target === "ripple")
        this.openSpace(target);
    });
  }
  runtime = inject(TimeRepairRuntime);
  config = this.runtime.config;
  sessionContext = inject(TIME_REPAIR_SESSION);
  weeklyPreview = !!this.config.previewWeeks && this.sessionContext.mode === "preview" && this.sessionContext.authorityMode === "localDemo";
  nodes = [...this.config.nodes].sort((a, b) => a.order - b.order);
  selectedNodeId = signal(
    this.config.missions[0].nodeId,
    ...ngDevMode ? [{ debugName: "selectedNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedNode = computed(
    () => this.config.nodes.find((n) => n.id === this.selectedNodeId()),
    ...ngDevMode ? [{ debugName: "selectedNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedMission = computed(
    () => this.config.missions.find((m) => m.nodeId === this.selectedNodeId()),
    ...ngDevMode ? [{ debugName: "selectedMission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mission = computed(
    () => this.selectedMission() ?? this.config.missions.find((m) => m.ripples.some((r) => r.nodeId === this.selectedNodeId())) ?? this.config.missions[0],
    ...ngDevMode ? [{ debugName: "mission" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progress = computed(
    () => this.runtime.state().missions[this.mission().id],
    ...ngDevMode ? [{ debugName: "progress" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene = computed(
    () => this.config.scenes.find((s) => s.id === this.mission().sceneId),
    ...ngDevMode ? [{ debugName: "scene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  space = signal(
    "control",
    ...ngDevMode ? [{ debugName: "space" }] : (
      /* istanbul ignore next */
      []
    )
  );
  workspace = viewChild(
    "workspace",
    ...ngDevMode ? [{ debugName: "workspace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  report = viewChild(
    "report",
    ...ngDevMode ? [{ debugName: "report" }] : (
      /* istanbul ignore next */
      []
    )
  );
  injector = inject(Injector);
  verifiedCount = computed(
    () => Object.values(this.runtime.state().missions).filter((m) => !!m.verification).length,
    ...ngDevMode ? [{ debugName: "verifiedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  verificationEvidenceId = "";
  verificationExplanation = "";
  status(id) {
    return nodeStatus(this.config, this.runtime.state(), id);
  }
  selectNode(id) {
    this.selectedNodeId.set(id);
    this.openSpace("control");
  }
  openSpace(space) {
    this.space.set(space);
    afterNextRender(() => {
      const element = this.workspace()?.nativeElement;
      element?.scrollIntoView({ block: "nearest", behavior: "instant" });
      element?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }
  jump() {
    if (this.runtime.dispatch({ type: "jump", missionId: this.mission().id }))
      this.openSpace("scene");
  }
  verify() {
    this.runtime.dispatch({
      type: "verify",
      missionId: this.mission().id,
      evidenceId: this.verificationEvidenceId,
      explanation: this.verificationExplanation
    });
  }
  showReport() {
    this.report()?.nativeElement.showModal();
  }
  closeReport() {
    this.report()?.nativeElement.close();
  }
  exportReport() {
    const url = URL.createObjectURL(new Blob([this.runtime.caseFile()], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.config.projectId}-case-file.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  nodeTitle(id) {
    return this.nodes.find((n) => n.id === id)?.title ?? id;
  }
  sourceTitle(id) {
    return this.config.evidence.find((e) => e.id === id)?.title ?? id;
  }
  static \u0275fac = function TimeRepairPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimeRepairPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TimeRepairPageComponent, selectors: [["app-time-repair-page"]], viewQuery: function TimeRepairPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.workspace, _c07, 5)(ctx.report, _c13, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 2, vars: 1, consts: [["workspace", ""], ["report", ""], [1, "time-room"], [1, "agency-header"], ["routerLink", "/projects", "aria-label", "Back to projects", 1, "back-link"], [1, "agency-brand"], ["aria-hidden", "true", 1, "agency-mark"], [1, "pilot-label"], [1, "log-button", 3, "click"], ["aria-label", "Interactive timeline", 1, "timeline"], [1, "timeline-heading"], [1, "eyebrow"], [1, "legend"], [1, "timeline-scroll"], [1, "timeline-track"], ["aria-hidden", "true", 1, "timeline-line"], [1, "timeline-node", 3, "selected"], [1, "workspace-bar"], ["aria-label", "Mission spaces", 1, "spaces"], [3, "click"], [3, "click", "disabled"], [1, "workspace-phase"], ["role", "status", "aria-live", "polite", 1, "runtime-message"], ["tabindex", "-1", "aria-label", "Selected timeline workspace", 1, "workspace"], [1, "mission-overview"], ["aria-label", "Evidence investigation", 3, "hidden"], [3, "mission"], [1, "ripple-workspace"], [1, "room-footer"], [1, "project-roadmap"], ["aria-labelledby", "repair-log-title", 1, "report-dialog"], [1, "report-header"], ["id", "repair-log-title"], ["autofocus", "", "aria-label", "Close repair log", 3, "click"], [1, "muted"], [1, "report-mission"], [1, "primary", 3, "click"], [1, "timeline-node", 3, "click"], [1, "node-date"], ["aria-hidden", "true", 1, "node-orb"], [1, "portal"], [3, "src", "alt"], ["aria-hidden", "true", 1, "record-date"], [1, "portal-shade"], [1, "portal-coordinates"], ["aria-hidden", "true", 1, "target-reticle"], [1, "portal-caption"], [1, "mission-panel"], [1, "mission-steps"], [1, "primary"], [1, "mission-footnote"], [1, "text-button", 3, "click"], [1, "ripple-note"], [3, "jumpRequested", "mission"], [3, "rippleRequested", "mission"], [1, "eyebrow", "success"], [1, "ripple-intro"], [1, "ripple-origin"], [1, "ripple-chain"], [1, "ripple-card", 3, "animation-delay"], [1, "verification-form"], [1, "verified-banner"], [1, "ripple-card"], [1, "before"], ["aria-hidden", "true", 1, "ripple-arrow"], [1, "after"], [1, "verification-form", 3, "ngSubmit"], ["name", "verificationSource", "required", "", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["name", "verificationExplanation", "rows", "5", "maxlength", "4000", "required", "", "placeholder", "Before \u2192 repair \u2192 later interpretation. What does the source support, and what remains uncertain?", 3, "ngModelChange", "ngModel", "minlength"], ["type", "submit", 1, "primary"]], template: function TimeRepairPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, TimeRepairPageComponent_Conditional_0_Template, 1, 0, "app-time-repair-week-workspace")(1, TimeRepairPageComponent_Conditional_1_Template, 85, 28);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.weeklyPreview ? 0 : 1);
    }
  }, dependencies: [TimeRepairWeekWorkspaceComponent, WorkspaceToolsComponent, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm, RouterLink, TimeRepairInvestigationComponent, TimeRepairSceneComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.65;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success[_ngcontent-%COMP%] {\n  color: #a9ecce;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio][_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.stability-meter[_ngcontent-%COMP%]   .stability-ring[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  font: 1.5rem "Consolas", monospace;\n  color: #e8f5ed;\n}\n.record-portal[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      ellipse at center,\n      rgba(45, 98, 96, 0.6666666667),\n      transparent 65%),\n    repeating-radial-gradient(\n      ellipse at center,\n      transparent 0 40px,\n      rgba(126, 182, 171, 0.1450980392) 41px 42px);\n}\n.record-date[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 25% 0 auto;\n  text-align: center;\n  font: 3rem Georgia, serif;\n  color: #b2d0c3;\n}\n.time-room[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      ellipse at 65% 0%,\n      rgba(23, 53, 66, 0.3333333333),\n      transparent 48%),\n    #081722;\n}\n.agency-header[_ngcontent-%COMP%] {\n  min-height: 70px;\n  display: flex;\n  align-items: center;\n  gap: 1.8rem;\n  padding: 0.8rem 3%;\n  border-bottom: 1px solid #2a3c47;\n  background: rgba(11, 26, 36, 0.9098039216);\n}\n.back-link[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  text-decoration: none;\n  color: #a2b5c1;\n  font-size: 0.8rem;\n  padding: 0.5rem 0;\n}\n.agency-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  font: 600 0.68rem/1.4 "Consolas", monospace;\n  letter-spacing: 0.16em;\n}\n.agency-brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.55rem;\n  color: #8098a8;\n  letter-spacing: 0.08em;\n  margin-top: 0.2rem;\n}\n.agency-mark[_ngcontent-%COMP%] {\n  font: 2.5rem/1 Georgia, serif;\n  color: #ade7d0;\n}\n.pilot-label[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font: 0.65rem "Consolas", monospace;\n  color: #a7c3c5;\n  letter-spacing: 0.1em;\n}\n.log-button[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  background: transparent;\n}\n.log-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #abcdbd;\n  margin-left: 0.5rem;\n}\nmain[_ngcontent-%COMP%] {\n  max-width: 1560px;\n  padding: 2.5rem 3% 2rem;\n  margin: auto;\n}\n.room-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  font-weight: 550;\n  letter-spacing: -0.05em;\n  font-size: clamp(1.7rem, 3vw, 2.7rem);\n  margin: 0.4rem 0 0.6rem;\n}\n.room-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.84rem;\n  color: #a0b2bf;\n  margin: 0;\n}\n.live-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  margin-left: 1rem;\n  vertical-align: middle;\n  border-radius: 50%;\n  background: #afd9c7;\n  box-shadow: 0 0 15px rgba(175, 243, 207, 0.4);\n}\n.stability-meter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n}\n.stability-ring[_ngcontent-%COMP%] {\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  background: conic-gradient(#a9e5c9 var(--%NS%stability), #243743 0);\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n.stability-ring[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 4px;\n  border-radius: 50%;\n  background: #10212c;\n}\n.stability-ring[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  position: relative;\n  font: 1.5rem "Consolas", monospace;\n}\n.stability-ring[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: inline;\n  font-size: 0.7rem;\n}\n.stability-meter[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n}\n.stability-meter[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: #efd0a5;\n}\n.stability-meter[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.69rem;\n  color: #94aab7;\n  margin-top: 0.35rem;\n}\n.timeline[_ngcontent-%COMP%] {\n  border: 1px solid #31404d;\n  border-radius: 9px;\n  padding: 1.1rem 1.4rem 0.8rem;\n  background-image:\n    linear-gradient(rgba(83, 108, 118, 0.1254901961) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(83, 108, 118, 0.1254901961) 1px,\n      transparent 1px);\n  background-size: 32px 32px;\n  background-color: rgba(14, 32, 44, 0.9098039216);\n}\n.timeline-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n}\n.legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  color: #98bbaa;\n  font: 0.61rem "Consolas", monospace;\n}\n.legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  color: #e8caa0;\n}\n.legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  color: #f4a18d;\n}\n.timeline-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0.5rem 0;\n}\n.timeline-track[_ngcontent-%COMP%] {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 1fr;\n  position: relative;\n  min-width: 750px;\n  isolation: isolate;\n}\n.timeline-line[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 7%;\n  right: 7%;\n  top: 62px;\n  height: 1px;\n  z-index: -1;\n  background:\n    linear-gradient(\n      90deg,\n      #78948a,\n      #e79572 22%,\n      #d4b786 65%,\n      #67897f);\n  box-shadow: 0 0 7px rgba(167, 206, 172, 0.2666666667);\n}\n.timeline-node[_ngcontent-%COMP%] {\n  border: 1px solid transparent;\n  background: transparent;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0.7rem 0.4rem;\n  text-align: center;\n  min-width: 0;\n}\n.timeline-node[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(29, 54, 65, 0.4196078431);\n  border-color: #486371;\n}\n.timeline-node.selected[_ngcontent-%COMP%] {\n  background: rgba(41, 64, 75, 0.5333333333);\n  border-color: #6f8891;\n}\n.node-date[_ngcontent-%COMP%] {\n  font: 0.7rem/1.4 "Consolas", monospace;\n  color: #bfd1d8;\n  margin-bottom: 0.8rem;\n}\n.node-orb[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 1px solid #6b9f8b;\n  border-radius: 50%;\n  background: #13372e;\n  color: #a9e9c8;\n  display: grid;\n  place-items: center;\n  font: 1.2rem "Consolas", monospace;\n  margin-bottom: 1rem;\n}\n.timeline-node[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.71rem;\n  line-height: 1.4;\n  font-weight: 500;\n  max-width: 125px;\n  min-height: 2.8em;\n}\n.timeline-node[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: #9db6bb;\n  font-size: 0.53rem;\n  margin-top: 0.5rem;\n}\n.timeline-node[data-status=anomaly][_ngcontent-%COMP%]   .node-orb[_ngcontent-%COMP%] {\n  border-color: #e59174;\n  color: #ffba96;\n  background: #492e29;\n  box-shadow: 0 0 0 5px rgba(239, 173, 118, 0.0705882353), 0 0 28px rgba(244, 178, 124, 0.1098039216);\n}\n.timeline-node[data-status=ripple][_ngcontent-%COMP%]   .node-orb[_ngcontent-%COMP%] {\n  border-style: dashed;\n  color: #ecd39b;\n  border-color: #bda477;\n  background: #34342c;\n}\n.timeline-node[data-status=restored][_ngcontent-%COMP%]   .node-orb[_ngcontent-%COMP%] {\n  box-shadow: 0 0 20px rgba(120, 235, 177, 0.2392156863);\n}\n.timeline-node[data-status=missing][_ngcontent-%COMP%]   .node-orb[_ngcontent-%COMP%] {\n  border-color: #7f8a93;\n  background: #15202a;\n  color: #b7c3cd;\n}\n.workspace-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin: 1.6rem 0 0.85rem;\n}\n.spaces[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.spaces[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  border-color: transparent;\n  background: transparent;\n  color: #9eb2bf;\n  padding: 0.65rem 0.8rem;\n}\n.spaces[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #526b73;\n  background: #18343d;\n  color: #d6ece7;\n}\n.spaces[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  border-radius: 3px;\n  padding: 0.15rem 0.35rem;\n  background: #29444c;\n  color: #cfddd7;\n  margin-left: 0.3rem;\n}\n.workspace-phase[_ngcontent-%COMP%] {\n  color: #7895a5;\n  font: 0.59rem "Consolas", monospace;\n  letter-spacing: 0.1em;\n}\n.runtime-message[_ngcontent-%COMP%] {\n  display: none;\n}\n.runtime-message.has-message[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.85rem 1rem;\n  margin: 0 0 0.8rem;\n  border: 1px solid #5d776e;\n  background: #203c36;\n  border-radius: 6px;\n  font-size: 0.83rem;\n  color: #daf3e6;\n}\n.workspace[_ngcontent-%COMP%] {\n  border: 1px solid #314854;\n  border-radius: 9px;\n  overflow: hidden;\n  background: #10232f;\n}\n.workspace[_ngcontent-%COMP%]:focus {\n  outline-offset: 3px;\n}\n.mission-overview[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  min-height: 420px;\n}\n.portal[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 410px;\n  overflow: hidden;\n  isolation: isolate;\n  border-right: 1px solid #38505b;\n}\n.portal[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: saturate(0.6) brightness(0.65);\n}\n.portal.restored[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  filter: saturate(0.85) brightness(0.85);\n}\n.portal-shade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      0deg,\n      #0a1c28 0%,\n      rgba(11, 32, 48, 0.5725490196) 30%,\n      transparent 80%),\n    linear-gradient(\n      90deg,\n      rgba(18, 46, 50, 0.2666666667),\n      transparent);\n}\n.portal-coordinates[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 1.3rem 1.5rem auto;\n  display: flex;\n  justify-content: space-between;\n  font: 0.59rem "Consolas", monospace;\n  letter-spacing: 0.2em;\n  color: #d1e1d9;\n}\n.target-reticle[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 68%;\n  top: 38%;\n  width: 92px;\n  height: 92px;\n  border: 1px solid rgba(255, 189, 139, 0.6117647059);\n  border-radius: 50%;\n  box-shadow: 0 0 0 10px rgba(255, 190, 138, 0.0823529412);\n}\n.target-reticle[_ngcontent-%COMP%]::before, \n.target-reticle[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  background: #ffbf8a;\n}\n.target-reticle[_ngcontent-%COMP%]::before {\n  width: 1px;\n  top: -10px;\n  bottom: -10px;\n  left: 50%;\n}\n.target-reticle[_ngcontent-%COMP%]::after {\n  height: 1px;\n  left: -10px;\n  right: -10px;\n  top: 50%;\n}\n.portal.restored[_ngcontent-%COMP%]   .target-reticle[_ngcontent-%COMP%] {\n  border-color: #b0e9c6;\n}\n.portal-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 1.7rem;\n  right: 1.7rem;\n}\n.portal-caption[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #f1c598;\n}\n.portal-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 1.95rem/1.1 Georgia, serif;\n  margin-bottom: 0.8rem;\n}\n.portal-caption[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cbdae0;\n  font-size: 0.83rem;\n  max-width: 50ch;\n  margin: 0;\n}\n.mission-panel[_ngcontent-%COMP%] {\n  padding: 2rem 2.2rem;\n}\n.mission-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  max-width: 22ch;\n  font-size: 1.8rem;\n}\n.mission-panel[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  color: #abbfc9;\n  font-size: 0.84rem;\n  line-height: 1.75;\n}\n.mission-steps[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 1.5rem 0;\n}\n.mission-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.8rem;\n  align-items: center;\n  font-size: 0.75rem;\n  color: #adbdc7;\n  margin: 0.7rem 0;\n}\n.mission-steps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #e4cca7;\n  font: 0.65rem "Consolas", monospace;\n  border: 1px solid #665443;\n  padding: 0.3rem;\n  border-radius: 3px;\n}\n.mission-steps[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%] {\n  color: #b1ebcc;\n}\n.mission-steps[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b1ebcc;\n  border-color: #7eb99a;\n}\n.mission-panel[_ngcontent-%COMP%]   .mission-footnote[_ngcontent-%COMP%] {\n  font-size: 0.67rem;\n  color: #8ca6b2;\n  margin: 1rem 0 0;\n}\n.text-button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  text-decoration: underline;\n  margin-top: 0.6rem;\n  font-size: 0.76rem;\n}\n.ripple-note[_ngcontent-%COMP%] {\n  border-left: 2px solid #cfb993;\n  padding-left: 1rem;\n}\n.room-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  color: #90a6b5;\n  font: 0.58rem/1.6 "Consolas", monospace;\n  margin: 0.9rem 0 1.5rem;\n}\n.project-roadmap[_ngcontent-%COMP%] {\n  color: #95acb8;\n  font-size: 0.78rem;\n  border-top: 1px solid #2b414c;\n  padding-top: 1rem;\n}\n.project-roadmap[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 0.4rem 0;\n}\n.project-roadmap[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 2rem;\n  margin-top: 1.3rem;\n}\n.project-roadmap[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.project-roadmap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n}\n.ripple-workspace[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.ripple-intro[_ngcontent-%COMP%] {\n  font-size: 0.84rem;\n  color: #afc3cc;\n  max-width: 80ch;\n}\n.ripple-origin[_ngcontent-%COMP%] {\n  border: 1px solid #7fab92;\n  padding: 1rem;\n  background: #1f3a33;\n  border-radius: 6px;\n  margin: 1.5rem 0;\n}\n.ripple-origin[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font: 0.63rem "Consolas", monospace;\n  color: #acddc1;\n  margin-bottom: 0.5rem;\n}\n.ripple-origin[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  font-weight: 500;\n}\n.ripple-chain[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.ripple-card[_ngcontent-%COMP%] {\n  border: 1px solid #3e615b;\n  border-radius: 6px;\n  padding: 1.2rem;\n  background: #112b2c;\n  animation: _ngcontent-%COMP%_reconnect 0.8s both;\n}\n.ripple-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin-bottom: 0;\n}\n.ripple-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.64rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.before[_ngcontent-%COMP%] {\n  color: #d2a58f;\n  border-bottom: 1px dashed #705d4f;\n  padding-bottom: 1rem;\n}\n.after[_ngcontent-%COMP%] {\n  color: #b4e9cf;\n}\n.ripple-arrow[_ngcontent-%COMP%] {\n  display: block;\n  color: #8bd1b4;\n  margin: 0.7rem 0;\n}\n.verification-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1.4fr;\n  gap: 2rem;\n  margin-top: 2rem;\n  padding-top: 2rem;\n  border-top: 1px solid #3d545c;\n}\n.verification-form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #aec3cd;\n}\n.verification-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.verified-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n  background: #1d3931;\n  border: 1px solid #5d927d;\n  margin-top: 2rem;\n  padding: 1.5rem;\n  border-radius: 6px;\n}\n.verified-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 0.86rem;\n}\n.verified-banner[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #b1cabb;\n}\n.verified-banner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.report-dialog[_ngcontent-%COMP%] {\n  width: min(820px, 100% - 2rem);\n  max-height: calc(100vh - 3rem);\n  padding: 2rem;\n  color: #e6edf2;\n  background: #122630;\n  border: 1px solid #6a9089;\n  border-radius: 10px;\n}\n.report-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(2, 13, 22, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.report-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.report-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.report-mission[_ngcontent-%COMP%] {\n  border-top: 1px solid #496069;\n  padding: 1.5rem 0;\n}\n.report-mission[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #c1d1d9;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.report-mission[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #b5dbcc;\n  font-size: 0.8rem;\n  margin-bottom: 0.5rem;\n}\n.report-mission[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  padding: 0.8rem 0;\n}\n.report-mission[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 0.8rem;\n}\n@keyframes _ngcontent-%COMP%_reconnect {\n  from {\n    opacity: 0.2;\n    transform: translateY(8px);\n    border-color: #cd9f77;\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n    border-color: #6ca28b;\n  }\n}\n@media (min-width: 1450px) {\n  .mission-overview[_ngcontent-%COMP%] {\n    min-height: 450px;\n  }\n  .portal[_ngcontent-%COMP%] {\n    min-height: 450px;\n  }\n}\n@media (max-width: 1000px) {\n  .mission-overview[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .mission-panel[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .room-heading[_ngcontent-%COMP%] {\n    align-items: start;\n  }\n  .stability-ring[_ngcontent-%COMP%] {\n    width: 62px;\n    height: 62px;\n  }\n  .stability-meter[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 0.55rem;\n  }\n}\n@media (max-width: 760px) {\n  main[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n  .agency-header[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n  .agency-brand[_ngcontent-%COMP%] {\n    font-size: 0.58rem;\n  }\n  .agency-brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n   .pilot-label[_ngcontent-%COMP%], \n   .back-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .workspace-phase[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .log-button[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .room-heading[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .stability-meter[_ngcontent-%COMP%] {\n    margin-top: 1.5rem;\n  }\n  .mission-overview[_ngcontent-%COMP%], \n   .verification-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .portal[_ngcontent-%COMP%] {\n    min-height: 320px;\n    border-right: 0;\n  }\n  .ripple-chain[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .ripple-workspace[_ngcontent-%COMP%] {\n    padding: 1.2rem;\n  }\n  .verified-banner[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .project-roadmap[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .legend[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=time-repair-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeRepairPageComponent, [{
    type: Component,
    args: [{ selector: "app-time-repair-page", imports: [TimeRepairWeekWorkspaceComponent, WorkspaceToolsComponent, FormsModule, RouterLink, TimeRepairInvestigationComponent, TimeRepairSceneComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `@if (weeklyPreview) {
  <app-time-repair-week-workspace />
} @else {
<div class="time-room">
  <app-workspace-tools><header class="agency-header">\r
    <a routerLink="/projects" class="back-link" aria-label="Back to projects"\r
      >\u2190 <span>Projects</span></a\r
    >\r
    <div class="agency-brand">\r
      <span class="agency-mark" aria-hidden="true">\u2301</span\r
      ><span>TIME REPAIR AGENCY<small>Department of temporal integrity</small></span>\r
    </div>\r
    <span class="pilot-label">LOCAL PILOT \xB7 01</span>\r
    <button class="log-button" (click)="showReport()">\r
      Repair log <span>{{ verifiedCount() }}/{{ config.missions.length }}</span>\r
    </button>\r
  </header></app-workspace-tools>\r
\r
  <main>\r
\r
\r
    <section class="timeline" aria-label="Interactive timeline">\r
      <div class="timeline-heading">\r
        <span class="eyebrow">Temporal scan / select a moment</span>\r
        <div class="legend"><span>\u25CF Stable</span><span>\u25C7 Ripple</span><span>\u25C9 Anomaly</span></div>\r
      </div>\r
      <div class="timeline-scroll">\r
        <div class="timeline-track">\r
          <div class="timeline-line" aria-hidden="true"></div>\r
          @for (node of nodes; track node.id) {\r
            <button\r
              class="timeline-node"\r
              [class.selected]="selectedNodeId() === node.id"\r
              [attr.data-status]="status(node.id)"\r
              [attr.aria-pressed]="selectedNodeId() === node.id"\r
              [attr.aria-label]="node.dateLabel + ': ' + node.title + ', ' + status(node.id)"\r
              (click)="selectNode(node.id)"\r
            >\r
              <span class="node-date">{{ node.dateLabel }}</span\r
              ><span class="node-orb" aria-hidden="true">{{\r
                status(node.id) === 'anomaly'\r
                  ? '!'\r
                  : status(node.id) === 'ripple'\r
                    ? '\u25C7'\r
                    : status(node.id) === 'missing'\r
                      ? '?'\r
                      : '\u2022'\r
              }}</span\r
              ><strong>{{ node.title }}</strong\r
              ><small>{{ status(node.id) }}</small>\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="workspace-bar">\r
      <div class="spaces" aria-label="Mission spaces">\r
        <button\r
          [class.active]="space() === 'control'"\r
          [attr.aria-pressed]="space() === 'control'"\r
          (click)="openSpace('control')"\r
        >\r
          Control room</button\r
        ><button\r
          [class.active]="space() === 'archive'"\r
          [attr.aria-pressed]="space() === 'archive'"\r
          (click)="openSpace('archive')"\r
        >\r
          Evidence archive <small>{{ runtime.state().collectedIds.length }}</small></button\r
        ><button\r
          [class.active]="space() === 'scene'"\r
          [attr.aria-pressed]="space() === 'scene'"\r
          [disabled]="!progress().authorized || progress().repaired"\r
          (click)="jump()"\r
        >\r
          {{ progress().authorized ? 'Time jump \u2197' : 'Time jump \xB7 locked' }}\r
        </button>\r
      </div>\r
      <span class="workspace-phase">01 / DETECT THE BREACH</span>\r
    </div>\r
    <p\r
      class="runtime-message"\r
      role="status"\r
      aria-live="polite"\r
      [class.has-message]="runtime.message()"\r
    >\r
      {{ runtime.message() }}\r
    </p>\r
    <section #workspace tabindex="-1" class="workspace" aria-label="Selected timeline workspace">\r
      @if (space() === 'control') {\r
        <div class="mission-overview">\r
          <div\r
            class="portal"\r
            [class.restored]="progress().repaired"\r
            [class.record-portal]="!selectedMission()"\r
          >\r
            @if (selectedMission()) {\r
              <img [src]="scene().image" [alt]="scene().imageAlt" />\r
            } @else {\r
              <span class="record-date" aria-hidden="true">{{ selectedNode().dateLabel }}</span>\r
            }\r
            <div class="portal-shade"></div>\r
            <div class="portal-coordinates">\r
              <span>ARCHIVE WINDOW</span><span>{{ selectedNode().dateLabel }}</span>\r
            </div>\r
            @if (selectedMission()) {\r
              <div class="target-reticle" aria-hidden="true"><span></span></div>\r
            }\r
            <div class="portal-caption">\r
              <span class="eyebrow">{{\r
                selectedMission()\r
                  ? 'Priority signal / investigation required'\r
                  : 'Timeline record / ' + status(selectedNodeId())\r
              }}</span>\r
              <h2>{{ selectedNode().title }}</h2>\r
              <p>\r
                {{\r
                  selectedMission() && !progress().repaired\r
                    ? mission().signal\r
                    : selectedNode().summary\r
                }}\r
              </p>\r
            </div>\r
          </div>\r
          <aside class="mission-panel">\r
            @if (selectedMission()) {\r
              <span class="eyebrow" [class.success]="progress().repaired">{{\r
                progress().verification\r
                  ? 'Timeline restored'\r
                  : progress().repaired\r
                    ? 'Repair applied / ripple pending'\r
                    : 'Anomaly detected / ' + selectedNode().dateLabel\r
              }}</span>\r
              <h2>\r
                {{\r
                  progress().verification\r
                    ? 'You restored the sequence.'\r
                    : progress().repaired\r
                      ? 'A change is only the beginning.'\r
                      : 'What does the evidence say?'\r
                }}\r
              </h2>\r
              <p>{{ progress().repaired ? mission().canonicalSummary : config.briefing }}</p>\r
              <ol class="mission-steps">\r
                <li [class.done]="progress().links.length >= mission().evidenceRequired.length">\r
                  <span>01</span>Connect evidence to the anomaly\r
                </li>\r
                <li [class.done]="progress().authorized">\r
                  <span>02</span>Defend your claim to unlock a jump\r
                </li>\r
                <li [class.done]="progress().repaired">\r
                  <span>03</span>Repair the moment & follow its ripple\r
                </li>\r
              </ol>\r
              @if (progress().verification) {\r
                <button class="primary" (click)="showReport()">\r
                  Open restored timeline case file \u2192</button\r
                ><button class="text-button" (click)="openSpace('ripple')">\r
                  Replay the ripple\r
                </button>\r
              } @else if (progress().repaired) {\r
                <button class="primary" (click)="openSpace('ripple')">\r
                  Follow the ripple & verify \u2192\r
                </button>\r
              } @else if (progress().authorized) {\r
                <button class="primary" (click)="jump()">Time jump available \u2192</button>\r
              } @else {\r
                <button class="primary" (click)="openSpace('archive')">\r
                  Investigate the anomaly \u2192\r
                </button>\r
              }\r
              <p class="mission-footnote">\r
                Evidence unlocks time travel. Understanding repairs the timeline.\r
              </p>\r
            } @else {\r
              <span class="eyebrow">{{ status(selectedNodeId()) }} / archive record</span>\r
              <h2>{{ selectedNode().title }}</h2>\r
              <p>{{ selectedNode().summary }}</p>\r
              @if (status(selectedNodeId()) === 'ripple') {\r
                <p class="ripple-note">\r
                  This branch is affected by an earlier anomaly. Investigate the source of the\r
                  change before intervening downstream.\r
                </p>\r
                <button class="primary" (click)="selectNode(mission().nodeId)">\r
                  Trace the originating anomaly \u2192\r
                </button>\r
              } @else {\r
                <p class="muted">\r
                  This pilot does not call for a repair here. A stable moment helps establish the\r
                  baseline.\r
                </p>\r
                <button (click)="selectNode(config.missions[0].nodeId)">\r
                  Return to the repair mission \u2192\r
                </button>\r
              }\r
            }\r
          </aside>\r
        </div>\r
      }\r
      @for (currentMission of [mission()]; track currentMission.id) {\r
        <section [hidden]="space() !== 'archive'" aria-label="Evidence investigation">\r
          <app-time-repair-investigation [mission]="currentMission" (jumpRequested)="jump()" />\r
        </section>\r
      }\r
      @if (space() === 'scene') {\r
        <app-time-repair-scene [mission]="mission()" (rippleRequested)="openSpace('ripple')" />\r
      }\r
      @if (space() === 'ripple' && progress().repaired) {\r
        <div class="ripple-workspace">\r
          <span class="eyebrow success">Ripple check / cause \u2192 consequence</span>\r
          <h2>One repair. A sequence reconnected.</h2>\r
          <p class="ripple-intro">\r
            These branches model how the damaged record could distort our interpretation. They are\r
            not predictions of an alternate history.\r
          </p>\r
          <div class="ripple-origin">\r
            <span>REPAIRED MOMENT</span><strong>{{ mission().canonicalSummary }}</strong>\r
          </div>\r
          <div class="ripple-chain">\r
            @for (ripple of mission().ripples; track ripple.nodeId; let i = $index) {\r
              <article class="ripple-card" [style.animation-delay.ms]="i * 180">\r
                <span class="eyebrow">0{{ i + 1 }} / {{ nodeTitle(ripple.nodeId) }}</span>\r
                <div class="before">\r
                  <small>Corrupted branch</small>\r
                  <p>{{ ripple.before }}</p>\r
                </div>\r
                <span class="ripple-arrow" aria-hidden="true">\u2193</span>\r
                <div class="after">\r
                  <small>Restored sequence</small>\r
                  <p>{{ ripple.after }}</p>\r
                </div>\r
              </article>\r
            }\r
          </div>\r
          @if (!progress().verification) {\r
            <form class="verification-form" (ngSubmit)="verify()">\r
              <div>\r
                <h3>Verify the ripple.</h3>\r
                <p>{{ mission().verificationPrompt }}</p>\r
                <label\r
                  >Source to cite<select\r
                    name="verificationSource"\r
                    [(ngModel)]="verificationEvidenceId"\r
                    required\r
                  >\r
                    <option value="" disabled>Select a connected source</option>\r
                    @for (link of progress().links; track link.evidenceId) {\r
                      <option [value]="link.evidenceId">{{ sourceTitle(link.evidenceId) }}</option>\r
                    }\r
                  </select></label\r
                >\r
              </div>\r
              <div>\r
                <label\r
                  >Your explanation<textarea\r
                    name="verificationExplanation"\r
                    [(ngModel)]="verificationExplanation"\r
                    rows="5"\r
                    maxlength="4000"\r
                    [minlength]="config.settings.minReasoningLength"\r
                    required\r
                    placeholder="Before \u2192 repair \u2192 later interpretation. What does the source support, and what remains uncertain?"\r
                  ></textarea></label\r
                ><button class="primary" type="submit">Record verification \u2192</button>\r
              </div>\r
            </form>\r
          } @else {\r
            <div class="verified-banner">\r
              <div>\r
                <span class="eyebrow success">Verification recorded</span>\r
                <p>{{ progress().verification?.explanation }}</p>\r
                <small>Source: {{ sourceTitle(progress().verification!.evidenceId) }}</small>\r
              </div>\r
              <button class="primary" (click)="showReport()">View your case file \u2192</button>\r
            </div>\r
          }\r
        </div>\r
      }\r
    </section>\r
    <footer class="room-footer">\r
      <span>{{ runtime.storageNotice() }}</span\r
      ><span>One playable repair \xB7 local exercise \xB7 no official grade</span>\r
    </footer>\r
    <details class="project-roadmap">\r
      <summary>Where this fits in the three-week mission</summary>\r
      <div>\r
        @for (stage of config.stages; track stage.title; let i = $index) {\r
          <article>\r
            <span class="eyebrow"\r
              >Week 0{{ i + 1 }} {{ i > 0 ? '/ content roadmap' : '/ pilot' }}</span\r
            >\r
            <h3>{{ stage.title }}</h3>\r
            <p>{{ stage.description }}</p>\r
          </article>\r
        }\r
      </div>\r
    </details>\r
  </main>\r
</div>\r
<dialog #report aria-labelledby="repair-log-title" class="report-dialog">\r
  <div class="report-header">\r
    <div>\r
      <span class="eyebrow">Timeline repair agency / local case file</span>\r
      <h2 id="repair-log-title">\r
        {{ runtime.completed() ? 'Restored Timeline Case File' : 'Investigation & Repair Log' }}\r
      </h2>\r
    </div>\r
    <button autofocus (click)="closeReport()" aria-label="Close repair log">\u2715</button>\r
  </div>\r
  <p class="muted">\r
    {{ verifiedCount() }} of {{ config.missions.length }} repairs verified \xB7\r
    {{ runtime.stability() }}% stability \xB7 {{ runtime.charges() }} charges left. Written reasoning\r
    is recorded for review, not automatically graded.\r
  </p>\r
  @for (m of config.missions; track m.id) {\r
    @let p = runtime.state().missions[m.id];\r
    <article class="report-mission">\r
      <h3>{{ nodeTitle(m.nodeId) }}</h3>\r
      <p>{{ m.signal }}</p>\r
      <h4>Evidence connections</h4>\r
      @for (link of p.links; track link.evidenceId) {\r
        <p>\r
          <strong>{{ sourceTitle(link.evidenceId) }} \xB7 {{ link.relationship }}</strong\r
          ><br />{{ link.note }}\r
        </p>\r
      } @empty {\r
        <p>No evidence connected.</p>\r
      }\r
      @for (defense of p.defenses; track $index) {\r
        <details>\r
          <summary>\r
            Defense {{ $index + 1 }} \xB7\r
            {{ defense.accepted ? 'checkpoint passed' : 'revision requested' }}\r
          </summary>\r
          <p><strong>Claim:</strong> {{ defense.claim }}</p>\r
          <p><strong>Consequence:</strong> {{ defense.consequence }}</p>\r
          <p><strong>Source defense:</strong> {{ defense.explanation }}</p>\r
        </details>\r
      }\r
      <h4>Repair attempts</h4>\r
      @for (attempt of p.attempts; track $index) {\r
        <p>\r
          {{ $index + 1 }} \xB7 {{ attempt.optionId }} \xB7\r
          {{ attempt.correct ? 'applied' : 'destabilized the timeline' }}\r
        </p>\r
      } @empty {\r
        <p>No interventions yet.</p>\r
      }\r
      @if (p.verification) {\r
        <h4>Verification</h4>\r
        <p>{{ p.verification.explanation }}</p>\r
        <p class="muted">{{ sourceTitle(p.verification.evidenceId) }}</p>\r
      }\r
    </article>\r
  }\r
  <button class="primary" (click)="exportReport()">Export case file \xB7 JSON</button>
</dialog>
}
`, styles: ['/* src/app/templates/time-repair/ui/time-repair-page.component.scss */\n:host {\n  display: block;\n  color: #e7edf2;\n  font-family: "Segoe UI", sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nh2,\nh3,\np {\n  margin-top: 0;\n}\nh2 {\n  font-size: 1.65rem;\n  font-weight: 600;\n  letter-spacing: -0.04em;\n}\nh3 {\n  font-size: 1.3rem;\n  line-height: 1.3;\n  font-weight: 600;\n}\np {\n  line-height: 1.65;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton,\na {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  min-height: 44px;\n  border: 1px solid #344652;\n  border-radius: 6px;\n  background: #142733;\n  color: #e7edf2;\n  padding: 0.65rem 1rem;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\nbutton:hover:not(:disabled) {\n  background: #203b48;\n  border-color: #70b2ae;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.primary {\n  background: #a9ecce;\n  color: #102c2a;\n  border-color: #a9ecce;\n  font-weight: 650;\n}\n.primary:hover:not(:disabled) {\n  background: #cefbe6;\n  color: #102c2a;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\n[tabindex="-1"]:focus-visible {\n  outline: 3px solid #c9ffdf;\n  outline-offset: 4px;\n}\na {\n  color: #a9ecce;\n}\n.eyebrow {\n  display: block;\n  font: 600 0.65rem/1.6 "Consolas", monospace;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: #9db8c5;\n  margin-bottom: 0.6rem;\n}\n.muted {\n  color: #9eafbc;\n  font-size: 0.79rem;\n  line-height: 1.6;\n}\n.success {\n  color: #a9ecce;\n}\nlabel {\n  display: grid;\n  gap: 0.4rem;\n  font-size: 0.82rem;\n  color: #bfd0dc;\n}\ntextarea,\nselect {\n  width: 100%;\n  background: #091924;\n  border: 1px solid #415361;\n  color: #edf5fa;\n  border-radius: 5px;\n  padding: 0.7rem;\n  line-height: 1.5;\n}\ntextarea {\n  resize: vertical;\n  min-height: 70px;\n}\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  font-size: 0.87rem;\n  margin-bottom: 0.65rem;\n  color: #e0eaf0;\n  line-height: 1.5;\n}\n.radio {\n  display: flex;\n  align-items: start;\n  gap: 0.7rem;\n  border: 1px solid #344653;\n  padding: 0.65rem;\n  margin-bottom: 0.4rem;\n  border-radius: 5px;\n  line-height: 1.5;\n  cursor: pointer;\n}\ninput[type=radio] {\n  margin-top: 0.3rem;\n  accent-color: #9ee8c5;\n}\n.actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.form-pair {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n@media (max-width: 650px) {\n  .form-pair {\n    grid-template-columns: 1fr;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n.stability-meter .stability-ring > strong {\n  font: 1.5rem "Consolas", monospace;\n  color: #e8f5ed;\n}\n.record-portal {\n  background:\n    radial-gradient(\n      ellipse at center,\n      rgba(45, 98, 96, 0.6666666667),\n      transparent 65%),\n    repeating-radial-gradient(\n      ellipse at center,\n      transparent 0 40px,\n      rgba(126, 182, 171, 0.1450980392) 41px 42px);\n}\n.record-date {\n  position: absolute;\n  inset: 25% 0 auto;\n  text-align: center;\n  font: 3rem Georgia, serif;\n  color: #b2d0c3;\n}\n.time-room {\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      ellipse at 65% 0%,\n      rgba(23, 53, 66, 0.3333333333),\n      transparent 48%),\n    #081722;\n}\n.agency-header {\n  min-height: 70px;\n  display: flex;\n  align-items: center;\n  gap: 1.8rem;\n  padding: 0.8rem 3%;\n  border-bottom: 1px solid #2a3c47;\n  background: rgba(11, 26, 36, 0.9098039216);\n}\n.back-link {\n  display: flex;\n  gap: 0.6rem;\n  align-items: center;\n  text-decoration: none;\n  color: #a2b5c1;\n  font-size: 0.8rem;\n  padding: 0.5rem 0;\n}\n.agency-brand {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  font: 600 0.68rem/1.4 "Consolas", monospace;\n  letter-spacing: 0.16em;\n}\n.agency-brand small {\n  display: block;\n  font-size: 0.55rem;\n  color: #8098a8;\n  letter-spacing: 0.08em;\n  margin-top: 0.2rem;\n}\n.agency-mark {\n  font: 2.5rem/1 Georgia, serif;\n  color: #ade7d0;\n}\n.pilot-label {\n  margin-left: auto;\n  font: 0.65rem "Consolas", monospace;\n  color: #a7c3c5;\n  letter-spacing: 0.1em;\n}\n.log-button {\n  font-size: 0.75rem;\n  background: transparent;\n}\n.log-button span {\n  color: #abcdbd;\n  margin-left: 0.5rem;\n}\nmain {\n  max-width: 1560px;\n  padding: 2.5rem 3% 2rem;\n  margin: auto;\n}\n.room-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\nh1 {\n  font-weight: 550;\n  letter-spacing: -0.05em;\n  font-size: clamp(1.7rem, 3vw, 2.7rem);\n  margin: 0.4rem 0 0.6rem;\n}\n.room-heading p {\n  font-size: 0.84rem;\n  color: #a0b2bf;\n  margin: 0;\n}\n.live-dot {\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  margin-left: 1rem;\n  vertical-align: middle;\n  border-radius: 50%;\n  background: #afd9c7;\n  box-shadow: 0 0 15px rgba(175, 243, 207, 0.4);\n}\n.stability-meter {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-shrink: 0;\n}\n.stability-ring {\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  background: conic-gradient(#a9e5c9 var(--stability), #243743 0);\n  display: grid;\n  place-items: center;\n  position: relative;\n}\n.stability-ring::before {\n  content: "";\n  position: absolute;\n  inset: 4px;\n  border-radius: 50%;\n  background: #10212c;\n}\n.stability-ring strong {\n  position: relative;\n  font: 1.5rem "Consolas", monospace;\n}\n.stability-ring small {\n  display: inline;\n  font-size: 0.7rem;\n}\n.stability-meter .eyebrow {\n  margin-bottom: 0.25rem;\n}\n.stability-meter > div > strong {\n  font-size: 0.82rem;\n  font-weight: 500;\n  color: #efd0a5;\n}\n.stability-meter > div > small {\n  display: block;\n  font-size: 0.69rem;\n  color: #94aab7;\n  margin-top: 0.35rem;\n}\n.timeline {\n  border: 1px solid #31404d;\n  border-radius: 9px;\n  padding: 1.1rem 1.4rem 0.8rem;\n  background-image:\n    linear-gradient(rgba(83, 108, 118, 0.1254901961) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(83, 108, 118, 0.1254901961) 1px,\n      transparent 1px);\n  background-size: 32px 32px;\n  background-color: rgba(14, 32, 44, 0.9098039216);\n}\n.timeline-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n}\n.legend {\n  display: flex;\n  gap: 1rem;\n  color: #98bbaa;\n  font: 0.61rem "Consolas", monospace;\n}\n.legend span:nth-child(2) {\n  color: #e8caa0;\n}\n.legend span:nth-child(3) {\n  color: #f4a18d;\n}\n.timeline-scroll {\n  overflow-x: auto;\n  padding: 0.5rem 0;\n}\n.timeline-track {\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: 1fr;\n  position: relative;\n  min-width: 750px;\n  isolation: isolate;\n}\n.timeline-line {\n  position: absolute;\n  left: 7%;\n  right: 7%;\n  top: 62px;\n  height: 1px;\n  z-index: -1;\n  background:\n    linear-gradient(\n      90deg,\n      #78948a,\n      #e79572 22%,\n      #d4b786 65%,\n      #67897f);\n  box-shadow: 0 0 7px rgba(167, 206, 172, 0.2666666667);\n}\n.timeline-node {\n  border: 1px solid transparent;\n  background: transparent;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 0.7rem 0.4rem;\n  text-align: center;\n  min-width: 0;\n}\n.timeline-node:hover:not(:disabled) {\n  background: rgba(29, 54, 65, 0.4196078431);\n  border-color: #486371;\n}\n.timeline-node.selected {\n  background: rgba(41, 64, 75, 0.5333333333);\n  border-color: #6f8891;\n}\n.node-date {\n  font: 0.7rem/1.4 "Consolas", monospace;\n  color: #bfd1d8;\n  margin-bottom: 0.8rem;\n}\n.node-orb {\n  width: 40px;\n  height: 40px;\n  border: 1px solid #6b9f8b;\n  border-radius: 50%;\n  background: #13372e;\n  color: #a9e9c8;\n  display: grid;\n  place-items: center;\n  font: 1.2rem "Consolas", monospace;\n  margin-bottom: 1rem;\n}\n.timeline-node strong {\n  font-size: 0.71rem;\n  line-height: 1.4;\n  font-weight: 500;\n  max-width: 125px;\n  min-height: 2.8em;\n}\n.timeline-node small {\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: #9db6bb;\n  font-size: 0.53rem;\n  margin-top: 0.5rem;\n}\n.timeline-node[data-status=anomaly] .node-orb {\n  border-color: #e59174;\n  color: #ffba96;\n  background: #492e29;\n  box-shadow: 0 0 0 5px rgba(239, 173, 118, 0.0705882353), 0 0 28px rgba(244, 178, 124, 0.1098039216);\n}\n.timeline-node[data-status=ripple] .node-orb {\n  border-style: dashed;\n  color: #ecd39b;\n  border-color: #bda477;\n  background: #34342c;\n}\n.timeline-node[data-status=restored] .node-orb {\n  box-shadow: 0 0 20px rgba(120, 235, 177, 0.2392156863);\n}\n.timeline-node[data-status=missing] .node-orb {\n  border-color: #7f8a93;\n  background: #15202a;\n  color: #b7c3cd;\n}\n.workspace-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin: 1.6rem 0 0.85rem;\n}\n.spaces {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.spaces button {\n  font-size: 0.74rem;\n  border-color: transparent;\n  background: transparent;\n  color: #9eb2bf;\n  padding: 0.65rem 0.8rem;\n}\n.spaces button.active {\n  border-color: #526b73;\n  background: #18343d;\n  color: #d6ece7;\n}\n.spaces small {\n  border-radius: 3px;\n  padding: 0.15rem 0.35rem;\n  background: #29444c;\n  color: #cfddd7;\n  margin-left: 0.3rem;\n}\n.workspace-phase {\n  color: #7895a5;\n  font: 0.59rem "Consolas", monospace;\n  letter-spacing: 0.1em;\n}\n.runtime-message {\n  display: none;\n}\n.runtime-message.has-message {\n  display: block;\n  padding: 0.85rem 1rem;\n  margin: 0 0 0.8rem;\n  border: 1px solid #5d776e;\n  background: #203c36;\n  border-radius: 6px;\n  font-size: 0.83rem;\n  color: #daf3e6;\n}\n.workspace {\n  border: 1px solid #314854;\n  border-radius: 9px;\n  overflow: hidden;\n  background: #10232f;\n}\n.workspace:focus {\n  outline-offset: 3px;\n}\n.mission-overview {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  min-height: 420px;\n}\n.portal {\n  position: relative;\n  min-height: 410px;\n  overflow: hidden;\n  isolation: isolate;\n  border-right: 1px solid #38505b;\n}\n.portal img {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: saturate(0.6) brightness(0.65);\n}\n.portal.restored img {\n  filter: saturate(0.85) brightness(0.85);\n}\n.portal-shade {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      0deg,\n      #0a1c28 0%,\n      rgba(11, 32, 48, 0.5725490196) 30%,\n      transparent 80%),\n    linear-gradient(\n      90deg,\n      rgba(18, 46, 50, 0.2666666667),\n      transparent);\n}\n.portal-coordinates {\n  position: absolute;\n  inset: 1.3rem 1.5rem auto;\n  display: flex;\n  justify-content: space-between;\n  font: 0.59rem "Consolas", monospace;\n  letter-spacing: 0.2em;\n  color: #d1e1d9;\n}\n.target-reticle {\n  position: absolute;\n  left: 68%;\n  top: 38%;\n  width: 92px;\n  height: 92px;\n  border: 1px solid rgba(255, 189, 139, 0.6117647059);\n  border-radius: 50%;\n  box-shadow: 0 0 0 10px rgba(255, 190, 138, 0.0823529412);\n}\n.target-reticle::before,\n.target-reticle::after {\n  content: "";\n  position: absolute;\n  background: #ffbf8a;\n}\n.target-reticle::before {\n  width: 1px;\n  top: -10px;\n  bottom: -10px;\n  left: 50%;\n}\n.target-reticle::after {\n  height: 1px;\n  left: -10px;\n  right: -10px;\n  top: 50%;\n}\n.portal.restored .target-reticle {\n  border-color: #b0e9c6;\n}\n.portal-caption {\n  position: absolute;\n  bottom: 1.5rem;\n  left: 1.7rem;\n  right: 1.7rem;\n}\n.portal-caption .eyebrow {\n  color: #f1c598;\n}\n.portal-caption h2 {\n  font: 1.95rem/1.1 Georgia, serif;\n  margin-bottom: 0.8rem;\n}\n.portal-caption p {\n  color: #cbdae0;\n  font-size: 0.83rem;\n  max-width: 50ch;\n  margin: 0;\n}\n.mission-panel {\n  padding: 2rem 2.2rem;\n}\n.mission-panel h2 {\n  max-width: 22ch;\n  font-size: 1.8rem;\n}\n.mission-panel > p {\n  color: #abbfc9;\n  font-size: 0.84rem;\n  line-height: 1.75;\n}\n.mission-steps {\n  list-style: none;\n  padding: 0;\n  margin: 1.5rem 0;\n}\n.mission-steps li {\n  display: flex;\n  gap: 0.8rem;\n  align-items: center;\n  font-size: 0.75rem;\n  color: #adbdc7;\n  margin: 0.7rem 0;\n}\n.mission-steps span {\n  color: #e4cca7;\n  font: 0.65rem "Consolas", monospace;\n  border: 1px solid #665443;\n  padding: 0.3rem;\n  border-radius: 3px;\n}\n.mission-steps li.done {\n  color: #b1ebcc;\n}\n.mission-steps li.done span {\n  color: #b1ebcc;\n  border-color: #7eb99a;\n}\n.mission-panel .mission-footnote {\n  font-size: 0.67rem;\n  color: #8ca6b2;\n  margin: 1rem 0 0;\n}\n.text-button {\n  background: transparent;\n  border: 0;\n  text-decoration: underline;\n  margin-top: 0.6rem;\n  font-size: 0.76rem;\n}\n.ripple-note {\n  border-left: 2px solid #cfb993;\n  padding-left: 1rem;\n}\n.room-footer {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  color: #90a6b5;\n  font: 0.58rem/1.6 "Consolas", monospace;\n  margin: 0.9rem 0 1.5rem;\n}\n.project-roadmap {\n  color: #95acb8;\n  font-size: 0.78rem;\n  border-top: 1px solid #2b414c;\n  padding-top: 1rem;\n}\n.project-roadmap summary {\n  cursor: pointer;\n  padding: 0.4rem 0;\n}\n.project-roadmap > div {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 2rem;\n  margin-top: 1.3rem;\n}\n.project-roadmap h3 {\n  font-size: 1rem;\n}\n.project-roadmap p {\n  font-size: 0.78rem;\n}\n.ripple-workspace {\n  padding: 2rem;\n}\n.ripple-intro {\n  font-size: 0.84rem;\n  color: #afc3cc;\n  max-width: 80ch;\n}\n.ripple-origin {\n  border: 1px solid #7fab92;\n  padding: 1rem;\n  background: #1f3a33;\n  border-radius: 6px;\n  margin: 1.5rem 0;\n}\n.ripple-origin span {\n  display: block;\n  font: 0.63rem "Consolas", monospace;\n  color: #acddc1;\n  margin-bottom: 0.5rem;\n}\n.ripple-origin strong {\n  font-size: 0.86rem;\n  font-weight: 500;\n}\n.ripple-chain {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.ripple-card {\n  border: 1px solid #3e615b;\n  border-radius: 6px;\n  padding: 1.2rem;\n  background: #112b2c;\n  animation: reconnect 0.8s both;\n}\n.ripple-card p {\n  font-size: 0.8rem;\n  margin-bottom: 0;\n}\n.ripple-card small {\n  font-size: 0.64rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.before {\n  color: #d2a58f;\n  border-bottom: 1px dashed #705d4f;\n  padding-bottom: 1rem;\n}\n.after {\n  color: #b4e9cf;\n}\n.ripple-arrow {\n  display: block;\n  color: #8bd1b4;\n  margin: 0.7rem 0;\n}\n.verification-form {\n  display: grid;\n  grid-template-columns: 1fr 1.4fr;\n  gap: 2rem;\n  margin-top: 2rem;\n  padding-top: 2rem;\n  border-top: 1px solid #3d545c;\n}\n.verification-form p {\n  font-size: 0.82rem;\n  color: #aec3cd;\n}\n.verification-form button {\n  margin-top: 1rem;\n}\n.verified-banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n  background: #1d3931;\n  border: 1px solid #5d927d;\n  margin-top: 2rem;\n  padding: 1.5rem;\n  border-radius: 6px;\n}\n.verified-banner p {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font-size: 0.86rem;\n}\n.verified-banner small {\n  font-size: 0.7rem;\n  color: #b1cabb;\n}\n.verified-banner button {\n  flex-shrink: 0;\n}\n.report-dialog {\n  width: min(820px, 100% - 2rem);\n  max-height: calc(100vh - 3rem);\n  padding: 2rem;\n  color: #e6edf2;\n  background: #122630;\n  border: 1px solid #6a9089;\n  border-radius: 10px;\n}\n.report-dialog::backdrop {\n  background: rgba(2, 13, 22, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.report-header {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.report-header h2 {\n  font-size: 1.5rem;\n}\n.report-mission {\n  border-top: 1px solid #496069;\n  padding: 1.5rem 0;\n}\n.report-mission p {\n  font-size: 0.85rem;\n  color: #c1d1d9;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.report-mission h4 {\n  color: #b5dbcc;\n  font-size: 0.8rem;\n  margin-bottom: 0.5rem;\n}\n.report-mission details {\n  padding: 0.8rem 0;\n}\n.report-mission summary {\n  cursor: pointer;\n  font-size: 0.8rem;\n}\n@keyframes reconnect {\n  from {\n    opacity: 0.2;\n    transform: translateY(8px);\n    border-color: #cd9f77;\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n    border-color: #6ca28b;\n  }\n}\n@media (min-width: 1450px) {\n  .mission-overview {\n    min-height: 450px;\n  }\n  .portal {\n    min-height: 450px;\n  }\n}\n@media (max-width: 1000px) {\n  .mission-overview {\n    grid-template-columns: 1fr 1fr;\n  }\n  .mission-panel {\n    padding: 1.5rem;\n  }\n  .room-heading {\n    align-items: start;\n  }\n  .stability-ring {\n    width: 62px;\n    height: 62px;\n  }\n  .stability-meter .eyebrow {\n    font-size: 0.55rem;\n  }\n}\n@media (max-width: 760px) {\n  main {\n    padding: 1.5rem 1rem;\n  }\n  .agency-header {\n    gap: 1rem;\n  }\n  .agency-brand {\n    font-size: 0.58rem;\n  }\n  .agency-brand small,\n  .pilot-label,\n  .back-link span,\n  .workspace-phase {\n    display: none;\n  }\n  .log-button {\n    margin-left: auto;\n  }\n  .room-heading {\n    display: block;\n  }\n  .stability-meter {\n    margin-top: 1.5rem;\n  }\n  .mission-overview,\n  .verification-form {\n    grid-template-columns: 1fr;\n  }\n  .portal {\n    min-height: 320px;\n    border-right: 0;\n  }\n  .ripple-chain {\n    grid-template-columns: 1fr;\n  }\n  .ripple-workspace {\n    padding: 1.2rem;\n  }\n  .verified-banner {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .project-roadmap > div {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .legend {\n    display: none;\n  }\n}\n/*# sourceMappingURL=time-repair-page.component.css.map */\n'] }]
  }], () => [], { workspace: [{ type: ViewChild, args: ["workspace", { isSignal: true }] }], report: [{ type: ViewChild, args: ["report", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TimeRepairPageComponent, { className: "TimeRepairPageComponent", filePath: "src/app/templates/time-repair/ui/time-repair-page.component.ts", lineNumber: 30 });
})();
export {
  TimeRepairPageComponent
};
//# debugId=13db13a2-4c8d-5746-ae90-f20aa8f0a49a
//# sourceMappingURL=chunk-2EP3J7B2.js.map
