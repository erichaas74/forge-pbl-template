import {
  BalanceLockComponent,
  GearLockComponent,
  MachineWorkshopComponent
} from "./chunk-5TKYBZHJ.js";
import {
  ExpeditionPreviewRuntime
} from "./chunk-FLCMVE7I.js";
import "./chunk-DCCGK2JP.js";
import "./chunk-FWZ6YNYR.js";
import "./chunk-RWLVM3VX.js";
import "./chunk-7HMNGV54.js";
import "./chunk-RRITUMP7.js";
import "./chunk-YQ5R4IZP.js";
import {
  fractionLabel
} from "./chunk-RAYONVPN.js";
import {
  validMachineAnswer
} from "./chunk-NRR2X4JL.js";
import {
  PROJECT_LESSON_FOCUS
} from "./chunk-3C62DQOL.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/weekly/expedition-week-workspace.component.ts
var _c0 = (a0) => [a0];
var _c1 = () => [5];
var _forTrack0 = ($index, $item) => $item.stepId;
var _forTrack1 = ($index, $item) => $item.id;
function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-balance-lock", 21);
    \u0275\u0275listener("moved", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_0_Template_app_balance_lock_moved_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.moveWeight($event.index, $event.side));
    })("tested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_0_Template_app_balance_lock_tested_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.trial($event));
    })("pauseRequested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_0_Template_app_balance_lock_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.paused.set(!ctx_r1.paused()));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const puzzle_r3 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", puzzle_r3.lock)("title", ctx_r1.runtime.step().title)("placements", ctx_r1.placements())("initialScale", ctx_r1.restoredStage())("authoringPreview", true)("paused", ctx_r1.paused())("reducedMotion", ctx_r1.reducedMotion());
  }
}
function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-gear-lock", 22);
    \u0275\u0275listener("changed", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_1_Template_app_gear_lock_changed_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.change($event));
    })("tested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_1_Template_app_gear_lock_tested_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.trial($event));
    })("pauseRequested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_1_Template_app_gear_lock_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.paused.set(!ctx_r1.paused()));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const puzzle_r3 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", puzzle_r3.lock)("answer", ctx_r1.placements())("authoringPreview", true)("paused", ctx_r1.paused())("reducedMotion", ctx_r1.reducedMotion());
  }
}
function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-machine-workshop", 23);
    \u0275\u0275listener("changed", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_2_Template_app_machine_workshop_changed_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.change($event));
    })("tested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_2_Template_app_machine_workshop_tested_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.trial($event));
    })("pauseRequested", function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_2_Template_app_machine_workshop_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.paused.set(!ctx_r1.paused()));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const puzzle_r3 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", puzzle_r3.lock)("answer", ctx_r1.machineAnswer())("grade", ctx_r1.runtime.grade())("initialStage", ctx_r1.restoredStage())("authoringPreview", true)("paused", ctx_r1.paused())("reducedMotion", ctx_r1.reducedMotion());
  }
}
function ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_0_Template, 1, 7, "app-balance-lock", 18)(1, ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_1_Template, 1, 5, "app-gear-lock", 19)(2, ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Case_2_Template, 1, 7, "app-machine-workshop", 20);
  }
  if (rf & 2) {
    let tmp_12_0;
    \u0275\u0275conditional((tmp_12_0 = ctx.type) === "balance-lock" ? 0 : tmp_12_0 === "gear-lock" ? 1 : tmp_12_0 === "machine-lock" ? 2 : -1);
  }
}
function ExpeditionWeekWorkspaceComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExpeditionWeekWorkspaceComponent_For_4_Conditional_0_Template, 3, 1);
  }
  if (rf & 2) {
    let tmp_10_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_10_0 = ctx_r1.runtime.step().puzzle) ? 0 : -1, tmp_10_0);
  }
}
function ExpeditionWeekWorkspaceComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 14);
    \u0275\u0275listener("click", function ExpeditionWeekWorkspaceComponent_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.retrySave());
    });
    \u0275\u0275text(3, "Retry save");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.warning(), " ");
  }
}
function ExpeditionWeekWorkspaceComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const \u0275$index_37_r8 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_37_r8 === 0 ? "INDIVIDUAL SESSION" : "GROUP ACTIVITY");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r7.product);
  }
}
function ExpeditionWeekWorkspaceComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const clue_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(clue_r9);
  }
}
function ExpeditionWeekWorkspaceComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(question_r10);
  }
}
function ExpeditionWeekWorkspaceComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evidence_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(evidence_r11);
  }
}
function ExpeditionWeekWorkspaceComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const grade_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", grade_r12)("selected", grade_r12 === ctx_r1.runtime.grade());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Grade ", grade_r12);
  }
}
function ExpeditionWeekWorkspaceComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 14);
    \u0275\u0275listener("click", function ExpeditionWeekWorkspaceComponent_Conditional_50_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.choose(ctx_r1.session().stepId));
    });
    \u0275\u0275text(3, "Return to session workshop");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Exploring ", ctx_r1.runtime.step().title, ". The planning panels still describe Week ", ctx_r1.week().week, ". ");
  }
}
function ExpeditionWeekWorkspaceComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 14);
    \u0275\u0275listener("click", function ExpeditionWeekWorkspaceComponent_For_65_Template_button_click_8_listener() {
      const trial_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.restoreTrial(trial_r15.id));
    });
    \u0275\u0275text(9, "Restore this setup");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trial_r15 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", trial_r15.success ? "Mechanism works" : "Needs adjustment", " \xB7 Stage ", trial_r15.stage + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r15.equation);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trial_r15.feedback);
  }
}
function ExpeditionWeekWorkspaceComponent_ForEmpty_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Engage the mechanism to capture your first trial.");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionWeekWorkspaceComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275text(1, "Animal art & animation credits");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("href", ctx, \u0275\u0275sanitizeUrl);
  }
}
function ExpeditionWeekWorkspaceComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const control_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(control_r16);
  }
}
var ExpeditionWeekWorkspaceComponent = class _ExpeditionWeekWorkspaceComponent {
  runtime = inject(ExpeditionPreviewRuntime);
  lesson = inject(PROJECT_LESSON_FOCUS, { optional: true });
  selectedLesson = signal(
    1,
    ...ngDevMode ? [{ debugName: "selectedLesson" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weeks = this.runtime.mission.previewWeeks;
  week = computed(
    () => this.weeks[Math.floor((this.selectedLesson() - 1) / 2)],
    ...ngDevMode ? [{ debugName: "week" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionIndex = computed(
    () => (this.selectedLesson() - 1) % 2,
    ...ngDevMode ? [{ debugName: "sessionIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  session = computed(
    () => this.week().sessions[this.sessionIndex()],
    ...ngDevMode ? [{ debugName: "session" }] : (
      /* istanbul ignore next */
      []
    )
  );
  extra = computed(
    () => this.runtime.selected() !== this.session().stepId,
    ...ngDevMode ? [{ debugName: "extra" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sample = computed(
    () => this.weeks.flatMap((w) => w.sessions).find((s) => s.stepId === this.runtime.selected())?.sample,
    ...ngDevMode ? [{ debugName: "sample" }] : (
      /* istanbul ignore next */
      []
    )
  );
  paused = signal(
    false,
    ...ngDevMode ? [{ debugName: "paused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  guidance = computed(
    () => {
      const p = this.runtime.step().puzzle;
      if (p.type === "machine-lock")
        return p.lock.stages.flatMap((s) => [s.instruction, s.hint]);
      if (p.type === "balance-lock")
        return p.lock.scales.map((s) => s.instruction);
      if (p.type === "gear-lock")
        return [
          p.lock.instruction,
          `Axle A: ${fractionLabel(p.lock.firstMultiplier)} \xD7 ${p.lock.driverTeeth} teeth. Axle B: ${fractionLabel(p.lock.secondMultiplier)} \xD7 ${p.lock.pinionTeeth} teeth. Output target: ${fractionLabel(p.lock.outputTurns)} turns.`
        ];
      return [];
    },
    ...ngDevMode ? [{ debugName: "guidance" }] : (
      /* istanbul ignore next */
      []
    )
  );
  credits = computed(
    () => {
      const p = this.runtime.step().puzzle;
      if (p.type === "gear-lock")
        return p.lock.presentation?.animal.credits;
      if (p.type === "machine-lock") {
        const stage = p.lock.stages.find((s) => s.kind === "timing-wheels");
        if (stage?.kind === "timing-wheels")
          return stage.presentation?.animal.credits;
      }
      return void 0;
    },
    ...ngDevMode ? [{ debugName: "credits" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revision = signal(
    0,
    ...ngDevMode ? [{ debugName: "revision" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restoredStage = signal(
    0,
    ...ngDevMode ? [{ debugName: "restoredStage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mountKey = computed(
    () => `${this.runtime.key()}:${this.revision()}`,
    ...ngDevMode ? [{ debugName: "mountKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placements = computed(
    () => {
      const value = this.runtime.draft().answer;
      return Array.isArray(value) ? value : [];
    },
    ...ngDevMode ? [{ debugName: "placements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  machineAnswer = computed(
    () => {
      const p = this.runtime.step().puzzle, answer = this.runtime.draft().answer;
      return p.type === "machine-lock" && validMachineAnswer(p.lock, answer) ? answer : null;
    },
    ...ngDevMode ? [{ debugName: "machineAnswer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const number = this.lesson?.()?.number ?? 1;
      untracked(() => this.openLesson(number));
    });
  }
  openLesson(number) {
    if (!Number.isInteger(number) || number < 1 || number > 8)
      return;
    this.selectedLesson.set(number);
    this.choose(this.session().stepId);
  }
  choose(id) {
    this.paused.set(false);
    this.restoredStage.set(0);
    this.runtime.choose(id);
  }
  reset() {
    this.runtime.reset();
    this.restoredStage.set(0);
    this.paused.set(false);
    this.revision.update((n) => n + 1);
  }
  restoreTrial(id) {
    this.restoredStage.set(this.runtime.draft().trials.find((t) => t.id === id)?.stage ?? 0);
    this.runtime.restoreTrial(id);
    this.paused.set(false);
    this.revision.update((n) => n + 1);
  }
  static \u0275fac = function ExpeditionWeekWorkspaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpeditionWeekWorkspaceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpeditionWeekWorkspaceComponent, selectors: [["app-expedition-week-workspace"]], decls: 75, vars: 15, consts: [[1, "weekly-workspace"], [1, "workspace-grid"], ["aria-label", "Interactive rescue workshop", 1, "activity"], ["role", "alert", 1, "warning"], ["aria-label", "Week planning", 1, "planning"], ["open", "", 1, "products"], [1, "panel-body"], [1, "muted"], ["open", "", 1, "tutor"], [3, "change", "value"], [3, "value", "selected"], [1, "setup-note"], [1, "extra-note"], [1, "workspace-options"], [3, "click"], ["type", "checkbox", 3, "change", "checked"], [1, "trial-history"], ["target", "_blank", "rel", "noopener", 3, "href"], [3, "definition", "title", "placements", "initialScale", "authoringPreview", "paused", "reducedMotion"], [3, "definition", "answer", "authoringPreview", "paused", "reducedMotion"], [3, "definition", "answer", "grade", "initialStage", "authoringPreview", "paused", "reducedMotion"], [3, "moved", "tested", "pauseRequested", "definition", "title", "placements", "initialScale", "authoringPreview", "paused", "reducedMotion"], [3, "changed", "tested", "pauseRequested", "definition", "answer", "authoringPreview", "paused", "reducedMotion"], [3, "changed", "tested", "pauseRequested", "definition", "answer", "grade", "initialStage", "authoringPreview", "paused", "reducedMotion"]], template: function ExpeditionWeekWorkspaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "div", 1)(2, "section", 2);
      \u0275\u0275repeaterCreate(3, ExpeditionWeekWorkspaceComponent_For_4_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(5, ExpeditionWeekWorkspaceComponent_Conditional_5_Template, 4, 1, "p", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "aside", 4)(7, "details", 5)(8, "summary");
      \u0275\u0275text(9, " Proposed weekly products ");
      \u0275\u0275elementStart(10, "span");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 6);
      \u0275\u0275repeaterCreate(13, ExpeditionWeekWorkspaceComponent_For_14_Template, 5, 2, "article", null, _forTrack0);
      \u0275\u0275elementStart(15, "p", 7);
      \u0275\u0275text(16, " Potential deliverables for future tutor review. Group work is planned; shared editing is not connected. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "details", 8)(18, "summary");
      \u0275\u0275text(19, "AI Tutor ");
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "Disconnected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 6)(23, "p", 7);
      \u0275\u0275text(24, " Builder planning only. No automatic questions, review, adaptation, or mastery decisions run here. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "h2");
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(27, ExpeditionWeekWorkspaceComponent_For_28_Template, 2, 1, "p", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(29, "h2");
      \u0275\u0275text(30, "Questions & concepts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "ul");
      \u0275\u0275repeaterCreate(32, ExpeditionWeekWorkspaceComponent_For_33_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "h2");
      \u0275\u0275text(35, "Evidence to inspect");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "ul");
      \u0275\u0275repeaterCreate(37, ExpeditionWeekWorkspaceComponent_For_38_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "h2");
      \u0275\u0275text(40, "Preview settings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "label");
      \u0275\u0275text(42, "Math pathway ");
      \u0275\u0275elementStart(43, "select", 9);
      \u0275\u0275listener("change", function ExpeditionWeekWorkspaceComponent_Template_select_change_43_listener($event) {
        return ctx.runtime.setGrade(+$event.target.value);
      });
      \u0275\u0275repeaterCreate(44, ExpeditionWeekWorkspaceComponent_For_45_Template, 2, 3, "option", 10, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 11)(47, "strong");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(50, ExpeditionWeekWorkspaceComponent_Conditional_50_Template, 4, 2, "p", 12);
      \u0275\u0275elementStart(51, "div", 13)(52, "button", 14);
      \u0275\u0275listener("click", function ExpeditionWeekWorkspaceComponent_Template_button_click_52_listener() {
        return ctx.reset();
      });
      \u0275\u0275text(53, "Reset workshop settings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "label")(55, "input", 15);
      \u0275\u0275listener("change", function ExpeditionWeekWorkspaceComponent_Template_input_change_55_listener($event) {
        return ctx.reducedMotion.set($event.target.checked);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(56, " Reduce motion");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "small");
      \u0275\u0275text(58, "Local preview \xB7 no lesson completion recorded");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "details", 16)(60, "summary");
      \u0275\u0275text(61);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "p");
      \u0275\u0275text(63, " Compare a previous setup, restore its controls, and run the machine again. The most recent 30 trials for this workshop and grade are retained. ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(64, ExpeditionWeekWorkspaceComponent_For_65_Template, 10, 4, "article", null, _forTrack1, false, ExpeditionWeekWorkspaceComponent_ForEmpty_66_Template, 2, 0, "p");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, ExpeditionWeekWorkspaceComponent_Conditional_67_Template, 2, 1, "a", 17);
      \u0275\u0275elementStart(68, "h2");
      \u0275\u0275text(69, "Future model controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "p", 7);
      \u0275\u0275text(71, "Planned full model control through supported settings:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "ul");
      \u0275\u0275repeaterCreate(73, ExpeditionWeekWorkspaceComponent_For_74_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_17_0;
      \u0275\u0275attribute("data-week", ctx.week().week);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(\u0275\u0275pureFunction1(12, _c0, ctx.mountKey()));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.warning() ? 5 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.week().title);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.week().sessions);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.runtime.step().title);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.guidance());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().questions);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.week().evidence);
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.runtime.grade());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.mission.mathGrades ?? \u0275\u0275pureFunction0(14, _c1));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.source());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.sample(), " All workshops can be tested directly. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.extra() ? 50 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("checked", ctx.reducedMotion());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Workshop trials \xB7 ", ctx.runtime.draft().trials.length);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.runtime.draft().trials.slice().reverse());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_17_0 = ctx.credits()) ? 67 : -1, tmp_17_0);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.week().controls);
    }
  }, dependencies: [BalanceLockComponent, GearLockComponent, MachineWorkshopComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n  background: #071c25;\n  color: #f6eedb;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.weekly-workspace[_ngcontent-%COMP%] {\n  --%NS%accent: #dfbd7f;\n  padding: 20px clamp(12px, 2vw, 30px) 40px;\n  max-width: 1800px;\n  margin: auto;\n  font: 15px/1.5 "Trebuchet MS", sans-serif;\n}\n.weekly-workspace[data-week="2"][_ngcontent-%COMP%] {\n  --%NS%accent: #eead72;\n}\n.weekly-workspace[data-week="3"][_ngcontent-%COMP%] {\n  --%NS%accent: #bdb7f1;\n}\n.weekly-workspace[data-week="4"][_ngcontent-%COMP%] {\n  --%NS%accent: #80d7c2;\n}\n.week-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 12px;\n  letter-spacing: 0.15em;\n  font-weight: bold;\n  margin: 0;\n}\nh1[_ngcontent-%COMP%] {\n  font: clamp(26px, 2.7vw, 38px)/1.1 Georgia, serif;\n  margin: 7px 0;\n}\n.week-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin: 0;\n  color: #bed0d0;\n}\n.session-label[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  border: 1px solid #526763;\n  padding: 9px 14px;\n  border-radius: 30px;\n  font-size: 13px;\n}\n.workspace-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(280px, 3fr);\n  align-items: start;\n  gap: 20px;\n}\n.activity[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #48605f;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #0d2731;\n}\n.workshop-picker[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 14px;\n  background: #183640;\n}\n.workshop-picker[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child {\n  flex: 1 1 220px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 4px;\n  color: #dae8df;\n  font-size: 13px;\n}\nbutton[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #6b8680;\n  background: #1a3c44;\n  color: #f7f2df;\n  border-radius: 6px;\n  font: inherit;\n  padding: 8px 11px;\n  cursor: pointer;\n  max-width: 100%;\n}\nselect[_ngcontent-%COMP%] {\n  width: 100%;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #2d5054;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--%NS%accent);\n  outline-offset: 3px;\n}\n.setup-note[_ngcontent-%COMP%], \n.extra-note[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: 13px;\n  color: #bfd5cd;\n  border-bottom: 1px solid #46605b;\n}\n.setup-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f2d8a5;\n}\n.extra-note[_ngcontent-%COMP%] {\n  background: #423a29;\n  margin: 0;\n}\n.extra-note[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.workspace-options[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 14px;\n  padding: 14px;\n  border-top: 1px solid #46605b;\n}\n.workspace-options[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.workspace-options[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.workspace-options[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #aec6c3;\n}\n.planning[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  min-width: 0;\n}\ndetails[_ngcontent-%COMP%] {\n  border: 1px solid #506764;\n  border-radius: 10px;\n  background: #142f38;\n  overflow: hidden;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 16px;\n  font-weight: bold;\n  color: #fff1d5;\n  min-height: 48px;\n}\nsummary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  margin-top: 3px;\n  margin-left: 17px;\n  color: var(--%NS%accent);\n  font-weight: normal;\n}\n.panel-body[_ngcontent-%COMP%] {\n  padding: 0 18px 17px;\n}\n.panel-body[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 15px;\n  margin: 22px 0 8px;\n  color: var(--%NS%accent);\n}\n.panel-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n  margin: 8px 0;\n}\n.panel-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-left: 2px;\n  margin-bottom: 11px;\n}\n.products[_ngcontent-%COMP%] {\n  border-top: 3px solid var(--%NS%accent);\n}\n.products[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  border-top: 1px solid #39534f;\n}\n.products[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  letter-spacing: 0.1em;\n  font-size: 10px;\n}\n.products[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #b2c7c5;\n  font-size: 13px;\n}\n.trial-history[_ngcontent-%COMP%] {\n  border: 0;\n  border-top: 1px solid #46605b;\n  border-radius: 0;\n}\n.trial-history[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  padding: 0 16px;\n}\n.trial-history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-top: 1px solid #46605b;\n}\n.trial-history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 4px 0;\n}\n.trial-history[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.warning[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #543c20;\n}\n@media (max-width: 1000px) {\n  .workspace-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    align-items: start;\n  }\n}\n@media (max-width: 620px) {\n  .week-heading[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .trial-history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .workshop-picker[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n    flex: 1 1 100%;\n  }\n  .weekly-workspace[_ngcontent-%COMP%] {\n    padding-top: 14px;\n  }\n}\n.planning[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #edcf93;\n}\n.planning[_ngcontent-%COMP%]   .workspace-options[_ngcontent-%COMP%] {\n  padding-inline: 0;\n}\n.planning[_ngcontent-%COMP%]   .trial-history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  padding-inline: 0;\n}\n/*# sourceMappingURL=expedition-week-workspace.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpeditionWeekWorkspaceComponent, [{
    type: Component,
    args: [{ selector: "app-expedition-week-workspace", imports: [BalanceLockComponent, GearLockComponent, MachineWorkshopComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="weekly-workspace" [attr.data-week]="week().week">\r
  <div class="workspace-grid">\r
    <section class="activity" aria-label="Interactive rescue workshop">\r
      @for (key of [mountKey()]; track key) {\r
        @if (runtime.step().puzzle; as puzzle) {\r
          @switch (puzzle.type) {\r
            @case ('balance-lock') {\r
              <app-balance-lock\r
                [definition]="puzzle.lock"\r
                [title]="runtime.step().title"\r
                [placements]="placements()"\r
                [initialScale]="restoredStage()"\r
                [authoringPreview]="true"\r
                [paused]="paused()"\r
                [reducedMotion]="reducedMotion()"\r
                (moved)="runtime.moveWeight($event.index, $event.side)"\r
                (tested)="runtime.trial($event)"\r
                (pauseRequested)="paused.set(!paused())"\r
              />\r
            }\r
            @case ('gear-lock') {\r
              <app-gear-lock\r
                [definition]="puzzle.lock"\r
                [answer]="placements()"\r
                [authoringPreview]="true"\r
                [paused]="paused()"\r
                [reducedMotion]="reducedMotion()"\r
                (changed)="runtime.change($event)"\r
                (tested)="runtime.trial($event)"\r
                (pauseRequested)="paused.set(!paused())"\r
              />\r
            }\r
            @case ('machine-lock') {\r
              <app-machine-workshop\r
                [definition]="puzzle.lock"\r
                [answer]="machineAnswer()"\r
                [grade]="runtime.grade()"\r
                [initialStage]="restoredStage()"\r
                [authoringPreview]="true"\r
                [paused]="paused()"\r
                [reducedMotion]="reducedMotion()"\r
                (changed)="runtime.change($event)"\r
                (tested)="runtime.trial($event)"\r
                (pauseRequested)="paused.set(!paused())"\r
              />\r
            }\r
          }\r
        }\r
      }\r
      @if (runtime.warning()) {\r
        <p class="warning" role="alert">\r
          {{ runtime.warning() }} <button (click)="runtime.retrySave()">Retry save</button>\r
        </p>\r
      }\r
    </section>\r
    <aside class="planning" aria-label="Week planning">\r
      <details class="products" open>\r
        <summary>\r
          Proposed weekly products <span>{{ week().title }}</span>\r
        </summary>\r
        <div class="panel-body">\r
          @for (s of week().sessions; track s.stepId; let i = $index) {\r
            <article>\r
              <small>{{ i === 0 ? 'INDIVIDUAL SESSION' : 'GROUP ACTIVITY' }}</small>\r
              <p>{{ s.product }}</p>\r
            </article>\r
          }\r
          <p class="muted">\r
            Potential deliverables for future tutor review. Group work is planned; shared editing is\r
            not connected.\r
          </p>\r
        </div>\r
      </details>\r
      <details class="tutor" open>\r
        <summary>AI Tutor <span>Disconnected</span></summary>\r
        <div class="panel-body">\r
          <p class="muted">\r
            Builder planning only. No automatic questions, review, adaptation, or mastery decisions\r
            run here.\r
          </p>\r
          <h2>{{ runtime.step().title }}</h2>\r
          @for (clue of guidance(); track $index) { <p>{{ clue }}</p> }\r
          <h2>Questions & concepts</h2>\r
          <ul>\r
            @for (question of week().questions; track question) {\r
              <li>{{ question }}</li>\r
            }\r
          </ul>\r
          <h2>Evidence to inspect</h2>\r
          <ul>\r
            @for (evidence of week().evidence; track evidence) {\r
              <li>{{ evidence }}</li>\r
            }\r
          </ul>\r
          <h2>Preview settings</h2>\r
        <label\r
          >Math pathway\r
          <select [value]="runtime.grade()" (change)="runtime.setGrade(+$any($event.target).value)">\r
            @for (grade of runtime.mission.mathGrades ?? [5]; track grade) {\r
              <option [value]="grade" [selected]="grade === runtime.grade()">Grade {{ grade }}</option>\r
            }\r
          </select>\r
        </label>\r
      <div class="setup-note">\r
        <strong>{{ runtime.source() }}</strong> {{ sample() }} All workshops can be tested directly.\r
      </div>\r
      @if (extra()) {\r
        <p class="extra-note">\r
          Exploring {{ runtime.step().title }}. The planning panels still describe Week\r
          {{ week().week }}.\r
          <button (click)="choose(session().stepId)">Return to session workshop</button>\r
        </p>\r
      }\r
      <div class="workspace-options">\r
        <button (click)="reset()">Reset workshop settings</button>\r
        <label\r
          ><input\r
            type="checkbox"\r
            [checked]="reducedMotion()"\r
            (change)="reducedMotion.set($any($event.target).checked)"\r
          />\r
          Reduce motion</label\r
        >\r
        <small>Local preview \xB7 no lesson completion recorded</small>\r
      </div>\r
      <details class="trial-history">\r
        <summary>Workshop trials \xB7 {{ runtime.draft().trials.length }}</summary>\r
        <p>\r
          Compare a previous setup, restore its controls, and run the machine again. The most recent\r
          30 trials for this workshop and grade are retained.\r
        </p>\r
        @for (trial of runtime.draft().trials.slice().reverse(); track trial.id) {\r
          <article>\r
            <div>\r
              <strong\r
                >{{ trial.success ? 'Mechanism works' : 'Needs adjustment' }} \xB7 Stage\r
                {{ trial.stage + 1 }}</strong\r
              >\r
              <p>{{ trial.equation }}</p>\r
              <p>{{ trial.feedback }}</p>\r
            </div>\r
            <button (click)="restoreTrial(trial.id)">Restore this setup</button>\r
          </article>\r
        } @empty {\r
          <p>Engage the mechanism to capture your first trial.</p>\r
        }\r
      </details>\r
\r
          @if (credits(); as url) { <a [href]="url" target="_blank" rel="noopener">Animal art & animation credits</a> }\r
          <h2>Future model controls</h2>\r
          <p class="muted">Planned full model control through supported settings:</p>\r
          <ul>\r
            @for (control of week().controls; track control) {\r
              <li>{{ control }}</li>\r
            }\r
          </ul>\r
        </div>\r
      </details>\r
    </aside>\r
  </div>\r
</main>\r
`, styles: ['/* src/app/templates/heist/escape/weekly/expedition-week-workspace.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n  background: #071c25;\n  color: #f6eedb;\n}\n* {\n  box-sizing: border-box;\n}\n.weekly-workspace {\n  --accent: #dfbd7f;\n  padding: 20px clamp(12px, 2vw, 30px) 40px;\n  max-width: 1800px;\n  margin: auto;\n  font: 15px/1.5 "Trebuchet MS", sans-serif;\n}\n.weekly-workspace[data-week="2"] {\n  --accent: #eead72;\n}\n.weekly-workspace[data-week="3"] {\n  --accent: #bdb7f1;\n}\n.weekly-workspace[data-week="4"] {\n  --accent: #80d7c2;\n}\n.week-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 18px;\n}\n.eyebrow {\n  color: var(--accent);\n  font-size: 12px;\n  letter-spacing: 0.15em;\n  font-weight: bold;\n  margin: 0;\n}\nh1 {\n  font: clamp(26px, 2.7vw, 38px)/1.1 Georgia, serif;\n  margin: 7px 0;\n}\n.week-heading p:last-child {\n  margin: 0;\n  color: #bed0d0;\n}\n.session-label {\n  color: var(--accent);\n  border: 1px solid #526763;\n  padding: 9px 14px;\n  border-radius: 30px;\n  font-size: 13px;\n}\n.workspace-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(280px, 3fr);\n  align-items: start;\n  gap: 20px;\n}\n.activity {\n  min-width: 0;\n  border: 1px solid #48605f;\n  border-radius: 12px;\n  overflow: hidden;\n  background: #0d2731;\n}\n.workshop-picker {\n  display: flex;\n  align-items: end;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 14px;\n  background: #183640;\n}\n.workshop-picker label:first-child {\n  flex: 1 1 220px;\n}\nlabel {\n  display: grid;\n  gap: 4px;\n  color: #dae8df;\n  font-size: 13px;\n}\nbutton,\nselect {\n  min-height: 44px;\n  border: 1px solid #6b8680;\n  background: #1a3c44;\n  color: #f7f2df;\n  border-radius: 6px;\n  font: inherit;\n  padding: 8px 11px;\n  cursor: pointer;\n  max-width: 100%;\n}\nselect {\n  width: 100%;\n}\nbutton:hover {\n  background: #2d5054;\n}\nbutton:focus-visible,\nselect:focus-visible,\nsummary:focus-visible,\ninput:focus-visible {\n  outline: 3px solid var(--accent);\n  outline-offset: 3px;\n}\n.setup-note,\n.extra-note {\n  padding: 10px 16px;\n  font-size: 13px;\n  color: #bfd5cd;\n  border-bottom: 1px solid #46605b;\n}\n.setup-note strong {\n  color: #f2d8a5;\n}\n.extra-note {\n  background: #423a29;\n  margin: 0;\n}\n.extra-note button {\n  margin-top: 8px;\n}\n.workspace-options {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 14px;\n  padding: 14px;\n  border-top: 1px solid #46605b;\n}\n.workspace-options label {\n  display: flex;\n  align-items: center;\n}\n.workspace-options input {\n  width: 20px;\n  height: 20px;\n}\n.workspace-options small {\n  color: #aec6c3;\n}\n.planning {\n  display: grid;\n  gap: 16px;\n  min-width: 0;\n}\ndetails {\n  border: 1px solid #506764;\n  border-radius: 10px;\n  background: #142f38;\n  overflow: hidden;\n}\nsummary {\n  cursor: pointer;\n  padding: 16px;\n  font-weight: bold;\n  color: #fff1d5;\n  min-height: 48px;\n}\nsummary span {\n  display: block;\n  font-size: 12px;\n  margin-top: 3px;\n  margin-left: 17px;\n  color: var(--accent);\n  font-weight: normal;\n}\n.panel-body {\n  padding: 0 18px 17px;\n}\n.panel-body h2 {\n  font-size: 15px;\n  margin: 22px 0 8px;\n  color: var(--accent);\n}\n.panel-body ul {\n  padding-left: 18px;\n  margin: 8px 0;\n}\n.panel-body li {\n  padding-left: 2px;\n  margin-bottom: 11px;\n}\n.products {\n  border-top: 3px solid var(--accent);\n}\n.products article {\n  padding: 10px 0;\n  border-top: 1px solid #39534f;\n}\n.products small {\n  color: var(--accent);\n  letter-spacing: 0.1em;\n  font-size: 10px;\n}\n.products article p {\n  margin: 4px 0;\n}\n.muted {\n  color: #b2c7c5;\n  font-size: 13px;\n}\n.trial-history {\n  border: 0;\n  border-top: 1px solid #46605b;\n  border-radius: 0;\n}\n.trial-history > p {\n  padding: 0 16px;\n}\n.trial-history article {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-top: 1px solid #46605b;\n}\n.trial-history article p {\n  font-size: 13px;\n  margin: 4px 0;\n}\n.trial-history button {\n  flex-shrink: 0;\n}\n.warning {\n  padding: 14px;\n  background: #543c20;\n}\n@media (max-width: 1000px) {\n  .workspace-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    align-items: start;\n  }\n}\n@media (max-width: 620px) {\n  .week-heading {\n    align-items: start;\n    flex-direction: column;\n  }\n  .planning {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .trial-history article {\n    flex-wrap: wrap;\n  }\n  .workshop-picker > label {\n    flex: 1 1 100%;\n  }\n  .weekly-workspace {\n    padding-top: 14px;\n  }\n}\n.planning a {\n  color: #edcf93;\n}\n.planning .workspace-options {\n  padding-inline: 0;\n}\n.planning .trial-history article {\n  flex-wrap: wrap;\n  padding-inline: 0;\n}\n/*# sourceMappingURL=expedition-week-workspace.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpeditionWeekWorkspaceComponent, { className: "ExpeditionWeekWorkspaceComponent", filePath: "src/app/templates/heist/escape/weekly/expedition-week-workspace.component.ts", lineNumber: 25 });
})();
export {
  ExpeditionWeekWorkspaceComponent
};
//# debugId=bacfcd30-9664-51f1-b3a4-f3f6422bc154
//# sourceMappingURL=chunk-RM6MHHCN.js.map
