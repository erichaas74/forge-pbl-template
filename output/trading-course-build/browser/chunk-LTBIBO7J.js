import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injectable,
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
  ɵɵgetCurrentView,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
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
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/broadcast/broadcast-audio.ts
var BroadcastAudio = class {
  context;
  playing = /* @__PURE__ */ new Set();
  nodes = /* @__PURE__ */ new Set();
  bed;
  bedTones = [];
  bedGain;
  enabled = false;
  async enable() {
    this.context ??= new AudioContext();
    await this.context.resume();
    this.enabled = true;
  }
  mute() {
    this.enabled = false;
    this.stop();
  }
  stop() {
    for (const audio of this.playing) {
      audio.pause();
      audio.currentTime = 0;
    }
    this.playing.clear();
    this.bed = void 0;
    this.stopBed();
    for (const node of this.nodes) {
      try {
        node.stop();
      } catch {
      }
    }
    this.nodes.clear();
  }
  cue(kind, config) {
    if (!this.enabled) return;
    const src = config.sounds?.[kind];
    if (src) {
      this.play(src);
      return;
    }
    const notes = {
      entrance: [146.83, 220, 293.66, 440],
      question: [110, 164.81, 220, 329.63],
      score: [293.66, 369.99, 440],
      champion: [196, 246.94, 293.66, 392, 493.88, 587.33]
    };
    notes[kind].forEach((frequency, i) => this.tone(frequency, i * 0.16, kind === "champion" ? 1.2 : 0.65));
  }
  tension(config, active) {
    if (!active || !this.enabled) {
      this.stopBed();
      return;
    }
    if (config.sounds?.musicBed) {
      if (!this.bed) this.bed = this.play(config.sounds.musicBed, true);
      return;
    }
    if (this.bedTones.length || !this.context) return;
    const context = this.context;
    this.bedGain = context.createGain();
    this.bedGain.gain.value = 7e-3;
    this.bedGain.connect(context.destination);
    for (const frequency of [110, 164.81, 220.4]) {
      const tone = context.createOscillator();
      tone.frequency.value = frequency;
      tone.type = "sine";
      tone.connect(this.bedGain);
      tone.start();
      this.bedTones.push(tone);
    }
  }
  stopBed() {
    if (this.bed) {
      this.bed.pause();
      this.playing.delete(this.bed);
      this.bed = void 0;
    }
    for (const tone of this.bedTones) {
      tone.stop();
      tone.disconnect();
    }
    this.bedTones = [];
    this.bedGain?.disconnect();
    this.bedGain = void 0;
  }
  play(src, loop = false) {
    const audio = new Audio(src);
    audio.volume = loop ? 0.18 : 0.45;
    audio.loop = loop;
    this.playing.add(audio);
    audio.onended = () => this.playing.delete(audio);
    void audio.play().catch(() => this.playing.delete(audio));
    return audio;
  }
  tone(frequency, delay, duration) {
    const context = this.context;
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    const start = context.currentTime + delay;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.035, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(1e-3, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    this.nodes.add(oscillator);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      this.nodes.delete(oscillator);
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.05);
  }
  dispose() {
    this.mute();
    void this.context?.close();
  }
};

// src/app/templates/competition-show/broadcast/broadcast-director.service.ts
var BroadcastDirectorService = class _BroadcastDirectorService {
  shot = signal(
    "wide",
    ...ngDevMode ? [{ debugName: "shot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teamId = signal(
    null,
    ...ngDevMode ? [{ debugName: "teamId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cue = signal(
    null,
    ...ngDevMode ? [{ debugName: "cue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = signal(
    "idle",
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  automatic = signal(
    true,
    ...ngDevMode ? [{ debugName: "automatic" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reducedMotion = signal(
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches,
    ...ngDevMode ? [{ debugName: "reducedMotion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sound = signal(
    false,
    ...ngDevMode ? [{ debugName: "sound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audioError = signal(
    "",
    ...ngDevMode ? [{ debugName: "audioError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audio = new BroadcastAudio();
  media = typeof matchMedia !== "undefined" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0;
  onMotionChange = (event) => {
    this.reducedMotion.set(event.matches);
    if (event.matches)
      this.finish();
  };
  timers = [];
  complete;
  generation = 0;
  constructor() {
    this.media?.addEventListener("change", this.onMotionChange);
  }
  tension(config, active) {
    this.audio.tension(config, active);
  }
  select(shot, teamId = null) {
    this.cancel();
    this.shot.set(shot);
    this.teamId.set(teamId);
  }
  autoShot(shot, teamId = null) {
    if (this.automatic()) {
      this.shot.set(shot);
      this.teamId.set(teamId);
    }
  }
  run(kind, config, onComplete = () => void 0, teamId = null) {
    this.cancel();
    this.complete = onComplete;
    this.cue.set(kind);
    this.step.set("dim");
    this.audio.cue(kind, config);
    if (this.reducedMotion()) {
      this.autoShot(kind === "question" ? "question" : kind === "champion" ? "winner" : kind === "entrance" ? "matchup" : "wide", teamId);
      this.step.set("reveal");
      this.finish();
      return;
    }
    const generation = this.generation;
    const schedule = (at, action) => this.timers.push(setTimeout(() => {
      if (generation === this.generation)
        action();
    }, at));
    schedule(250, () => {
      this.step.set("travel");
      this.autoShot(kind === "question" ? "question" : kind === "champion" ? "winner" : kind === "entrance" ? "matchup" : "wide", teamId);
    });
    schedule(250 + config.camera.moveMs, () => this.step.set("reveal"));
    schedule(250 + config.camera.moveMs + config.camera.revealMs, () => this.step.set("hold"));
    schedule(400 + config.camera.moveMs + config.camera.revealMs, () => this.finish());
  }
  finish() {
    const complete = this.complete;
    this.complete = void 0;
    this.clearTimers();
    this.cue.set(null);
    this.step.set("idle");
    complete?.();
  }
  cancel() {
    this.complete = void 0;
    this.clearTimers();
    this.cue.set(null);
    this.step.set("idle");
    this.audio.stop();
  }
  clearTimers() {
    this.generation++;
    for (const timer of this.timers)
      clearTimeout(timer);
    this.timers = [];
  }
  async toggleSound() {
    if (this.sound()) {
      this.audio.mute();
      this.sound.set(false);
      return;
    }
    try {
      await this.audio.enable();
      this.sound.set(true);
      this.audioError.set("");
    } catch {
      this.audioError.set("Sound could not start. Visual cues remain available.");
    }
  }
  ngOnDestroy() {
    this.media?.removeEventListener("change", this.onMotionChange);
    this.cancel();
    this.audio.dispose();
  }
  static \u0275fac = function BroadcastDirectorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BroadcastDirectorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BroadcastDirectorService, factory: _BroadcastDirectorService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BroadcastDirectorService, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/templates/competition-show/broadcast/television-stage.component.ts
var _c0 = ["viewport"];
var _c1 = ["frame"];
function TelevisionStageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 18)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", ctx_r0.theme().assets.backdrop ? "url(" + ctx_r0.theme().assets.backdrop + ")" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.unavailable() ? "3D stage unavailable on this device" : "Preparing the studio\u2026");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.unavailable() ? "The bracket, readable prompts, scores, and host controls below still work." : "Lighting the set. Taking our positions.");
  }
}
function TelevisionStageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", ctx_r0.theme().assets.showLogo, \u0275\u0275sanitizeUrl);
  }
}
function TelevisionStageComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cueLabel());
  }
}
function TelevisionStageComponent_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 20)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementStart(7, "b");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const team_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("winner", ctx_r0.view().shot === "winner");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().shot === "winner" ? "YOUR CHAMPIONS" : ctx_r0.view().firstBuzzId === team_r2.id ? "FIRST TO THE BUZZER" : "IN THE SPOTLIGHT");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(team_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SEED ", team_r2.seed, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", team_r2.score, " PTS");
  }
}
function TelevisionStageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TelevisionStageComponent_Conditional_14_Conditional_0_Template, 9, 6, "div", 19);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.selectedTeam()) ? 0 : -1, tmp_3_0);
  }
}
function TelevisionStageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().phase === "setup" ? "WELCOME TO THE FINAL" : "THE STAKES ARE SET");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().roundTitle || "Every team has a story.");
  }
}
function TelevisionStageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().roundTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.view().phase === "paused" ? "PAUSED" : ctx_r0.view().phase === "open" ? ctx_r0.view().seconds + " SEC" : "ANSWERS LOCKED");
  }
}
function TelevisionStageComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Champion: ", ctx_r0.selectedTeam()?.name, " ");
  }
}
function TelevisionStageComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.warning());
  }
}
function TelevisionStageComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.director.audioError());
  }
}
var TelevisionStageComponent = class _TelevisionStageComponent {
  view = input.required(
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theme = input.required(
    ...ngDevMode ? [{ debugName: "theme" }] : (
      /* istanbul ignore next */
      []
    )
  );
  presentation = input(
    false,
    ...ngDevMode ? [{ debugName: "presentation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  director = inject(BroadcastDirectorService);
  viewport = viewChild(
    "viewport",
    ...ngDevMode ? [{ debugName: "viewport" }] : (
      /* istanbul ignore next */
      []
    )
  );
  frame = viewChild(
    "frame",
    ...ngDevMode ? [{ debugName: "frame" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ready = signal(
    false,
    ...ngDevMode ? [{ debugName: "ready" }] : (
      /* istanbul ignore next */
      []
    )
  );
  unavailable = signal(
    false,
    ...ngDevMode ? [{ debugName: "unavailable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  warning = signal(
    "",
    ...ngDevMode ? [{ debugName: "warning" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedTeam = computed(
    () => this.view().teams.find((t) => t.id === (this.view().teamId ?? this.view().winnerId)),
    ...ngDevMode ? [{ debugName: "selectedTeam" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cueLabel = computed(
    () => ({ entrance: "TEAMS, TAKE YOUR PLACES", question: "YOUR NEXT QUESTION", score: "THE SCORES ARE IN", champion: "A CHAMPIONSHIP PERFORMANCE" })[this.director.cue() ?? "question"],
    ...ngDevMode ? [{ debugName: "cueLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene;
  dead = false;
  generation = 0;
  mounted = signal(
    false,
    ...ngDevMode ? [{ debugName: "mounted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    afterNextRender(() => this.mounted.set(true));
    effect(() => {
      const theme = this.theme();
      if (this.mounted())
        void this.mount(theme);
    });
    effect(() => {
      const view = this.view();
      const reduced = this.director.reducedMotion();
      if (this.ready())
        this.scene?.update(view, reduced);
    });
  }
  async mount(theme) {
    const generation = ++this.generation;
    this.scene?.dispose();
    this.scene = void 0;
    this.ready.set(false);
    this.warning.set("");
    this.unavailable.set(false);
    if (typeof WebGL2RenderingContext === "undefined") {
      this.unavailable.set(true);
      return;
    }
    try {
      const { StudioScene } = await import("./chunk-HKV4UWY5.js");
      if (this.dead || generation !== this.generation)
        return;
      this.scene = new StudioScene(this.viewport().nativeElement, theme, (message) => this.warning.set(message));
      this.scene.update(this.view(), this.director.reducedMotion());
      this.ready.set(true);
    } catch {
      if (!this.dead && generation === this.generation) {
        this.unavailable.set(true);
        this.warning.set("The 3D studio could not start. Host controls and readable game content remain available.");
      }
    }
  }
  focusStage() {
    this.frame()?.nativeElement.scrollIntoView?.({ block: "nearest", behavior: this.director.reducedMotion() ? "instant" : "smooth" });
    this.frame()?.nativeElement.focus({ preventScroll: true });
  }
  async fullscreen() {
    try {
      if (document.fullscreenElement)
        await document.exitFullscreen();
      else
        await this.frame()?.nativeElement.requestFullscreen();
    } catch {
      this.warning.set("Full screen is unavailable in this browser. Presentation view still works.");
    }
  }
  ngOnDestroy() {
    this.dead = true;
    this.generation++;
    this.scene?.dispose();
  }
  static \u0275fac = function TelevisionStageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TelevisionStageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TelevisionStageComponent, selectors: [["app-television-stage"]], viewQuery: function TelevisionStageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.viewport, _c0, 5)(ctx.frame, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { view: [1, "view"], theme: [1, "theme"], presentation: [1, "presentation"] }, decls: 25, vars: 22, consts: [["frame", ""], ["viewport", ""], ["tabindex", "-1", "aria-label", "Championship television stage", 1, "tv-frame"], ["aria-hidden", "true", 1, "viewport"], [1, "stage-fallback", 3, "background-image"], [1, "broadcast-bug"], [1, "live-dot"], [1, "hd"], [1, "show-brand"], ["alt", "", 3, "src"], ["role", "status", 1, "cue-caption"], [1, "lower-third", "intro"], [1, "round-strip"], ["aria-hidden", "true", 1, "safe-frame"], [1, "fullscreen", 3, "click"], ["aria-live", "polite", 1, "sr-only"], ["role", "status", 1, "asset-warning"], [1, "asset-warning"], [1, "stage-fallback"], [1, "lower-third", 3, "winner"], [1, "lower-third"]], template: function TelevisionStageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 2, 0);
      \u0275\u0275domElement(2, "div", 3, 1);
      \u0275\u0275conditionalCreate(4, TelevisionStageComponent_Conditional_4_Template, 7, 5, "div", 4);
      \u0275\u0275domElementStart(5, "div", 5);
      \u0275\u0275domElement(6, "span", 6);
      \u0275\u0275text(7, " REHEARSAL ");
      \u0275\u0275domElementStart(8, "span", 7);
      \u0275\u0275text(9, "HD");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(10, "div", 8);
      \u0275\u0275conditionalCreate(11, TelevisionStageComponent_Conditional_11_Template, 1, 1, "img", 9);
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(13, TelevisionStageComponent_Conditional_13_Template, 2, 1, "div", 10);
      \u0275\u0275conditionalCreate(14, TelevisionStageComponent_Conditional_14_Template, 1, 1)(15, TelevisionStageComponent_Conditional_15_Template, 5, 2, "div", 11);
      \u0275\u0275conditionalCreate(16, TelevisionStageComponent_Conditional_16_Template, 5, 2, "div", 12);
      \u0275\u0275domElement(17, "div", 13);
      \u0275\u0275domElementStart(18, "button", 14);
      \u0275\u0275domListener("click", function TelevisionStageComponent_Template_button_click_18_listener() {
        return ctx.fullscreen();
      });
      \u0275\u0275text(19, "Full screen");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(20, "div", 15);
      \u0275\u0275text(21);
      \u0275\u0275conditionalCreate(22, TelevisionStageComponent_Conditional_22_Template, 1, 1);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(23, TelevisionStageComponent_Conditional_23_Template, 2, 1, "p", 16);
      \u0275\u0275conditionalCreate(24, TelevisionStageComponent_Conditional_24_Template, 2, 1, "p", 17);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--%NS%broadcast-accent", ctx.theme().palette.accent);
      \u0275\u0275classProp("projector", ctx.presentation())("cue-active", ctx.director.cue() !== null)("question-cue", ctx.director.cue() === "question")("reduced", ctx.director.reducedMotion());
      \u0275\u0275attribute("data-shot", ctx.view().shot)("data-cue", ctx.director.cue());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.ready() || ctx.unavailable() ? 4 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.theme().assets.showLogo ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.view().title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.director.cue() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view().shot === "team" || ctx.view().shot === "winner" ? 14 : !ctx.view().prompt && !ctx.director.cue() ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.view().prompt && !ctx.director.cue() ? 16 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.view().prompt || ctx.view().title, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.view().winnerId ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.warning() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.director.audioError() ? 24 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.tv-frame[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(100%, 131.5555555556vh);\n  margin-inline: auto;\n  box-sizing: border-box;\n  aspect-ratio: 16/9;\n  overflow: hidden;\n  isolation: isolate;\n  background: #050b18;\n  border: 1px solid #344157;\n  border-radius: 5px;\n  color: #fff;\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3333333333);\n}\n.viewport[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.viewport[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(canvas) {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.tv-frame.projector[_ngcontent-%COMP%] {\n  width: min(100%, 156.4444444444vh);\n}\n.tv-frame[_ngcontent-%COMP%]:fullscreen {\n  max-height: none;\n  width: 100vw;\n  height: 100vh;\n  border: 0;\n  border-radius: 0;\n}\n.broadcast-bug[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 3%;\n  top: 5%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font: 600 10px/1 Arial, sans-serif;\n  letter-spacing: 1.8px;\n  text-shadow: 0 1px 4px #000;\n}\n.live-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--%NS%broadcast-accent);\n  box-shadow: 0 0 8px var(--%NS%broadcast-accent);\n}\n.hd[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.3960784314);\n  padding: 4px;\n  font-size: 8px;\n  letter-spacing: 0.5px;\n  margin-left: 8px;\n}\n.show-brand[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 3%;\n  top: 5%;\n  max-width: 45%;\n  font: 500 10px/1.4 Arial, sans-serif;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.show-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 25px;\n  object-fit: contain;\n}\n.lower-third[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 9%;\n  left: 5%;\n  min-width: 240px;\n  max-width: 65%;\n  padding: 15px 28px 17px;\n  border-left: 4px solid var(--%NS%broadcast-accent);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(5, 13, 28, 0.9294117647),\n      rgba(5, 13, 28, 0.7294117647) 80%,\n      transparent);\n  animation: _ngcontent-%COMP%_lower-in 0.7s both;\n}\n.lower-third[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%broadcast-accent);\n  font-size: 9px;\n  letter-spacing: 2px;\n  font-weight: 700;\n}\n.lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: clamp(19px, 2.9vw, 40px);\n  font-weight: 500;\n  letter-spacing: -0.6px;\n  margin: 6px 0;\n}\n.lower-third[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  color: #d4dfef;\n}\n.lower-third[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  margin-left: 24px;\n  color: white;\n}\n.lower-third.winner[_ngcontent-%COMP%] {\n  border-left-width: 7px;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(52, 41, 24, 0.9333333333),\n      rgba(8, 14, 26, 0.8156862745),\n      transparent);\n}\n.lower-third.intro[_ngcontent-%COMP%] {\n  opacity: 0.94;\n}\n.lower-third.intro[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: clamp(16px, 2vw, 27px);\n}\n.round-strip[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 5%;\n  right: 5%;\n  bottom: 5%;\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 10px 16px;\n  background: rgba(5, 13, 28, 0.9098039216);\n  border-top: 1px solid var(--%NS%broadcast-accent);\n  font-size: 11px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.round-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent);\n  font-variant-numeric: tabular-nums;\n}\n.cue-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: auto 0 14%;\n  text-align: center;\n  color: var(--%NS%broadcast-accent);\n  font-size: clamp(12px, 1.4vw, 18px);\n  letter-spacing: 5px;\n  text-shadow: 0 2px 12px #000;\n  animation: _ngcontent-%COMP%_cue-in 0.5s both;\n}\n.safe-frame[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 3%;\n  border: 1px solid rgba(255, 255, 255, 0.0274509804);\n  pointer-events: none;\n}\n.fullscreen[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 2%;\n  bottom: 2%;\n  padding: 7px 10px;\n  color: #d2dfef;\n  background: rgba(6, 13, 25, 0.8509803922);\n  border: 1px solid #74859a;\n  border-radius: 3px;\n  font-size: 10px;\n  cursor: pointer;\n  min-height: 32px;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #fff;\n  outline-offset: 3px;\n}\n.asset-warning[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #f7d298;\n}\n.stage-fallback[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n  text-align: center;\n  background-size: cover;\n  background-position: center;\n}\n.stage-fallback[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.stage-fallback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #ccd6e5;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n@keyframes _ngcontent-%COMP%_lower-in {\n  from {\n    opacity: 0;\n    transform: translateX(-25px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_cue-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.reduced[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  animation: none !important;\n  transition: none !important;\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n@media (max-width: 700px) {\n  .lower-third[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n    left: 3%;\n    min-width: 160px;\n  }\n  .lower-third[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .broadcast-bug[_ngcontent-%COMP%], \n   .show-brand[_ngcontent-%COMP%] {\n    font-size: 7px;\n    letter-spacing: 0.5px;\n  }\n  .hd[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .round-strip[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .tv-frame[_ngcontent-%COMP%] {\n    aspect-ratio: 4/3;\n  }\n}\n/*# sourceMappingURL=television-stage.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TelevisionStageComponent, [{
    type: Component,
    args: [{ selector: "app-television-stage", standalone: true, template: `
    <section #frame class="tv-frame" [class.projector]="presentation()" [style.--broadcast-accent]="theme().palette.accent"
      [class.cue-active]="director.cue() !== null" [class.question-cue]="director.cue() === 'question'"
      [class.reduced]="director.reducedMotion()" [attr.data-shot]="view().shot" [attr.data-cue]="director.cue()" tabindex="-1" aria-label="Championship television stage">
      <div #viewport class="viewport" aria-hidden="true"></div>
      @if (!ready() || unavailable()) {
        <div class="stage-fallback" [style.background-image]="theme().assets.backdrop ? 'url(' + theme().assets.backdrop + ')' : null">
          <p>{{ unavailable() ? '3D stage unavailable on this device' : 'Preparing the studio\u2026' }}</p>
          <h2>{{ view().title }}</h2><p>{{ unavailable() ? 'The bracket, readable prompts, scores, and host controls below still work.' : 'Lighting the set. Taking our positions.' }}</p>
        </div>
      }
      <div class="broadcast-bug"><span class="live-dot"></span> REHEARSAL <span class="hd">HD</span></div>
      <div class="show-brand">@if (theme().assets.showLogo) { <img [src]="theme().assets.showLogo" alt="" /> } {{ view().title }}</div>
      @if (director.cue()) {
        <div class="cue-caption" role="status">{{ cueLabel() }}</div>
      }
      @if (view().shot === 'team' || view().shot === 'winner') {
        @if (selectedTeam(); as team) {
          <div class="lower-third" [class.winner]="view().shot === 'winner'"><span>{{ view().shot === 'winner' ? 'YOUR CHAMPIONS' : view().firstBuzzId === team.id ? 'FIRST TO THE BUZZER' : 'IN THE SPOTLIGHT' }}</span>
            <strong>{{ team.name }}</strong><small>SEED {{ team.seed }} <b>{{ team.score }} PTS</b></small></div>
        }
      } @else if (!view().prompt && !director.cue()) {
        <div class="lower-third intro"><span>{{ view().phase === 'setup' ? 'WELCOME TO THE FINAL' : 'THE STAKES ARE SET' }}</span><strong>{{ view().roundTitle || 'Every team has a story.' }}</strong></div>
      }
      @if (view().prompt && !director.cue()) {
        <div class="round-strip"><span>{{ view().roundTitle }}</span><strong>{{ view().phase === 'paused' ? 'PAUSED' : view().phase === 'open' ? view().seconds + ' SEC' : 'ANSWERS LOCKED' }}</strong></div>
      }
      <div class="safe-frame" aria-hidden="true"></div>
      <button class="fullscreen" (click)="fullscreen()">Full screen</button>
      <div class="sr-only" aria-live="polite">{{ view().prompt || view().title }} @if (view().winnerId) { Champion: {{ selectedTeam()?.name }} }</div>
    </section>
    @if (warning()) { <p class="asset-warning" role="status">{{ warning() }}</p> }
    @if (director.audioError()) { <p class="asset-warning">{{ director.audioError() }}</p> }
  `, styles: ["/* src/app/templates/competition-show/broadcast/television-stage.component.scss */\n:host {\n  display: block;\n}\n.tv-frame {\n  position: relative;\n  width: min(100%, 131.5555555556vh);\n  margin-inline: auto;\n  box-sizing: border-box;\n  aspect-ratio: 16/9;\n  overflow: hidden;\n  isolation: isolate;\n  background: #050b18;\n  border: 1px solid #344157;\n  border-radius: 5px;\n  color: #fff;\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3333333333);\n}\n.viewport {\n  position: absolute;\n  inset: 0;\n}\n.viewport :global(canvas) {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.tv-frame.projector {\n  width: min(100%, 156.4444444444vh);\n}\n.tv-frame:fullscreen {\n  max-height: none;\n  width: 100vw;\n  height: 100vh;\n  border: 0;\n  border-radius: 0;\n}\n.broadcast-bug {\n  position: absolute;\n  left: 3%;\n  top: 5%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font: 600 10px/1 Arial, sans-serif;\n  letter-spacing: 1.8px;\n  text-shadow: 0 1px 4px #000;\n}\n.live-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--broadcast-accent);\n  box-shadow: 0 0 8px var(--broadcast-accent);\n}\n.hd {\n  border: 1px solid rgba(255, 255, 255, 0.3960784314);\n  padding: 4px;\n  font-size: 8px;\n  letter-spacing: 0.5px;\n  margin-left: 8px;\n}\n.show-brand {\n  position: absolute;\n  right: 3%;\n  top: 5%;\n  max-width: 45%;\n  font: 500 10px/1.4 Arial, sans-serif;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.show-brand img {\n  width: 38px;\n  height: 25px;\n  object-fit: contain;\n}\n.lower-third {\n  position: absolute;\n  bottom: 9%;\n  left: 5%;\n  min-width: 240px;\n  max-width: 65%;\n  padding: 15px 28px 17px;\n  border-left: 4px solid var(--broadcast-accent);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(5, 13, 28, 0.9294117647),\n      rgba(5, 13, 28, 0.7294117647) 80%,\n      transparent);\n  animation: lower-in 0.7s both;\n}\n.lower-third span {\n  display: block;\n  color: var(--broadcast-accent);\n  font-size: 9px;\n  letter-spacing: 2px;\n  font-weight: 700;\n}\n.lower-third strong {\n  display: block;\n  font-size: clamp(19px, 2.9vw, 40px);\n  font-weight: 500;\n  letter-spacing: -0.6px;\n  margin: 6px 0;\n}\n.lower-third small {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  color: #d4dfef;\n}\n.lower-third b {\n  margin-left: 24px;\n  color: white;\n}\n.lower-third.winner {\n  border-left-width: 7px;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(52, 41, 24, 0.9333333333),\n      rgba(8, 14, 26, 0.8156862745),\n      transparent);\n}\n.lower-third.intro {\n  opacity: 0.94;\n}\n.lower-third.intro strong {\n  font-size: clamp(16px, 2vw, 27px);\n}\n.round-strip {\n  position: absolute;\n  left: 5%;\n  right: 5%;\n  bottom: 5%;\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 10px 16px;\n  background: rgba(5, 13, 28, 0.9098039216);\n  border-top: 1px solid var(--broadcast-accent);\n  font-size: 11px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.round-strip strong {\n  color: var(--broadcast-accent);\n  font-variant-numeric: tabular-nums;\n}\n.cue-caption {\n  position: absolute;\n  inset: auto 0 14%;\n  text-align: center;\n  color: var(--broadcast-accent);\n  font-size: clamp(12px, 1.4vw, 18px);\n  letter-spacing: 5px;\n  text-shadow: 0 2px 12px #000;\n  animation: cue-in 0.5s both;\n}\n.safe-frame {\n  position: absolute;\n  inset: 3%;\n  border: 1px solid rgba(255, 255, 255, 0.0274509804);\n  pointer-events: none;\n}\n.fullscreen {\n  position: absolute;\n  right: 2%;\n  bottom: 2%;\n  padding: 7px 10px;\n  color: #d2dfef;\n  background: rgba(6, 13, 25, 0.8509803922);\n  border: 1px solid #74859a;\n  border-radius: 3px;\n  font-size: 10px;\n  cursor: pointer;\n  min-height: 32px;\n}\nbutton:focus-visible {\n  outline: 2px solid #fff;\n  outline-offset: 3px;\n}\n.asset-warning {\n  font-size: 12px;\n  color: #f7d298;\n}\n.stage-fallback {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n  text-align: center;\n  background-size: cover;\n  background-position: center;\n}\n.stage-fallback h2 {\n  font-size: 2rem;\n}\n.stage-fallback p {\n  color: #ccd6e5;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n@keyframes lower-in {\n  from {\n    opacity: 0;\n    transform: translateX(-25px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes cue-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.reduced * {\n  animation: none !important;\n  transition: none !important;\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n@media (max-width: 700px) {\n  .lower-third {\n    padding: 10px 14px;\n    left: 3%;\n    min-width: 160px;\n  }\n  .lower-third strong {\n    font-size: 18px;\n  }\n  .broadcast-bug,\n  .show-brand {\n    font-size: 7px;\n    letter-spacing: 0.5px;\n  }\n  .hd {\n    display: none;\n  }\n  .round-strip {\n    font-size: 9px;\n  }\n  .tv-frame {\n    aspect-ratio: 4/3;\n  }\n}\n/*# sourceMappingURL=television-stage.component.css.map */\n"] }]
  }], () => [], { view: [{ type: Input, args: [{ isSignal: true, alias: "view", required: true }] }], theme: [{ type: Input, args: [{ isSignal: true, alias: "theme", required: true }] }], presentation: [{ type: Input, args: [{ isSignal: true, alias: "presentation", required: false }] }], viewport: [{ type: ViewChild, args: ["viewport", { isSignal: true }] }], frame: [{ type: ViewChild, args: ["frame", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TelevisionStageComponent, { className: "TelevisionStageComponent", filePath: "src/app/templates/competition-show/broadcast/television-stage.component.ts", lineNumber: 44 });
})();

// src/app/templates/competition-show/broadcast/studio-projection.ts
function studioProjection(config, state, theme, shot, teamId, cue, step, seconds) {
  const round = config.rounds[state.roundIndex];
  const isContest = !["setup", "bracket"].includes(state.phase);
  const teamIds = isContest && state.participants.length ? state.participants : state.teams.map((t) => t.id);
  const canRead = ["open", "paused", "locked", "revealed"].includes(state.phase) || cue === "question" && ["reveal", "hold"].includes(step);
  const awarding = state.phase === "revealed";
  return {
    title: config.title,
    phase: state.phase,
    roundTitle: isContest ? round.title : "",
    prompt: canRead ? round.prompt : "",
    seconds,
    winnerId: state.championId,
    firstBuzzId: state.buzzes[0] ?? null,
    shot,
    teamId,
    cue,
    step,
    awarding,
    teams: teamIds.map((id) => {
      const index = state.teams.findIndex((t) => t.id === id);
      const team = state.teams[index];
      return __spreadValues({
        id,
        name: team.name,
        score: isContest ? state.scores[id] ?? 0 : 0,
        seed: index + 1,
        color: theme.palette.teamColors[index % theme.palette.teamColors.length],
        emblem: theme.teamEmblems?.[id],
        // Whether a team has answered, never what it wrote.
        answered: state.responses.some((r) => r.teamId === id)
      }, verdictFor(state, round, id, awarding));
    })
  };
}
function verdictFor(state, round, id, awarding) {
  if (!awarding) return { award: null, verdict: null };
  const response = state.responses.find((r) => r.teamId === id);
  if (!response || response.points === null) {
    return { award: round.kind === "wager" ? -(state.wagers[id] ?? 0) : 0, verdict: "miss" };
  }
  return { award: response.points, verdict: response.points > 0 ? "correct" : "miss" };
}

// src/app/templates/competition-show/ui/competition-bracket.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CompetitionBracketComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path");
  }
  if (rf & 2) {
    const line_r1 = ctx.$implicit;
    \u0275\u0275classProp("decided", line_r1.complete);
    \u0275\u0275attribute("d", line_r1.path);
  }
}
function CompetitionBracketComponent_For_6_For_4_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p")(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 10);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const id_r2 = ctx.$implicit;
    const match_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("winner", match_r3.winnerId === id_r2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.seed(id_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.name(id_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.score(match_r3, id_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.winnerId === id_r2 ? "\u2713" : "");
  }
}
function CompetitionBracketComponent_For_6_For_4_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Winners of ", match_r3.sources.join(" + "));
  }
}
function CompetitionBracketComponent_For_6_For_4_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 11);
    \u0275\u0275domListener("click", function CompetitionBracketComponent_For_6_For_4_Conditional_0_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const match_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.start.emit(match_r3.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Run ", ctx_r3.name(match_r3.teamIds[0]), " vs ", ctx_r3.name(match_r3.teamIds[1]));
  }
}
function CompetitionBracketComponent_For_6_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, CompetitionBracketComponent_For_6_For_4_Conditional_0_For_4_Template, 9, 6, "p", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(5, CompetitionBracketComponent_For_6_For_4_Conditional_0_Conditional_5_Template, 2, 1, "p");
    \u0275\u0275conditionalCreate(6, CompetitionBracketComponent_For_6_For_4_Conditional_0_Conditional_6_Template, 2, 2, "button");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const match_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("top", ctx_r3.center(match_r3) - 63, "px");
    \u0275\u0275classProp("complete", match_r3.status === "complete")("live", match_r3.status === "live");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(match_r3.bye ? "BYE \xB7 ADVANCES" : match_r3.status === "live" ? "ON STAGE" : match_r3.status === "complete" ? "FINAL SCORE" : "MATCH " + (match_r3.position + 1));
    \u0275\u0275advance();
    \u0275\u0275repeater(match_r3.teamIds);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!match_r3.teamIds.length ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.canStart() && match_r3.status === "ready" ? 6 : -1);
  }
}
function CompetitionBracketComponent_For_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CompetitionBracketComponent_For_6_For_4_Conditional_0_Template, 7, 9, "article", 6);
  }
  if (rf & 2) {
    const match_r3 = ctx.$implicit;
    const round_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(match_r3.round === round_r6 ? 0 : -1);
  }
}
function CompetitionBracketComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(3, CompetitionBracketComponent_For_6_For_4_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const round_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", round_r6 * 320, "px");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.roundName(round_r6));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.matches());
  }
}
function CompetitionBracketComponent_Conditional_7_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 16)(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const slot_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("qualified", slot_r7.teamId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slot_r7.teamId ? "\u2605" : "\u25C7");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slot_r7.teamId ? ctx_r3.name(slot_r7.teamId) : slot_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slot_r7.teamId ? "QUALIFIED" : "PLACE TO BE WON");
  }
}
function CompetitionBracketComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 12)(1, "div", 13)(2, "span");
    \u0275\u0275text(3, "THE CHAMPIONSHIP SHOW");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "The final stage");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(6, CompetitionBracketComponent_Conditional_7_For_7_Template, 7, 5, "p", 14, _forTrack0);
    \u0275\u0275domElementStart(8, "div", 15);
    \u0275\u0275text(9, "ONE STAGE. ONE CHAMPION.");
    \u0275\u0275domElementStart(10, "span");
    \u0275\u0275text(11, "Every finalist starts with a fresh scoreboard.");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", ctx_r3.finalLeft(), "px")("top", ctx_r3.height() / 2 - 170, "px");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.finalists());
  }
}
var CompetitionBracketComponent = class _CompetitionBracketComponent {
  matches = input.required(
    ...ngDevMode ? [{ debugName: "matches" }] : (
      /* istanbul ignore next */
      []
    )
  );
  teams = input.required(
    ...ngDevMode ? [{ debugName: "teams" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hybrid = input(
    false,
    ...ngDevMode ? [{ debugName: "hybrid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canStart = input(
    false,
    ...ngDevMode ? [{ debugName: "canStart" }] : (
      /* istanbul ignore next */
      []
    )
  );
  start = output();
  rounds = computed(
    () => [...new Set(this.matches().map((m) => m.round))],
    ...ngDevMode ? [{ debugName: "rounds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalLeft = computed(
    () => this.rounds().length * 320 + 70,
    ...ngDevMode ? [{ debugName: "finalLeft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  width = computed(
    () => this.hybrid() ? this.finalLeft() + 400 : this.rounds().length * 320,
    ...ngDevMode ? [{ debugName: "width" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastMatches = computed(
    () => this.matches().filter((m) => m.round === this.rounds().at(-1)).sort((a, b) => a.position - b.position),
    ...ngDevMode ? [{ debugName: "lastMatches" }] : (
      /* istanbul ignore next */
      []
    )
  );
  finalists = computed(
    () => this.lastMatches().length ? this.lastMatches().map((m) => ({ id: m.id, teamId: m.winnerId, label: `Winner of match ${m.position + 1}` })) : this.teams().map((t) => ({ id: t.id, teamId: t.id, label: t.name })),
    ...ngDevMode ? [{ debugName: "finalists" }] : (
      /* istanbul ignore next */
      []
    )
  );
  height = computed(
    () => Math.max(this.hybrid() ? 430 : 210, this.matches().filter((m) => m.round === 0).length * 190 + 50),
    ...ngDevMode ? [{ debugName: "height" }] : (
      /* istanbul ignore next */
      []
    )
  );
  connections = computed(
    () => this.matches().flatMap((match) => {
      const next = this.matches().find((m) => m.sources.includes(match.id));
      if (!next) {
        if (!this.hybrid())
          return [];
        const x2 = match.round * 320 + 260;
        const finalY = this.height() / 2 - 70 + this.lastMatches().findIndex((m) => m.id === match.id) * 60;
        return [{ id: match.id, complete: match.status === "complete", path: `M ${x2} ${this.center(match)} H ${x2 + 55} V ${finalY} H ${this.finalLeft()}` }];
      }
      const x = match.round * 320 + 260;
      const y = this.center(match);
      const nextY = this.center(next);
      return [{ id: match.id, complete: match.status === "complete", path: `M ${x} ${y} H ${x + 30} V ${nextY} H ${x + 60}` }];
    }),
    ...ngDevMode ? [{ debugName: "connections" }] : (
      /* istanbul ignore next */
      []
    )
  );
  center(match) {
    return 50 + (match.position + 0.5) * 2 ** match.round * 190;
  }
  score(match, id) {
    return match.scores[id] ?? "\u2014";
  }
  name(id) {
    return this.teams().find((t) => t.id === id)?.name ?? id;
  }
  seed(id) {
    return this.teams().findIndex((t) => t.id === id) + 1;
  }
  roundName(round) {
    const remaining = this.rounds().length - round;
    return this.hybrid() ? remaining === 1 ? "Win a place in the final show" : "Round of 16" : { 1: "Championship", 2: "Semifinals", 3: "Quarterfinals", 4: "Round of 16" }[remaining] ?? "Bracket";
  }
  static \u0275fac = function CompetitionBracketComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompetitionBracketComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompetitionBracketComponent, selectors: [["app-competition-bracket"]], inputs: { matches: [1, "matches"], teams: [1, "teams"], hybrid: [1, "hybrid"], canStart: [1, "canStart"] }, outputs: { start: "start" }, decls: 8, vars: 7, consts: [["tabindex", "0", "aria-label", "Championship bracket; scroll horizontally for later rounds", 1, "bracket-scroll"], [1, "bracket"], ["aria-hidden", "true", 1, "connections"], [3, "decided"], [3, "left"], [1, "final-stage", 3, "left", "top"], [3, "top", "complete", "live"], [3, "winner"], [1, "seed"], [1, "team-name"], [1, "check"], [3, "click"], [1, "final-stage"], [1, "final-title"], [1, "finalist", 3, "qualified"], [1, "final-signoff"], [1, "finalist"], [1, "star"]], template: function CompetitionBracketComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(2, "svg", 2);
      \u0275\u0275repeaterCreate(3, CompetitionBracketComponent_For_4_Template, 1, 3, ":svg:path", 3, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(5, CompetitionBracketComponent_For_6_Template, 5, 3, "section", 4, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(7, CompetitionBracketComponent_Conditional_7_Template, 12, 4, "section", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleProp("width", ctx.width(), "px")("height", ctx.height(), "px");
      \u0275\u0275advance();
      \u0275\u0275attribute("width", ctx.width())("height", ctx.height());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.connections());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.rounds());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hybrid() ? 7 : -1);
    }
  }, styles: ["\n.bracket-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding-bottom: 1rem;\n  outline-offset: 3px;\n}\n.bracket[_ngcontent-%COMP%] {\n  position: relative;\n  margin-inline: auto;\n}\n.connections[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\npath[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #45566f;\n  stroke-width: 1.5;\n}\npath.decided[_ngcontent-%COMP%] {\n  stroke: var(--%NS%broadcast-accent, #edc875);\n}\nsection[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  width: 260px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--%NS%broadcast-accent, #edc875);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  font-weight: 500;\n  margin: 0;\n  min-height: 35px;\n  max-width: 250px;\n}\narticle[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  width: 260px;\n  box-sizing: border-box;\n  border: 1px solid #394b65;\n  border-radius: 4px;\n  background: #101d30;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_enter 0.6s both;\n}\narticle.complete[_ngcontent-%COMP%] {\n  border-color: #847449;\n}\narticle.live[_ngcontent-%COMP%] {\n  border-color: var(--%NS%broadcast-accent, #edc875);\n  box-shadow: 0 0 24px rgba(226, 184, 98, 0.1333333333);\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 8px;\n  letter-spacing: 1.5px;\n  color: #8fa5bf;\n  background: #0b1525;\n  padding: 9px 12px;\n}\np[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 0;\n  padding: 10px 12px;\n  color: #c9d7e9;\n  font-size: 12px;\n  border-top: 1px solid #263750;\n}\n.team-name[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-wrap: anywhere;\n}\n.seed[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #899db6;\n  min-width: 14px;\n}\nstrong[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n}\n.check[_ngcontent-%COMP%] {\n  width: 9px;\n  color: var(--%NS%broadcast-accent, #edc875);\n}\np.winner[_ngcontent-%COMP%] {\n  background: rgba(170, 135, 71, 0.0784313725);\n  color: white;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 0;\n  border-top: 1px solid #47516b;\n  background: #1c2b40;\n  color: var(--%NS%broadcast-accent, #edc875);\n  width: 100%;\n  min-height: 44px;\n  padding: 9px 12px;\n  font-size: 10px;\n  cursor: pointer;\n  text-align: left;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #293a51;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid white;\n  outline-offset: -3px;\n}\n.final-stage[_ngcontent-%COMP%] {\n  width: 400px;\n  border: 1px solid #9a804b;\n  background:\n    radial-gradient(\n      ellipse at top,\n      #354059,\n      #0b1525 65%);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2666666667);\n  border-radius: 6px;\n  overflow: hidden;\n}\n.final-title[_ngcontent-%COMP%] {\n  height: 70px;\n  box-sizing: border-box;\n  padding: 16px 22px;\n}\n.final-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 2px;\n  color: #aabaCF;\n}\n.final-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  letter-spacing: 0;\n  text-transform: none;\n  margin: 6px 0;\n  max-width: none;\n}\n.finalist[_ngcontent-%COMP%] {\n  height: 60px;\n  box-sizing: border-box;\n  padding: 12px 20px;\n  gap: 14px;\n}\n.finalist[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 18px;\n}\n.finalist[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  background: none;\n  padding: 0;\n  font-size: 7px;\n  letter-spacing: 1px;\n}\n.star[_ngcontent-%COMP%] {\n  color: var(--%NS%broadcast-accent, #edc875);\n  font-size: 20px;\n}\n.qualified[_ngcontent-%COMP%] {\n  background: rgba(196, 163, 96, 0.0549019608);\n  animation: _ngcontent-%COMP%_enter 0.7s both;\n}\n.final-signoff[_ngcontent-%COMP%] {\n  padding: 20px 22px;\n  color: var(--%NS%broadcast-accent, #edc875);\n  font-size: 10px;\n  letter-spacing: 2px;\n  border-top: 1px solid #76643f;\n}\n.final-signoff[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #aabbd2;\n  letter-spacing: 0;\n  font-size: 10px;\n  margin-top: 8px;\n}\n@keyframes _ngcontent-%COMP%_enter {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  article[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=competition-bracket.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompetitionBracketComponent, [{
    type: Component,
    args: [{ selector: "app-competition-bracket", standalone: true, template: `
    <div class="bracket-scroll" tabindex="0" aria-label="Championship bracket; scroll horizontally for later rounds">
    <div class="bracket" [style.width.px]="width()" [style.height.px]="height()">
      <svg aria-hidden="true" class="connections" [attr.width]="width()" [attr.height]="height()">
        @for (line of connections(); track line.id) { <path [attr.d]="line.path" [class.decided]="line.complete" /> }
      </svg>
      @for (round of rounds(); track round) {
        <section [style.left.px]="round * 320"><h3>{{ roundName(round) }}</h3>
          @for (match of matches(); track match.id) {
            @if (match.round === round) {
              <article [style.top.px]="center(match) - 63" [class.complete]="match.status === 'complete'" [class.live]="match.status === 'live'">
                <small>{{ match.bye ? 'BYE \xB7 ADVANCES' : match.status === 'live' ? 'ON STAGE' : match.status === 'complete' ? 'FINAL SCORE' : 'MATCH ' + (match.position + 1) }}</small>
                @for (id of match.teamIds; track id) {
                  <p [class.winner]="match.winnerId === id"><span class="seed">{{ seed(id) }}</span><span class="team-name">{{ name(id) }}</span>
                    <strong>{{ score(match, id) }}</strong><span class="check">{{ match.winnerId === id ? '\u2713' : '' }}</span>
                  </p>
                }
                @if (!match.teamIds.length) { <p>Winners of {{ match.sources.join(' + ') }}</p> }
                @if (canStart() && match.status === 'ready') {
                  <button (click)="start.emit(match.id)">Run {{ name(match.teamIds[0]) }} vs {{ name(match.teamIds[1]) }}</button>
                }
              </article>
            }
          }
        </section>
      }
      @if (hybrid()) {
        <section class="final-stage" [style.left.px]="finalLeft()" [style.top.px]="height() / 2 - 170">
          <div class="final-title"><span>THE CHAMPIONSHIP SHOW</span><h3>The final stage</h3></div>
          @for (slot of finalists(); track slot.id) {
            <p class="finalist" [class.qualified]="slot.teamId"><span class="star">{{ slot.teamId ? '\u2605' : '\u25C7' }}</span><strong>{{ slot.teamId ? name(slot.teamId) : slot.label }}</strong><small>{{ slot.teamId ? 'QUALIFIED' : 'PLACE TO BE WON' }}</small></p>
          }
          <div class="final-signoff">ONE STAGE. ONE CHAMPION.<span>Every finalist starts with a fresh scoreboard.</span></div>
        </section>
      }
    </div></div>`, styles: ["/* angular:styles/component:scss;82a291e1dc6218163d5a8c1957c42e72d9a12887b72f5c4723532cb640d8bfc4;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/competition-show/ui/competition-bracket.component.ts */\n.bracket-scroll {\n  overflow-x: auto;\n  padding-bottom: 1rem;\n  outline-offset: 3px;\n}\n.bracket {\n  position: relative;\n  margin-inline: auto;\n}\n.connections {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\npath {\n  fill: none;\n  stroke: #45566f;\n  stroke-width: 1.5;\n}\npath.decided {\n  stroke: var(--broadcast-accent, #edc875);\n}\nsection {\n  position: absolute;\n  top: 0;\n  width: 260px;\n}\nh3 {\n  font-size: 11px;\n  color: var(--broadcast-accent, #edc875);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  font-weight: 500;\n  margin: 0;\n  min-height: 35px;\n  max-width: 250px;\n}\narticle {\n  position: absolute;\n  left: 0;\n  width: 260px;\n  box-sizing: border-box;\n  border: 1px solid #394b65;\n  border-radius: 4px;\n  background: #101d30;\n  overflow: hidden;\n  animation: enter 0.6s both;\n}\narticle.complete {\n  border-color: #847449;\n}\narticle.live {\n  border-color: var(--broadcast-accent, #edc875);\n  box-shadow: 0 0 24px rgba(226, 184, 98, 0.1333333333);\n}\nsmall {\n  display: block;\n  font-size: 8px;\n  letter-spacing: 1.5px;\n  color: #8fa5bf;\n  background: #0b1525;\n  padding: 9px 12px;\n}\np {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 0;\n  padding: 10px 12px;\n  color: #c9d7e9;\n  font-size: 12px;\n  border-top: 1px solid #263750;\n}\n.team-name {\n  flex: 1;\n  overflow-wrap: anywhere;\n}\n.seed {\n  font-size: 9px;\n  color: #899db6;\n  min-width: 14px;\n}\nstrong {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n}\n.check {\n  width: 9px;\n  color: var(--broadcast-accent, #edc875);\n}\np.winner {\n  background: rgba(170, 135, 71, 0.0784313725);\n  color: white;\n}\nbutton {\n  border: 0;\n  border-top: 1px solid #47516b;\n  background: #1c2b40;\n  color: var(--broadcast-accent, #edc875);\n  width: 100%;\n  min-height: 44px;\n  padding: 9px 12px;\n  font-size: 10px;\n  cursor: pointer;\n  text-align: left;\n}\nbutton:hover {\n  background: #293a51;\n}\nbutton:focus-visible {\n  outline: 2px solid white;\n  outline-offset: -3px;\n}\n.final-stage {\n  width: 400px;\n  border: 1px solid #9a804b;\n  background:\n    radial-gradient(\n      ellipse at top,\n      #354059,\n      #0b1525 65%);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2666666667);\n  border-radius: 6px;\n  overflow: hidden;\n}\n.final-title {\n  height: 70px;\n  box-sizing: border-box;\n  padding: 16px 22px;\n}\n.final-title > span {\n  font-size: 8px;\n  letter-spacing: 2px;\n  color: #aabaCF;\n}\n.final-title h3 {\n  font-size: 22px;\n  letter-spacing: 0;\n  text-transform: none;\n  margin: 6px 0;\n  max-width: none;\n}\n.finalist {\n  height: 60px;\n  box-sizing: border-box;\n  padding: 12px 20px;\n  gap: 14px;\n}\n.finalist strong {\n  flex: 1;\n  font-size: 18px;\n}\n.finalist small {\n  background: none;\n  padding: 0;\n  font-size: 7px;\n  letter-spacing: 1px;\n}\n.star {\n  color: var(--broadcast-accent, #edc875);\n  font-size: 20px;\n}\n.qualified {\n  background: rgba(196, 163, 96, 0.0549019608);\n  animation: enter 0.7s both;\n}\n.final-signoff {\n  padding: 20px 22px;\n  color: var(--broadcast-accent, #edc875);\n  font-size: 10px;\n  letter-spacing: 2px;\n  border-top: 1px solid #76643f;\n}\n.final-signoff span {\n  display: block;\n  color: #aabbd2;\n  letter-spacing: 0;\n  font-size: 10px;\n  margin-top: 8px;\n}\n@keyframes enter {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  article {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=competition-bracket.component.css.map */\n"] }]
  }], null, { matches: [{ type: Input, args: [{ isSignal: true, alias: "matches", required: true }] }], teams: [{ type: Input, args: [{ isSignal: true, alias: "teams", required: true }] }], hybrid: [{ type: Input, args: [{ isSignal: true, alias: "hybrid", required: false }] }], canStart: [{ type: Input, args: [{ isSignal: true, alias: "canStart", required: false }] }], start: [{ type: Output, args: ["start"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompetitionBracketComponent, { className: "CompetitionBracketComponent", filePath: "src/app/templates/competition-show/ui/competition-bracket.component.ts", lineNumber: 54 });
})();

// src/app/templates/competition-show/ui/scoreboard.component.ts
var _forTrack02 = ($index, $item) => $item.team.id;
function ScoreboardComponent_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span", 3);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tile_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("up", tile_r1.team.award > 0)("down", tile_r1.team.award < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", tile_r1.team.award > 0 ? "+" : tile_r1.team.award < 0 ? "\u2212" : "", "", ctx_r1.abs(tile_r1.team.award), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tile_r1.team.verdict === "correct" ? "\u2713" : "\u2717");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", tile_r1.team.verdict === "correct" ? "Correct" : "No points", ", ", tile_r1.team.award, " points, ", tile_r1.team.score, " total");
  }
}
function ScoreboardComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "article")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6, "points");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, ScoreboardComponent_For_2_Conditional_7_Template, 6, 10);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tile_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--%NS%team", tile_r1.team.color);
    \u0275\u0275classProp("correct", tile_r1.team.verdict === "correct")("miss", tile_r1.team.verdict === "miss")("lead", tile_r1.team.id === ctx_r1.leaderId());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tile_r1.team.name);
    \u0275\u0275advance();
    \u0275\u0275classProp("rolling", tile_r1.shown !== tile_r1.team.score);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tile_r1.shown);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(tile_r1.team.award !== null ? 7 : -1);
  }
}
var ScoreboardComponent = class _ScoreboardComponent {
  teams = input.required(
    ...ngDevMode ? [{ debugName: "teams" }] : (
      /* istanbul ignore next */
      []
    )
  );
  label = input(
    "Scoreboard",
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Skips the roll-up for reduced-motion viewers. */
  animate = input(
    true,
    ...ngDevMode ? [{ debugName: "animate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  shown = signal(
    {},
    ...ngDevMode ? [{ debugName: "shown" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Plain field, not a signal: reading the last totals inside the effect would make it retrigger itself. */
  previous = {};
  frame = 0;
  leaderId = computed(
    () => [...this.teams()].sort((a, b) => b.score - a.score)[0]?.id ?? "",
    ...ngDevMode ? [{ debugName: "leaderId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tiles = computed(
    () => this.teams().map((team) => ({ team, shown: this.shown()[team.id] ?? team.score })),
    ...ngDevMode ? [{ debugName: "tiles" }] : (
      /* istanbul ignore next */
      []
    )
  );
  abs(value) {
    return Math.abs(value);
  }
  constructor() {
    effect(() => {
      const teams = this.teams();
      const animate = this.animate();
      const from = this.previous;
      const targets = Object.fromEntries(teams.map((t) => [t.id, t.score]));
      this.previous = targets;
      const still = teams.every((t) => (from[t.id] ?? t.score) === t.score);
      if (!animate || still || typeof requestAnimationFrame === "undefined") {
        this.shown.set(targets);
        return;
      }
      const start = performance.now();
      const duration = 900;
      cancelAnimationFrame(this.frame);
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        this.shown.set(Object.fromEntries(teams.map((team) => {
          const previous = from[team.id] ?? team.score;
          return [team.id, Math.round(previous + (team.score - previous) * ease)];
        })));
        if (t < 1)
          this.frame = requestAnimationFrame(step);
      };
      this.frame = requestAnimationFrame(step);
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }
  static \u0275fac = function ScoreboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScoreboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScoreboardComponent, selectors: [["app-scoreboard"]], inputs: { teams: [1, "teams"], label: [1, "label"], animate: [1, "animate"] }, decls: 3, vars: 1, consts: [[1, "board"], [3, "correct", "miss", "lead", "--%NS%team"], [1, "award"], ["aria-hidden", "true", 1, "mark"], [1, "sr-only"]], template: function ScoreboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ScoreboardComponent_For_2_Template, 8, 13, "article", 1, _forTrack02);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.label());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.tiles());
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.board[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\narticle[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 118px;\n  position: relative;\n  text-align: center;\n  padding: 1rem 0.6rem 1.1rem;\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--%NS%team, #edc875);\n  border-radius: 4px;\n  background: #101c2d;\n  overflow: hidden;\n  transition: border-color 0.3s, background 0.3s;\n}\narticle[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at 50% 120%,\n      var(--%NS%team),\n      transparent 70%);\n  opacity: 0;\n  transition: opacity 0.5s;\n  pointer-events: none;\n}\narticle.correct[_ngcontent-%COMP%] {\n  border-color: var(--%NS%team);\n}\narticle.correct[_ngcontent-%COMP%]::after {\n  opacity: 0.22;\n}\narticle.miss[_ngcontent-%COMP%] {\n  border-top-color: #e0736b;\n  opacity: 0.72;\n}\narticle.lead[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 1px var(--%NS%team) inset;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 14px;\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\nstrong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 34px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.1;\n}\nstrong.rolling[_ngcontent-%COMP%] {\n  color: var(--%NS%team);\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  font-size: 9px;\n  color: #a8b8ce;\n}\n.award[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n  animation: _ngcontent-%COMP%_lift 1.4s ease-out both;\n}\n.award.up[_ngcontent-%COMP%] {\n  color: var(--%NS%team);\n}\n.award.down[_ngcontent-%COMP%] {\n  color: #e0736b;\n}\n.mark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  left: 9px;\n  font-size: 15px;\n  color: var(--%NS%team);\n}\narticle.miss[_ngcontent-%COMP%]   .mark[_ngcontent-%COMP%] {\n  color: #e0736b;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n@keyframes _ngcontent-%COMP%_lift {\n  0% {\n    opacity: 0;\n    transform: translateY(16px) scale(0.7);\n  }\n  25% {\n    opacity: 1;\n    transform: translateY(0) scale(1.15);\n  }\n  60% {\n    transform: translateY(0) scale(1);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(-4px) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .award[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  article[_ngcontent-%COMP%]::after {\n    transition: none;\n  }\n}\n@media (max-width: 700px) {\n  article[_ngcontent-%COMP%] {\n    min-width: 96px;\n    padding: 0.7rem 0.4rem 0.8rem;\n  }\n  strong[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n}\n/*# sourceMappingURL=scoreboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScoreboardComponent, [{
    type: Component,
    args: [{ selector: "app-scoreboard", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="board" [attr.aria-label]="label()">
      @for (tile of tiles(); track tile.team.id) {
        <article [class.correct]="tile.team.verdict === 'correct'" [class.miss]="tile.team.verdict === 'miss'"
          [class.lead]="tile.team.id === leaderId()" [style.--team]="tile.team.color">
          <h3>{{ tile.team.name }}</h3>
          <strong [class.rolling]="tile.shown !== tile.team.score">{{ tile.shown }}</strong>
          <small>points</small>
          @if (tile.team.award !== null) {
            <span class="award" [class.up]="tile.team.award > 0" [class.down]="tile.team.award < 0">
              {{ tile.team.award > 0 ? '+' : tile.team.award < 0 ? '\u2212' : '' }}{{ abs(tile.team.award) }}
            </span>
            <span class="mark" aria-hidden="true">{{ tile.team.verdict === 'correct' ? '\u2713' : '\u2717' }}</span>
            <span class="sr-only">{{ tile.team.verdict === 'correct' ? 'Correct' : 'No points' }}, {{ tile.team.award }} points, {{ tile.team.score }} total</span>
          }
        </article>
      }
    </div>`, styles: ['/* angular:styles/component:scss;ef12a5bc3978e47180f452e90f7d3ce0e057960c820a2202abd1384775b983f9;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/competition-show/ui/scoreboard.component.ts */\n:host {\n  display: block;\n}\n.board {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\narticle {\n  flex: 1;\n  min-width: 118px;\n  position: relative;\n  text-align: center;\n  padding: 1rem 0.6rem 1.1rem;\n  border: 1px solid #2b3b54;\n  border-top: 2px solid var(--team, #edc875);\n  border-radius: 4px;\n  background: #101c2d;\n  overflow: hidden;\n  transition: border-color 0.3s, background 0.3s;\n}\narticle::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at 50% 120%,\n      var(--team),\n      transparent 70%);\n  opacity: 0;\n  transition: opacity 0.5s;\n  pointer-events: none;\n}\narticle.correct {\n  border-color: var(--team);\n}\narticle.correct::after {\n  opacity: 0.22;\n}\narticle.miss {\n  border-top-color: #e0736b;\n  opacity: 0.72;\n}\narticle.lead {\n  box-shadow: 0 0 0 1px var(--team) inset;\n}\nh3 {\n  margin: 0 0 0.5rem;\n  font-size: 14px;\n  font-weight: 500;\n  overflow-wrap: anywhere;\n}\nstrong {\n  display: block;\n  font-size: 34px;\n  font-weight: 400;\n  font-variant-numeric: tabular-nums;\n  line-height: 1.1;\n}\nstrong.rolling {\n  color: var(--team);\n}\nsmall {\n  display: block;\n  margin-top: 6px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  font-size: 9px;\n  color: #a8b8ce;\n}\n.award {\n  position: absolute;\n  top: 6px;\n  right: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n  animation: lift 1.4s ease-out both;\n}\n.award.up {\n  color: var(--team);\n}\n.award.down {\n  color: #e0736b;\n}\n.mark {\n  position: absolute;\n  top: 8px;\n  left: 9px;\n  font-size: 15px;\n  color: var(--team);\n}\narticle.miss .mark {\n  color: #e0736b;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n}\n@keyframes lift {\n  0% {\n    opacity: 0;\n    transform: translateY(16px) scale(0.7);\n  }\n  25% {\n    opacity: 1;\n    transform: translateY(0) scale(1.15);\n  }\n  60% {\n    transform: translateY(0) scale(1);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(-4px) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .award {\n    animation: none;\n  }\n  article::after {\n    transition: none;\n  }\n}\n@media (max-width: 700px) {\n  article {\n    min-width: 96px;\n    padding: 0.7rem 0.4rem 0.8rem;\n  }\n  strong {\n    font-size: 26px;\n  }\n}\n/*# sourceMappingURL=scoreboard.component.css.map */\n'] }]
  }], () => [], { teams: [{ type: Input, args: [{ isSignal: true, alias: "teams", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], animate: [{ type: Input, args: [{ isSignal: true, alias: "animate", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScoreboardComponent, { className: "ScoreboardComponent", filePath: "src/app/templates/competition-show/ui/scoreboard.component.ts", lineNumber: 53 });
})();

export {
  BroadcastDirectorService,
  TelevisionStageComponent,
  studioProjection,
  CompetitionBracketComponent,
  ScoreboardComponent
};
//# debugId=bb432f9e-3cc4-53fa-91f1-7d8e75cb0313
//# sourceMappingURL=chunk-LTBIBO7J.js.map
