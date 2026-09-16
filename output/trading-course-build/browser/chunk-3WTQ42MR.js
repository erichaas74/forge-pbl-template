import {
  standings
} from "./chunk-EMQ2ALBA.js";
import {
  DecimalPipe
} from "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  afterRenderEffect,
  computed,
  inject,
  input,
  setClassMetadata,
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
  ɵɵdomProperty,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
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

// src/app/templates/live-strategy-league/ui/league-leaderboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function LeagueLeaderboardComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const team_r1 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("\u2197 Biggest climber: ", team_r1.name, " \xB7 up ", team_r1.movement, " ", team_r1.movement === 1 ? "place" : "places");
  }
}
function LeagueLeaderboardComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.rounds() ? "Every round can change the order." : "Lock your strategy. Make your mark.");
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 19);
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("src", team_r3.imageUrl, \u0275\u0275sanitizeUrl)("alt", "Fictional " + team_r3.name + " group photo");
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(team_r3.name.slice(0, 1));
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 30);
    \u0275\u0275domElement(2, "path", 31);
    \u0275\u0275domElementEnd()();
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small", 24);
    \u0275\u0275text(1, "YOU");
    \u0275\u0275domElementEnd();
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Ready to compete ");
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.snapshot().phase === "complete" && team_r3.rank === 1 ? "League champion" : "At the top", " ");
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, team_r3.gap, "1.0-2"), " off the lead ");
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "b", 28);
    \u0275\u0275text(1, "\u2197");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(team_r3.movement);
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "b", 28);
    \u0275\u0275text(1, "\u2198");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span", 28);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const team_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(-team_r3.movement);
  }
}
function LeagueLeaderboardComponent_For_35_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.rounds() === 1 ? "NEW" : "\u2014");
  }
}
function LeagueLeaderboardComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 15)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "th", 16)(5, "div", 17)(6, "div", 18);
    \u0275\u0275conditionalCreate(7, LeagueLeaderboardComponent_For_35_Conditional_7_Template, 1, 2, "img", 19)(8, LeagueLeaderboardComponent_For_35_Conditional_8_Template, 2, 1, "span", 20);
    \u0275\u0275conditionalCreate(9, LeagueLeaderboardComponent_For_35_Conditional_9_Template, 3, 0, "span", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "div", 22)(11, "span", 23);
    \u0275\u0275text(12);
    \u0275\u0275conditionalCreate(13, LeagueLeaderboardComponent_For_35_Conditional_13_Template, 2, 0, "small", 24);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "small", 25);
    \u0275\u0275conditionalCreate(15, LeagueLeaderboardComponent_For_35_Conditional_15_Template, 1, 0)(16, LeagueLeaderboardComponent_For_35_Conditional_16_Template, 1, 1)(17, LeagueLeaderboardComponent_For_35_Conditional_17_Template, 2, 4);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(18, "td")(19, "strong", 26);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(22, "td")(23, "span", 27);
    \u0275\u0275conditionalCreate(24, LeagueLeaderboardComponent_For_35_Conditional_24_Template, 4, 1)(25, LeagueLeaderboardComponent_For_35_Conditional_25_Template, 4, 1)(26, LeagueLeaderboardComponent_For_35_Conditional_26_Template, 2, 1, "span", 28);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(27, "td")(28, "span", 29);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const team_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%team-color", team_r3.color);
    \u0275\u0275classProp("your-team", team_r3.id === ctx_r1.yourTeamId())("leader", ctx_r1.rounds() > 0 && team_r3.rank === 1);
    \u0275\u0275attribute("data-team-id", team_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("podium", ctx_r1.rounds() > 0 && team_r3.rank <= 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(team_r3.rank.toString().padStart(2, "0"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(team_r3.imageUrl ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.rounds() > 0 && team_r3.rank === 1 ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", team_r3.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r3.id === ctx_r1.yourTeamId() ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.rounds() ? 15 : !team_r3.gap ? 16 : 17);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 29, team_r3.score, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("up", team_r3.movement > 0)("down", team_r3.movement < 0);
    \u0275\u0275domProperty("title", team_r3.trendLabel);
    \u0275\u0275attribute("aria-label", team_r3.trendLabel);
    \u0275\u0275advance();
    \u0275\u0275conditional(team_r3.movement > 0 ? 24 : team_r3.movement < 0 ? 25 : 26);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("positive", team_r3.delta > 0)("negative", team_r3.delta < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", team_r3.delta > 0 ? "+" : "", "", \u0275\u0275pipeBind2(30, 32, team_r3.delta, "1.0-2"));
  }
}
var LeagueLeaderboardComponent = class _LeagueLeaderboardComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snapshot = input.required(
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yourTeamId = input.required(
    ...ngDevMode ? [{ debugName: "yourTeamId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  completedRounds = input(
    null,
    ...ngDevMode ? [{ debugName: "completedRounds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  animationStep = input(
    null,
    ...ngDevMode ? [{ debugName: "animationStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  statusLabel = input(
    "",
    ...ngDevMode ? [{ debugName: "statusLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  trendNote = input(
    "",
    ...ngDevMode ? [{ debugName: "trendNote" }] : (
      /* istanbul ignore next */
      []
    )
  );
  note = input(
    "Fictional team portraits \xB7 Standings update on reveal \xB7 Your score is not a course grade",
    ...ngDevMode ? [{ debugName: "note" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rounds = computed(
    () => this.completedRounds() ?? this.snapshot().history.length,
    ...ngDevMode ? [{ debugName: "rounds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rows = computed(
    () => {
      const ranked = standings(this.snapshot().teams);
      return ranked.map((team, index) => {
        const identity = this.config().teams.find((t) => t.id === team.id);
        const movement = this.rounds() >= 2 ? team.previousRank - index - 1 : 0;
        return __spreadProps(__spreadValues(__spreadValues({}, team), identity), {
          rank: index + 1,
          movement,
          gap: ranked[0].score - team.score,
          trendLabel: this.rounds() === 0 ? "Awaiting first result" : this.rounds() === 1 ? "First ranking" : movement > 0 ? `Up ${movement} ${movement === 1 ? "place" : "places"}` : movement < 0 ? `Down ${-movement} ${movement === -1 ? "place" : "places"}` : "Holding position"
        });
      });
    },
    ...ngDevMode ? [{ debugName: "rows" }] : (
      /* istanbul ignore next */
      []
    )
  );
  climber = computed(
    () => [...this.rows()].filter((t) => t.movement > 0).sort((a, b) => b.movement - a.movement || a.rank - b.rank)[0],
    ...ngDevMode ? [{ debugName: "climber" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headline = computed(
    () => {
      if (!this.rounds())
        return "Everyone starts equal. Who makes the first move?";
      const leader = this.rows()[0];
      if (this.snapshot().phase === "complete")
        return `${leader.name} takes the title.`;
      if (this.rows().filter((t) => t.score === leader.score).length > 1)
        return "It\u2019s tight at the top. The leaders are level on points.";
      return `${leader.name} leads the chase.`;
    },
    ...ngDevMode ? [{ debugName: "headline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  constructor() {
    let previousRound = -1;
    let previousPositions = /* @__PURE__ */ new Map();
    afterRenderEffect(() => {
      const round = this.animationStep() ?? this.rounds();
      const rows = this.element.nativeElement.querySelectorAll("tbody tr");
      const tableTop = this.element.nativeElement.getBoundingClientRect().top;
      const positions = /* @__PURE__ */ new Map();
      const animate = previousRound >= 0 && round > previousRound && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      rows.forEach((row) => {
        const id = row.dataset["teamId"];
        const top = row.getBoundingClientRect().top - tableTop;
        positions.set(id, top);
        if (animate && row.animate) {
          const shift = (previousPositions.get(id) ?? top) - top;
          row.animate([{ transform: `translateY(${shift}px)`, opacity: 0.65 }, { transform: "translateY(0)", opacity: 1 }], { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" });
          row.querySelector(".score")?.animate?.([{ color: "#ffffff", textShadow: "0 0 16px #c5ed81" }, { color: "inherit", textShadow: "none" }], { duration: 1e3 });
        }
      });
      previousPositions = positions;
      previousRound = round;
    });
  }
  static \u0275fac = function LeagueLeaderboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeagueLeaderboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeagueLeaderboardComponent, selectors: [["app-league-leaderboard"]], inputs: { config: [1, "config"], snapshot: [1, "snapshot"], yourTeamId: [1, "yourTeamId"], completedRounds: [1, "completedRounds"], animationStep: [1, "animationStep"], statusLabel: [1, "statusLabel"], trendNote: [1, "trendNote"], note: [1, "note"] }, decls: 46, vars: 6, consts: [[1, "heading"], [1, "eyebrow"], ["id", "standings-title"], [1, "broadcast"], ["aria-live", "polite", 1, "race-call"], ["viewBox", "0 0 32 32", "aria-hidden", "true"], ["d", "m4 9 7 5 5-9 5 9 7-5-3 16H7Z"], ["d", "M8 29h16"], [1, "climber"], [1, "sr-only"], ["scope", "col"], [3, "your-team", "leader", "--%NS%team-color"], [1, "legend"], [1, "falling"], [1, "note"], [1, "rank"], ["scope", "row"], [1, "team-identity"], [1, "portrait"], ["width", "80", "height", "80", 3, "src", "alt"], [1, "initial"], ["aria-label", "First place", 1, "crown"], [1, "team-copy"], [1, "team-name"], [1, "you"], [1, "team-detail"], [1, "score"], [1, "trend", 3, "title"], ["aria-hidden", "true"], [1, "delta"], ["viewBox", "0 0 32 32", "width", "17", "height", "17", "aria-hidden", "true"], ["fill", "currentColor", "d", "m4 9 7 5 5-9 5 9 7-5-3 16H7Z"]], template: function LeagueLeaderboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "p", 1);
      \u0275\u0275text(3, "THE RACE");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "h2", 2);
      \u0275\u0275text(5, "League standings");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "span", 3);
      \u0275\u0275domElement(7, "i");
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(10, "svg", 5);
      \u0275\u0275domElement(11, "path", 6)(12, "path", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(13, "div")(14, "strong");
      \u0275\u0275text(15);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(16, LeagueLeaderboardComponent_Conditional_16_Template, 2, 3, "span", 8)(17, LeagueLeaderboardComponent_Conditional_17_Template, 2, 1, "span");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(18, "table")(19, "caption", 9);
      \u0275\u0275text(20);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "thead")(22, "tr")(23, "th", 10);
      \u0275\u0275text(24, "Rank");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "th", 10);
      \u0275\u0275text(26, "Team");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(27, "th", 10);
      \u0275\u0275text(28, "Points");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "th", 10);
      \u0275\u0275text(30, "Trend");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "th", 10);
      \u0275\u0275text(32, "This round");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(33, "tbody");
      \u0275\u0275repeaterCreate(34, LeagueLeaderboardComponent_For_35_Template, 31, 35, "tr", 11, _forTrack0);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(36, "p", 12)(37, "span");
      \u0275\u0275text(38, "\u2197 Climbing ");
      \u0275\u0275domElementStart(39, "span", 13);
      \u0275\u0275text(40, "\u2198 Falling");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(41, " \u2014 Holding");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "span");
      \u0275\u0275text(43);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(44, "p", 14);
      \u0275\u0275text(45);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.statusLabel() || (ctx.rounds() ? "ROUND " + ctx.rounds() + " REVEALED" : "STARTING GRID"));
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.headline());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.climber()) ? 16 : 17, tmp_2_0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Cumulative league points and rank movement. ", ctx.trendNote() || "Compared with the previous revealed round");
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.rows());
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.trendNote() || (ctx.rounds() < 2 ? "Rank trends begin after round 2" : "Compared with the previous round"));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.note());
    }
  }, dependencies: [DecimalPipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  container-type: inline-size;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 13px 0;\n  gap: 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: #b3c591;\n  letter-spacing: 0.18em;\n  font-size: 10px;\n  font-weight: 700;\n  margin: 0 0 8px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  letter-spacing: -0.03em;\n  margin: 0;\n  font-weight: 600;\n}\n.broadcast[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  background: rgba(197, 237, 129, 0.0392156863);\n  border: 1px solid rgba(197, 237, 129, 0.1607843137);\n  padding: 7px 9px;\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  white-space: nowrap;\n  border-radius: 4px;\n}\n.broadcast[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #c5ed81;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  margin-right: 5px;\n}\n.race-call[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 11px 14px;\n  border: 1px solid rgba(217, 183, 104, 0.2509803922);\n  border-radius: 7px;\n  background:\n    linear-gradient(\n      115deg,\n      rgba(181, 145, 54, 0.1254901961),\n      #202836 90%);\n  margin-bottom: 9px;\n}\n.race-call[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 29px;\n  height: 29px;\n  fill: none;\n  stroke: #efd08b;\n  stroke-width: 1.8;\n  flex-shrink: 0;\n}\n.race-call[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f7dfaf;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 1.5;\n}\n.race-call[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #aebbd0;\n  font-size: 11px;\n  margin-top: 3px;\n  line-height: 1.6;\n}\n.race-call[_ngcontent-%COMP%]   .climber[_ngcontent-%COMP%] {\n  color: #c5ed81;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 7px;\n  font-variant-numeric: tabular-nums;\n}\nthead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  color: #a9b8cb;\n  font-weight: 500;\n  text-align: right;\n  padding: 5px 10px 9px;\n}\nthead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(-n+2) {\n  text-align: left;\n}\ntd[_ngcontent-%COMP%], \ntbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #1b2432;\n  padding: 10px;\n  text-align: right;\n  border-block: 1px solid rgba(255, 255, 255, 0.0274509804);\n}\ntd[_ngcontent-%COMP%]:first-child {\n  border-left: 3px solid var(--%NS%team-color);\n  border-radius: 6px 0 0 6px;\n}\ntd[_ngcontent-%COMP%]:last-child {\n  border-right: 1px solid rgba(255, 255, 255, 0.0274509804);\n  border-radius: 0 6px 6px 0;\n}\ntbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-weight: 500;\n}\n.your-team[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.your-team[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #253128;\n  border-block-color: rgba(197, 237, 129, 0.1490196078);\n}\n.leader[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.leader[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #322c20;\n  border-block-color: rgba(233, 196, 109, 0.2588235294);\n}\n.leader[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  border-left-color: #e9c46d;\n}\n.rank[_ngcontent-%COMP%] {\n  width: 47px;\n  text-align: center;\n  font-size: 20px;\n  color: #9aaac0;\n  font-weight: 600;\n  letter-spacing: -0.05em;\n}\n.podium[_ngcontent-%COMP%] {\n  color: #e5d8b6;\n}\n.leader[_ngcontent-%COMP%]   .rank[_ngcontent-%COMP%] {\n  color: #f4cc76;\n}\n.team-identity[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n}\n.portrait[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  width: 52px;\n  height: 52px;\n  border-radius: 8px;\n  border: 2px solid var(--%NS%team-color);\n  background: #10151e;\n}\n.portrait[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.initial[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  height: 100%;\n  color: var(--%NS%team-color);\n  font-size: 28px;\n}\n.crown[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -8px;\n  right: -7px;\n  display: grid;\n  place-items: center;\n  background: #efce80;\n  color: #292211;\n  border: 2px solid #322c20;\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  font-size: 18px;\n}\n.team-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.team-name[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 650;\n  white-space: nowrap;\n  letter-spacing: -0.02em;\n}\n.you[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  font-size: 8px;\n  vertical-align: middle;\n  margin-left: 4px;\n  padding: 2px 4px;\n  border: 1px solid rgba(197, 237, 129, 0.2705882353);\n  border-radius: 3px;\n}\n.team-detail[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  color: #b1bdd0;\n  margin-top: 7px;\n  line-height: 1.5;\n}\n.score[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 25px;\n  letter-spacing: -0.04em;\n  font-weight: 650;\n}\n.leader[_ngcontent-%COMP%]   .score[_ngcontent-%COMP%] {\n  color: #f4d694;\n}\n.trend[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  min-width: 47px;\n  min-height: 31px;\n  border: 1px solid rgba(169, 184, 203, 0.137254902);\n  border-radius: 5px;\n  background: rgba(169, 184, 203, 0.0431372549);\n  color: #aebbd0;\n  font-size: 10px;\n  font-weight: 650;\n}\n.trend[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n}\n.trend.up[_ngcontent-%COMP%] {\n  color: #c5ed81;\n  background: rgba(197, 237, 129, 0.0705882353);\n  border-color: rgba(197, 237, 129, 0.2196078431);\n}\n.trend.down[_ngcontent-%COMP%] {\n  color: #ffa5a1;\n  background: rgba(255, 144, 133, 0.0705882353);\n  border-color: rgba(255, 144, 133, 0.2196078431);\n}\n.delta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #adb9cc;\n  white-space: nowrap;\n}\n.positive[_ngcontent-%COMP%] {\n  color: #c5ed81;\n}\n.negative[_ngcontent-%COMP%] {\n  color: #ffa5a1;\n}\n.legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  color: #aebbd0;\n  font-size: 9px;\n  margin: 13px 0 10px;\n  line-height: 1.6;\n}\n.legend[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  color: #c5ed81;\n}\n.falling[_ngcontent-%COMP%] {\n  color: #ffa5a1;\n  margin: 0 12px;\n}\n.note[_ngcontent-%COMP%] {\n  color: #92a2b9;\n  font-size: 9px;\n  line-height: 1.7;\n  padding-bottom: 16px;\n  margin: 0;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n@container (max-width: 550px) {\n  td[_ngcontent-%COMP%], \n   tbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px 6px;\n  }\n  thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding-inline: 6px;\n    font-size: 8px;\n    letter-spacing: 0;\n  }\n  .portrait[_ngcontent-%COMP%] {\n    width: 47px;\n    height: 47px;\n  }\n  .team-identity[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .team-name[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .team-detail[_ngcontent-%COMP%] {\n    font-size: 8px;\n    max-width: 100px;\n  }\n  .rank[_ngcontent-%COMP%] {\n    font-size: 16px;\n    width: 29px;\n  }\n  .score[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .trend[_ngcontent-%COMP%] {\n    min-width: 33px;\n  }\n  .delta[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .you[_ngcontent-%COMP%] {\n    display: block;\n    width: fit-content;\n    margin: 3px 0 0;\n  }\n  .crown[_ngcontent-%COMP%] {\n    width: 21px;\n    height: 21px;\n    font-size: 15px;\n  }\n}\n@container (max-width: 400px) {\n  .portrait[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n  .team-identity[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .team-detail[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .score[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .team-name[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .broadcast[_ngcontent-%COMP%] {\n    font-size: 8px;\n    padding: 6px;\n  }\n  h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .rank[_ngcontent-%COMP%] {\n    width: 23px;\n    font-size: 14px;\n  }\n  .trend[_ngcontent-%COMP%] {\n    min-width: 29px;\n  }\n  td[_ngcontent-%COMP%], \n   tbody[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding-inline: 4px;\n  }\n}\n/*# sourceMappingURL=league-leaderboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeagueLeaderboardComponent, [{
    type: Component,
    args: [{ selector: "app-league-leaderboard", imports: [DecimalPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="heading"><div><p class="eyebrow">THE RACE</p><h2 id="standings-title">League standings</h2></div>
  <span class="broadcast"><i></i>{{ statusLabel() || (rounds() ? 'ROUND ' + rounds() + ' REVEALED' : 'STARTING GRID') }}</span>
</div>
<div class="race-call" aria-live="polite">
  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 9 7 5 5-9 5 9 7-5-3 16H7Z"/><path d="M8 29h16"/></svg>
  <div><strong>{{ headline() }}</strong>
    @if (climber(); as team) { <span class="climber">\u2197 Biggest climber: {{ team.name }} \xB7 up {{ team.movement }} {{ team.movement === 1 ? 'place' : 'places' }}</span> }
    @else { <span>{{ rounds() ? 'Every round can change the order.' : 'Lock your strategy. Make your mark.' }}</span> }
  </div>
</div>
<table>
  <caption class="sr-only">Cumulative league points and rank movement. {{ trendNote() || 'Compared with the previous revealed round' }}</caption>
  <thead><tr><th scope="col">Rank</th><th scope="col">Team</th><th scope="col">Points</th><th scope="col">Trend</th><th scope="col">This round</th></tr></thead>
  <tbody>
    @for (team of rows(); track team.id) {
      <tr [attr.data-team-id]="team.id" [class.your-team]="team.id === yourTeamId()" [class.leader]="rounds() > 0 && team.rank === 1" [style.--team-color]="team.color">
        <td class="rank"><span [class.podium]="rounds() > 0 && team.rank <= 3">{{ team.rank.toString().padStart(2, '0') }}</span></td>
        <th scope="row"><div class="team-identity">
          <div class="portrait">
            @if (team.imageUrl) { <img [src]="team.imageUrl" [alt]="'Fictional ' + team.name + ' group photo'" width="80" height="80"> }
            @else { <span class="initial">{{ team.name.slice(0, 1) }}</span> }
            @if (rounds() > 0 && team.rank === 1) { <span class="crown" aria-label="First place"><svg viewBox="0 0 32 32" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="m4 9 7 5 5-9 5 9 7-5-3 16H7Z"/></svg></span> }
          </div>
          <div class="team-copy"><span class="team-name">{{ team.name }} @if (team.id === yourTeamId()) { <small class="you">YOU</small> }</span>
            <small class="team-detail">@if (!rounds()) { Ready to compete } @else if (!team.gap) { {{ snapshot().phase === 'complete' && team.rank === 1 ? 'League champion' : 'At the top' }} } @else { {{ team.gap | number:'1.0-2' }} off the lead }</small>
          </div>
        </div></th>
        <td><strong class="score">{{ team.score | number:'1.0-2' }}</strong></td>
        <td><span class="trend" [class.up]="team.movement > 0" [class.down]="team.movement < 0" [attr.aria-label]="team.trendLabel" [title]="team.trendLabel">
          @if (team.movement > 0) { <b aria-hidden="true">\u2197</b><span aria-hidden="true">{{ team.movement }}</span> }
          @else if (team.movement < 0) { <b aria-hidden="true">\u2198</b><span aria-hidden="true">{{ -team.movement }}</span> }
          @else { <span aria-hidden="true">{{ rounds() === 1 ? 'NEW' : '\u2014' }}</span> }
        </span></td>
        <td><span class="delta" [class.positive]="team.delta > 0" [class.negative]="team.delta < 0">{{ team.delta > 0 ? '+' : '' }}{{ team.delta | number:'1.0-2' }}</span></td>
      </tr>
    }
  </tbody>
</table>
<p class="legend"><span>\u2197 Climbing <span class="falling">\u2198 Falling</span> \u2014 Holding</span><span>{{ trendNote() || (rounds() < 2 ? 'Rank trends begin after round 2' : 'Compared with the previous round') }}</span></p>
<p class="note">{{ note() }}</p>
`, styles: ["/* src/app/templates/live-strategy-league/ui/league-leaderboard.component.scss */\n:host {\n  display: block;\n  container-type: inline-size;\n}\n* {\n  box-sizing: border-box;\n}\n.heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 13px 0;\n  gap: 12px;\n}\n.eyebrow {\n  color: #b3c591;\n  letter-spacing: 0.18em;\n  font-size: 10px;\n  font-weight: 700;\n  margin: 0 0 8px;\n}\nh2 {\n  font-size: 22px;\n  letter-spacing: -0.03em;\n  margin: 0;\n  font-weight: 600;\n}\n.broadcast {\n  color: #c5ed81;\n  background: rgba(197, 237, 129, 0.0392156863);\n  border: 1px solid rgba(197, 237, 129, 0.1607843137);\n  padding: 7px 9px;\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  white-space: nowrap;\n  border-radius: 4px;\n}\n.broadcast i {\n  display: inline-block;\n  background: #c5ed81;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  margin-right: 5px;\n}\n.race-call {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 11px 14px;\n  border: 1px solid rgba(217, 183, 104, 0.2509803922);\n  border-radius: 7px;\n  background:\n    linear-gradient(\n      115deg,\n      rgba(181, 145, 54, 0.1254901961),\n      #202836 90%);\n  margin-bottom: 9px;\n}\n.race-call svg {\n  width: 29px;\n  height: 29px;\n  fill: none;\n  stroke: #efd08b;\n  stroke-width: 1.8;\n  flex-shrink: 0;\n}\n.race-call strong {\n  color: #f7dfaf;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 1.5;\n}\n.race-call span {\n  display: block;\n  color: #aebbd0;\n  font-size: 11px;\n  margin-top: 3px;\n  line-height: 1.6;\n}\n.race-call .climber {\n  color: #c5ed81;\n}\ntable {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0 7px;\n  font-variant-numeric: tabular-nums;\n}\nthead th {\n  font-size: 9px;\n  letter-spacing: 0.09em;\n  text-transform: uppercase;\n  color: #a9b8cb;\n  font-weight: 500;\n  text-align: right;\n  padding: 5px 10px 9px;\n}\nthead th:nth-child(-n+2) {\n  text-align: left;\n}\ntd,\ntbody th {\n  background: #1b2432;\n  padding: 10px;\n  text-align: right;\n  border-block: 1px solid rgba(255, 255, 255, 0.0274509804);\n}\ntd:first-child {\n  border-left: 3px solid var(--team-color);\n  border-radius: 6px 0 0 6px;\n}\ntd:last-child {\n  border-right: 1px solid rgba(255, 255, 255, 0.0274509804);\n  border-radius: 0 6px 6px 0;\n}\ntbody th {\n  text-align: left;\n  font-weight: 500;\n}\n.your-team td,\n.your-team th {\n  background: #253128;\n  border-block-color: rgba(197, 237, 129, 0.1490196078);\n}\n.leader td,\n.leader th {\n  background: #322c20;\n  border-block-color: rgba(233, 196, 109, 0.2588235294);\n}\n.leader td:first-child {\n  border-left-color: #e9c46d;\n}\n.rank {\n  width: 47px;\n  text-align: center;\n  font-size: 20px;\n  color: #9aaac0;\n  font-weight: 600;\n  letter-spacing: -0.05em;\n}\n.podium {\n  color: #e5d8b6;\n}\n.leader .rank {\n  color: #f4cc76;\n}\n.team-identity {\n  display: flex;\n  gap: 13px;\n  align-items: center;\n}\n.portrait {\n  position: relative;\n  flex-shrink: 0;\n  width: 52px;\n  height: 52px;\n  border-radius: 8px;\n  border: 2px solid var(--team-color);\n  background: #10151e;\n}\n.portrait img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.initial {\n  display: grid;\n  place-items: center;\n  height: 100%;\n  color: var(--team-color);\n  font-size: 28px;\n}\n.crown {\n  position: absolute;\n  bottom: -8px;\n  right: -7px;\n  display: grid;\n  place-items: center;\n  background: #efce80;\n  color: #292211;\n  border: 2px solid #322c20;\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  font-size: 18px;\n}\n.team-copy {\n  min-width: 0;\n}\n.team-name {\n  font-size: 17px;\n  font-weight: 650;\n  white-space: nowrap;\n  letter-spacing: -0.02em;\n}\n.you {\n  color: #c5ed81;\n  font-size: 8px;\n  vertical-align: middle;\n  margin-left: 4px;\n  padding: 2px 4px;\n  border: 1px solid rgba(197, 237, 129, 0.2705882353);\n  border-radius: 3px;\n}\n.team-detail {\n  display: block;\n  font-size: 9px;\n  color: #b1bdd0;\n  margin-top: 7px;\n  line-height: 1.5;\n}\n.score {\n  display: block;\n  font-size: 25px;\n  letter-spacing: -0.04em;\n  font-weight: 650;\n}\n.leader .score {\n  color: #f4d694;\n}\n.trend {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 3px;\n  min-width: 47px;\n  min-height: 31px;\n  border: 1px solid rgba(169, 184, 203, 0.137254902);\n  border-radius: 5px;\n  background: rgba(169, 184, 203, 0.0431372549);\n  color: #aebbd0;\n  font-size: 10px;\n  font-weight: 650;\n}\n.trend b {\n  font-size: 22px;\n  line-height: 1;\n}\n.trend.up {\n  color: #c5ed81;\n  background: rgba(197, 237, 129, 0.0705882353);\n  border-color: rgba(197, 237, 129, 0.2196078431);\n}\n.trend.down {\n  color: #ffa5a1;\n  background: rgba(255, 144, 133, 0.0705882353);\n  border-color: rgba(255, 144, 133, 0.2196078431);\n}\n.delta {\n  font-size: 12px;\n  color: #adb9cc;\n  white-space: nowrap;\n}\n.positive {\n  color: #c5ed81;\n}\n.negative {\n  color: #ffa5a1;\n}\n.legend {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  color: #aebbd0;\n  font-size: 9px;\n  margin: 13px 0 10px;\n  line-height: 1.6;\n}\n.legend > span:first-child {\n  color: #c5ed81;\n}\n.falling {\n  color: #ffa5a1;\n  margin: 0 12px;\n}\n.note {\n  color: #92a2b9;\n  font-size: 9px;\n  line-height: 1.7;\n  padding-bottom: 16px;\n  margin: 0;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n@container (max-width: 550px) {\n  td,\n  tbody th {\n    padding: 12px 6px;\n  }\n  thead th {\n    padding-inline: 6px;\n    font-size: 8px;\n    letter-spacing: 0;\n  }\n  .portrait {\n    width: 47px;\n    height: 47px;\n  }\n  .team-identity {\n    gap: 8px;\n  }\n  .team-name {\n    font-size: 14px;\n  }\n  .team-detail {\n    font-size: 8px;\n    max-width: 100px;\n  }\n  .rank {\n    font-size: 16px;\n    width: 29px;\n  }\n  .score {\n    font-size: 18px;\n  }\n  .trend {\n    min-width: 33px;\n  }\n  .delta {\n    font-size: 10px;\n  }\n  .you {\n    display: block;\n    width: fit-content;\n    margin: 3px 0 0;\n  }\n  .crown {\n    width: 21px;\n    height: 21px;\n    font-size: 15px;\n  }\n}\n@container (max-width: 400px) {\n  .portrait {\n    width: 36px;\n    height: 36px;\n  }\n  .team-identity {\n    gap: 6px;\n  }\n  .team-detail {\n    display: none;\n  }\n  .score {\n    font-size: 16px;\n  }\n  .team-name {\n    font-size: 12px;\n  }\n  .broadcast {\n    font-size: 8px;\n    padding: 6px;\n  }\n  h2 {\n    font-size: 22px;\n  }\n  .rank {\n    width: 23px;\n    font-size: 14px;\n  }\n  .trend {\n    min-width: 29px;\n  }\n  td,\n  tbody th {\n    padding-inline: 4px;\n  }\n}\n/*# sourceMappingURL=league-leaderboard.component.css.map */\n"] }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], snapshot: [{ type: Input, args: [{ isSignal: true, alias: "snapshot", required: true }] }], yourTeamId: [{ type: Input, args: [{ isSignal: true, alias: "yourTeamId", required: true }] }], completedRounds: [{ type: Input, args: [{ isSignal: true, alias: "completedRounds", required: false }] }], animationStep: [{ type: Input, args: [{ isSignal: true, alias: "animationStep", required: false }] }], statusLabel: [{ type: Input, args: [{ isSignal: true, alias: "statusLabel", required: false }] }], trendNote: [{ type: Input, args: [{ isSignal: true, alias: "trendNote", required: false }] }], note: [{ type: Input, args: [{ isSignal: true, alias: "note", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeagueLeaderboardComponent, { className: "LeagueLeaderboardComponent", filePath: "src/app/templates/live-strategy-league/ui/league-leaderboard.component.ts", lineNumber: 13 });
})();

export {
  LeagueLeaderboardComponent
};
//# debugId=21c554b7-1fa1-5157-aeef-63b622943272
//# sourceMappingURL=chunk-3WTQ42MR.js.map
