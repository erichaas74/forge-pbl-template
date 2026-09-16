import {
  Component,
  Input,
  computed,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";

// src/app/templates/journey-replay/ui/journey-history-context.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function JourneyHistoryContextComponent_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "em");
    \u0275\u0275text(1, "Later history \xB7 hindsight, not a witnessed scene");
    \u0275\u0275domElementEnd();
  }
}
function JourneyHistoryContextComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, JourneyHistoryContextComponent_For_12_Conditional_3_Template, 2, 0, "em");
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "a", 2);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const event_r1 = ctx.$implicit;
    \u0275\u0275attribute("data-history-event", event_r1.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", event_r1.date, " \xB7 ", event_r1.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(event_r1.period === "epilogue" ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r1.summary);
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", event_r1.sourceUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", event_r1.sourceLabel, " \u2197");
  }
}
function JourneyHistoryContextComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 1);
    \u0275\u0275text(1, " After your voyage, a hindsight epilogue shows how history continued. Your choices cannot change it. ");
    \u0275\u0275domElementEnd();
  }
}
var JourneyHistoryContextComponent = class _JourneyHistoryContextComponent {
  history = input.required(
    ...ngDevMode ? [{ debugName: "history" }] : (
      /* istanbul ignore next */
      []
    )
  );
  includeEpilogue = input(
    false,
    ...ngDevMode ? [{ debugName: "includeEpilogue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleEvents = computed(
    () => this.history().events.filter((event) => event.period === "before-voyage" || this.includeEpilogue()),
    ...ngDevMode ? [{ debugName: "visibleEvents" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function JourneyHistoryContextComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JourneyHistoryContextComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JourneyHistoryContextComponent, selectors: [["app-journey-history-context"]], inputs: { history: [1, "history"], includeEpilogue: [1, "includeEpilogue"] }, decls: 14, vars: 4, consts: [["aria-label", "Fixed historical context", 1, "history-frame"], [1, "epilogue-note"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"]], template: function JourneyHistoryContextComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "span");
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "p");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "details")(6, "summary");
      \u0275\u0275text(7, "History keeps its course \xB7 read the record");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "p");
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "ol");
      \u0275\u0275repeaterCreate(11, JourneyHistoryContextComponent_For_12_Template, 8, 7, "li", null, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(13, JourneyHistoryContextComponent_Conditional_13_Template, 2, 0, "p", 1);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.history().setting);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.history().agency);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.history().witnessGuidance);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleEvents());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.includeEpilogue() ? 13 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.history-frame[_ngcontent-%COMP%] {\n  border: 1px solid #a6ae96;\n  border-radius: 5px;\n  margin-bottom: 12px;\n  padding: 11px;\n  color: #30463b;\n  background: #edf0dd;\n  font: 12px/1.55 system-ui, sans-serif;\n  overflow-wrap: anywhere;\n}\n.history-frame[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-weight: 850;\n  font-size: 10px;\n  letter-spacing: 0.09em;\n}\np[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\nsummary[_ngcontent-%COMP%] {\n  padding: 9px 0;\n  cursor: pointer;\n  font-weight: 800;\n}\nol[_ngcontent-%COMP%] {\n  padding: 0 0 0 16px;\n  margin: 8px 0;\n}\nli[_ngcontent-%COMP%] {\n  padding: 9px 0;\n  border-top: 1px solid #b6bda5;\n}\nstrong[_ngcontent-%COMP%], \nem[_ngcontent-%COMP%] {\n  display: block;\n}\nem[_ngcontent-%COMP%], \n.epilogue-note[_ngcontent-%COMP%] {\n  color: #645338;\n}\na[_ngcontent-%COMP%] {\n  color: #20575b;\n  text-decoration: underline;\n}\na[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #247882;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=journey-history-context.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JourneyHistoryContextComponent, [{
    type: Component,
    args: [{ selector: "app-journey-history-context", template: `
    <section class="history-frame" aria-label="Fixed historical context">
      <span>{{ history().setting }}</span>
      <p>{{ history().agency }}</p>
      <details>
        <summary>History keeps its course \xB7 read the record</summary>
        <p>{{ history().witnessGuidance }}</p>
        <ol>
          @for (event of visibleEvents(); track event.id) {
            <li [attr.data-history-event]="event.id">
              <strong>{{ event.date }} \xB7 {{ event.title }}</strong>
              @if (event.period === 'epilogue') {
                <em>Later history \xB7 hindsight, not a witnessed scene</em>
              }
              <p>{{ event.summary }}</p>
              <a [href]="event.sourceUrl" target="_blank" rel="noopener noreferrer"
                >{{ event.sourceLabel }} \u2197</a
              >
            </li>
          }
        </ol>
        @if (!includeEpilogue()) {
          <p class="epilogue-note">
            After your voyage, a hindsight epilogue shows how history continued. Your choices cannot
            change it.
          </p>
        }
      </details>
    </section>
  `, styles: ["/* angular:styles/component:scss;c73f46fd1540acb4ae240b9d6c843f047792c4e4adbd5108ce03492194db949d;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/journey-replay/ui/journey-history-context.component.ts */\n:host {\n  display: block;\n  min-width: 0;\n}\n.history-frame {\n  border: 1px solid #a6ae96;\n  border-radius: 5px;\n  margin-bottom: 12px;\n  padding: 11px;\n  color: #30463b;\n  background: #edf0dd;\n  font: 12px/1.55 system-ui, sans-serif;\n  overflow-wrap: anywhere;\n}\n.history-frame > span {\n  text-transform: uppercase;\n  font-weight: 850;\n  font-size: 10px;\n  letter-spacing: 0.09em;\n}\np {\n  margin: 6px 0;\n}\nsummary {\n  padding: 9px 0;\n  cursor: pointer;\n  font-weight: 800;\n}\nol {\n  padding: 0 0 0 16px;\n  margin: 8px 0;\n}\nli {\n  padding: 9px 0;\n  border-top: 1px solid #b6bda5;\n}\nstrong,\nem {\n  display: block;\n}\nem,\n.epilogue-note {\n  color: #645338;\n}\na {\n  color: #20575b;\n  text-decoration: underline;\n}\na:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid #247882;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=journey-history-context.component.css.map */\n"] }]
  }], null, { history: [{ type: Input, args: [{ isSignal: true, alias: "history", required: true }] }], includeEpilogue: [{ type: Input, args: [{ isSignal: true, alias: "includeEpilogue", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JourneyHistoryContextComponent, { className: "JourneyHistoryContextComponent", filePath: "src/app/templates/journey-replay/ui/journey-history-context.component.ts", lineNumber: 94 });
})();

export {
  JourneyHistoryContextComponent
};
//# debugId=2ad4ca84-6037-5e97-856f-c8c7302fdcec
//# sourceMappingURL=chunk-U6GFPECO.js.map
