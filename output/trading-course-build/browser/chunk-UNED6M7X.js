import {
  EscapeRuntime
} from "./chunk-RWLVM3VX.js";
import "./chunk-7HMNGV54.js";
import "./chunk-RRITUMP7.js";
import "./chunk-YQ5R4IZP.js";
import "./chunk-RAYONVPN.js";
import "./chunk-NRR2X4JL.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RangeValueAccessor,
  ɵNgNoValidate
} from "./chunk-UW6DFD2Z.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
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
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/ui/escape.component.ts
var _c0 = ["panel"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function EscapeComponent_Conditional_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_30_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restart());
    });
    \u0275\u0275text(1, "Start a new rescue");
    \u0275\u0275elementEnd();
  }
}
function EscapeComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, EscapeComponent_Conditional_30_Conditional_2_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.runtime.warning(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.runtime.restoreBlocked() ? 2 : -1);
  }
}
function EscapeComponent_For_43_For_2_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 33);
  }
  if (rf & 2) {
    const animal_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", animal_r3.image, \u0275\u0275sanitizeUrl);
  }
}
function EscapeComponent_For_43_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, EscapeComponent_For_43_For_2_Conditional_0_For_1_Template, 1, 1, "img", 33, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const animal_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.sequence(animal_r3.count));
  }
}
function EscapeComponent_For_43_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EscapeComponent_For_43_For_2_Conditional_0_Template, 2, 0);
  }
  if (rf & 2) {
    const animal_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r1.engine().released.has(animal_r3.id) ? 0 : -1);
  }
}
function EscapeComponent_For_43_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "FREE");
    \u0275\u0275elementEnd();
  }
}
function EscapeComponent_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275repeaterCreate(1, EscapeComponent_For_43_For_2_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275conditionalCreate(3, EscapeComponent_For_43_Conditional_3_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pen_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", pen_r4.x, "%")("top", pen_r4.y, "%");
    \u0275\u0275classProp("open", ctx_r1.engine().solved.has(pen_r4.id));
    \u0275\u0275advance();
    \u0275\u0275repeater(pen_r4.animals);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.engine().solved.has(pen_r4.id) ? 3 : -1);
  }
}
function EscapeComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function EscapeComponent_For_45_Template_button_click_0_listener() {
      const \u0275$index_88_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(\u0275$index_88_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const \u0275$index_88_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", s_r7.x, "%")("top", s_r7.y, "%");
    \u0275\u0275classProp("current", ctx_r1.engine().started && \u0275$index_88_r6 === ctx_r1.engine().index)("done", ctx_r1.engine().solved.has(s_r7.id));
    \u0275\u0275property("disabled", !ctx_r1.engine().started || \u0275$index_88_r6 > ctx_r1.engine().index);
    \u0275\u0275attribute("aria-label", s_r7.place + (ctx_r1.engine().solved.has(s_r7.id) ? ": solved, review clue" : \u0275$index_88_r6 === ctx_r1.engine().index ? ": current puzzle" : ": locked"))("aria-current", \u0275$index_88_r6 === ctx_r1.engine().index && ctx_r1.engine().started ? "step" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.engine().solved.has(s_r7.id) ? "\u2713" : \u0275$index_88_r6 + 1, " ");
  }
}
function EscapeComponent_For_51_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 33);
  }
  if (rf & 2) {
    const a_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", a_r8.image, \u0275\u0275sanitizeUrl);
  }
}
function EscapeComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EscapeComponent_For_51_Conditional_0_Template, 1, 1, "img", 33);
  }
  if (rf & 2) {
    const a_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.engine().released.has(a_r8.id) ? 0 : -1);
  }
}
function EscapeComponent_For_54_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 37);
  }
}
function EscapeComponent_For_54_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const animal_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", animal_r9.count, " ");
  }
}
function EscapeComponent_For_54_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function EscapeComponent_For_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36);
    \u0275\u0275element(2, "img", 33);
    \u0275\u0275conditionalCreate(3, EscapeComponent_For_54_Conditional_3_Template, 1, 0, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275conditionalCreate(6, EscapeComponent_For_54_Conditional_6_Template, 1, 1);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, EscapeComponent_For_54_Conditional_10_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const animal_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("free", ctx_r1.engine().released.has(animal_r9.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", animal_r9.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.engine().released.has(animal_r9.id) ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.engine().solved.size > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", animal_r9.name.toLowerCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().released.has(animal_r9.id) ? ctx_r1.engine().complete ? "Home safe" : "Following you!" : "Waiting for rescue");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.engine().released.has(animal_r9.id) ? 10 : -1);
  }
}
function EscapeComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "A fresh start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Start a fresh rescue?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 39);
    \u0275\u0275text(5, "This replaces the progress saved for this game. You can also keep your current rescue.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_66_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissRestart());
    });
    \u0275\u0275text(7, "Keep playing ");
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 30);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_66_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.restart());
    });
    \u0275\u0275text(11, "Start fresh");
    \u0275\u0275elementEnd();
  }
}
function EscapeComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "Saved game needs attention");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Your rescue is waiting");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_67_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.restart());
    });
    \u0275\u0275text(7, "Start a new rescue ");
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.runtime.warning());
  }
}
function EscapeComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275text(1, "\u263E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 39);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 42)(9, "p")(10, "span");
    \u0275\u0275text(11, "01");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Inspect clues and operate the locks.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p")(14, "span");
    \u0275\u0275text(15, "02");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Free every animal, one pen at a time.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p")(18, "span");
    \u0275\u0275text(19, "03");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Get everyone to the sanctuary boat.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_68_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.start());
    });
    \u0275\u0275text(22, "Enter the secret gate ");
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "p", 43);
    \u0275\u0275text(26, " Take your time. Hints are always here, and you can retry any puzzle. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("YOUR MISSION \xB7 ", ctx_r1.mission.steps.length, " MATH CHALLENGES");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mission.introductionTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mission.briefing);
  }
}
function EscapeComponent_Conditional_69_For_12_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 47);
  }
  if (rf & 2) {
    const a_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", a_r14.image, \u0275\u0275sanitizeUrl)("alt", a_r14.name + " rescued");
  }
}
function EscapeComponent_Conditional_69_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, EscapeComponent_Conditional_69_For_12_For_1_Template, 1, 2, "img", 47, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const a_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.sequence(a_r14.count));
  }
}
function EscapeComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Home before");
    \u0275\u0275element(6, "br");
    \u0275\u0275text(7, "the sunrise.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 39);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 45);
    \u0275\u0275repeaterCreate(11, EscapeComponent_Conditional_69_For_12_Template, 2, 0, null, null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 46);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_69_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(0));
    });
    \u0275\u0275text(16, " Look through your rescue trail ");
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 30);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_69_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.requestRestart());
    });
    \u0275\u0275text(20, "Play again");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("RESCUE COMPLETE \xB7 ", ctx_r1.total, " / ", ctx_r1.total, " SAFE");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.mission.finale);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.mission.animals);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.mission.steps.length, " mechanisms opened with your math.");
  }
}
function EscapeComponent_Conditional_70_Conditional_9_For_8_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 47);
  }
  if (rf & 2) {
    const a_r15 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", a_r15.image, \u0275\u0275sanitizeUrl)("alt", a_r15.name + " freed");
  }
}
function EscapeComponent_Conditional_70_Conditional_9_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275repeaterCreate(1, EscapeComponent_Conditional_70_Conditional_9_For_8_Conditional_0_For_2_Template, 1, 2, "img", 47, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sequence(a_r15.count));
  }
}
function EscapeComponent_Conditional_70_Conditional_9_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EscapeComponent_Conditional_70_Conditional_9_For_8_Conditional_0_Template, 3, 0, "div", 53);
  }
  if (rf & 2) {
    const a_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.step().release.includes(a_r15.id) ? 0 : -1);
  }
}
function EscapeComponent_Conditional_70_Conditional_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_9_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.resume());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.engine().complete ? "Back to the sanctuary" : "Back to the rescue", " ");
  }
}
function EscapeComponent_Conditional_70_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_9_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.engine().index === ctx_r1.mission.steps.length - 1 ? "Bring everyone home" : "Continue to " + ctx_r1.mission.steps[ctx_r1.engine().index + 1].place, " ");
  }
}
function EscapeComponent_Conditional_70_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "span", 51);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, EscapeComponent_Conditional_70_Conditional_9_For_8_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EscapeComponent_Conditional_70_Conditional_9_Conditional_9_Template, 4, 1, "button", 52)(10, EscapeComponent_Conditional_70_Conditional_9_Conditional_10_Template, 4, 1, "button", 52);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.step().success);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.step().explanation);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mission.animals);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.review() !== null ? 9 : 10);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const clue_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clue_r19.value);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_For_5_Template_button_click_0_listener() {
      const n_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const a_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.mark(a_r22.id + n_r21));
    });
    \u0275\u0275element(1, "img", 33);
    \u0275\u0275conditionalCreate(2, EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_For_5_Conditional_2_Template, 2, 0, "span", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r21 = ctx.$implicit;
    const a_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("counted", ctx_r1.marked().has(a_r22.id + n_r21));
    \u0275\u0275attribute("aria-pressed", ctx_r1.marked().has(a_r22.id + n_r21))("aria-label", a_r22.name + " animal " + (n_r21 + 1) + ": mark as counted");
    \u0275\u0275advance();
    \u0275\u0275property("src", a_r22.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.marked().has(a_r22.id + n_r21) ? 2 : -1);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275repeaterCreate(4, EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_For_5_Template, 3, 6, "button", 64, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r22.name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.sequence(a_r22.count));
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275repeaterCreate(1, EscapeComponent_Conditional_70_Conditional_10_Conditional_5_For_2_Template, 6, 1, "div", 63, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.mission.animals);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 65);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_For_3_Template_button_click_3_listener() {
      const \u0275$index_350_r24 = \u0275\u0275restoreView(_r23).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.turn(\u0275$index_350_r24, 1));
    });
    \u0275\u0275text(4, " \u2303");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "output", 69);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 65);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_For_3_Template_button_click_7_listener() {
      const \u0275$index_350_r24 = \u0275\u0275restoreView(_r23).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.turn(\u0275$index_350_r24, -1));
    });
    \u0275\u0275text(8, " \u2304 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r25 = ctx.$implicit;
    const \u0275$index_350_r24 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(label_r25);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Increase " + label_r25 + " digit");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", label_r25 + " digit");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.digits()[\u0275$index_350_r24]);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Decrease " + label_r25 + " digit");
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275element(1, "span", 67);
    \u0275\u0275repeaterCreate(2, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_For_3_Template, 9, 5, "div", 68, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r26 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(p_r26.labels);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 71)(2, "span", 72);
    \u0275\u0275text(3, "0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 73);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 75);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "div", 76)(11, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 77)(13, "span");
    \u0275\u0275text(14, "DEPARTURE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "small");
    \u0275\u0275text(18, " sec");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "label", 78);
    \u0275\u0275text(22, "Set the departure second");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 79);
    \u0275\u0275listener("ngModelChange", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_1_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(4);
      ctx_r1.departure.set(+$event);
      return \u0275\u0275resetView(ctx_r1.feedback.set(""));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(24, "div", 80);
    \u0275\u0275element(25, "div")(26, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p", 81);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", "conic-gradient(#e2ddc6 0deg " + p_r26.safeStart / p_r26.cycle * 360 + "deg, #a8c48b " + p_r26.safeStart / p_r26.cycle * 360 + "deg " + p_r26.safeEnd / p_r26.cycle * 360 + "deg, #e2ddc6 " + p_r26.safeEnd / p_r26.cycle * 360 + "deg 360deg)");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r26.cycle / 4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r26.cycle / 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r26.cycle * 3 / 4);
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", "rotate(" + ctx_r1.departure() / p_r26.cycle * 360 + "deg)");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.departure());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Arrive at second ", ctx_r1.departure() + p_r26.crossing);
    \u0275\u0275advance(3);
    \u0275\u0275property("max", p_r26.cycle - 1)("ngModel", ctx_r1.departure());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("left", p_r26.safeStart / p_r26.cycle * 100, "%")("width", (p_r26.safeEnd - p_r26.safeStart) / p_r26.cycle * 100, "%");
    \u0275\u0275advance();
    \u0275\u0275styleProp("left", ctx_r1.departure() / p_r26.cycle * 100, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Green = lookout facing away \xB7 ", p_r26.safeStart, "\u2013", p_r26.safeEnd, " seconds ");
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_2_For_11_Template_button_click_0_listener() {
      const \u0275$index_432_r29 = \u0275\u0275restoreView(_r28).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.toggleWeight(\u0275$index_432_r29));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "kg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const weight_r30 = ctx.$implicit;
    const \u0275$index_432_r29 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("selected", ctx_r1.weights().includes(\u0275$index_432_r29));
    \u0275\u0275attribute("aria-pressed", ctx_r1.weights().includes(\u0275$index_432_r29));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", weight_r30, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.weights().includes(\u0275$index_432_r29) ? "On lift \u2713" : "Add weight");
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 83)(2, "span");
    \u0275\u0275text(3, "Basket");
    \u0275\u0275element(4, "br");
    \u0275\u0275text(5, "+ owls");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "div", 84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 85);
    \u0275\u0275repeaterCreate(10, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_2_For_11_Template, 6, 5, "button", 86, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 87);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("level", ctx_r1.balanceTotal() === p_r26.target)("heavy", ctx_r1.balanceTotal() > p_r26.target);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.balanceTotal(), " kg");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(p_r26.weights);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Counterweight: ", ctx_r1.balanceTotal(), " kg \xB7 Tap again to remove a weight. ");
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 89)(3, "button", 90);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.adjust(-1));
    });
    \u0275\u0275text(4, " \u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_3_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.answer, $event) || (ctx_r1.answer = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(6, "button", 92);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.adjust(1));
    });
    \u0275\u0275text(7, " +");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Your answer in ", p_r26.unit);
    \u0275\u0275advance(4);
    \u0275\u0275property("max", p_r26.max);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.answer);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r26.unit);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_0_Template, 4, 0, "div", 66)(1, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_1_Template, 29, 19)(2, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_2_Template, 14, 6)(3, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Case_3_Template, 10, 4);
  }
  if (rf & 2) {
    let tmp_5_0;
    \u0275\u0275conditional((tmp_5_0 = ctx.type) === "code" ? 0 : tmp_5_0 === "timing" ? 1 : tmp_5_0 === "balance" ? 2 : tmp_5_0 === "number" ? 3 : -1);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.puzzle().hint);
  }
}
function EscapeComponent_Conditional_70_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "span", 55);
    \u0275\u0275text(2, "FOUND AT THE SCENE");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EscapeComponent_Conditional_70_Conditional_10_For_4_Template, 5, 2, "div", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EscapeComponent_Conditional_70_Conditional_10_Conditional_5_Template, 3, 0, "div", 56);
    \u0275\u0275elementStart(6, "form", 57);
    \u0275\u0275listener("ngSubmit", function EscapeComponent_Conditional_70_Conditional_10_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(7, "p", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EscapeComponent_Conditional_70_Conditional_10_Conditional_9_Template, 4, 1);
    \u0275\u0275elementStart(10, "div", 59);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 60);
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "\u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 61);
    \u0275\u0275listener("click", function EscapeComponent_Conditional_70_Conditional_10_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hint.set(!ctx_r1.hint()));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, EscapeComponent_Conditional_70_Conditional_10_Conditional_18_Template, 2, 1, "p", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.step().clues);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.countAnimals() ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.puzzle().prompt);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = ctx_r1.puzzle()) ? 9 : -1, tmp_6_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.feedback());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.step().action, " ");
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-expanded", ctx_r1.hint());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2727 ", ctx_r1.hint() ? "Hide hint" : "I need a hint", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hint() ? 18 : -1);
  }
}
function EscapeComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 49);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 39);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, EscapeComponent_Conditional_70_Conditional_9_Template, 11, 3)(10, EscapeComponent_Conditional_70_Conditional_10_Template, 19, 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r1.review() !== null ? "RESCUE JOURNAL" : "ESCAPE STEP", " ", (ctx_r1.review() ?? ctx_r1.engine().index) + 1, " / ", ctx_r1.mission.steps.length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.puzzle().skill);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.step().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.step().story);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.solved() ? 9 : 10);
  }
}
function EscapeComponent_For_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 93);
    \u0275\u0275listener("click", function EscapeComponent_For_73_Template_button_click_0_listener() {
      const \u0275$index_480_r33 = \u0275\u0275restoreView(_r32).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inspect(\u0275$index_480_r33));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r34 = ctx.$implicit;
    const \u0275$index_480_r33 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", \u0275$index_480_r33 === (ctx_r1.review() ?? ctx_r1.engine().index))("done", ctx_r1.engine().solved.has(s_r34.id));
    \u0275\u0275property("disabled", !ctx_r1.engine().started || \u0275$index_480_r33 > ctx_r1.engine().index);
    \u0275\u0275attribute("aria-current", \u0275$index_480_r33 === ctx_r1.engine().index && ctx_r1.engine().started ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.engine().solved.has(s_r34.id) ? "\u2713" : s_r34.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", s_r34.place, " ");
  }
}
var EscapeComponent = class _EscapeComponent {
  runtime = inject(EscapeRuntime);
  mission = this.runtime.mission;
  engine = computed(() => {
    this.runtime.revision();
    return this.runtime.engine;
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "engine" } : (
    /* istanbul ignore next */
    {}
  )), { equal: () => false }));
  total = this.mission.animals.reduce((n, a) => n + a.count, 0);
  pens = this.mission.steps.filter((s) => s.release.length > 0).map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y + 10,
    animals: this.mission.animals.filter((a) => s.release.includes(a.id))
  }));
  review = signal(
    null,
    ...ngDevMode ? [{ debugName: "review" }] : (
      /* istanbul ignore next */
      []
    )
  );
  step = computed(
    () => this.mission.steps[this.review() ?? Math.min(this.engine().index, this.mission.steps.length - 1)],
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  puzzle = computed(
    () => this.step().puzzle,
    ...ngDevMode ? [{ debugName: "puzzle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  countAnimals = computed(
    () => {
      const p = this.puzzle();
      return p.type === "code" && p.countAnimals;
    },
    ...ngDevMode ? [{ debugName: "countAnimals" }] : (
      /* istanbul ignore next */
      []
    )
  );
  solved = computed(
    () => this.engine().solved.has(this.step().id),
    ...ngDevMode ? [{ debugName: "solved" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hint = signal(
    false,
    ...ngDevMode ? [{ debugName: "hint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feedback = signal(
    "",
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  marked = signal(
    /* @__PURE__ */ new Set(),
    ...ngDevMode ? [{ debugName: "marked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  weights = signal(
    [],
    ...ngDevMode ? [{ debugName: "weights" }] : (
      /* istanbul ignore next */
      []
    )
  );
  balanceTotal = computed(
    () => {
      const p = this.puzzle();
      return p.type === "balance" ? this.weights().reduce((n, i) => n + p.weights[i], 0) : 0;
    },
    ...ngDevMode ? [{ debugName: "balanceTotal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  digits = signal(
    [0, 0, 0, 0, 0, 0],
    ...ngDevMode ? [{ debugName: "digits" }] : (
      /* istanbul ignore next */
      []
    )
  );
  departure = signal(
    0,
    ...ngDevMode ? [{ debugName: "departure" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showRestart = signal(
    false,
    ...ngDevMode ? [{ debugName: "showRestart" }] : (
      /* istanbul ignore next */
      []
    )
  );
  answer = null;
  panel;
  sequence(count) {
    return Array.from({ length: count }, (_, i) => i);
  }
  start() {
    if (this.runtime.send({ type: "start" }))
      this.clearInput();
  }
  mark(id) {
    this.marked.update((old) => {
      const next = new Set(old);
      if (next.has(id))
        next.delete(id);
      else
        next.add(id);
      return next;
    });
  }
  turn(index, direction) {
    this.digits.update((old) => this.sequence(this.puzzle().type === "code" ? this.codeLength() : 3).map((i) => i === index ? ((old[i] ?? 0) + direction + 10) % 10 : old[i] ?? 0));
    this.feedback.set("");
  }
  codeLength() {
    const p = this.puzzle();
    return p.type === "code" ? p.labels.length : 0;
  }
  toggleWeight(index) {
    this.weights.update((old) => old.includes(index) ? old.filter((i) => i !== index) : [...old, index]);
    this.feedback.set("");
  }
  adjust(delta) {
    const p = this.puzzle();
    if (p.type === "number")
      this.answer = Math.max(0, Math.min(p.max, (this.answer ?? 0) + delta));
    this.feedback.set("");
  }
  submit() {
    const p = this.puzzle();
    let answer;
    if (p.type === "code")
      answer = p.labels.map((_, i) => this.digits()[i] ?? 0).join("");
    else if (p.type === "timing")
      answer = this.departure();
    else if (p.type === "balance")
      answer = this.weights();
    else if (p.type === "balance-lock" || p.type === "gear-lock" || p.type === "machine-lock")
      return;
    else {
      if (this.answer === null || !Number.isFinite(this.answer) || this.answer < 0 || this.answer > p.max) {
        this.feedback.set(`Enter a number from 0 to ${p.max} first.`);
        return;
      }
      answer = this.answer;
    }
    if (!this.runtime.send({ type: "submit", stepId: this.step().id, answer })) {
      this.feedback.set("This attempt could not be recorded. Check the save message or start a new rescue.");
      return;
    }
    if (this.solved()) {
      this.feedback.set("");
      this.focusPanel();
    } else {
      const timingFeedback = p.type === "timing" ? this.departure() < p.safeStart || this.departure() + p.crossing > p.safeEnd ? `The crossing from second ${this.departure()} to ${this.departure() + p.crossing} overlaps the lookout's watch. ` : `That crossing is safe, but you can leave later. ` : "";
      this.feedback.set(`${timingFeedback}The mechanism stays closed. ${p.hint}`);
    }
  }
  next() {
    if (this.runtime.send({ type: "continue", stepId: this.step().id })) {
      this.review.set(null);
      this.clearInput();
    }
  }
  inspect(index) {
    if (!this.engine().started || index > this.engine().index)
      return;
    this.review.set(index === this.engine().index ? null : index);
    this.feedback.set("");
    this.focusPanel();
  }
  resume() {
    this.review.set(null);
    this.focusPanel();
  }
  requestRestart() {
    this.showRestart.set(true);
    this.focusPanel();
  }
  dismissRestart() {
    this.showRestart.set(false);
    this.focusPanel();
  }
  restart() {
    this.runtime.reset();
    this.review.set(null);
    this.showRestart.set(false);
    this.marked.set(/* @__PURE__ */ new Set());
    this.clearInput();
  }
  clearInput() {
    this.answer = null;
    this.digits.set([0, 0, 0, 0, 0, 0]);
    this.weights.set([]);
    this.departure.set(0);
    this.feedback.set("");
    this.hint.set(false);
    this.focusPanel();
  }
  focusPanel() {
    setTimeout(() => {
      const panel = this.panel?.nativeElement;
      if (!panel?.isConnected)
        return;
      panel.scrollIntoView?.({ block: "nearest", behavior: "instant" });
      panel.focus({ preventScroll: true });
    }, 0);
  }
  static \u0275fac = function EscapeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EscapeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EscapeComponent, selectors: [["app-heist-escape"]], viewQuery: function EscapeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
    }
  }, decls: 79, vars: 16, consts: [["panel", ""], [1, "escape-shell"], [1, "topbar"], ["routerLink", "/", 1, "back-link"], ["aria-hidden", "true"], [1, "brand"], [1, "practice"], [1, "mission-heading"], [1, "eyebrow"], ["aria-live", "polite", 1, "rescue-meter"], ["aria-hidden", "true", 1, "paw"], ["role", "alert", 1, "save-warning"], [1, "game-layout"], ["aria-label", "Castle and rescue progress", 1, "world-column"], [1, "castle-scene"], ["alt", "An illustrated moonlit castle, animal courtyards, watchtowers, a moat bridge, and a boat landing beside the forest.", 1, "castle-art", 3, "src"], [1, "map-caption"], [1, "moon-label"], ["aria-hidden", "true", 1, "map-pen", 3, "open", "left", "top"], [1, "map-pin", 3, "current", "done", "left", "top", "disabled"], [1, "map-note"], [1, "note-dot"], ["aria-hidden", "true", 1, "following-animals"], [1, "animal-roster"], [1, "animal-card", 3, "free"], [1, "field-note"], [1, "thinking-time"], ["tabindex", "-1", "aria-label", "Current escape puzzle", 1, "puzzle-panel"], ["aria-label", "Your eight-step escape trail", 1, "escape-trail"], [3, "disabled", "active", "done"], [1, "text-button", 3, "click"], [3, "click"], ["aria-hidden", "true", 1, "map-pen"], ["alt", "", 3, "src"], [1, "map-pin", 3, "click", "disabled"], [1, "animal-card"], [1, "portrait"], ["aria-hidden", "true", 1, "pen-bars"], ["aria-label", "Freed", 1, "free-check"], [1, "story"], [1, "primary", 3, "click"], ["aria-hidden", "true", 1, "briefing-stamp"], [1, "mission-rules"], [1, "gentle-note"], ["aria-hidden", "true", 1, "briefing-stamp", "success-stamp"], [1, "home-animals"], [1, "completion-note"], [3, "src", "alt"], [1, "puzzle-kicker"], [1, "skill"], ["role", "status", 1, "unlock-result"], ["aria-hidden", "true", 1, "result-icon"], [1, "primary"], [1, "released-animals"], [1, "clue-board"], [1, "clue-label"], ["aria-label", "Count the animals inside the pens", 1, "census"], [3, "ngSubmit"], [1, "puzzle-prompt"], ["aria-live", "polite", 1, "feedback"], ["type", "submit", 1, "primary"], ["type", "button", 1, "hint-button", 3, "click"], [1, "hint-text"], [1, "census-row"], ["type", "button", 3, "counted"], ["type", "button", 3, "click"], ["role", "group", "aria-label", "Combination lock", 1, "combination-lock"], ["aria-hidden", "true", 1, "lock-bolt"], [1, "dial"], ["aria-live", "polite"], [1, "timing-mechanism"], ["aria-hidden", "true", 1, "clock-face"], [1, "clock-top"], [1, "clock-right"], [1, "clock-bottom"], [1, "clock-left"], [1, "clock-hand"], [1, "clock-readout"], ["for", "departure", 1, "range-label"], ["id", "departure", "type", "range", "min", "0", "step", "1", "name", "departure", 3, "ngModelChange", "max", "ngModel"], ["aria-hidden", "true", 1, "patrol-track"], [1, "track-caption"], ["aria-label", "Selected counterweight", 1, "balance-machine"], [1, "balance-beam"], [1, "fulcrum"], ["role", "group", "aria-label", "Choose counterweights", 1, "weight-options"], ["type", "button", 3, "selected"], ["aria-live", "polite", 1, "track-caption"], ["for", "quantity", 1, "answer-label"], [1, "quantity-control"], ["type", "button", "aria-label", "Decrease answer", 3, "click"], ["id", "quantity", "type", "number", "name", "answer", "min", "0", "step", "any", "inputmode", "decimal", "placeholder", "?", "autocomplete", "off", 3, "ngModelChange", "max", "ngModel"], ["type", "button", "aria-label", "Increase answer", 3, "click"], [3, "click", "disabled"]], template: function EscapeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 1)(1, "header", 2)(2, "a", 3)(3, "span", 4);
      \u0275\u0275text(4, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " All projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5)(7, "span", 4);
      \u0275\u0275text(8, "\u263E");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " THE RESCUE CLUB");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11, "Math escape \xB7 Grade 5");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "div")(14, "p", 8);
      \u0275\u0275text(15, "A woodland rescue adventure");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "h1");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p");
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 9)(21, "span", 10);
      \u0275\u0275text(22, "\u2667");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "strong");
      \u0275\u0275text(25);
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "small");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(30, EscapeComponent_Conditional_30_Template, 3, 2, "div", 11);
      \u0275\u0275elementStart(31, "div", 12)(32, "section", 13)(33, "div", 14);
      \u0275\u0275element(34, "img", 15);
      \u0275\u0275elementStart(35, "div", 16)(36, "span", 8);
      \u0275\u0275text(37, "YOUR FIELD MAP");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "h2");
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "span", 17);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(42, EscapeComponent_For_43_Template, 4, 7, "div", 18, _forTrack0);
      \u0275\u0275repeaterCreate(44, EscapeComponent_For_45_Template, 2, 12, "button", 19, _forTrack0);
      \u0275\u0275elementStart(46, "div", 20);
      \u0275\u0275element(47, "span", 21);
      \u0275\u0275text(48);
      \u0275\u0275elementStart(49, "span", 22);
      \u0275\u0275repeaterCreate(50, EscapeComponent_For_51_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "div", 23);
      \u0275\u0275repeaterCreate(53, EscapeComponent_For_54_Template, 11, 8, "div", 24, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 25)(56, "span", 4);
      \u0275\u0275text(57, "\u2727");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p")(59, "strong");
      \u0275\u0275text(60, "Think like a rescuer.");
      \u0275\u0275elementEnd();
      \u0275\u0275text(61, " Look closely. Try an idea. Every lock has a mathematical clue. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "span", 26);
      \u0275\u0275text(63, "Thinking time is unlimited");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "section", 27, 0);
      \u0275\u0275conditionalCreate(66, EscapeComponent_Conditional_66_Template, 12, 0)(67, EscapeComponent_Conditional_67_Template, 10, 1)(68, EscapeComponent_Conditional_68_Template, 27, 3)(69, EscapeComponent_Conditional_69_Template, 21, 4)(70, EscapeComponent_Conditional_70_Template, 11, 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "nav", 28);
      \u0275\u0275repeaterCreate(72, EscapeComponent_For_73_Template, 4, 8, "button", 29, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "footer")(75, "span");
      \u0275\u0275text(76);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "button", 30);
      \u0275\u0275listener("click", function EscapeComponent_Template_button_click_77_listener() {
        return ctx.requestRestart();
      });
      \u0275\u0275text(78, "Start over");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("finished", ctx.engine().complete);
      \u0275\u0275advance(17);
      \u0275\u0275textInterpolate(ctx.mission.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mission.subtitle);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.engine().rescued, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("/ ", ctx.total);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.engine().complete ? "animals home safe" : "animals freed");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.warning() ? 30 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("dawn", ctx.engine().complete);
      \u0275\u0275advance();
      \u0275\u0275property("src", ctx.mission.environment, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.engine().complete ? "A new day. An empty castle." : ctx.mission.mapTitle);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.engine().complete ? "\u2600 Sunrise" : "\u263E After midnight");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.pens);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.mission.steps);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("", ctx.engine().complete ? "Every animal made it home." : !ctx.engine().started ? "Your way in is the secret gate." : "Next stop: " + ctx.engine().current.place, " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.mission.animals);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.mission.animals);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.showRestart() ? 66 : ctx.runtime.restoreBlocked() ? 67 : !ctx.engine().started ? 68 : ctx.engine().complete && ctx.review() === null ? 69 : 70);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.mission.steps);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.mission.setting);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, NgForm, RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #edf0db;\n  background: #112d29;\n  min-height: 100vh;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #cc9b40;\n  outline-offset: 4px;\n}\n.escape-shell[_ngcontent-%COMP%] {\n  max-width: 1512px;\n  margin: auto;\n  padding: 0 40px 22px;\n}\n.topbar[_ngcontent-%COMP%] {\n  height: 68px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0823529412);\n  font-size: 12px;\n}\n.back-link[_ngcontent-%COMP%] {\n  color: #c9d6c6;\n  text-decoration: none;\n  display: flex;\n  gap: 9px;\n  align-items: center;\n}\n.back-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.brand[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #e4c484;\n}\n.practice[_ngcontent-%COMP%] {\n  color: #bdcdbf;\n}\n.mission-heading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  align-items: center;\n  padding: 29px 0 25px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 9px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: #bcc7ac;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh1[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-weight: 400;\n  font-size: clamp(28px, 3.2vw, 45px);\n  line-height: 1.08;\n  margin-bottom: 9px;\n  letter-spacing: -0.7px;\n}\n.mission-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n  color: #bdccbf;\n  font-size: 14px;\n  margin-bottom: 0;\n}\n.rescue-meter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 12px 22px;\n  border: 1px solid rgba(138, 163, 136, 0.2509803922);\n  border-radius: 12px;\n  background: #1c3931;\n  min-width: 166px;\n}\n.rescue-meter[_ngcontent-%COMP%]   .paw[_ngcontent-%COMP%] {\n  color: #d9c98e;\n  font-size: 39px;\n}\n.rescue-meter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 29px;\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\n.rescue-meter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #a5baa5;\n  font-size: 20px;\n}\n.rescue-meter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #bbcfb7;\n  font-size: 11px;\n  margin-top: 3px;\n}\n.game-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.34fr) minmax(380px, 1fr);\n  gap: 24px;\n  align-items: start;\n}\n.world-column[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.castle-scene[_ngcontent-%COMP%] {\n  aspect-ratio: 1.315;\n  position: relative;\n  isolation: isolate;\n  background: #23463e;\n  overflow: hidden;\n  border-radius: 16px;\n  border: 1px solid rgba(168, 186, 149, 0.2);\n}\n.castle-art[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.castle-scene[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  background: linear-gradient(rgba(235, 201, 124, 0.2666666667), transparent);\n}\n.castle-scene.dawn[_ngcontent-%COMP%]   .castle-art[_ngcontent-%COMP%] {\n  filter: brightness(1.35) sepia(0.15);\n}\n.map-caption[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 24px;\n  top: 22px;\n  pointer-events: none;\n}\n.map-caption[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #d2d1ad;\n  font-size: 9px;\n}\n.map-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 22px Georgia, serif;\n  color: #ecedce;\n  margin: 7px 0;\n}\n.moon-label[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 18px;\n  top: 24px;\n  font-size: 10px;\n  background: rgba(16, 43, 45, 0.4901960784);\n  color: #d8d9b8;\n  padding: 6px 9px;\n  border-radius: 20px;\n}\n.map-pin[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 1px solid rgba(201, 198, 161, 0.431372549);\n  background: #263e37;\n  color: #d2d6b9;\n  font-weight: 700;\n  font-size: 12px;\n  box-shadow: 0 3px 10px rgba(12, 32, 28, 0.4);\n}\n.map-pin[_ngcontent-%COMP%]:disabled {\n  color: #e0dfc5;\n  background: #243b36;\n  opacity: 0.85;\n}\n.map-pin.current[_ngcontent-%COMP%] {\n  width: 43px;\n  height: 43px;\n  color: #293e31;\n  background: #f0ce84;\n  border: 5px solid #816b44;\n  box-shadow: 0 0 0 6px rgba(239, 208, 133, 0.1254901961);\n}\n.map-pin.done[_ngcontent-%COMP%] {\n  background: #cae3ac;\n  color: #224433;\n  border-color: #e3efcc;\n}\n.map-pen[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 92px;\n  min-height: 28px;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  background: rgba(40, 76, 54, 0.8);\n  border: 2px solid #b5a57a;\n  border-radius: 5px;\n  padding: 3px;\n  pointer-events: none;\n}\n.map-pen[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 25px;\n  height: 27px;\n}\n.map-pen[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      transparent 0 16px,\n      rgba(206, 198, 166, 0.5019607843) 17px 19px,\n      transparent 20px 26px);\n}\n.map-pen.open[_ngcontent-%COMP%] {\n  background: rgba(35, 71, 49, 0.7333333333);\n  border-style: dashed;\n  border-color: rgba(159, 189, 130, 0.4666666667);\n}\n.map-pen.open[_ngcontent-%COMP%]:after {\n  display: none;\n}\n.map-pen[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #dcf0b3;\n  letter-spacing: 1.5px;\n  padding: 3px;\n}\n.following-animals[_ngcontent-%COMP%] {\n  display: flex;\n  margin-left: auto;\n  gap: 3px;\n}\n.following-animals[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 27px;\n  height: 27px;\n}\n.map-note[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 16px;\n  left: 18px;\n  right: 18px;\n  background: rgba(17, 46, 43, 0.9098039216);\n  color: #e2e8ca;\n  padding: 12px 14px;\n  border: 1px solid rgba(214, 222, 189, 0.1411764706);\n  border-radius: 8px;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.note-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 100%;\n  background: #ead193;\n  flex-shrink: 0;\n}\n.animal-roster[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-top: 12px;\n}\n.animal-card[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid rgba(175, 193, 153, 0.1450980392);\n  border-radius: 10px;\n  padding: 10px 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #1b3730;\n}\n.portrait[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  position: relative;\n  width: 44px;\n  height: 49px;\n}\n.portrait[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.pen-bars[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      transparent 0 9px,\n      #84958c 10px 12px,\n      transparent 13px 15px);\n  border-top: 3px solid #84958c;\n  border-bottom: 3px solid #84958c;\n  border-radius: 4px;\n  opacity: 0.8;\n}\n.animal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  display: block;\n  color: #e0e5cf;\n}\n.animal-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.pen-bars) {\n  display: block;\n  font-size: 9px;\n  color: #b0c1ad;\n  margin-top: 5px;\n}\n.animal-card.free[_ngcontent-%COMP%] {\n  border-color: rgba(140, 174, 102, 0.3607843137);\n  background: #284330;\n}\n.free-check[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 5px;\n  right: 7px;\n  color: #d8eeb9;\n  font-size: 12px;\n}\n.field-note[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 18px;\n  align-items: start;\n  color: #acbfae;\n}\n.field-note[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:first-child {\n  color: #d5c492;\n  font-size: 25px;\n}\n.field-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  line-height: 1.7;\n  max-width: 310px;\n  margin: 0;\n}\n.field-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dce5cb;\n  font-weight: 400;\n}\n.thinking-time[_ngcontent-%COMP%] {\n  font-size: 9px;\n  margin-left: auto;\n  padding-top: 6px;\n  text-align: right;\n  line-height: 1.5;\n  max-width: 98px;\n}\n.puzzle-panel[_ngcontent-%COMP%] {\n  background: #f2eddc;\n  color: #26392e;\n  border-radius: 15px;\n  padding: 28px;\n  border: 1px solid #faf8e5;\n  box-shadow: 0 12px 35px rgba(5, 26, 32, 0.1254901961);\n  min-height: 536px;\n  scroll-margin: 16px;\n}\n.puzzle-panel[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.puzzle-panel[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ddc587;\n  outline-offset: 4px;\n}\n.puzzle-panel[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #647455;\n}\n.puzzle-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font: 31px/1.12 Georgia, serif;\n  letter-spacing: -0.4px;\n  margin-bottom: 13px;\n}\n.puzzle-panel[_ngcontent-%COMP%]   .story[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #566050;\n  margin-bottom: 21px;\n}\n.briefing-stamp[_ngcontent-%COMP%] {\n  width: 66px;\n  height: 66px;\n  border: 1px solid #9aab80;\n  outline: 1px dashed #a6ad89;\n  outline-offset: -6px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  font-size: 36px;\n  color: #526847;\n  margin: 0 0 27px;\n  transform: rotate(-12deg);\n}\n.mission-rules[_ngcontent-%COMP%] {\n  padding: 17px 0 10px;\n  margin: 0 0 17px;\n  border-top: 1px solid #c2c6ad;\n}\n.mission-rules[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-bottom: 13px;\n  display: flex;\n  align-items: center;\n  gap: 13px;\n}\n.mission-rules[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #7c835f;\n}\n.primary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  min-height: 48px;\n  padding: 13px 17px;\n  border: 1px solid #294f37;\n  border-radius: 7px;\n  background: #244d37;\n  color: #fff7df;\n  font-size: 13px;\n  font-weight: 700;\n  gap: 12px;\n  text-align: left;\n}\n.primary[_ngcontent-%COMP%]:hover {\n  background: #356044;\n}\n.primary[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n  font-weight: 400;\n}\n.gentle-note[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #667058;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 14px 5px 0;\n}\n.puzzle-kicker[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.puzzle-kicker[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 9px;\n  letter-spacing: 1.2px;\n}\n.skill[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #526446;\n  background: #e2e5ce;\n  padding: 5px 8px;\n  border-radius: 20px;\n}\n.clue-board[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 19px 13px 10px;\n  border: 1px dashed #aab090;\n  background: #e8e6d0;\n  border-radius: 7px;\n  margin-bottom: 17px;\n}\n.clue-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -6px;\n  left: 12px;\n  background: #e8e6d0;\n  padding: 0 4px;\n  font-size: 8px;\n  font-weight: 700;\n  color: #687352;\n  letter-spacing: 1.4px;\n}\n.clue-board[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px;\n  font-size: 10px;\n  padding: 4px 0;\n}\n.clue-board[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #65705b;\n}\n.clue-board[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 12px;\n  text-align: right;\n  color: #394b35;\n}\n.census[_ngcontent-%COMP%] {\n  background: #e9dfc9;\n  padding: 7px 10px;\n  border-radius: 7px;\n  margin-bottom: 15px;\n}\n.census-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.census-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: 45px;\n  flex-shrink: 0;\n  font-size: 10px;\n  color: #57624a;\n}\n.census-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.census[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: relative;\n  width: 39px;\n  height: 42px;\n  padding: 0 2px;\n  border: 0;\n  border-radius: 4px;\n  background: transparent;\n}\n.census[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.census[_ngcontent-%COMP%]   .counted[_ngcontent-%COMP%] {\n  background: #b7c99b;\n}\n.census[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 1px;\n  font-size: 12px;\n  color: #234c32;\n  font-weight: 700;\n  background: #d6e5b8;\n  border-radius: 50%;\n  width: 15px;\n}\n.puzzle-prompt[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.6;\n  margin-bottom: 14px;\n}\n.combination-lock[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 11px;\n  border: 1px solid #ad9d7d;\n  background:\n    linear-gradient(\n      120deg,\n      #d7c4a0,\n      #bbab88);\n  padding: 10px 18px;\n  border-radius: 9px;\n  position: relative;\n  box-shadow: inset 0 0 0 4px rgba(216, 199, 161, 0.3333333333);\n}\n.lock-bolt[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  top: 48%;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  border: 1px solid #806e4b;\n}\n.dial[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  min-width: 63px;\n}\n.dial[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #4d4c36;\n  margin-bottom: 3px;\n}\n.dial[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 28px;\n  border: 0;\n  background: rgba(187, 170, 133, 0.5019607843);\n  border-radius: 3px;\n  color: #35402e;\n  font-size: 24px;\n  line-height: 20px;\n}\n.dial[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #eee5cb;\n}\n.dial[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  width: 54px;\n  border: 1px solid #655c45;\n  text-align: center;\n  font: 30px/40px Georgia, serif;\n  background:\n    linear-gradient(\n      #f4efdf 49%,\n      #c9c1a6 50%,\n      #e9e0c5 52%);\n  color: #293c2d;\n  border-radius: 3px;\n}\n.hint-button[_ngcontent-%COMP%], \n.text-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 12px 0;\n  font-size: 11px;\n  color: #cad9bb;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.puzzle-panel[_ngcontent-%COMP%]   .text-button[_ngcontent-%COMP%], \n.hint-button[_ngcontent-%COMP%] {\n  color: #556548;\n}\n.hint-button[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  min-height: 42px;\n}\n.hint-text[_ngcontent-%COMP%] {\n  padding: 11px;\n  border-radius: 6px;\n  background: #e2e7ca;\n  color: #485d39;\n  font-size: 12px;\n  line-height: 1.6;\n  margin-bottom: 0;\n}\n.feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8b4e2e;\n  line-height: 1.6;\n  padding: 12px 0;\n  min-height: 16px;\n}\n.feedback[_ngcontent-%COMP%]:empty {\n  padding: 8px 0;\n}\n.unlock-result[_ngcontent-%COMP%] {\n  background: #e0e7cd;\n  border: 1px solid #bbc9a2;\n  text-align: center;\n  padding: 28px 20px;\n  border-radius: 10px;\n  margin: 23px 0;\n}\n.result-icon[_ngcontent-%COMP%] {\n  display: inline-grid;\n  place-items: center;\n  width: 39px;\n  height: 39px;\n  background: #466d42;\n  color: #f5f5da;\n  border-radius: 50%;\n  font-size: 20px;\n  margin-bottom: 15px;\n}\n.unlock-result[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font: 23px/1.2 Georgia, serif;\n  margin-bottom: 14px;\n}\n.unlock-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.7;\n  color: #536449;\n  margin-bottom: 0;\n}\n.released-animals[_ngcontent-%COMP%], \n.home-animals[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 18px;\n}\n.released-animals[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 42px;\n  animation: _ngcontent-%COMP%_arrive 0.45s ease-out both;\n}\n.home-animals[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 43px;\n}\n.completion-note[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 12px;\n  margin: 20px 0 24px;\n}\n.success-stamp[_ngcontent-%COMP%] {\n  background: #dfe9c6;\n}\n.escape-trail[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 0;\n  margin-top: 27px;\n  border: 1px solid rgba(154, 174, 128, 0.1882352941);\n  border-radius: 10px;\n  overflow: hidden;\n}\n.escape-trail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #bfcdb7;\n  background: #1b352d;\n  border: none;\n  padding: 13px 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.5;\n  border-right: 1px solid rgba(154, 174, 128, 0.1254901961);\n  min-height: 60px;\n}\n.escape-trail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #8b9e80;\n  font-size: 11px;\n  flex-shrink: 0;\n}\n.escape-trail[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #e8d6a3;\n  color: #2e4831;\n}\n.escape-trail[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #2e4831;\n}\n.escape-trail[_ngcontent-%COMP%]   button.done[_ngcontent-%COMP%]:not(.active) {\n  background: #2c472f;\n  color: #deedc8;\n}\n.escape-trail[_ngcontent-%COMP%]   button.done[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #bdd79c;\n}\n.escape-trail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  color: #9bae9c;\n  background: #173029;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  color: #93ae99;\n  font-size: 10px;\n  margin-top: 8px;\n}\n.save-warning[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #ead5a4;\n  color: #3b422c;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.save-warning[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #f3eed9;\n  color: #294331;\n  border: 1px solid #738566;\n  padding: 10px 14px;\n  border-radius: 5px;\n  margin: 5px;\n}\n@keyframes _ngcontent-%COMP%_arrive {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 1450px) {\n  .puzzle-panel[_ngcontent-%COMP%] {\n    padding: 32px;\n  }\n  .puzzle-panel[_ngcontent-%COMP%]   .story[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n@media (max-width: 1100px) {\n  .escape-shell[_ngcontent-%COMP%] {\n    padding: 0 24px 20px;\n  }\n  .game-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) minmax(355px, 1fr);\n    gap: 16px;\n  }\n  .puzzle-panel[_ngcontent-%COMP%] {\n    padding: 23px;\n  }\n  .animal-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    padding: 10px 3px;\n  }\n  .animal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .thinking-time[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .map-caption[_ngcontent-%COMP%] {\n    left: 16px;\n    top: 16px;\n  }\n  .map-caption[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .moon-label[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .escape-trail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n@media (max-width: 760px) {\n  .escape-shell[_ngcontent-%COMP%] {\n    padding: 0 16px 18px;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    height: 55px;\n  }\n  .brand[_ngcontent-%COMP%] {\n    font-size: 9px;\n    letter-spacing: 1px;\n  }\n  .practice[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mission-heading[_ngcontent-%COMP%] {\n    padding: 24px 0 20px;\n  }\n  .mission-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  .mission-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n    font-size: 12px;\n  }\n  .rescue-meter[_ngcontent-%COMP%] {\n    padding: 10px;\n    min-width: 83px;\n  }\n  .rescue-meter[_ngcontent-%COMP%]   .paw[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .rescue-meter[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 25px;\n  }\n  .rescue-meter[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .mission-heading[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .game-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .castle-scene[_ngcontent-%COMP%] {\n    max-height: 340px;\n    aspect-ratio: 1.315;\n    max-width: 450px;\n    margin: auto;\n  }\n  .animal-card[_ngcontent-%COMP%] {\n    flex-direction: row;\n    text-align: left;\n    padding: 7px;\n  }\n  .animal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .portrait[_ngcontent-%COMP%] {\n    width: 34px;\n    height: 40px;\n  }\n  .animal-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not(.pen-bars) {\n    font-size: 8px;\n  }\n  .field-note[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .puzzle-panel[_ngcontent-%COMP%] {\n    padding: 25px;\n    min-height: auto;\n  }\n  .puzzle-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 29px;\n  }\n  .escape-trail[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n    margin-top: 20px;\n  }\n  .escape-trail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 62px;\n    font-size: 9px;\n    border-bottom: 1px solid rgba(154, 174, 128, 0.1254901961);\n  }\n  .census[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 39px;\n    height: 44px;\n  }\n  .dial[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-height: 36px;\n  }\n}\n@media (max-width: 390px) {\n  .escape-shell[_ngcontent-%COMP%] {\n    padding: 0 12px 16px;\n  }\n  .puzzle-panel[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .animal-card[_ngcontent-%COMP%] {\n    gap: 3px;\n  }\n  .portrait[_ngcontent-%COMP%] {\n    width: 29px;\n  }\n  .animal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .census[_ngcontent-%COMP%] {\n    padding: 6px;\n  }\n  .census-row[_ngcontent-%COMP%] {\n    gap: 3px;\n  }\n  .census[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 34px;\n  }\n  .puzzle-kicker[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .quantity-control[_ngcontent-%COMP%] {\n    gap: 5px;\n  }\n  .quantity-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 75px;\n  }\n  .quantity-control[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]:before, \n   *[_ngcontent-%COMP%]:after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=escape.component.css.map */', '\n.timing-mechanism[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  justify-content: center;\n  padding: 7px 0 18px;\n}\n.clock-face[_ngcontent-%COMP%] {\n  width: 128px;\n  height: 128px;\n  position: relative;\n  border: 6px solid #a69c76;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #e2ddc6 0deg 120deg,\n      #a8c48b 120deg 210deg,\n      #e2ddc6 210deg 360deg);\n  box-shadow: inset 0 0 0 3px #f8f2dc;\n}\n.clock-face[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: 10px;\n  color: #4a583e;\n}\n.clock-top[_ngcontent-%COMP%] {\n  left: 47%;\n  top: 5px;\n}\n.clock-bottom[_ngcontent-%COMP%] {\n  left: 44%;\n  bottom: 5px;\n}\n.clock-left[_ngcontent-%COMP%] {\n  left: 5px;\n  top: 46%;\n}\n.clock-right[_ngcontent-%COMP%] {\n  right: 5px;\n  top: 46%;\n}\n.clock-hand[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 3px;\n  height: 43px;\n  left: calc(50% - 1.5px);\n  bottom: 50%;\n  background: #334c39;\n  transform-origin: bottom;\n  border-radius: 3px;\n}\n.clock-face[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(50% - 4px);\n  left: calc(50% - 4px);\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #334c39;\n}\n.clock-readout[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1.8px;\n  color: #717958;\n  display: block;\n}\n.clock-readout[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 39px Georgia, serif;\n}\n.clock-readout[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.clock-readout[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 10px;\n  margin: 5px 0 0;\n  color: #657055;\n}\n.range-label[_ngcontent-%COMP%], \n.answer-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  margin-bottom: 9px;\n  color: #53634a;\n}\ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  accent-color: #34583b;\n  min-height: 30px;\n}\n.patrol-track[_ngcontent-%COMP%] {\n  height: 7px;\n  position: relative;\n  background: #d7c7a4;\n  margin: 0 8px;\n  border-radius: 4px;\n}\n.patrol-track[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100%;\n  background: #739a59;\n}\n.patrol-track[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -3px;\n  width: 2px;\n  height: 13px;\n  background: #2b4b34;\n}\n.track-caption[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #697657;\n  text-align: center;\n  margin: 12px 0;\n  line-height: 1.6;\n}\n.balance-machine[_ngcontent-%COMP%] {\n  position: relative;\n  height: 107px;\n  padding-top: 30px;\n  margin: 10px 30px 5px;\n}\n.balance-beam[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 6px;\n  background: #777652;\n  transform: rotate(-8deg);\n  transition: transform 0.3s;\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  z-index: 1;\n}\n.balance-beam.level[_ngcontent-%COMP%] {\n  transform: rotate(0);\n  background: #426a3c;\n}\n.balance-beam.heavy[_ngcontent-%COMP%] {\n  transform: rotate(8deg);\n}\n.balance-beam[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 70px;\n  height: 55px;\n  border-radius: 0 0 30px 30px;\n  background: #d4c5a1;\n  border: 2px solid #9b926c;\n  font-size: 11px;\n  text-align: center;\n  padding: 8px;\n}\n.fulcrum[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 33px;\n  left: calc(50% - 25px);\n  width: 0;\n  height: 0;\n  border-left: 25px solid transparent;\n  border-right: 25px solid transparent;\n  border-bottom: 61px solid #9c9c75;\n}\n.weight-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n}\n.weight-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #adb091;\n  color: #425237;\n  background: #e5e1cd;\n  padding: 13px 3px 9px;\n  border-radius: 8px 8px 4px 4px;\n  font: 23px Georgia, serif;\n  min-height: 76px;\n}\n.weight-options[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font: 11px "Trebuchet MS", sans-serif;\n}\n.weight-options[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font: 9px "Trebuchet MS", sans-serif;\n  margin-top: 9px;\n}\n.weight-options[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  background: #36583b;\n  color: #f1f3d7;\n  border-color: #36583b;\n}\n.quantity-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 18px 12px;\n  background: #e8e2ce;\n  border: 1px solid #c7c7aa;\n  border-radius: 9px;\n  margin-bottom: 4px;\n}\n.quantity-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 44px;\n  flex-shrink: 0;\n  border: 1px solid #a7af8d;\n  border-radius: 5px;\n  background: #eee9d6;\n  color: #4f6844;\n  font-size: 24px;\n}\n.quantity-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  min-width: 0;\n  width: 85px;\n  height: 56px;\n  font: 29px Georgia, serif;\n  text-align: center;\n  border: 1px solid #9aa884;\n  border-radius: 5px;\n  background: #faf7ea;\n  color: #304b35;\n}\n.quantity-control[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #657355;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=escape-mechanisms.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EscapeComponent, [{
    type: Component,
    args: [{ selector: "app-heist-escape", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<main class="escape-shell" [class.finished]="engine().complete">
  <header class="topbar">
    <a routerLink="/" class="back-link"><span aria-hidden="true">\u2190</span> All projects</a>
    <span class="brand"><span aria-hidden="true">\u263E</span> THE RESCUE CLUB</span>
    <span class="practice">Math escape \xB7 Grade 5</span>
  </header>

  <div class="mission-heading">
    <div>
      <p class="eyebrow">A woodland rescue adventure</p>
      <h1>{{ mission.title }}</h1>
      <p>{{ mission.subtitle }}</p>
    </div>
    <div class="rescue-meter" aria-live="polite">
      <span class="paw" aria-hidden="true">\u2667</span>
      <div>
        <strong
          >{{ engine().rescued }} <span>/ {{ total }}</span></strong
        ><small>{{ engine().complete ? 'animals home safe' : 'animals freed' }}</small>
      </div>
    </div>
  </div>

  @if (runtime.warning()) {
    <div class="save-warning" role="alert">
      {{ runtime.warning() }}
      @if (runtime.restoreBlocked()) {
        <button (click)="restart()">Start a new rescue</button>
      }
    </div>
  }

  <div class="game-layout">
    <section class="world-column" aria-label="Castle and rescue progress">
      <div class="castle-scene" [class.dawn]="engine().complete">
        <img
          class="castle-art"
          [src]="mission.environment"
          alt="An illustrated moonlit castle, animal courtyards, watchtowers, a moat bridge, and a boat landing beside the forest."
        />
        <div class="map-caption">
          <span class="eyebrow">YOUR FIELD MAP</span>
          <h2>{{ engine().complete ? 'A new day. An empty castle.' : mission.mapTitle }}</h2>
        </div>
        <span class="moon-label">{{ engine().complete ? '\u2600 Sunrise' : '\u263E After midnight' }}</span>
        @for (pen of pens; track pen.id) {
          <div
            class="map-pen"
            [class.open]="engine().solved.has(pen.id)"
            [style.left.%]="pen.x"
            [style.top.%]="pen.y"
            aria-hidden="true"
          >
            @for (animal of pen.animals; track animal.id) {
              @if (!engine().released.has(animal.id)) {
                @for (n of sequence(animal.count); track n) {
                  <img [src]="animal.image" alt="" />
                }
              }
            }
            @if (engine().solved.has(pen.id)) {
              <span>FREE</span>
            }
          </div>
        }
        @for (s of mission.steps; track s.id; let i = $index) {
          <button
            class="map-pin"
            [class.current]="engine().started && i === engine().index"
            [class.done]="engine().solved.has(s.id)"
            [style.left.%]="s.x"
            [style.top.%]="s.y"
            [disabled]="!engine().started || i > engine().index"
            (click)="inspect(i)"
            [attr.aria-label]="
              s.place +
              (engine().solved.has(s.id)
                ? ': solved, review clue'
                : i === engine().index
                  ? ': current puzzle'
                  : ': locked')
            "
            [attr.aria-current]="i === engine().index && engine().started ? 'step' : null"
          >
            {{ engine().solved.has(s.id) ? '\u2713' : i + 1 }}
          </button>
        }
        <div class="map-note">
          <span class="note-dot"></span
          >{{
            engine().complete
              ? 'Every animal made it home.'
              : !engine().started
                ? 'Your way in is the secret gate.'
                : 'Next stop: ' + engine().current.place
          }}
          <span class="following-animals" aria-hidden="true">
            @for (a of mission.animals; track a.id) {
              @if (engine().released.has(a.id)) {
                <img [src]="a.image" alt="" />
              }
            }
          </span>
        </div>
      </div>
      <div class="animal-roster">
        @for (animal of mission.animals; track animal.id) {
          <div class="animal-card" [class.free]="engine().released.has(animal.id)">
            <div class="portrait">
              <img [src]="animal.image" alt="" />
              @if (!engine().released.has(animal.id)) {
                <span class="pen-bars" aria-hidden="true"></span>
              }
            </div>
            <div>
              <strong>
                @if (engine().solved.size > 0) {
                  {{ animal.count }}
                }
                {{ animal.name.toLowerCase() }}</strong
              ><span>{{
                engine().released.has(animal.id)
                  ? engine().complete
                    ? 'Home safe'
                    : 'Following you!'
                  : 'Waiting for rescue'
              }}</span>
            </div>
            @if (engine().released.has(animal.id)) {
              <span class="free-check" aria-label="Freed">\u2713</span>
            }
          </div>
        }
      </div>
      <div class="field-note">
        <span aria-hidden="true">\u2727</span>
        <p>
          <strong>Think like a rescuer.</strong> Look closely. Try an idea. Every lock has a
          mathematical clue.
        </p>
        <span class="thinking-time">Thinking time is unlimited</span>
      </div>
    </section>

    <section #panel class="puzzle-panel" tabindex="-1" aria-label="Current escape puzzle">
      @if (showRestart()) {
        <p class="eyebrow">A fresh start</p>
        <h2>Start a fresh rescue?</h2>
        <p class="story">This replaces the progress saved for this game. You can also keep your current rescue.</p>
        <button class="primary" (click)="dismissRestart()">Keep playing <span>\u2192</span></button>
        <button class="text-button" (click)="restart()">Start fresh</button>
      } @else if (runtime.restoreBlocked()) {
        <p class="eyebrow">Saved game needs attention</p>
        <h2>Your rescue is waiting</h2>
        <p>{{ runtime.warning() }}</p>
        <button class="primary" (click)="restart()">Start a new rescue <span>\u2192</span></button>
      } @else if (!engine().started) {
        <div class="briefing-stamp" aria-hidden="true">\u263E</div>
        <p class="eyebrow">YOUR MISSION \xB7 {{ mission.steps.length }} MATH CHALLENGES</p>
        <h2>{{ mission.introductionTitle }}</h2>
        <p class="story">{{ mission.briefing }}</p>
        <div class="mission-rules">
          <p><span>01</span> Inspect clues and operate the locks.</p>
          <p><span>02</span> Free every animal, one pen at a time.</p>
          <p><span>03</span> Get everyone to the sanctuary boat.</p>
        </div>
        <button class="primary" (click)="start()">Enter the secret gate <span>\u2192</span></button>
        <p class="gentle-note">
          Take your time. Hints are always here, and you can retry any puzzle.
        </p>
      } @else if (engine().complete && review() === null) {
        <div class="briefing-stamp success-stamp" aria-hidden="true">\u2713</div>
        <p class="eyebrow">RESCUE COMPLETE \xB7 {{ total }} / {{ total }} SAFE</p>
        <h2>Home before<br />the sunrise.</h2>
        <p class="story">{{ mission.finale }}</p>
        <div class="home-animals">
          @for (a of mission.animals; track a.id) {
            @for (n of sequence(a.count); track n) {
              <img [src]="a.image" [alt]="a.name + ' rescued'" />
            }
          }
        </div>
        <p class="completion-note">{{ mission.steps.length }} mechanisms opened with your math.</p>
        <button class="primary" (click)="inspect(0)">
          Look through your rescue trail <span>\u2192</span>
        </button>
        <button class="text-button" (click)="requestRestart()">Play again</button>
      } @else {
        <div class="puzzle-kicker">
          <span class="eyebrow"
            >{{ review() !== null ? 'RESCUE JOURNAL' : 'ESCAPE STEP' }}
            {{ (review() ?? engine().index) + 1 }} / {{ mission.steps.length }}</span
          ><span class="skill">{{ puzzle().skill }}</span>
        </div>
        <h2>{{ step().title }}</h2>
        <p class="story">{{ step().story }}</p>
        @if (solved()) {
          <div class="unlock-result" role="status">
            <span class="result-icon" aria-hidden="true">\u2713</span>
            <h3>{{ step().success }}</h3>
            <p>{{ step().explanation }}</p>
            @for (a of mission.animals; track a.id) {
              @if (step().release.includes(a.id)) {
                <div class="released-animals">
                  @for (n of sequence(a.count); track n) {
                    <img [src]="a.image" [alt]="a.name + ' freed'" />
                  }
                </div>
              }
            }
          </div>
          @if (review() !== null) {
            <button class="primary" (click)="resume()">
              {{ engine().complete ? 'Back to the sanctuary' : 'Back to the rescue' }}
              <span>\u2192</span>
            </button>
          } @else {
            <button class="primary" (click)="next()">
              {{
                engine().index === mission.steps.length - 1
                  ? 'Bring everyone home'
                  : 'Continue to ' + mission.steps[engine().index + 1].place
              }}
              <span>\u2192</span>
            </button>
          }
        } @else {
          <div class="clue-board">
            <span class="clue-label">FOUND AT THE SCENE</span>
            @for (clue of step().clues; track clue.label) {
              <div>
                <span>{{ clue.label }}</span
                ><strong>{{ clue.value }}</strong>
              </div>
            }
          </div>
          @if (countAnimals()) {
            <div class="census" aria-label="Count the animals inside the pens">
              @for (a of mission.animals; track a.id) {
                <div class="census-row">
                  <span>{{ a.name }}</span>
                  <div>
                    @for (n of sequence(a.count); track n) {
                      <button
                        type="button"
                        (click)="mark(a.id + n)"
                        [attr.aria-pressed]="marked().has(a.id + n)"
                        [attr.aria-label]="a.name + ' animal ' + (n + 1) + ': mark as counted'"
                        [class.counted]="marked().has(a.id + n)"
                      >
                        <img [src]="a.image" alt="" />
                        @if (marked().has(a.id + n)) {
                          <span aria-hidden="true">\u2713</span>
                        }
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          }
          <form (ngSubmit)="submit()">
            <p class="puzzle-prompt">{{ puzzle().prompt }}</p>
            @if (puzzle(); as p) {
              @switch (p.type) {
                @case ('code') {
                  <div class="combination-lock" role="group" aria-label="Combination lock">
                    <span class="lock-bolt" aria-hidden="true"></span>
                    @for (label of p.labels; track $index; let i = $index) {
                      <div class="dial">
                        <span>{{ label }}</span
                        ><button
                          type="button"
                          (click)="turn(i, 1)"
                          [attr.aria-label]="'Increase ' + label + ' digit'"
                        >
                          \u2303</button
                        ><output [attr.aria-label]="label + ' digit'" aria-live="polite">{{
                          digits()[i]
                        }}</output
                        ><button
                          type="button"
                          (click)="turn(i, -1)"
                          [attr.aria-label]="'Decrease ' + label + ' digit'"
                        >
                          \u2304
                        </button>
                      </div>
                    }
                  </div>
                }
                @case ('timing') {
                  <div class="timing-mechanism">
                    <div
                      class="clock-face"
                      aria-hidden="true"
                      [style.background]="
                        'conic-gradient(#e2ddc6 0deg ' +
                        (p.safeStart / p.cycle) * 360 +
                        'deg, #a8c48b ' +
                        (p.safeStart / p.cycle) * 360 +
                        'deg ' +
                        (p.safeEnd / p.cycle) * 360 +
                        'deg, #e2ddc6 ' +
                        (p.safeEnd / p.cycle) * 360 +
                        'deg 360deg)'
                      "
                    >
                      <span class="clock-top">0</span
                      ><span class="clock-right">{{ p.cycle / 4 }}</span
                      ><span class="clock-bottom">{{ p.cycle / 2 }}</span
                      ><span class="clock-left">{{ (p.cycle * 3) / 4 }}</span>
                      <div
                        class="clock-hand"
                        [style.transform]="'rotate(' + (departure() / p.cycle) * 360 + 'deg)'"
                      ></div>
                      <i></i>
                    </div>
                    <div class="clock-readout">
                      <span>DEPARTURE</span><strong>{{ departure() }}<small> sec</small></strong>
                      <p>Arrive at second {{ departure() + p.crossing }}</p>
                    </div>
                  </div>
                  <label class="range-label" for="departure">Set the departure second</label
                  ><input
                    id="departure"
                    type="range"
                    min="0"
                    [max]="p.cycle - 1"
                    step="1"
                    [ngModel]="departure()"
                    (ngModelChange)="departure.set(+$event); feedback.set('')"
                    name="departure"
                  />
                  <div class="patrol-track" aria-hidden="true">
                    <div
                      [style.left.%]="(p.safeStart / p.cycle) * 100"
                      [style.width.%]="((p.safeEnd - p.safeStart) / p.cycle) * 100"
                    ></div>
                    <span [style.left.%]="(departure() / p.cycle) * 100"></span>
                  </div>
                  <p class="track-caption">
                    Green = lookout facing away \xB7 {{ p.safeStart }}\u2013{{ p.safeEnd }} seconds
                  </p>
                }
                @case ('balance') {
                  <div class="balance-machine" aria-label="Selected counterweight">
                    <div
                      class="balance-beam"
                      [class.level]="balanceTotal() === p.target"
                      [class.heavy]="balanceTotal() > p.target"
                    >
                      <span>Basket<br />+ owls</span><span>{{ balanceTotal() }} kg</span>
                    </div>
                    <div class="fulcrum"></div>
                  </div>
                  <div class="weight-options" role="group" aria-label="Choose counterweights">
                    @for (weight of p.weights; track $index; let i = $index) {
                      <button
                        type="button"
                        [attr.aria-pressed]="weights().includes(i)"
                        [class.selected]="weights().includes(i)"
                        (click)="toggleWeight(i)"
                      >
                        {{ weight }} <small>kg</small
                        ><span>{{ weights().includes(i) ? 'On lift \u2713' : 'Add weight' }}</span>
                      </button>
                    }
                  </div>
                  <p class="track-caption" aria-live="polite">
                    Counterweight: {{ balanceTotal() }} kg \xB7 Tap again to remove a weight.
                  </p>
                }
                @case ('number') {
                  <label class="answer-label" for="quantity">Your answer in {{ p.unit }}</label>
                  <div class="quantity-control">
                    <button type="button" aria-label="Decrease answer" (click)="adjust(-1)">
                      \u2212</button
                    ><input
                      id="quantity"
                      type="number"
                      name="answer"
                      min="0"
                      [max]="p.max"
                      step="any"
                      inputmode="decimal"
                      [(ngModel)]="answer"
                      placeholder="?"
                      autocomplete="off"
                    /><button type="button" aria-label="Increase answer" (click)="adjust(1)">
                      +</button
                    ><span>{{ p.unit }}</span>
                  </div>
                }
              }
            }
            <div class="feedback" aria-live="polite">{{ feedback() }}</div>
            <button class="primary" type="submit">{{ step().action }} <span>\u2192</span></button>
            <button
              class="hint-button"
              type="button"
              (click)="hint.set(!hint())"
              [attr.aria-expanded]="hint()"
            >
              \u2727 {{ hint() ? 'Hide hint' : 'I need a hint' }}
            </button>
            @if (hint()) {
              <p class="hint-text">{{ puzzle().hint }}</p>
            }
          </form>
        }
      }
    </section>
  </div>

  <nav class="escape-trail" aria-label="Your eight-step escape trail">
    @for (s of mission.steps; track s.id; let i = $index) {
      <button
        [disabled]="!engine().started || i > engine().index"
        [class.active]="i === (review() ?? engine().index)"
        [class.done]="engine().solved.has(s.id)"
        (click)="inspect(i)"
        [attr.aria-current]="i === engine().index && engine().started ? 'step' : null"
      >
        <span>{{ engine().solved.has(s.id) ? '\u2713' : s.icon }}</span
        >{{ s.place }}
      </button>
    }
  </nav>
  <footer>
    <span>{{ mission.setting }}</span
    ><button class="text-button" (click)="requestRestart()">Start over</button>
  </footer>
</main>
`, styles: ['/* src/app/templates/heist/escape/ui/escape.component.scss */\n:host {\n  display: block;\n  color: #edf0db;\n  background: #112d29;\n  min-height: 100vh;\n  font-family:\n    "Trebuchet MS",\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput {\n  font: inherit;\n}\nbutton,\na,\ninput {\n  -webkit-tap-highlight-color: transparent;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  cursor: default;\n}\nbutton:focus-visible,\na:focus-visible,\ninput:focus-visible {\n  outline: 3px solid #cc9b40;\n  outline-offset: 4px;\n}\n.escape-shell {\n  max-width: 1512px;\n  margin: auto;\n  padding: 0 40px 22px;\n}\n.topbar {\n  height: 68px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.0823529412);\n  font-size: 12px;\n}\n.back-link {\n  color: #c9d6c6;\n  text-decoration: none;\n  display: flex;\n  gap: 9px;\n  align-items: center;\n}\n.back-link span {\n  font-size: 20px;\n}\n.brand {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2.5px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.brand > span {\n  font-size: 28px;\n  color: #e4c484;\n}\n.practice {\n  color: #bdcdbf;\n}\n.mission-heading {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  align-items: center;\n  padding: 29px 0 25px;\n}\n.eyebrow {\n  margin: 0 0 9px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  color: #bcc7ac;\n}\nh1,\nh2,\nh3,\np {\n  margin-top: 0;\n}\nh1 {\n  font-family: Georgia, serif;\n  font-weight: 400;\n  font-size: clamp(28px, 3.2vw, 45px);\n  line-height: 1.08;\n  margin-bottom: 9px;\n  letter-spacing: -0.7px;\n}\n.mission-heading > div > p:last-child {\n  color: #bdccbf;\n  font-size: 14px;\n  margin-bottom: 0;\n}\n.rescue-meter {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 12px 22px;\n  border: 1px solid rgba(138, 163, 136, 0.2509803922);\n  border-radius: 12px;\n  background: #1c3931;\n  min-width: 166px;\n}\n.rescue-meter .paw {\n  color: #d9c98e;\n  font-size: 39px;\n}\n.rescue-meter strong {\n  font-size: 29px;\n  font-family: Georgia, serif;\n  font-weight: 400;\n}\n.rescue-meter strong span {\n  color: #a5baa5;\n  font-size: 20px;\n}\n.rescue-meter small {\n  display: block;\n  color: #bbcfb7;\n  font-size: 11px;\n  margin-top: 3px;\n}\n.game-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1.34fr) minmax(380px, 1fr);\n  gap: 24px;\n  align-items: start;\n}\n.world-column {\n  min-width: 0;\n}\n.castle-scene {\n  aspect-ratio: 1.315;\n  position: relative;\n  isolation: isolate;\n  background: #23463e;\n  overflow: hidden;\n  border-radius: 16px;\n  border: 1px solid rgba(168, 186, 149, 0.2);\n}\n.castle-art {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.castle-scene:after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  background: linear-gradient(rgba(235, 201, 124, 0.2666666667), transparent);\n}\n.castle-scene.dawn .castle-art {\n  filter: brightness(1.35) sepia(0.15);\n}\n.map-caption {\n  position: absolute;\n  left: 24px;\n  top: 22px;\n  pointer-events: none;\n}\n.map-caption .eyebrow {\n  color: #d2d1ad;\n  font-size: 9px;\n}\n.map-caption h2 {\n  font: 22px Georgia, serif;\n  color: #ecedce;\n  margin: 7px 0;\n}\n.moon-label {\n  position: absolute;\n  right: 18px;\n  top: 24px;\n  font-size: 10px;\n  background: rgba(16, 43, 45, 0.4901960784);\n  color: #d8d9b8;\n  padding: 6px 9px;\n  border-radius: 20px;\n}\n.map-pin {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 1px solid rgba(201, 198, 161, 0.431372549);\n  background: #263e37;\n  color: #d2d6b9;\n  font-weight: 700;\n  font-size: 12px;\n  box-shadow: 0 3px 10px rgba(12, 32, 28, 0.4);\n}\n.map-pin:disabled {\n  color: #e0dfc5;\n  background: #243b36;\n  opacity: 0.85;\n}\n.map-pin.current {\n  width: 43px;\n  height: 43px;\n  color: #293e31;\n  background: #f0ce84;\n  border: 5px solid #816b44;\n  box-shadow: 0 0 0 6px rgba(239, 208, 133, 0.1254901961);\n}\n.map-pin.done {\n  background: #cae3ac;\n  color: #224433;\n  border-color: #e3efcc;\n}\n.map-pen {\n  position: absolute;\n  width: 92px;\n  min-height: 28px;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  background: rgba(40, 76, 54, 0.8);\n  border: 2px solid #b5a57a;\n  border-radius: 5px;\n  padding: 3px;\n  pointer-events: none;\n}\n.map-pen img {\n  width: 25px;\n  height: 27px;\n}\n.map-pen:after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      transparent 0 16px,\n      rgba(206, 198, 166, 0.5019607843) 17px 19px,\n      transparent 20px 26px);\n}\n.map-pen.open {\n  background: rgba(35, 71, 49, 0.7333333333);\n  border-style: dashed;\n  border-color: rgba(159, 189, 130, 0.4666666667);\n}\n.map-pen.open:after {\n  display: none;\n}\n.map-pen > span {\n  font-size: 9px;\n  color: #dcf0b3;\n  letter-spacing: 1.5px;\n  padding: 3px;\n}\n.following-animals {\n  display: flex;\n  margin-left: auto;\n  gap: 3px;\n}\n.following-animals img {\n  width: 27px;\n  height: 27px;\n}\n.map-note {\n  position: absolute;\n  bottom: 16px;\n  left: 18px;\n  right: 18px;\n  background: rgba(17, 46, 43, 0.9098039216);\n  color: #e2e8ca;\n  padding: 12px 14px;\n  border: 1px solid rgba(214, 222, 189, 0.1411764706);\n  border-radius: 8px;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.note-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 100%;\n  background: #ead193;\n  flex-shrink: 0;\n}\n.animal-roster {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 9px;\n  margin-top: 12px;\n}\n.animal-card {\n  position: relative;\n  border: 1px solid rgba(175, 193, 153, 0.1450980392);\n  border-radius: 10px;\n  padding: 10px 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #1b3730;\n}\n.portrait {\n  flex-shrink: 0;\n  position: relative;\n  width: 44px;\n  height: 49px;\n}\n.portrait img {\n  width: 100%;\n  height: 100%;\n}\n.pen-bars {\n  position: absolute;\n  inset: 0;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      transparent 0 9px,\n      #84958c 10px 12px,\n      transparent 13px 15px);\n  border-top: 3px solid #84958c;\n  border-bottom: 3px solid #84958c;\n  border-radius: 4px;\n  opacity: 0.8;\n}\n.animal-card strong {\n  font-size: 12px;\n  display: block;\n  color: #e0e5cf;\n}\n.animal-card div > span:not(.pen-bars) {\n  display: block;\n  font-size: 9px;\n  color: #b0c1ad;\n  margin-top: 5px;\n}\n.animal-card.free {\n  border-color: rgba(140, 174, 102, 0.3607843137);\n  background: #284330;\n}\n.free-check {\n  position: absolute;\n  top: 5px;\n  right: 7px;\n  color: #d8eeb9;\n  font-size: 12px;\n}\n.field-note {\n  display: flex;\n  gap: 10px;\n  margin-top: 18px;\n  align-items: start;\n  color: #acbfae;\n}\n.field-note > span:first-child {\n  color: #d5c492;\n  font-size: 25px;\n}\n.field-note p {\n  font-size: 11px;\n  line-height: 1.7;\n  max-width: 310px;\n  margin: 0;\n}\n.field-note strong {\n  color: #dce5cb;\n  font-weight: 400;\n}\n.thinking-time {\n  font-size: 9px;\n  margin-left: auto;\n  padding-top: 6px;\n  text-align: right;\n  line-height: 1.5;\n  max-width: 98px;\n}\n.puzzle-panel {\n  background: #f2eddc;\n  color: #26392e;\n  border-radius: 15px;\n  padding: 28px;\n  border: 1px solid #faf8e5;\n  box-shadow: 0 12px 35px rgba(5, 26, 32, 0.1254901961);\n  min-height: 536px;\n  scroll-margin: 16px;\n}\n.puzzle-panel:focus {\n  outline: none;\n}\n.puzzle-panel:focus-visible {\n  outline: 3px solid #ddc587;\n  outline-offset: 4px;\n}\n.puzzle-panel .eyebrow {\n  color: #647455;\n}\n.puzzle-panel h2 {\n  font: 31px/1.12 Georgia, serif;\n  letter-spacing: -0.4px;\n  margin-bottom: 13px;\n}\n.puzzle-panel .story {\n  font-size: 13px;\n  line-height: 1.65;\n  color: #566050;\n  margin-bottom: 21px;\n}\n.briefing-stamp {\n  width: 66px;\n  height: 66px;\n  border: 1px solid #9aab80;\n  outline: 1px dashed #a6ad89;\n  outline-offset: -6px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  font-size: 36px;\n  color: #526847;\n  margin: 0 0 27px;\n  transform: rotate(-12deg);\n}\n.mission-rules {\n  padding: 17px 0 10px;\n  margin: 0 0 17px;\n  border-top: 1px solid #c2c6ad;\n}\n.mission-rules p {\n  font-size: 12px;\n  margin-bottom: 13px;\n  display: flex;\n  align-items: center;\n  gap: 13px;\n}\n.mission-rules span {\n  font-size: 10px;\n  color: #7c835f;\n}\n.primary {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  min-height: 48px;\n  padding: 13px 17px;\n  border: 1px solid #294f37;\n  border-radius: 7px;\n  background: #244d37;\n  color: #fff7df;\n  font-size: 13px;\n  font-weight: 700;\n  gap: 12px;\n  text-align: left;\n}\n.primary:hover {\n  background: #356044;\n}\n.primary > span {\n  font-size: 22px;\n  line-height: 1;\n  font-weight: 400;\n}\n.gentle-note {\n  text-align: center;\n  color: #667058;\n  font-size: 10px;\n  line-height: 1.6;\n  margin: 14px 5px 0;\n}\n.puzzle-kicker {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.puzzle-kicker .eyebrow {\n  margin: 0;\n  font-size: 9px;\n  letter-spacing: 1.2px;\n}\n.skill {\n  font-size: 9px;\n  color: #526446;\n  background: #e2e5ce;\n  padding: 5px 8px;\n  border-radius: 20px;\n}\n.clue-board {\n  position: relative;\n  padding: 19px 13px 10px;\n  border: 1px dashed #aab090;\n  background: #e8e6d0;\n  border-radius: 7px;\n  margin-bottom: 17px;\n}\n.clue-label {\n  position: absolute;\n  top: -6px;\n  left: 12px;\n  background: #e8e6d0;\n  padding: 0 4px;\n  font-size: 8px;\n  font-weight: 700;\n  color: #687352;\n  letter-spacing: 1.4px;\n}\n.clue-board > div {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 10px;\n  font-size: 10px;\n  padding: 4px 0;\n}\n.clue-board > div > span {\n  color: #65705b;\n}\n.clue-board strong {\n  font-weight: 700;\n  font-size: 12px;\n  text-align: right;\n  color: #394b35;\n}\n.census {\n  background: #e9dfc9;\n  padding: 7px 10px;\n  border-radius: 7px;\n  margin-bottom: 15px;\n}\n.census-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.census-row > span {\n  width: 45px;\n  flex-shrink: 0;\n  font-size: 10px;\n  color: #57624a;\n}\n.census-row > div {\n  display: flex;\n  flex-wrap: wrap;\n}\n.census button {\n  position: relative;\n  width: 39px;\n  height: 42px;\n  padding: 0 2px;\n  border: 0;\n  border-radius: 4px;\n  background: transparent;\n}\n.census button img {\n  width: 100%;\n  height: 100%;\n}\n.census .counted {\n  background: #b7c99b;\n}\n.census button > span {\n  position: absolute;\n  right: 0;\n  bottom: 1px;\n  font-size: 12px;\n  color: #234c32;\n  font-weight: 700;\n  background: #d6e5b8;\n  border-radius: 50%;\n  width: 15px;\n}\n.puzzle-prompt {\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.6;\n  margin-bottom: 14px;\n}\n.combination-lock {\n  display: flex;\n  justify-content: center;\n  gap: 11px;\n  border: 1px solid #ad9d7d;\n  background:\n    linear-gradient(\n      120deg,\n      #d7c4a0,\n      #bbab88);\n  padding: 10px 18px;\n  border-radius: 9px;\n  position: relative;\n  box-shadow: inset 0 0 0 4px rgba(216, 199, 161, 0.3333333333);\n}\n.lock-bolt {\n  position: absolute;\n  left: 10px;\n  top: 48%;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  border: 1px solid #806e4b;\n}\n.dial {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  min-width: 63px;\n}\n.dial > span {\n  font-size: 9px;\n  color: #4d4c36;\n  margin-bottom: 3px;\n}\n.dial button {\n  width: 54px;\n  height: 28px;\n  border: 0;\n  background: rgba(187, 170, 133, 0.5019607843);\n  border-radius: 3px;\n  color: #35402e;\n  font-size: 24px;\n  line-height: 20px;\n}\n.dial button:hover {\n  background: #eee5cb;\n}\n.dial output {\n  width: 54px;\n  border: 1px solid #655c45;\n  text-align: center;\n  font: 30px/40px Georgia, serif;\n  background:\n    linear-gradient(\n      #f4efdf 49%,\n      #c9c1a6 50%,\n      #e9e0c5 52%);\n  color: #293c2d;\n  border-radius: 3px;\n}\n.hint-button,\n.text-button {\n  background: none;\n  border: none;\n  padding: 12px 0;\n  font-size: 11px;\n  color: #cad9bb;\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.puzzle-panel .text-button,\n.hint-button {\n  color: #556548;\n}\n.hint-button {\n  display: block;\n  margin: 0 auto;\n  min-height: 42px;\n}\n.hint-text {\n  padding: 11px;\n  border-radius: 6px;\n  background: #e2e7ca;\n  color: #485d39;\n  font-size: 12px;\n  line-height: 1.6;\n  margin-bottom: 0;\n}\n.feedback {\n  font-size: 12px;\n  color: #8b4e2e;\n  line-height: 1.6;\n  padding: 12px 0;\n  min-height: 16px;\n}\n.feedback:empty {\n  padding: 8px 0;\n}\n.unlock-result {\n  background: #e0e7cd;\n  border: 1px solid #bbc9a2;\n  text-align: center;\n  padding: 28px 20px;\n  border-radius: 10px;\n  margin: 23px 0;\n}\n.result-icon {\n  display: inline-grid;\n  place-items: center;\n  width: 39px;\n  height: 39px;\n  background: #466d42;\n  color: #f5f5da;\n  border-radius: 50%;\n  font-size: 20px;\n  margin-bottom: 15px;\n}\n.unlock-result h3 {\n  font: 23px/1.2 Georgia, serif;\n  margin-bottom: 14px;\n}\n.unlock-result p {\n  font-size: 13px;\n  line-height: 1.7;\n  color: #536449;\n  margin-bottom: 0;\n}\n.released-animals,\n.home-animals {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 18px;\n}\n.released-animals img {\n  width: 42px;\n  animation: arrive 0.45s ease-out both;\n}\n.home-animals img {\n  width: 43px;\n}\n.completion-note {\n  text-align: center;\n  font-size: 12px;\n  margin: 20px 0 24px;\n}\n.success-stamp {\n  background: #dfe9c6;\n}\n.escape-trail {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 0;\n  margin-top: 27px;\n  border: 1px solid rgba(154, 174, 128, 0.1882352941);\n  border-radius: 10px;\n  overflow: hidden;\n}\n.escape-trail button {\n  color: #bfcdb7;\n  background: #1b352d;\n  border: none;\n  padding: 13px 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  text-align: left;\n  font-size: 10px;\n  line-height: 1.5;\n  border-right: 1px solid rgba(154, 174, 128, 0.1254901961);\n  min-height: 60px;\n}\n.escape-trail button > span {\n  color: #8b9e80;\n  font-size: 11px;\n  flex-shrink: 0;\n}\n.escape-trail button.active {\n  background: #e8d6a3;\n  color: #2e4831;\n}\n.escape-trail button.active > span {\n  color: #2e4831;\n}\n.escape-trail button.done:not(.active) {\n  background: #2c472f;\n  color: #deedc8;\n}\n.escape-trail button.done > span {\n  color: #bdd79c;\n}\n.escape-trail button:disabled {\n  color: #9bae9c;\n  background: #173029;\n}\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  color: #93ae99;\n  font-size: 10px;\n  margin-top: 8px;\n}\n.save-warning {\n  padding: 14px;\n  background: #ead5a4;\n  color: #3b422c;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.save-warning button {\n  background: #f3eed9;\n  color: #294331;\n  border: 1px solid #738566;\n  padding: 10px 14px;\n  border-radius: 5px;\n  margin: 5px;\n}\n@keyframes arrive {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 1450px) {\n  .puzzle-panel {\n    padding: 32px;\n  }\n  .puzzle-panel .story {\n    font-size: 14px;\n  }\n}\n@media (max-width: 1100px) {\n  .escape-shell {\n    padding: 0 24px 20px;\n  }\n  .game-layout {\n    grid-template-columns: minmax(0, 1fr) minmax(355px, 1fr);\n    gap: 16px;\n  }\n  .puzzle-panel {\n    padding: 23px;\n  }\n  .animal-card {\n    flex-direction: column;\n    text-align: center;\n    padding: 10px 3px;\n  }\n  .animal-card strong {\n    font-size: 11px;\n  }\n  .thinking-time {\n    display: none;\n  }\n  .map-caption {\n    left: 16px;\n    top: 16px;\n  }\n  .map-caption h2 {\n    font-size: 18px;\n  }\n  .moon-label {\n    display: none;\n  }\n  .escape-trail button {\n    flex-direction: column;\n    align-items: start;\n  }\n}\n@media (max-width: 760px) {\n  .escape-shell {\n    padding: 0 16px 18px;\n  }\n  .topbar {\n    height: 55px;\n  }\n  .brand {\n    font-size: 9px;\n    letter-spacing: 1px;\n  }\n  .practice {\n    display: none;\n  }\n  .mission-heading {\n    padding: 24px 0 20px;\n  }\n  .mission-heading h1 {\n    font-size: 29px;\n  }\n  .mission-heading > div > p:last-child {\n    font-size: 12px;\n  }\n  .rescue-meter {\n    padding: 10px;\n    min-width: 83px;\n  }\n  .rescue-meter .paw {\n    display: none;\n  }\n  .rescue-meter strong {\n    font-size: 25px;\n  }\n  .rescue-meter small {\n    font-size: 9px;\n  }\n  .mission-heading .eyebrow {\n    font-size: 8px;\n    letter-spacing: 1px;\n  }\n  .game-layout {\n    grid-template-columns: 1fr;\n  }\n  .castle-scene {\n    max-height: 340px;\n    aspect-ratio: 1.315;\n    max-width: 450px;\n    margin: auto;\n  }\n  .animal-card {\n    flex-direction: row;\n    text-align: left;\n    padding: 7px;\n  }\n  .animal-card strong {\n    font-size: 11px;\n  }\n  .portrait {\n    width: 34px;\n    height: 40px;\n  }\n  .animal-card div > span:not(.pen-bars) {\n    font-size: 8px;\n  }\n  .field-note {\n    display: none;\n  }\n  .puzzle-panel {\n    padding: 25px;\n    min-height: auto;\n  }\n  .puzzle-panel h2 {\n    font-size: 29px;\n  }\n  .escape-trail {\n    grid-template-columns: repeat(4, 1fr);\n    margin-top: 20px;\n  }\n  .escape-trail button {\n    min-height: 62px;\n    font-size: 9px;\n    border-bottom: 1px solid rgba(154, 174, 128, 0.1254901961);\n  }\n  .census button {\n    width: 39px;\n    height: 44px;\n  }\n  .dial button {\n    min-height: 36px;\n  }\n}\n@media (max-width: 390px) {\n  .escape-shell {\n    padding: 0 12px 16px;\n  }\n  .puzzle-panel {\n    padding: 20px;\n  }\n  .animal-card {\n    gap: 3px;\n  }\n  .portrait {\n    width: 29px;\n  }\n  .animal-card strong {\n    font-size: 10px;\n  }\n  .census {\n    padding: 6px;\n  }\n  .census-row {\n    gap: 3px;\n  }\n  .census button {\n    width: 34px;\n  }\n  .puzzle-kicker {\n    gap: 6px;\n  }\n  .quantity-control {\n    gap: 5px;\n  }\n  .quantity-control input {\n    width: 75px;\n  }\n  .quantity-control > span {\n    font-size: 11px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *:before,\n  *:after {\n    animation: none !important;\n    transition: none !important;\n    scroll-behavior: auto !important;\n  }\n}\n/*# sourceMappingURL=escape.component.css.map */\n', '/* src/app/templates/heist/escape/ui/escape-mechanisms.scss */\n.timing-mechanism {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  justify-content: center;\n  padding: 7px 0 18px;\n}\n.clock-face {\n  width: 128px;\n  height: 128px;\n  position: relative;\n  border: 6px solid #a69c76;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      #e2ddc6 0deg 120deg,\n      #a8c48b 120deg 210deg,\n      #e2ddc6 210deg 360deg);\n  box-shadow: inset 0 0 0 3px #f8f2dc;\n}\n.clock-face span {\n  position: absolute;\n  font-size: 10px;\n  color: #4a583e;\n}\n.clock-top {\n  left: 47%;\n  top: 5px;\n}\n.clock-bottom {\n  left: 44%;\n  bottom: 5px;\n}\n.clock-left {\n  left: 5px;\n  top: 46%;\n}\n.clock-right {\n  right: 5px;\n  top: 46%;\n}\n.clock-hand {\n  position: absolute;\n  width: 3px;\n  height: 43px;\n  left: calc(50% - 1.5px);\n  bottom: 50%;\n  background: #334c39;\n  transform-origin: bottom;\n  border-radius: 3px;\n}\n.clock-face i {\n  position: absolute;\n  top: calc(50% - 4px);\n  left: calc(50% - 4px);\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #334c39;\n}\n.clock-readout > span {\n  font-size: 8px;\n  letter-spacing: 1.8px;\n  color: #717958;\n  display: block;\n}\n.clock-readout strong {\n  font: 39px Georgia, serif;\n}\n.clock-readout small {\n  font-size: 16px;\n}\n.clock-readout p {\n  font-size: 10px;\n  margin: 5px 0 0;\n  color: #657055;\n}\n.range-label,\n.answer-label {\n  display: block;\n  font-size: 11px;\n  margin-bottom: 9px;\n  color: #53634a;\n}\ninput[type=range] {\n  width: 100%;\n  accent-color: #34583b;\n  min-height: 30px;\n}\n.patrol-track {\n  height: 7px;\n  position: relative;\n  background: #d7c7a4;\n  margin: 0 8px;\n  border-radius: 4px;\n}\n.patrol-track > div {\n  position: absolute;\n  height: 100%;\n  background: #739a59;\n}\n.patrol-track > span {\n  position: absolute;\n  top: -3px;\n  width: 2px;\n  height: 13px;\n  background: #2b4b34;\n}\n.track-caption {\n  font-size: 10px;\n  color: #697657;\n  text-align: center;\n  margin: 12px 0;\n  line-height: 1.6;\n}\n.balance-machine {\n  position: relative;\n  height: 107px;\n  padding-top: 30px;\n  margin: 10px 30px 5px;\n}\n.balance-beam {\n  width: 100%;\n  height: 6px;\n  background: #777652;\n  transform: rotate(-8deg);\n  transition: transform 0.3s;\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  z-index: 1;\n}\n.balance-beam.level {\n  transform: rotate(0);\n  background: #426a3c;\n}\n.balance-beam.heavy {\n  transform: rotate(8deg);\n}\n.balance-beam > span {\n  display: grid;\n  place-items: center;\n  width: 70px;\n  height: 55px;\n  border-radius: 0 0 30px 30px;\n  background: #d4c5a1;\n  border: 2px solid #9b926c;\n  font-size: 11px;\n  text-align: center;\n  padding: 8px;\n}\n.fulcrum {\n  position: absolute;\n  top: 33px;\n  left: calc(50% - 25px);\n  width: 0;\n  height: 0;\n  border-left: 25px solid transparent;\n  border-right: 25px solid transparent;\n  border-bottom: 61px solid #9c9c75;\n}\n.weight-options {\n  display: flex;\n  gap: 9px;\n}\n.weight-options button {\n  flex: 1;\n  border: 1px solid #adb091;\n  color: #425237;\n  background: #e5e1cd;\n  padding: 13px 3px 9px;\n  border-radius: 8px 8px 4px 4px;\n  font: 23px Georgia, serif;\n  min-height: 76px;\n}\n.weight-options small {\n  font: 11px "Trebuchet MS", sans-serif;\n}\n.weight-options span {\n  display: block;\n  font: 9px "Trebuchet MS", sans-serif;\n  margin-top: 9px;\n}\n.weight-options .selected {\n  background: #36583b;\n  color: #f1f3d7;\n  border-color: #36583b;\n}\n.quantity-control {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 18px 12px;\n  background: #e8e2ce;\n  border: 1px solid #c7c7aa;\n  border-radius: 9px;\n  margin-bottom: 4px;\n}\n.quantity-control button {\n  width: 42px;\n  height: 44px;\n  flex-shrink: 0;\n  border: 1px solid #a7af8d;\n  border-radius: 5px;\n  background: #eee9d6;\n  color: #4f6844;\n  font-size: 24px;\n}\n.quantity-control input {\n  min-width: 0;\n  width: 85px;\n  height: 56px;\n  font: 29px Georgia, serif;\n  text-align: center;\n  border: 1px solid #9aa884;\n  border-radius: 5px;\n  background: #faf7ea;\n  color: #304b35;\n}\n.quantity-control > span {\n  font-size: 12px;\n  color: #657355;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=escape-mechanisms.css.map */\n'] }]
  }], null, { panel: [{
    type: ViewChild,
    args: ["panel"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EscapeComponent, { className: "EscapeComponent", filePath: "src/app/templates/heist/escape/ui/escape.component.ts", lineNumber: 22 });
})();
export {
  EscapeComponent
};
//# debugId=5f46b6e8-10e5-591c-aeff-c39779b8d8c1
//# sourceMappingURL=chunk-UNED6M7X.js.map
