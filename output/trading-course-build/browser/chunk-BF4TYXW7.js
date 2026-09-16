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
  createLeague
} from "./chunk-EMQ2ALBA.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/live-strategy-league/ui/league-launch.component.ts
var _c0 = (a0) => ["/projects", a0, "activity"];
var _c1 = (a0) => ["/projects", a0, "final-demo"];
function LeagueLaunchComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function LeagueLaunchComponent_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePreview());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 31);
    \u0275\u0275text(3, "Watch the final \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.playing() ? "Pause preview" : "Resume preview");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c1, ctx_r1.config.projectId));
  }
}
function LeagueLaunchComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 17);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.team.imageUrl, \u0275\u0275sanitizeUrl)("alt", "Fictional " + ctx_r1.team.name + " team");
  }
}
function LeagueLaunchComponent_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const round_r3 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(($index_r4 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(round_r3.title);
  }
}
var LeagueLaunchComponent = class _LeagueLaunchComponent {
  config = inject(LEAGUE_CONFIG);
  copy = this.config.launch;
  team = this.config.teams[0];
  demo = this.config.finalDemo ? requireLeagueDemo(this.config.finalDemo, this.config) : null;
  playing = signal(
    true,
    ...ngDevMode ? [{ debugName: "playing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  elapsed = signal(
    0,
    ...ngDevMode ? [{ debugName: "elapsed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cycle = computed(
    () => this.demo ? Math.floor(this.elapsed() / (this.demo.seconds + 6)) : 0,
    ...ngDevMode ? [{ debugName: "cycle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = computed(
    () => {
      const demo = this.demo;
      return demo ? demo.frames.filter((frame) => frame.at <= this.elapsed() % (demo.seconds + 6)).length : 0;
    },
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  animationStep = computed(
    () => this.cycle() * ((this.demo?.frames.length ?? 0) + 1) + this.step(),
    ...ngDevMode ? [{ debugName: "animationStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = computed(
    () => this.demo ? leagueDemoSnapshot(this.config, this.demo, this.step()) : createLeague(this.config),
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastTick = Date.now();
  interval = this.demo ? setInterval(() => this.tick(), 500) : null;
  tick() {
    const now = Date.now();
    if (this.playing())
      this.elapsed.update((value) => value + Math.max(0, now - this.lastTick) / 1e3);
    this.lastTick = now;
  }
  togglePreview() {
    this.tick();
    this.playing.update((value) => !value);
  }
  ngOnDestroy() {
    if (this.interval !== null)
      clearInterval(this.interval);
  }
  static \u0275fac = function LeagueLaunchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeagueLaunchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeagueLaunchComponent, selectors: [["app-league-launch"]], decls: 88, vars: 23, consts: [[1, "league", "launch"], ["aria-label", "Main navigation", 1, "masthead"], ["routerLink", "/projects", 1, "back"], [1, "wordmark"], [1, "practice"], ["aria-label", "Project title and launch controls", 1, "project-header"], [1, "project-title"], [1, "actions"], [1, "enter-league", 3, "routerLink"], ["aria-hidden", "true"], [1, "launch-arena"], ["aria-labelledby", "challenge-title", 1, "invitation"], [1, "challenge-tag"], ["id", "challenge-title"], [1, "challenge-copy"], ["aria-label", "Challenge format", 1, "stakes"], [1, "player-card"], ["width", "96", "height", "96", 3, "src", "alt"], [1, "eyebrow"], [1, "win-condition"], ["viewBox", "0 0 32 32", "aria-hidden", "true"], ["d", "m4 9 7 5 5-9 5 9 7-5-3 16H7Z"], ["d", "M8 29h16"], ["aria-labelledby", "standings-title", 1, "preview-board", "panel"], [1, "preview-intro"], [1, "signal-dot"], ["trendNote", "Rank movement in this sample", "note", "Fictional teams \xB7 Sample scores \xB7 Your practice starts separately", 3, "config", "snapshot", "yourTeamId", "completedRounds", "animationStep", "statusLabel"], ["aria-labelledby", "mission-title", 1, "mission-brief"], ["id", "mission-title"], [1, "round-briefs"], [1, "preview-toggle", 3, "click"], [1, "demo-link", 3, "routerLink"]], template: function LeagueLaunchComponent_Template(rf, ctx) {
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
      \u0275\u0275text(9, "LOCAL PRACTICE \xB7 FICTIONAL RIVALS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "header", 5)(11, "div", 6)(12, "h1");
      \u0275\u0275text(13, "Live Strategy League");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "League lobby");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 7);
      \u0275\u0275conditionalCreate(17, LeagueLaunchComponent_Conditional_17_Template, 4, 4);
      \u0275\u0275elementStart(18, "a", 8);
      \u0275\u0275text(19, "Enter the league ");
      \u0275\u0275elementStart(20, "span", 9);
      \u0275\u0275text(21, "\u2192");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(22, "div", 10)(23, "section", 11)(24, "p", 12);
      \u0275\u0275element(25, "span");
      \u0275\u0275text(26, "THE LEAGUE IS WAITING");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "h2", 13);
      \u0275\u0275text(28);
      \u0275\u0275elementStart(29, "em");
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "p", 14);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 15)(34, "div")(35, "strong");
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "TEAMS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div")(40, "strong");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43, "ROUNDS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div")(45, "strong");
      \u0275\u0275text(46, "01");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "TOP SPOT");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "article", 16);
      \u0275\u0275conditionalCreate(50, LeagueLaunchComponent_Conditional_50_Template, 1, 2, "img", 17);
      \u0275\u0275elementStart(51, "div")(52, "p", 18);
      \u0275\u0275text(53, "YOUR TEAM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "h3");
      \u0275\u0275text(55);
      \u0275\u0275elementStart(56, "span");
      \u0275\u0275text(57, "YOU");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "p");
      \u0275\u0275text(59, "Your next decision could change the table.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "div", 19);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(61, "svg", 20);
      \u0275\u0275element(62, "path", 21)(63, "path", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(64, "div")(65, "h3");
      \u0275\u0275text(66, "The win condition");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "p");
      \u0275\u0275text(68);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(69, "section", 23)(70, "div", 24);
      \u0275\u0275element(71, "span", 25);
      \u0275\u0275elementStart(72, "span");
      \u0275\u0275text(73);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "small");
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(76, "app-league-leaderboard", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "section", 27)(78, "div")(79, "p", 18);
      \u0275\u0275text(80, "YOUR MISSION");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "h2", 28);
      \u0275\u0275text(82, "Every decision is a chance to climb.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "p");
      \u0275\u0275text(84);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "ol", 29);
      \u0275\u0275repeaterCreate(86, LeagueLaunchComponent_For_87_Template, 5, 2, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275conditional(ctx.demo ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c0, ctx.config.projectId));
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.copy?.headline ?? ctx.config.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.copy?.highlight ?? "Make your move.");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.copy?.invitation ?? ctx.config.description);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.config.teams.length.toString().padStart(2, "0"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.config.rounds.length.toString().padStart(2, "0"));
      \u0275\u0275advance(8);
      \u0275\u0275styleProp("--%NS%team-color", ctx.team.color);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.team.imageUrl ? 50 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.team.name, " ");
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.copy?.winCondition ?? "Finish at the top of the final leaderboard.");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.demo ? "A TASTE OF THE FINAL ROUND" : "MEET YOUR COMPETITION");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.demo ? "SIMULATED PREVIEW" : "STARTING GRID");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.config)("snapshot", ctx.snapshot())("yourTeamId", ctx.team.id)("completedRounds", ctx.demo ? ctx.config.rounds.length : 0)("animationStep", ctx.animationStep())("statusLabel", ctx.demo ? ctx.playing() ? "PREVIEW IN MOTION" : "PREVIEW PAUSED" : "READY TO START");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.copy?.mission ?? ctx.config.description);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.config.rounds);
    }
  }, dependencies: [RouterLink, LeagueLeaderboardComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.league[_ngcontent-%COMP%] {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead[_ngcontent-%COMP%] {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back[_ngcontent-%COMP%] {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n[_ngcontent-%COMP%]:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel[_ngcontent-%COMP%] {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel[_ngcontent-%COMP%] {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage[_ngcontent-%COMP%] {\n  padding: 0 18px;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock[_ngcontent-%COMP%] {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent[_ngcontent-%COMP%] {\n  color: #ffbc93;\n}\n.phase[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.team-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved[_ngcontent-%COMP%] {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput[_ngcontent-%COMP%]:disabled, \ntextarea[_ngcontent-%COMP%]:disabled {\n  color: #8c9bb1;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea[_ngcontent-%COMP%]::placeholder {\n  color: #8d9bb0;\n}\n.cost[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note[_ngcontent-%COMP%] {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow), \n.history[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.recap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.recap-round[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.recap-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning[_ngcontent-%COMP%] {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap[_ngcontent-%COMP%] {\n  padding: 22px 0 8px;\n}\n.empty-recap[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 340px;\n}\n.history[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.champion[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error[_ngcontent-%COMP%] {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 18px;\n  }\n  .arena[_ngcontent-%COMP%] {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 12px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    padding-left: 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .decision-fields[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena[_ngcontent-%COMP%], \n   .round-information[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    flex: 1 0 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .project-header[_ngcontent-%COMP%]    > .actions[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .round-information[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .masthead[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  .wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league[_ngcontent-%COMP%] {\n    padding-inline: 10px;\n  }\n  .project-title[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .project-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .project-header[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .stage[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .reflection-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .saved[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .clock[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n}\n.focus-round-action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n.league[_ngcontent-%COMP%] {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */', '\n.launch[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n}\n.launch[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 115px 0 0;\n  z-index: -1;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      ellipse at 22% 18%,\n      rgba(135, 183, 72, 0.0745098039),\n      transparent 44%),\n    linear-gradient(\n      90deg,\n      rgba(165, 205, 119, 0.062745098) 1px,\n      transparent 1px),\n    linear-gradient(rgba(165, 205, 119, 0.031372549) 1px, transparent 1px);\n  background-size:\n    auto,\n    60px 60px,\n    60px 60px;\n  -webkit-mask-image: linear-gradient(#000, transparent 90%);\n  mask-image: linear-gradient(#000, transparent 90%);\n}\n.project-header[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  padding: 10px 15px;\n  border-radius: 5px;\n  text-decoration: none;\n  font-size: 11px;\n  min-height: 40px;\n}\n.demo-link[_ngcontent-%COMP%] {\n  color: #d4dfed;\n  border: 1px solid #425168;\n  background: #1d2938;\n}\n.enter-league[_ngcontent-%COMP%] {\n  background: #c5ed81;\n  color: #172012;\n  font-weight: 750;\n  border: 1px solid #c5ed81;\n  box-shadow: 0 0 25px rgba(197, 237, 129, 0.0823529412);\n}\n.enter-league[_ngcontent-%COMP%]:hover {\n  background: #d9ffa1;\n}\n.enter-league[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.preview-toggle[_ngcontent-%COMP%] {\n  color: #a8bad2;\n  background: transparent;\n  border-color: transparent;\n}\n.launch-arena[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);\n  gap: 36px;\n  align-items: start;\n  padding-top: 24px;\n}\n.invitation[_ngcontent-%COMP%] {\n  padding: 18px 0 0;\n}\n.challenge-tag[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.17em;\n  margin: 0 0 24px;\n}\n.challenge-tag[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.signal-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #c5ed81;\n  margin-right: 9px;\n  box-shadow: 0 0 12px rgba(197, 237, 129, 0.3764705882);\n}\n.invitation[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(42px, 5.5vw, 76px);\n  font-weight: 800;\n  line-height: 0.99;\n  letter-spacing: -0.06em;\n  max-width: 610px;\n  text-transform: uppercase;\n}\n.invitation[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  display: block;\n  font-style: normal;\n  color: #c5ed81;\n  margin-top: 8px;\n}\n.challenge-copy[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #b3c4db;\n  line-height: 1.8;\n  max-width: 440px;\n  margin: 24px 0;\n}\n.stakes[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 34px;\n  padding: 6px 0 26px;\n}\n.stakes[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.stakes[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 32px;\n  letter-spacing: -0.05em;\n  font-weight: 650;\n}\n.stakes[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 0.1em;\n  color: #a7b8d1;\n  max-width: 40px;\n  line-height: 1.6;\n}\n.player-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 19px;\n  border: 1px solid rgba(197, 237, 129, 0.2509803922);\n  border-left: 3px solid var(--%NS%team-color);\n  border-radius: 6px;\n  padding: 16px;\n  background:\n    linear-gradient(\n      110deg,\n      #2c3a25,\n      #1a2431);\n  max-width: 500px;\n}\n.player-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 5px;\n  border: 1px solid rgba(197, 237, 129, 0.4392156863);\n}\n.player-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 28px;\n  letter-spacing: -0.03em;\n  font-weight: 600;\n}\n.player-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #c5ed81;\n  border: 1px solid rgba(197, 237, 129, 0.3137254902);\n  padding: 3px 5px;\n  vertical-align: middle;\n  margin-left: 8px;\n  border-radius: 3px;\n}\n.player-card[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.player-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #b2c3d5;\n  margin: 7px 0 0;\n}\n.win-condition[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: flex-start;\n  margin: 24px 0;\n  max-width: 450px;\n}\n.win-condition[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  fill: none;\n  stroke: #e9c879;\n  stroke-width: 1.7;\n  flex-shrink: 0;\n}\n.win-condition[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #f0d698;\n}\n.win-condition[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #aabed6;\n  font-size: 12px;\n  line-height: 1.7;\n  margin: 7px 0 0;\n}\n.preview-board[_ngcontent-%COMP%] {\n  padding: 0 18px;\n  border-color: rgba(82, 104, 71, 0.4392156863);\n  background:\n    linear-gradient(\n      160deg,\n      #1c2934,\n      #141d29);\n  box-shadow: 0 16px 70px rgba(0, 0, 0, 0.3333333333);\n}\n.preview-intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 4px;\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(62, 79, 89, 0.3764705882);\n  color: #b6c8d8;\n  font-size: 8px;\n  letter-spacing: 0.08em;\n}\n.preview-intro[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #91a4bd;\n  font-size: 7px;\n}\n.preview-intro[_ngcontent-%COMP%]   .signal-dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n}\n.mission-brief[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 34px;\n  padding: 25px 0 0;\n  margin-top: 24px;\n  border-top: 1px solid #344250;\n}\n.mission-brief[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.mission-brief[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {\n  color: #aebed4;\n  font-size: 12px;\n  line-height: 1.8;\n  max-width: 560px;\n}\n.round-briefs[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}\n.round-briefs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 13px;\n  background: #1b2735;\n  border: 1px solid #36465a;\n  border-radius: 4px;\n}\n.round-briefs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 11px;\n}\n.round-briefs[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n}\n@media (max-width: 1050px) {\n  .launch-arena[_ngcontent-%COMP%] {\n    gap: 24px;\n    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  }\n  .invitation[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 52px;\n  }\n  .stakes[_ngcontent-%COMP%] {\n    gap: 18px;\n  }\n  .stakes[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .player-card[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .player-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n  }\n}\n@media (max-width: 850px) {\n  .launch-arena[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-top: 10px;\n  }\n  .invitation[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: clamp(46px, 10vw, 72px);\n  }\n  .challenge-copy[_ngcontent-%COMP%] {\n    max-width: 550px;\n  }\n  .mission-brief[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .player-card[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n  .launch[_ngcontent-%COMP%]::before {\n    inset-inline: 0;\n  }\n}\n@media (max-width: 450px) {\n  .preview-board[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    padding: 9px 10px;\n    font-size: 10px;\n    gap: 10px;\n  }\n  .preview-toggle[_ngcontent-%COMP%] {\n    padding-inline: 3px;\n    font-size: 9px;\n  }\n  .challenge-copy[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .invitation[_ngcontent-%COMP%] {\n    padding-top: 10px;\n  }\n  .challenge-tag[_ngcontent-%COMP%] {\n    margin-bottom: 17px;\n  }\n  .stakes[_ngcontent-%COMP%] {\n    gap: 22px;\n  }\n  .round-briefs[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=league-launch.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeagueLaunchComponent, [{
    type: Component,
    args: [{ selector: "app-league-launch", imports: [RouterLink, LeagueLeaderboardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="league launch">
  <nav class="masthead" aria-label="Main navigation"><a routerLink="/projects" class="back">\u2190 Projects</a><span class="wordmark">LSL <span>/ LIVE STRATEGY LEAGUE</span></span><span class="practice">LOCAL PRACTICE \xB7 FICTIONAL RIVALS</span></nav>
  <header class="project-header" aria-label="Project title and launch controls">
    <div class="project-title"><h1>Live Strategy League</h1><span>League lobby</span></div>
    <div class="actions">
      @if (demo) { <button class="preview-toggle" (click)="togglePreview()">{{ playing() ? 'Pause preview' : 'Resume preview' }}</button><a class="demo-link" [routerLink]="['/projects', config.projectId, 'final-demo']">Watch the final \u2197</a> }
      <a class="enter-league" [routerLink]="['/projects', config.projectId, 'activity']">Enter the league <span aria-hidden="true">\u2192</span></a>
    </div>
  </header>

  <div class="launch-arena">
    <section class="invitation" aria-labelledby="challenge-title">
      <p class="challenge-tag"><span></span>THE LEAGUE IS WAITING</p>
      <h2 id="challenge-title">{{ copy?.headline ?? config.title }}<em>{{ copy?.highlight ?? 'Make your move.' }}</em></h2>
      <p class="challenge-copy">{{ copy?.invitation ?? config.description }}</p>
      <div class="stakes" aria-label="Challenge format"><div><strong>{{ config.teams.length.toString().padStart(2, '0') }}</strong><span>TEAMS</span></div><div><strong>{{ config.rounds.length.toString().padStart(2, '0') }}</strong><span>ROUNDS</span></div><div><strong>01</strong><span>TOP SPOT</span></div></div>
      <article class="player-card" [style.--team-color]="team.color">
        @if (team.imageUrl) { <img [src]="team.imageUrl" [alt]="'Fictional ' + team.name + ' team'" width="96" height="96"> }
        <div><p class="eyebrow">YOUR TEAM</p><h3>{{ team.name }} <span>YOU</span></h3><p>Your next decision could change the table.</p></div>
      </article>
      <div class="win-condition"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 9 7 5 5-9 5 9 7-5-3 16H7Z"/><path d="M8 29h16"/></svg><div><h3>The win condition</h3><p>{{ copy?.winCondition ?? 'Finish at the top of the final leaderboard.' }}</p></div></div>
    </section>

    <section class="preview-board panel" aria-labelledby="standings-title">
      <div class="preview-intro"><span class="signal-dot"></span><span>{{ demo ? 'A TASTE OF THE FINAL ROUND' : 'MEET YOUR COMPETITION' }}</span><small>{{ demo ? 'SIMULATED PREVIEW' : 'STARTING GRID' }}</small></div>
      <app-league-leaderboard [config]="config" [snapshot]="snapshot()" [yourTeamId]="team.id"
        [completedRounds]="demo ? config.rounds.length : 0" [animationStep]="animationStep()"
        [statusLabel]="demo ? (playing() ? 'PREVIEW IN MOTION' : 'PREVIEW PAUSED') : 'READY TO START'"
        trendNote="Rank movement in this sample" note="Fictional teams \xB7 Sample scores \xB7 Your practice starts separately" />
    </section>
  </div>

  <section class="mission-brief" aria-labelledby="mission-title"><div><p class="eyebrow">YOUR MISSION</p><h2 id="mission-title">Every decision is a chance to climb.</h2><p>{{ copy?.mission ?? config.description }}</p></div><ol class="round-briefs">@for (round of config.rounds; track $index) { <li><span>{{ ($index + 1).toString().padStart(2, '0') }}</span><strong>{{ round.title }}</strong></li> }</ol></section>
</main>
`, styles: ['/* src/app/templates/live-strategy-league/ui/league-shell.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  color: #e6eaf1;\n  background: #10151e;\n  font-family:\n    Inter,\n    "Segoe UI",\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.league {\n  max-width: 1500px;\n  margin: auto;\n  padding: 0 28px 28px;\n}\n.masthead {\n  height: 54px;\n  display: flex;\n  align-items: center;\n  gap: 28px;\n  border-bottom: 1px solid #2a3240;\n}\n.back {\n  color: #bbc8db;\n  text-decoration: none;\n  font-size: 12px;\n}\n.wordmark {\n  color: #c5ed81;\n  font-size: 17px;\n  font-weight: 800;\n}\n.wordmark span {\n  color: #c5cfdd;\n  font-size: 10px;\n  letter-spacing: 0.07em;\n  margin-left: 8px;\n}\n.practice {\n  margin-left: auto;\n  font-size: 9px;\n  color: #9aaac0;\n  letter-spacing: 0.07em;\n}\n.project-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n  padding: 15px 0;\n  margin-bottom: 5px;\n}\n.project-title {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\nh1 {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\n.project-title > span {\n  font-size: 10px;\n  color: #aebcd0;\n  white-space: nowrap;\n  border-left: 1px solid #394454;\n  padding-left: 15px;\n}\n.actions {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\nbutton {\n  background: #202935;\n  color: #edf1f8;\n  border: 1px solid #3a4758;\n  border-radius: 5px;\n  padding: 9px 12px;\n  min-height: 38px;\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n}\nbutton:hover:not(:disabled) {\n  background: #303e50;\n}\nbutton.primary {\n  background: #c5ed81;\n  color: #172012;\n  border-color: #c5ed81;\n  font-weight: 700;\n}\nbutton.primary:hover:not(:disabled) {\n  background: #dcffa6;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n:is(button, a, input, textarea):focus-visible {\n  outline: 3px solid #e1ffaf;\n  outline-offset: 3px;\n}\n.example-link {\n  display: inline-flex;\n  align-items: center;\n  color: #c5ed81;\n  font-size: 11px;\n  padding: 9px;\n  text-decoration: none;\n}\n.teacher-panel {\n  flex-basis: 100%;\n  padding: 18px;\n  border: 1px solid #445365;\n  background: #1b2431;\n  border-radius: 6px;\n}\n.teacher-panel p {\n  margin-top: 0;\n  font-size: 12px;\n}\n.teacher-panel small {\n  display: block;\n  margin-top: 12px;\n  color: #aebdd0;\n  font-size: 11px;\n}\n.arena {\n  display: grid;\n  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);\n  align-items: stretch;\n  gap: 18px;\n}\n.panel {\n  min-width: 0;\n  border: 1px solid #2e3b4b;\n  border-radius: 8px;\n  background: #17202c;\n  padding: 20px;\n}\n.stage {\n  padding: 0 18px;\n}\n.section-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.eyebrow {\n  color: #acbe92;\n  font-size: 9px;\n  letter-spacing: 0.13em;\n  font-weight: 700;\n  margin: 0 0 9px;\n}\nh2 {\n  margin: 0;\n  font-size: 22px;\n  line-height: 1.25;\n  font-weight: 600;\n  letter-spacing: -0.025em;\n}\nh3 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n}\n.round-status {\n  display: grid;\n  gap: 5px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.clock {\n  font-size: 30px;\n  line-height: 1;\n  font-weight: 550;\n  letter-spacing: -0.03em;\n  font-variant-numeric: tabular-nums;\n}\n.urgent {\n  color: #ffbc93;\n}\n.phase {\n  font-size: 9px;\n  color: #c5ed81;\n}\n.current-event {\n  font-size: 12px;\n  color: #b6c5d9;\n  margin: 15px 0;\n}\n.next-round {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px 12px;\n  padding: 11px 12px;\n  background: #202c3c;\n  border-left: 2px solid #91aecf;\n  border-radius: 3px;\n}\n.next-round > span {\n  font-size: 8px;\n  color: #acc2de;\n  letter-spacing: 0.09em;\n}\n.next-round strong {\n  font-size: 12px;\n  font-weight: 500;\n}\n.next-round small {\n  margin-left: auto;\n  font-size: 9px;\n  color: #aebdd0;\n}\n.team-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin: 23px 0 16px;\n}\n.team-heading h3 {\n  font-size: 15px;\n}\n.team-heading h3 span {\n  color: #c5ed81;\n  font-size: 8px;\n  margin-left: 8px;\n  letter-spacing: 0.05em;\n}\n.saved {\n  color: #91a2ba;\n  font-size: 9px;\n}\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n  padding-bottom: 19px;\n  border-bottom: 1px solid #334050;\n}\n.metrics span {\n  display: block;\n  color: #aab8ce;\n  font-size: 9px;\n  margin-bottom: 7px;\n}\n.metrics strong {\n  font-size: 18px;\n  font-weight: 550;\n  font-variant-numeric: tabular-nums;\n}\nfieldset {\n  border: 0;\n  margin: 19px 0 0;\n  padding: 0;\n  min-width: 0;\n}\nlegend {\n  margin-bottom: 14px;\n  font-size: 14px;\n  font-weight: 600;\n}\n.decision-fields {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\nlabel {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 4px;\n  font-size: 10px;\n  margin-bottom: 7px;\n}\nlabel span {\n  font-size: 8px;\n  color: #a6b5cd;\n}\ninput,\ntextarea {\n  display: block;\n  width: 100%;\n  min-height: 40px;\n  background: #101822;\n  border: 1px solid #3c4b5f;\n  border-radius: 4px;\n  color: #edf3fd;\n  padding: 9px 10px;\n  font: inherit;\n  font-size: 12px;\n}\ninput:disabled,\ntextarea:disabled {\n  color: #8c9bb1;\n}\ntextarea {\n  resize: vertical;\n  line-height: 1.45;\n}\ntextarea::placeholder {\n  color: #8d9bb0;\n}\n.cost {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px 0 17px;\n  color: #c5ed81;\n  font-size: 11px;\n}\n.reflection-fields {\n  display: grid;\n  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);\n  gap: 14px;\n}\n.form-note {\n  color: #a7b6cc;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 13px 0 0;\n}\n.round-information {\n  grid-column: 1/-1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 18px;\n}\n.info p:not(.eyebrow),\n.recap p:not(.eyebrow),\n.history p {\n  color: #b5c4d8;\n  font-size: 12px;\n  line-height: 1.75;\n}\n.info h3 {\n  margin-top: 22px;\n}\n.info h2,\n.recap h2 {\n  font-size: 20px;\n}\n.info p:last-child {\n  margin-bottom: 0;\n}\n.recap-round {\n  margin-top: 12px;\n}\n.recap-metrics {\n  display: flex;\n  gap: 35px;\n  padding: 8px 0;\n}\n.recap-metrics span {\n  display: block;\n  font-size: 10px;\n  color: #aabbd1;\n  margin-bottom: 5px;\n}\n.recap-metrics strong {\n  font-size: 25px;\n  font-weight: 550;\n  color: #c5ed81;\n}\n.recap-reasoning {\n  border-left: 2px solid #526779;\n  padding-left: 12px;\n}\n.empty-recap {\n  padding: 22px 0 8px;\n}\n.empty-recap > span {\n  display: block;\n  font-size: 27px;\n  color: #9cb2ce;\n  margin-bottom: 12px;\n}\n.empty-recap p {\n  max-width: 340px;\n}\n.history {\n  grid-column: 1/-1;\n}\n.history article {\n  border-bottom: 1px solid #344152;\n  padding: 19px 0;\n}\n.history article:last-child {\n  border: 0;\n  padding-bottom: 0;\n}\n.history strong {\n  color: #c5ed81;\n  font-size: 13px;\n}\n.champion {\n  margin-top: 22px;\n  padding: 20px;\n  border: 1px solid #6c7950;\n  border-radius: 5px;\n  background: #283327;\n}\n.champion h3 {\n  font-size: 22px;\n}\n.champion p:last-child {\n  font-size: 12px;\n  color: #c8d6bd;\n}\n.error {\n  background: #422c2b;\n  color: #ffd1c5;\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n@media (max-width: 1100px) {\n  .league {\n    padding-inline: 18px;\n  }\n  .arena {\n    gap: 14px;\n    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  }\n  .panel {\n    padding: 16px;\n  }\n  .stage {\n    padding: 0 12px;\n  }\n  .project-title {\n    gap: 10px;\n  }\n  h1 {\n    font-size: 18px;\n  }\n  .project-title > span {\n    padding-left: 10px;\n  }\n  .reflection-fields {\n    gap: 10px;\n  }\n  .decision-fields {\n    gap: 8px;\n  }\n  h2 {\n    font-size: 20px;\n  }\n}\n@media (max-width: 850px) {\n  .arena,\n  .round-information {\n    grid-template-columns: 1fr;\n  }\n  .project-title {\n    flex: 1 0 100%;\n  }\n  .project-header > .actions {\n    width: 100%;\n  }\n  .project-header > .actions .primary {\n    margin-left: auto;\n  }\n  .round-information {\n    gap: 14px;\n  }\n  .masthead {\n    gap: 14px;\n  }\n  .practice {\n    font-size: 8px;\n  }\n  .wordmark span {\n    display: none;\n  }\n}\n@media (max-width: 450px) {\n  .league {\n    padding-inline: 10px;\n  }\n  .project-title {\n    justify-content: space-between;\n  }\n  h1 {\n    font-size: 16px;\n  }\n  .project-title > span {\n    font-size: 9px;\n  }\n  .project-header .actions {\n    gap: 5px;\n  }\n  button {\n    font-size: 10px;\n    padding-inline: 8px;\n  }\n  .panel {\n    padding: 14px;\n  }\n  .stage {\n    padding: 0 10px;\n  }\n  .reflection-fields {\n    grid-template-columns: 1fr;\n  }\n  .saved {\n    display: none;\n  }\n  .clock {\n    font-size: 25px;\n  }\n  .section-heading h2 {\n    font-size: 19px;\n  }\n}\n.focus-round-action {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.focus-round-action button {\n  min-height: 48px;\n}\n.league {\n  padding-top: 70px;\n}\n/*# sourceMappingURL=league-shell.component.css.map */\n', '/* src/app/templates/live-strategy-league/ui/league-launch.component.scss */\n.launch {\n  position: relative;\n  isolation: isolate;\n}\n.launch::before {\n  content: "";\n  position: absolute;\n  inset: 115px 0 0;\n  z-index: -1;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      ellipse at 22% 18%,\n      rgba(135, 183, 72, 0.0745098039),\n      transparent 44%),\n    linear-gradient(\n      90deg,\n      rgba(165, 205, 119, 0.062745098) 1px,\n      transparent 1px),\n    linear-gradient(rgba(165, 205, 119, 0.031372549) 1px, transparent 1px);\n  background-size:\n    auto,\n    60px 60px,\n    60px 60px;\n  -webkit-mask-image: linear-gradient(#000, transparent 90%);\n  mask-image: linear-gradient(#000, transparent 90%);\n}\n.project-header {\n  margin-bottom: 0;\n}\n.actions a {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  padding: 10px 15px;\n  border-radius: 5px;\n  text-decoration: none;\n  font-size: 11px;\n  min-height: 40px;\n}\n.demo-link {\n  color: #d4dfed;\n  border: 1px solid #425168;\n  background: #1d2938;\n}\n.enter-league {\n  background: #c5ed81;\n  color: #172012;\n  font-weight: 750;\n  border: 1px solid #c5ed81;\n  box-shadow: 0 0 25px rgba(197, 237, 129, 0.0823529412);\n}\n.enter-league:hover {\n  background: #d9ffa1;\n}\n.enter-league span {\n  font-size: 18px;\n}\n.preview-toggle {\n  color: #a8bad2;\n  background: transparent;\n  border-color: transparent;\n}\n.launch-arena {\n  display: grid;\n  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);\n  gap: 36px;\n  align-items: start;\n  padding-top: 24px;\n}\n.invitation {\n  padding: 18px 0 0;\n}\n.challenge-tag {\n  color: #c5ed81;\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.17em;\n  margin: 0 0 24px;\n}\n.challenge-tag > span,\n.signal-dot {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #c5ed81;\n  margin-right: 9px;\n  box-shadow: 0 0 12px rgba(197, 237, 129, 0.3764705882);\n}\n.invitation h2 {\n  font-size: clamp(42px, 5.5vw, 76px);\n  font-weight: 800;\n  line-height: 0.99;\n  letter-spacing: -0.06em;\n  max-width: 610px;\n  text-transform: uppercase;\n}\n.invitation h2 em {\n  display: block;\n  font-style: normal;\n  color: #c5ed81;\n  margin-top: 8px;\n}\n.challenge-copy {\n  font-size: 15px;\n  color: #b3c4db;\n  line-height: 1.8;\n  max-width: 440px;\n  margin: 24px 0;\n}\n.stakes {\n  display: flex;\n  gap: 34px;\n  padding: 6px 0 26px;\n}\n.stakes > div {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.stakes strong {\n  font-size: 32px;\n  letter-spacing: -0.05em;\n  font-weight: 650;\n}\n.stakes span {\n  font-size: 8px;\n  letter-spacing: 0.1em;\n  color: #a7b8d1;\n  max-width: 40px;\n  line-height: 1.6;\n}\n.player-card {\n  display: flex;\n  align-items: center;\n  gap: 19px;\n  border: 1px solid rgba(197, 237, 129, 0.2509803922);\n  border-left: 3px solid var(--team-color);\n  border-radius: 6px;\n  padding: 16px;\n  background:\n    linear-gradient(\n      110deg,\n      #2c3a25,\n      #1a2431);\n  max-width: 500px;\n}\n.player-card img {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 5px;\n  border: 1px solid rgba(197, 237, 129, 0.4392156863);\n}\n.player-card h3 {\n  font-size: 28px;\n  letter-spacing: -0.03em;\n  font-weight: 600;\n}\n.player-card h3 span {\n  font-size: 8px;\n  color: #c5ed81;\n  border: 1px solid rgba(197, 237, 129, 0.3137254902);\n  padding: 3px 5px;\n  vertical-align: middle;\n  margin-left: 8px;\n  border-radius: 3px;\n}\n.player-card .eyebrow {\n  margin-bottom: 4px;\n}\n.player-card p:last-child {\n  font-size: 11px;\n  line-height: 1.6;\n  color: #b2c3d5;\n  margin: 7px 0 0;\n}\n.win-condition {\n  display: flex;\n  gap: 15px;\n  align-items: flex-start;\n  margin: 24px 0;\n  max-width: 450px;\n}\n.win-condition svg {\n  width: 30px;\n  height: 30px;\n  fill: none;\n  stroke: #e9c879;\n  stroke-width: 1.7;\n  flex-shrink: 0;\n}\n.win-condition h3 {\n  font-size: 12px;\n  color: #f0d698;\n}\n.win-condition p {\n  color: #aabed6;\n  font-size: 12px;\n  line-height: 1.7;\n  margin: 7px 0 0;\n}\n.preview-board {\n  padding: 0 18px;\n  border-color: rgba(82, 104, 71, 0.4392156863);\n  background:\n    linear-gradient(\n      160deg,\n      #1c2934,\n      #141d29);\n  box-shadow: 0 16px 70px rgba(0, 0, 0, 0.3333333333);\n}\n.preview-intro {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 4px;\n  padding: 15px 0;\n  border-bottom: 1px solid rgba(62, 79, 89, 0.3764705882);\n  color: #b6c8d8;\n  font-size: 8px;\n  letter-spacing: 0.08em;\n}\n.preview-intro small {\n  margin-left: auto;\n  color: #91a4bd;\n  font-size: 7px;\n}\n.preview-intro .signal-dot {\n  width: 5px;\n  height: 5px;\n}\n.mission-brief {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 34px;\n  padding: 25px 0 0;\n  margin-top: 24px;\n  border-top: 1px solid #344250;\n}\n.mission-brief h2 {\n  font-size: 20px;\n}\n.mission-brief p:last-child {\n  color: #aebed4;\n  font-size: 12px;\n  line-height: 1.8;\n  max-width: 560px;\n}\n.round-briefs {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}\n.round-briefs li {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 13px;\n  background: #1b2735;\n  border: 1px solid #36465a;\n  border-radius: 4px;\n}\n.round-briefs span {\n  color: #c5ed81;\n  font-size: 11px;\n}\n.round-briefs strong {\n  font-size: 11px;\n  font-weight: 500;\n}\n@media (max-width: 1050px) {\n  .launch-arena {\n    gap: 24px;\n    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);\n  }\n  .invitation h2 {\n    font-size: 52px;\n  }\n  .stakes {\n    gap: 18px;\n  }\n  .stakes strong {\n    font-size: 27px;\n  }\n  .player-card {\n    gap: 12px;\n  }\n  .player-card img {\n    width: 64px;\n    height: 64px;\n  }\n}\n@media (max-width: 850px) {\n  .launch-arena {\n    grid-template-columns: 1fr;\n    padding-top: 10px;\n  }\n  .invitation h2 {\n    font-size: clamp(46px, 10vw, 72px);\n  }\n  .challenge-copy {\n    max-width: 550px;\n  }\n  .mission-brief {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .player-card {\n    max-width: none;\n  }\n  .launch::before {\n    inset-inline: 0;\n  }\n}\n@media (max-width: 450px) {\n  .preview-board {\n    padding: 0 10px;\n  }\n  .actions a {\n    padding: 9px 10px;\n    font-size: 10px;\n    gap: 10px;\n  }\n  .preview-toggle {\n    padding-inline: 3px;\n    font-size: 9px;\n  }\n  .challenge-copy {\n    font-size: 13px;\n  }\n  .invitation {\n    padding-top: 10px;\n  }\n  .challenge-tag {\n    margin-bottom: 17px;\n  }\n  .stakes {\n    gap: 22px;\n  }\n  .round-briefs {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=league-launch.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeagueLaunchComponent, { className: "LeagueLaunchComponent", filePath: "src/app/templates/live-strategy-league/ui/league-launch.component.ts", lineNumber: 15 });
})();
export {
  LeagueLaunchComponent
};
//# debugId=e7699768-759b-5a11-9be3-0e9d77c840dc
//# sourceMappingURL=chunk-BF4TYXW7.js.map
