import {
  BroadcastDirectorService,
  CompetitionBracketComponent,
  ScoreboardComponent,
  TelevisionStageComponent,
  studioProjection
} from "./chunk-LTBIBO7J.js";
import {
  FINAL_SHOWCASE
} from "./chunk-KB4VIG2E.js";
import {
  COMPETITION_CONFIG,
  applyCompetitionRequest,
  createCompetition,
  leaders
} from "./chunk-2T3THWAB.js";
import {
  midnightBroadcast
} from "./chunk-IIEET437.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  Injector,
  Input,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  forwardRef,
  inject,
  input,
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
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/showcase/final-showcase.engine.ts
function buildFinalShowcase(project, demo) {
  const config = __spreadProps(__spreadValues({}, project), {
    defaultMode: "hybrid",
    rounds: demo.rounds,
    teams: project.teams.map((team) => __spreadProps(__spreadValues({}, team), { qualificationPoints: demo.highlights.reduce((sum, h) => sum + (h.points[team.id] ?? 0), 0) }))
  });
  let state = createCompetition(config);
  let id = 0;
  const send = (command) => state = applyCompetitionRequest(config, state, { id: `fictional-${++id}`, at: 1e3 + id, command });
  const copy = () => structuredClone(state);
  send({ type: "seed" });
  const seeded = copy();
  const playRound = (index, final) => {
    const round = config.rounds[index];
    if (round.kind === "wager") for (const teamId of state.participants) send({ type: "wager", teamId, points: final ? demo.wagers[teamId] ?? 0 : 0 });
    send({ type: "open" });
    const answerers = round.kind === "buzzer" ? [final ? demo.buzzerTeamId : state.participants[0]] : state.participants;
    if (round.kind === "buzzer") send({ type: "buzz", teamId: answerers[0] });
    for (const teamId of answerers) send({ type: "answer", teamId, text: final && round.kind === "wager" && teamId === demo.missedWagerTeamId ? "Eight displays. We forgot to include delivery in our budget." : demo.answers[round.id] });
    send({ type: "lock" });
    for (const teamId of answerers) send({ type: "score", teamId, points: round.kind === "wager" ? state.wagers[teamId] * (final && teamId === demo.missedWagerTeamId ? -1 : 1) : round.maxPoints });
    send({ type: "reveal" });
  };
  while (state.matches.some((m) => m.status === "ready")) {
    const match = state.matches.find((m) => m.status === "ready");
    send({ type: "start", matchId: match.id });
    for (let r = 0; r < config.rounds.length; r++) {
      playRound(r, false);
      send({ type: "next" });
    }
    send({ type: "finish", winnerId: leaders(state)[0], reason: "Fictional demonstration result." });
  }
  const qualified = copy();
  send({ type: "start" });
  const ready = copy();
  const rounds = [];
  for (let r = 0; r < config.rounds.length; r++) {
    const before = copy();
    playRound(r, true);
    const after = copy();
    rounds.push({ before, after });
    send({ type: "next" });
  }
  send({ type: "finish", winnerId: leaders(state)[0], reason: "Fictional final wager result." });
  return { config, seeded, qualified, ready, rounds, champion: copy() };
}

// src/app/templates/competition-show/showcase/quiz-break.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function QuizBreakComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_7_For_2_Template_button_click_0_listener() {
      const game_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.choose(game_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const game_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.selected() === game_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(game_r2.name);
  }
}
function QuizBreakComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "nav", 2);
    \u0275\u0275repeaterCreate(1, QuizBreakComponent_Conditional_7_For_2_Template, 2, 2, "button", null, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.games);
  }
}
function QuizBreakComponent_Conditional_8_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_8_For_7_Template_button_click_0_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.guess(item_r6.label));
    });
    \u0275\u0275domElementStart(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("odd-reveal", ctx_r2.revealed() && item_r6.label === ctx_r2.oddRounds[ctx_r2.oddRound()].answer);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.label);
  }
}
function QuizBreakComponent_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r2.response(), " ", ctx_r2.oddRounds[ctx_r2.oddRound()].punchline);
  }
}
function QuizBreakComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 4)(1, "small");
    \u0275\u0275text(2, "ODD ONE OUT \xB7 DEFEND YOUR RIDICULOUS CHOICE");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 5);
    \u0275\u0275repeaterCreate(6, QuizBreakComponent_Conditional_8_For_7_Template, 5, 4, "button", 6, _forTrack1);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(8, QuizBreakComponent_Conditional_8_Conditional_8_Template, 2, 2, "p", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.nextOddRound());
    });
    \u0275\u0275text(10, "Another odd lineup");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.oddRounds[ctx_r2.oddRound()].prompt);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.oddRounds[ctx_r2.oddRound()].items);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.revealed() ? 8 : -1);
  }
}
function QuizBreakComponent_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u201C", ctx_r2.response(), "\u201D");
  }
}
function QuizBreakComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 4)(1, "small");
    \u0275\u0275text(2, "SELL ME THIS! \xB7 ONE RIDICULOUS SENTENCE");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "Pitch this invention like it is the greatest thing ever made. The audience supplies the applause.");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, QuizBreakComponent_Conditional_9_Conditional_7_Template, 2, 1, "p", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 9)(9, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_9_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.response.set(ctx_r2.pitches[ctx_r2.pitch()].tagline));
    });
    \u0275\u0275text(10, "Reveal the terrible sales pitch");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_9_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.nextPitch());
    });
    \u0275\u0275text(12, "Deal another invention");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.pitches[ctx_r2.pitch()].name);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.response() ? 7 : -1);
  }
}
function QuizBreakComponent_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 7);
    \u0275\u0275text(1, "FREEZE! That belongs on the highlight reel.");
    \u0275\u0275domElementEnd();
  }
}
function QuizBreakComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 4)(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6, "Give us your most dramatic silent reaction. Play seated or standing; passing is always fine.");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, QuizBreakComponent_Conditional_10_Conditional_7_Template, 2, 0, "p", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 9)(9, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_10_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.frozen.set(true));
    });
    \u0275\u0275text(10, "Freeze the reaction");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "button", 3);
    \u0275\u0275domListener("click", function QuizBreakComponent_Conditional_10_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.nextPose());
    });
    \u0275\u0275text(12, "Deal another reaction");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("REACTION CAM \xB7 ", ctx_r2.frozen() ? "FREEZE!" : "3\u2026 2\u2026 1\u2026");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.poses[ctx_r2.pose()]);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.frozen() ? 7 : -1);
  }
}
var QUIZ_GAMES = [{ id: "odd", name: "Odd One Out" }, { id: "wrong", name: "Sell Me This!" }, { id: "pose", name: "Reaction Cam" }];
var QuizBreakComponent = class _QuizBreakComponent {
  initialGame = input(
    "odd",
    ...ngDevMode ? [{ debugName: "initialGame" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showGamePicker = input(
    true,
    ...ngDevMode ? [{ debugName: "showGamePicker" }] : (
      /* istanbul ignore next */
      []
    )
  );
  autoplay = input(
    false,
    ...ngDevMode ? [{ debugName: "autoplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pitch = signal(
    0,
    ...ngDevMode ? [{ debugName: "pitch" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frozen = signal(
    false,
    ...ngDevMode ? [{ debugName: "frozen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = signal(
    "odd",
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  revealed = signal(
    false,
    ...ngDevMode ? [{ debugName: "revealed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  response = signal(
    "",
    ...ngDevMode ? [{ debugName: "response" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pose = signal(
    0,
    ...ngDevMode ? [{ debugName: "pose" }] : (
      /* istanbul ignore next */
      []
    )
  );
  games = QUIZ_GAMES;
  oddRound = signal(
    0,
    ...ngDevMode ? [{ debugName: "oddRound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  oddRounds = [
    { prompt: "Who packed the school bag?", items: [{ icon: "\u270F\uFE0F", label: "Pencil" }, { icon: "\u{1F4D3}", label: "Notebook" }, { icon: "\u{1F355}", label: "Loose pizza" }], answer: "Loose pizza", punchline: "The pizza. Excellent at fractions. Terrible at keeping your homework clean." },
    { prompt: "One of these is not on the teaching staff.", items: [{ icon: "\u{1F996}", label: "T. rex" }, { icon: "\u{1F9D1}\u200D\u{1F3EB}", label: "Teacher" }, { icon: "\u{1F469}\u200D\u{1F52C}", label: "Science teacher" }], answer: "T. rex", punchline: "The T. rex. Great attendance roar. Cannot reach the whiteboard." },
    { prompt: "Which trophy needs a refrigerator?", items: [{ icon: "\u{1F3C6}", label: "Gold cup" }, { icon: "\u{1F9C0}", label: "Cheese trophy" }, { icon: "\u{1F947}", label: "Gold medal" }], answer: "Cheese trophy", punchline: "The cheese trophy. Finally, a victory you can grate." }
  ];
  pitches = [
    { name: "The Homework-Eating Backpack", tagline: "Finally, a school bag that takes your excuses seriously." },
    { name: "The Remote-Control Recess Button", tagline: "One click. Unlimited playground. Batteries mysteriously missing." },
    { name: "The Emergency Applause Machine", tagline: "For every time you open a yogurt without spilling it." }
  ];
  poses = ["You just discovered the trophy is made of cheese.", "Your calculator has requested a holiday.", "You won\u2026 but your victory dance is still buffering."];
  constructor() {
    effect((onCleanup) => {
      const active = this.autoplay();
      const game = this.selected();
      const pitch = this.pitch();
      this.pose();
      this.oddRound();
      if (!active)
        return;
      const timer = setTimeout(() => {
        if (game === "odd")
          this.revealed.set(true);
        else if (game === "wrong")
          this.response.set(this.pitches[pitch].tagline);
        else
          this.frozen.set(true);
      }, 1600);
      onCleanup(() => clearTimeout(timer));
    });
  }
  ngOnInit() {
    this.choose(this.initialGame());
  }
  choose(id) {
    this.selected.set(id);
    this.response.set("");
    this.revealed.set(false);
    this.frozen.set(false);
  }
  nextPitch() {
    this.pitch.update((value) => (value + 1) % this.pitches.length);
    this.response.set("");
  }
  nextPose() {
    this.pose.update((value) => (value + 1) % this.poses.length);
    this.frozen.set(false);
  }
  nextOddRound() {
    this.oddRound.update((value) => (value + 1) % this.oddRounds.length);
    this.revealed.set(false);
    this.response.set("");
  }
  guess(answer) {
    this.response.set(`You chose: ${answer}.`);
    this.revealed.set(true);
  }
  static \u0275fac = function QuizBreakComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuizBreakComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuizBreakComponent, selectors: [["app-quiz-break"]], inputs: { initialGame: [1, "initialGame"], showGamePicker: [1, "showGamePicker"], autoplay: [1, "autoplay"] }, decls: 11, vars: 2, consts: [[1, "break"], [1, "eyebrow"], ["aria-label", "Quiz break games"], [3, "click"], [1, "comedy-card"], [1, "odd-cards"], [3, "odd-reveal"], ["role", "status", 1, "punchline"], ["aria-hidden", "true"], [1, "answers"]], template: function QuizBreakComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1);
      \u0275\u0275text(2, "COMMERCIAL BREAK? BETTER.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "h2");
      \u0275\u0275text(4, "A very unserious intermission.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p");
      \u0275\u0275text(6, "Everybody plays. No points. No grades. Just a breath before the next big question.");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(7, QuizBreakComponent_Conditional_7_Template, 3, 0, "nav", 2);
      \u0275\u0275conditionalCreate(8, QuizBreakComponent_Conditional_8_Template, 11, 2)(9, QuizBreakComponent_Conditional_9_Template, 13, 2)(10, QuizBreakComponent_Conditional_10_Template, 13, 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.showGamePicker() ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selected() === "odd" ? 8 : ctx.selected() === "wrong" ? 9 : 10);
    }
  }, styles: ["\n.odd-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n  max-width: 800px;\n  margin: 24px auto;\n}\n.odd-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 160px;\n  display: grid;\n  place-content: center;\n  gap: 16px;\n  background:\n    linear-gradient(\n      145deg,\n      #2d4260,\n      #101b2b);\n  border: 1px solid #7185a0;\n  box-shadow: 0 14px 25px rgba(0, 0, 0, 0.2);\n}\n.odd-cards[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 64px;\n  line-height: 1.1;\n}\n.odd-cards[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.odd-cards[_ngcontent-%COMP%]   button.odd-reveal[_ngcontent-%COMP%] {\n  border-color: #edc875;\n  background:\n    linear-gradient(\n      145deg,\n      #655128,\n      #292013);\n  box-shadow: 0 0 35px rgba(237, 200, 117, 0.2);\n}\n.punchline[_ngcontent-%COMP%] {\n  color: #ffe1a0 !important;\n  font-size: 20px !important;\n}\n@media (max-width: 650px) {\n  .odd-cards[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .odd-cards[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 38px;\n  }\n  .odd-cards[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .odd-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px 5px;\n    min-height: 115px;\n  }\n}\n.break[_ngcontent-%COMP%] {\n  padding: 2.4rem;\n  background: #0e1929;\n  border: 1px solid #34465e;\n  color: #ecf1f8;\n  border-radius: 8px;\n}\n.eyebrow[_ngcontent-%COMP%], \nsmall[_ngcontent-%COMP%] {\n  color: #efce86;\n  letter-spacing: 3px;\n  font-size: 10px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 500;\n  margin: 12px 0;\n}\np[_ngcontent-%COMP%] {\n  color: #bdcce0;\n  line-height: 1.65;\n}\nnav[_ngcontent-%COMP%], \n.answers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin: 1rem 0;\n}\nbutton[_ngcontent-%COMP%] {\n  background: #17283d;\n  border: 1px solid #526680;\n  color: #f1f5fa;\n  padding: 12px 16px;\n  border-radius: 5px;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n  min-height: 44px;\n}\nbutton[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #efce86;\n  color: #102033;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid white;\n  outline-offset: 3px;\n}\n.mystery[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/7;\n  overflow: hidden;\n  background: #060e1d;\n  border-radius: 6px;\n  margin-top: 20px;\n}\n.mystery[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(5);\n  transform-origin: 50% 42%;\n  transition: transform 1.7s cubic-bezier(0.2, 0.7, 0.2, 1);\n}\n.mystery.revealed[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1);\n}\n.image-label[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  text-align: center;\n  background: rgba(7, 16, 27, 0.9098039216);\n  font-size: 11px;\n  letter-spacing: 2px;\n  color: #f5dca9;\n}\n.comedy-card[_ngcontent-%COMP%] {\n  padding: 2.5rem;\n  text-align: center;\n  border: 1px solid #6e5b34;\n  margin: 1.5rem 0;\n  background:\n    radial-gradient(\n      ellipse at top,\n      #26344b,\n      #0a1423);\n}\nh3[_ngcontent-%COMP%] {\n  font-size: clamp(23px, 3vw, 38px);\n  font-weight: 500;\n  line-height: 1.3;\n}\n@media (prefers-reduced-motion: reduce) {\n  .mystery[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n@media (max-width: 650px) {\n  .break[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .mystery[_ngcontent-%COMP%] {\n    aspect-ratio: 4/3;\n  }\n  .comedy-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=quiz-break.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuizBreakComponent, [{
    type: Component,
    args: [{ selector: "app-quiz-break", standalone: true, template: `
    <section class="break"><div class="eyebrow">COMMERCIAL BREAK? BETTER.</div><h2>A very unserious intermission.</h2><p>Everybody plays. No points. No grades. Just a breath before the next big question.</p>
      @if (showGamePicker()) { <nav aria-label="Quiz break games">@for (game of games; track game.id) { <button [attr.aria-pressed]="selected() === game.id" (click)="choose(game.id)">{{ game.name }}</button> }</nav> }
      @if (selected() === 'odd') {
        <div class="comedy-card"><small>ODD ONE OUT \xB7 DEFEND YOUR RIDICULOUS CHOICE</small><h3>{{ oddRounds[oddRound()].prompt }}</h3>
          <div class="odd-cards">@for (item of oddRounds[oddRound()].items; track item.label) { <button [class.odd-reveal]="revealed() && item.label === oddRounds[oddRound()].answer" (click)="guess(item.label)"><span aria-hidden="true">{{ item.icon }}</span><strong>{{ item.label }}</strong></button> }</div>
          @if (revealed()) { <p class="punchline" role="status">{{ response() }} {{ oddRounds[oddRound()].punchline }}</p> }
        </div>
        <button (click)="nextOddRound()">Another odd lineup</button>
      } @else if (selected() === 'wrong') {
        <div class="comedy-card"><small>SELL ME THIS! \xB7 ONE RIDICULOUS SENTENCE</small><h3>{{ pitches[pitch()].name }}</h3><p>Pitch this invention like it is the greatest thing ever made. The audience supplies the applause.</p>
          @if (response()) { <p class="punchline" role="status">\u201C{{ response() }}\u201D</p> }
        </div>
        <div class="answers"><button (click)="response.set(pitches[pitch()].tagline)">Reveal the terrible sales pitch</button><button (click)="nextPitch()">Deal another invention</button></div>
      } @else {
        <div class="comedy-card"><small>REACTION CAM \xB7 {{ frozen() ? 'FREEZE!' : '3\u2026 2\u2026 1\u2026' }}</small><h3>{{ poses[pose()] }}</h3><p>Give us your most dramatic silent reaction. Play seated or standing; passing is always fine.</p>
          @if (frozen()) { <p class="punchline" role="status">FREEZE! That belongs on the highlight reel.</p> }
        </div>
        <div class="answers"><button (click)="frozen.set(true)">Freeze the reaction</button><button (click)="nextPose()">Deal another reaction</button></div>
      }
    </section>`, styles: ["/* angular:styles/component:scss;645e5de629a86ed53a4e924da847a7fe04c31dc251c6ea5f5b24c1695170e1e9;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/competition-show/showcase/quiz-break.component.ts */\n.odd-cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n  max-width: 800px;\n  margin: 24px auto;\n}\n.odd-cards button {\n  min-height: 160px;\n  display: grid;\n  place-content: center;\n  gap: 16px;\n  background:\n    linear-gradient(\n      145deg,\n      #2d4260,\n      #101b2b);\n  border: 1px solid #7185a0;\n  box-shadow: 0 14px 25px rgba(0, 0, 0, 0.2);\n}\n.odd-cards span {\n  font-size: 64px;\n  line-height: 1.1;\n}\n.odd-cards strong {\n  font-size: 16px;\n}\n.odd-cards button.odd-reveal {\n  border-color: #edc875;\n  background:\n    linear-gradient(\n      145deg,\n      #655128,\n      #292013);\n  box-shadow: 0 0 35px rgba(237, 200, 117, 0.2);\n}\n.punchline {\n  color: #ffe1a0 !important;\n  font-size: 20px !important;\n}\n@media (max-width: 650px) {\n  .odd-cards {\n    gap: 6px;\n  }\n  .odd-cards span {\n    font-size: 38px;\n  }\n  .odd-cards strong {\n    font-size: 11px;\n  }\n  .odd-cards button {\n    padding: 10px 5px;\n    min-height: 115px;\n  }\n}\n.break {\n  padding: 2.4rem;\n  background: #0e1929;\n  border: 1px solid #34465e;\n  color: #ecf1f8;\n  border-radius: 8px;\n}\n.eyebrow,\nsmall {\n  color: #efce86;\n  letter-spacing: 3px;\n  font-size: 10px;\n}\nh2 {\n  font-size: 32px;\n  font-weight: 500;\n  margin: 12px 0;\n}\np {\n  color: #bdcce0;\n  line-height: 1.65;\n}\nnav,\n.answers {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin: 1rem 0;\n}\nbutton {\n  background: #17283d;\n  border: 1px solid #526680;\n  color: #f1f5fa;\n  padding: 12px 16px;\n  border-radius: 5px;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n  min-height: 44px;\n}\nbutton[aria-pressed=true] {\n  background: #efce86;\n  color: #102033;\n}\nbutton:focus-visible {\n  outline: 3px solid white;\n  outline-offset: 3px;\n}\n.mystery {\n  position: relative;\n  aspect-ratio: 16/7;\n  overflow: hidden;\n  background: #060e1d;\n  border-radius: 6px;\n  margin-top: 20px;\n}\n.mystery img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scale(5);\n  transform-origin: 50% 42%;\n  transition: transform 1.7s cubic-bezier(0.2, 0.7, 0.2, 1);\n}\n.mystery.revealed img {\n  transform: scale(1);\n}\n.image-label {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  text-align: center;\n  background: rgba(7, 16, 27, 0.9098039216);\n  font-size: 11px;\n  letter-spacing: 2px;\n  color: #f5dca9;\n}\n.comedy-card {\n  padding: 2.5rem;\n  text-align: center;\n  border: 1px solid #6e5b34;\n  margin: 1.5rem 0;\n  background:\n    radial-gradient(\n      ellipse at top,\n      #26344b,\n      #0a1423);\n}\nh3 {\n  font-size: clamp(23px, 3vw, 38px);\n  font-weight: 500;\n  line-height: 1.3;\n}\n@media (prefers-reduced-motion: reduce) {\n  .mystery img {\n    transition: none;\n  }\n}\n@media (max-width: 650px) {\n  .break {\n    padding: 1rem;\n  }\n  .mystery {\n    aspect-ratio: 4/3;\n  }\n  .comedy-card {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=quiz-break.component.css.map */\n"] }]
  }], () => [], { initialGame: [{ type: Input, args: [{ isSignal: true, alias: "initialGame", required: false }] }], showGamePicker: [{ type: Input, args: [{ isSignal: true, alias: "showGamePicker", required: false }] }], autoplay: [{ type: Input, args: [{ isSignal: true, alias: "autoplay", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuizBreakComponent, { className: "QuizBreakComponent", filePath: "src/app/templates/competition-show/showcase/quiz-break.component.ts", lineNumber: 33 });
})();

// src/app/templates/competition-show/showcase/final-showcase.component.ts
var _c0 = ["video"];
var _c1 = ["area"];
var _c2 = ["pageTop"];
var _c3 = ["teacherPanel"];
var _c4 = ["teacherButton"];
var _c5 = (a0) => [a0];
var _c6 = (a0) => ["/projects", a0];
var _forTrack02 = ($index, $item) => $item.id;
function FinalShowcaseComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_For_28_Template_button_click_0_listener() {
      const \u0275$index_42_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectChapter(\u0275$index_42_r2));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const title_r4 = ctx.$implicit;
    const \u0275$index_42_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-current", ctx_r2.chapter() === \u0275$index_42_r2 ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((\u0275$index_42_r2 + 1).toString().padStart(2, "0"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(title_r4);
  }
}
function FinalShowcaseComponent_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_29_For_2_Template_button_click_0_listener() {
      const \u0275$index_52_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showHighlight(\u0275$index_52_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r7 = ctx.$implicit;
    const \u0275$index_52_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.highlight() === \u0275$index_52_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r7.week);
  }
}
function FinalShowcaseComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, FinalShowcaseComponent_Conditional_29_For_2_Template, 2, 2, "button", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.demo.highlights);
  }
}
function FinalShowcaseComponent_Conditional_30_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_30_For_2_Template_button_click_0_listener() {
      const game_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectGame(game_r9.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const game_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r2.selectedGame() === game_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(game_r9.name);
  }
}
function FinalShowcaseComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, FinalShowcaseComponent_Conditional_30_For_2_Template, 2, 2, "button", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.games);
  }
}
function FinalShowcaseComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18);
    \u0275\u0275element(1, "img", 23);
    \u0275\u0275elementStart(2, "div", 24)(3, "span");
    \u0275\u0275text(4, "AN ENTIRE PROJECT. ONE UNFORGETTABLE FINAL.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Meet the teams. Relive the mistakes. Watch the comeback.");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.demo.openingImage, \u0275\u0275sanitizeUrl);
  }
}
function FinalShowcaseComponent_Conditional_34_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "track", 28);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r2.demo.recapCaptions);
  }
}
function FinalShowcaseComponent_Conditional_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "video", 27, 4);
    \u0275\u0275listener("error", function FinalShowcaseComponent_Conditional_34_Conditional_1_Template_video_error_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.videoError());
    });
    \u0275\u0275conditionalCreate(2, FinalShowcaseComponent_Conditional_34_Conditional_1_Conditional_2_Template, 1, 1, "track", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.demo.recapVideo, \u0275\u0275sanitizeUrl)("poster", ctx_r2.demo.openingImage)("autoplay", ctx_r2.playing());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.demo.recapCaptions ? 2 : -1);
  }
}
function FinalShowcaseComponent_Conditional_34_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const moment_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", moment_r11.image?.src ?? ctx_r2.demo.openingImage, \u0275\u0275sanitizeUrl)("alt", moment_r11.image?.alt ?? "");
  }
}
function FinalShowcaseComponent_Conditional_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, FinalShowcaseComponent_Conditional_34_Conditional_2_For_1_Template, 1, 2, "img", 29, _forTrack02);
    \u0275\u0275elementStart(2, "div", 30)(3, "div", 31);
    \u0275\u0275text(4, "SEASON REWIND ");
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "MOCK HIGHLIGHT REEL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h2");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 32);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction1(4, _c5, ctx_r2.demo.highlights[ctx_r2.highlight()]));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.demo.highlights[ctx_r2.highlight()].week);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.demo.highlights[ctx_r2.highlight()].title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.demo.highlights[ctx_r2.highlight()].caption);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.demo.highlights[ctx_r2.highlight()].skill);
  }
}
function FinalShowcaseComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 25);
    \u0275\u0275conditionalCreate(1, FinalShowcaseComponent_Conditional_34_Conditional_1_Template, 3, 4, "video", 26)(2, FinalShowcaseComponent_Conditional_34_Conditional_2_Template, 15, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("has-art", !!ctx_r2.demo.highlights[ctx_r2.highlight()].image);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.demo.recapVideo && !ctx_r2.videoFailed() ? 1 : 2);
  }
}
function FinalShowcaseComponent_Conditional_35_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const team_r12 = ctx.$implicit;
    const \u0275$index_114_r13 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SEED ", \u0275$index_114_r13 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r12.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", team_r12.qualificationPoints, " qualifier pts");
  }
}
function FinalShowcaseComponent_Conditional_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "Nova, Falcons, Atlas, and Comets advance. Every team stays part of the show through the audience breaks.");
    \u0275\u0275elementEnd();
  }
}
function FinalShowcaseComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275repeaterCreate(1, FinalShowcaseComponent_Conditional_35_For_2_Template, 7, 3, "div", null, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-competition-bracket", 34);
    \u0275\u0275conditionalCreate(4, FinalShowcaseComponent_Conditional_35_Conditional_4_Template, 2, 0, "p", 35);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.model.seeded.teams);
    \u0275\u0275advance(2);
    \u0275\u0275property("matches", ctx_r2.bracketRevealed() ? ctx_r2.model.qualified.matches : ctx_r2.model.seeded.matches)("teams", ctx_r2.model.seeded.teams)("hybrid", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.bracketRevealed() ? 4 : -1);
  }
}
function FinalShowcaseComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-quiz-break", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("initialGame", ctx_r2.selectedGame())("showGamePicker", false)("autoplay", ctx_r2.playing());
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "points");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const id_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("winning", id_r14 === ctx_r2.model.champion.championId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(id_r14 === ctx_r2.model.champion.championId ? "CHAMPIONS" : "FINALIST");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.name(id_r14));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.model.champion.scores[id_r14]);
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 37)(1, "small");
    \u0275\u0275text(2, "FROM A MISSED DELIVERY CHARGE TO THE FINAL ANSWER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The opening reel introduced the mistake. The final wager brings the story back around: this time, Nova remembers delivery.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275repeaterCreate(8, FinalShowcaseComponent_Conditional_37_Conditional_1_For_9_Template, 9, 5, "article", 39, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.name(ctx_r2.model.champion.championId), " takes the championship.");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.finalRanking);
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.round().prompt);
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Atlas buzzes first and takes a 100-point lead.");
    \u0275\u0275elementEnd();
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Atlas risks 200 and misses the delivery charge. Nova risks 100 and gets it right. One detail changes the ending.");
    \u0275\u0275elementEnd();
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 41)(1, "small");
    \u0275\u0275text(2, "THE EXPLANATION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Conditional_5_Template, 2, 0, "p");
    \u0275\u0275conditionalCreate(6, FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Conditional_6_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "app-scoreboard", 42);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.demo.answers[ctx_r2.round().id]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.chapter() === 5 ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.chapter() === 7 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("teams", ctx_r2.view().teams)("animate", !ctx_r2.director.reducedMotion());
  }
}
function FinalShowcaseComponent_Conditional_37_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_0_Template, 2, 1, "p", 40);
    \u0275\u0275conditionalCreate(1, FinalShowcaseComponent_Conditional_37_Conditional_2_Conditional_1_Template, 8, 5);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.questionOpen() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.resultShown() ? 1 : -1);
  }
}
function FinalShowcaseComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-television-stage", 36);
    \u0275\u0275conditionalCreate(1, FinalShowcaseComponent_Conditional_37_Conditional_1_Template, 10, 1)(2, FinalShowcaseComponent_Conditional_37_Conditional_2_Template, 2, 2);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("view", ctx_r2.view())("theme", ctx_r2.theme)("presentation", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.chapter() === 8 ? 1 : 2);
  }
}
function FinalShowcaseComponent_Conditional_40_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.bracketRevealed.set(true);
      return \u0275\u0275resetView(ctx_r2.closeTeacher());
    });
    \u0275\u0275text(1, "Reveal quarterfinal results");
    \u0275\u0275elementEnd();
  }
}
function FinalShowcaseComponent_Conditional_40_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.closeTeacher();
      return \u0275\u0275resetView(ctx_r2.openQuestion());
    });
    \u0275\u0275text(1, "Reveal question");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 12);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.closeTeacher();
      return \u0275\u0275resetView(ctx_r2.showResult());
    });
    \u0275\u0275text(3, "Reveal scripted result");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.questionOpen());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.questionOpen() || ctx_r2.resultShown());
  }
}
function FinalShowcaseComponent_Conditional_40_Conditional_21_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_21_For_6_Template_button_click_0_listener() {
      const team_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.director.select("team", team_r20.id);
      return \u0275\u0275resetView(ctx_r2.closeTeacher());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const team_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", team_r20.name, " camera");
  }
}
function FinalShowcaseComponent_Conditional_40_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.director.select("wide");
      return \u0275\u0275resetView(ctx_r2.closeTeacher());
    });
    \u0275\u0275text(2, "Wide camera");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Conditional_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.director.select("question");
      return \u0275\u0275resetView(ctx_r2.closeTeacher());
    });
    \u0275\u0275text(4, "Question camera");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, FinalShowcaseComponent_Conditional_40_Conditional_21_For_6_Template, 2, 1, "button", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.view().teams);
  }
}
function FinalShowcaseComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "div")(2, "small");
    \u0275\u0275text(3, "HOST DESK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 44);
    \u0275\u0275text(5, "Teacher setup");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 45);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTeacher());
    });
    \u0275\u0275text(7, "Close \xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "The preview is paused. Set up a rehearsal or direct this fictional final.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 46);
    \u0275\u0275text(11, "Open championship setup \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "section")(13, "h3");
    \u0275\u0275text(14, "Preview controls");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, FinalShowcaseComponent_Conditional_40_Conditional_15_Template, 2, 0, "button");
    \u0275\u0275conditionalCreate(16, FinalShowcaseComponent_Conditional_40_Conditional_16_Template, 4, 2);
    \u0275\u0275elementStart(17, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.director.toggleSound());
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 22);
    \u0275\u0275listener("click", function FinalShowcaseComponent_Conditional_40_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleCameraMotion());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, FinalShowcaseComponent_Conditional_40_Conditional_21_Template, 7, 0, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "section")(23, "h3");
    \u0275\u0275text(24, "Video and artwork");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "a", 48);
    \u0275\u0275text(26, "Video script and shot list \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "a", 48);
    \u0275\u0275text(28, "Opening image \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "a", 48);
    \u0275\u0275text(30, "Video captions \u2197");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "section")(32, "h3");
    \u0275\u0275text(33, "How the recap connects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35, "Earlier challenge moments supply the warm-up story and qualification seeds. Nova's delivery-charge correction returns in the final wager.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c6, ctx_r2.project.projectId));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.chapter() === 2 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isStudio() && ctx_r2.chapter() !== 8 ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.director.sound() ? "Mute sound" : "Enable sound");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.director.reducedMotion() ? "Use camera moves" : "Use camera cuts");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isStudio() ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("href", "/projects/" + ctx_r2.project.projectId + "/mock-recap-script.md", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r2.demo.openingImage, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", "/projects/" + ctx_r2.project.projectId + "/mock-recap-captions.vtt", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.model.champion.evidence.length, " invented responses are kept separately from competition scores. This fictional preview does not read or change student records.");
  }
}
var FinalShowcaseComponent = class _FinalShowcaseComponent {
  project = inject(COMPETITION_CONFIG);
  demo = inject(FINAL_SHOWCASE);
  director = inject(BroadcastDirectorService);
  model = buildFinalShowcase(this.project, this.demo);
  stepMs = 4e3;
  // The fast showcase fits its camera move and both reveals inside one chapter.
  theme = __spreadProps(__spreadValues({}, this.project.broadcast ?? midnightBroadcast), { camera: __spreadProps(__spreadValues({}, (this.project.broadcast ?? midnightBroadcast).camera), {
    moveMs: 450,
    revealMs: 250
  }) });
  chapter = signal(
    0,
    ...ngDevMode ? [{ debugName: "chapter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  highlight = signal(
    0,
    ...ngDevMode ? [{ debugName: "highlight" }] : (
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
  questionOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "questionOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resultShown = signal(
    false,
    ...ngDevMode ? [{ debugName: "resultShown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bracketRevealed = signal(
    false,
    ...ngDevMode ? [{ debugName: "bracketRevealed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  seconds = signal(
    90,
    ...ngDevMode ? [{ debugName: "seconds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  videoFailed = signal(
    false,
    ...ngDevMode ? [{ debugName: "videoFailed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  video = viewChild(
    "video",
    ...ngDevMode ? [{ debugName: "video" }] : (
      /* istanbul ignore next */
      []
    )
  );
  area = viewChild(
    "area",
    ...ngDevMode ? [{ debugName: "area" }] : (
      /* istanbul ignore next */
      []
    )
  );
  stage = viewChild(
    TelevisionStageComponent,
    ...ngDevMode ? [{ debugName: "stage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pageTop = viewChild(
    "pageTop",
    ...ngDevMode ? [{ debugName: "pageTop" }] : (
      /* istanbul ignore next */
      []
    )
  );
  quiz = viewChild(
    QuizBreakComponent,
    ...ngDevMode ? [{ debugName: "quiz" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherPanel = viewChild(
    "teacherPanel",
    ...ngDevMode ? [{ debugName: "teacherPanel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherButton = viewChild(
    "teacherButton",
    ...ngDevMode ? [{ debugName: "teacherButton" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teacherOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "teacherOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedGame = signal(
    "odd",
    ...ngDevMode ? [{ debugName: "selectedGame" }] : (
      /* istanbul ignore next */
      []
    )
  );
  games = QUIZ_GAMES;
  descriptions = ["Three weeks of learning. One unforgettable final.", "The moments that brought our teams here.", "Eight teams compete for four places on stage.", "One question. Four teams. Make your answer count.", "Everybody plays. The scoreboard takes a break.", "A fast answer could change the lead.", "A little laughter before the last big decision.", "The final question. Everything can change.", "A comeback worth celebrating."];
  chapters = ["Opening", "Season rewind", "The bracket", "Opening Move", "Quiz break", "The buzzer", "One more laugh", "Final wager", "The champions"];
  roundIndex = computed(
    () => this.chapter() === 5 ? 1 : this.chapter() === 7 ? 2 : 0,
    ...ngDevMode ? [{ debugName: "roundIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isStudio = computed(
    () => [3, 5, 7, 8].includes(this.chapter()),
    ...ngDevMode ? [{ debugName: "isStudio" }] : (
      /* istanbul ignore next */
      []
    )
  );
  round = computed(
    () => this.model.config.rounds[this.roundIndex()],
    ...ngDevMode ? [{ debugName: "round" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentState = computed(
    () => {
      if (this.chapter() === 8)
        return this.model.champion;
      const pair = this.model.rounds[this.roundIndex()];
      if (this.resultShown())
        return pair.after;
      return this.questionOpen() ? __spreadProps(__spreadValues({}, pair.before), { phase: "open", buzzes: this.round().kind === "buzzer" ? [this.demo.buzzerTeamId] : [] }) : pair.before;
    },
    ...ngDevMode ? [{ debugName: "currentState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = computed(
    () => studioProjection(this.model.config, this.currentState(), this.theme, this.director.shot(), this.director.teamId(), this.director.cue(), this.director.step(), this.seconds()),
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalRanking = [...this.model.champion.participants].sort((a, b) => this.model.champion.scores[b] - this.model.champion.scores[a]);
  scheduled = [];
  clock;
  injector = inject(Injector);
  constructor() {
    afterNextRender(() => {
      for (const moment of this.demo.highlights)
        if (moment.image) {
          const image = new Image();
          image.src = moment.image.src;
        }
    });
    this.clock = setInterval(() => {
      if (this.playing() && this.questionOpen() && !this.resultShown())
        this.seconds.update((v) => Math.max(0, v - 1));
    }, 1e3);
    this.later(this.stepMs, () => this.next());
  }
  name(id) {
    return this.model.config.teams.find((t) => t.id === id)?.name ?? id;
  }
  play() {
    this.playing.set(true);
    this.go(this.chapter() === 0 || this.chapter() === 8 ? 1 : this.chapter());
  }
  pause() {
    this.playing.set(false);
    this.clear();
    this.director.cancel();
    this.video()?.nativeElement.pause();
  }
  go(index) {
    this.clear();
    this.director.cancel();
    this.chapter.set(Math.max(0, Math.min(this.chapters.length - 1, index)));
    this.questionOpen.set(false);
    this.resultShown.set(false);
    this.seconds.set(this.round().seconds);
    this.selectedGame.set(this.chapter() === 6 ? "wrong" : "odd");
    afterNextRender(() => {
      const area = this.area()?.nativeElement;
      area?.focus({ preventScroll: true });
      this.pageTop()?.nativeElement.scrollIntoView?.({ block: "start", behavior: this.director.reducedMotion() ? "instant" : "smooth" });
    }, { injector: this.injector });
    if (this.chapter() === 1) {
      this.highlight.set(0);
      if (this.playing() && (!this.demo.recapVideo || this.videoFailed()))
        this.playStoryboard();
    } else if (this.chapter() === 2) {
      this.bracketRevealed.set(false);
      if (this.playing())
        this.later(1400, () => this.bracketRevealed.set(true));
    } else if (this.chapter() === 8) {
      this.director.run("champion", this.theme, void 0, this.model.champion.championId);
      this.playing.set(false);
    } else if (this.isStudio()) {
      this.director.autoShot("wide");
      if (this.playing())
        this.openQuestion();
    }
    if (this.playing())
      this.later(this.stepMs, () => this.next());
  }
  next() {
    this.go(this.chapter() + 1);
  }
  openQuestion() {
    if (this.questionOpen() || this.director.cue())
      return;
    this.area()?.nativeElement.focus({ preventScroll: true });
    this.director.run("question", this.theme, () => {
      this.questionOpen.set(true);
      if (this.round().kind === "buzzer")
        this.later(400, () => this.director.autoShot("team", this.demo.buzzerTeamId));
      if (this.playing())
        this.later(900, () => this.showResult());
    });
  }
  showResult() {
    if (!this.questionOpen() || this.director.cue() || this.resultShown())
      return;
    this.area()?.nativeElement.focus({ preventScroll: true });
    this.director.run("score", this.theme, () => {
      this.resultShown.set(true);
    });
  }
  selectChapter(index) {
    this.pause();
    this.go(index);
  }
  selectGame(id) {
    this.pause();
    this.selectedGame.set(id);
    this.quiz()?.choose(id);
  }
  toggleCameraMotion() {
    this.director.reducedMotion.update((value) => !value);
  }
  openTeacher() {
    this.pause();
    this.teacherOpen.set(true);
    afterNextRender(() => {
      const panel = this.teacherPanel()?.nativeElement;
      if (panel && !panel.open) {
        if (panel.showModal)
          panel.showModal();
        else
          panel.setAttribute("open", "");
      }
    }, { injector: this.injector });
  }
  closeTeacher(event) {
    event?.preventDefault();
    this.teacherOpen.set(false);
    const panel = this.teacherPanel()?.nativeElement;
    if (panel?.open) {
      if (panel.close)
        panel.close();
      else
        panel.removeAttribute("open");
    }
    this.teacherButton()?.nativeElement.focus({ preventScroll: true });
  }
  showHighlight(index) {
    this.pause();
    this.highlight.set(index);
  }
  videoError() {
    this.videoFailed.set(true);
    if (this.playing())
      this.playStoryboard();
  }
  playStoryboard() {
    this.highlight.set(0);
    this.demo.highlights.forEach((_, index) => {
      if (index)
        this.later(index * this.stepMs / this.demo.highlights.length, () => this.highlight.set(index));
    });
  }
  later(ms, action) {
    this.scheduled.push(setTimeout(action, ms));
  }
  clear() {
    this.scheduled.forEach(clearTimeout);
    this.scheduled = [];
  }
  ngOnDestroy() {
    this.clear();
    clearInterval(this.clock);
    this.director.cancel();
  }
  static \u0275fac = function FinalShowcaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinalShowcaseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinalShowcaseComponent, selectors: [["app-final-showcase"]], viewQuery: function FinalShowcaseComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.video, _c0, 5)(ctx.area, _c1, 5)(ctx.stage, TelevisionStageComponent, 5)(ctx.pageTop, _c2, 5)(ctx.quiz, QuizBreakComponent, 5)(ctx.teacherPanel, _c3, 5)(ctx.teacherButton, _c4, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(7);
    }
  }, features: [\u0275\u0275ProvidersFeature([BroadcastDirectorService])], decls: 41, vars: 13, consts: [["pageTop", ""], ["teacherButton", ""], ["area", ""], ["teacherPanel", ""], ["video", ""], [1, "showcase"], [1, "show-header"], ["aria-label", "Project navigation", 1, "top-bar"], ["routerLink", "/projects"], ["aria-haspopup", "dialog", "aria-controls", "teacher-setup", 3, "click"], [1, "page-header"], [1, "playback"], [3, "click", "disabled"], [1, "gold", 3, "click"], ["aria-label", "Fictional final chapters", 1, "rundown"], ["aria-label", "Recap weeks", 1, "header-options"], ["aria-label", "Quiz break games", 1, "header-options"], ["tabindex", "-1"], [1, "opening"], [1, "reel", 3, "has-art"], [3, "initialGame", "showGamePicker", "autoplay"], ["id", "teacher-setup", "aria-labelledby", "teacher-title", 1, "teacher-panel", 3, "cancel", "close"], [3, "click"], ["alt", "A championship TV studio with four podiums and the title Three weeks. One final.", 3, "src"], [1, "opening-overlay"], [1, "reel"], ["controls", "", "playsinline", "", 3, "src", "poster", "autoplay"], ["controls", "", "playsinline", "", 3, "error", "src", "poster", "autoplay"], ["kind", "captions", "srclang", "en", "label", "English", "default", "", 3, "src"], [1, "reel-art", 3, "src", "alt"], [1, "reel-content"], [1, "reel-tag"], [1, "skill"], [1, "seed-strip"], [3, "matches", "teams", "hybrid"], [1, "callout"], [3, "view", "theme", "presentation"], [1, "champion-result"], [1, "final-scores"], [3, "winning"], [1, "readable-question"], [1, "result"], ["label", "Round scores", 3, "teams", "animate"], [1, "teacher-heading"], ["id", "teacher-title"], ["autofocus", "", "aria-label", "Close teacher setup", 3, "click"], [1, "setup-link", 3, "routerLink"], [1, "teacher-cameras"], ["download", "", 3, "href"]], template: function FinalShowcaseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 5)(1, "header", 6, 0)(3, "nav", 7)(4, "a", 8);
      \u0275\u0275text(5, "\u2190 Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 9, 1);
      \u0275\u0275listener("click", function FinalShowcaseComponent_Template_button_click_8_listener() {
        return ctx.openTeacher();
      });
      \u0275\u0275text(10, "Teacher setup");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 10)(12, "div")(13, "small");
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "h1");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 11)(20, "button", 12);
      \u0275\u0275listener("click", function FinalShowcaseComponent_Template_button_click_20_listener() {
        return ctx.selectChapter(ctx.chapter() - 1);
      });
      \u0275\u0275text(21, "\u2190 Previous");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 13);
      \u0275\u0275listener("click", function FinalShowcaseComponent_Template_button_click_22_listener() {
        return ctx.playing() ? ctx.pause() : ctx.play();
      });
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 12);
      \u0275\u0275listener("click", function FinalShowcaseComponent_Template_button_click_24_listener() {
        return ctx.selectChapter(ctx.chapter() + 1);
      });
      \u0275\u0275text(25, "Next \u2192");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "nav", 14);
      \u0275\u0275repeaterCreate(27, FinalShowcaseComponent_For_28_Template, 4, 3, "button", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, FinalShowcaseComponent_Conditional_29_Template, 3, 0, "div", 15)(30, FinalShowcaseComponent_Conditional_30_Template, 3, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "main", 17, 2);
      \u0275\u0275conditionalCreate(33, FinalShowcaseComponent_Conditional_33_Template, 7, 1, "section", 18)(34, FinalShowcaseComponent_Conditional_34_Template, 3, 3, "section", 19)(35, FinalShowcaseComponent_Conditional_35_Template, 5, 4)(36, FinalShowcaseComponent_Conditional_36_Template, 1, 3, "app-quiz-break", 20)(37, FinalShowcaseComponent_Conditional_37_Template, 3, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "dialog", 21, 3);
      \u0275\u0275listener("cancel", function FinalShowcaseComponent_Template_dialog_cancel_38_listener($event) {
        return ctx.closeTeacher($event);
      })("close", function FinalShowcaseComponent_Template_dialog_close_38_listener() {
        return ctx.teacherOpen.set(false);
      });
      \u0275\u0275conditionalCreate(40, FinalShowcaseComponent_Conditional_40_Template, 38, 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%broadcast-accent", ctx.theme.palette.accent);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.project.title);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.teacherOpen());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("FICTIONAL FINAL \xB7 ", (ctx.chapter() + 1).toString().padStart(2, "0"), " / 09");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.chapters[ctx.chapter()]);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.descriptions[ctx.chapter()]);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.chapter() === 0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.playing() ? "Pause \xB7 4s per step" : ctx.chapter() === 8 ? "Replay final" : "Play \xB7 4s per step");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.chapter() === 8);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.chapters);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.chapter() === 1 ? 29 : ctx.chapter() === 4 || ctx.chapter() === 6 ? 30 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.chapter() === 0 ? 33 : ctx.chapter() === 1 ? 34 : ctx.chapter() === 2 ? 35 : ctx.chapter() === 4 || ctx.chapter() === 6 ? 36 : 37);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.teacherOpen() ? 40 : -1);
    }
  }, dependencies: [RouterLink, TelevisionStageComponent, CompetitionBracketComponent, QuizBreakComponent, ScoreboardComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #060d18;\n  color: #eff3f9;\n  font-family: Arial, sans-serif;\n}\n.showcase[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: auto;\n  padding: 0 32px 28px;\n}\nheader[_ngcontent-%COMP%] {\n  min-height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  font-size: 11px;\n}\nheader[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  color: #a9bed7;\n  text-decoration: none;\n}\nheader[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  letter-spacing: 2px;\n  font-size: 10px;\n}\nheader[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: 15px;\n  color: #edc875;\n  border: 1px solid #796644;\n  padding: 6px;\n  font-size: 8px;\n}\nbutton[_ngcontent-%COMP%] {\n  min-height: 42px;\n  padding: 11px 17px;\n  background: #172338;\n  color: #e8eff9;\n  border: 1px solid #42556f;\n  border-radius: 4px;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton.gold[_ngcontent-%COMP%] {\n  background: #edc875;\n  border-color: #edc875;\n  color: #172234;\n  font-weight: 700;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid white;\n  outline-offset: 3px;\n}\nmain[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.opening[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  border-radius: 7px;\n  overflow: hidden;\n  border: 1px solid #776139;\n}\n.opening[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.opening-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: auto 0 0;\n  padding: 28px 35px;\n  background: linear-gradient(transparent, rgba(5, 10, 19, 0.9607843137));\n  padding-top: 70px;\n}\n.opening-overlay[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 3px;\n  color: #f3d18c;\n}\n.opening-overlay[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 19px;\n  line-height: 1.4;\n  margin: 10px 0 18px;\n  color: #f2f5f9;\n}\n.opening-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.pitch[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 3rem;\n  padding: 30px 0;\n}\n.pitch[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 31px;\n  font-weight: 500;\n  letter-spacing: -0.5px;\n  line-height: 1.2;\n}\n.pitch[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #a9bcd5;\n  font-size: 14px;\n  line-height: 1.8;\n}\n.reel[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 480px;\n  background-size: cover;\n  background-position: center;\n  border: 1px solid #584c35;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.reel-content[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 480px;\n  box-sizing: border-box;\n  padding: 46px 7%;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 16, 26, 0.9803921569),\n      rgba(6, 16, 26, 0.9019607843) 60%,\n      rgba(6, 16, 26, 0.4392156863));\n}\n.reel-tag[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 3px;\n  color: #ebce92;\n  display: flex;\n  justify-content: space-between;\n}\n.reel-tag[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: #b9c9dd;\n  border: 1px solid #8292a4;\n  padding: 5px;\n}\n.reel-content[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 55px;\n  color: #e8c579;\n  font-size: 13px;\n  letter-spacing: 5px;\n}\n.reel-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(30px, 4.6vw, 60px);\n  line-height: 1.05;\n  max-width: 700px;\n  font-weight: 500;\n  letter-spacing: -1px;\n  margin: 14px 0 20px;\n}\n.reel-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1.6;\n  max-width: 670px;\n  color: #ced8e6;\n}\n.skill[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #e7ca8c;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n.reel-progress[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 35px;\n}\n.reel-progress[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n}\n.reel-progress[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #edc875;\n  color: #07101b;\n}\nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-height: 70vh;\n}\n.two-column[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin: 25px 0;\n}\narticle[_ngcontent-%COMP%] {\n  background: #101b2c;\n  border: 1px solid #2e405b;\n  border-radius: 6px;\n  padding: 24px;\n}\narticle[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.chapter-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.round-controls[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.champion-result[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #e5c584;\n}\narticle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b8c9df;\n  line-height: 1.7;\n  font-size: 14px;\n}\narticle[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.narration[_ngcontent-%COMP%] {\n  font-size: 16px !important;\n  color: #e6edf8 !important;\n}\na[_ngcontent-%COMP%] {\n  color: #f0cf88;\n  line-height: 2.3;\n}\n.chapter-heading[_ngcontent-%COMP%] {\n  padding: 40px;\n  background-size: cover;\n  background-position: 50% 35%;\n  border: 1px solid #75613e;\n  text-align: center;\n  box-shadow: inset 0 0 0 500px rgba(5, 13, 24, 0.7882352941);\n  border-radius: 5px;\n}\n.chapter-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 500;\n  margin: 14px;\n}\n.chapter-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b4c7de;\n}\n.seed-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 8px;\n  margin: 25px 0;\n}\n.seed-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  border-left: 2px solid #c5a765;\n  background: #122039;\n  padding: 13px 10px;\n}\n.seed-strip[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 2px;\n  color: #d9bd85;\n}\n.seed-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  margin: 8px 0;\n  font-weight: 500;\n}\n.seed-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #acbdd3;\n}\n.callout[_ngcontent-%COMP%] {\n  border-left: 3px solid #d5b878;\n  padding: 15px 20px;\n  background: #111e31;\n  color: #cddbec;\n  line-height: 1.7;\n}\n.round-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 16px 0;\n}\n.round-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.round-controls[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin: 7px 0;\n  font-weight: 500;\n}\n.readable-question[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1.6;\n  padding: 22px;\n  border-left: 3px solid #e2c786;\n  background: #101e31;\n}\n.result[_ngcontent-%COMP%] {\n  border-color: #8b754d;\n}\n.final-scores[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin: 20px 0;\n}\n.final-scores[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  min-width: 120px;\n}\n.final-scores[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.final-scores[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 500;\n}\n.final-scores[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 46px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n}\n.final-scores[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #9fb5cf;\n  font-size: 10px;\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n.winning[_ngcontent-%COMP%] {\n  border-color: #e7c57b;\n  background: #2b251a;\n}\n.champion-result[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px 20px 10px;\n}\n.champion-result[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 42px;\n  font-weight: 500;\n  color: #efce85;\n}\n.champion-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b9c9de;\n  line-height: 1.8;\n  max-width: 700px;\n  margin: auto;\n}\n.rundown[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  overflow-x: auto;\n  border-top: 1px solid #2e3d53;\n  padding-top: 22px;\n  margin-top: 30px;\n}\n.rundown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 95px;\n  text-align: left;\n  font-size: 10px;\n  padding: 12px 10px;\n  background: #0d192b;\n  border-color: #283b54;\n}\n.rundown[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  color: #a9bbd2;\n  margin-bottom: 8px;\n}\n.rundown[_ngcontent-%COMP%]   button[aria-current=step][_ngcontent-%COMP%] {\n  border-color: #e6c57d;\n  background: #23251f;\n  color: #f5d794;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  justify-content: space-between;\n  padding-top: 20px;\n}\nfooter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 10px;\n  line-height: 1.6;\n  color: #a4b7ce;\n  max-width: 750px;\n}\n@media (max-width: 700px) {\n  .showcase[_ngcontent-%COMP%] {\n    padding: 0 14px 20px;\n  }\n  header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    padding: 12px 0;\n    min-height: 55px;\n  }\n  header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n  header[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n    margin-left: 5px;\n  }\n  .opening[_ngcontent-%COMP%] {\n    aspect-ratio: 4/3;\n  }\n  .opening-overlay[_ngcontent-%COMP%] {\n    padding: 45px 16px 15px;\n  }\n  .opening-overlay[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .opening-overlay[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .opening-overlay[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 8px 10px;\n  }\n  .pitch[_ngcontent-%COMP%], \n   .two-column[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .pitch[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .reel-content[_ngcontent-%COMP%] {\n    padding: 25px 20px;\n  }\n  .reel-tag[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .reel-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .seed-strip[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .round-controls[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .round-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .chapter-heading[_ngcontent-%COMP%] {\n    padding: 25px 12px;\n  }\n  .chapter-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 27px;\n  }\n  .champion-result[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  footer[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .readable-question[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n[_nghost-%COMP%]   .reel-art[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  animation: _ngcontent-%COMP%_recap-pan 4s ease-out both;\n}\n[_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 16, 26, 0.9333333333) 0%,\n      rgba(6, 16, 26, 0.6) 35%,\n      rgba(6, 16, 26, 0.0823529412) 64%,\n      transparent 85%);\n  padding: 36px 5%;\n}\n[_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  max-width: 48%;\n  font-size: clamp(29px, 3.6vw, 50px);\n  text-shadow: 0 2px 18px #000;\n}\n[_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 44%;\n  font-size: 16px;\n  text-shadow: 0 2px 10px #000;\n}\n[_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .skill[_ngcontent-%COMP%] {\n  max-width: 44%;\n  line-height: 1.7;\n}\n@keyframes _ngcontent-%COMP%_recap-pan {\n  from {\n    transform: scale(1.035);\n  }\n  to {\n    transform: scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]   .reel-art[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n@media (max-width: 700px) {\n  [_nghost-%COMP%]   .reel-art[_ngcontent-%COMP%] {\n    position: relative;\n    height: 240px;\n    display: block;\n    object-position: right center;\n  }\n  [_nghost-%COMP%]   .reel-content[_ngcontent-%COMP%] {\n    min-height: 0;\n  }\n  [_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%] {\n    padding: 22px;\n    background: #081322;\n  }\n  [_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n   [_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .reel-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   [_nghost-%COMP%]   .has-art[_ngcontent-%COMP%]   .skill[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  [_nghost-%COMP%]   .reel-content[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n    margin-top: 25px;\n  }\n}\n.show-header[_ngcontent-%COMP%] {\n  display: block;\n  position: relative;\n  min-height: 0;\n  padding: 0 0 20px;\n}\n.top-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  min-height: 62px;\n  border-bottom: 1px solid #35435b;\n}\n.top-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.top-bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  letter-spacing: 2px;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n.top-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  white-space: nowrap;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px 0 18px;\n}\n.page-header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #edc875;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 500;\n  letter-spacing: -0.6px;\n  margin: 7px 0;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #b6c7dc;\n  margin: 0;\n  line-height: 1.5;\n}\n.playback[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.show-header[_ngcontent-%COMP%]   .rundown[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n.show-header[_ngcontent-%COMP%]   .rundown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 50px;\n  white-space: nowrap;\n}\n.header-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  padding-top: 12px;\n  flex-wrap: wrap;\n}\n.header-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.header-options[_ngcontent-%COMP%]   [aria-pressed=true][_ngcontent-%COMP%] {\n  background: #edc875;\n  color: #07101b;\n  border-color: #edc875;\n}\nmain[_ngcontent-%COMP%] {\n  scroll-margin-top: 20px;\n}\n.teacher-panel[_ngcontent-%COMP%] {\n  color: #e8eff9;\n  background: #0d192a;\n  border: 1px solid #ad9257;\n  border-radius: 10px;\n  width: min(660px, 100vw - 48px);\n  max-height: 82vh;\n  padding: 26px;\n  box-sizing: border-box;\n  box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5333333333);\n}\n.teacher-panel[_ngcontent-%COMP%]::backdrop {\n  background: rgba(2, 8, 18, 0.7490196078);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.teacher-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}\n.teacher-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  letter-spacing: 2px;\n  color: #edc875;\n  font-size: 9px;\n}\n.teacher-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 7px 0;\n  font-size: 27px;\n  font-weight: 500;\n}\n.teacher-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b9cbe0;\n  font-size: 13px;\n  line-height: 1.7;\n}\n.teacher-panel[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  padding-top: 14px;\n  margin-top: 18px;\n  border-top: 1px solid #34465e;\n}\n.teacher-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #f2d699;\n}\n.teacher-panel[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n}\n.teacher-panel[_ngcontent-%COMP%]   .setup-link[_ngcontent-%COMP%] {\n  background: #25354b;\n  border: 1px solid #526681;\n  border-radius: 4px;\n  padding: 9px 13px;\n  text-decoration: none;\n}\n.teacher-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 4px 6px 4px 0;\n}\n.teacher-cameras[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.seed-strip[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n@media (max-width: 700px) {\n  .top-bar[_ngcontent-%COMP%] {\n    gap: 10px;\n    min-height: 58px;\n  }\n  .top-bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 0.5px;\n  }\n  .top-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    display: block;\n    padding: 18px 0 14px;\n  }\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .playback[_ngcontent-%COMP%] {\n    margin-top: 15px;\n  }\n  .playback[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 11px;\n    flex: 1;\n    padding-inline: 10px;\n  }\n  .teacher-panel[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .show-header[_ngcontent-%COMP%] {\n    padding-bottom: 15px;\n  }\n}\n/*# sourceMappingURL=final-showcase.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinalShowcaseComponent, [{
    type: Component,
    args: [{ selector: "app-final-showcase", standalone: true, imports: [RouterLink, TelevisionStageComponent, CompetitionBracketComponent, QuizBreakComponent, ScoreboardComponent], providers: [BroadcastDirectorService], template: `<div class="showcase" [style.--broadcast-accent]="theme.palette.accent">\r
  <header #pageTop class="show-header">\r
    <nav class="top-bar" aria-label="Project navigation">\r
      <a routerLink="/projects">\u2190 Projects</a><span>{{ project.title }}</span>\r
      <button #teacherButton aria-haspopup="dialog" aria-controls="teacher-setup" [attr.aria-expanded]="teacherOpen()" (click)="openTeacher()">Teacher setup</button>\r
    </nav>\r
    <div class="page-header">\r
      <div><small>FICTIONAL FINAL \xB7 {{ (chapter() + 1).toString().padStart(2, '0') }} / 09</small><h1>{{ chapters[chapter()] }}</h1><p>{{ descriptions[chapter()] }}</p></div>\r
      <div class="playback"><button [disabled]="chapter() === 0" (click)="selectChapter(chapter() - 1)">\u2190 Previous</button><button class="gold" (click)="playing() ? pause() : play()">{{ playing() ? 'Pause \xB7 4s per step' : chapter() === 8 ? 'Replay final' : 'Play \xB7 4s per step' }}</button><button [disabled]="chapter() === 8" (click)="selectChapter(chapter() + 1)">Next \u2192</button></div>\r
    </div>\r
    <nav class="rundown" aria-label="Fictional final chapters">@for (title of chapters; track title; let i = $index) { <button [attr.aria-current]="chapter() === i ? 'step' : null" (click)="selectChapter(i)"><span>{{ (i + 1).toString().padStart(2, '0') }}</span>{{ title }}</button> }</nav>\r
    @if (chapter() === 1) {\r
      <div class="header-options" aria-label="Recap weeks">@for (h of demo.highlights; track h.id; let i = $index) { <button [attr.aria-pressed]="highlight() === i" (click)="showHighlight(i)">{{ h.week }}</button> }</div>\r
    } @else if (chapter() === 4 || chapter() === 6) {\r
      <div class="header-options" aria-label="Quiz break games">@for (game of games; track game.id) { <button [attr.aria-pressed]="selectedGame() === game.id" (click)="selectGame(game.id)">{{ game.name }}</button> }</div>\r
    }\r
  </header>\r
  <main #area tabindex="-1">\r
    @if (chapter() === 0) {\r
      <section class="opening"><img [src]="demo.openingImage" alt="A championship TV studio with four podiums and the title Three weeks. One final." /><div class="opening-overlay"><span>AN ENTIRE PROJECT. ONE UNFORGETTABLE FINAL.</span><p>Meet the teams. Relive the mistakes. Watch the comeback.</p></div></section>\r
    } @else if (chapter() === 1) {\r
      <section class="reel" [class.has-art]="!!demo.highlights[highlight()].image">\r
        @if (demo.recapVideo && !videoFailed()) {\r
          <video #video [src]="demo.recapVideo" [poster]="demo.openingImage" controls playsinline [autoplay]="playing()" (error)="videoError()">\r
            @if (demo.recapCaptions) { <track kind="captions" [src]="demo.recapCaptions" srclang="en" label="English" default /> }\r
          </video>\r
        } @else {\r
          @for (moment of [demo.highlights[highlight()]]; track moment.id) { <img class="reel-art" [src]="moment.image?.src ?? demo.openingImage" [alt]="moment.image?.alt ?? ''" /> }\r
          <div class="reel-content"><div class="reel-tag">SEASON REWIND <span>MOCK HIGHLIGHT REEL</span></div><small>{{ demo.highlights[highlight()].week }}</small><h2>{{ demo.highlights[highlight()].title }}</h2><p>{{ demo.highlights[highlight()].caption }}</p><div class="skill">{{ demo.highlights[highlight()].skill }}</div></div>\r
        }\r
      </section>\r
    } @else if (chapter() === 2) {\r
      <div class="seed-strip">@for (team of model.seeded.teams; track team.id; let i = $index) { <div><small>SEED {{ i + 1 }}</small><strong>{{ team.name }}</strong><span>{{ team.qualificationPoints }} qualifier pts</span></div> }</div>\r
      <app-competition-bracket [matches]="bracketRevealed() ? model.qualified.matches : model.seeded.matches" [teams]="model.seeded.teams" [hybrid]="true" />\r
      @if (bracketRevealed()) { <p class="callout">Nova, Falcons, Atlas, and Comets advance. Every team stays part of the show through the audience breaks.</p> }\r
    } @else if (chapter() === 4 || chapter() === 6) {\r
      <app-quiz-break [initialGame]="selectedGame()" [showGamePicker]="false" [autoplay]="playing()" />\r
    } @else {\r
      <app-television-stage [view]="view()" [theme]="theme" [presentation]="true" />\r
      @if (chapter() === 8) {\r
        <section class="champion-result"><small>FROM A MISSED DELIVERY CHARGE TO THE FINAL ANSWER</small><h2>{{ name(model.champion.championId!) }} takes the championship.</h2><p>The opening reel introduced the mistake. The final wager brings the story back around: this time, Nova remembers delivery.</p></section>\r
        <div class="final-scores">@for (id of finalRanking; track id) { <article [class.winning]="id === model.champion.championId"><small>{{ id === model.champion.championId ? 'CHAMPIONS' : 'FINALIST' }}</small><h3>{{ name(id) }}</h3><strong>{{ model.champion.scores[id] }}</strong><span>points</span></article> }</div>\r
      } @else {\r
        @if (questionOpen()) { <p class="readable-question">{{ round().prompt }}</p> }\r
        @if (resultShown()) {\r
          <article class="result"><small>THE EXPLANATION</small><p>{{ demo.answers[round().id] }}</p>\r
            @if (chapter() === 5) { <p>Atlas buzzes first and takes a 100-point lead.</p> }\r
            @if (chapter() === 7) { <p>Atlas risks 200 and misses the delivery charge. Nova risks 100 and gets it right. One detail changes the ending.</p> }\r
          </article>\r
          <app-scoreboard [teams]="view().teams" [animate]="!director.reducedMotion()" label="Round scores" />\r
        }\r
      }\r
    }\r
  </main>\r
  <dialog #teacherPanel id="teacher-setup" class="teacher-panel" aria-labelledby="teacher-title" (cancel)="closeTeacher($event)" (close)="teacherOpen.set(false)">\r
    @if (teacherOpen()) {\r
      <div class="teacher-heading"><div><small>HOST DESK</small><h2 id="teacher-title">Teacher setup</h2></div><button autofocus (click)="closeTeacher()" aria-label="Close teacher setup">Close \xD7</button></div>\r
      <p>The preview is paused. Set up a rehearsal or direct this fictional final.</p>\r
      <a class="setup-link" [routerLink]="['/projects', project.projectId]">Open championship setup \u2192</a>\r
      <section><h3>Preview controls</h3>\r
        @if (chapter() === 2) { <button (click)="bracketRevealed.set(true); closeTeacher()">Reveal quarterfinal results</button> }\r
        @if (isStudio() && chapter() !== 8) { <button [disabled]="questionOpen()" (click)="closeTeacher(); openQuestion()">Reveal question</button><button [disabled]="!questionOpen() || resultShown()" (click)="closeTeacher(); showResult()">Reveal scripted result</button> }\r
        <button (click)="director.toggleSound()">{{ director.sound() ? 'Mute sound' : 'Enable sound' }}</button><button (click)="toggleCameraMotion()">{{ director.reducedMotion() ? 'Use camera moves' : 'Use camera cuts' }}</button>\r
        @if (isStudio()) { <div class="teacher-cameras"><button (click)="director.select('wide'); closeTeacher()">Wide camera</button><button (click)="director.select('question'); closeTeacher()">Question camera</button>@for (team of view().teams; track team.id) { <button (click)="director.select('team', team.id); closeTeacher()">{{ team.name }} camera</button> }</div> }\r
      </section>\r
      <section><h3>Video and artwork</h3><a [href]="'/projects/' + project.projectId + '/mock-recap-script.md'" download>Video script and shot list \u2197</a><a [href]="demo.openingImage" download>Opening image \u2197</a><a [href]="'/projects/' + project.projectId + '/mock-recap-captions.vtt'" download>Video captions \u2197</a></section>\r
      <section><h3>How the recap connects</h3><p>Earlier challenge moments supply the warm-up story and qualification seeds. Nova's delivery-charge correction returns in the final wager.</p><p>{{ model.champion.evidence.length }} invented responses are kept separately from competition scores. This fictional preview does not read or change student records.</p></section>\r
    }\r
  </dialog>\r
</div>\r
`, styles: ["/* src/app/templates/competition-show/showcase/final-showcase.component.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: #060d18;\n  color: #eff3f9;\n  font-family: Arial, sans-serif;\n}\n.showcase {\n  max-width: 1440px;\n  margin: auto;\n  padding: 0 32px 28px;\n}\nheader {\n  min-height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  font-size: 11px;\n}\nheader > a {\n  color: #a9bed7;\n  text-decoration: none;\n}\nheader > span {\n  letter-spacing: 2px;\n  font-size: 10px;\n}\nheader b {\n  display: inline-block;\n  margin-left: 15px;\n  color: #edc875;\n  border: 1px solid #796644;\n  padding: 6px;\n  font-size: 8px;\n}\nbutton {\n  min-height: 42px;\n  padding: 11px 17px;\n  background: #172338;\n  color: #e8eff9;\n  border: 1px solid #42556f;\n  border-radius: 4px;\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\nbutton.gold {\n  background: #edc875;\n  border-color: #edc875;\n  color: #172234;\n  font-weight: 700;\n}\nbutton:focus-visible,\na:focus-visible {\n  outline: 2px solid white;\n  outline-offset: 3px;\n}\nmain:focus {\n  outline: none;\n}\n.opening {\n  position: relative;\n  aspect-ratio: 16/9;\n  border-radius: 7px;\n  overflow: hidden;\n  border: 1px solid #776139;\n}\n.opening > img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.opening-overlay {\n  position: absolute;\n  inset: auto 0 0;\n  padding: 28px 35px;\n  background: linear-gradient(transparent, rgba(5, 10, 19, 0.9607843137));\n  padding-top: 70px;\n}\n.opening-overlay > span {\n  font-size: 9px;\n  letter-spacing: 3px;\n  color: #f3d18c;\n}\n.opening-overlay p {\n  font-size: 19px;\n  line-height: 1.4;\n  margin: 10px 0 18px;\n  color: #f2f5f9;\n}\n.opening-overlay button {\n  margin-right: 10px;\n}\n.pitch {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 3rem;\n  padding: 30px 0;\n}\n.pitch h1 {\n  margin: 0;\n  font-size: 31px;\n  font-weight: 500;\n  letter-spacing: -0.5px;\n  line-height: 1.2;\n}\n.pitch p {\n  margin: 0;\n  color: #a9bcd5;\n  font-size: 14px;\n  line-height: 1.8;\n}\n.reel {\n  position: relative;\n  min-height: 480px;\n  background-size: cover;\n  background-position: center;\n  border: 1px solid #584c35;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.reel-content {\n  position: relative;\n  min-height: 480px;\n  box-sizing: border-box;\n  padding: 46px 7%;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 16, 26, 0.9803921569),\n      rgba(6, 16, 26, 0.9019607843) 60%,\n      rgba(6, 16, 26, 0.4392156863));\n}\n.reel-tag {\n  font-size: 10px;\n  letter-spacing: 3px;\n  color: #ebce92;\n  display: flex;\n  justify-content: space-between;\n}\n.reel-tag span {\n  font-size: 8px;\n  color: #b9c9dd;\n  border: 1px solid #8292a4;\n  padding: 5px;\n}\n.reel-content > small {\n  display: block;\n  margin-top: 55px;\n  color: #e8c579;\n  font-size: 13px;\n  letter-spacing: 5px;\n}\n.reel-content h2 {\n  font-size: clamp(30px, 4.6vw, 60px);\n  line-height: 1.05;\n  max-width: 700px;\n  font-weight: 500;\n  letter-spacing: -1px;\n  margin: 14px 0 20px;\n}\n.reel-content p {\n  font-size: 18px;\n  line-height: 1.6;\n  max-width: 670px;\n  color: #ced8e6;\n}\n.skill {\n  font-size: 10px;\n  color: #e7ca8c;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n.reel-progress {\n  display: flex;\n  gap: 8px;\n  margin-top: 35px;\n}\n.reel-progress button {\n  font-size: 9px;\n  letter-spacing: 2px;\n}\n.reel-progress button[aria-pressed=true] {\n  background: #edc875;\n  color: #07101b;\n}\nvideo {\n  display: block;\n  width: 100%;\n  max-height: 70vh;\n}\n.two-column {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin: 25px 0;\n}\narticle {\n  background: #101b2c;\n  border: 1px solid #2e405b;\n  border-radius: 6px;\n  padding: 24px;\n}\narticle small,\n.chapter-heading small,\n.round-controls small,\n.champion-result small {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #e5c584;\n}\narticle p {\n  color: #b8c9df;\n  line-height: 1.7;\n  font-size: 14px;\n}\narticle h3 {\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.narration {\n  font-size: 16px !important;\n  color: #e6edf8 !important;\n}\na {\n  color: #f0cf88;\n  line-height: 2.3;\n}\n.chapter-heading {\n  padding: 40px;\n  background-size: cover;\n  background-position: 50% 35%;\n  border: 1px solid #75613e;\n  text-align: center;\n  box-shadow: inset 0 0 0 500px rgba(5, 13, 24, 0.7882352941);\n  border-radius: 5px;\n}\n.chapter-heading h1 {\n  font-size: 36px;\n  font-weight: 500;\n  margin: 14px;\n}\n.chapter-heading p {\n  color: #b4c7de;\n}\n.seed-strip {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 8px;\n  margin: 25px 0;\n}\n.seed-strip > div {\n  border-left: 2px solid #c5a765;\n  background: #122039;\n  padding: 13px 10px;\n}\n.seed-strip small {\n  font-size: 8px;\n  letter-spacing: 2px;\n  color: #d9bd85;\n}\n.seed-strip strong {\n  display: block;\n  font-size: 14px;\n  margin: 8px 0;\n  font-weight: 500;\n}\n.seed-strip span {\n  font-size: 9px;\n  color: #acbdd3;\n}\n.callout {\n  border-left: 3px solid #d5b878;\n  padding: 15px 20px;\n  background: #111e31;\n  color: #cddbec;\n  line-height: 1.7;\n}\n.round-controls {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 16px 0;\n}\n.round-controls > div {\n  margin-right: auto;\n}\n.round-controls h1 {\n  font-size: 28px;\n  margin: 7px 0;\n  font-weight: 500;\n}\n.readable-question {\n  font-size: 22px;\n  line-height: 1.6;\n  padding: 22px;\n  border-left: 3px solid #e2c786;\n  background: #101e31;\n}\n.result {\n  border-color: #8b754d;\n}\n.final-scores {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin: 20px 0;\n}\n.final-scores article {\n  flex: 1;\n  text-align: center;\n  min-width: 120px;\n}\n.final-scores h2,\n.final-scores h3 {\n  font-size: 19px;\n  font-weight: 500;\n}\n.final-scores strong {\n  display: block;\n  font-size: 46px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n}\n.final-scores span {\n  display: block;\n  color: #9fb5cf;\n  font-size: 10px;\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n.winning {\n  border-color: #e7c57b;\n  background: #2b251a;\n}\n.champion-result {\n  text-align: center;\n  padding: 30px 20px 10px;\n}\n.champion-result h2 {\n  font-size: 42px;\n  font-weight: 500;\n  color: #efce85;\n}\n.champion-result p {\n  color: #b9c9de;\n  line-height: 1.8;\n  max-width: 700px;\n  margin: auto;\n}\n.rundown {\n  display: flex;\n  gap: 5px;\n  overflow-x: auto;\n  border-top: 1px solid #2e3d53;\n  padding-top: 22px;\n  margin-top: 30px;\n}\n.rundown button {\n  flex: 1;\n  min-width: 95px;\n  text-align: left;\n  font-size: 10px;\n  padding: 12px 10px;\n  background: #0d192b;\n  border-color: #283b54;\n}\n.rundown span {\n  display: block;\n  font-size: 9px;\n  color: #a9bbd2;\n  margin-bottom: 8px;\n}\n.rundown button[aria-current=step] {\n  border-color: #e6c57d;\n  background: #23251f;\n  color: #f5d794;\n}\nfooter {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  justify-content: space-between;\n  padding-top: 20px;\n}\nfooter p {\n  font-size: 10px;\n  line-height: 1.6;\n  color: #a4b7ce;\n  max-width: 750px;\n}\n@media (max-width: 700px) {\n  .showcase {\n    padding: 0 14px 20px;\n  }\n  header {\n    flex-wrap: wrap;\n    padding: 12px 0;\n    min-height: 55px;\n  }\n  header > span {\n    font-size: 8px;\n  }\n  header b {\n    margin-left: 5px;\n  }\n  .opening {\n    aspect-ratio: 4/3;\n  }\n  .opening-overlay {\n    padding: 45px 16px 15px;\n  }\n  .opening-overlay > span {\n    font-size: 7px;\n  }\n  .opening-overlay p {\n    font-size: 14px;\n  }\n  .opening-overlay button {\n    font-size: 10px;\n    padding: 8px 10px;\n  }\n  .pitch,\n  .two-column {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .pitch h1 {\n    font-size: 25px;\n  }\n  .reel-content {\n    padding: 25px 20px;\n  }\n  .reel-tag {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .reel-content p {\n    font-size: 15px;\n  }\n  .seed-strip {\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .round-controls {\n    flex-wrap: wrap;\n  }\n  .round-controls > div {\n    width: 100%;\n  }\n  .chapter-heading {\n    padding: 25px 12px;\n  }\n  .chapter-heading h1 {\n    font-size: 27px;\n  }\n  .champion-result h2 {\n    font-size: 29px;\n  }\n  footer {\n    align-items: flex-start;\n  }\n  .readable-question {\n    font-size: 18px;\n  }\n}\n:host .reel-art {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  animation: recap-pan 4s ease-out both;\n}\n:host .has-art .reel-content {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 16, 26, 0.9333333333) 0%,\n      rgba(6, 16, 26, 0.6) 35%,\n      rgba(6, 16, 26, 0.0823529412) 64%,\n      transparent 85%);\n  padding: 36px 5%;\n}\n:host .has-art .reel-content h2 {\n  max-width: 48%;\n  font-size: clamp(29px, 3.6vw, 50px);\n  text-shadow: 0 2px 18px #000;\n}\n:host .has-art .reel-content p {\n  max-width: 44%;\n  font-size: 16px;\n  text-shadow: 0 2px 10px #000;\n}\n:host .has-art .skill {\n  max-width: 44%;\n  line-height: 1.7;\n}\n@keyframes recap-pan {\n  from {\n    transform: scale(1.035);\n  }\n  to {\n    transform: scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  :host .reel-art {\n    animation: none;\n  }\n}\n@media (max-width: 700px) {\n  :host .reel-art {\n    position: relative;\n    height: 240px;\n    display: block;\n    object-position: right center;\n  }\n  :host .reel-content {\n    min-height: 0;\n  }\n  :host .has-art .reel-content {\n    padding: 22px;\n    background: #081322;\n  }\n  :host .has-art .reel-content h2,\n  :host .has-art .reel-content p,\n  :host .has-art .skill {\n    max-width: 100%;\n  }\n  :host .reel-content > small {\n    margin-top: 25px;\n  }\n}\n.show-header {\n  display: block;\n  position: relative;\n  min-height: 0;\n  padding: 0 0 20px;\n}\n.top-bar {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  min-height: 62px;\n  border-bottom: 1px solid #35435b;\n}\n.top-bar a {\n  text-decoration: none;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.top-bar > span {\n  flex: 1;\n  text-align: center;\n  letter-spacing: 2px;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n.top-bar button {\n  font-size: 11px;\n  white-space: nowrap;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px 0 18px;\n}\n.page-header small {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #edc875;\n}\n.page-header h1 {\n  font-size: 32px;\n  font-weight: 500;\n  letter-spacing: -0.6px;\n  margin: 7px 0;\n}\n.page-header p {\n  font-size: 13px;\n  color: #b6c7dc;\n  margin: 0;\n  line-height: 1.5;\n}\n.playback {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.show-header .rundown {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n.show-header .rundown button {\n  min-height: 50px;\n  white-space: nowrap;\n}\n.header-options {\n  display: flex;\n  gap: 7px;\n  padding-top: 12px;\n  flex-wrap: wrap;\n}\n.header-options button {\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n.header-options [aria-pressed=true] {\n  background: #edc875;\n  color: #07101b;\n  border-color: #edc875;\n}\nmain {\n  scroll-margin-top: 20px;\n}\n.teacher-panel {\n  color: #e8eff9;\n  background: #0d192a;\n  border: 1px solid #ad9257;\n  border-radius: 10px;\n  width: min(660px, 100vw - 48px);\n  max-height: 82vh;\n  padding: 26px;\n  box-sizing: border-box;\n  box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5333333333);\n}\n.teacher-panel::backdrop {\n  background: rgba(2, 8, 18, 0.7490196078);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.teacher-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}\n.teacher-heading small {\n  letter-spacing: 2px;\n  color: #edc875;\n  font-size: 9px;\n}\n.teacher-heading h2 {\n  margin: 7px 0;\n  font-size: 27px;\n  font-weight: 500;\n}\n.teacher-panel p {\n  color: #b9cbe0;\n  font-size: 13px;\n  line-height: 1.7;\n}\n.teacher-panel section {\n  padding-top: 14px;\n  margin-top: 18px;\n  border-top: 1px solid #34465e;\n}\n.teacher-panel h3 {\n  font-size: 16px;\n  font-weight: 500;\n  color: #f2d699;\n}\n.teacher-panel a {\n  display: block;\n  font-size: 13px;\n}\n.teacher-panel .setup-link {\n  background: #25354b;\n  border: 1px solid #526681;\n  border-radius: 4px;\n  padding: 9px 13px;\n  text-decoration: none;\n}\n.teacher-panel button {\n  margin: 4px 6px 4px 0;\n}\n.teacher-cameras {\n  margin-top: 12px;\n}\n.seed-strip {\n  margin-top: 0;\n}\n@media (max-width: 700px) {\n  .top-bar {\n    gap: 10px;\n    min-height: 58px;\n  }\n  .top-bar > span {\n    font-size: 8px;\n    letter-spacing: 0.5px;\n  }\n  .top-bar a {\n    font-size: 10px;\n  }\n  .page-header {\n    display: block;\n    padding: 18px 0 14px;\n  }\n  .page-header h1 {\n    font-size: 26px;\n  }\n  .playback {\n    margin-top: 15px;\n  }\n  .playback button {\n    font-size: 11px;\n    flex: 1;\n    padding-inline: 10px;\n  }\n  .teacher-panel {\n    padding: 18px;\n  }\n  .show-header {\n    padding-bottom: 15px;\n  }\n}\n/*# sourceMappingURL=final-showcase.component.css.map */\n"] }]
  }], () => [], { video: [{ type: ViewChild, args: ["video", { isSignal: true }] }], area: [{ type: ViewChild, args: ["area", { isSignal: true }] }], stage: [{ type: ViewChild, args: [forwardRef(() => TelevisionStageComponent), { isSignal: true }] }], pageTop: [{ type: ViewChild, args: ["pageTop", { isSignal: true }] }], quiz: [{ type: ViewChild, args: [forwardRef(() => QuizBreakComponent), { isSignal: true }] }], teacherPanel: [{ type: ViewChild, args: ["teacherPanel", { isSignal: true }] }], teacherButton: [{ type: ViewChild, args: ["teacherButton", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinalShowcaseComponent, { className: "FinalShowcaseComponent", filePath: "src/app/templates/competition-show/showcase/final-showcase.component.ts", lineNumber: 20 });
})();
export {
  FinalShowcaseComponent
};
//# debugId=ad4d89d1-3038-501e-8838-426e07ea1143
//# sourceMappingURL=chunk-T575HMOS.js.map
