import {
  NarrativeStoryMapComponent
} from "./chunk-YQSRM7MS.js";
import {
  NarrativeStudioRuntimeService
} from "./chunk-PJDX5C2H.js";
import {
  NARRATIVE_STAGES,
  wordCount
} from "./chunk-M73YRRYA.js";
import "./chunk-G626JLCU.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  bindLessonFocus
} from "./chunk-3C62DQOL.js";
import "./chunk-RTVK2FN5.js";
import "./chunk-OXVZ3VYX.js";
import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/narrative-studio/ui/narrative-coach-panel.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NarrativeCoachPanelComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 7);
    \u0275\u0275text(1, " Tell me what you want this scene to change. What should the person decide, discover, or risk? I will respond with a question\u2014not write the answer for you. ");
    \u0275\u0275domElementEnd();
  }
}
function NarrativeCoachPanelComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const turn_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("student", turn_r1.role === "student");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r1.role === "coach" ? ctx_r1.runtime.config.coachName : "You");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r1.text);
  }
}
function NarrativeCoachPanelComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 9);
    \u0275\u0275text(1, "Reading your scene\u2026");
    \u0275\u0275domElementEnd();
  }
}
var NarrativeCoachPanelComponent = class _NarrativeCoachPanelComponent {
  runtime = inject(NarrativeStudioRuntimeService);
  replyDraft = signal(
    "",
    ...ngDevMode ? [{ debugName: "replyDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  latestTurns = computed(
    () => this.runtime.state().coachHistory.filter((turn) => turn.context !== "planning" && turn.nodeId === this.runtime.state().selectedNodeId).slice(-6),
    ...ngDevMode ? [{ debugName: "latestTurns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async useTool(tool) {
    await this.runtime.askCoach(tool);
  }
  updateReply(event) {
    this.replyDraft.set(event.target.value);
  }
  async sendReply() {
    const reply = this.replyDraft();
    if (!reply.trim())
      return;
    this.replyDraft.set("");
    await this.runtime.askCoach("reply", reply);
  }
  static \u0275fac = function NarrativeCoachPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeCoachPanelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativeCoachPanelComponent, selectors: [["app-narrative-coach-panel"]], decls: 33, vars: 6, consts: [[1, "coach-panel"], ["aria-hidden", "true", 1, "coach-mark"], [1, "coach-promise"], ["aria-label", "Writing coach tools", 1, "coach-tools"], ["type", "button", 3, "click"], ["type", "button", 1, "storm-tool", 3, "click"], ["aria-live", "polite", 1, "coach-conversation"], [1, "coach-empty"], [3, "student"], [1, "thinking"], [1, "coach-reply"], ["rows", "3", "placeholder", "My idea is\u2026 I chose it because\u2026", 3, "input", "value"], ["type", "button", 1, "send-reply", 3, "click", "disabled"]], template: function NarrativeCoachPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "aside", 0)(1, "header")(2, "div", 1);
      \u0275\u0275text(3, "\u2726");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div")(5, "strong");
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "small");
      \u0275\u0275text(8, "Prototype chat \xB7 AI integration comes later");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(9, "p", 2);
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "div", 3)(12, "button", 4);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_12_listener() {
        return ctx.useTool("question");
      });
      \u0275\u0275text(13, "Ask a follow-up");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "button", 4);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_14_listener() {
        return ctx.useTool("possibilities");
      });
      \u0275\u0275text(15, "Help me compare ideas");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "button", 5);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_16_listener() {
        return ctx.useTool("storm");
      });
      \u0275\u0275text(17, "Question the pressure");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "button", 4);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_18_listener() {
        return ctx.useTool("continuity");
      });
      \u0275\u0275text(19, "Check history & continuity");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "button", 4);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_20_listener() {
        return ctx.useTool("stakes");
      });
      \u0275\u0275text(21, "Challenge the stakes");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(22, "div", 6);
      \u0275\u0275conditionalCreate(23, NarrativeCoachPanelComponent_Conditional_23_Template, 2, 0, "p", 7);
      \u0275\u0275repeaterCreate(24, NarrativeCoachPanelComponent_For_25_Template, 5, 4, "article", 8, _forTrack0);
      \u0275\u0275conditionalCreate(26, NarrativeCoachPanelComponent_Conditional_26_Template, 2, 0, "p", 9);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "label", 10)(28, "span");
      \u0275\u0275text(29, "Reply with your thinking");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "textarea", 11);
      \u0275\u0275domListener("input", function NarrativeCoachPanelComponent_Template_textarea_input_30_listener($event) {
        return ctx.updateReply($event);
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(31, "button", 12);
      \u0275\u0275domListener("click", function NarrativeCoachPanelComponent_Template_button_click_31_listener() {
        return ctx.sendReply();
      });
      \u0275\u0275text(32, " Send my thinking ");
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.runtime.config.coachName);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.config.coachPromise);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(!ctx.latestTurns().length ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.latestTurns());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.coachBusy() ? 26 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("value", ctx.replyDraft());
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", !ctx.replyDraft().trim() || ctx.runtime.coachBusy());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  border-left: 1px solid #264d55;\n  color: #e6f0ed;\n  background:\n    linear-gradient(\n      165deg,\n      #0c3942,\n      #071e29 70%);\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f2ba54;\n  outline-offset: 3px;\n}\n.coach-panel[_ngcontent-%COMP%] {\n  padding: 1.2rem;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.coach-mark[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #e0ae59;\n  border-radius: 50%;\n  color: #ffd686;\n  background: #164952;\n}\nheader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 0.15rem;\n}\nheader[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1rem Georgia, serif;\n}\nheader[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #91b0ad;\n  font-size: 0.72rem;\n}\n.coach-promise[_ngcontent-%COMP%] {\n  margin: 0.8rem 0;\n  border-left: 2px solid #d99655;\n  padding-left: 0.7rem;\n  color: #aac0bd;\n  font: italic 0.82rem/1.45 Georgia, serif;\n}\n.coach-tools[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.coach-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #3a6870;\n  border-radius: 99px;\n  padding: 0.45rem 0.6rem;\n  color: #c9dcda;\n  background: #123f48;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n.coach-tools[_ngcontent-%COMP%]   .storm-tool[_ngcontent-%COMP%] {\n  border-color: #c89a50;\n  color: #ffe7ae;\n  background: #55472f;\n}\n.coach-conversation[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  max-height: 23rem;\n  overflow-y: auto;\n  margin: 1rem 0 0.7rem;\n}\n.coach-conversation[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-radius: 0.5rem 0.5rem 0.5rem 0.1rem;\n  padding: 0.65rem 0.75rem;\n  color: #dce9e6;\n  background: #154651;\n}\n.coach-conversation[_ngcontent-%COMP%]   article.student[_ngcontent-%COMP%] {\n  margin-left: 1.5rem;\n  background: #3b5558;\n}\n.coach-conversation[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffd487;\n  font-size: 0.68rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.coach-conversation[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.coach-empty[_ngcontent-%COMP%], \n.thinking[_ngcontent-%COMP%] {\n  color: #91aaa7;\n  font: italic 0.82rem/1.45 Georgia, serif;\n}\n.send-reply[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.7rem;\n  border: 0;\n  border-radius: 0.35rem;\n  padding: 0.6rem;\n  color: #102d31;\n  background: #efbd63;\n  font-weight: 900;\n}\n.coach-reply[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.42rem;\n  margin-top: 0.8rem;\n  color: #b9cfcc;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.coach-reply[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 5rem;\n  resize: vertical;\n  border: 1px solid #3f6970;\n  border-radius: 0.45rem;\n  padding: 0.78rem 0.85rem;\n  color: #edf5f3;\n  background: #0e3038;\n  line-height: 1.5;\n}\n.send-reply[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  color: #eff7f4;\n  background: #26726f;\n}\n@media (max-width: 1050px) {\n  [_nghost-%COMP%] {\n    grid-column: 1/-1;\n    border-top: 1px solid #28525a;\n    border-left: 0;\n  }\n}\n/*# sourceMappingURL=narrative-coach-panel.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeCoachPanelComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-coach-panel", template: `<aside class="coach-panel">
  <header>
    <div class="coach-mark" aria-hidden="true">\u2726</div>
    <div>
      <strong>{{ runtime.config.coachName }}</strong
      ><small>Prototype chat \xB7 AI integration comes later</small>
    </div>
  </header>
  <p class="coach-promise">{{ runtime.config.coachPromise }}</p>
  <div class="coach-tools" aria-label="Writing coach tools">
    <button type="button" (click)="useTool('question')">Ask a follow-up</button>
    <button type="button" (click)="useTool('possibilities')">Help me compare ideas</button>
    <button type="button" class="storm-tool" (click)="useTool('storm')">Question the pressure</button>
    <button type="button" (click)="useTool('continuity')">Check history & continuity</button>
    <button type="button" (click)="useTool('stakes')">Challenge the stakes</button>
  </div>
  <div class="coach-conversation" aria-live="polite">
    @if (!latestTurns().length) {
      <p class="coach-empty">
        Tell me what you want this scene to change. What should the person decide, discover, or
        risk? I will respond with a question\u2014not write the answer for you.
      </p>
    }
    @for (turn of latestTurns(); track turn.id) {
      <article [class.student]="turn.role === 'student'">
        <strong>{{ turn.role === 'coach' ? runtime.config.coachName : 'You' }}</strong>
        <p>{{ turn.text }}</p>
      </article>
    }
    @if (runtime.coachBusy()) {
      <p class="thinking">Reading your scene\u2026</p>
    }
  </div>
  <label class="coach-reply"
    ><span>Reply with your thinking</span
    ><textarea
      rows="3"
      [value]="replyDraft()"
      (input)="updateReply($event)"
      placeholder="My idea is\u2026 I chose it because\u2026"
    ></textarea>
  </label>
  <button
    class="send-reply"
    type="button"
    [disabled]="!replyDraft().trim() || runtime.coachBusy()"
    (click)="sendReply()"
  >
    Send my thinking
  </button>
</aside>
`, styles: ["/* src/app/templates/narrative-studio/ui/narrative-coach-panel.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  border-left: 1px solid #264d55;\n  color: #e6f0ed;\n  background:\n    linear-gradient(\n      165deg,\n      #0c3942,\n      #071e29 70%);\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\nbutton,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nbutton:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #f2ba54;\n  outline-offset: 3px;\n}\n.coach-panel {\n  padding: 1.2rem;\n}\nheader {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.coach-mark {\n  display: grid;\n  width: 2.6rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #e0ae59;\n  border-radius: 50%;\n  color: #ffd686;\n  background: #164952;\n}\nheader div:last-child {\n  display: grid;\n  gap: 0.15rem;\n}\nheader strong {\n  font: 700 1rem Georgia, serif;\n}\nheader small {\n  color: #91b0ad;\n  font-size: 0.72rem;\n}\n.coach-promise {\n  margin: 0.8rem 0;\n  border-left: 2px solid #d99655;\n  padding-left: 0.7rem;\n  color: #aac0bd;\n  font: italic 0.82rem/1.45 Georgia, serif;\n}\n.coach-tools {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.coach-tools button {\n  border: 1px solid #3a6870;\n  border-radius: 99px;\n  padding: 0.45rem 0.6rem;\n  color: #c9dcda;\n  background: #123f48;\n  font-size: 0.7rem;\n  font-weight: 800;\n}\n.coach-tools .storm-tool {\n  border-color: #c89a50;\n  color: #ffe7ae;\n  background: #55472f;\n}\n.coach-conversation {\n  display: grid;\n  gap: 0.6rem;\n  max-height: 23rem;\n  overflow-y: auto;\n  margin: 1rem 0 0.7rem;\n}\n.coach-conversation article {\n  border-radius: 0.5rem 0.5rem 0.5rem 0.1rem;\n  padding: 0.65rem 0.75rem;\n  color: #dce9e6;\n  background: #154651;\n}\n.coach-conversation article.student {\n  margin-left: 1.5rem;\n  background: #3b5558;\n}\n.coach-conversation strong {\n  color: #ffd487;\n  font-size: 0.68rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.coach-conversation p {\n  margin: 0.25rem 0 0;\n  font-size: 0.82rem;\n  line-height: 1.5;\n}\n.coach-empty,\n.thinking {\n  color: #91aaa7;\n  font: italic 0.82rem/1.45 Georgia, serif;\n}\n.send-reply {\n  width: 100%;\n  min-height: 2.7rem;\n  border: 0;\n  border-radius: 0.35rem;\n  padding: 0.6rem;\n  color: #102d31;\n  background: #efbd63;\n  font-weight: 900;\n}\n.coach-reply {\n  display: grid;\n  gap: 0.42rem;\n  margin-top: 0.8rem;\n  color: #b9cfcc;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.coach-reply textarea {\n  width: 100%;\n  min-height: 5rem;\n  resize: vertical;\n  border: 1px solid #3f6970;\n  border-radius: 0.45rem;\n  padding: 0.78rem 0.85rem;\n  color: #edf5f3;\n  background: #0e3038;\n  line-height: 1.5;\n}\n.send-reply {\n  margin-top: 0.5rem;\n  color: #eff7f4;\n  background: #26726f;\n}\n@media (max-width: 1050px) {\n  :host {\n    grid-column: 1/-1;\n    border-top: 1px solid #28525a;\n    border-left: 0;\n  }\n}\n/*# sourceMappingURL=narrative-coach-panel.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativeCoachPanelComponent, { className: "NarrativeCoachPanelComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-coach-panel.component.ts", lineNumber: 11 });
})();

// src/app/templates/narrative-studio/ui/narrative-planning-conversation.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function NarrativePlanningConversationComponent_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const setting_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(setting_r2.icon);
  }
}
function NarrativePlanningConversationComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function NarrativePlanningConversationComponent_For_7_Template_button_click_0_listener() {
      const setting_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.selectHistoricalSetting(setting_r2.id));
    });
    \u0275\u0275conditionalCreate(1, NarrativePlanningConversationComponent_For_7_Conditional_1_Template, 2, 1, "span", 7);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const setting_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.runtime.state().historicalSettingId === setting_r2.id);
    \u0275\u0275attribute("aria-pressed", ctx_r2.runtime.state().historicalSettingId === setting_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(setting_r2.icon ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r2.eraLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r2.title);
  }
}
function NarrativePlanningConversationComponent_Conditional_8_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function NarrativePlanningConversationComponent_Conditional_8_For_6_Template_button_click_0_listener() {
      const option_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.selectHistoricalSetting(option_r5.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r5.title, " ");
  }
}
function NarrativePlanningConversationComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 4)(1, "details", 8)(2, "summary");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div");
    \u0275\u0275repeaterCreate(5, NarrativePlanningConversationComponent_Conditional_8_For_6_Template, 2, 1, "button", 9, _forTrack02);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "span");
    \u0275\u0275text(8, "Keep this fact true");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "a", 10);
    \u0275\u0275text(12, "Historical source \u2197");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const setting_r6 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(setting_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.runtime.config.historicalSettings);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(setting_r6.accuracyBoundary);
    \u0275\u0275advance();
    \u0275\u0275domProperty("href", setting_r6.sourceUrl, \u0275\u0275sanitizeUrl);
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Choose a historical setting first. Then I\u2019ll ask about the person you want to create. ");
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.nextPlanningQuestion().prompt, " ");
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 15)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275conditionalCreate(4, NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Conditional_4_Template, 1, 0)(5, NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Conditional_5_Template, 1, 1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.coachName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.runtime.selectedHistoricalSetting() ? 4 : 5);
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_13_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const turn_r7 = ctx.$implicit;
    \u0275\u0275classProp("student-message", turn_r7.role === "student");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r7.role === "student" ? "You" : "Guide");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(turn_r7.text);
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article", 15)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(3, "details", 18)(4, "summary");
    \u0275\u0275text(5, "My earlier ideas");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(6, NarrativePlanningConversationComponent_Conditional_9_Conditional_13_For_7_Template, 5, 4, "article", 19, _forTrack02);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.nextPlanningQuestion().prompt);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.runtime.planningTurns());
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.config.coachName, " is thinking about your answer\u2026");
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "footer", 17)(1, "div")(2, "span", 20);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p")(5, "strong");
    \u0275\u0275text(6, "Your ideas are saved.");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7, " Review them in your optional Story Notes.");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "button", 6);
    \u0275\u0275domListener("click", function NarrativePlanningConversationComponent_Conditional_9_Conditional_15_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.runtime.setStage("bible"));
    });
    \u0275\u0275text(9, "Review my Story Notes \u2192");
    \u0275\u0275domElementEnd()();
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "label", 21)(1, "span");
    \u0275\u0275text(2, "My idea");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "textarea", 22);
    \u0275\u0275domListener("input", function NarrativePlanningConversationComponent_Conditional_9_Conditional_16_Template_textarea_input_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateDraft($event));
    })("keydown", function NarrativePlanningConversationComponent_Conditional_9_Conditional_16_Template_textarea_keydown_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleKeydown($event));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "footer", 23)(5, "button", 24);
    \u0275\u0275domListener("click", function NarrativePlanningConversationComponent_Conditional_9_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.send());
    });
    \u0275\u0275text(6, " Save my idea ");
    \u0275\u0275domElementStart(7, "span", 20);
    \u0275\u0275text(8, "\u2191");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.draft())("disabled", !ctx_r2.runtime.selectedHistoricalSetting() || ctx_r2.runtime.coachBusy());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", !ctx_r2.runtime.selectedHistoricalSetting() || !ctx_r2.draft().trim() || ctx_r2.runtime.coachBusy());
  }
}
function NarrativePlanningConversationComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 5)(1, "header", 11)(2, "div", 12);
    \u0275\u0275text(3, "\u2726");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div")(5, "h2", 13);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p");
    \u0275\u0275text(8, "Story guide");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div", 14);
    \u0275\u0275conditionalCreate(12, NarrativePlanningConversationComponent_Conditional_9_Conditional_12_Template, 6, 2, "article", 15);
    \u0275\u0275conditionalCreate(13, NarrativePlanningConversationComponent_Conditional_9_Conditional_13_Template, 8, 1);
    \u0275\u0275conditionalCreate(14, NarrativePlanningConversationComponent_Conditional_9_Conditional_14_Template, 2, 1, "p", 16);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(15, NarrativePlanningConversationComponent_Conditional_9_Conditional_15_Template, 10, 0, "footer", 17)(16, NarrativePlanningConversationComponent_Conditional_9_Conditional_16_Template, 9, 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.runtime.config.coachName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.planningAnswerCount(), "/", ctx_r2.runtime.config.planningQuestions.length, " ideas saved");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.runtime.planningTurns().length ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.planningTurns().length && !ctx_r2.runtime.planningComplete() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.coachBusy() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.planningComplete() ? 15 : 16);
  }
}
var NarrativePlanningConversationComponent = class _NarrativePlanningConversationComponent {
  runtime = inject(NarrativeStudioRuntimeService);
  draft = signal(
    "",
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  questionNumber = computed(
    () => Math.min(this.runtime.planningAnswerCount() + 1, this.runtime.config.planningQuestions.length),
    ...ngDevMode ? [{ debugName: "questionNumber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  updateDraft(event) {
    this.draft.set(event.target.value);
  }
  async send() {
    const answer = this.draft();
    if (!answer.trim())
      return;
    this.draft.set("");
    await this.runtime.answerPlanningQuestion(answer);
  }
  async handleKeydown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      await this.send();
    }
  }
  static \u0275fac = function NarrativePlanningConversationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativePlanningConversationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativePlanningConversationComponent, selectors: [["app-narrative-planning-conversation"]], decls: 10, vars: 4, consts: [[1, "conversation-layout"], [1, "history-context"], [1, "setting-list"], ["type", "button", 3, "selected"], [1, "selected-context"], ["aria-labelledby", "planning-chat-title", 1, "planning-chat"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "setting-icon"], [1, "change-setting"], ["type", "button"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "chat-header"], ["aria-hidden", "true", 1, "coach-avatar"], ["id", "planning-chat-title"], ["aria-live", "polite", 1, "chat-thread"], [1, "coach-message"], [1, "thinking"], [1, "conversation-complete"], [1, "earlier-ideas"], [3, "student-message"], ["aria-hidden", "true"], [1, "answer-box"], ["rows", "3", "placeholder", "", 3, "input", "keydown", "value", "disabled"], [1, "chat-send"], ["type", "button", 3, "click", "disabled"]], template: function NarrativePlanningConversationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "aside", 1)(2, "header")(3, "h2");
      \u0275\u0275text(4, "Where does your story begin?");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(5, "div", 2);
      \u0275\u0275repeaterCreate(6, NarrativePlanningConversationComponent_For_7_Template, 6, 6, "button", 3, _forTrack02);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(8, NarrativePlanningConversationComponent_Conditional_8_Template, 13, 3, "article", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(9, NarrativePlanningConversationComponent_Conditional_9_Template, 17, 7, "section", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance();
      \u0275\u0275classProp("setting-chosen", !!ctx.runtime.selectedHistoricalSetting());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.runtime.config.historicalSettings);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_2_0 = ctx.runtime.selectedHistoricalSetting()) ? 8 : -1, tmp_2_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.selectedHistoricalSetting() ? 9 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled, \ntextarea[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.conversation-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(17rem, 0.72fr) minmax(28rem, 1.28fr);\n  min-height: 42rem;\n  overflow: hidden;\n  border: 1px solid #315860;\n  border-radius: 1rem;\n  background: #fffdf3;\n  box-shadow: 0 1rem 3rem rgba(8, 41, 48, 0.15);\n}\n.history-context[_ngcontent-%COMP%] {\n  padding: clamp(1.3rem, 3vw, 2rem);\n  color: #e8f1ed;\n  background:\n    linear-gradient(\n      155deg,\n      rgba(8, 37, 47, 0.9),\n      #0b3d45),\n    url(/narrative-studio/survival-island-history-launch-v1.jpg) center/cover;\n}\n.history-context[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.selected-context[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #f2c36c;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.history-context[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.4rem 0 0.7rem;\n  color: #fff7df;\n  font: 700 clamp(1.8rem, 3vw, 2.65rem)/1.05 Georgia, serif;\n}\n.history-context[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #c6d9d4;\n  line-height: 1.55;\n}\n.setting-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n  margin: 1.4rem 0;\n}\n.setting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  border: 1px solid #5c7d80;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  color: #dceae6;\n  background: rgba(7, 31, 39, 0.8);\n  text-align: left;\n}\n.setting-list[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: #f0bd60;\n  background: #1a555b;\n  box-shadow: inset 0 0 0 1px #f0bd60;\n}\n.setting-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a7c5c0;\n  font-size: 0.7rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.setting-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1rem Georgia, serif;\n}\n.selected-context[_ngcontent-%COMP%] {\n  border-left: 3px solid #eab257;\n  padding-left: 0.8rem;\n}\n.selected-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0.6rem;\n  color: #d5e3df;\n  font-size: 0.85rem;\n  line-height: 1.5;\n}\n.selected-context[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #9de0d7;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.planning-chat[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto minmax(18rem, 1fr) auto auto;\n  min-width: 0;\n  background: #f7f5e9;\n}\n.chat-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.8rem;\n  border-bottom: 1px solid #c8d5ce;\n  padding: 1rem 1.2rem;\n  background: #fffdf5;\n}\n.coach-avatar[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff1c5;\n  background: #17616a;\n}\n.chat-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #153e43;\n  font: 700 1.15rem Georgia, serif;\n}\n.chat-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.chat-header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: #6a817d;\n  font-size: 0.74rem;\n}\n.chat-header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  border-radius: 99px;\n  padding: 0.4rem 0.65rem;\n  background: #e4ece6;\n  font-weight: 850;\n}\n.chat-thread[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  max-height: 29rem;\n  overflow-y: auto;\n  padding: 1.4rem;\n}\n.chat-thread[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  max-width: 82%;\n  border-radius: 0.75rem 0.75rem 0.75rem 0.15rem;\n  padding: 0.8rem 1rem;\n  color: #23494d;\n  background: #e2ede7;\n}\n.chat-thread[_ngcontent-%COMP%]   article.student-message[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  border-radius: 0.75rem 0.75rem 0.15rem 0.75rem;\n  color: #f2f8f6;\n  background: #1e6265;\n}\n.chat-thread[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #a34e38;\n  font-size: 0.7rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.chat-thread[_ngcontent-%COMP%]   .student-message[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffe099;\n}\n.chat-thread[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.thinking[_ngcontent-%COMP%] {\n  color: #728783;\n  font: italic 0.9rem Georgia, serif;\n}\n.answer-box[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  border-top: 1px solid #ced8d1;\n  padding: 1rem 1.2rem 0;\n  color: #41645f;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.answer-box[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #8eaaa4;\n  border-radius: 0.6rem;\n  padding: 0.8rem;\n  color: #173e42;\n  background: #fffef9;\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.chat-send[_ngcontent-%COMP%], \n.conversation-complete[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.8rem 1.2rem 1.1rem;\n}\n.chat-send[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #71847f;\n  font-size: 0.72rem;\n}\n.chat-send[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.conversation-complete[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.75rem 1rem;\n  color: #fff;\n  background: #b75239;\n  font-weight: 900;\n}\n.conversation-complete[_ngcontent-%COMP%] {\n  border-top: 1px solid #cad8d0;\n  background: #e5efe7;\n}\n.conversation-complete[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  color: #315f55;\n}\n.conversation-complete[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #39856d;\n}\n.conversation-complete[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #e3a746;\n  outline-offset: 3px;\n}\n@media (max-width: 860px) {\n  .conversation-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .planning-chat[_ngcontent-%COMP%] {\n    min-height: 42rem;\n  }\n}\n@media (max-width: 560px) {\n  .chat-header[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .chat-header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    justify-self: start;\n  }\n  .chat-thread[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    max-width: 94%;\n  }\n  .chat-send[_ngcontent-%COMP%], \n   .conversation-complete[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .chat-send[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n   .conversation-complete[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.conversation-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  max-width: 960px;\n  margin: 0 auto;\n}\n.history-context[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.history-context[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.setting-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 14px;\n}\n.setting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 165px;\n  justify-content: center;\n  text-align: center;\n  background: linear-gradient(rgba(23, 74, 97, 0.4666666667), rgba(18, 54, 71, 0.9333333333)), url(/narrative-studio/survival-island-history-launch-v1.jpg) center/cover;\n  color: #fff2d6;\n  border: 2px solid #667d78;\n}\n.setting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(2) {\n  background-position: 30% center;\n}\n.setting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(3) {\n  background-position: 80% center;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%] {\n  padding: 0;\n  border: 0;\n  background: none;\n}\n.setting-chosen[_ngcontent-%COMP%]   header[_ngcontent-%COMP%], \n.setting-chosen[_ngcontent-%COMP%]   .setting-list[_ngcontent-%COMP%] {\n  display: none;\n}\n.selected-context[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 14px 20px;\n  font-size: 14px;\n}\n.planning-chat[_ngcontent-%COMP%] {\n  width: min(100%, 720px);\n  margin: auto;\n  min-height: 0;\n}\n.chat-thread[_ngcontent-%COMP%] {\n  min-height: 0;\n  max-height: none;\n}\n.coach-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1.4;\n}\n.earlier-ideas[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 13px;\n}\n.earlier-ideas[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n}\n.earlier-ideas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.answer-box[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 130px;\n}\n.chat-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n@media (max-width: 650px) {\n  .setting-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .setting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 100px;\n  }\n  .coach-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n.conversation-layout[_ngcontent-%COMP%] {\n  min-height: 0;\n  background: transparent;\n  overflow: visible;\n  border: 0;\n  box-shadow: none;\n  margin-top: 0;\n}\n.history-context[_ngcontent-%COMP%] {\n  border-radius: 18px;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  grid-template-rows: auto auto;\n  align-items: center;\n  column-gap: 18px;\n  row-gap: 2px;\n  background: #163f47;\n  border-radius: 10px;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%]   .change-setting[_ngcontent-%COMP%] {\n  grid-row: 1/-1;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  grid-column: 2;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  grid-column: 2;\n  margin: 0;\n}\n.history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  grid-column: 3;\n  grid-row: 1/-1;\n  white-space: nowrap;\n}\n.planning-chat[_ngcontent-%COMP%] {\n  grid-template-rows: auto auto auto auto;\n  border: 1px solid #b7c9c3;\n  border-radius: 16px;\n  overflow: hidden;\n}\n.chat-thread[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n}\n.coach-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 19px;\n}\n.answer-box[_ngcontent-%COMP%] {\n  padding-top: 12px;\n}\n.answer-box[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 96px;\n}\n.chat-thread[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.chat-send[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.change-setting[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  min-height: 44px;\n  font-weight: 700;\n}\n.change-setting[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #81a3a3;\n  background: #214c55;\n  color: #fff3d4;\n  margin: 4px;\n  padding: 8px;\n}\n.setting-list[_ngcontent-%COMP%]   .setting-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #efd48f;\n}\n@media (max-width: 650px) {\n  .history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 6px;\n  }\n  .history-context.setting-chosen[_ngcontent-%COMP%]   .selected-context[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n  .conversation-layout[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .chat-thread[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .coach-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=narrative-planning-conversation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativePlanningConversationComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-planning-conversation", template: `<div class="conversation-layout">
  <aside class="history-context" [class.setting-chosen]="!!runtime.selectedHistoricalSetting()">
    <header><h2>Where does your story begin?</h2></header>
    <div class="setting-list">
      @for (setting of runtime.config.historicalSettings; track setting.id) {
        <button
          type="button"
          [class.selected]="runtime.state().historicalSettingId === setting.id"
          [attr.aria-pressed]="runtime.state().historicalSettingId === setting.id"
          (click)="runtime.selectHistoricalSetting(setting.id)"
        >
          @if (setting.icon) {
            <span class="setting-icon" aria-hidden="true">{{ setting.icon }}</span>
          }
          <span>{{ setting.eraLabel }}</span
          ><strong>{{ setting.title }}</strong>
        </button>
      }
    </div>
    @if (runtime.selectedHistoricalSetting(); as setting) {
      <article class="selected-context">
        <details class="change-setting">
          <summary>{{ setting.title }}</summary>
          <div>
            @for (option of runtime.config.historicalSettings; track option.id) {
              <button type="button" (click)="runtime.selectHistoricalSetting(option.id)">
                {{ option.title }}
              </button>
            }
          </div>
        </details>
        <span>Keep this fact true</span>
        <p>{{ setting.accuracyBoundary }}</p>
        <a [href]="setting.sourceUrl" target="_blank" rel="noopener noreferrer"
          >Historical source \u2197</a
        >
      </article>
    }
  </aside>

  @if (runtime.selectedHistoricalSetting()) {
    <section class="planning-chat" aria-labelledby="planning-chat-title">
      <header class="chat-header">
        <div class="coach-avatar" aria-hidden="true">\u2726</div>
        <div>
          <h2 id="planning-chat-title">{{ runtime.config.coachName }}</h2>
          <p>Story guide</p>
        </div>
        <span
          >{{ runtime.planningAnswerCount() }}/{{ runtime.config.planningQuestions.length }} ideas
          saved</span
        >
      </header>

      <div class="chat-thread" aria-live="polite">
        @if (!runtime.planningTurns().length) {
          <article class="coach-message">
            <strong>{{ runtime.config.coachName }}</strong>
            <p>
              @if (!runtime.selectedHistoricalSetting()) {
                Choose a historical setting first. Then I\u2019ll ask about the person you want to
                create.
              } @else {
                {{ runtime.nextPlanningQuestion().prompt }}
              }
            </p>
          </article>
        }
        @if (runtime.planningTurns().length && !runtime.planningComplete()) {
          <article class="coach-message">
            <p>{{ runtime.nextPlanningQuestion().prompt }}</p>
          </article>
          <details class="earlier-ideas">
            <summary>My earlier ideas</summary>
            @for (turn of runtime.planningTurns(); track turn.id) {
              <article [class.student-message]="turn.role === 'student'">
                <strong>{{ turn.role === 'student' ? 'You' : 'Guide' }}</strong>
                <p>{{ turn.text }}</p>
              </article>
            }
          </details>
        }
        @if (runtime.coachBusy()) {
          <p class="thinking">{{ runtime.config.coachName }} is thinking about your answer\u2026</p>
        }
      </div>

      @if (runtime.planningComplete()) {
        <footer class="conversation-complete">
          <div>
            <span aria-hidden="true">\u2713</span>
            <p><strong>Your ideas are saved.</strong> Review them in your optional Story Notes.</p>
          </div>
          <button type="button" (click)="runtime.setStage('bible')">Review my Story Notes \u2192</button>
        </footer>
      } @else {
        <label class="answer-box">
          <span>My idea</span>
          <textarea
            rows="3"
            [value]="draft()"
            [disabled]="!runtime.selectedHistoricalSetting() || runtime.coachBusy()"
            (input)="updateDraft($event)"
            (keydown)="handleKeydown($event)"
            placeholder=""
          ></textarea>
        </label>
        <footer class="chat-send">
          <button
            type="button"
            [disabled]="
              !runtime.selectedHistoricalSetting() || !draft().trim() || runtime.coachBusy()
            "
            (click)="send()"
          >
            Save my idea <span aria-hidden="true">\u2191</span>
          </button>
        </footer>
      }
    </section>
  }
</div>
`, styles: ["/* src/app/templates/narrative-studio/ui/narrative-planning-conversation.component.scss */\n:host {\n  display: block;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ntextarea {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled,\ntextarea:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.conversation-layout {\n  display: grid;\n  grid-template-columns: minmax(17rem, 0.72fr) minmax(28rem, 1.28fr);\n  min-height: 42rem;\n  overflow: hidden;\n  border: 1px solid #315860;\n  border-radius: 1rem;\n  background: #fffdf3;\n  box-shadow: 0 1rem 3rem rgba(8, 41, 48, 0.15);\n}\n.history-context {\n  padding: clamp(1.3rem, 3vw, 2rem);\n  color: #e8f1ed;\n  background:\n    linear-gradient(\n      155deg,\n      rgba(8, 37, 47, 0.9),\n      #0b3d45),\n    url(/narrative-studio/survival-island-history-launch-v1.jpg) center/cover;\n}\n.history-context header > span,\n.selected-context span {\n  color: #f2c36c;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.history-context h2 {\n  margin: 0.4rem 0 0.7rem;\n  color: #fff7df;\n  font: 700 clamp(1.8rem, 3vw, 2.65rem)/1.05 Georgia, serif;\n}\n.history-context header p {\n  color: #c6d9d4;\n  line-height: 1.55;\n}\n.setting-list {\n  display: grid;\n  gap: 0.55rem;\n  margin: 1.4rem 0;\n}\n.setting-list button {\n  display: grid;\n  gap: 0.25rem;\n  border: 1px solid #5c7d80;\n  border-radius: 0.5rem;\n  padding: 0.8rem;\n  color: #dceae6;\n  background: rgba(7, 31, 39, 0.8);\n  text-align: left;\n}\n.setting-list button.selected {\n  border-color: #f0bd60;\n  background: #1a555b;\n  box-shadow: inset 0 0 0 1px #f0bd60;\n}\n.setting-list span {\n  color: #a7c5c0;\n  font-size: 0.7rem;\n  font-weight: 850;\n  text-transform: uppercase;\n}\n.setting-list strong {\n  font: 700 1rem Georgia, serif;\n}\n.selected-context {\n  border-left: 3px solid #eab257;\n  padding-left: 0.8rem;\n}\n.selected-context p {\n  margin: 0.35rem 0 0.6rem;\n  color: #d5e3df;\n  font-size: 0.85rem;\n  line-height: 1.5;\n}\n.selected-context a {\n  color: #9de0d7;\n  font-size: 0.8rem;\n  font-weight: 800;\n}\n.planning-chat {\n  display: grid;\n  grid-template-rows: auto minmax(18rem, 1fr) auto auto;\n  min-width: 0;\n  background: #f7f5e9;\n}\n.chat-header {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 0.8rem;\n  border-bottom: 1px solid #c8d5ce;\n  padding: 1rem 1.2rem;\n  background: #fffdf5;\n}\n.coach-avatar {\n  display: grid;\n  width: 2.8rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff1c5;\n  background: #17616a;\n}\n.chat-header h2 {\n  margin: 0;\n  color: #153e43;\n  font: 700 1.15rem Georgia, serif;\n}\n.chat-header p,\n.chat-header > span {\n  margin: 0.2rem 0 0;\n  color: #6a817d;\n  font-size: 0.74rem;\n}\n.chat-header > span {\n  border-radius: 99px;\n  padding: 0.4rem 0.65rem;\n  background: #e4ece6;\n  font-weight: 850;\n}\n.chat-thread {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  max-height: 29rem;\n  overflow-y: auto;\n  padding: 1.4rem;\n}\n.chat-thread article {\n  max-width: 82%;\n  border-radius: 0.75rem 0.75rem 0.75rem 0.15rem;\n  padding: 0.8rem 1rem;\n  color: #23494d;\n  background: #e2ede7;\n}\n.chat-thread article.student-message {\n  align-self: flex-end;\n  border-radius: 0.75rem 0.75rem 0.15rem 0.75rem;\n  color: #f2f8f6;\n  background: #1e6265;\n}\n.chat-thread strong {\n  color: #a34e38;\n  font-size: 0.7rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.chat-thread .student-message strong {\n  color: #ffe099;\n}\n.chat-thread p {\n  margin: 0.25rem 0 0;\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.thinking {\n  color: #728783;\n  font: italic 0.9rem Georgia, serif;\n}\n.answer-box {\n  display: grid;\n  gap: 0.45rem;\n  border-top: 1px solid #ced8d1;\n  padding: 1rem 1.2rem 0;\n  color: #41645f;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.answer-box textarea {\n  width: 100%;\n  resize: vertical;\n  border: 1px solid #8eaaa4;\n  border-radius: 0.6rem;\n  padding: 0.8rem;\n  color: #173e42;\n  background: #fffef9;\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.chat-send,\n.conversation-complete {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.8rem 1.2rem 1.1rem;\n}\n.chat-send small {\n  color: #71847f;\n  font-size: 0.72rem;\n}\n.chat-send button,\n.conversation-complete button {\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.75rem 1rem;\n  color: #fff;\n  background: #b75239;\n  font-weight: 900;\n}\n.conversation-complete {\n  border-top: 1px solid #cad8d0;\n  background: #e5efe7;\n}\n.conversation-complete div {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  color: #315f55;\n}\n.conversation-complete div > span {\n  display: grid;\n  width: 2rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #fff;\n  background: #39856d;\n}\n.conversation-complete p {\n  margin: 0;\n}\nbutton:focus-visible,\ntextarea:focus-visible,\na:focus-visible {\n  outline: 3px solid #e3a746;\n  outline-offset: 3px;\n}\n@media (max-width: 860px) {\n  .conversation-layout {\n    grid-template-columns: 1fr;\n  }\n  .planning-chat {\n    min-height: 42rem;\n  }\n}\n@media (max-width: 560px) {\n  .chat-header {\n    grid-template-columns: auto 1fr;\n  }\n  .chat-header > span {\n    grid-column: 1/-1;\n    justify-self: start;\n  }\n  .chat-thread article {\n    max-width: 94%;\n  }\n  .chat-send,\n  .conversation-complete {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .chat-send button,\n  .conversation-complete button {\n    width: 100%;\n  }\n}\n.conversation-layout {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  max-width: 960px;\n  margin: 0 auto;\n}\n.history-context {\n  width: 100%;\n  box-sizing: border-box;\n}\n.history-context header {\n  text-align: center;\n}\n.setting-list {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 14px;\n}\n.setting-list button {\n  min-height: 165px;\n  justify-content: center;\n  text-align: center;\n  background: linear-gradient(rgba(23, 74, 97, 0.4666666667), rgba(18, 54, 71, 0.9333333333)), url(/narrative-studio/survival-island-history-launch-v1.jpg) center/cover;\n  color: #fff2d6;\n  border: 2px solid #667d78;\n}\n.setting-list button:nth-child(2) {\n  background-position: 30% center;\n}\n.setting-list button:nth-child(3) {\n  background-position: 80% center;\n}\n.history-context.setting-chosen {\n  padding: 0;\n  border: 0;\n  background: none;\n}\n.setting-chosen header,\n.setting-chosen .setting-list {\n  display: none;\n}\n.selected-context {\n  margin: 0;\n  padding: 14px 20px;\n  font-size: 14px;\n}\n.planning-chat {\n  width: min(100%, 720px);\n  margin: auto;\n  min-height: 0;\n}\n.chat-thread {\n  min-height: 0;\n  max-height: none;\n}\n.coach-message p {\n  font-size: 22px;\n  line-height: 1.4;\n}\n.earlier-ideas {\n  margin-top: 12px;\n  font-size: 13px;\n}\n.earlier-ideas summary {\n  cursor: pointer;\n  min-height: 44px;\n}\n.earlier-ideas p {\n  font-size: 15px;\n}\n.answer-box textarea {\n  min-height: 130px;\n}\n.chat-header p {\n  font-size: 12px;\n}\n@media (max-width: 650px) {\n  .setting-list {\n    grid-template-columns: 1fr;\n  }\n  .setting-list button {\n    min-height: 100px;\n  }\n  .coach-message p {\n    font-size: 20px;\n  }\n}\n.conversation-layout {\n  min-height: 0;\n  background: transparent;\n  overflow: visible;\n  border: 0;\n  box-shadow: none;\n  margin-top: 0;\n}\n.history-context {\n  border-radius: 18px;\n}\n.history-context.setting-chosen .selected-context {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  grid-template-rows: auto auto;\n  align-items: center;\n  column-gap: 18px;\n  row-gap: 2px;\n  background: #163f47;\n  border-radius: 10px;\n}\n.history-context.setting-chosen .change-setting {\n  grid-row: 1/-1;\n}\n.history-context.setting-chosen .selected-context > span {\n  grid-column: 2;\n}\n.history-context.setting-chosen .selected-context > p {\n  grid-column: 2;\n  margin: 0;\n}\n.history-context.setting-chosen .selected-context > a {\n  grid-column: 3;\n  grid-row: 1/-1;\n  white-space: nowrap;\n}\n.planning-chat {\n  grid-template-rows: auto auto auto auto;\n  border: 1px solid #b7c9c3;\n  border-radius: 16px;\n  overflow: hidden;\n}\n.chat-thread {\n  padding: 16px 20px;\n}\n.coach-message p {\n  font-size: 19px;\n}\n.answer-box {\n  padding-top: 12px;\n}\n.answer-box textarea {\n  min-height: 96px;\n}\n.chat-thread article {\n  max-width: 100%;\n}\n.chat-send {\n  justify-content: flex-end;\n}\n.change-setting summary {\n  cursor: pointer;\n  min-height: 44px;\n  font-weight: 700;\n}\n.change-setting button {\n  min-height: 44px;\n  border: 1px solid #81a3a3;\n  background: #214c55;\n  color: #fff3d4;\n  margin: 4px;\n  padding: 8px;\n}\n.setting-list .setting-icon {\n  font-size: 36px;\n  color: #efd48f;\n}\n@media (max-width: 650px) {\n  .history-context.setting-chosen .selected-context {\n    display: flex;\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 6px;\n  }\n  .history-context.setting-chosen .selected-context > a {\n    white-space: normal;\n  }\n  .conversation-layout {\n    gap: 14px;\n  }\n  .chat-thread {\n    padding: 14px;\n  }\n  .coach-message p {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=narrative-planning-conversation.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativePlanningConversationComponent, { className: "NarrativePlanningConversationComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-planning-conversation.component.ts", lineNumber: 10 });
})();

// src/app/templates/narrative-studio/ui/narrative-studio-page.component.ts
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.code + $item.message;
function NarrativeStudioPageComponent_For_16_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Optional");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_For_16_Template_button_click_0_listener() {
      const stage_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStage(stage_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, NarrativeStudioPageComponent_For_16_Conditional_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stage_r2 = ctx.$implicit;
    const \u0275$index_27_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.runtime.state().stage === stage_r2.id)("recommended", ctx_r2.runtime.state().stage !== stage_r2.id && ctx_r2.recommendation().stage === stage_r2.id);
    \u0275\u0275attribute("aria-current", ctx_r2.runtime.state().stage === stage_r2.id ? "step" : null)("aria-label", stage_r2.label + (stage_r2.optional ? ", optional" : "") + (ctx_r2.runtime.state().stage !== stage_r2.id && ctx_r2.recommendation().stage === stage_r2.id ? ", recommended next step" : ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", \u0275$index_27_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stage_r2.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(stage_r2.optional ? 5 : -1);
  }
}
function NarrativeStudioPageComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-narrative-coach-panel");
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 4);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Saved in this spot.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Choose another scene on the map, or playtest your story to try its choices. ");
    \u0275\u0275elementEnd()();
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_32_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 34);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Conditional_26_Conditional_32_For_6_Template_input_input_5_listener($event) {
      const choice_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.updateChoice(choice_r7.id, ctx_r2.inputValue($event)));
    })("blur", function NarrativeStudioPageComponent_Conditional_26_Conditional_32_For_6_Template_input_blur_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.checkpointScene());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Conditional_26_Conditional_32_For_6_Template_button_click_6_listener() {
      const choice_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectBranch(choice_r7.nextNodeId));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r7 = ctx.$implicit;
    const \u0275$index_131_r8 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Choice ", \u0275$index_131_r8 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("leads to ", ctx_r2.destinationTitle(choice_r7.nextNodeId));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.runtime.selectedScene().choiceLabels[choice_r7.id])("placeholder", choice_r7.prompt);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.runtime.selectedScene().choiceLabels[choice_r7.id]?.trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Write the story for choice ", \u0275$index_131_r8 + 1, " ");
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 29)(1, "legend");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 33);
    \u0275\u0275text(4, " Write the two decisions the reader can make. Each option follows its matching numbered line on the story map. ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, NarrativeStudioPageComponent_Conditional_26_Conditional_32_For_6_Template, 10, 6, null, null, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.selectedNode().choiceQuestion);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.runtime.selectedNode().choices);
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.runtime.selectedNode().endingOutcome === "death" ? "\xD7 Dead end \xB7 The character dies" : "\u2726 Survival ending");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.selectedNode().endingOutcome === "death" ? "Write how this choice leads to the fictional character\u2019s death. This path has no more choices." : "Write the final moment that shows how the character survives and what changes for them.", " ");
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "What happens after this scene?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, " Add two choices to keep going, end this path with the character\u2019s death, or write a survival ending. ");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Conditional_26_Conditional_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeBranch("branch"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.selectedScene().parkedChoices?.length ? "Restore my continuation" : "Add two choices", " ");
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.changeBranch("end"));
    });
    \u0275\u0275text(1, " Dead end \xB7 Character dies ");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.changeBranch("finish"));
    });
    \u0275\u0275text(1, " Survival ending ");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_0_Template, 2, 0, "button", 36);
    \u0275\u0275conditionalCreate(1, NarrativeStudioPageComponent_Conditional_26_Conditional_38_Conditional_1_Template, 2, 0, "button", 37);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().endingOutcome !== "death" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().endingOutcome !== "survival" ? 1 : -1);
  }
}
function NarrativeStudioPageComponent_Conditional_26_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Ending here keeps later drafts so you can restore them.");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 12);
    \u0275\u0275conditionalCreate(1, NarrativeStudioPageComponent_Conditional_26_Conditional_1_Template, 7, 0, "div", 20);
    \u0275\u0275elementStart(2, "article", 21)(3, "label", 22)(4, "span");
    \u0275\u0275text(5, "Story title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 23);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Conditional_26_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateStoryTitle(ctx_r2.inputValue($event)));
    })("blur", function NarrativeStudioPageComponent_Conditional_26_Template_input_blur_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.flushSave());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "header")(8, "div")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h1");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label", 24)(18, "span");
    \u0275\u0275text(19, "Scene title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 25);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Conditional_26_Template_input_input_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateSceneTitle(ctx_r2.inputValue($event)));
    })("blur", function NarrativeStudioPageComponent_Conditional_26_Template_input_blur_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.checkpointScene());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 26)(22, "span", 4);
    \u0275\u0275text(23, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p")(25, "strong");
    \u0275\u0275text(26, "Craft target");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "label", 27)(29, "span");
    \u0275\u0275text(30, "Write the scene in your words");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "textarea", 28);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Conditional_26_Template_textarea_input_31_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateSceneText(ctx_r2.inputValue($event)));
    })("blur", function NarrativeStudioPageComponent_Conditional_26_Template_textarea_blur_31_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.checkpointScene());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, NarrativeStudioPageComponent_Conditional_26_Conditional_32_Template, 7, 1, "fieldset", 29);
    \u0275\u0275elementStart(33, "div", 30);
    \u0275\u0275conditionalCreate(34, NarrativeStudioPageComponent_Conditional_26_Conditional_34_Template, 4, 2)(35, NarrativeStudioPageComponent_Conditional_26_Conditional_35_Template, 4, 0);
    \u0275\u0275elementStart(36, "div", 31);
    \u0275\u0275conditionalCreate(37, NarrativeStudioPageComponent_Conditional_26_Conditional_37_Template, 2, 1, "button", 32);
    \u0275\u0275conditionalCreate(38, NarrativeStudioPageComponent_Conditional_26_Conditional_38_Template, 2, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, NarrativeStudioPageComponent_Conditional_26_Conditional_39_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "footer")(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Conditional_26_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.checkpointAndChooseNext());
    });
    \u0275\u0275text(44, " Save here & choose next ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.chooseNextBranch() ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r2.runtime.state().storyTitle);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.runtime.selectedNode().mapLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.selectedScene().title || ctx_r2.runtime.selectedNode().suggestedTitle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.runtime.selectedNode().purpose);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.sceneWords(), " words");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime.selectedScene().title);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.runtime.selectedNode().craftPrompt);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.runtime.selectedScene().text);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().choices.length ? 32 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().kind === "ending" ? 34 : !ctx_r2.runtime.selectedNode().choices.length ? 35 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r2.runtime.selectedNode().choices.length ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().id !== ctx_r2.runtime.config.startNodeId ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.selectedNode().choices.length && ctx_r2.runtime.selectedNode().id !== ctx_r2.runtime.config.startNodeId ? 39 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.selectedScene().revisions.length, " checkpoints \xB7 Draft saves locally; a checkpoint preserves a revision.");
  }
}
function NarrativeStudioPageComponent_Case_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13);
    \u0275\u0275element(1, "app-narrative-planning-conversation");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Case_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 14)(1, "header", 40)(2, "div")(3, "span");
    \u0275\u0275text(4, "Optional \xB7 Keep ideas nearby");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "Your Story Notes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Your conversation filled these notes. Revise anything that does not sound like you. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 41)(10, "label", 42);
    \u0275\u0275text(11, "Story title ");
    \u0275\u0275elementStart(12, "input", 43);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateStoryTitle(ctx_r2.inputValue($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Protagonist ");
    \u0275\u0275elementStart(15, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_15_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("protagonist", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label");
    \u0275\u0275text(17, "Immediate goal ");
    \u0275\u0275elementStart(18, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_18_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("immediateGoal", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label");
    \u0275\u0275text(20, "Inner fear or flaw ");
    \u0275\u0275elementStart(21, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_21_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("innerFear", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label");
    \u0275\u0275text(23, "Unknown truth or mystery ");
    \u0275\u0275elementStart(24, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_24_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("islandSecret", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "label");
    \u0275\u0275text(26, "Companion, rival, or mystery presence ");
    \u0275\u0275elementStart(27, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_27_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("companion", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "label");
    \u0275\u0275text(29, "One important object ");
    \u0275\u0275elementStart(30, "textarea", 44);
    \u0275\u0275listener("input", function NarrativeStudioPageComponent_Case_28_Template_textarea_input_30_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("importantObject", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "label");
    \u0275\u0275text(32, "Point of view ");
    \u0275\u0275elementStart(33, "select", 45);
    \u0275\u0275listener("change", function NarrativeStudioPageComponent_Case_28_Template_select_change_33_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("pointOfView", $event));
    });
    \u0275\u0275elementStart(34, "option", 46);
    \u0275\u0275text(35, "First person \u2014 I");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 47);
    \u0275\u0275text(37, "Third person \u2014 they");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "label");
    \u0275\u0275text(39, "Tone ");
    \u0275\u0275elementStart(40, "select", 45);
    \u0275\u0275listener("change", function NarrativeStudioPageComponent_Case_28_Template_select_change_40_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBible("tone", $event));
    });
    \u0275\u0275elementStart(41, "option", 48);
    \u0275\u0275text(42, "Adventure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 49);
    \u0275\u0275text(44, "Mystery");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 50);
    \u0275\u0275text(46, "Suspense");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "option", 51);
    \u0275\u0275text(48, "Hopeful");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(49, "footer", 52)(50, "button", 53);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_28_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStage("map"));
    });
    \u0275\u0275text(51, " Return to the story map ");
    \u0275\u0275elementStart(52, "span", 4);
    \u0275\u0275text(53, "\u2192");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("value", ctx_r2.runtime.state().storyTitle);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.protagonist)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.protagonist);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.immediateGoal)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.immediateGoal);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.innerFear)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.innerFear);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.islandSecret)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.islandSecret);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.companion)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.companion);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.importantObject)("placeholder", ctx_r2.runtime.config.storyBiblePrompts.importantObject);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.pointOfView);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r2.runtime.state().bible.tone);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", !ctx_r2.runtime.selectedHistoricalSetting());
  }
}
function NarrativeStudioPageComponent_Case_29_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const setting_r14 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", setting_r14.eraLabel, " \xB7 ", setting_r14.historicalEvent);
  }
}
function NarrativeStudioPageComponent_Case_29_Conditional_23_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_29_Conditional_23_For_4_Template_button_click_0_listener() {
      const choice_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.choosePath(choice_r16));
    });
    \u0275\u0275elementStart(1, "span")(2, "i");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r16 = ctx.$implicit;
    const \u0275$index_332_r17 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275$index_332_r17 + 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.playScene()?.choiceLabels?.[choice_r16.id] || choice_r16.prompt);
  }
}
function NarrativeStudioPageComponent_Case_29_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 60);
    \u0275\u0275repeaterCreate(3, NarrativeStudioPageComponent_Case_29_Conditional_23_For_4_Template, 7, 2, "button", 32, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.playNode().choiceQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.playNode().choices);
  }
}
function NarrativeStudioPageComponent_Case_29_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 4);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("You reached ", ctx_r2.playNode().mapLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.playNode().endingOutcome === "death" ? "The character has died. This path ends here. Try again and make a different choice." : "The character survives. Try another path to discover a different outcome.", " ");
  }
}
function NarrativeStudioPageComponent_Case_29_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "strong");
    \u0275\u0275text(2, "This branch is still being written.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Add choices or mark it as an ending in the Scene Writer.");
    \u0275\u0275elementEnd()();
  }
}
function NarrativeStudioPageComponent_Case_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 15)(1, "header", 40)(2, "div")(3, "span");
    \u0275\u0275text(4, "03 \xB7 Walk every trail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "Read it like a player");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Try different routes. The studio records completed paths, not every click.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 54)(10, "header")(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "article");
    \u0275\u0275conditionalCreate(16, NarrativeStudioPageComponent_Case_29_Conditional_16_Template, 2, 2, "p", 55);
    \u0275\u0275elementStart(17, "p", 56);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "h2");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 57);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, NarrativeStudioPageComponent_Case_29_Conditional_23_Template, 5, 1)(24, NarrativeStudioPageComponent_Case_29_Conditional_24_Template, 7, 2, "div", 58)(25, NarrativeStudioPageComponent_Case_29_Conditional_25_Template, 5, 0, "div", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "footer")(27, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_29_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.restartStory(ctx_r2.publishedPreview()));
    });
    \u0275\u0275text(28, " Restart from the opening");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((ctx_r2.publishedPreview() ? ctx_r2.runtime.state().published?.title : ctx_r2.runtime.state().storyTitle) || "Untitled island story");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Path ", ctx_r2.playPath().length, " \xB7 ", ctx_r2.playNode().mapLabel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.runtime.selectedHistoricalSetting()) ? 16 : -1, tmp_3_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.playStorm().label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.playScene()?.title || ctx_r2.playNode().suggestedTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.playScene()?.text || "This scene is still waiting to be written.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.playNode().choices.length ? 23 : ctx_r2.playNode().kind === "ending" ? 24 : 25);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r2.runtime.state().playtests.length, " unique path", ctx_r2.runtime.state().playtests.length === 1 ? "" : "s", " tested");
  }
}
function NarrativeStudioPageComponent_Case_30_Conditional_19_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_30_Conditional_19_For_2_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const issue_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.runtime.selectNode(issue_r20.nodeId));
    });
    \u0275\u0275text(1, " Fix scene ");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Case_30_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 4);
    \u0275\u0275text(2, "\u25CB");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, NarrativeStudioPageComponent_Case_30_Conditional_19_For_2_Conditional_4_Template, 2, 0, "button", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r20 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", issue_r20.message, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(issue_r20.nodeId ? 4 : -1);
  }
}
function NarrativeStudioPageComponent_Case_30_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, NarrativeStudioPageComponent_Case_30_Conditional_19_For_2_Template, 5, 2, "li", null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.runtime.readiness());
  }
}
function NarrativeStudioPageComponent_Case_30_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1, " Every scene has substance, the choices are distinct, and you tested more than one ending. Optional planning notes do not affect publication. ");
    \u0275\u0275elementEnd();
  }
}
function NarrativeStudioPageComponent_Case_30_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.expectation);
  }
}
function NarrativeStudioPageComponent_Case_30_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 66)(1, "div")(2, "span");
    \u0275\u0275text(3, "Published copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 17);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_30_Conditional_31_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.playPublished());
    });
    \u0275\u0275text(9, "Play published story");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r23 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(publication_r23.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("by ", publication_r23.authorDisplayName, " \xB7 ", publication_r23.publishedAt);
  }
}
function NarrativeStudioPageComponent_Case_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 16)(1, "header", 40)(2, "div")(3, "span");
    \u0275\u0275text(4, "04 \xB7 Send out the signal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "Publish a story someone can play");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Publishing freezes a reader-ready copy. You can keep revising your private draft afterward. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 61)(10, "article", 62)(11, "header")(12, "div")(13, "span");
    \u0275\u0275text(14, "Launch check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h2");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, NarrativeStudioPageComponent_Case_30_Conditional_19_Template, 3, 0, "ul")(20, NarrativeStudioPageComponent_Case_30_Conditional_20_Template, 2, 0, "p", 63);
    \u0275\u0275elementStart(21, "button", 64);
    \u0275\u0275listener("click", function NarrativeStudioPageComponent_Case_30_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.publish());
    });
    \u0275\u0275text(22, " Publish playable story ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "article", 65)(24, "span");
    \u0275\u0275text(25, "Author\u2019s field guide");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "h2");
    \u0275\u0275text(27, "What strong stories reveal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "dl");
    \u0275\u0275repeaterCreate(29, NarrativeStudioPageComponent_Case_30_For_30_Template, 5, 2, "div", null, _forTrack03);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(31, NarrativeStudioPageComponent_Case_30_Conditional_31_Template, 10, 3, "aside", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate1(" ", ctx_r2.runtime.readiness().length ? ctx_r2.runtime.readiness().length + " things to finish" : "Ready to publish", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.runtime.totalWords(), " words");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.runtime.readiness().length ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.runtime.readiness().length > 0);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r2.runtime.config.rubric);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_6_0 = ctx_r2.runtime.state().published) ? 31 : -1, tmp_6_0);
  }
}
var NarrativeStudioPageComponent = class _NarrativeStudioPageComponent {
  runtime = inject(NarrativeStudioRuntimeService);
  stages = NARRATIVE_STAGES;
  wordCount = wordCount;
  chooseNextBranch = signal(
    false,
    ...ngDevMode ? [{ debugName: "chooseNextBranch" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastSavedNodeId = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "lastSavedNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextBranchId = computed(
    () => {
      const state = this.runtime.state();
      const selectedIsOpen = wordCount(state.scenes[state.selectedNodeId].text) < 20;
      if (!this.chooseNextBranch() && selectedIsOpen)
        return state.selectedNodeId;
      const sourceId = this.lastSavedNodeId() ?? state.selectedNodeId;
      const source = this.runtime.storyConfig().nodes.find((node) => node.id === sourceId);
      const openChild = source?.choices.map((choice) => choice.nextNodeId).find((nodeId) => wordCount(state.scenes[nodeId].text) < 20);
      if (openChild)
        return openChild;
      return this.runtime.storyConfig().nodes.find((node) => node.id !== this.lastSavedNodeId() && wordCount(state.scenes[node.id].text) < 20)?.id ?? state.selectedNodeId;
    },
    ...ngDevMode ? [{ debugName: "nextBranchId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nextBranchTitle = computed(
    () => this.destinationTitle(this.nextBranchId()),
    ...ngDevMode ? [{ debugName: "nextBranchTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recommendation = computed(
    () => {
      if (this.runtime.completedSceneCount() < this.runtime.storyConfig().nodes.length)
        return {
          stage: "map",
          label: "Choose the next branch",
          purpose: "Use the map to choose a branch, then write what changes there.",
          ready: `${this.runtime.completedSceneCount()} of ${this.runtime.storyConfig().nodes.length} scenes drafted`
        };
      if (this.runtime.readiness().length)
        return {
          stage: "publish",
          label: "Finish publication checks",
          purpose: "Read different routes and check that each ending follows from the choices.",
          ready: `${this.runtime.readiness().length} publication checks remain \u2014 see Publish for the exact list`
        };
      return {
        stage: "publish",
        label: "Review and publish",
        purpose: "Share a complete story someone can play.",
        ready: "Publication checks complete"
      };
    },
    ...ngDevMode ? [{ debugName: "recommendation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openRecommended() {
    this.openStage(this.recommendation().stage);
  }
  destinationTitle(id) {
    return this.runtime.state().scenes[id]?.title || this.runtime.storyConfig().nodes.find((node) => node.id === id)?.mapLabel || id;
  }
  playNodeId = signal(
    this.runtime.config.startNodeId,
    ...ngDevMode ? [{ debugName: "playNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playPath = signal(
    [this.runtime.config.startNodeId],
    ...ngDevMode ? [{ debugName: "playPath" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publishedPreview = signal(
    false,
    ...ngDevMode ? [{ debugName: "publishedPreview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readerConfig = computed(
    () => this.publishedPreview() && this.runtime.state().published?.nodes ? __spreadProps(__spreadValues({}, this.runtime.config), { nodes: this.runtime.state().published.nodes }) : this.runtime.storyConfig(),
    ...ngDevMode ? [{ debugName: "readerConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playNode = computed(
    () => this.readerConfig().nodes.find((node) => node.id === this.playNodeId()),
    ...ngDevMode ? [{ debugName: "playNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playScene = computed(
    () => {
      const source = this.publishedPreview() ? this.runtime.state().published?.scenes : this.runtime.state().scenes;
      return source?.[this.playNodeId()];
    },
    ...ngDevMode ? [{ debugName: "playScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playStorm = computed(
    () => this.runtime.config.stormStages.find((stage) => stage.id === this.playNode().stormStageId),
    ...ngDevMode ? [{ debugName: "playStorm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  priorStage;
  priorNode;
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === "write" || target === "map" || target === "playtest" || target === "publish")
        this.openStage(target);
    });
    afterRenderEffect(() => {
      const stage = this.runtime.state().stage;
      const nodeId = stage === "playtest" ? this.playNodeId() : this.runtime.state().selectedNodeId;
      if (stage === this.priorStage && nodeId === this.priorNode)
        return;
      const interacted = this.priorStage !== void 0;
      this.priorStage = stage;
      this.priorNode = nodeId;
      const host = this.element.nativeElement;
      const view = host.ownerDocument.defaultView;
      view?.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const navigation = host.querySelector(".stage-nav");
      const activeStage = navigation?.querySelector("button.active");
      if (navigation && activeStage) {
        navigation.scrollTo({
          left: Math.max(0, activeStage.offsetLeft - (navigation.clientWidth - activeStage.offsetWidth) / 2),
          behavior: "instant"
        });
      }
      const panel = host.querySelector(".work-overlay");
      if (panel) {
        panel.scrollTop = 0;
        if (interacted && view?.matchMedia("(max-width: 780px)").matches)
          panel.scrollIntoView({ block: "nearest", behavior: "instant" });
      }
      const heading = panel?.querySelector("h1, h2");
      if (!heading)
        return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  }
  ngOnDestroy() {
    this.runtime.destroy();
  }
  canLeave() {
    this.runtime.flushSave();
    return true;
  }
  openStage(stage) {
    this.chooseNextBranch.set(false);
    this.lastSavedNodeId.set(void 0);
    this.runtime.setStage(stage);
    if (stage === "playtest")
      this.restartStory(false);
  }
  selectBranch(nodeId) {
    this.chooseNextBranch.set(false);
    this.lastSavedNodeId.set(void 0);
    this.runtime.selectNode(nodeId);
  }
  checkpointAndChooseNext() {
    this.runtime.checkpointScene();
    this.lastSavedNodeId.set(this.runtime.state().selectedNodeId);
    this.chooseNextBranch.set(true);
    const next = this.nextBranchId();
    if (next !== this.runtime.state().selectedNodeId)
      this.selectBranch(next);
  }
  selectMapNode(nodeId) {
    if (this.runtime.state().stage === "playtest") {
      this.playNodeId.set(nodeId);
      this.playPath.set([nodeId]);
      return;
    }
    this.selectBranch(nodeId);
  }
  changeBranch(action) {
    this.runtime.changeBranch(action);
    const host = this.element.nativeElement;
    host.ownerDocument.defaultView?.requestAnimationFrame(() => {
      const target = host.querySelector(action === "branch" ? ".choice-writer input" : ".branch-outcome");
      target?.scrollIntoView({ block: "nearest", behavior: "instant" });
      target?.focus({ preventScroll: true });
    });
  }
  inputValue(event) {
    return event.target.value;
  }
  updateBible(key, event) {
    this.runtime.updateBible(key, this.inputValue(event));
  }
  sceneWords() {
    return wordCount(this.runtime.selectedScene().text);
  }
  choosePath(choice) {
    const nextPath = [...this.playPath(), choice.nextNodeId];
    this.playPath.set(nextPath);
    this.playNodeId.set(choice.nextNodeId);
    const next = this.readerConfig().nodes.find((node) => node.id === choice.nextNodeId);
    if (next?.kind === "ending" && !this.publishedPreview())
      this.runtime.recordPlaytest(nextPath);
  }
  restartStory(published) {
    this.publishedPreview.set(published);
    this.playNodeId.set(this.runtime.config.startNodeId);
    this.playPath.set([this.runtime.config.startNodeId]);
  }
  playPublished() {
    this.runtime.setStage("playtest");
    this.restartStory(true);
  }
  publish() {
    if (this.runtime.publish())
      this.restartStory(true);
  }
  static \u0275fac = function NarrativeStudioPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeStudioPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativeStudioPageComponent, selectors: [["app-narrative-studio-page"]], decls: 31, vars: 16, consts: [[1, "studio-shell"], [3, "error"], [1, "studio-header"], ["routerLink", "/projects", "aria-label", "Return to project catalog", 1, "brand"], ["aria-hidden", "true"], ["aria-live", "polite", 1, "save-status"], ["aria-label", "Narrative Studio stages", 1, "stage-nav"], ["type", "button", 3, "active", "recommended"], ["title", "Story guide"], [1, "story-workspace"], [1, "story-map-backdrop"], [3, "nodeSelected", "config", "scenes", "activeNodeId", "recommendedNodeId"], [1, "writer-stage", "work-overlay"], [1, "conversation-stage", "stage-pad", "work-overlay"], [1, "bible-stage", "stage-pad", "work-overlay"], [1, "playtest-stage", "stage-pad", "work-overlay"], [1, "publish-stage", "stage-pad", "work-overlay"], ["type", "button", 3, "click"], [1, "stage-number"], [1, "stage-label"], ["tabindex", "-1", "aria-live", "polite", 1, "next-branch-prompt"], [1, "writing-desk"], [1, "scene-title", "story-name"], ["placeholder", "Give your adventure a name", 3, "input", "blur", "value"], [1, "scene-title"], [3, "input", "blur", "value"], [1, "craft-prompt"], [1, "scene-copy"], ["rows", "8", "spellcheck", "true", "placeholder", "Start with what changes for your character in this moment\u2026", 3, "input", "blur", "value"], [1, "choice-writer"], ["tabindex", "-1", 1, "branch-outcome"], [1, "branch-actions"], ["type", "button"], [1, "choice-explanation"], [3, "input", "blur", "value", "placeholder"], ["type", "button", 1, "write-destination", 3, "click", "disabled"], ["type", "button", 1, "end-path"], ["type", "button", 1, "survival-path"], ["type", "button", 1, "end-path", 3, "click"], ["type", "button", 1, "survival-path", 3, "click"], [1, "stage-heading"], [1, "bible-grid"], [1, "title-field"], ["placeholder", "Name the story you want readers to enter", 3, "input", "value"], ["rows", "2", 3, "input", "value", "placeholder"], [3, "change", "value"], ["value", "first"], ["value", "third"], ["value", "adventure"], ["value", "mystery"], ["value", "suspense"], ["value", "hopeful"], [1, "stage-action"], ["type", "button", 3, "click", "disabled"], [1, "reader-frame"], [1, "reader-history"], [1, "reader-weather"], [1, "story-copy"], [1, "ending-mark"], [1, "reader-question"], [1, "reader-choices"], [1, "publish-grid"], [1, "readiness-card"], [1, "ready-message"], ["type", "button", 1, "publish-button", 3, "click", "disabled"], [1, "rubric-card"], [1, "published-card"]], template: function NarrativeStudioPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "app-workspace-tools", 1)(2, "header", 2)(3, "a", 3)(4, "span", 4);
      \u0275\u0275text(5, "SI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div")(7, "strong");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "small");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 5);
      \u0275\u0275element(12, "i");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "nav", 6);
      \u0275\u0275repeaterCreate(15, NarrativeStudioPageComponent_For_16_Template, 6, 9, "button", 7, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "app-task-guide", 8);
      \u0275\u0275conditionalCreate(18, NarrativeStudioPageComponent_Conditional_18_Template, 1, 0, "app-narrative-coach-panel");
      \u0275\u0275elementStart(19, "p");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p");
      \u0275\u0275text(22, " Coaching and planning are optional. Your words, branch choices, and story decisions always stay yours. ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "main", 9)(24, "section", 10)(25, "app-narrative-story-map", 11);
      \u0275\u0275listener("nodeSelected", function NarrativeStudioPageComponent_Template_app_narrative_story_map_nodeSelected_25_listener($event) {
        return ctx.selectMapNode($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(26, NarrativeStudioPageComponent_Conditional_26_Template, 45, 15, "section", 12);
      \u0275\u0275conditionalCreate(27, NarrativeStudioPageComponent_Case_27_Template, 2, 0, "section", 13)(28, NarrativeStudioPageComponent_Case_28_Template, 54, 16, "section", 14)(29, NarrativeStudioPageComponent_Case_29_Template, 31, 10, "section", 15)(30, NarrativeStudioPageComponent_Case_30_Template, 32, 5, "section", 16);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_14_0;
      \u0275\u0275advance();
      \u0275\u0275property("error", ctx.runtime.saveStatus() === "error" ? "Your story could not be saved. Keep this page open." : void 0);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.runtime.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.config.subtitle);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("error", ctx.runtime.saveStatus() === "error");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.runtime.saveStatus() === "saving" ? "Saving\u2026" : ctx.runtime.saveStatus() === "error" ? "Save failed" : "Saved locally", " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.stages);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.state().stage === "write" || ctx.runtime.state().stage === "map" ? 18 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.recommendation().purpose);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("overlay-active", ctx.runtime.state().stage !== "map");
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.runtime.state().stage === "playtest" ? ctx.readerConfig() : ctx.runtime.storyConfig())("scenes", ctx.publishedPreview() && ctx.runtime.state().stage === "playtest" ? ctx.runtime.state().published.scenes : ctx.runtime.state().scenes)("activeNodeId", ctx.runtime.state().stage === "playtest" ? ctx.playNodeId() : ctx.runtime.state().selectedNodeId)("recommendedNodeId", ctx.nextBranchId());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.state().stage === "map" || ctx.runtime.state().stage === "write" ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_14_0 = ctx.runtime.state().stage) === "conversation" ? 27 : tmp_14_0 === "bible" ? 28 : tmp_14_0 === "playtest" ? 29 : tmp_14_0 === "publish" ? 30 : -1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    TaskGuideComponent,
    RouterLink,
    NarrativeCoachPanelComponent,
    NarrativePlanningConversationComponent,
    NarrativeStoryMapComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  color: #17343a;\n  background: #dce9e5;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #f2ba54;\n  outline-offset: 3px;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\n.studio-header[_ngcontent-%COMP%] {\n  z-index: 30;\n  border-bottom: 1px solid #28505a;\n  color: #edf6f3;\n  background: rgba(7, 27, 36, 0.97);\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  color: inherit;\n  text-decoration: none;\n}\n.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.9rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #6eb9b0;\n  border-radius: 50% 48% 45% 52%;\n  color: #ffe1a3;\n  background:\n    linear-gradient(\n      145deg,\n      #17616a,\n      #0a333d);\n  font: 800 0.82rem Georgia, serif;\n}\n.brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.08rem;\n}\n.brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1rem Georgia, serif;\n}\n.save-status[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.45rem;\n  color: #a9c2bf;\n  font-size: 0.8rem;\n}\n.save-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 0.48rem;\n  height: 0.48rem;\n  border-radius: 50%;\n  background: #66be8a;\n}\n.save-status[_ngcontent-%COMP%]   i.error[_ngcontent-%COMP%] {\n  background: #f17c62;\n}\n.stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-bottom: 3px solid transparent;\n  color: #6c807d;\n  background: transparent;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.stage-nav[_ngcontent-%COMP%]   .stage-number[_ngcontent-%COMP%] {\n  margin-right: 0.42rem;\n  color: #98aaa7;\n  font-family: Georgia, serif;\n}\n.stage-nav[_ngcontent-%COMP%]   .stage-label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-left: 1.55rem;\n  color: #718783;\n  font-size: 0.56rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  line-height: 1;\n  text-align: left;\n  text-transform: uppercase;\n}\n.stage-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  border-color: #d96b4b;\n  color: #173b41;\n  background:\n    linear-gradient(\n      0deg,\n      #e2eeea,\n      transparent);\n}\n.stage-heading[_ngcontent-%COMP%] {\n  align-items: start;\n  flex-direction: column;\n  gap: 8px;\n}\n.work-overlay[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  align-self: start;\n  justify-self: end;\n  width: min(720px, 68vw);\n  max-height: calc(100dvh - 108px);\n  margin: 20px 24px 20px auto;\n  overflow-y: auto;\n  border: 1px solid rgba(96, 133, 127, 0.8);\n  border-radius: 20px;\n  padding: 54px clamp(18px, 3vw, 34px) 26px;\n  background: rgba(255, 253, 245, 0.9);\n}\n.stage-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n}\n.stage-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.readiness-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rubric-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.published-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b95036;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.stage-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  color: #12353c;\n  line-height: 1;\n}\n.stage-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 30rem;\n  color: #647b79;\n  font: italic 1rem/1.55 Georgia, serif;\n}\n.bible-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.bible-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.scene-title[_ngcontent-%COMP%], \n.scene-copy[_ngcontent-%COMP%], \n.choice-writer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.42rem;\n  color: #35595c;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.bible-grid[_ngcontent-%COMP%]   .title-field[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.bible-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.bible-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.bible-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.scene-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.scene-copy[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.choice-writer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #adc4bf;\n  border-radius: 0.45rem;\n  padding: 0.78rem 0.85rem;\n  color: #17373b;\n  background: rgba(255, 255, 249, 0.94);\n  line-height: 1.5;\n}\n.bible-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.scene-copy[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.title-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-height: 3.8rem;\n  font: 1.25rem Georgia, serif;\n}\n.stage-action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 1rem;\n}\n.stage-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.publish-button[_ngcontent-%COMP%], \n.published-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 3.2rem;\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.75rem 1.1rem;\n  color: white;\n  background: #b94f35;\n  font-weight: 900;\n}\n.stage-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 1.5rem;\n}\n.next-branch-prompt[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  border: 1px solid #efbd63;\n  border-radius: 10px;\n  padding: 9px 10px;\n  color: #163e42;\n  background: #fff2c8;\n}\n.next-branch-prompt[_ngcontent-%COMP%]:focus {\n  outline: 3px solid #efbd63;\n  outline-offset: 2px;\n}\n.next-branch-prompt[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  width: 24px;\n  height: 24px;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #2f806f;\n  font-size: 0.75rem;\n}\n.next-branch-prompt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #5c6c60;\n  font-size: 0.73rem;\n  line-height: 1.35;\n}\n.next-branch-prompt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #245650;\n}\n.writing-desk[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: #f2f3e9;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #cad6ce;\n  padding-bottom: 1rem;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b34d35;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #58716e;\n  font: italic 0.9rem Georgia, serif;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #56716e;\n  font-size: 0.76rem;\n}\n.scene-title[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.scene-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font: 1.25rem Georgia, serif;\n}\n.craft-prompt[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.7rem;\n  margin: 0.9rem 0;\n  border-left: 3px solid #efbd63;\n  padding: 0.65rem 0.8rem;\n  color: #55706c;\n  background: #fff9e8;\n}\n.craft-prompt[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c88735;\n}\n.craft-prompt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n  line-height: 1.45;\n}\n.craft-prompt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #78522d;\n  font-size: 0.72rem;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.scene-copy[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  font: 1.05rem/1.75 Georgia, serif;\n}\n.choice-writer[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  margin: 1rem 0 0;\n  border: 1px solid #bdcfca;\n  border-radius: 0.6rem;\n  padding: 1rem;\n  background: #e7efea;\n}\n.choice-writer[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  padding: 0 0.4rem;\n  color: #31585a;\n  font: 700 1rem Georgia, serif;\n}\n.choice-explanation[_ngcontent-%COMP%] {\n  margin: -2px 0 2px;\n  color: #607975;\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.choice-writer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.choice-writer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #738784;\n  font-weight: 500;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 1rem;\n  color: #728480;\n  font-size: 0.76rem;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #779b94;\n  border-radius: 0.35rem;\n  padding: 0.55rem 0.75rem;\n  color: #285c5b;\n  background: #f9fcf4;\n  font-weight: 850;\n}\n.reader-frame[_ngcontent-%COMP%] {\n  max-width: 55rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #294f55;\n  border-radius: 1rem;\n  background: #fffdf1;\n}\n.reader-frame[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1.2rem;\n  color: #d7e8e3;\n  background: #0b3841;\n}\n.reader-frame[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font: 700 1rem Georgia, serif;\n}\n.reader-frame[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #a3c0bc;\n}\n.reader-history[_ngcontent-%COMP%], \n.reader-weather[_ngcontent-%COMP%] {\n  color: #c05a3e;\n  font-size: 0.72rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.reader-history[_ngcontent-%COMP%] {\n  margin-bottom: 0.35rem;\n  color: #567c76;\n}\n.reader-frame[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 1.4rem;\n  color: #163d42;\n  font-size: clamp(2rem, 5vw, 3.4rem);\n}\n.story-copy[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  color: #28474a;\n  font: 1.1rem/1.85 Georgia, serif;\n}\n.reader-choices[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n.reader-question[_ngcontent-%COMP%] {\n  margin: 24px 0 10px;\n  color: #173f43;\n  font: 700 1.2rem Georgia, serif;\n}\n.reader-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  min-height: 4rem;\n  border: 1px solid #78a39a;\n  border-radius: 0.55rem;\n  padding: 0.8rem 1rem;\n  color: #194c4e;\n  background: #e5f0e8;\n  font-weight: 850;\n  text-align: left;\n}\n.reader-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.reader-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  width: 26px;\n  height: 26px;\n  place-items: center;\n  border: 2px solid currentColor;\n  border-radius: 50%;\n  font-size: 0.72rem;\n  font-style: normal;\n}\n.ending-mark[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n  margin-top: 2.5rem;\n  border-top: 1px solid #e0c38a;\n  padding-top: 1.5rem;\n  color: #76522e;\n  text-align: center;\n}\n.ending-mark[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c78631;\n  font-size: 1.7rem;\n}\n.ending-mark[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1.2rem Georgia, serif;\n}\n.ending-mark[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #806f58;\n}\n.reader-frame[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  border-top: 1px solid #d7ded5;\n  padding: 0.8rem 1.2rem;\n  color: #647a77;\n  background: #eff3e9;\n  font-size: 0.78rem;\n}\n.reader-frame[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #176365;\n  background: transparent;\n  font-weight: 900;\n}\n.publish-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.8fr);\n  gap: 1rem;\n}\n.readiness-card[_ngcontent-%COMP%], \n.rubric-card[_ngcontent-%COMP%] {\n  border: 1px solid #b4c7c2;\n  border-radius: 0.8rem;\n  padding: 1.2rem;\n  background: rgba(255, 255, 248, 0.93);\n}\n.readiness-card[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.readiness-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.rubric-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  color: #173f43;\n  font-size: 1.6rem;\n}\n.readiness-card[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #63807b;\n  font-size: 0.8rem;\n}\n.readiness-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  margin: 1rem 0;\n  padding: 0;\n  list-style: none;\n}\n.readiness-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border-bottom: 1px solid #e1e6dd;\n  padding: 0.45rem 0;\n  color: #536b68;\n  line-height: 1.4;\n}\n.readiness-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #c25a3e;\n}\n.readiness-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  border: 0;\n  color: #17666a;\n  background: transparent;\n  font-size: 0.75rem;\n  font-weight: 900;\n}\n.ready-message[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  color: #3b6e60;\n  line-height: 1.6;\n}\n.publish-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.rubric-card[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  margin-bottom: 0;\n}\n.rubric-card[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  border-top: 1px solid #d7dfd6;\n  padding-top: 0.65rem;\n}\n.rubric-card[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #2d5e5d;\n  font-weight: 900;\n}\n.rubric-card[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  color: #657a76;\n  line-height: 1.45;\n}\n.published-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 1rem;\n  border: 1px solid #d1a25f;\n  border-radius: 0.7rem;\n  padding: 1rem 1.2rem;\n  background: #fff0c9;\n}\n.published-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.22rem;\n}\n.published-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #5b3d23;\n  font: 700 1.2rem Georgia, serif;\n}\n.published-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #866c4d;\n}\n@media (max-width: 780px) {\n  .bible-grid[_ngcontent-%COMP%], \n   .publish-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stage-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (max-width: 520px) {\n  .brand[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .save-status[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n  .reader-choices[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .choice-writer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .reader-frame[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%], \n   .published-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    scroll-behavior: auto !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  z-index: 3;\n  padding: 10px;\n  background: #f7efdf;\n  border-top: 1px solid #b6a883;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  max-width: 65%;\n  font-size: 13px;\n}\n.choice-writer[_ngcontent-%COMP%] {\n  padding: 10px;\n  gap: 8px;\n}\n.studio-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  display: grid;\n  grid-template-columns: minmax(12rem, auto) minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 12px;\n  min-height: 68px;\n  padding: 10px 22px;\n}\n.studio-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n  grid-column: 1;\n  grid-row: 1;\n  margin-right: 0;\n}\n.studio-header[_ngcontent-%COMP%]   .stage-nav[_ngcontent-%COMP%] {\n  position: static;\n  grid-column: 2;\n  grid-row: 1;\n  min-width: 0;\n  padding: 0;\n  border: 0;\n  background: none;\n  display: flex;\n  justify-content: flex-start;\n  gap: 4px;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scroll-snap-type: x proximity;\n}\n.studio-header[_ngcontent-%COMP%]   .save-status[_ngcontent-%COMP%] {\n  grid-column: 3;\n  grid-row: 1;\n}\n.studio-header[_ngcontent-%COMP%]   app-task-guide[_ngcontent-%COMP%] {\n  grid-column: 4;\n  grid-row: 1;\n}\n.stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 0 0 auto;\n  min-width: auto;\n  min-height: 44px;\n  padding: 10px 12px;\n  scroll-snap-align: center;\n}\n.stage-nav[_ngcontent-%COMP%]   button.recommended[_ngcontent-%COMP%]:not(.active)::after {\n  content: "";\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #efbd63;\n  box-shadow: 0 0 0 2px #17343a;\n}\n.stage-heading[_ngcontent-%COMP%] {\n  gap: 24px;\n  margin-bottom: 12px;\n  padding: 4px 0 12px;\n}\n.stage-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(25px, 2.5vw, 36px);\n}\n.bible-grid[_ngcontent-%COMP%] {\n  gap: 11px;\n}\n.bible-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.bible-grid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.bible-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding-block: 10px;\n}\n.title-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n.writing-desk[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 16px clamp(16px, 3vw, 36px) 24px;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #173f43;\n  font-size: clamp(20px, 2vw, 27px);\n  line-height: 1.05;\n}\nmain[_ngcontent-%COMP%]   h1[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.scene-title[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.craft-prompt[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n.scene-copy[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 132px;\n  height: clamp(132px, 19dvh, 190px);\n}\n.reader-frame[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%] {\n  min-height: 0;\n  padding: clamp(24px, 4vw, 42px);\n}\n.reader-choices[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n@media (max-width: 780px) {\n  .studio-header[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 8px;\n    min-height: 0;\n    padding: 8px 12px;\n  }\n  .studio-header[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .studio-header[_ngcontent-%COMP%]   .save-status[_ngcontent-%COMP%] {\n    grid-column: 2;\n    grid-row: 1;\n    justify-self: end;\n  }\n  .studio-header[_ngcontent-%COMP%]   app-task-guide[_ngcontent-%COMP%] {\n    grid-column: 3;\n    grid-row: 1;\n  }\n  .studio-header[_ngcontent-%COMP%]   .stage-nav[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n    grid-row: 2;\n    width: 100%;\n  }\n  .stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px 10px;\n  }\n  .stage-heading[_ngcontent-%COMP%] {\n    gap: 6px;\n    margin-bottom: 12px;\n  }\n  .stage-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n  .map-next-action[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .map-next-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.story-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  align-items: start;\n  gap: 20px;\n  padding: 22px;\n  background: #e6eee7;\n  overflow: visible;\n}\n.story-map-backdrop[_ngcontent-%COMP%] {\n  grid-area: auto;\n  position: sticky;\n  top: 90px;\n  height: auto;\n  padding: 0;\n  overflow: visible;\n}\n.map-heading[_ngcontent-%COMP%] {\n  padding: 8px 4px 18px;\n}\n.map-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  color: #8b5634;\n}\n.map-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(22px, 2.3vw, 32px);\n  margin: 8px 0;\n}\n.map-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n  max-width: 480px;\n  color: #506c61;\n}\n.map-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  color: #46715e;\n}\n.story-workspace[_ngcontent-%COMP%]   .work-overlay[_ngcontent-%COMP%] {\n  grid-area: auto;\n  justify-self: stretch;\n  width: 100%;\n  min-width: 0;\n  margin: 0;\n  max-height: calc(100dvh - 112px);\n  padding: 24px;\n  border-radius: 16px;\n  background: #fffdf5;\n  box-shadow: 0 5px 20px rgba(41, 75, 60, 0.0392156863);\n}\n.story-workspace[_ngcontent-%COMP%]   .writer-stage[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.writing-desk[_ngcontent-%COMP%] {\n  background: #fffdf5;\n  padding: 22px;\n}\n.writing-desk[_ngcontent-%COMP%]   .story-name[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n}\n.writing-desk[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  line-height: 1.45;\n}\n.scene-copy[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  height: 230px;\n  min-height: 190px;\n}\n.choice-writer[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 12px;\n  padding: 16px;\n  gap: 8px;\n  background: #edf3ec;\n}\n.choice-writer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 2px;\n}\n.choice-writer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 10px;\n  background: white;\n}\n.write-destination[_ngcontent-%COMP%] {\n  justify-self: start;\n  min-height: 44px;\n  padding: 8px 0;\n  margin-bottom: 4px;\n  border: 0;\n  background: transparent;\n  color: #1f665e;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 800;\n}\n.branch-outcome[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  color: #416654;\n}\n.branch-outcome[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.branch-outcome[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  font-size: 11px;\n}\n.branch-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n}\n.branch-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #287065;\n  border-radius: 8px;\n  padding: 10px 14px;\n  background: #20665d;\n  color: white;\n  font-weight: 700;\n}\n.branch-actions[_ngcontent-%COMP%]   .end-path[_ngcontent-%COMP%] {\n  border-color: #bc8c51;\n  color: #7b522b;\n  background: #fff3da;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%] {\n  gap: 12px;\n  margin-top: 20px;\n  font-size: 11px;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  max-width: 55%;\n}\n.writing-desk[_ngcontent-%COMP%]    > footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.publish-grid[_ngcontent-%COMP%], \n.reader-choices[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #bdd3cb;\n}\n.stage-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #b7c8bf;\n}\n.stage-nav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff9e5;\n  background: #244b47;\n}\n@media (max-width: 780px) {\n  .story-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 12px;\n    gap: 14px;\n  }\n  .story-map-backdrop[_ngcontent-%COMP%] {\n    position: static;\n    height: auto;\n  }\n  .map-heading[_ngcontent-%COMP%] {\n    padding: 0 2px 12px;\n  }\n  .story-workspace[_ngcontent-%COMP%]   .work-overlay[_ngcontent-%COMP%] {\n    max-height: none;\n    padding: 18px;\n    margin: 0;\n    width: 100%;\n  }\n  .story-workspace[_ngcontent-%COMP%]   .writer-stage[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .writing-desk[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n}\n/*# sourceMappingURL=narrative-studio-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeStudioPageComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-studio-page", imports: [
      WorkspaceToolsComponent,
      TaskGuideComponent,
      RouterLink,
      NarrativeCoachPanelComponent,
      NarrativePlanningConversationComponent,
      NarrativeStoryMapComponent
    ], template: `<div class="studio-shell">\r
  <app-workspace-tools [error]="runtime.saveStatus() === 'error' ? 'Your story could not be saved. Keep this page open.' : undefined"><header class="studio-header">\r
    <a class="brand" routerLink="/projects" aria-label="Return to project catalog">\r
      <span aria-hidden="true">SI</span>\r
      <div>\r
        <strong>{{ runtime.config.title }}</strong\r
        ><small>{{ runtime.config.subtitle }}</small>\r
      </div>\r
    </a>\r
    <div class="save-status" aria-live="polite">\r
      <i [class.error]="runtime.saveStatus() === 'error'"></i>\r
      {{\r
        runtime.saveStatus() === 'saving'\r
          ? 'Saving\u2026'\r
          : runtime.saveStatus() === 'error'\r
            ? 'Save failed'\r
            : 'Saved locally'\r
      }}\r
    </div>\r
    <nav class="stage-nav" aria-label="Narrative Studio stages">\r
      @for (stage of stages; track stage.id; let index = $index) {\r
        <button\r
          type="button"\r
          [class.active]="runtime.state().stage === stage.id"\r
          [class.recommended]="\r
            runtime.state().stage !== stage.id && recommendation().stage === stage.id\r
          "\r
          [attr.aria-current]="runtime.state().stage === stage.id ? 'step' : null"\r
          [attr.aria-label]="\r
            stage.label +\r
            (stage.optional ? ', optional' : '') +\r
            (runtime.state().stage !== stage.id && recommendation().stage === stage.id\r
              ? ', recommended next step'\r
              : '')\r
          "\r
          (click)="openStage(stage.id)"\r
        >\r
          <span class="stage-number">0{{ index + 1 }}</span>\r
          <span class="stage-label">{{ stage.label }}</span>\r
          @if (stage.optional) {\r
            <small>Optional</small>\r
          }\r
        </button>\r
      }\r
    </nav>\r
    <app-task-guide title="Story guide">\r
      @if (runtime.state().stage === 'write' || runtime.state().stage === 'map') {\r
        <app-narrative-coach-panel />\r
      }\r
      <p>{{ recommendation().purpose }}</p>\r
      <p>\r
        Coaching and planning are optional. Your words, branch choices, and story decisions always\r
        stay yours.\r
      </p></app-task-guide\r
    >\r
  </header></app-workspace-tools>\r
\r
  <main class="story-workspace" [class.overlay-active]="runtime.state().stage !== 'map'">\r
    <section class="story-map-backdrop">\r
\r
      <app-narrative-story-map\r
        [config]="runtime.state().stage === 'playtest' ? readerConfig() : runtime.storyConfig()"\r
        [scenes]="\r
          publishedPreview() && runtime.state().stage === 'playtest'\r
            ? runtime.state().published!.scenes\r
            : runtime.state().scenes\r
        "\r
        [activeNodeId]="\r
          runtime.state().stage === 'playtest' ? playNodeId() : runtime.state().selectedNodeId\r
        "\r
        [recommendedNodeId]="nextBranchId()"\r
        (nodeSelected)="selectMapNode($event)"\r
      />\r
    </section>\r
\r
    @if (runtime.state().stage === 'map' || runtime.state().stage === 'write') {\r
      <section class="writer-stage work-overlay">\r
        @if (chooseNextBranch()) {\r
          <div class="next-branch-prompt" tabindex="-1" aria-live="polite">\r
            <span aria-hidden="true">\u2713</span>\r
            <p>\r
              <strong>Saved in this spot.</strong>\r
              Choose another scene on the map, or playtest your story to try its choices.\r
            </p>\r
          </div>\r
        }\r
        <article class="writing-desk">\r
          <label class="scene-title story-name"\r
            ><span>Story title</span\r
            ><input\r
              [value]="runtime.state().storyTitle"\r
              placeholder="Give your adventure a name"\r
              (input)="runtime.updateStoryTitle(inputValue($event))"\r
              (blur)="runtime.flushSave()"\r
          /></label>\r
          <header>\r
            <div>\r
              <span>{{ runtime.selectedNode().mapLabel }}</span>\r
              <h1>\r
                {{ runtime.selectedScene().title || runtime.selectedNode().suggestedTitle }}\r
              </h1>\r
              <small>{{ runtime.selectedNode().purpose }}</small>\r
            </div>\r
            <strong>{{ sceneWords() }} words</strong>\r
          </header>\r
          <label class="scene-title"\r
            ><span>Scene title</span\r
            ><input\r
              [value]="runtime.selectedScene().title"\r
              (input)="runtime.updateSceneTitle(inputValue($event))"\r
              (blur)="runtime.checkpointScene()"\r
          /></label>\r
          <div class="craft-prompt">\r
            <span aria-hidden="true">\u2726</span>\r
            <p><strong>Craft target</strong>{{ runtime.selectedNode().craftPrompt }}</p>\r
          </div>\r
          <label class="scene-copy"\r
            ><span>Write the scene in your words</span\r
            ><textarea\r
              [value]="runtime.selectedScene().text"\r
              rows="8"\r
              spellcheck="true"\r
              placeholder="Start with what changes for your character in this moment\u2026"\r
              (input)="runtime.updateSceneText(inputValue($event))"\r
              (blur)="runtime.checkpointScene()"\r
            ></textarea>\r
          </label>\r
          @if (runtime.selectedNode().choices.length) {\r
            <fieldset class="choice-writer">\r
              <legend>{{ runtime.selectedNode().choiceQuestion }}</legend>\r
              <p class="choice-explanation">\r
                Write the two decisions the reader can make. Each option follows its matching\r
                numbered line on the story map.\r
              </p>\r
              @for (choice of runtime.selectedNode().choices; track choice.id; let index = $index) {\r
                <label\r
                  ><span\r
                    >Choice {{ index + 1 }}\r
                    <small>leads to {{ destinationTitle(choice.nextNodeId) }}</small></span\r
                  ><input\r
                    [value]="runtime.selectedScene().choiceLabels[choice.id]"\r
                    [placeholder]="choice.prompt"\r
                    (input)="runtime.updateChoice(choice.id, inputValue($event))"\r
                    (blur)="runtime.checkpointScene()"\r
                /></label>\r
                <button\r
                  class="write-destination"\r
                  type="button"\r
                  [disabled]="!runtime.selectedScene().choiceLabels[choice.id]?.trim()"\r
                  (click)="selectBranch(choice.nextNodeId)"\r
                >\r
                  Write the story for choice {{ index + 1 }} <span aria-hidden="true">\u2192</span>\r
                </button>\r
              }\r
            </fieldset>\r
          }\r
          <div class="branch-outcome" tabindex="-1">\r
            @if (runtime.selectedNode().kind === 'ending') {\r
              <strong>{{\r
                runtime.selectedNode().endingOutcome === 'death'\r
                  ? '\xD7 Dead end \xB7 The character dies'\r
                  : '\u2726 Survival ending'\r
              }}</strong>\r
              <p>\r
                {{\r
                  runtime.selectedNode().endingOutcome === 'death'\r
                    ? 'Write how this choice leads to the fictional character\u2019s death. This path has no more choices.'\r
                    : 'Write the final moment that shows how the character survives and what changes for them.'\r
                }}\r
              </p>\r
            } @else if (!runtime.selectedNode().choices.length) {\r
              <strong>What happens after this scene?</strong>\r
              <p>\r
                Add two choices to keep going, end this path with the character\u2019s death, or write a\r
                survival ending.\r
              </p>\r
            }\r
            <div class="branch-actions">\r
              @if (!runtime.selectedNode().choices.length) {\r
                <button type="button" (click)="changeBranch('branch')">\r
                  {{\r
                    runtime.selectedScene().parkedChoices?.length\r
                      ? 'Restore my continuation'\r
                      : 'Add two choices'\r
                  }}\r
                </button>\r
              }\r
              @if (runtime.selectedNode().id !== runtime.config.startNodeId) {\r
                @if (runtime.selectedNode().endingOutcome !== 'death') {\r
                  <button type="button" class="end-path" (click)="changeBranch('end')">\r
                    Dead end \xB7 Character dies\r
                  </button>\r
                }\r
                @if (runtime.selectedNode().endingOutcome !== 'survival') {\r
                  <button type="button" class="survival-path" (click)="changeBranch('finish')">\r
                    Survival ending\r
                  </button>\r
                }\r
              }\r
            </div>\r
            @if (\r
              runtime.selectedNode().choices.length &&\r
              runtime.selectedNode().id !== runtime.config.startNodeId\r
            ) {\r
              <small>Ending here keeps later drafts so you can restore them.</small>\r
            }\r
          </div>\r
          <footer>\r
            <span\r
              >{{ runtime.selectedScene().revisions.length }} checkpoints \xB7 Draft saves locally; a\r
              checkpoint preserves a revision.</span\r
            ><button type="button" (click)="checkpointAndChooseNext()">\r
              Save here & choose next\r
            </button>\r
          </footer>\r
        </article>\r
      </section>\r
    }\r
\r
    @switch (runtime.state().stage) {\r
      @case ('conversation') {\r
        <section class="conversation-stage stage-pad work-overlay">\r
          <app-narrative-planning-conversation />\r
        </section>\r
      }\r
      @case ('bible') {\r
        <section class="bible-stage stage-pad work-overlay">\r
          <header class="stage-heading">\r
            <div>\r
              <span>Optional \xB7 Keep ideas nearby</span>\r
              <h1>Your Story Notes</h1>\r
            </div>\r
            <p>\r
              Your conversation filled these notes. Revise anything that does not sound like you.\r
            </p>\r
          </header>\r
          <div class="bible-grid">\r
            <label class="title-field"\r
              >Story title\r
              <input\r
                [value]="runtime.state().storyTitle"\r
                placeholder="Name the story you want readers to enter"\r
                (input)="runtime.updateStoryTitle(inputValue($event))"\r
              />\r
            </label>\r
            <label\r
              >Protagonist\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.protagonist"\r
                [placeholder]="runtime.config.storyBiblePrompts.protagonist"\r
                (input)="updateBible('protagonist', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >Immediate goal\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.immediateGoal"\r
                [placeholder]="runtime.config.storyBiblePrompts.immediateGoal"\r
                (input)="updateBible('immediateGoal', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >Inner fear or flaw\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.innerFear"\r
                [placeholder]="runtime.config.storyBiblePrompts.innerFear"\r
                (input)="updateBible('innerFear', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >Unknown truth or mystery\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.islandSecret"\r
                [placeholder]="runtime.config.storyBiblePrompts.islandSecret"\r
                (input)="updateBible('islandSecret', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >Companion, rival, or mystery presence\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.companion"\r
                [placeholder]="runtime.config.storyBiblePrompts.companion"\r
                (input)="updateBible('companion', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >One important object\r
              <textarea\r
                rows="2"\r
                [value]="runtime.state().bible.importantObject"\r
                [placeholder]="runtime.config.storyBiblePrompts.importantObject"\r
                (input)="updateBible('importantObject', $event)"\r
              ></textarea>\r
            </label>\r
            <label\r
              >Point of view\r
              <select\r
                [value]="runtime.state().bible.pointOfView"\r
                (change)="updateBible('pointOfView', $event)"\r
              >\r
                <option value="first">First person \u2014 I</option>\r
                <option value="third">Third person \u2014 they</option>\r
              </select>\r
            </label>\r
            <label\r
              >Tone\r
              <select [value]="runtime.state().bible.tone" (change)="updateBible('tone', $event)">\r
                <option value="adventure">Adventure</option>\r
                <option value="mystery">Mystery</option>\r
                <option value="suspense">Suspense</option>\r
                <option value="hopeful">Hopeful</option>\r
              </select>\r
            </label>\r
          </div>\r
          <footer class="stage-action">\r
            <button\r
              type="button"\r
              [disabled]="!runtime.selectedHistoricalSetting()"\r
              (click)="openStage('map')"\r
            >\r
              Return to the story map <span aria-hidden="true">\u2192</span>\r
            </button>\r
          </footer>\r
        </section>\r
      }\r
      @case ('playtest') {\r
        <section class="playtest-stage stage-pad work-overlay">\r
          <header class="stage-heading">\r
            <div>\r
              <span>03 \xB7 Walk every trail</span>\r
              <h1>Read it like a player</h1>\r
            </div>\r
            <p>Try different routes. The studio records completed paths, not every click.</p>\r
          </header>\r
          <div class="reader-frame">\r
            <header>\r
              <span>{{\r
                (publishedPreview()\r
                  ? runtime.state().published?.title\r
                  : runtime.state().storyTitle) || 'Untitled island story'\r
              }}</span\r
              ><small>Path {{ playPath().length }} \xB7 {{ playNode().mapLabel }}</small>\r
            </header>\r
            <article>\r
              @if (runtime.selectedHistoricalSetting(); as setting) {\r
                <p class="reader-history">{{ setting.eraLabel }} \xB7 {{ setting.historicalEvent }}</p>\r
              }\r
              <p class="reader-weather">{{ playStorm().label }}</p>\r
              <h2>{{ playScene()?.title || playNode().suggestedTitle }}</h2>\r
              <div class="story-copy">\r
                {{ playScene()?.text || 'This scene is still waiting to be written.' }}\r
              </div>\r
              @if (playNode().choices.length) {\r
                <h3 class="reader-question">{{ playNode().choiceQuestion }}</h3>\r
                <div class="reader-choices">\r
                  @for (choice of playNode().choices; track choice.id; let index = $index) {\r
                    <button type="button" (click)="choosePath(choice)">\r
                      <span\r
                        ><i>{{ index + 1 }}</i\r
                        >{{ playScene()?.choiceLabels?.[choice.id] || choice.prompt }}</span\r
                      ><span aria-hidden="true">\u2192</span>\r
                    </button>\r
                  }\r
                </div>\r
              } @else if (playNode().kind === 'ending') {\r
                <div class="ending-mark">\r
                  <span aria-hidden="true">\u2726</span\r
                  ><strong>You reached {{ playNode().mapLabel }}</strong>\r
                  <p>\r
                    {{\r
                      playNode().endingOutcome === 'death'\r
                        ? 'The character has died. This path ends here. Try again and make a different choice.'\r
                        : 'The character survives. Try another path to discover a different outcome.'\r
                    }}\r
                  </p>\r
                </div>\r
              } @else {\r
                <div class="ending-mark">\r
                  <strong>This branch is still being written.</strong>\r
                  <p>Add choices or mark it as an ending in the Scene Writer.</p>\r
                </div>\r
              }\r
            </article>\r
            <footer>\r
              <button type="button" (click)="restartStory(publishedPreview())">\r
                Restart from the opening</button\r
              ><span\r
                >{{ runtime.state().playtests.length }} unique path{{\r
                  runtime.state().playtests.length === 1 ? '' : 's'\r
                }}\r
                tested</span\r
              >\r
            </footer>\r
          </div>\r
        </section>\r
      }\r
      @case ('publish') {\r
        <section class="publish-stage stage-pad work-overlay">\r
          <header class="stage-heading">\r
            <div>\r
              <span>04 \xB7 Send out the signal</span>\r
              <h1>Publish a story someone can play</h1>\r
            </div>\r
            <p>\r
              Publishing freezes a reader-ready copy. You can keep revising your private draft\r
              afterward.\r
            </p>\r
          </header>\r
          <div class="publish-grid">\r
            <article class="readiness-card">\r
              <header>\r
                <div>\r
                  <span>Launch check</span>\r
                  <h2>\r
                    {{\r
                      runtime.readiness().length\r
                        ? runtime.readiness().length + ' things to finish'\r
                        : 'Ready to publish'\r
                    }}\r
                  </h2>\r
                </div>\r
                <strong>{{ runtime.totalWords() }} words</strong>\r
              </header>\r
              @if (runtime.readiness().length) {\r
                <ul>\r
                  @for (issue of runtime.readiness(); track issue.code + issue.message) {\r
                    <li>\r
                      <span aria-hidden="true">\u25CB</span>{{ issue.message }}\r
                      @if (issue.nodeId) {\r
                        <button type="button" (click)="runtime.selectNode(issue.nodeId)">\r
                          Fix scene\r
                        </button>\r
                      }\r
                    </li>\r
                  }\r
                </ul>\r
              } @else {\r
                <p class="ready-message">\r
                  Every scene has substance, the choices are distinct, and you tested more than one\r
                  ending. Optional planning notes do not affect publication.\r
                </p>\r
              }\r
              <button\r
                class="publish-button"\r
                type="button"\r
                [disabled]="runtime.readiness().length > 0"\r
                (click)="publish()"\r
              >\r
                Publish playable story\r
              </button>\r
            </article>\r
            <article class="rubric-card">\r
              <span>Author\u2019s field guide</span>\r
              <h2>What strong stories reveal</h2>\r
              <dl>\r
                @for (item of runtime.config.rubric; track item.id) {\r
                  <div>\r
                    <dt>{{ item.label }}</dt>\r
                    <dd>{{ item.expectation }}</dd>\r
                  </div>\r
                }\r
              </dl>\r
            </article>\r
          </div>\r
          @if (runtime.state().published; as publication) {\r
            <aside class="published-card">\r
              <div>\r
                <span>Published copy</span><strong>{{ publication.title }}</strong\r
                ><small\r
                  >by {{ publication.authorDisplayName }} \xB7 {{ publication.publishedAt }}</small\r
                >\r
              </div>\r
              <button type="button" (click)="playPublished()">Play published story</button>\r
            </aside>\r
          }\r
        </section>\r
      }\r
    }\r
  </main>\r
</div>\r
`, styles: ['/* src/app/templates/narrative-studio/ui/narrative-studio-page.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  color: #17343a;\n  background: #dce9e5;\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible,\na:focus-visible {\n  outline: 3px solid #f2ba54;\n  outline-offset: 3px;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.48;\n}\nh1,\nh2,\np {\n  margin: 0;\n}\nh1,\nh2 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n}\n.studio-header {\n  z-index: 30;\n  border-bottom: 1px solid #28505a;\n  color: #edf6f3;\n  background: rgba(7, 27, 36, 0.97);\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  color: inherit;\n  text-decoration: none;\n}\n.brand > span {\n  display: grid;\n  width: 2.9rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border: 1px solid #6eb9b0;\n  border-radius: 50% 48% 45% 52%;\n  color: #ffe1a3;\n  background:\n    linear-gradient(\n      145deg,\n      #17616a,\n      #0a333d);\n  font: 800 0.82rem Georgia, serif;\n}\n.brand div {\n  display: grid;\n  gap: 0.08rem;\n}\n.brand strong {\n  font: 700 1rem Georgia, serif;\n}\n.save-status {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.45rem;\n  color: #a9c2bf;\n  font-size: 0.8rem;\n}\n.save-status i {\n  width: 0.48rem;\n  height: 0.48rem;\n  border-radius: 50%;\n  background: #66be8a;\n}\n.save-status i.error {\n  background: #f17c62;\n}\n.stage-nav button {\n  border: 0;\n  border-bottom: 3px solid transparent;\n  color: #6c807d;\n  background: transparent;\n  font-size: 0.78rem;\n  font-weight: 850;\n}\n.stage-nav .stage-number {\n  margin-right: 0.42rem;\n  color: #98aaa7;\n  font-family: Georgia, serif;\n}\n.stage-nav .stage-label {\n  white-space: nowrap;\n}\n.stage-nav button small {\n  display: block;\n  margin-left: 1.55rem;\n  color: #718783;\n  font-size: 0.56rem;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  line-height: 1;\n  text-align: left;\n  text-transform: uppercase;\n}\n.stage-nav button.active {\n  border-color: #d96b4b;\n  color: #173b41;\n  background:\n    linear-gradient(\n      0deg,\n      #e2eeea,\n      transparent);\n}\n.stage-heading {\n  align-items: start;\n  flex-direction: column;\n  gap: 8px;\n}\n.work-overlay {\n  position: relative;\n  z-index: 2;\n  align-self: start;\n  justify-self: end;\n  width: min(720px, 68vw);\n  max-height: calc(100dvh - 108px);\n  margin: 20px 24px 20px auto;\n  overflow-y: auto;\n  border: 1px solid rgba(96, 133, 127, 0.8);\n  border-radius: 20px;\n  padding: 54px clamp(18px, 3vw, 34px) 26px;\n  background: rgba(255, 253, 245, 0.9);\n}\n.stage-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 2rem;\n}\n.stage-heading span,\n.readiness-card header span,\n.rubric-card > span,\n.published-card span {\n  color: #b95036;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.13em;\n  text-transform: uppercase;\n}\n.stage-heading h1 {\n  margin-top: 0.3rem;\n  color: #12353c;\n  line-height: 1;\n}\n.stage-heading > p {\n  max-width: 30rem;\n  color: #647b79;\n  font: italic 1rem/1.55 Georgia, serif;\n}\n.bible-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n.bible-grid label,\n.scene-title,\n.scene-copy,\n.choice-writer label {\n  display: grid;\n  gap: 0.42rem;\n  color: #35595c;\n  font-size: 0.82rem;\n  font-weight: 850;\n}\n.bible-grid .title-field {\n  grid-column: 1/-1;\n}\n.bible-grid input,\n.bible-grid textarea,\n.bible-grid select,\n.scene-title input,\n.scene-copy textarea,\n.choice-writer input {\n  width: 100%;\n  border: 1px solid #adc4bf;\n  border-radius: 0.45rem;\n  padding: 0.78rem 0.85rem;\n  color: #17373b;\n  background: rgba(255, 255, 249, 0.94);\n  line-height: 1.5;\n}\n.bible-grid textarea,\n.scene-copy textarea {\n  resize: vertical;\n}\n.title-field input {\n  min-height: 3.8rem;\n  font: 1.25rem Georgia, serif;\n}\n.stage-action {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 1rem;\n}\n.stage-action button,\n.publish-button,\n.published-card button {\n  min-height: 3.2rem;\n  border: 0;\n  border-radius: 0.45rem;\n  padding: 0.75rem 1.1rem;\n  color: white;\n  background: #b94f35;\n  font-weight: 900;\n}\n.stage-action button span {\n  margin-left: 1.5rem;\n}\n.next-branch-prompt {\n  display: flex;\n  gap: 9px;\n  border: 1px solid #efbd63;\n  border-radius: 10px;\n  padding: 9px 10px;\n  color: #163e42;\n  background: #fff2c8;\n}\n.next-branch-prompt:focus {\n  outline: 3px solid #efbd63;\n  outline-offset: 2px;\n}\n.next-branch-prompt > span {\n  display: grid;\n  flex: 0 0 auto;\n  width: 24px;\n  height: 24px;\n  place-items: center;\n  border-radius: 50%;\n  color: white;\n  background: #2f806f;\n  font-size: 0.75rem;\n}\n.next-branch-prompt p {\n  color: #5c6c60;\n  font-size: 0.73rem;\n  line-height: 1.35;\n}\n.next-branch-prompt strong {\n  display: block;\n  color: #245650;\n}\n.writing-desk {\n  min-width: 0;\n  background: #f2f3e9;\n}\n.writing-desk > header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid #cad6ce;\n  padding-bottom: 1rem;\n}\n.writing-desk > header div {\n  display: grid;\n  gap: 0.25rem;\n}\n.writing-desk > header span {\n  color: #b34d35;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.writing-desk > header small {\n  color: #58716e;\n  font: italic 0.9rem Georgia, serif;\n}\n.writing-desk > header > strong {\n  color: #56716e;\n  font-size: 0.76rem;\n}\n.scene-title {\n  margin-top: 1rem;\n}\n.scene-title input {\n  font: 1.25rem Georgia, serif;\n}\n.craft-prompt {\n  display: flex;\n  gap: 0.7rem;\n  margin: 0.9rem 0;\n  border-left: 3px solid #efbd63;\n  padding: 0.65rem 0.8rem;\n  color: #55706c;\n  background: #fff9e8;\n}\n.craft-prompt > span {\n  color: #c88735;\n}\n.craft-prompt p {\n  display: grid;\n  gap: 0.15rem;\n  line-height: 1.45;\n}\n.craft-prompt strong {\n  color: #78522d;\n  font-size: 0.72rem;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.scene-copy textarea {\n  font: 1.05rem/1.75 Georgia, serif;\n}\n.choice-writer {\n  display: grid;\n  gap: 0.75rem;\n  margin: 1rem 0 0;\n  border: 1px solid #bdcfca;\n  border-radius: 0.6rem;\n  padding: 1rem;\n  background: #e7efea;\n}\n.choice-writer legend {\n  padding: 0 0.4rem;\n  color: #31585a;\n  font: 700 1rem Georgia, serif;\n}\n.choice-explanation {\n  margin: -2px 0 2px;\n  color: #607975;\n  font-size: 0.76rem;\n  line-height: 1.45;\n}\n.choice-writer label > span {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.choice-writer small {\n  color: #738784;\n  font-weight: 500;\n}\n.writing-desk > footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 1rem;\n  color: #728480;\n  font-size: 0.76rem;\n}\n.writing-desk > footer button {\n  border: 1px solid #779b94;\n  border-radius: 0.35rem;\n  padding: 0.55rem 0.75rem;\n  color: #285c5b;\n  background: #f9fcf4;\n  font-weight: 850;\n}\n.reader-frame {\n  max-width: 55rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #294f55;\n  border-radius: 1rem;\n  background: #fffdf1;\n}\n.reader-frame > header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1.2rem;\n  color: #d7e8e3;\n  background: #0b3841;\n}\n.reader-frame > header span {\n  font: 700 1rem Georgia, serif;\n}\n.reader-frame > header small {\n  color: #a3c0bc;\n}\n.reader-history,\n.reader-weather {\n  color: #c05a3e;\n  font-size: 0.72rem;\n  font-weight: 900;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.reader-history {\n  margin-bottom: 0.35rem;\n  color: #567c76;\n}\n.reader-frame h2 {\n  margin: 0.35rem 0 1.4rem;\n  color: #163d42;\n  font-size: clamp(2rem, 5vw, 3.4rem);\n}\n.story-copy {\n  white-space: pre-wrap;\n  color: #28474a;\n  font: 1.1rem/1.85 Georgia, serif;\n}\n.reader-choices {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n.reader-question {\n  margin: 24px 0 10px;\n  color: #173f43;\n  font: 700 1.2rem Georgia, serif;\n}\n.reader-choices button {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  min-height: 4rem;\n  border: 1px solid #78a39a;\n  border-radius: 0.55rem;\n  padding: 0.8rem 1rem;\n  color: #194c4e;\n  background: #e5f0e8;\n  font-weight: 850;\n  text-align: left;\n}\n.reader-choices button > span:first-child {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.reader-choices button i {\n  display: grid;\n  flex: 0 0 auto;\n  width: 26px;\n  height: 26px;\n  place-items: center;\n  border: 2px solid currentColor;\n  border-radius: 50%;\n  font-size: 0.72rem;\n  font-style: normal;\n}\n.ending-mark {\n  display: grid;\n  justify-items: center;\n  gap: 0.4rem;\n  margin-top: 2.5rem;\n  border-top: 1px solid #e0c38a;\n  padding-top: 1.5rem;\n  color: #76522e;\n  text-align: center;\n}\n.ending-mark > span {\n  color: #c78631;\n  font-size: 1.7rem;\n}\n.ending-mark strong {\n  font: 700 1.2rem Georgia, serif;\n}\n.ending-mark p {\n  color: #806f58;\n}\n.reader-frame > footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  border-top: 1px solid #d7ded5;\n  padding: 0.8rem 1.2rem;\n  color: #647a77;\n  background: #eff3e9;\n  font-size: 0.78rem;\n}\n.reader-frame > footer button {\n  border: 0;\n  color: #176365;\n  background: transparent;\n  font-weight: 900;\n}\n.publish-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.8fr);\n  gap: 1rem;\n}\n.readiness-card,\n.rubric-card {\n  border: 1px solid #b4c7c2;\n  border-radius: 0.8rem;\n  padding: 1.2rem;\n  background: rgba(255, 255, 248, 0.93);\n}\n.readiness-card > header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.readiness-card h2,\n.rubric-card h2 {\n  margin-top: 0.25rem;\n  color: #173f43;\n  font-size: 1.6rem;\n}\n.readiness-card > header > strong {\n  color: #63807b;\n  font-size: 0.8rem;\n}\n.readiness-card ul {\n  display: grid;\n  gap: 0.5rem;\n  margin: 1rem 0;\n  padding: 0;\n  list-style: none;\n}\n.readiness-card li {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  border-bottom: 1px solid #e1e6dd;\n  padding: 0.45rem 0;\n  color: #536b68;\n  line-height: 1.4;\n}\n.readiness-card li > span {\n  color: #c25a3e;\n}\n.readiness-card li button {\n  margin-left: auto;\n  border: 0;\n  color: #17666a;\n  background: transparent;\n  font-size: 0.75rem;\n  font-weight: 900;\n}\n.ready-message {\n  margin: 1rem 0;\n  color: #3b6e60;\n  line-height: 1.6;\n}\n.publish-button {\n  width: 100%;\n}\n.rubric-card dl {\n  display: grid;\n  gap: 0.7rem;\n  margin-bottom: 0;\n}\n.rubric-card dl div {\n  border-top: 1px solid #d7dfd6;\n  padding-top: 0.65rem;\n}\n.rubric-card dt {\n  color: #2d5e5d;\n  font-weight: 900;\n}\n.rubric-card dd {\n  margin: 0.25rem 0 0;\n  color: #657a76;\n  line-height: 1.45;\n}\n.published-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 1rem;\n  border: 1px solid #d1a25f;\n  border-radius: 0.7rem;\n  padding: 1rem 1.2rem;\n  background: #fff0c9;\n}\n.published-card div {\n  display: grid;\n  gap: 0.22rem;\n}\n.published-card strong {\n  color: #5b3d23;\n  font: 700 1.2rem Georgia, serif;\n}\n.published-card small {\n  color: #866c4d;\n}\n@media (max-width: 780px) {\n  .bible-grid,\n  .publish-grid {\n    grid-template-columns: 1fr;\n  }\n  .stage-heading {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (max-width: 520px) {\n  .brand div {\n    display: none;\n  }\n  .save-status {\n    font-size: 0.7rem;\n  }\n  .reader-choices {\n    grid-template-columns: 1fr;\n  }\n  .choice-writer label > span,\n  .reader-frame > footer,\n  .published-card {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    scroll-behavior: auto !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n.writing-desk > footer {\n  position: sticky;\n  bottom: 0;\n  z-index: 3;\n  padding: 10px;\n  background: #f7efdf;\n  border-top: 1px solid #b6a883;\n}\n.writing-desk > footer span {\n  max-width: 65%;\n  font-size: 13px;\n}\n.choice-writer {\n  padding: 10px;\n  gap: 8px;\n}\n.studio-header {\n  position: sticky;\n  top: 0;\n  display: grid;\n  grid-template-columns: minmax(12rem, auto) minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 12px;\n  min-height: 68px;\n  padding: 10px 22px;\n}\n.studio-header .brand {\n  grid-column: 1;\n  grid-row: 1;\n  margin-right: 0;\n}\n.studio-header .stage-nav {\n  position: static;\n  grid-column: 2;\n  grid-row: 1;\n  min-width: 0;\n  padding: 0;\n  border: 0;\n  background: none;\n  display: flex;\n  justify-content: flex-start;\n  gap: 4px;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scroll-snap-type: x proximity;\n}\n.studio-header .save-status {\n  grid-column: 3;\n  grid-row: 1;\n}\n.studio-header app-task-guide {\n  grid-column: 4;\n  grid-row: 1;\n}\n.stage-nav button {\n  position: relative;\n  flex: 0 0 auto;\n  min-width: auto;\n  min-height: 44px;\n  padding: 10px 12px;\n  scroll-snap-align: center;\n}\n.stage-nav button.recommended:not(.active)::after {\n  content: "";\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #efbd63;\n  box-shadow: 0 0 0 2px #17343a;\n}\n.stage-heading {\n  gap: 24px;\n  margin-bottom: 12px;\n  padding: 4px 0 12px;\n}\n.stage-heading h1 {\n  font-size: clamp(25px, 2.5vw, 36px);\n}\n.bible-grid {\n  gap: 11px;\n}\n.bible-grid input,\n.bible-grid textarea,\n.bible-grid select {\n  padding-block: 10px;\n}\n.title-field input {\n  min-height: 48px;\n}\n.writing-desk {\n  position: relative;\n  padding: 16px clamp(16px, 3vw, 36px) 24px;\n}\n.writing-desk > header {\n  padding-bottom: 10px;\n}\n.writing-desk > header h1 {\n  margin: 0;\n  color: #173f43;\n  font-size: clamp(20px, 2vw, 27px);\n  line-height: 1.05;\n}\nmain h1[tabindex="-1"]:focus {\n  outline: none;\n}\n.scene-title {\n  margin-top: 12px;\n}\n.craft-prompt {\n  margin: 10px 0;\n}\n.scene-copy textarea {\n  min-height: 132px;\n  height: clamp(132px, 19dvh, 190px);\n}\n.reader-frame > article {\n  min-height: 0;\n  padding: clamp(24px, 4vw, 42px);\n}\n.reader-choices {\n  margin-top: 20px;\n}\n@media (max-width: 780px) {\n  .studio-header {\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 8px;\n    min-height: 0;\n    padding: 8px 12px;\n  }\n  .studio-header .brand {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .studio-header .save-status {\n    grid-column: 2;\n    grid-row: 1;\n    justify-self: end;\n  }\n  .studio-header app-task-guide {\n    grid-column: 3;\n    grid-row: 1;\n  }\n  .studio-header .stage-nav {\n    grid-column: 1/-1;\n    grid-row: 2;\n    width: 100%;\n  }\n  .stage-nav button {\n    padding: 8px 10px;\n  }\n  .stage-heading {\n    gap: 6px;\n    margin-bottom: 12px;\n  }\n  .stage-heading > p {\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n  .map-next-action {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .map-next-action button {\n    width: 100%;\n  }\n}\n.story-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  align-items: start;\n  gap: 20px;\n  padding: 22px;\n  background: #e6eee7;\n  overflow: visible;\n}\n.story-map-backdrop {\n  grid-area: auto;\n  position: sticky;\n  top: 90px;\n  height: auto;\n  padding: 0;\n  overflow: visible;\n}\n.map-heading {\n  padding: 8px 4px 18px;\n}\n.map-heading > span {\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  color: #8b5634;\n}\n.map-heading h2 {\n  font-size: clamp(22px, 2.3vw, 32px);\n  margin: 8px 0;\n}\n.map-heading p {\n  font-size: 14px;\n  line-height: 1.6;\n  max-width: 480px;\n  color: #506c61;\n}\n.map-heading small {\n  display: block;\n  margin-top: 12px;\n  color: #46715e;\n}\n.story-workspace .work-overlay {\n  grid-area: auto;\n  justify-self: stretch;\n  width: 100%;\n  min-width: 0;\n  margin: 0;\n  max-height: calc(100dvh - 112px);\n  padding: 24px;\n  border-radius: 16px;\n  background: #fffdf5;\n  box-shadow: 0 5px 20px rgba(41, 75, 60, 0.0392156863);\n}\n.story-workspace .writer-stage {\n  padding: 0;\n}\n.writing-desk {\n  background: #fffdf5;\n  padding: 22px;\n}\n.writing-desk .story-name {\n  margin: 0 0 20px;\n}\n.writing-desk > header small {\n  line-height: 1.45;\n}\n.scene-copy textarea {\n  height: 230px;\n  min-height: 190px;\n}\n.choice-writer {\n  border: 0;\n  border-radius: 12px;\n  padding: 16px;\n  gap: 8px;\n  background: #edf3ec;\n}\n.choice-writer label > span {\n  flex-direction: column;\n  gap: 2px;\n}\n.choice-writer input {\n  padding: 10px;\n  background: white;\n}\n.write-destination {\n  justify-self: start;\n  min-height: 44px;\n  padding: 8px 0;\n  margin-bottom: 4px;\n  border: 0;\n  background: transparent;\n  color: #1f665e;\n  text-align: left;\n  font-size: 13px;\n  font-weight: 800;\n}\n.branch-outcome {\n  margin-top: 18px;\n  color: #416654;\n}\n.branch-outcome p {\n  margin-top: 6px;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.branch-outcome small {\n  display: block;\n  margin-top: 8px;\n  font-size: 11px;\n}\n.branch-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 10px;\n}\n.branch-actions button {\n  min-height: 44px;\n  border: 1px solid #287065;\n  border-radius: 8px;\n  padding: 10px 14px;\n  background: #20665d;\n  color: white;\n  font-weight: 700;\n}\n.branch-actions .end-path {\n  border-color: #bc8c51;\n  color: #7b522b;\n  background: #fff3da;\n}\n.writing-desk > footer {\n  gap: 12px;\n  margin-top: 20px;\n  font-size: 11px;\n}\n.writing-desk > footer span {\n  font-size: 11px;\n  max-width: 55%;\n}\n.writing-desk > footer button {\n  min-height: 44px;\n}\n.publish-grid,\n.reader-choices {\n  grid-template-columns: 1fr;\n}\n.stage-nav button {\n  color: #bdd3cb;\n}\n.stage-nav button small {\n  color: #b7c8bf;\n}\n.stage-nav button.active {\n  color: #fff9e5;\n  background: #244b47;\n}\n@media (max-width: 780px) {\n  .story-workspace {\n    grid-template-columns: 1fr;\n    padding: 12px;\n    gap: 14px;\n  }\n  .story-map-backdrop {\n    position: static;\n    height: auto;\n  }\n  .map-heading {\n    padding: 0 2px 12px;\n  }\n  .story-workspace .work-overlay {\n    max-height: none;\n    padding: 18px;\n    margin: 0;\n    width: 100%;\n  }\n  .story-workspace .writer-stage {\n    padding: 0;\n  }\n  .writing-desk {\n    padding: 18px;\n  }\n}\n/*# sourceMappingURL=narrative-studio-page.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativeStudioPageComponent, { className: "NarrativeStudioPageComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-studio-page.component.ts", lineNumber: 38 });
})();
export {
  NarrativeStudioPageComponent
};
//# debugId=b8c2558b-f296-500a-a718-64b75358adfa
//# sourceMappingURL=chunk-5BI7Y7DT.js.map
