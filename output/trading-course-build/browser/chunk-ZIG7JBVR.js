import {
  BalanceLockComponent,
  GearLockComponent,
  MachineWorkshopComponent
} from "./chunk-5TKYBZHJ.js";
import {
  ExpeditionRuntime
} from "./chunk-LZMKORAB.js";
import "./chunk-GAXYVDGI.js";
import "./chunk-RWLVM3VX.js";
import "./chunk-7HMNGV54.js";
import "./chunk-RRITUMP7.js";
import "./chunk-YQ5R4IZP.js";
import "./chunk-RAYONVPN.js";
import "./chunk-NRR2X4JL.js";
import {
  WorkspaceToolsComponent
} from "./chunk-NDJR5R7S.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RangeValueAccessor,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  InjectionToken,
  ViewChild,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/game/expedition-audio.ts
var ExpeditionAudio = class {
  context;
  master;
  wind;
  enabled = true;
  lastStep = 0;
  start() {
    try {
      this.context ??= new AudioContext();
      void this.context.resume();
      if (this.master) return;
      const c = this.context;
      this.master = c.createGain();
      this.master.gain.value = this.enabled ? 0.2 : 0;
      this.master.connect(c.destination);
      const buffer = c.createBuffer(1, c.sampleRate * 3, c.sampleRate), channel = buffer.getChannelData(0);
      let previous = 0;
      for (let i = 0; i < channel.length; i++) {
        previous = (previous + (Math.random() * 2 - 1) * 0.015) / 1.02;
        channel[i] = previous;
      }
      this.wind = c.createBufferSource();
      this.wind.buffer = buffer;
      this.wind.loop = true;
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 340;
      this.wind.connect(filter);
      filter.connect(this.master);
      this.wind.start();
    } catch {
    }
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    if (this.master && this.context)
      this.master.gain.setTargetAtTime(enabled ? 0.2 : 0, this.context.currentTime, 0.1);
  }
  cue(kind) {
    const notes = {
      turn: [520],
      open: [392, 523.25, 659.25],
      wrong: [196, 164.81],
      finish: [261.63, 329.63, 392, 523.25, 659.25, 783.99]
    }[kind];
    notes.forEach(
      (hz, i) => this.tone(
        hz,
        i * 0.11,
        kind === "turn" ? 0.045 : 0.32,
        kind === "wrong" ? "triangle" : "sine"
      )
    );
  }
  step(time) {
    if (time - this.lastStep > 0.3) {
      this.lastStep = time;
      this.tone(100 + Math.random() * 30, 0, 0.04, "triangle", 0.09);
    }
  }
  tone(hz, delay, duration, type, volume = 0.38) {
    const c = this.context;
    if (!c || !this.master || !this.enabled) return;
    const osc = c.createOscillator(), gain = c.createGain(), t = c.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(hz, t);
    gain.gain.setValueAtTime(1e-3, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(1e-3, t + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  destroy() {
    try {
      this.wind?.stop();
      void this.context?.close();
    } catch {
    }
  }
};

// src/app/templates/heist/escape/expedition/expedition.component.ts
var _c0 = ["worldHost"];
var _c1 = ["panel"];
var _c2 = ["settingsPanel"];
var _c3 = (a0) => [a0];
var _c4 = () => [];
var _c5 = () => ["balance-lock", "gear-lock", "machine-lock"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function ExpeditionComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-balance-lock", 18);
    \u0275\u0275listener("moved", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_moved_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.input({ type: "balance-place", index: $event.index, side: $event.side }));
    })("sound", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_sound_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.audio.cue($event));
    })("pauseRequested", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSettings());
    })("solved", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_solved_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    })("leave", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_leave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.phase() === "celebrate" ? ctx_r1.next() : ctx_r1.closePuzzle());
    })("continued", function ExpeditionComponent_Conditional_2_Template_app_balance_lock_continued_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("definition", ctx.lock)("title", ctx_r1.runtime.current().title)("placements", ctx_r1.runtime.draft().placements ?? \u0275\u0275pureFunction0(7, _c4))("completed", ctx_r1.runtime.phase() === "celebrate")("paused", ctx_r1.runtime.paused())("reducedMotion", ctx_r1.runtime.reducedMotion())("saveWarning", ctx_r1.runtime.progress.warning() || ctx_r1.runtime.message());
  }
}
function ExpeditionComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-gear-lock", 19);
    \u0275\u0275listener("changed", function ExpeditionComponent_Conditional_3_Template_app_gear_lock_changed_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.input({ type: "gear-change", answer: $event }));
    })("solved", function ExpeditionComponent_Conditional_3_Template_app_gear_lock_solved_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    })("sound", function ExpeditionComponent_Conditional_3_Template_app_gear_lock_sound_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.audio.cue($event));
    })("pauseRequested", function ExpeditionComponent_Conditional_3_Template_app_gear_lock_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSettings());
    })("leave", function ExpeditionComponent_Conditional_3_Template_app_gear_lock_leave_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.phase() === "celebrate" ? ctx_r1.next() : ctx_r1.closePuzzle());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("definition", ctx.lock)("answer", ctx_r1.runtime.draft().placements ?? \u0275\u0275pureFunction0(6, _c4))("completed", ctx_r1.runtime.phase() === "celebrate")("paused", ctx_r1.runtime.paused())("reducedMotion", ctx_r1.runtime.reducedMotion())("saveWarning", ctx_r1.runtime.progress.warning() || ctx_r1.runtime.message());
  }
}
function ExpeditionComponent_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-machine-workshop", 21);
    \u0275\u0275listener("changed", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_changed_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.input({ type: "machine-change", answer: $event }));
    })("solved", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_solved_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submit());
    })("sound", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_sound_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.audio.cue($event));
    })("pauseRequested", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_pauseRequested_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openSettings());
    })("retrySave", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_retrySave_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.progress.retrySave());
    })("leave", function ExpeditionComponent_For_5_Conditional_0_Template_app_machine_workshop_leave_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.phase() === "celebrate" ? ctx_r1.next() : ctx_r1.closePuzzle());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("definition", ctx.lock)("answer", ctx_r1.runtime.draft().machine ?? null)("grade", ctx_r1.runtime.engine().grade)("completed", ctx_r1.runtime.phase() === "celebrate")("paused", ctx_r1.runtime.paused())("reducedMotion", ctx_r1.runtime.reducedMotion())("saveWarning", ctx_r1.runtime.progress.warning());
  }
}
function ExpeditionComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExpeditionComponent_For_5_Conditional_0_Template, 1, 7, "app-machine-workshop", 20);
  }
  if (rf & 2) {
    let tmp_11_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_11_0 = ctx_r1.machinePuzzle()) ? 0 : -1, tmp_11_0);
  }
}
function ExpeditionComponent_Conditional_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const \u0275$index_27_r7 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngValue", \u0275$index_27_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", \u0275$index_27_r7 + 1, " / ", ctx_r1.mission.steps.length, " \xB7 ", step_r6.place, "", ctx_r1.runtime.engine().solved.has(step_r6.id) ? " \u2713" : "", " ");
  }
}
function ExpeditionComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 9)(1, "button", 22);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.visitLock(ctx_r1.runtime.engine().index - 1));
    });
    \u0275\u0275text(2, " \u2190 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 23);
    \u0275\u0275listener("ngModelChange", function ExpeditionComponent_Conditional_9_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.visitLock(+$event));
    });
    \u0275\u0275repeaterCreate(4, ExpeditionComponent_Conditional_9_For_5_Template, 2, 5, "option", 24, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "button", 25);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.visitLock(ctx_r1.runtime.engine().index + 1));
    });
    \u0275\u0275text(7, " \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.runtime.engine().index === 0 || ctx_r1.runtime.paused());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.runtime.engine().index)("disabled", ctx_r1.runtime.paused());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mission.steps);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.runtime.engine().index === ctx_r1.mission.steps.length - 1 || ctx_r1.runtime.paused());
  }
}
function ExpeditionComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 27)(8, "button", 28);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_23_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runtime.openJournal());
    });
    \u0275\u0275text(9, " Journal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 29);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_23_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSound());
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_23_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSettings());
    });
    \u0275\u0275text(13, "Pause");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.engine().rescued);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" / ", ctx_r1.runtime.totalAnimals);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.engine().complete ? "HOME SAFE" : "ANIMALS FREED");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.settings());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.audioEnabled());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.audioEnabled() ? "Sound on" : "Sound off");
  }
}
function ExpeditionComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1, "CHAPTER 01 \xB7 THE CASTLE");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionComponent_Conditional_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_25_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275text(1, "Reload the game");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 15)(1, "span", 30);
    \u0275\u0275text(2, "\u263E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ExpeditionComponent_Conditional_25_Conditional_7_Template, 2, 0, "button", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error() ? "The castle is out of reach" : "Lighting the lanterns\u2026");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.error() || "Preparing your rescue adventure");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.error() ? 7 : -1);
  }
}
function ExpeditionComponent_Conditional_26_Conditional_10_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_26_Conditional_10_For_4_Template_button_click_0_listener() {
      const grade_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.setGrade(grade_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const grade_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.engine().grade === grade_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Grade ", grade_r11, " ");
  }
}
function ExpeditionComponent_Conditional_26_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 36)(1, "legend");
    \u0275\u0275text(2, "Choose your math level");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ExpeditionComponent_Conditional_26_Conditional_10_For_4_Template, 2, 2, "button", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.runtime.engine().started);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx);
  }
}
function ExpeditionComponent_Conditional_26_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.progress.warning());
  }
}
function ExpeditionComponent_Conditional_26_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_26_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restart());
    });
    \u0275\u0275text(1, "Start a fresh rescue \u2192");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionComponent_Conditional_26_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_26_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.start());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.engine().started ? "Continue your rescue" : "Enter the castle", " ");
  }
}
function ExpeditionComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 16)(1, "p", 33);
    \u0275\u0275element(2, "span");
    \u0275\u0275text(3, " A RESCUE ADVENTURE POWERED BY MATH");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, ExpeditionComponent_Conditional_26_Conditional_10_Template, 5, 1, "fieldset", 36);
    \u0275\u0275elementStart(11, "div", 37)(12, "span")(13, "b");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " animals to save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span")(17, "b");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " mechanisms to master");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, ExpeditionComponent_Conditional_26_Conditional_20_Template, 2, 1, "p", 38);
    \u0275\u0275conditionalCreate(21, ExpeditionComponent_Conditional_26_Conditional_21_Template, 2, 0, "button", 31)(22, ExpeditionComponent_Conditional_26_Conditional_22_Template, 4, 1, "button", 39);
    \u0275\u0275elementStart(23, "div", 40)(24, "span")(25, "kbd");
    \u0275\u0275text(26, "W A S D");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " or arrow keys to walk");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span")(29, "kbd");
    \u0275\u0275text(30, "E");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " inspect a mechanism");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "Click or tap to move");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "p", 41);
    \u0275\u0275text(35, "Take time to think. The adventure waits while you solve.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.mission.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mission.subtitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mission.briefing);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.mission.mathGrades) ? 10 : -1, tmp_5_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.totalAnimals);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.mission.steps.length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.runtime.progress.warning() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.progress.restoreBlocked() ? 21 : 22);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_0_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54)(2, "svg", 55);
    \u0275\u0275element(3, "image", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("rescued", ctx_r1.runtime.engine().released.has(a_r15.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", ctx_r1.spriteViewBox(a_r15.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("width", ctx_r1.spriteFrame(a_r15.id)[2])("height", ctx_r1.spriteFrame(a_r15.id)[3]);
    \u0275\u0275advance();
    \u0275\u0275attribute("href", ctx_r1.runtime.definition.animalAtlas)("x", -ctx_r1.spriteFrame(a_r15.id)[0])("y", -ctx_r1.spriteFrame(a_r15.id)[1]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r15.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.engine().released.has(a_r15.id) ? "Following you" : "Still in a pen");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 48)(1, "div", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "p", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h1");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.inspect());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "\u2192");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 50)(17, "kbd");
    \u0275\u0275text(18, "W A S D");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Move");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "kbd");
    \u0275\u0275text(22, "E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "Inspect");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 29);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_0_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMap());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "p", 51);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 52);
    \u0275\u0275repeaterCreate(30, ExpeditionComponent_Conditional_27_Conditional_0_For_31_Template, 8, 10, "div", 53, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.engine().index + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", ctx_r1.mission.steps.length);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().place);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.nearby() ? "You are close enough. Inspect the mechanism." : "Follow the golden beacon through the castle.", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pureFunction0(8, _c5).includes(ctx_r1.runtime.current().puzzle.type) ? "Solve lock" : ctx_r1.runtime.nearby() ? "Inspect [E]" : "Walk to clue", " ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", ctx_r1.overview() ? "Follow my rescuer" : "View the castle map", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.message());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.mission.animals);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const clue_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r17.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r17.value);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_For_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 72);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_For_5_Template_button_click_0_listener() {
      const n_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const a_r21 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.input({ type: "count", id: a_r21.id + "-" + n_r20 }));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54)(2, "svg", 55);
    \u0275\u0275element(3, "image", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_For_5_Conditional_4_Template, 2, 0, "b");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r20 = ctx.$implicit;
    const a_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275attribute("aria-label", a_r21.name + " animal " + (n_r20 + 1) + ": mark counted")("aria-pressed", ctx_r1.runtime.draft().counted.includes(a_r21.id + "-" + n_r20));
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", ctx_r1.spriteViewBox(a_r21.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("width", ctx_r1.spriteFrame(a_r21.id)[2])("height", ctx_r1.spriteFrame(a_r21.id)[3]);
    \u0275\u0275advance();
    \u0275\u0275attribute("href", ctx_r1.runtime.definition.animalAtlas)("x", -ctx_r1.spriteFrame(a_r21.id)[0])("y", -ctx_r1.spriteFrame(a_r21.id)[1]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.draft().counted.includes(a_r21.id + "-" + n_r20) ? 4 : -1);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275repeaterCreate(4, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_For_5_Template, 5, 9, "button", 71, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r21.name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.sequence(a_r21.count));
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275repeaterCreate(1, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_For_2_Template, 6, 1, "div", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mission.animals);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 72);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_For_2_Template_button_click_3_listener() {
      const \u0275$index_302_r23 = \u0275\u0275restoreView(_r22).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.input({ type: "dial", index: \u0275$index_302_r23, change: 1 }));
    });
    \u0275\u0275text(4, " \u2303");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "output", 73);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 72);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_For_2_Template_button_click_7_listener() {
      const \u0275$index_302_r23 = \u0275\u0275restoreView(_r22).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.input({ type: "dial", index: \u0275$index_302_r23, change: -1 }));
    });
    \u0275\u0275text(8, " \u2304 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r24 = ctx.$implicit;
    const \u0275$index_302_r23 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(label_r24);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Increase " + label_r24 + " digit");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", label_r24 + " digit");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.draft().digits[\u0275$index_302_r23]);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Decrease " + label_r24 + " digit");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275repeaterCreate(1, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_For_2_Template, 9, 5, "div", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r25 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r25.labels);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div")(2, "span");
    \u0275\u0275text(3, "DEPART");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7, " s");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "span");
    \u0275\u0275text(12, "ARRIVE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16, " s");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "label", 75);
    \u0275\u0275text(18, "Set the departure second");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 76);
    \u0275\u0275listener("ngModelChange", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_5_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.runtime.setDeparture(+$event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(20, "p", 77);
    \u0275\u0275text(21, "Green on the clock: lookout faces away.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r25 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.draft().departure);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.runtime.draft().departure + p_r25.crossing);
    \u0275\u0275advance(5);
    \u0275\u0275property("max", p_r25.cycle - 1)("ngModel", ctx_r1.runtime.draft().departure);
    \u0275\u0275control();
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 72);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_6_For_2_Template_button_click_0_listener() {
      const \u0275$index_356_r28 = \u0275\u0275restoreView(_r27).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.input({ type: "weight", index: \u0275$index_356_r28 }));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, " kg");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const weight_r29 = ctx.$implicit;
    const \u0275$index_356_r28 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.draft().weights.includes(\u0275$index_356_r28));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(weight_r29);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.draft().weights.includes(\u0275$index_356_r28) ? "On lift \u2713" : "Add weight");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275repeaterCreate(1, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_6_For_2_Template, 7, 3, "button", 71, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 79);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r25 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r25.weights);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.weightTotal(), " kg on the counterweight. Tap again to remove. ");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 81)(3, "button", 82);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.adjustQuantity(-1));
    });
    \u0275\u0275text(4, " \u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 83);
    \u0275\u0275listener("ngModelChange", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_7_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setQuantity($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "button", 84);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.adjustQuantity(1));
    });
    \u0275\u0275text(7, " +");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r25 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Your answer in ", p_r25.unit);
    \u0275\u0275advance(4);
    \u0275\u0275property("max", p_r25.max)("ngModel", ctx_r1.runtime.draft().quantity);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r25.unit);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r25 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r25.hint);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 62);
    \u0275\u0275listener("ngSubmit", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275conditionalCreate(1, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_1_Template, 3, 0, "div", 63);
    \u0275\u0275elementStart(2, "p", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_4_Template, 3, 0, "div", 65)(5, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_5_Template, 22, 4)(6, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_6_Template, 5, 1)(7, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Case_7_Template, 10, 4);
    \u0275\u0275elementStart(8, "p", 66);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 67)(11, "button", 68);
    \u0275\u0275text(12);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 69);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.runtime.hint.set(!ctx_r1.runtime.hint()));
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Conditional_17_Template, 2, 1, "p", 70);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const p_r25 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r25.type === "code" && p_r25.countAnimals ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r25.prompt);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = p_r25.type) === "code" ? 4 : tmp_8_0 === "timing" ? 5 : tmp_8_0 === "balance" ? 6 : tmp_8_0 === "number" ? 7 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.message());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.current().action, " ");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-expanded", ctx_r1.runtime.hint());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.hint() ? "Hide hint" : "Need a clue?", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.hint() ? 17 : -1);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 43, 1)(2, "div", 57)(3, "span", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closePuzzle());
    });
    \u0275\u0275text(6, " \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 59);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h2");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 60);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 61);
    \u0275\u0275repeaterCreate(14, ExpeditionComponent_Conditional_27_Conditional_1_For_15_Template, 5, 2, "div", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ExpeditionComponent_Conditional_27_Conditional_1_Conditional_16_Template, 18, 8, "form");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("MECHANISM ", ctx_r1.runtime.engine().index + 1, " / ", ctx_r1.mission.steps.length);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().puzzle.skill);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().story);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.runtime.current().clues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_9_0 = ctx_r1.runtime.current().puzzle) ? 16 : -1, tmp_9_0);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 44, 1)(2, "div", 85);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 33);
    \u0275\u0275text(5, "MECHANISM UNLOCKED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 86)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14, "\u2713 Solved");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().success);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().explanation);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.runtime.current().puzzle.skill);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.engine().index === ctx_r1.mission.steps.length - 1 ? "Bring everyone home" : "Continue the rescue", " ");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_3_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const step_r33 = ctx.$implicit;
    const \u0275$index_454_r34 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("solved", ctx_r1.runtime.engine().solved.has(step_r33.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.runtime.engine().solved.has(step_r33.id) ? "\u2713" : \u0275$index_454_r34 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r33.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.engine().solved.has(step_r33.id) ? step_r33.explanation : "This mechanism is still waiting for you.", " ");
  }
}
function ExpeditionComponent_Conditional_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 45, 1)(2, "div", 57)(3, "p", 33);
    \u0275\u0275text(4, "YOUR RESCUE JOURNAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 87);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.closeJournal());
    });
    \u0275\u0275text(6, " \xD7 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8, "The math behind the escape");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Every opened mechanism leaves a clue about your thinking.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 88);
    \u0275\u0275repeaterCreate(12, ExpeditionComponent_Conditional_27_Conditional_3_For_13_Template, 8, 5, "article", 89, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.mission.steps);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 46, 1)(2, "p", 33);
    \u0275\u0275text(3, "THE SANCTUARY IS WAITING");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5, "Every animal.");
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "em");
    \u0275\u0275text(8, "Home.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 90)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "ANIMALS RESCUED");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 91)(17, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_4_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.openJournal());
    });
    \u0275\u0275text(18, " Read your rescue journal \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 29);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_27_Conditional_4_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openSettings();
      return \u0275\u0275resetView(ctx_r1.restartQuestion.set(true));
    });
    \u0275\u0275text(20, "Play again");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("", ctx_r1.runtime.totalAnimals, " / ", ctx_r1.runtime.totalAnimals);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.mission.finale);
  }
}
function ExpeditionComponent_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.runtime.progress.warning());
  }
}
function ExpeditionComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExpeditionComponent_Conditional_27_Conditional_0_Template, 32, 9);
    \u0275\u0275conditionalCreate(1, ExpeditionComponent_Conditional_27_Conditional_1_Template, 17, 6, "section", 43);
    \u0275\u0275conditionalCreate(2, ExpeditionComponent_Conditional_27_Conditional_2_Template, 19, 4, "section", 44);
    \u0275\u0275conditionalCreate(3, ExpeditionComponent_Conditional_27_Conditional_3_Template, 14, 0, "section", 45);
    \u0275\u0275conditionalCreate(4, ExpeditionComponent_Conditional_27_Conditional_4_Template, 21, 3, "section", 46);
    \u0275\u0275conditionalCreate(5, ExpeditionComponent_Conditional_27_Conditional_5_Template, 2, 1, "p", 47);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.runtime.phase() === "explore" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.phase() === "puzzle" && !ctx_r1.balancePuzzle() && !ctx_r1.gearPuzzle() && !ctx_r1.machinePuzzle() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.phase() === "celebrate" && !ctx_r1.balancePuzzle() && !ctx_r1.gearPuzzle() && !ctx_r1.machinePuzzle() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.phase() === "journal" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.phase() === "complete" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.progress.warning() ? 5 : -1);
  }
}
function ExpeditionComponent_Conditional_28_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "This replaces this rescue\u2019s saved progress.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restart());
    });
    \u0275\u0275text(3, "Start a new rescue \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 93);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_7_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restartQuestion.set(false));
    });
    \u0275\u0275text(5, " Keep this rescue ");
    \u0275\u0275elementEnd();
  }
}
function ExpeditionComponent_Conditional_28_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "The animals and your progress are safe.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 32);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSettings());
    });
    \u0275\u0275text(3, "Back to the castle \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 93);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSound());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 93);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_8_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.runtime.reducedMotion.set(!ctx_r1.runtime.reducedMotion()));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 94);
    \u0275\u0275listener("click", function ExpeditionComponent_Conditional_28_Conditional_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restartQuestion.set(true));
    });
    \u0275\u0275text(9, "Start over");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.audioEnabled() ? "Turn sound off" : "Turn sound on");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r1.runtime.reducedMotion());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Reduced motion: ", ctx_r1.runtime.reducedMotion() ? "on" : "off");
  }
}
function ExpeditionComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "section", 92, 2)(3, "p", 33);
    \u0275\u0275text(4, "THE RESCUE CAN WAIT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ExpeditionComponent_Conditional_28_Conditional_7_Template, 6, 0)(8, ExpeditionComponent_Conditional_28_Conditional_8_Template, 10, 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.restartQuestion() ? "Begin a new rescue?" : "Take a breath.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.restartQuestion() ? 7 : 8);
  }
}
var EXPEDITION_SCENE_LOADER = new InjectionToken("EXPEDITION_SCENE_LOADER", {
  providedIn: "root",
  factory: () => () => import("./chunk-XBB476QK.js")
});
var ExpeditionComponent = class _ExpeditionComponent {
  runtime = inject(ExpeditionRuntime);
  mission = this.runtime.mission;
  balancePuzzle = computed(
    () => {
      const p = this.runtime.current().puzzle;
      return p.type === "balance-lock" && ["puzzle", "celebrate"].includes(this.runtime.phase()) ? p : null;
    },
    ...ngDevMode ? [{ debugName: "balancePuzzle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gearPuzzle = computed(
    () => {
      const p = this.runtime.current().puzzle;
      return p.type === "gear-lock" && ["puzzle", "celebrate"].includes(this.runtime.phase()) ? p : null;
    },
    ...ngDevMode ? [{ debugName: "gearPuzzle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  machinePuzzle = computed(
    () => {
      const p = this.runtime.current().puzzle;
      return p.type === "machine-lock" && ["puzzle", "celebrate"].includes(this.runtime.phase()) ? p : null;
    },
    ...ngDevMode ? [{ debugName: "machinePuzzle" }] : (
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
  error = signal(
    "",
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  settings = signal(
    false,
    ...ngDevMode ? [{ debugName: "settings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  restartQuestion = signal(
    false,
    ...ngDevMode ? [{ debugName: "restartQuestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overview = signal(
    false,
    ...ngDevMode ? [{ debugName: "overview" }] : (
      /* istanbul ignore next */
      []
    )
  );
  audio = new ExpeditionAudio();
  Math = Math;
  loader = inject(EXPEDITION_SCENE_LOADER);
  scene;
  destroyed = false;
  previousPhase = "";
  host;
  panel;
  settingsPanel;
  constructor() {
    effect(() => {
      const phase = this.runtime.phase();
      if (this.previousPhase && phase !== this.previousPhase && ["puzzle", "celebrate", "complete", "journal"].includes(phase))
        setTimeout(() => this.panel?.nativeElement.focus({ preventScroll: true }), 0);
      this.previousPhase = phase;
    });
    const key = (event) => {
      if (document.activeElement?.tagName === "CANVAS" && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key))
        event.preventDefault();
      if (event.key === "Tab" && this.settings()) {
        const controls = this.settingsPanel?.nativeElement.querySelectorAll("button:not(:disabled)");
        if (controls?.length) {
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && (document.activeElement === first || document.activeElement === this.settingsPanel?.nativeElement)) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
      if (event.key === "Escape") {
        if (this.settings())
          this.closeSettings();
        else if (this.runtime.phase() === "puzzle")
          this.closePuzzle();
        else if (this.runtime.phase() === "journal")
          this.runtime.closeJournal();
        else if (this.runtime.phase() === "explore")
          this.openSettings();
      }
    };
    const visibility = () => this.audio.setEnabled(!document.hidden && !this.runtime.paused() && this.runtime.audioEnabled());
    document.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
      this.audio.destroy();
      document.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
    });
  }
  async ngAfterViewInit() {
    try {
      const { mountExpeditionScene } = await this.loader();
      if (this.destroyed)
        return;
      this.scene = mountExpeditionScene(this.host.nativeElement, this.mission, () => ({
        phase: this.runtime.phase(),
        players: this.runtime.players,
        localPlayerId: this.runtime.localIdentity.id,
        currentIndex: this.runtime.engine().index,
        solved: this.runtime.engine().solved,
        released: this.runtime.engine().released,
        draft: this.runtime.draft(),
        reducedMotion: this.runtime.reducedMotion(),
        paused: this.runtime.paused(),
        route: this.runtime.navigation.route,
        celebration: this.runtime.celebration()
      }), {
        input: (input) => this.input(input),
        frame: (seconds, direction) => {
          if (document.hidden)
            return;
          this.runtime.tick(seconds, direction);
          if (this.runtime.navigation.moving && !this.runtime.paused())
            this.audio.step(performance.now() / 1e3);
        },
        interact: () => {
          if (this.runtime.phase() === "explore")
            this.runtime.inspect();
        },
        ready: () => this.ready.set(true),
        failed: (message) => this.error.set(message)
      });
    } catch {
      this.error.set("The game renderer could not start. Reload to try again in a browser with canvas support.");
    }
  }
  start() {
    this.audio.start();
    if (this.runtime.start())
      this.scene?.focus();
  }
  input(input) {
    this.runtime.input(input);
    if (["dial", "weight", "count"].includes(input.type))
      this.audio.cue("turn");
  }
  submit() {
    const result = this.runtime.submit();
    if (result === "correct")
      this.audio.cue("open");
    else if (result === "incorrect")
      this.audio.cue("wrong");
  }
  next() {
    this.runtime.next();
    this.overview.set(false);
    this.scene?.follow();
    if (this.runtime.engine().complete)
      this.audio.cue("finish");
    else
      this.scene?.focus();
  }
  closePuzzle() {
    this.runtime.closePuzzle();
    this.scene?.focus();
  }
  sequence(n) {
    return Array.from({ length: n }, (_, i) => i);
  }
  setQuantity(value) {
    this.runtime.setNumber(value);
  }
  adjustQuantity(delta) {
    const p = this.runtime.current().puzzle;
    if (p.type === "number")
      this.setQuantity(Math.max(0, Math.min(p.max, (this.runtime.draft().quantity ?? 0) + delta)));
    this.audio.cue("turn");
  }
  weightTotal() {
    const p = this.runtime.current().puzzle;
    return p.type === "balance" ? this.runtime.draft().weights.reduce((sum, i) => sum + p.weights[i], 0) : 0;
  }
  visitLock(index) {
    if (this.runtime.visitLock(index)) {
      this.overview.set(false);
      this.scene?.follow();
    }
  }
  toggleMap() {
    this.overview.update((v) => !v);
    if (this.overview())
      this.scene?.overview();
    else
      this.scene?.follow();
  }
  openSettings() {
    this.settings.set(true);
    this.runtime.paused.set(true);
    this.audio.setEnabled(false);
    setTimeout(() => this.settingsPanel?.nativeElement.focus({ preventScroll: true }), 0);
  }
  closeSettings() {
    this.settings.set(false);
    this.restartQuestion.set(false);
    this.runtime.paused.set(false);
    this.audio.setEnabled(this.runtime.audioEnabled());
    this.scene?.focus();
  }
  toggleSound() {
    this.runtime.audioEnabled.update((v) => !v);
    this.audio.setEnabled(this.runtime.audioEnabled() && !this.settings());
  }
  restart() {
    this.runtime.reset();
    this.closeSettings();
    this.scene?.follow();
    this.overview.set(false);
  }
  reload() {
    globalThis.location.reload();
  }
  spriteFrame(id) {
    const row = this.runtime.definition.animalRows[id];
    return this.runtime.definition.animalFrames?.[row * 4 + 2] ?? [0.5, row / 3, 0.25, 1 / 3];
  }
  spriteViewBox(id) {
    const frame = this.spriteFrame(id);
    return `0 0 ${frame[2]} ${frame[3]}`;
  }
  static \u0275fac = function ExpeditionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpeditionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpeditionComponent, selectors: [["app-heist-expedition"]], viewQuery: function ExpeditionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7)(_c1, 5)(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.host = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.settingsPanel = _t.first);
    }
  }, decls: 29, vars: 16, consts: [["worldHost", ""], ["panel", ""], ["settingsPanel", ""], [1, "expedition"], [1, "game-content", 3, "inert"], [3, "definition", "title", "placements", "completed", "paused", "reducedMotion", "saveWarning"], [3, "definition", "answer", "completed", "paused", "reducedMotion", "saveWarning"], [1, "world-host"], ["aria-hidden", "true", 1, "vignette"], ["aria-label", "Lock navigation", 1, "lock-navigation"], [1, "game-bar"], ["routerLink", "/", "aria-label", "Back to all projects"], [1, "game-brand"], ["aria-hidden", "true"], [1, "chapter-tag"], ["role", "status", 1, "loading-screen"], [1, "opening"], [1, "pause-backdrop"], [3, "moved", "sound", "pauseRequested", "solved", "leave", "continued", "definition", "title", "placements", "completed", "paused", "reducedMotion", "saveWarning"], [3, "changed", "solved", "sound", "pauseRequested", "leave", "definition", "answer", "completed", "paused", "reducedMotion", "saveWarning"], [3, "definition", "answer", "grade", "completed", "paused", "reducedMotion", "saveWarning"], [3, "changed", "solved", "sound", "pauseRequested", "retrySave", "leave", "definition", "answer", "grade", "completed", "paused", "reducedMotion", "saveWarning"], ["type", "button", "aria-label", "Previous lock", 3, "click", "disabled"], ["aria-label", "Choose lock", 3, "ngModelChange", "ngModel", "disabled"], [3, "ngValue"], ["type", "button", "aria-label", "Next lock", 3, "click", "disabled"], ["aria-live", "polite", 1, "rescue-counter"], [1, "header-actions"], ["aria-label", "Open rescue journal", 3, "click", "disabled"], [3, "click"], ["aria-hidden", "true", 1, "moon"], [1, "gold-button"], [1, "gold-button", 3, "click"], [1, "eyebrow"], [1, "opening-subtitle"], [1, "briefing"], [1, "grade-picker", 3, "disabled"], [1, "opening-facts"], ["role", "alert", 1, "warning"], [1, "gold-button", "begin"], [1, "opening-controls"], [1, "thinking-note"], [1, "gold-button", "begin", 3, "click"], ["tabindex", "-1", "aria-label", "Operate the math mechanism", 1, "mechanism-panel"], ["tabindex", "-1", "aria-label", "Mechanism unlocked", 1, "result-panel"], ["tabindex", "-1", "aria-label", "Rescue journal", 1, "journal-panel"], ["tabindex", "-1", "aria-label", "Rescue complete", 1, "ending"], ["role", "alert", 1, "save-warning"], ["aria-label", "Current rescue objective", 1, "objective-hud"], [1, "objective-number"], [1, "exploration-help"], ["aria-live", "polite", 1, "world-message"], ["aria-label", "Animals in your rescue team", 1, "animal-hud"], [3, "rescued"], ["aria-hidden", "true", 1, "animal-sprite"], ["overflow", "hidden"], ["width", "1", "height", "1"], [1, "panel-topline"], ["aria-label", "Close mechanism and return to the castle", 1, "close-button", 3, "click"], [1, "skill-label"], [1, "story"], [1, "clue-strip"], [3, "ngSubmit"], ["aria-label", "Count the animals", 1, "counting-list"], [1, "question"], ["role", "group", "aria-label", "Combination dials", 1, "dial-controls"], ["aria-live", "polite", 1, "answer-feedback"], [1, "mechanism-actions"], ["type", "submit", 1, "gold-button"], ["type", "button", 1, "hint-button", 3, "click"], [1, "hint"], ["type", "button"], ["type", "button", 3, "click"], ["aria-live", "polite"], [1, "clock-values"], ["for", "patrol-time"], ["id", "patrol-time", "name", "departure", "type", "range", "min", "0", "step", "1", 3, "ngModelChange", "max", "ngModel"], [1, "control-note"], ["role", "group", "aria-label", "Counterweights", 1, "weight-controls"], ["aria-live", "polite", 1, "control-note"], ["for", "mechanism-number"], [1, "number-control"], ["type", "button", "aria-label", "Decrease answer", 3, "click"], ["id", "mechanism-number", "type", "number", "name", "answer", "min", "0", "step", "any", "inputmode", "decimal", "autocomplete", "off", "placeholder", "?", 3, "ngModelChange", "max", "ngModel"], ["type", "button", "aria-label", "Increase answer", 3, "click"], ["aria-hidden", "true", 1, "result-seal"], [1, "result-math"], ["aria-label", "Close journal", 1, "close-button", 3, "click"], [1, "journal-steps"], [3, "solved"], [1, "ending-count"], [1, "ending-actions"], ["tabindex", "-1", "role", "dialog", "aria-modal", "true", "aria-label", "Game paused", 1, "pause-panel"], [1, "secondary-button", 3, "click"], [1, "text-button", 3, "click"]], template: function ExpeditionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 3)(1, "div", 4);
      \u0275\u0275conditionalCreate(2, ExpeditionComponent_Conditional_2_Template, 1, 8, "app-balance-lock", 5);
      \u0275\u0275conditionalCreate(3, ExpeditionComponent_Conditional_3_Template, 1, 7, "app-gear-lock", 6);
      \u0275\u0275repeaterCreate(4, ExpeditionComponent_For_5_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275element(6, "div", 7, 0)(8, "div", 8);
      \u0275\u0275conditionalCreate(9, ExpeditionComponent_Conditional_9_Template, 8, 4, "nav", 9);
      \u0275\u0275elementStart(10, "app-workspace-tools")(11, "header", 10)(12, "a", 11);
      \u0275\u0275text(13, "\u2190 ");
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "Projects");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 12)(17, "span", 13);
      \u0275\u0275text(18, "\u263E");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div");
      \u0275\u0275text(20);
      \u0275\u0275elementStart(21, "small");
      \u0275\u0275text(22, "SOLO EXPEDITION");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(23, ExpeditionComponent_Conditional_23_Template, 14, 6)(24, ExpeditionComponent_Conditional_24_Template, 2, 0, "span", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(25, ExpeditionComponent_Conditional_25_Template, 8, 3, "section", 15)(26, ExpeditionComponent_Conditional_26_Template, 36, 8, "section", 16)(27, ExpeditionComponent_Conditional_27_Template, 6, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(28, ExpeditionComponent_Conditional_28_Template, 9, 2, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275classProp("in-puzzle", ctx.runtime.phase() === "puzzle")("in-balance", !!ctx.balancePuzzle() || !!ctx.gearPuzzle() || !!ctx.machinePuzzle())("in-opening", ctx.runtime.phase() === "opening");
      \u0275\u0275advance();
      \u0275\u0275property("inert", ctx.settings());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.balancePuzzle()) ? 2 : -1, tmp_5_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.gearPuzzle()) ? 3 : -1, tmp_6_0);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pureFunction1(14, _c3, ctx.runtime.current()));
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.ready() && ctx.runtime.engine().started && !ctx.runtime.engine().complete ? 9 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.mission.title);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.runtime.phase() !== "opening" ? 23 : 24);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.ready() || ctx.error() ? 25 : ctx.runtime.phase() === "opening" ? 26 : 27);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.settings() ? 28 : -1);
    }
  }, dependencies: [
    WorkspaceToolsComponent,
    FormsModule,
    \u0275NgNoValidate,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    RangeValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MinValidator,
    MaxValidator,
    NgModel,
    NgForm,
    RouterLink,
    BalanceLockComponent,
    GearLockComponent,
    MachineWorkshopComponent
  ], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #f1ebd9;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.expedition[_ngcontent-%COMP%] {\n  --%NS%gold: #e7c586;\n  --%NS%muted: #b9c9c5;\n  position: relative;\n  isolation: isolate;\n  height: 100dvh;\n  min-height: 580px;\n  overflow: hidden;\n  background: #091b24;\n}\n.world-host[_ngcontent-%COMP%], \n.vignette[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.game-content[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.world-host[_ngcontent-%COMP%] {\n  touch-action: none;\n}\n.vignette[_ngcontent-%COMP%] {\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(6, 26, 35, 0.8784313725),\n      transparent 22%,\n      transparent 72%,\n      rgba(5, 25, 34, 0.7411764706));\n  box-shadow: inset 0 0 140px rgba(3, 21, 26, 0.4784313725);\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: inherit;\n  font: inherit;\n  border: 1px solid rgba(214, 216, 180, 0.2196078431);\n  background: rgba(18, 49, 57, 0.8745098039);\n  border-radius: 7px;\n  padding: 10px 15px;\n  transition: background 0.18s, border-color 0.18s;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #25504c;\n  border-color: #d6c18a;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #91f3da;\n  outline-offset: 4px;\n}\nsection[tabindex][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\na[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.55;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%] {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n  font-weight: 400;\n}\n.game-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 12;\n  inset: 0 0 auto;\n  height: 88px;\n  display: flex;\n  align-items: center;\n  gap: 27px;\n  padding: 0 35px;\n  border-bottom: 1px solid rgba(212, 205, 158, 0.1450980392);\n  background: linear-gradient(rgba(11, 32, 44, 0.8509803922), rgba(11, 32, 44, 0.2823529412));\n}\n.game-bar[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #d0dbd5;\n  padding: 12px 0;\n}\n.game-brand[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  font-family: Georgia, serif;\n  font-size: 20px;\n}\n.game-brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: var(--%NS%gold);\n  font-size: 34px;\n}\n.game-brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.rescue-counter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 9px/1.6 "Trebuchet MS", sans-serif;\n  letter-spacing: 2px;\n  color: #b5c9c5;\n  margin-top: 5px;\n}\n.chapter-tag[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #c6cfbe;\n}\n.rescue-counter[_ngcontent-%COMP%] {\n  margin-left: auto;\n  text-align: right;\n}\n.rescue-counter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 23px Georgia, serif;\n  color: var(--%NS%gold);\n}\n.rescue-counter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b0c5c1;\n  font-size: 16px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 9px 12px;\n  background: rgba(16, 46, 54, 0.5411764706);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  color: var(--%NS%gold);\n}\n.gold-button[_ngcontent-%COMP%] {\n  color: #192d2a;\n  background:\n    linear-gradient(\n      120deg,\n      #f1dba2,\n      #d6af65);\n  border: 1px solid #f1dca0;\n  font-weight: 700;\n  border-radius: 5px;\n  box-shadow: 0 5px 20px rgba(4, 23, 25, 0.231372549);\n}\n.gold-button[_ngcontent-%COMP%]:hover {\n  background: #ffe7ad;\n  border-color: #fff2c9;\n}\n.gold-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 16px;\n}\n.opening[_ngcontent-%COMP%], \n.ending[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 5;\n  top: 88px;\n  bottom: 0;\n  left: 0;\n  width: 62%;\n  padding: clamp(32px, 7vh, 85px) 6.5%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 26, 35, 0.9490196078),\n      rgba(7, 29, 37, 0.8745098039) 58%,\n      transparent);\n}\n.opening[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.ending[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(45px, 5.5vw, 80px);\n  line-height: 1.03;\n  letter-spacing: -2px;\n  max-width: 590px;\n  margin: 24px 0;\n  text-wrap: balance;\n}\n.opening[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], \n.ending[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: #eacb8e;\n  font-weight: 400;\n}\n.opening-subtitle[_ngcontent-%COMP%] {\n  color: #eeddb9;\n  max-width: 410px;\n  font-size: 17px;\n}\n.briefing[_ngcontent-%COMP%] {\n  max-width: 440px;\n  color: #b9cfcd;\n  font-size: 14px;\n  margin-top: 14px;\n}\n.opening-facts[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 25px;\n  margin: 26px 0;\n  font-size: 12px;\n  color: #b6c8c2;\n}\n.opening-facts[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  color: #e8d3a4;\n  font: 27px Georgia, serif;\n  margin-bottom: 5px;\n}\n.begin[_ngcontent-%COMP%] {\n  padding: 16px 23px;\n  min-width: 247px;\n  text-align: left;\n}\n.begin[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  float: right;\n}\n.opening-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px 17px;\n  max-width: 440px;\n  margin-top: 23px;\n  color: #b4c8c7;\n  font-size: 10px;\n}\nkbd[_ngcontent-%COMP%] {\n  border: 1px solid rgba(181, 200, 189, 0.3215686275);\n  padding: 3px 6px;\n  border-radius: 4px;\n  font: 10px "Trebuchet MS", sans-serif;\n  color: #ebebd8;\n  background: rgba(19, 55, 59, 0.5019607843);\n}\n.thinking-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8fadac;\n  margin-top: 13px;\n}\n.objective-hud[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  left: 30px;\n  top: 111px;\n  max-width: min(610px, 100% - 60px);\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 16px 18px;\n  background:\n    linear-gradient(\n      110deg,\n      rgba(10, 40, 53, 0.9411764706),\n      rgba(12, 49, 59, 0.7921568627));\n  border: 1px solid rgba(178, 187, 145, 0.2784313725);\n  border-left: 3px solid var(--%NS%gold);\n  border-radius: 5px;\n  box-shadow: 0 12px 30px rgba(0, 19, 24, 0.2509803922);\n}\n.objective-number[_ngcontent-%COMP%] {\n  font: 35px Georgia, serif;\n  color: var(--%NS%gold);\n  padding-right: 12px;\n  border-right: 1px solid rgba(197, 199, 161, 0.2078431373);\n}\n.objective-number[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font: 10px "Trebuchet MS", sans-serif;\n  color: #a0bab8;\n  text-align: center;\n}\n.objective-hud[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin: 5px 0;\n}\n.objective-hud[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow) {\n  color: #b9cecc;\n  font-size: 11px;\n}\n.objective-hud[_ngcontent-%COMP%]   .gold-button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 12px;\n  padding: 12px;\n}\n.exploration-help[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 4;\n  bottom: 31px;\n  left: 30px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  color: #cfddd2;\n}\n.exploration-help[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  font-size: 11px;\n}\n.world-message[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  bottom: 83px;\n  left: 30px;\n  font-size: 12px;\n  text-shadow: 0 2px 3px #001116;\n  max-width: 60%;\n}\n.animal-hud[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 24px;\n  right: 26px;\n  z-index: 3;\n  display: flex;\n  gap: 14px;\n}\n.animal-hud[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  opacity: 0.75;\n}\n.animal-hud[_ngcontent-%COMP%]    > div.rescued[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.animal-hud[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  font-size: 12px;\n}\n.animal-hud[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  color: #b6ccc7;\n  margin-top: 4px;\n}\n.animal-sprite[_ngcontent-%COMP%] {\n  display: inline-block;\n  flex-shrink: 0;\n  height: 46px;\n  width: 43px;\n  overflow: hidden;\n}\n.mechanism-panel[_ngcontent-%COMP%], \n.result-panel[_ngcontent-%COMP%], \n.journal-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 8;\n  right: 22px;\n  top: 105px;\n  bottom: 24px;\n  width: 392px;\n  padding: 23px;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  border: 1px solid rgba(179, 184, 145, 0.3960784314);\n  border-radius: 11px;\n  background:\n    linear-gradient(\n      150deg,\n      rgba(20, 56, 66, 0.968627451),\n      rgba(9, 38, 49, 0.9803921569));\n  box-shadow: 0 15px 50px rgba(0, 17, 23, 0.5019607843);\n  scrollbar-width: thin;\n  scrollbar-color: #627e77 #0b2831;\n}\n.panel-topline[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.close-button[_ngcontent-%COMP%] {\n  font-size: 23px;\n  line-height: 1;\n  padding: 3px 9px;\n  background: transparent;\n  border: none;\n}\n.skill-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: #9bd7c5;\n  margin-bottom: 9px;\n  text-transform: uppercase;\n}\n.mechanism-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.journal-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 29px;\n  line-height: 1.1;\n  margin-bottom: 12px;\n}\n.story[_ngcontent-%COMP%], \n.journal-panel[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #c4d4ce;\n}\n.clue-strip[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 17px 0;\n  border-block: 1px solid rgba(194, 205, 170, 0.1764705882);\n  padding: 12px 0;\n  gap: 12px;\n}\n.clue-strip[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.clue-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  color: #9ebbb5;\n  margin-bottom: 6px;\n}\n.clue-strip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 400;\n  color: #eddeb7;\n}\n.question[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n  color: #f4e4bf;\n  margin: 14px 0;\n}\nform[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #c1d4cf;\n  display: block;\n  margin-bottom: 8px;\n}\n.counting-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  align-items: center;\n}\n.counting-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: 47px;\n  font-size: 10px;\n  color: #c8d9d2;\n}\n.counting-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  gap: 3px;\n}\n.counting-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid transparent;\n  padding: 0;\n  background: rgba(255, 255, 255, 0.0196078431);\n}\n.counting-list[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: #8bd2b5;\n  background: rgba(132, 214, 176, 0.1647058824);\n}\n.counting-list[_ngcontent-%COMP%]   .animal-sprite[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 36px;\n}\n.counting-list[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  color: #9ff3c4;\n  font-size: 11px;\n}\n.dial-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 14px;\n  margin: 12px 0;\n}\n.dial-controls[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.dial-controls[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #c3d4cc;\n  margin-bottom: 6px;\n}\n.dial-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 58px;\n  padding: 2px;\n  color: var(--%NS%gold);\n  font-size: 19px;\n  border-radius: 4px;\n}\n.dial-controls[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  width: 58px;\n  text-align: center;\n  font: 35px/1.4 Georgia, serif;\n  color: #f9e4b2;\n  background: #061d24;\n  border-inline: 1px solid rgba(211, 181, 124, 0.2784313725);\n}\n.clock-values[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 23px;\n  align-items: center;\n  justify-content: center;\n  background: #09232c;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-radius: 6px;\n}\n.clock-values[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #9fbab2;\n}\n.clock-values[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 32px/1.4 Georgia, serif;\n  color: var(--%NS%gold);\n}\n.clock-values[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #eac687;\n  cursor: pointer;\n  height: 27px;\n}\n.control-note[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #b8cfc8;\n  margin-top: 10px;\n}\n.weight-controls[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 7px;\n}\n.weight-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 14px 4px;\n}\n.weight-controls[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #336357;\n  border-color: #b0dab6;\n}\n.weight-controls[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 26px Georgia, serif;\n  color: var(--%NS%gold);\n}\n.weight-controls[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.weight-controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  font-size: 9px;\n}\n.number-control[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.number-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 22px;\n  padding: 10px 14px;\n}\n.number-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 53px;\n  border: 1px solid rgba(197, 181, 123, 0.4745098039);\n  border-radius: 5px;\n  color: #f2d9a3;\n  background: #08232c;\n  font: 30px Georgia, serif;\n  text-align: center;\n}\n.number-control[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #bdcdc2;\n}\n.answer-feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #ffcf96;\n  margin-top: 14px;\n}\n.answer-feedback[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.mechanism-actions[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mechanism-actions[_ngcontent-%COMP%]   .gold-button[_ngcontent-%COMP%] {\n  padding: 13px 14px;\n  font-size: 13px;\n}\n.hint-button[_ngcontent-%COMP%], \n.text-button[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #bdd4c7;\n  font-size: 11px;\n}\n.hint[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: rgba(202, 228, 174, 0.0705882353);\n  border-left: 2px solid #95bd9c;\n  font-size: 12px;\n  color: #d1dfc9;\n}\n.result-panel[_ngcontent-%COMP%] {\n  top: 24%;\n  bottom: auto;\n  padding: 31px;\n}\n.result-seal[_ngcontent-%COMP%] {\n  width: 57px;\n  height: 57px;\n  border-radius: 50%;\n  border: 1px solid #9bc8a3;\n  display: grid;\n  place-items: center;\n  color: #b6e9ba;\n  background: rgba(67, 101, 73, 0.3019607843);\n  font-size: 28px;\n  margin-bottom: 23px;\n}\n.result-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  line-height: 1.1;\n  margin: 15px 0;\n}\n.result-panel[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  color: #c4d6cc;\n  font-size: 14px;\n}\n.result-math[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  justify-content: space-between;\n  padding: 17px 0;\n  margin: 15px 0;\n  border-block: 1px solid rgba(208, 210, 170, 0.1647058824);\n  font-size: 11px;\n  color: #b6cbbc;\n}\n.result-math[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #c7eaba;\n}\n.result-panel[_ngcontent-%COMP%]   .gold-button[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 13px;\n}\n.journal-panel[_ngcontent-%COMP%] {\n  width: 480px;\n}\n.journal-steps[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.journal-steps[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  padding: 15px 0;\n  border-top: 1px solid rgba(197, 208, 170, 0.1607843137);\n  color: #9fb8b2;\n}\n.journal-steps[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex: 0 0 27px;\n  color: #a1baab;\n  font: 22px Georgia, serif;\n}\n.journal-steps[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 19px;\n  margin-bottom: 6px;\n}\n.journal-steps[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.journal-steps[_ngcontent-%COMP%]   .solved[_ngcontent-%COMP%] {\n  color: #e4e0c7;\n}\n.journal-steps[_ngcontent-%COMP%]   .solved[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #b2e0aa;\n}\n.ending[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  max-width: 400px;\n  color: #c6d9ce;\n  font-size: 14px;\n}\n.ending-count[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin-bottom: 23px;\n}\n.ending-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 34px Georgia, serif;\n  color: #edcf90;\n}\n.ending-count[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #b2cdbb;\n}\n.ending-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin-top: 30px;\n}\n.ending-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.loading-screen[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 30;\n  inset: 0;\n  background: #0a252e;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 23px;\n  text-align: center;\n  padding: 30px;\n}\n.loading-screen[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 34px;\n}\n.loading-screen[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a8c9c3;\n  font-size: 14px;\n}\n.moon[_ngcontent-%COMP%] {\n  color: var(--%NS%gold);\n  font-size: 60px;\n}\n.pause-backdrop[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 60;\n  inset: 0;\n  background: rgba(0, 16, 25, 0.7215686275);\n  -webkit-backdrop-filter: blur(7px);\n  backdrop-filter: blur(7px);\n  display: grid;\n  place-items: center;\n  padding: 25px;\n}\n.pause-panel[_ngcontent-%COMP%] {\n  width: min(370px, 100%);\n  background: #12333d;\n  border: 1px solid rgba(214, 194, 136, 0.5215686275);\n  border-radius: 12px;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  box-shadow: 0 20px 90px #001017;\n}\n.pause-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 34px;\n}\n.pause-panel[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.eyebrow) {\n  color: #b9cec3;\n  font-size: 13px;\n}\n.pause-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.warning[_ngcontent-%COMP%], \n.save-warning[_ngcontent-%COMP%] {\n  color: #ffd9a2;\n  font-size: 12px;\n  padding: 10px;\n  background: #482e25;\n  border-radius: 4px;\n}\n.save-warning[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 14;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n@media (max-height: 760px) and (min-width: 900px) {\n  .opening[_ngcontent-%COMP%] {\n    padding-top: 25px;\n    padding-bottom: 20px;\n  }\n  .opening[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 53px;\n    margin: 15px 0;\n  }\n  .opening-facts[_ngcontent-%COMP%] {\n    margin: 17px 0;\n  }\n  .opening-controls[_ngcontent-%COMP%] {\n    margin-top: 15px;\n  }\n  .mechanism-panel[_ngcontent-%COMP%] {\n    padding: 17px 21px;\n  }\n  .mechanism-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n}\n@media (max-width: 1100px) {\n  .game-bar[_ngcontent-%COMP%] {\n    padding-inline: 20px;\n    gap: 18px;\n  }\n  .animal-hud[_ngcontent-%COMP%] {\n    gap: 9px;\n  }\n  .animal-hud[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    display: none;\n  }\n  .opening[_ngcontent-%COMP%] {\n    width: 70%;\n    padding-left: 6%;\n  }\n}\n@media (max-width: 899px) {\n  .expedition[_ngcontent-%COMP%] {\n    min-height: 600px;\n  }\n  .game-bar[_ngcontent-%COMP%] {\n    height: 72px;\n    padding: 0 16px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .game-bar[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .game-brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n   .chapter-tag[_ngcontent-%COMP%], \n   .game-brand[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .game-brand[_ngcontent-%COMP%] {\n    font-size: 16px;\n    max-width: 190px;\n  }\n  .rescue-counter[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .rescue-counter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 83px;\n    right: 13px;\n    gap: 5px;\n  }\n  .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: 8px;\n  }\n  .opening[_ngcontent-%COMP%], \n   .ending[_ngcontent-%COMP%] {\n    top: 72px;\n    width: 100%;\n    padding: 35px 7%;\n    background:\n      linear-gradient(\n        90deg,\n        rgba(6, 26, 35, 0.9294117647),\n        rgba(7, 29, 37, 0.6823529412) 75%,\n        rgba(7, 29, 37, 0.168627451));\n  }\n  .opening[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n   .ending[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: clamp(46px, 9vw, 70px);\n    max-width: 550px;\n  }\n  .briefing[_ngcontent-%COMP%] {\n    font-size: 13px;\n    max-width: 410px;\n  }\n  .opening-subtitle[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .objective-hud[_ngcontent-%COMP%] {\n    top: 127px;\n    left: 14px;\n    max-width: calc(100% - 28px);\n    padding: 12px;\n    gap: 10px;\n  }\n  .objective-hud[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n  .objective-hud[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(.eyebrow) {\n    display: none;\n  }\n  .objective-hud[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .objective-hud[_ngcontent-%COMP%]   .gold-button[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 10px;\n  }\n  .objective-hud[_ngcontent-%COMP%]   .gold-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .objective-number[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .exploration-help[_ngcontent-%COMP%] {\n    left: 14px;\n    bottom: 19px;\n  }\n  .exploration-help[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], \n   .exploration-help[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .exploration-help[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .world-message[_ngcontent-%COMP%] {\n    left: 14px;\n    bottom: 75px;\n    font-size: 11px;\n    max-width: 82%;\n  }\n  .animal-hud[_ngcontent-%COMP%] {\n    bottom: 16px;\n    right: 10px;\n  }\n  .mechanism-panel[_ngcontent-%COMP%], \n   .journal-panel[_ngcontent-%COMP%] {\n    top: auto;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    max-height: calc(100% - 220px);\n    padding: 19px 23px 25px;\n    border-radius: 17px 17px 0 0;\n    background:\n      linear-gradient(\n        150deg,\n        rgba(20, 56, 66, 0.9803921569),\n        #092631);\n  }\n  .mechanism-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .story[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .clue-strip[_ngcontent-%COMP%] {\n    margin-block: 12px;\n  }\n  .result-panel[_ngcontent-%COMP%] {\n    top: auto;\n    bottom: 20px;\n    right: 5%;\n    width: 90%;\n    max-height: calc(100% - 190px);\n    padding: 25px;\n  }\n  .result-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  .result-seal[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 22px;\n    margin-bottom: 15px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n.in-balance[_ngcontent-%COMP%]   .world-host[_ngcontent-%COMP%], \n.in-balance[_ngcontent-%COMP%]   .vignette[_ngcontent-%COMP%], \n.in-balance[_ngcontent-%COMP%]   .game-bar[_ngcontent-%COMP%] {\n  visibility: hidden;\n  pointer-events: none;\n}\n.grade-picker[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  margin: 16px 0;\n  display: flex;\n  gap: 8px;\n}\n.grade-picker[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  color: #d9c79e;\n  margin-bottom: 8px;\n}\n.grade-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid #b89960;\n  border-radius: 8px;\n  padding: 10px 18px;\n  color: #efe1bf;\n  background: #10272d;\n}\n.grade-picker[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  color: #13282b;\n  background: #e9c482;\n}\n.lock-navigation[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 45;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  max-width: calc(100% - 24px);\n  padding: 3px;\n  border-radius: 10px;\n  background: rgba(11, 37, 44, 0.9607843137);\n  border: 1px solid rgba(188, 163, 111, 0.4);\n}\n.lock-navigation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  min-width: 44px;\n  padding: 8px;\n}\n.lock-navigation[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 0;\n  max-width: 270px;\n  min-height: 44px;\n  font: inherit;\n  color: #fff0cb;\n  background: #123139;\n  border: 0;\n  border-radius: 6px;\n  padding: 6px;\n}\n.lock-navigation[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #91f3da;\n}\napp-machine-workshop[_ngcontent-%COMP%], \napp-gear-lock[_ngcontent-%COMP%], \napp-balance-lock[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 68px 0 0;\n  --%NS%expedition-lock-height: calc(100dvh - 68px);\n}\n/*# sourceMappingURL=expedition.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpeditionComponent, [{
    type: Component,
    args: [{ selector: "app-heist-expedition", imports: [
      WorkspaceToolsComponent,
      FormsModule,
      RouterLink,
      BalanceLockComponent,
      GearLockComponent,
      MachineWorkshopComponent
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main
  class="expedition"
  [class.in-puzzle]="runtime.phase() === 'puzzle'"
  [class.in-balance]="!!balancePuzzle() || !!gearPuzzle() || !!machinePuzzle()"
  [class.in-opening]="runtime.phase() === 'opening'"
>
  <div class="game-content" [inert]="settings()">
    @if (balancePuzzle(); as balance) {
      <app-balance-lock
        [definition]="balance.lock"
        [title]="runtime.current().title"
        [placements]="runtime.draft().placements ?? []"
        [completed]="runtime.phase() === 'celebrate'"
        [paused]="runtime.paused()"
        [reducedMotion]="runtime.reducedMotion()"
        [saveWarning]="runtime.progress.warning() || runtime.message()"
        (moved)="runtime.input({ type: 'balance-place', index: $event.index, side: $event.side })"
        (sound)="audio.cue($event)"
        (pauseRequested)="openSettings()"
        (solved)="submit()"
        (leave)="runtime.phase() === 'celebrate' ? next() : closePuzzle()"
        (continued)="next()"
      />
    }
    @if (gearPuzzle(); as gear) {
      <app-gear-lock
        [definition]="gear.lock"
        [answer]="runtime.draft().placements ?? []"
        [completed]="runtime.phase() === 'celebrate'"
        [paused]="runtime.paused()"
        [reducedMotion]="runtime.reducedMotion()"
        [saveWarning]="runtime.progress.warning() || runtime.message()"
        (changed)="runtime.input({ type: 'gear-change', answer: $event })"
        (solved)="submit()"
        (sound)="audio.cue($event)"
        (pauseRequested)="openSettings()"
        (leave)="runtime.phase() === 'celebrate' ? next() : closePuzzle()"
      />
    }
    @for (step of [runtime.current()]; track step.id) {
      @if (machinePuzzle(); as machine) {
        <app-machine-workshop
          [definition]="machine.lock"
          [answer]="runtime.draft().machine ?? null"
          [grade]="runtime.engine().grade"
          [completed]="runtime.phase() === 'celebrate'"
          [paused]="runtime.paused()"
          [reducedMotion]="runtime.reducedMotion()"
          [saveWarning]="runtime.progress.warning()"
          (changed)="runtime.input({ type: 'machine-change', answer: $event })"
          (solved)="submit()"
          (sound)="audio.cue($event)"
          (pauseRequested)="openSettings()"
          (retrySave)="runtime.progress.retrySave()"
          (leave)="runtime.phase() === 'celebrate' ? next() : closePuzzle()"
        />
      }
    }
    <div #worldHost class="world-host"></div>
    <div class="vignette" aria-hidden="true"></div>
    @if (ready() && runtime.engine().started && !runtime.engine().complete) {
      <nav class="lock-navigation" aria-label="Lock navigation">
        <button
          type="button"
          (click)="visitLock(runtime.engine().index - 1)"
          [disabled]="runtime.engine().index === 0 || runtime.paused()"
          aria-label="Previous lock"
        >
          \u2190
        </button>
        <select
          aria-label="Choose lock"
          [ngModel]="runtime.engine().index"
          (ngModelChange)="visitLock(+$event)"
          [disabled]="runtime.paused()"
        >
          @for (step of mission.steps; track step.id; let i = $index) {
            <option [ngValue]="i">
              {{ i + 1 }} / {{ mission.steps.length }} \xB7 {{ step.place
              }}{{ runtime.engine().solved.has(step.id) ? ' \u2713' : '' }}
            </option>
          }
        </select>
        <button
          type="button"
          (click)="visitLock(runtime.engine().index + 1)"
          [disabled]="runtime.engine().index === mission.steps.length - 1 || runtime.paused()"
          aria-label="Next lock"
        >
          \u2192
        </button>
      </nav>
    }
    <app-workspace-tools
      ><header class="game-bar">
        <a routerLink="/" aria-label="Back to all projects">\u2190 <span>Projects</span></a>
        <div class="game-brand">
          <span aria-hidden="true">\u263E</span>
          <div>{{ mission.title }}<small>SOLO EXPEDITION</small></div>
        </div>
        @if (runtime.phase() !== 'opening') {
          <div class="rescue-counter" aria-live="polite">
            <strong
              >{{ runtime.engine().rescued }}<span> / {{ runtime.totalAnimals }}</span></strong
            ><small>{{ runtime.engine().complete ? 'HOME SAFE' : 'ANIMALS FREED' }}</small>
          </div>
          <div class="header-actions">
            <button
              (click)="runtime.openJournal()"
              [disabled]="settings()"
              aria-label="Open rescue journal"
            >
              Journal</button
            ><button (click)="toggleSound()" [attr.aria-pressed]="runtime.audioEnabled()">
              {{ runtime.audioEnabled() ? 'Sound on' : 'Sound off' }}</button
            ><button (click)="openSettings()">Pause</button>
          </div>
        } @else {
          <span class="chapter-tag">CHAPTER 01 \xB7 THE CASTLE</span>
        }
      </header></app-workspace-tools
    >

    @if (!ready() || error()) {
      <section class="loading-screen" role="status">
        <span class="moon" aria-hidden="true">\u263E</span>
        <h1>{{ error() ? 'The castle is out of reach' : 'Lighting the lanterns\u2026' }}</h1>
        <p>{{ error() || 'Preparing your rescue adventure' }}</p>
        @if (error()) {
          <button class="gold-button" (click)="reload()">Reload the game</button>
        }
      </section>
    } @else if (runtime.phase() === 'opening') {
      <section class="opening">
        <p class="eyebrow"><span></span> A RESCUE ADVENTURE POWERED BY MATH</p>
        <h1>{{ mission.title }}</h1>
        <p class="opening-subtitle">{{ mission.subtitle }}</p>
        <p class="briefing">{{ mission.briefing }}</p>
        @if (mission.mathGrades; as grades) {
          <fieldset class="grade-picker" [disabled]="runtime.engine().started">
            <legend>Choose your math level</legend>
            @for (grade of grades; track grade) {
              <button
                (click)="runtime.setGrade(grade)"
                [attr.aria-pressed]="runtime.engine().grade === grade"
              >
                Grade {{ grade }}
              </button>
            }
          </fieldset>
        }
        <div class="opening-facts">
          <span
            ><b>{{ runtime.totalAnimals }}</b> animals to save</span
          ><span
            ><b>{{ mission.steps.length }}</b> mechanisms to master</span
          >
        </div>
        @if (runtime.progress.warning()) {
          <p class="warning" role="alert">{{ runtime.progress.warning() }}</p>
        }
        @if (runtime.progress.restoreBlocked()) {
          <button class="gold-button" (click)="restart()">Start a fresh rescue \u2192</button>
        } @else {
          <button class="gold-button begin" (click)="start()">
            {{ runtime.engine().started ? 'Continue your rescue' : 'Enter the castle' }}
            <span>\u2192</span>
          </button>
        }
        <div class="opening-controls">
          <span><kbd>W A S D</kbd> or arrow keys to walk</span
          ><span><kbd>E</kbd> inspect a mechanism</span><span>Click or tap to move</span>
        </div>
        <p class="thinking-note">Take time to think. The adventure waits while you solve.</p>
      </section>
    } @else {
      @if (runtime.phase() === 'explore') {
        <section class="objective-hud" aria-label="Current rescue objective">
          <div class="objective-number">
            {{ runtime.engine().index + 1 }}<small>/ {{ mission.steps.length }}</small>
          </div>
          <div>
            <p class="eyebrow">{{ runtime.current().place }}</p>
            <h1>{{ runtime.current().title }}</h1>
            <p>
              {{
                runtime.nearby()
                  ? 'You are close enough. Inspect the mechanism.'
                  : 'Follow the golden beacon through the castle.'
              }}
            </p>
          </div>
          <button class="gold-button" (click)="runtime.inspect()">
            {{
              ['balance-lock', 'gear-lock', 'machine-lock'].includes(runtime.current().puzzle.type)
                ? 'Solve lock'
                : runtime.nearby()
                  ? 'Inspect [E]'
                  : 'Walk to clue'
            }}
            <span>\u2192</span>
          </button>
        </section>
        <div class="exploration-help">
          <kbd>W A S D</kbd><span>Move</span><kbd>E</kbd><span>Inspect</span
          ><button (click)="toggleMap()">
            {{ overview() ? 'Follow my rescuer' : 'View the castle map' }}
          </button>
        </div>
        <p class="world-message" aria-live="polite">{{ runtime.message() }}</p>
        <div class="animal-hud" aria-label="Animals in your rescue team">
          @for (a of mission.animals; track a.id) {
            <div [class.rescued]="runtime.engine().released.has(a.id)">
              <svg class="animal-sprite" [attr.viewBox]="spriteViewBox(a.id)" aria-hidden="true">
                <svg
                  [attr.width]="spriteFrame(a.id)[2]"
                  [attr.height]="spriteFrame(a.id)[3]"
                  overflow="hidden"
                >
                  <image
                    [attr.href]="runtime.definition.animalAtlas"
                    [attr.x]="-spriteFrame(a.id)[0]"
                    [attr.y]="-spriteFrame(a.id)[1]"
                    width="1"
                    height="1"
                  />
                </svg></svg
              ><span
                >{{ a.name
                }}<small>{{
                  runtime.engine().released.has(a.id) ? 'Following you' : 'Still in a pen'
                }}</small></span
              >
            </div>
          }
        </div>
      }

      @if (runtime.phase() === 'puzzle' && !balancePuzzle() && !gearPuzzle() && !machinePuzzle()) {
        <section
          #panel
          class="mechanism-panel"
          tabindex="-1"
          aria-label="Operate the math mechanism"
        >
          <div class="panel-topline">
            <span class="eyebrow"
              >MECHANISM {{ runtime.engine().index + 1 }} / {{ mission.steps.length }}</span
            ><button
              class="close-button"
              (click)="closePuzzle()"
              aria-label="Close mechanism and return to the castle"
            >
              \xD7
            </button>
          </div>
          <p class="skill-label">{{ runtime.current().puzzle.skill }}</p>
          <h2>{{ runtime.current().title }}</h2>
          <p class="story">{{ runtime.current().story }}</p>
          <div class="clue-strip">
            @for (clue of runtime.current().clues; track clue.label) {
              <div>
                <span>{{ clue.label }}</span
                ><strong>{{ clue.value }}</strong>
              </div>
            }
          </div>
          @if (runtime.current().puzzle; as p) {
            <form (ngSubmit)="submit()">
              @if (p.type === 'code' && p.countAnimals) {
                <div class="counting-list" aria-label="Count the animals">
                  @for (a of mission.animals; track a.id) {
                    <div>
                      <span>{{ a.name }}</span>
                      <div>
                        @for (n of sequence(a.count); track n) {
                          <button
                            type="button"
                            (click)="input({ type: 'count', id: a.id + '-' + n })"
                            [attr.aria-label]="a.name + ' animal ' + (n + 1) + ': mark counted'"
                            [attr.aria-pressed]="runtime.draft().counted.includes(a.id + '-' + n)"
                          >
                            <svg
                              class="animal-sprite"
                              [attr.viewBox]="spriteViewBox(a.id)"
                              aria-hidden="true"
                            >
                              <svg
                                [attr.width]="spriteFrame(a.id)[2]"
                                [attr.height]="spriteFrame(a.id)[3]"
                                overflow="hidden"
                              >
                                <image
                                  [attr.href]="runtime.definition.animalAtlas"
                                  [attr.x]="-spriteFrame(a.id)[0]"
                                  [attr.y]="-spriteFrame(a.id)[1]"
                                  width="1"
                                  height="1"
                                />
                              </svg>
                            </svg>
                            @if (runtime.draft().counted.includes(a.id + '-' + n)) {
                              <b>\u2713</b>
                            }
                          </button>
                        }
                      </div>
                    </div>
                  }
                </div>
              }
              <p class="question">{{ p.prompt }}</p>
              @switch (p.type) {
                @case ('code') {
                  <div class="dial-controls" role="group" aria-label="Combination dials">
                    @for (label of p.labels; track $index; let i = $index) {
                      <div>
                        <label>{{ label }}</label
                        ><button
                          type="button"
                          (click)="input({ type: 'dial', index: i, change: 1 })"
                          [attr.aria-label]="'Increase ' + label + ' digit'"
                        >
                          \u2303</button
                        ><output aria-live="polite" [attr.aria-label]="label + ' digit'">{{
                          runtime.draft().digits[i]
                        }}</output
                        ><button
                          type="button"
                          (click)="input({ type: 'dial', index: i, change: -1 })"
                          [attr.aria-label]="'Decrease ' + label + ' digit'"
                        >
                          \u2304
                        </button>
                      </div>
                    }
                  </div>
                }
                @case ('timing') {
                  <div class="clock-values">
                    <div>
                      <span>DEPART</span
                      ><strong>{{ runtime.draft().departure }}<small> s</small></strong>
                    </div>
                    <span>\u2192</span>
                    <div>
                      <span>ARRIVE</span
                      ><strong
                        >{{ runtime.draft().departure + p.crossing }}<small> s</small></strong
                      >
                    </div>
                  </div>
                  <label for="patrol-time">Set the departure second</label
                  ><input
                    id="patrol-time"
                    name="departure"
                    type="range"
                    min="0"
                    [max]="p.cycle - 1"
                    step="1"
                    [ngModel]="runtime.draft().departure"
                    (ngModelChange)="runtime.setDeparture(+$event)"
                  />
                  <p class="control-note">Green on the clock: lookout faces away.</p>
                }
                @case ('balance') {
                  <div class="weight-controls" role="group" aria-label="Counterweights">
                    @for (weight of p.weights; track $index; let i = $index) {
                      <button
                        type="button"
                        (click)="input({ type: 'weight', index: i })"
                        [attr.aria-pressed]="runtime.draft().weights.includes(i)"
                      >
                        <strong>{{ weight }}<small> kg</small></strong
                        ><span>{{
                          runtime.draft().weights.includes(i) ? 'On lift \u2713' : 'Add weight'
                        }}</span>
                      </button>
                    }
                  </div>
                  <p class="control-note" aria-live="polite">
                    {{ weightTotal() }} kg on the counterweight. Tap again to remove.
                  </p>
                }
                @case ('number') {
                  <label for="mechanism-number">Your answer in {{ p.unit }}</label>
                  <div class="number-control">
                    <button type="button" (click)="adjustQuantity(-1)" aria-label="Decrease answer">
                      \u2212</button
                    ><input
                      id="mechanism-number"
                      type="number"
                      name="answer"
                      min="0"
                      [max]="p.max"
                      step="any"
                      inputmode="decimal"
                      autocomplete="off"
                      placeholder="?"
                      [ngModel]="runtime.draft().quantity"
                      (ngModelChange)="setQuantity($event)"
                    /><button
                      type="button"
                      (click)="adjustQuantity(1)"
                      aria-label="Increase answer"
                    >
                      +</button
                    ><span>{{ p.unit }}</span>
                  </div>
                }
              }
              <p class="answer-feedback" aria-live="polite">{{ runtime.message() }}</p>
              <div class="mechanism-actions">
                <button type="submit" class="gold-button">
                  {{ runtime.current().action }} <span>\u2192</span></button
                ><button
                  class="hint-button"
                  type="button"
                  (click)="runtime.hint.set(!runtime.hint())"
                  [attr.aria-expanded]="runtime.hint()"
                >
                  {{ runtime.hint() ? 'Hide hint' : 'Need a clue?' }}
                </button>
                @if (runtime.hint()) {
                  <p class="hint">{{ p.hint }}</p>
                }
              </div>
            </form>
          }
        </section>
      }
      @if (
        runtime.phase() === 'celebrate' && !balancePuzzle() && !gearPuzzle() && !machinePuzzle()
      ) {
        <section #panel class="result-panel" tabindex="-1" aria-label="Mechanism unlocked">
          <div class="result-seal" aria-hidden="true">\u2713</div>
          <p class="eyebrow">MECHANISM UNLOCKED</p>
          <h2>{{ runtime.current().success }}</h2>
          <p>{{ runtime.current().explanation }}</p>
          <div class="result-math">
            <span>{{ runtime.current().puzzle.skill }}</span
            ><strong>\u2713 Solved</strong>
          </div>
          <button class="gold-button" (click)="next()">
            {{
              runtime.engine().index === mission.steps.length - 1
                ? 'Bring everyone home'
                : 'Continue the rescue'
            }}
            <span>\u2192</span>
          </button>
        </section>
      }
      @if (runtime.phase() === 'journal') {
        <section #panel class="journal-panel" tabindex="-1" aria-label="Rescue journal">
          <div class="panel-topline">
            <p class="eyebrow">YOUR RESCUE JOURNAL</p>
            <button
              class="close-button"
              (click)="runtime.closeJournal()"
              aria-label="Close journal"
            >
              \xD7
            </button>
          </div>
          <h2>The math behind the escape</h2>
          <p>Every opened mechanism leaves a clue about your thinking.</p>
          <div class="journal-steps">
            @for (step of mission.steps; track step.id; let i = $index) {
              <article [class.solved]="runtime.engine().solved.has(step.id)">
                <span>{{ runtime.engine().solved.has(step.id) ? '\u2713' : i + 1 }}</span>
                <div>
                  <h3>{{ step.title }}</h3>
                  <p>
                    {{
                      runtime.engine().solved.has(step.id)
                        ? step.explanation
                        : 'This mechanism is still waiting for you.'
                    }}
                  </p>
                </div>
              </article>
            }
          </div>
        </section>
      }
      @if (runtime.phase() === 'complete') {
        <section #panel class="ending" tabindex="-1" aria-label="Rescue complete">
          <p class="eyebrow">THE SANCTUARY IS WAITING</p>
          <h1>Every animal.<br /><em>Home.</em></h1>
          <div class="ending-count">
            <strong>{{ runtime.totalAnimals }} / {{ runtime.totalAnimals }}</strong
            ><span>ANIMALS RESCUED</span>
          </div>
          <p>{{ mission.finale }}</p>
          <div class="ending-actions">
            <button class="gold-button" (click)="runtime.openJournal()">
              Read your rescue journal \u2192</button
            ><button (click)="openSettings(); restartQuestion.set(true)">Play again</button>
          </div>
        </section>
      }
      @if (runtime.progress.warning()) {
        <p class="save-warning" role="alert">{{ runtime.progress.warning() }}</p>
      }
    }
  </div>
  @if (settings()) {
    <div class="pause-backdrop">
      <section
        #settingsPanel
        tabindex="-1"
        class="pause-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Game paused"
      >
        <p class="eyebrow">THE RESCUE CAN WAIT</p>
        <h2>{{ restartQuestion() ? 'Begin a new rescue?' : 'Take a breath.' }}</h2>
        @if (restartQuestion()) {
          <p>This replaces this rescue\u2019s saved progress.</p>
          <button class="gold-button" (click)="restart()">Start a new rescue \u2192</button
          ><button class="secondary-button" (click)="restartQuestion.set(false)">
            Keep this rescue
          </button>
        } @else {
          <p>The animals and your progress are safe.</p>
          <button class="gold-button" (click)="closeSettings()">Back to the castle \u2192</button
          ><button class="secondary-button" (click)="toggleSound()">
            {{ runtime.audioEnabled() ? 'Turn sound off' : 'Turn sound on' }}</button
          ><button
            class="secondary-button"
            (click)="runtime.reducedMotion.set(!runtime.reducedMotion())"
            [attr.aria-pressed]="runtime.reducedMotion()"
          >
            Reduced motion: {{ runtime.reducedMotion() ? 'on' : 'off' }}</button
          ><button class="text-button" (click)="restartQuestion.set(true)">Start over</button>
        }
      </section>
    </div>
  }
</main>
`, styles: ['/* src/app/templates/heist/escape/expedition/expedition.component.scss */\n:host {\n  display: block;\n  color: #f1ebd9;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.expedition {\n  --gold: #e7c586;\n  --muted: #b9c9c5;\n  position: relative;\n  isolation: isolate;\n  height: 100dvh;\n  min-height: 580px;\n  overflow: hidden;\n  background: #091b24;\n}\n.world-host,\n.vignette {\n  position: absolute;\n  inset: 0;\n}\n.game-content {\n  position: absolute;\n  inset: 0;\n}\n.world-host {\n  touch-action: none;\n}\n.vignette {\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(6, 26, 35, 0.8784313725),\n      transparent 22%,\n      transparent 72%,\n      rgba(5, 25, 34, 0.7411764706));\n  box-shadow: inset 0 0 140px rgba(3, 21, 26, 0.4784313725);\n}\nbutton,\na,\ninput {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  cursor: pointer;\n  color: inherit;\n  font: inherit;\n  border: 1px solid rgba(214, 216, 180, 0.2196078431);\n  background: rgba(18, 49, 57, 0.8745098039);\n  border-radius: 7px;\n  padding: 10px 15px;\n  transition: background 0.18s, border-color 0.18s;\n}\nbutton:hover {\n  background: #25504c;\n  border-color: #d6c18a;\n}\nbutton:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #91f3da;\n  outline-offset: 4px;\n}\nsection[tabindex]:focus {\n  outline: none;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\np {\n  line-height: 1.55;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\nh1,\nh2,\nh3 {\n  font-family:\n    Georgia,\n    "Times New Roman",\n    serif;\n  font-weight: 400;\n}\n.game-bar {\n  position: absolute;\n  z-index: 12;\n  inset: 0 0 auto;\n  height: 88px;\n  display: flex;\n  align-items: center;\n  gap: 27px;\n  padding: 0 35px;\n  border-bottom: 1px solid rgba(212, 205, 158, 0.1450980392);\n  background: linear-gradient(rgba(11, 32, 44, 0.8509803922), rgba(11, 32, 44, 0.2823529412));\n}\n.game-bar > a {\n  font-size: 14px;\n  color: #d0dbd5;\n  padding: 12px 0;\n}\n.game-brand {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  font-family: Georgia, serif;\n  font-size: 20px;\n}\n.game-brand > span {\n  color: var(--gold);\n  font-size: 34px;\n}\n.game-brand small,\n.rescue-counter small {\n  display: block;\n  font: 9px/1.6 "Trebuchet MS", sans-serif;\n  letter-spacing: 2px;\n  color: #b5c9c5;\n  margin-top: 5px;\n}\n.chapter-tag {\n  margin-left: auto;\n  font-size: 10px;\n  letter-spacing: 2px;\n  color: #c6cfbe;\n}\n.rescue-counter {\n  margin-left: auto;\n  text-align: right;\n}\n.rescue-counter strong {\n  font: 23px Georgia, serif;\n  color: var(--gold);\n}\n.rescue-counter strong span {\n  color: #b0c5c1;\n  font-size: 16px;\n}\n.header-actions {\n  display: flex;\n  gap: 8px;\n}\n.header-actions button {\n  font-size: 12px;\n  padding: 9px 12px;\n  background: rgba(16, 46, 54, 0.5411764706);\n}\n.eyebrow {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  color: var(--gold);\n}\n.gold-button {\n  color: #192d2a;\n  background:\n    linear-gradient(\n      120deg,\n      #f1dba2,\n      #d6af65);\n  border: 1px solid #f1dca0;\n  font-weight: 700;\n  border-radius: 5px;\n  box-shadow: 0 5px 20px rgba(4, 23, 25, 0.231372549);\n}\n.gold-button:hover {\n  background: #ffe7ad;\n  border-color: #fff2c9;\n}\n.gold-button span {\n  margin-left: 16px;\n}\n.opening,\n.ending {\n  position: absolute;\n  z-index: 5;\n  top: 88px;\n  bottom: 0;\n  left: 0;\n  width: 62%;\n  padding: clamp(32px, 7vh, 85px) 6.5%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(6, 26, 35, 0.9490196078),\n      rgba(7, 29, 37, 0.8745098039) 58%,\n      transparent);\n}\n.opening h1,\n.ending h1 {\n  font-size: clamp(45px, 5.5vw, 80px);\n  line-height: 1.03;\n  letter-spacing: -2px;\n  max-width: 590px;\n  margin: 24px 0;\n  text-wrap: balance;\n}\n.opening em,\n.ending em {\n  color: #eacb8e;\n  font-weight: 400;\n}\n.opening-subtitle {\n  color: #eeddb9;\n  max-width: 410px;\n  font-size: 17px;\n}\n.briefing {\n  max-width: 440px;\n  color: #b9cfcd;\n  font-size: 14px;\n  margin-top: 14px;\n}\n.opening-facts {\n  display: flex;\n  gap: 25px;\n  margin: 26px 0;\n  font-size: 12px;\n  color: #b6c8c2;\n}\n.opening-facts b {\n  display: block;\n  color: #e8d3a4;\n  font: 27px Georgia, serif;\n  margin-bottom: 5px;\n}\n.begin {\n  padding: 16px 23px;\n  min-width: 247px;\n  text-align: left;\n}\n.begin span {\n  float: right;\n}\n.opening-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px 17px;\n  max-width: 440px;\n  margin-top: 23px;\n  color: #b4c8c7;\n  font-size: 10px;\n}\nkbd {\n  border: 1px solid rgba(181, 200, 189, 0.3215686275);\n  padding: 3px 6px;\n  border-radius: 4px;\n  font: 10px "Trebuchet MS", sans-serif;\n  color: #ebebd8;\n  background: rgba(19, 55, 59, 0.5019607843);\n}\n.thinking-note {\n  font-size: 11px;\n  color: #8fadac;\n  margin-top: 13px;\n}\n.objective-hud {\n  position: absolute;\n  z-index: 4;\n  left: 30px;\n  top: 111px;\n  max-width: min(610px, 100% - 60px);\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 16px 18px;\n  background:\n    linear-gradient(\n      110deg,\n      rgba(10, 40, 53, 0.9411764706),\n      rgba(12, 49, 59, 0.7921568627));\n  border: 1px solid rgba(178, 187, 145, 0.2784313725);\n  border-left: 3px solid var(--gold);\n  border-radius: 5px;\n  box-shadow: 0 12px 30px rgba(0, 19, 24, 0.2509803922);\n}\n.objective-number {\n  font: 35px Georgia, serif;\n  color: var(--gold);\n  padding-right: 12px;\n  border-right: 1px solid rgba(197, 199, 161, 0.2078431373);\n}\n.objective-number small {\n  display: block;\n  font: 10px "Trebuchet MS", sans-serif;\n  color: #a0bab8;\n  text-align: center;\n}\n.objective-hud h1 {\n  font-size: 22px;\n  margin: 5px 0;\n}\n.objective-hud p:not(.eyebrow) {\n  color: #b9cecc;\n  font-size: 11px;\n}\n.objective-hud .gold-button {\n  flex-shrink: 0;\n  font-size: 12px;\n  padding: 12px;\n}\n.exploration-help {\n  position: absolute;\n  z-index: 4;\n  bottom: 31px;\n  left: 30px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  color: #cfddd2;\n}\n.exploration-help button {\n  margin-left: 12px;\n  font-size: 11px;\n}\n.world-message {\n  position: absolute;\n  z-index: 3;\n  bottom: 83px;\n  left: 30px;\n  font-size: 12px;\n  text-shadow: 0 2px 3px #001116;\n  max-width: 60%;\n}\n.animal-hud {\n  position: absolute;\n  bottom: 24px;\n  right: 26px;\n  z-index: 3;\n  display: flex;\n  gap: 14px;\n}\n.animal-hud > div {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  opacity: 0.75;\n}\n.animal-hud > div.rescued {\n  opacity: 1;\n}\n.animal-hud > div > span:last-child {\n  font-size: 12px;\n}\n.animal-hud small {\n  display: block;\n  font-size: 9px;\n  color: #b6ccc7;\n  margin-top: 4px;\n}\n.animal-sprite {\n  display: inline-block;\n  flex-shrink: 0;\n  height: 46px;\n  width: 43px;\n  overflow: hidden;\n}\n.mechanism-panel,\n.result-panel,\n.journal-panel {\n  position: absolute;\n  z-index: 8;\n  right: 22px;\n  top: 105px;\n  bottom: 24px;\n  width: 392px;\n  padding: 23px;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  border: 1px solid rgba(179, 184, 145, 0.3960784314);\n  border-radius: 11px;\n  background:\n    linear-gradient(\n      150deg,\n      rgba(20, 56, 66, 0.968627451),\n      rgba(9, 38, 49, 0.9803921569));\n  box-shadow: 0 15px 50px rgba(0, 17, 23, 0.5019607843);\n  scrollbar-width: thin;\n  scrollbar-color: #627e77 #0b2831;\n}\n.panel-topline {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.close-button {\n  font-size: 23px;\n  line-height: 1;\n  padding: 3px 9px;\n  background: transparent;\n  border: none;\n}\n.skill-label {\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: #9bd7c5;\n  margin-bottom: 9px;\n  text-transform: uppercase;\n}\n.mechanism-panel h2,\n.journal-panel h2 {\n  font-size: 29px;\n  line-height: 1.1;\n  margin-bottom: 12px;\n}\n.story,\n.journal-panel > p {\n  font-size: 12px;\n  color: #c4d4ce;\n}\n.clue-strip {\n  display: flex;\n  margin: 17px 0;\n  border-block: 1px solid rgba(194, 205, 170, 0.1764705882);\n  padding: 12px 0;\n  gap: 12px;\n}\n.clue-strip div {\n  flex: 1;\n}\n.clue-strip span {\n  display: block;\n  font-size: 9px;\n  color: #9ebbb5;\n  margin-bottom: 6px;\n}\n.clue-strip strong {\n  font-size: 12px;\n  font-weight: 400;\n  color: #eddeb7;\n}\n.question {\n  font-size: 14px;\n  line-height: 1.5;\n  color: #f4e4bf;\n  margin: 14px 0;\n}\nform > label {\n  font-size: 11px;\n  color: #c1d4cf;\n  display: block;\n  margin-bottom: 8px;\n}\n.counting-list > div {\n  display: flex;\n  gap: 7px;\n  align-items: center;\n}\n.counting-list > div > span {\n  width: 47px;\n  font-size: 10px;\n  color: #c8d9d2;\n}\n.counting-list > div > div {\n  display: flex;\n  flex: 1;\n  gap: 3px;\n}\n.counting-list button {\n  position: relative;\n  border: 1px solid transparent;\n  padding: 0;\n  background: rgba(255, 255, 255, 0.0196078431);\n}\n.counting-list button[aria-pressed=true] {\n  border-color: #8bd2b5;\n  background: rgba(132, 214, 176, 0.1647058824);\n}\n.counting-list .animal-sprite {\n  width: 34px;\n  height: 36px;\n}\n.counting-list b {\n  position: absolute;\n  right: 0;\n  top: 0;\n  color: #9ff3c4;\n  font-size: 11px;\n}\n.dial-controls {\n  display: flex;\n  justify-content: center;\n  gap: 14px;\n  margin: 12px 0;\n}\n.dial-controls > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.dial-controls label {\n  font-size: 10px;\n  color: #c3d4cc;\n  margin-bottom: 6px;\n}\n.dial-controls button {\n  width: 58px;\n  padding: 2px;\n  color: var(--gold);\n  font-size: 19px;\n  border-radius: 4px;\n}\n.dial-controls output {\n  width: 58px;\n  text-align: center;\n  font: 35px/1.4 Georgia, serif;\n  color: #f9e4b2;\n  background: #061d24;\n  border-inline: 1px solid rgba(211, 181, 124, 0.2784313725);\n}\n.clock-values {\n  display: flex;\n  gap: 23px;\n  align-items: center;\n  justify-content: center;\n  background: #09232c;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-radius: 6px;\n}\n.clock-values div > span {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #9fbab2;\n}\n.clock-values strong {\n  font: 32px/1.4 Georgia, serif;\n  color: var(--gold);\n}\n.clock-values small {\n  font-size: 16px;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: #eac687;\n  cursor: pointer;\n  height: 27px;\n}\n.control-note {\n  font-size: 10px;\n  color: #b8cfc8;\n  margin-top: 10px;\n}\n.weight-controls {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 7px;\n}\n.weight-controls button {\n  padding: 14px 4px;\n}\n.weight-controls button[aria-pressed=true] {\n  background: #336357;\n  border-color: #b0dab6;\n}\n.weight-controls strong {\n  font: 26px Georgia, serif;\n  color: var(--gold);\n}\n.weight-controls small {\n  font-size: 10px;\n}\n.weight-controls span {\n  display: block;\n  margin-top: 8px;\n  font-size: 9px;\n}\n.number-control {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.number-control button {\n  font-size: 22px;\n  padding: 10px 14px;\n}\n.number-control input {\n  width: 100px;\n  height: 53px;\n  border: 1px solid rgba(197, 181, 123, 0.4745098039);\n  border-radius: 5px;\n  color: #f2d9a3;\n  background: #08232c;\n  font: 30px Georgia, serif;\n  text-align: center;\n}\n.number-control > span {\n  font-size: 12px;\n  color: #bdcdc2;\n}\n.answer-feedback {\n  font-size: 12px;\n  color: #ffcf96;\n  margin-top: 14px;\n}\n.answer-feedback:empty {\n  display: none;\n}\n.mechanism-actions {\n  margin-top: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mechanism-actions .gold-button {\n  padding: 13px 14px;\n  font-size: 13px;\n}\n.hint-button,\n.text-button {\n  border: none;\n  background: transparent;\n  color: #bdd4c7;\n  font-size: 11px;\n}\n.hint {\n  padding: 12px;\n  background: rgba(202, 228, 174, 0.0705882353);\n  border-left: 2px solid #95bd9c;\n  font-size: 12px;\n  color: #d1dfc9;\n}\n.result-panel {\n  top: 24%;\n  bottom: auto;\n  padding: 31px;\n}\n.result-seal {\n  width: 57px;\n  height: 57px;\n  border-radius: 50%;\n  border: 1px solid #9bc8a3;\n  display: grid;\n  place-items: center;\n  color: #b6e9ba;\n  background: rgba(67, 101, 73, 0.3019607843);\n  font-size: 28px;\n  margin-bottom: 23px;\n}\n.result-panel h2 {\n  font-size: 32px;\n  line-height: 1.1;\n  margin: 15px 0;\n}\n.result-panel > p:not(.eyebrow) {\n  color: #c4d6cc;\n  font-size: 14px;\n}\n.result-math {\n  display: flex;\n  gap: 15px;\n  justify-content: space-between;\n  padding: 17px 0;\n  margin: 15px 0;\n  border-block: 1px solid rgba(208, 210, 170, 0.1647058824);\n  font-size: 11px;\n  color: #b6cbbc;\n}\n.result-math strong {\n  color: #c7eaba;\n}\n.result-panel .gold-button {\n  width: 100%;\n  font-size: 13px;\n}\n.journal-panel {\n  width: 480px;\n}\n.journal-steps {\n  margin-top: 20px;\n}\n.journal-steps article {\n  display: flex;\n  gap: 14px;\n  padding: 15px 0;\n  border-top: 1px solid rgba(197, 208, 170, 0.1607843137);\n  color: #9fb8b2;\n}\n.journal-steps article > span {\n  flex: 0 0 27px;\n  color: #a1baab;\n  font: 22px Georgia, serif;\n}\n.journal-steps h3 {\n  font-size: 19px;\n  margin-bottom: 6px;\n}\n.journal-steps p {\n  font-size: 12px;\n}\n.journal-steps .solved {\n  color: #e4e0c7;\n}\n.journal-steps .solved > span {\n  color: #b2e0aa;\n}\n.ending > p:not(.eyebrow) {\n  max-width: 400px;\n  color: #c6d9ce;\n  font-size: 14px;\n}\n.ending-count {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin-bottom: 23px;\n}\n.ending-count strong {\n  font: 34px Georgia, serif;\n  color: #edcf90;\n}\n.ending-count span {\n  font-size: 9px;\n  letter-spacing: 2px;\n  color: #b2cdbb;\n}\n.ending-actions {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin-top: 30px;\n}\n.ending-actions button {\n  font-size: 12px;\n}\n.loading-screen {\n  position: absolute;\n  z-index: 30;\n  inset: 0;\n  background: #0a252e;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 23px;\n  text-align: center;\n  padding: 30px;\n}\n.loading-screen h1 {\n  font-size: 34px;\n}\n.loading-screen p {\n  color: #a8c9c3;\n  font-size: 14px;\n}\n.moon {\n  color: var(--gold);\n  font-size: 60px;\n}\n.pause-backdrop {\n  position: absolute;\n  z-index: 60;\n  inset: 0;\n  background: rgba(0, 16, 25, 0.7215686275);\n  -webkit-backdrop-filter: blur(7px);\n  backdrop-filter: blur(7px);\n  display: grid;\n  place-items: center;\n  padding: 25px;\n}\n.pause-panel {\n  width: min(370px, 100%);\n  background: #12333d;\n  border: 1px solid rgba(214, 194, 136, 0.5215686275);\n  border-radius: 12px;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  box-shadow: 0 20px 90px #001017;\n}\n.pause-panel h2 {\n  font-size: 34px;\n}\n.pause-panel > p:not(.eyebrow) {\n  color: #b9cec3;\n  font-size: 13px;\n}\n.pause-panel button {\n  font-size: 13px;\n}\n.warning,\n.save-warning {\n  color: #ffd9a2;\n  font-size: 12px;\n  padding: 10px;\n  background: #482e25;\n  border-radius: 4px;\n}\n.save-warning {\n  position: absolute;\n  z-index: 14;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n@media (max-height: 760px) and (min-width: 900px) {\n  .opening {\n    padding-top: 25px;\n    padding-bottom: 20px;\n  }\n  .opening h1 {\n    font-size: 53px;\n    margin: 15px 0;\n  }\n  .opening-facts {\n    margin: 17px 0;\n  }\n  .opening-controls {\n    margin-top: 15px;\n  }\n  .mechanism-panel {\n    padding: 17px 21px;\n  }\n  .mechanism-panel h2 {\n    font-size: 25px;\n  }\n}\n@media (max-width: 1100px) {\n  .game-bar {\n    padding-inline: 20px;\n    gap: 18px;\n  }\n  .animal-hud {\n    gap: 9px;\n  }\n  .animal-hud > div > span:last-child {\n    display: none;\n  }\n  .opening {\n    width: 70%;\n    padding-left: 6%;\n  }\n}\n@media (max-width: 899px) {\n  .expedition {\n    min-height: 600px;\n  }\n  .game-bar {\n    height: 72px;\n    padding: 0 16px;\n    gap: 12px;\n    flex-wrap: wrap;\n  }\n  .game-bar > a span,\n  .game-brand > span,\n  .chapter-tag,\n  .game-brand small {\n    display: none;\n  }\n  .game-brand {\n    font-size: 16px;\n    max-width: 190px;\n  }\n  .rescue-counter {\n    margin-left: auto;\n  }\n  .rescue-counter small {\n    display: none;\n  }\n  .header-actions {\n    position: absolute;\n    top: 83px;\n    right: 13px;\n    gap: 5px;\n  }\n  .header-actions button {\n    font-size: 10px;\n    padding: 8px;\n  }\n  .opening,\n  .ending {\n    top: 72px;\n    width: 100%;\n    padding: 35px 7%;\n    background:\n      linear-gradient(\n        90deg,\n        rgba(6, 26, 35, 0.9294117647),\n        rgba(7, 29, 37, 0.6823529412) 75%,\n        rgba(7, 29, 37, 0.168627451));\n  }\n  .opening h1,\n  .ending h1 {\n    font-size: clamp(46px, 9vw, 70px);\n    max-width: 550px;\n  }\n  .briefing {\n    font-size: 13px;\n    max-width: 410px;\n  }\n  .opening-subtitle {\n    font-size: 15px;\n  }\n  .objective-hud {\n    top: 127px;\n    left: 14px;\n    max-width: calc(100% - 28px);\n    padding: 12px;\n    gap: 10px;\n  }\n  .objective-hud h1 {\n    font-size: 19px;\n  }\n  .objective-hud p:not(.eyebrow) {\n    display: none;\n  }\n  .objective-hud .eyebrow {\n    font-size: 9px;\n  }\n  .objective-hud .gold-button {\n    font-size: 11px;\n    padding: 10px;\n  }\n  .objective-hud .gold-button span {\n    display: none;\n  }\n  .objective-number {\n    font-size: 28px;\n  }\n  .exploration-help {\n    left: 14px;\n    bottom: 19px;\n  }\n  .exploration-help kbd,\n  .exploration-help > span {\n    display: none;\n  }\n  .exploration-help button {\n    margin-left: 0;\n  }\n  .world-message {\n    left: 14px;\n    bottom: 75px;\n    font-size: 11px;\n    max-width: 82%;\n  }\n  .animal-hud {\n    bottom: 16px;\n    right: 10px;\n  }\n  .mechanism-panel,\n  .journal-panel {\n    top: auto;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    max-height: calc(100% - 220px);\n    padding: 19px 23px 25px;\n    border-radius: 17px 17px 0 0;\n    background:\n      linear-gradient(\n        150deg,\n        rgba(20, 56, 66, 0.9803921569),\n        #092631);\n  }\n  .mechanism-panel h2 {\n    font-size: 26px;\n  }\n  .story {\n    font-size: 12px;\n  }\n  .clue-strip {\n    margin-block: 12px;\n  }\n  .result-panel {\n    top: auto;\n    bottom: 20px;\n    right: 5%;\n    width: 90%;\n    max-height: calc(100% - 190px);\n    padding: 25px;\n  }\n  .result-panel h2 {\n    font-size: 29px;\n  }\n  .result-seal {\n    width: 40px;\n    height: 40px;\n    font-size: 22px;\n    margin-bottom: 15px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n.in-balance .world-host,\n.in-balance .vignette,\n.in-balance .game-bar {\n  visibility: hidden;\n  pointer-events: none;\n}\n.grade-picker {\n  border: 0;\n  padding: 0;\n  margin: 16px 0;\n  display: flex;\n  gap: 8px;\n}\n.grade-picker legend {\n  color: #d9c79e;\n  margin-bottom: 8px;\n}\n.grade-picker button {\n  border: 1px solid #b89960;\n  border-radius: 8px;\n  padding: 10px 18px;\n  color: #efe1bf;\n  background: #10272d;\n}\n.grade-picker button[aria-pressed=true] {\n  color: #13282b;\n  background: #e9c482;\n}\n.lock-navigation {\n  position: absolute;\n  top: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 45;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  max-width: calc(100% - 24px);\n  padding: 3px;\n  border-radius: 10px;\n  background: rgba(11, 37, 44, 0.9607843137);\n  border: 1px solid rgba(188, 163, 111, 0.4);\n}\n.lock-navigation button {\n  min-height: 44px;\n  min-width: 44px;\n  padding: 8px;\n}\n.lock-navigation select {\n  min-width: 0;\n  max-width: 270px;\n  min-height: 44px;\n  font: inherit;\n  color: #fff0cb;\n  background: #123139;\n  border: 0;\n  border-radius: 6px;\n  padding: 6px;\n}\n.lock-navigation select:focus-visible {\n  outline: 3px solid #91f3da;\n}\napp-machine-workshop,\napp-gear-lock,\napp-balance-lock {\n  position: absolute;\n  inset: 68px 0 0;\n  --expedition-lock-height: calc(100dvh - 68px);\n}\n/*# sourceMappingURL=expedition.component.css.map */\n'] }]
  }], () => [], { host: [{
    type: ViewChild,
    args: ["worldHost", { static: true }]
  }], panel: [{
    type: ViewChild,
    args: ["panel"]
  }], settingsPanel: [{
    type: ViewChild,
    args: ["settingsPanel"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpeditionComponent, { className: "ExpeditionComponent", filePath: "src/app/templates/heist/escape/expedition/expedition.component.ts", lineNumber: 45 });
})();
export {
  EXPEDITION_SCENE_LOADER,
  ExpeditionComponent
};
//# debugId=f202f963-17e1-506e-b5d4-dac1dcd031bc
//# sourceMappingURL=chunk-ZIG7JBVR.js.map
