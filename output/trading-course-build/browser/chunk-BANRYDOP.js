import {
  LeagueLeaderboardComponent
} from "./chunk-3WTQ42MR.js";
import {
  LEAGUE_CONFIG
} from "./chunk-IKO3FXUM.js";
import {
  leagueDemoSnapshot,
  requireLeagueDemo
} from "./chunk-6ZWUSTOY.js";
import {
  standings
} from "./chunk-EMQ2ALBA.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import {
  DecimalPipe
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
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

// src/app/templates/live-strategy-league/ui/league-final-demo.component.ts
var _c0 = (a0) => ["/projects", a0];
var _c1 = (a0) => ["/projects", a0, "activity"];
var _forTrack0 = ($index, $item) => $item.at;
function LeagueFinalDemoComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function LeagueFinalDemoComponent_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.replay());
    });
    \u0275\u0275text(1, "Replay demo \u21BB");
    \u0275\u0275elementEnd();
  }
}
function LeagueFinalDemoComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function LeagueFinalDemoComponent_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePlayback());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.playing() ? "Pause demo" : "Resume demo");
  }
}
function LeagueFinalDemoComponent_Conditional_42_For_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "CHOSEN");
    \u0275\u0275elementEnd();
  }
}
function LeagueFinalDemoComponent_Conditional_42_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, LeagueFinalDemoComponent_Conditional_42_For_11_Conditional_5_Template, 2, 0, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const choice_r6 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", $index_r5 === choice_r6.selected);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r5 === choice_r6.selected ? "\u2713" : $index_r5 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r4);
    \u0275\u0275advance();
    \u0275\u0275conditional($index_r5 === choice_r6.selected ? 5 : -1);
  }
}
function LeagueFinalDemoComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 31)(1, "div", 32);
    \u0275\u0275element(2, "span", 33);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "SIMULATED TEAM CHOICE");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h3", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "ol", 35);
    \u0275\u0275repeaterCreate(10, LeagueFinalDemoComponent_Conditional_42_For_11_Template, 6, 5, "li", 36, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 37)(13, "strong");
    \u0275\u0275text(14, "Why this choice");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 38)(17, "div", 39)(18, "h4");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275pipe(23, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 40)(25, "div")(26, "span");
    \u0275\u0275text(27, "Revenue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div")(32, "span");
    \u0275\u0275text(33, "Production cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "strong");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 41)(38, "span");
    \u0275\u0275text(39, "Profit \u2192 points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "strong");
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "p", 42);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const choice_r6 = ctx;
    \u0275\u0275styleProp("--%NS%team-color", choice_r6.team.color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(choice_r6.team.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(choice_r6.question);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(choice_r6.options);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(choice_r6.reasoning);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(choice_r6.settled ? "Trade completed" : "Trade queued");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(22, 13, choice_r6.units), " units \xD7 $", \u0275\u0275pipeBind1(23, 15, choice_r6.unitPrice));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind1(30, 17, choice_r6.revenue));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u2212$", \u0275\u0275pipeBind1(36, 19, choice_r6.cost));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", choice_r6.profit >= 0 ? "+" : "\u2212", "", \u0275\u0275pipeBind1(42, 21, choice_r6.profit < 0 ? -choice_r6.profit : choice_r6.profit));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(choice_r6.settled ? choice_r6.team.name + " is now #" + choice_r6.rank + " on the leaderboard." : "The next score update reveals where this trade puts the team.");
  }
}
function LeagueFinalDemoComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 44);
    \u0275\u0275text(2, "\u2605");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 16);
    \u0275\u0275text(5, "LEAGUE CHAMPION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12, "points");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.leader().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(10, 2, ctx_r1.ranking()[0].score), " ");
  }
}
function LeagueFinalDemoComponent_For_68_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 45);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275pipe(5, "number");
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trade_r7 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(trade_r7.options[trade_r7.selected]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("$", \u0275\u0275pipeBind1(4, 4, trade_r7.units * trade_r7.unitPrice), " revenue \u2212 $", \u0275\u0275pipeBind1(5, 6, trade_r7.units * trade_r7.unitCost), " cost = ", \u0275\u0275pipeBind1(6, 8, trade_r7.units * (trade_r7.unitPrice - trade_r7.unitCost)), " points");
  }
}
function LeagueFinalDemoComponent_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "time");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275conditionalCreate(4, LeagueFinalDemoComponent_For_68_Conditional_4_Template, 7, 10);
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const frame_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.demo.seconds - frame_r8.at, "s left");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = frame_r8.decision) ? 4 : -1, tmp_11_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(frame_r8.caption);
  }
}
function LeagueFinalDemoComponent_ForEmpty_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "time");
    \u0275\u0275text(2, "At the start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.demo.openingCaption);
  }
}
var LeagueFinalDemoComponent = class _LeagueFinalDemoComponent {
  config = inject(LEAGUE_CONFIG);
  demo = requireLeagueDemo(this.config.finalDemo, this.config);
  elapsed = signal(
    0,
    ...ngDevMode ? [{ debugName: "elapsed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  playing = signal(
    true,
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finished = computed(
    () => this.elapsed() >= this.demo.seconds,
    ...ngDevMode ? [{ debugName: "finished" }] : (
      /* istanbul ignore next */
      []
    )
  );
  seconds = computed(
    () => Math.ceil(this.demo.seconds - this.elapsed()),
    ...ngDevMode ? [{ debugName: "seconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timer = computed(
    () => `${Math.floor(this.seconds() / 60).toString().padStart(2, "0")}:${(this.seconds() % 60).toString().padStart(2, "0")}`,
    ...ngDevMode ? [{ debugName: "timer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = computed(
    () => this.demo.frames.filter((frame) => frame.at <= this.elapsed()).length,
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = computed(
    () => leagueDemoSnapshot(this.config, this.demo, this.step()),
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ranking = computed(
    () => standings(this.snapshot().teams),
    ...ngDevMode ? [{ debugName: "ranking" }] : (
      /* istanbul ignore next */
      []
    )
  );
  leader = computed(
    () => this.config.teams.find((t) => t.id === this.ranking()[0].id),
    ...ngDevMode ? [{ debugName: "leader" }] : (
      /* istanbul ignore next */
      []
    )
  );
  caption = computed(
    () => this.demo.frames[this.step() - 1]?.caption ?? this.demo.openingCaption,
    ...ngDevMode ? [{ debugName: "caption" }] : (
      /* istanbul ignore next */
      []
    )
  );
  updates = computed(
    () => this.demo.frames.slice(0, this.step()).reverse(),
    ...ngDevMode ? [{ debugName: "updates" }] : (
      /* istanbul ignore next */
      []
    )
  );
  margin = computed(
    () => this.ranking()[0].score - this.ranking()[1].score,
    ...ngDevMode ? [{ debugName: "margin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  decision = computed(
    () => {
      const index = Math.max(0, this.step() - 1);
      const frame = this.demo.frames[index];
      const decision = frame.decision;
      if (!decision)
        return null;
      return __spreadProps(__spreadValues({}, decision), {
        team: this.config.teams.find((t) => t.id === decision.teamId),
        settled: this.step() > index,
        revenue: decision.units * decision.unitPrice,
        cost: decision.units * decision.unitCost,
        profit: decision.units * (decision.unitPrice - decision.unitCost),
        rank: this.ranking().findIndex((t) => t.id === decision.teamId) + 1
      });
    },
    ...ngDevMode ? [{ debugName: "decision" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastTick = Date.now();
  interval = setInterval(() => this.tick(), 250);
  tick() {
    const now = Date.now();
    if (this.playing()) {
      this.elapsed.update((value) => Math.min(this.demo.seconds, value + Math.max(0, now - this.lastTick) / 1e3));
      if (this.finished())
        this.playing.set(false);
    }
    this.lastTick = now;
  }
  togglePlayback() {
    this.tick();
    if (!this.finished())
      this.playing.update((value) => !value);
  }
  replay() {
    this.lastTick = Date.now();
    this.elapsed.set(0);
    this.playing.set(true);
  }
  showFinal() {
    this.elapsed.set(this.demo.seconds);
    this.playing.set(false);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  static \u0275fac = function LeagueFinalDemoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeagueFinalDemoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeagueFinalDemoComponent, selectors: [["app-league-final-demo"]], decls: 70, vars: 34, consts: [[1, "league"], ["aria-label", "Main navigation", 1, "masthead"], ["routerLink", "/projects", 1, "back"], [1, "wordmark"], [1, "practice"], ["aria-label", "Project title and playback controls", 1, "project-header"], [1, "project-title"], [1, "actions"], [1, "example-link", 3, "routerLink"], [3, "click", "disabled"], [1, "primary"], [1, "arena"], ["aria-labelledby", "standings-title", 1, "stage", "panel"], ["trendNote", "Compared with the previous score update", "note", "Scripted example \xB7 Fictional teams \xB7 Scores are illustrative", 3, "config", "snapshot", "yourTeamId", "completedRounds", "animationStep", "statusLabel"], ["aria-labelledby", "demo-title", 1, "command", "panel", "demo-stage"], [1, "section-heading"], [1, "eyebrow"], ["id", "demo-title"], [1, "countdown"], ["aria-label", "Time remaining"], [1, "time-track"], ["aria-labelledby", "decision-question", 1, "decision-card", 3, "--%NS%team-color"], ["aria-live", "polite", 1, "live-call"], ["aria-live", "polite", 1, "winner"], [1, "round-information"], ["aria-labelledby", "demo-info", 1, "info", "panel"], ["id", "demo-info"], ["aria-labelledby", "demo-recap", 1, "recap", "panel"], ["id", "demo-recap"], [1, "update-list"], [1, "primary", 3, "click"], ["aria-labelledby", "decision-question", 1, "decision-card"], [1, "decision-team"], [1, "team-dot"], ["id", "decision-question"], ["aria-label", "Example choices", 1, "decision-options"], [3, "selected"], [1, "decision-reason"], [1, "trade-ticket"], [1, "trade-heading"], [1, "trade-metrics"], [1, "trade-profit"], ["aria-live", "polite", 1, "trade-impact"], ["aria-hidden", "true", 1, "option-marker"], ["aria-hidden", "true"], [1, "trade-recap"]], template: function LeagueFinalDemoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "nav", 1)(2, "a", 2);
      \u0275\u0275text(3, "\u2190 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 3);
      \u0275\u0275text(5, "LSL ");
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "/ LIVE STRATEGY LEAGUE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "span", 4);
      \u0275\u0275text(9, "SIMULATED FINAL EXAMPLE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "header", 5)(11, "div", 6)(12, "h1");
      \u0275\u0275text(13, "The final round");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 7)(17, "a", 8);
      \u0275\u0275text(18, "League lobby");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "a", 8);
      \u0275\u0275text(20, "Back to practice");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 9);
      \u0275\u0275listener("click", function LeagueFinalDemoComponent_Template_button_click_21_listener() {
        return ctx.showFinal();
      });
      \u0275\u0275text(22, "Show final standings");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, LeagueFinalDemoComponent_Conditional_23_Template, 2, 0, "button", 10)(24, LeagueFinalDemoComponent_Conditional_24_Template, 2, 1, "button", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 11)(26, "section", 12);
      \u0275\u0275element(27, "app-league-leaderboard", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "section", 14)(29, "div", 15)(30, "div")(31, "p", 16);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "h2", 17);
      \u0275\u0275text(34, "Decisions & trades");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 18)(36, "span");
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "strong", 19);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 20);
      \u0275\u0275element(41, "i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(42, LeagueFinalDemoComponent_Conditional_42_Template, 45, 23, "article", 21);
      \u0275\u0275elementStart(43, "div", 22)(44, "p", 16);
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p");
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(48, LeagueFinalDemoComponent_Conditional_48_Template, 13, 4, "div", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 24)(50, "section", 25)(51, "p", 16);
      \u0275\u0275text(52, "THE SETUP");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h2", 26);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p");
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "p");
      \u0275\u0275text(58);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "p");
      \u0275\u0275text(60, "Practice standings still update on reveal. This demo illustrates the finish and does not use or save your practice results.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "section", 27)(62, "p", 16);
      \u0275\u0275text(63);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "h2", 28);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "ol", 29);
      \u0275\u0275repeaterCreate(67, LeagueFinalDemoComponent_For_68_Template, 7, 3, "li", null, _forTrack0, false, LeagueFinalDemoComponent_ForEmpty_69_Template, 5, 1, "li");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_16_0;
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate2("Round ", ctx.config.rounds.length, " / ", ctx.config.rounds.length);
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(30, _c0, ctx.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(32, _c1, ctx.config.projectId));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.finished());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.finished() ? 23 : 24);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.config)("snapshot", ctx.snapshot())("yourTeamId", ctx.config.teams[0].id)("completedRounds", ctx.config.rounds.length)("animationStep", ctx.step())("statusLabel", ctx.finished() ? "FINAL STANDINGS" : "SIMULATED LIVE SCORES");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.finished() ? "THE WINNING DECISION" : "HAPPENING NOW");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("urgent", ctx.seconds() <= 10 && !ctx.finished());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.finished() ? "FINISHED" : ctx.playing() ? "TIME LEFT" : "PAUSED");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.timer());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.seconds() / ctx.demo.seconds * 100, "%");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_16_0 = ctx.decision()) ? 42 : -1, tmp_16_0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.finished() ? "FINAL WHISTLE" : "LEAGUE UPDATE");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.caption());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.finished() ? 48 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("One round. ", ctx.config.teams.length, " teams.");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.config.rounds[ctx.config.rounds.length - 1].description);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("This ", ctx.demo.seconds, "-second scripted example starts after ", ctx.config.rounds.length - 1, " rounds. Sample scores arrive in stages, moving teams up and down until the final whistle.");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.finished() ? "FINAL ROUND RECAP" : "ROUND UPDATES");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.finished() ? "How the finish unfolded" : "The story so far");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.updates());
    }
  }, dependencies: [RouterLink, LeagueLeaderboardComponent, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.league[_ngcontent-%COMP%] {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead[_ngcontent-%COMP%] {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back[_ngcontent-%COMP%] {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n[_ngcontent-%COMP%]:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage[_ngcontent-%COMP%] {\n  padding: 0 18px;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock[_ngcontent-%COMP%] {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent[_ngcontent-%COMP%] {\n  color: #ffbc93;\n}\n.phase[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved[_ngcontent-%COMP%] {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput[_ngcontent-%COMP%]:disabled, \ntextarea[_ngcontent-%COMP%]:disabled {\n  color: #8c9bb1;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #8d9bb0;\n}\n.cost[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note[_ngcontent-%COMP%] {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.history[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.recap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.recap-round[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.recap-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning[_ngcontent-%COMP%] {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap[_ngcontent-%COMP%] {\n  padding: 22px 0 8px;\n}\n.empty-recap[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 340px;\n}\n.history[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.champion[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error[_ngcontent-%COMP%] {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 18px;\n  }\n  .arena[_ngcontent-%COMP%] {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 12px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .decision-fields[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena[_ngcontent-%COMP%], \n   .round-information[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    flex: 1 0 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .round-information[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .masthead[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 10px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .project-header[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .saved[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .clock[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n}\n.focus-round-action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n.league[_ngcontent-%COMP%] {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */', "\n.arena[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);\n}\n.demo-stage[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.countdown[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 86px;\n  text-align: right;\n}\n.countdown[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #a7b9cf;\n  font-size: 8px;\n  letter-spacing: 0.1em;\n}\n.countdown[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 27px;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  line-height: 1.3;\n  font-variant-numeric: tabular-nums;\n}\n.time-track[_ngcontent-%COMP%] {\n  height: 3px;\n  border-radius: 3px;\n  background: #334258;\n  overflow: hidden;\n  margin-top: 5px;\n}\n.time-track[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background: #c5ed81;\n  transition: width 0.25s linear;\n}\n.urgent[_ngcontent-%COMP%]   .time-track[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  background: #ffbc93;\n}\n.decision-card[_ngcontent-%COMP%] {\n  margin-top: 19px;\n}\n.decision-team[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n}\n.team-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--%NS%team-color);\n}\n.decision-team[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: var(--%NS%team-color);\n}\n.decision-team[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n  color: #9bb0ca;\n  font-size: 8px;\n  letter-spacing: 0.06em;\n}\n.decision-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 23px;\n  line-height: 1.4;\n  letter-spacing: -0.02em;\n  margin: 12px 0 15px;\n  font-weight: 550;\n}\n.decision-options[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 7px;\n}\n.decision-options[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 10px 12px;\n  border: 1px solid #344358;\n  border-radius: 5px;\n  color: #afbed1;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.decision-options[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  background: rgba(197, 237, 129, 0.062745098);\n  border-color: rgba(197, 237, 129, 0.3764705882);\n  color: #ecf8db;\n}\n.option-marker[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  width: 23px;\n  height: 23px;\n  border: 1px solid #46556b;\n  border-radius: 50%;\n  font-size: 10px;\n}\n.selected[_ngcontent-%COMP%]   .option-marker[_ngcontent-%COMP%] {\n  color: #172012;\n  background: #c5ed81;\n  border-color: #c5ed81;\n}\n.decision-options[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #c5ed81;\n  font-size: 8px;\n}\n.decision-reason[_ngcontent-%COMP%] {\n  color: #b9c8db;\n  font-size: 12px;\n  line-height: 1.7;\n  margin: 14px 0;\n}\n.decision-reason[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #e3ebf7;\n  font-size: 10px;\n  margin-bottom: 4px;\n}\n.trade-ticket[_ngcontent-%COMP%] {\n  background: #101b28;\n  border: 1px solid #36465b;\n  border-radius: 5px;\n  padding: 14px;\n}\n.trade-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 13px;\n}\n.trade-heading[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 550;\n}\n.trade-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #aebed5;\n  font-size: 10px;\n}\n.trade-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n.trade-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  color: #9fb1ca;\n  margin-bottom: 5px;\n}\n.trade-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 21px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\n.trade-profit[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c5ed81;\n}\n.trade-impact[_ngcontent-%COMP%] {\n  font-size: 10px;\n  line-height: 1.6;\n  color: #b9c8db;\n  border-top: 1px solid #304054;\n  padding-top: 10px;\n  margin: 12px 0 0;\n}\n.live-call[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-left: 12px;\n  border-left: 2px solid #9cbbff;\n}\n.live-call[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n.live-call[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n  margin: 0;\n  color: #b5c5da;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.winner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-top: 16px;\n  padding: 13px 16px;\n  border: 1px solid rgba(203, 164, 89, 0.3607843137);\n  background: rgba(66, 53, 30, 0.3764705882);\n  border-radius: 5px;\n}\n.winner[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #f4cc76;\n  font-size: 24px;\n}\n.winner[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  margin-bottom: 3px;\n}\n.winner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: #ffe3a7;\n}\n.winner[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 21px;\n}\n.winner[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #cbbd9f;\n}\n.update-list[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 14px 0 0;\n  list-style: none;\n}\n.update-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 65px 1fr;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #334050;\n}\n.update-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border: 0;\n}\n.update-list[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 10px;\n  padding-top: 3px;\n}\n.update-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.update-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 550;\n}\n.update-list[_ngcontent-%COMP%]   .trade-recap[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 10px;\n  margin: 4px 0;\n}\n@media (max-width: 850px) {\n  .arena[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 450px) {\n  .decision-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .trade-metrics[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .trade-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .decision-options[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    padding: 9px;\n    gap: 8px;\n  }\n  .decision-team[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    font-size: 7px;\n  }\n  .countdown[_ngcontent-%COMP%] {\n    width: 66px;\n  }\n  .countdown[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .time-track[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=league-final-demo.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeagueFinalDemoComponent, [{
    type: Component,
    args: [{ selector: "app-league-final-demo", imports: [DecimalPipe, RouterLink, LeagueLeaderboardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="league">
  <nav class="masthead" aria-label="Main navigation"><a routerLink="/projects" class="back">\u2190 Projects</a><span class="wordmark">LSL <span>/ LIVE STRATEGY LEAGUE</span></span><span class="practice">SIMULATED FINAL EXAMPLE</span></nav>
  <header class="project-header" aria-label="Project title and playback controls">
    <div class="project-title"><h1>The final round</h1><span>Round {{ config.rounds.length }} / {{ config.rounds.length }}</span></div>
    <div class="actions"><a class="example-link" [routerLink]="['/projects', config.projectId]">League lobby</a><a class="example-link" [routerLink]="['/projects', config.projectId, 'activity']">Back to practice</a>
      <button (click)="showFinal()" [disabled]="finished()">Show final standings</button>
      @if (finished()) { <button class="primary" (click)="replay()">Replay demo \u21BB</button> }
      @else { <button class="primary" (click)="togglePlayback()">{{ playing() ? 'Pause demo' : 'Resume demo' }}</button> }
    </div>
  </header>
  <div class="arena">
    <section class="stage panel" aria-labelledby="standings-title">
      <app-league-leaderboard [config]="config" [snapshot]="snapshot()" [yourTeamId]="config.teams[0].id"
        [completedRounds]="config.rounds.length" [animationStep]="step()"
        [statusLabel]="finished() ? 'FINAL STANDINGS' : 'SIMULATED LIVE SCORES'"
        trendNote="Compared with the previous score update" note="Scripted example \xB7 Fictional teams \xB7 Scores are illustrative" />
    </section>
    <section class="command panel demo-stage" aria-labelledby="demo-title">
      <div class="section-heading"><div><p class="eyebrow">{{ finished() ? 'THE WINNING DECISION' : 'HAPPENING NOW' }}</p><h2 id="demo-title">Decisions & trades</h2></div>
        <div class="countdown" [class.urgent]="seconds() <= 10 && !finished()"><span>{{ finished() ? 'FINISHED' : playing() ? 'TIME LEFT' : 'PAUSED' }}</span><strong aria-label="Time remaining">{{ timer() }}</strong><div class="time-track"><i [style.width.%]="seconds() / demo.seconds * 100"></i></div></div>
      </div>
      @if (decision(); as choice) {
        <article class="decision-card" [style.--team-color]="choice.team.color" aria-labelledby="decision-question">
          <div class="decision-team"><span class="team-dot"></span><strong>{{ choice.team.name }}</strong><span>SIMULATED TEAM CHOICE</span></div>
          <h3 id="decision-question">{{ choice.question }}</h3>
          <ol class="decision-options" aria-label="Example choices">
            @for (option of choice.options; track $index) {
              <li [class.selected]="$index === choice.selected"><span class="option-marker" aria-hidden="true">{{ $index === choice.selected ? '\u2713' : $index + 1 }}</span><span>{{ option }}</span>@if ($index === choice.selected) { <small>CHOSEN</small> }</li>
            }
          </ol>
          <p class="decision-reason"><strong>Why this choice</strong>{{ choice.reasoning }}</p>
          <div class="trade-ticket">
            <div class="trade-heading"><h4>{{ choice.settled ? 'Trade completed' : 'Trade queued' }}</h4><span>{{ choice.units | number }} units \xD7 \${{ choice.unitPrice | number }}</span></div>
            <div class="trade-metrics"><div><span>Revenue</span><strong>\${{ choice.revenue | number }}</strong></div><div><span>Production cost</span><strong>\u2212\${{ choice.cost | number }}</strong></div><div class="trade-profit"><span>Profit \u2192 points</span><strong>{{ choice.profit >= 0 ? '+' : '\u2212' }}{{ (choice.profit < 0 ? -choice.profit : choice.profit) | number }}</strong></div></div>
            <p class="trade-impact" aria-live="polite">{{ choice.settled ? choice.team.name + ' is now #' + choice.rank + ' on the leaderboard.' : 'The next score update reveals where this trade puts the team.' }}</p>
          </div>
        </article>
      }
      <div class="live-call" aria-live="polite"><p class="eyebrow">{{ finished() ? 'FINAL WHISTLE' : 'LEAGUE UPDATE' }}</p><p>{{ caption() }}</p></div>
      @if (finished()) {
        <div class="winner" aria-live="polite"><span aria-hidden="true">\u2605</span><div><p class="eyebrow">LEAGUE CHAMPION</p><h3>{{ leader().name }}</h3></div><strong>{{ ranking()[0].score | number }} <small>points</small></strong></div>
      }
    </section>
    <div class="round-information">
      <section class="info panel" aria-labelledby="demo-info"><p class="eyebrow">THE SETUP</p><h2 id="demo-info">One round. {{ config.teams.length }} teams.</h2><p>{{ config.rounds[config.rounds.length - 1].description }}</p><p>This {{ demo.seconds }}-second scripted example starts after {{ config.rounds.length - 1 }} rounds. Sample scores arrive in stages, moving teams up and down until the final whistle.</p><p>Practice standings still update on reveal. This demo illustrates the finish and does not use or save your practice results.</p></section>
      <section class="recap panel" aria-labelledby="demo-recap"><p class="eyebrow">{{ finished() ? 'FINAL ROUND RECAP' : 'ROUND UPDATES' }}</p><h2 id="demo-recap">{{ finished() ? 'How the finish unfolded' : 'The story so far' }}</h2>
        <ol class="update-list">@for (frame of updates(); track frame.at) { <li><time>{{ demo.seconds - frame.at }}s left</time><div>@if (frame.decision; as trade) { <strong>{{ trade.options[trade.selected] }}</strong><p class="trade-recap">\${{ trade.units * trade.unitPrice | number }} revenue \u2212 \${{ trade.units * trade.unitCost | number }} cost = {{ trade.units * (trade.unitPrice - trade.unitCost) | number }} points</p> }<p>{{ frame.caption }}</p></div></li> } @empty { <li><time>At the start</time><p>{{ demo.openingCaption }}</p></li> }</ol>
      </section>
    </div>
  </div>
</main>
`, styles: ['/* src/app/templates/live-strategy-league/ui/league-shell.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.league {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark span {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1 {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title > span {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel p {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel small {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage {\n  padding: 0 18px;\n}\n.section-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2 {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent {\n  color: #ffbc93;\n}\n.phase {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round > span {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round strong {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round small {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading h3 {\n  font-size: 15px;\n}\n.team-heading h3 span {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics span {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics strong {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel span {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput:disabled,\ntextarea:disabled {\n  color: #8c9bb1;\n}\ntextarea {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea::placeholder {\n  color: #8d9bb0;\n}\n.cost {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info p:not(.eyebrow),\n.recap p:not(.eyebrow),\n.history p {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info h3 {\n  margin-top: 22px;\n}\n.info h2,\n.recap h2 {\n  font-size: 20px;\n}\n.info p:last-child {\n  margin-bottom: 0;\n}\n.recap-round {\n  margin-top: 12px;\n}\n.recap-metrics {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics span {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics strong {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap {\n  padding: 22px 0 8px;\n}\n.empty-recap > span {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap p {\n  max-width: 340px;\n}\n.history {\n  grid-column: 1/-1;\n}\n.history article {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history article:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history strong {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion h3 {\n  font-size: 22px;\n}\n.champion p:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league {\n    padding-inline: 18px;\n  }\n  .arena {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel {\n    padding: 16px;\n  }\n  .stage {\n    padding: 0 12px;\n  }\n  .project-title {\n    gap: 10px;\n  }\n  h1 {\n    font-size: 18px;\n  }\n  .project-title > span {\n    padding-left: 10px;\n  }\n  .reflection-fields {\n    gap: 10px;\n  }\n  .decision-fields {\n    gap: 8px;\n  }\n  h2 {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena,\n  .round-information {\n    grid-template-columns: 1fr;\n  }\n  .project-title {\n    flex: 1 0 100%;\n  }\n  .project-header > .actions {\n    width: 100%;\n  }\n  .project-header > .actions .primary {\n    margin-left: auto;\n  }\n  .round-information {\n    gap: 14px;\n  }\n  .masthead {\n    gap: 14px;\n  }\n  .practice {\n    font-size: 8px;\n  }\n  .wordmark span {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league {\n    padding-inline: 10px;\n  }\n  .project-title {\n    justify-content: space-between;\n  }\n  h1 {\n    font-size: 16px;\n  }\n  .project-title > span {\n    font-size: 9px;\n  }\n  .project-header .actions {\n    gap: 5px;\n  }\n  button {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel {\n    padding: 14px;\n  }\n  .stage {\n    padding: 0 10px;\n  }\n  .reflection-fields {\n    grid-template-columns: 1fr;\n  }\n  .saved {\n    display: none;\n  }\n  .clock {\n    font-size: 25px;\n  }\n  .section-heading h2 {\n    font-size: 19px;\n  }\n}\n.focus-round-action {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action button {\n  min-height: 48px;\n}\n.league {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */\n', "/* src/app/templates/live-strategy-league/ui/league-final-demo.component.scss */\n.arena {\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);\n}\n.demo-stage {\n  display: flex;\n  flex-direction: column;\n}\n.countdown {\n  flex-shrink: 0;\n  width: 86px;\n  text-align: right;\n}\n.countdown > span {\n  color: #a7b9cf;\n  font-size: 8px;\n  letter-spacing: 0.1em;\n}\n.countdown > strong {\n  display: block;\n  font-size: 27px;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  line-height: 1.3;\n  font-variant-numeric: tabular-nums;\n}\n.time-track {\n  height: 3px;\n  border-radius: 3px;\n  background: #334258;\n  overflow: hidden;\n  margin-top: 5px;\n}\n.time-track i {\n  display: block;\n  height: 100%;\n  background: #c5ed81;\n  transition: width 0.25s linear;\n}\n.urgent .time-track i {\n  background: #ffbc93;\n}\n.decision-card {\n  margin-top: 19px;\n}\n.decision-team {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n}\n.team-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--team-color);\n}\n.decision-team > strong {\n  color: var(--team-color);\n}\n.decision-team > span:last-child {\n  margin-left: auto;\n  color: #9bb0ca;\n  font-size: 8px;\n  letter-spacing: 0.06em;\n}\n.decision-card h3 {\n  font-size: 23px;\n  line-height: 1.4;\n  letter-spacing: -0.02em;\n  margin: 12px 0 15px;\n  font-weight: 550;\n}\n.decision-options {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 7px;\n}\n.decision-options li {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 10px 12px;\n  border: 1px solid #344358;\n  border-radius: 5px;\n  color: #afbed1;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.decision-options .selected {\n  background: rgba(197, 237, 129, 0.062745098);\n  border-color: rgba(197, 237, 129, 0.3764705882);\n  color: #ecf8db;\n}\n.option-marker {\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  width: 23px;\n  height: 23px;\n  border: 1px solid #46556b;\n  border-radius: 50%;\n  font-size: 10px;\n}\n.selected .option-marker {\n  color: #172012;\n  background: #c5ed81;\n  border-color: #c5ed81;\n}\n.decision-options small {\n  margin-left: auto;\n  color: #c5ed81;\n  font-size: 8px;\n}\n.decision-reason {\n  color: #b9c8db;\n  font-size: 12px;\n  line-height: 1.7;\n  margin: 14px 0;\n}\n.decision-reason strong {\n  display: block;\n  color: #e3ebf7;\n  font-size: 10px;\n  margin-bottom: 4px;\n}\n.trade-ticket {\n  background: #101b28;\n  border: 1px solid #36465b;\n  border-radius: 5px;\n  padding: 14px;\n}\n.trade-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 13px;\n}\n.trade-heading h4 {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 550;\n}\n.trade-heading > span {\n  color: #aebed5;\n  font-size: 10px;\n}\n.trade-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n.trade-metrics span {\n  display: block;\n  font-size: 9px;\n  color: #9fb1ca;\n  margin-bottom: 5px;\n}\n.trade-metrics strong {\n  font-size: 21px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\n.trade-profit strong {\n  color: #c5ed81;\n}\n.trade-impact {\n  font-size: 10px;\n  line-height: 1.6;\n  color: #b9c8db;\n  border-top: 1px solid #304054;\n  padding-top: 10px;\n  margin: 12px 0 0;\n}\n.live-call {\n  margin-top: 16px;\n  padding-left: 12px;\n  border-left: 2px solid #9cbbff;\n}\n.live-call .eyebrow {\n  margin-bottom: 5px;\n}\n.live-call > p:last-child {\n  margin: 0;\n  color: #b5c5da;\n  font-size: 11px;\n  line-height: 1.6;\n}\n.winner {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-top: 16px;\n  padding: 13px 16px;\n  border: 1px solid rgba(203, 164, 89, 0.3607843137);\n  background: rgba(66, 53, 30, 0.3764705882);\n  border-radius: 5px;\n}\n.winner > span {\n  color: #f4cc76;\n  font-size: 24px;\n}\n.winner .eyebrow {\n  font-size: 8px;\n  margin-bottom: 3px;\n}\n.winner h3 {\n  font-size: 19px;\n  color: #ffe3a7;\n}\n.winner > strong {\n  margin-left: auto;\n  font-size: 21px;\n}\n.winner small {\n  font-size: 10px;\n  color: #cbbd9f;\n}\n.update-list {\n  padding: 0;\n  margin: 14px 0 0;\n  list-style: none;\n}\n.update-list li {\n  display: grid;\n  grid-template-columns: 65px 1fr;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #334050;\n}\n.update-list li:last-child {\n  border: 0;\n}\n.update-list time {\n  color: #c5ed81;\n  font-size: 10px;\n  padding-top: 3px;\n}\n.update-list p {\n  margin: 0;\n}\n.update-list strong {\n  font-size: 12px;\n  font-weight: 550;\n}\n.update-list .trade-recap {\n  color: #c5ed81;\n  font-size: 10px;\n  margin: 4px 0;\n}\n@media (max-width: 850px) {\n  .arena {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 450px) {\n  .decision-card h3 {\n    font-size: 20px;\n  }\n  .trade-metrics {\n    gap: 8px;\n  }\n  .trade-metrics strong {\n    font-size: 17px;\n  }\n  .decision-options li {\n    padding: 9px;\n    gap: 8px;\n  }\n  .decision-team > span:last-child {\n    font-size: 7px;\n  }\n  .countdown {\n    width: 66px;\n  }\n  .countdown > strong {\n    font-size: 24px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .time-track i {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=league-final-demo.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeagueFinalDemoComponent, { className: "LeagueFinalDemoComponent", filePath: "src/app/templates/live-strategy-league/ui/league-final-demo.component.ts", lineNumber: 16 });
})();
export {
  LeagueFinalDemoComponent
};
//# debugId=90196f23-0251-5109-a1d3-89babc1157bc
//# sourceMappingURL=chunk-BANRYDOP.js.map
