import {
  BlockPlanComponent
} from "./chunk-5NMHGW4V.js";
import {
  DecimalPipe
} from "./chunk-ENCFJY7U.js";
import {
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtextInterpolate8
} from "./chunk-E2VJWGUE.js";

// src/app/templates/engineering-design/ui/engineering-exhibit.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function EngineeringExhibitComponent_For_30_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const a_r1 = ctx;
    \u0275\u0275textInterpolate4(" ", a_r1.axis.toUpperCase(), " axis \xB7 \xD8 ", \u0275\u0275pipeBind2(1, 4, a_r1.diameter, "1.0-3"), " m \xB7 ", a_r1.insert, " / ", a_r1.insert === "open" ? "unfiltered" : a_r1.color, " ");
  }
}
function EngineeringExhibitComponent_For_30_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Solid ");
  }
}
function EngineeringExhibitComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275pipe(11, "number");
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275conditionalCreate(16, EngineeringExhibitComponent_For_30_Conditional_16_Template, 2, 7)(17, EngineeringExhibitComponent_For_30_Conditional_17_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const b_r2 = ctx.$implicit;
    const \u0275$index_48_r3 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_48_r3 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", \u0275\u0275pipeBind2(5, 9, b_r2.width, "1.0-3"), " \xD7 ", \u0275\u0275pipeBind2(6, 12, b_r2.height, "1.0-3"), " \xD7 ", \u0275\u0275pipeBind2(7, 15, b_r2.depth, "1.0-3"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" ", \u0275\u0275pipeBind2(10, 18, b_r2.x, "1.0-3"), " / ", \u0275\u0275pipeBind2(11, 21, b_r2.y, "1.0-3"), " / ", \u0275\u0275pipeBind2(12, 24, b_r2.z, "1.0-3"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", b_r2.rotation, "\xB0");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = b_r2.aperture) ? 16 : 17, tmp_15_0);
  }
}
function EngineeringExhibitComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Central sculpture:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate8(" ", o_r4.model, " \xB7 ", o_r4.material, " \xB7 width ", o_r4.width, " m, height ", o_r4.height, " m \xB7 X ", o_r4.x, ", base Y ", o_r4.y, ", Z ", o_r4.z, " m \xB7 rotation ", o_r4.rotation, "\xB0. ");
  }
}
function EngineeringExhibitComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r5.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(": X ", target_r5.x, " m, Y ", target_r5.y ?? 0, " m, Z ", target_r5.z, " m. ");
  }
}
function EngineeringExhibitComponent_For_38_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r6.value);
  }
}
function EngineeringExhibitComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "h4");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl");
    \u0275\u0275repeaterCreate(6, EngineeringExhibitComponent_For_38_For_7_Template, 4, 2, null, null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trial_r7 = ctx.$implicit;
    const \u0275$index_95_r8 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Trial ", \u0275$index_95_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Prediction: ", trial_r7.prediction || "No prediction recorded.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(trial_r7.measurements);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", trial_r7.design.blocks.length, " blocks in this saved design");
  }
}
function EngineeringExhibitComponent_ForEmpty_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No trials recorded yet.");
    \u0275\u0275elementEnd();
  }
}
var EngineeringExhibitComponent = class _EngineeringExhibitComponent {
  title = input.required(
    ...ngDevMode ? [{ debugName: "title" }] : (
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
  static \u0275fac = function EngineeringExhibitComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EngineeringExhibitComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EngineeringExhibitComponent, selectors: [["app-engineering-exhibit"]], inputs: { title: [1, "title"], snapshot: [1, "snapshot"] }, decls: 40, vars: 6, consts: [[1, "eyebrow"], [1, "explanation"], [3, "design"], [1, "table-scroll"], [1, "trials"]], template: function EngineeringExhibitComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article")(1, "p", 0);
      \u0275\u0275text(2, "DESIGN EXHIBIT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h2");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 1);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h3");
      \u0275\u0275text(8, "Construction plan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p");
      \u0275\u0275text(10, " Dimensions are metres. X = east, Y = base height, Z = south. Orient the physical base to true north. ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "app-block-plan", 2);
      \u0275\u0275elementStart(12, "div", 3)(13, "table")(14, "caption");
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "thead")(17, "tr")(18, "th");
      \u0275\u0275text(19, "Block");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th");
      \u0275\u0275text(21, "Width \xD7 height \xD7 depth");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th");
      \u0275\u0275text(23, "X / Y / Z");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th");
      \u0275\u0275text(25, "Rotation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th");
      \u0275\u0275text(27, "Centered hole / insert");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "tbody");
      \u0275\u0275repeaterCreate(29, EngineeringExhibitComponent_For_30_Template, 18, 27, "tr", null, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(31, EngineeringExhibitComponent_Conditional_31_Template, 4, 8, "p");
      \u0275\u0275repeaterCreate(32, EngineeringExhibitComponent_For_33_Template, 4, 4, "p", null, _forTrack0);
      \u0275\u0275elementStart(34, "h3");
      \u0275\u0275text(35, "Testing evidence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 4);
      \u0275\u0275repeaterCreate(37, EngineeringExhibitComponent_For_38_Template, 10, 3, "section", null, _forTrack0, false, EngineeringExhibitComponent_ForEmpty_39_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.snapshot().exhibit || "Write your explanation to introduce this design.", " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("design", ctx.snapshot().design);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.snapshot().design.blocks.length, " measured blocks ");
      \u0275\u0275advance(14);
      \u0275\u0275repeater(ctx.snapshot().design.blocks);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_5_0 = ctx.snapshot().design.displayObject) ? 31 : -1, tmp_5_0);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.snapshot().design.targets);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.snapshot().trials);
    }
  }, dependencies: [BlockPlanComponent, DecimalPipe], styles: ["\narticle[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #fffdf7;\n  border: 1px solid #d8dbcb;\n  border-radius: 14px;\n  color: #173c36;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  letter-spacing: 0.15em;\n  font-size: 12px;\n}\n.explanation[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.7;\n}\n.table-scroll[_ngcontent-%COMP%] {\n  overflow: auto;\n}\ntable[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  width: 100%;\n  text-align: left;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #d8dbcb;\n  font-size: 13px;\n}\ncaption[_ngcontent-%COMP%] {\n  text-align: left;\n  margin: 10px 0;\n}\n.trials[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 12px;\n}\n.trials[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  background: #edf3ed;\n  padding: 16px;\n  border-radius: 10px;\n}\ndl[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 2px 0 10px;\n}\nh4[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n/*# sourceMappingURL=engineering-exhibit.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EngineeringExhibitComponent, [{
    type: Component,
    args: [{ selector: "app-engineering-exhibit", imports: [DecimalPipe, BlockPlanComponent], template: ` <article>
    <p class="eyebrow">DESIGN EXHIBIT</p>
    <h2>{{ title() }}</h2>
    <p class="explanation">
      {{ snapshot().exhibit || 'Write your explanation to introduce this design.' }}
    </p>
    <h3>Construction plan</h3>
    <p>
      Dimensions are metres. X = east, Y = base height, Z = south. Orient the physical base to true
      north.
    </p>
    <app-block-plan [design]="snapshot().design" />
    <div class="table-scroll">
      <table>
        <caption>
          {{
            snapshot().design.blocks.length
          }}
          measured blocks
        </caption>
        <thead>
          <tr>
            <th>Block</th>
            <th>Width \xD7 height \xD7 depth</th>
            <th>X / Y / Z</th>
            <th>Rotation</th>
            <th>Centered hole / insert</th>
          </tr>
        </thead>
        <tbody>
          @for (b of snapshot().design.blocks; track b.id; let i = $index) {
            <tr>
              <td>{{ i + 1 }}</td>
              <td>
                {{ b.width | number: '1.0-3' }} \xD7 {{ b.height | number: '1.0-3' }} \xD7
                {{ b.depth | number: '1.0-3' }}
              </td>
              <td>
                {{ b.x | number: '1.0-3' }} / {{ b.y | number: '1.0-3' }} /
                {{ b.z | number: '1.0-3' }}
              </td>
              <td>{{ b.rotation }}\xB0</td>
              <td>
                @if (b.aperture; as a) {
                  {{ a.axis.toUpperCase() }} axis \xB7 \xD8 {{ a.diameter | number: '1.0-3' }} m \xB7
                  {{ a.insert }} / {{ a.insert === 'open' ? 'unfiltered' : a.color }}
                } @else {
                  Solid
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    @if (snapshot().design.displayObject; as o) {
      <p>
        <strong>Central sculpture:</strong> {{ o.model }} \xB7 {{ o.material }} \xB7 width
        {{ o.width }} m, height {{ o.height }} m \xB7 X {{ o.x }}, base Y {{ o.y }}, Z {{ o.z }} m \xB7
        rotation {{ o.rotation }}\xB0.
      </p>
    }
    @for (target of snapshot().design.targets; track target.id) {
      <p>
        <strong>{{ target.label }}</strong
        >: X {{ target.x }} m, Y {{ target.y ?? 0 }} m, Z {{ target.z }} m.
      </p>
    }
    <h3>Testing evidence</h3>
    <div class="trials">
      @for (trial of snapshot().trials; track trial.id; let i = $index) {
        <section>
          <h4>Trial {{ i + 1 }}</h4>
          <p>Prediction: {{ trial.prediction || 'No prediction recorded.' }}</p>
          <dl>
            @for (m of trial.measurements; track m.label) {
              <dt>{{ m.label }}</dt>
              <dd>{{ m.value }}</dd>
            }
          </dl>
          <small>{{ trial.design.blocks.length }} blocks in this saved design</small>
        </section>
      } @empty {
        <p>No trials recorded yet.</p>
      }
    </div>
  </article>`, styles: ["/* angular:styles/component:scss;da1661b3c613d43f0b7ed63e98dcefb9bad2746d436236529015d37fc0df784c;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/engineering-exhibit.component.ts */\narticle {\n  padding: 24px;\n  background: #fffdf7;\n  border: 1px solid #d8dbcb;\n  border-radius: 14px;\n  color: #173c36;\n}\n.eyebrow {\n  letter-spacing: 0.15em;\n  font-size: 12px;\n}\n.explanation {\n  white-space: pre-wrap;\n  line-height: 1.7;\n}\n.table-scroll {\n  overflow: auto;\n}\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  text-align: left;\n}\nth,\ntd {\n  padding: 10px;\n  border-bottom: 1px solid #d8dbcb;\n  font-size: 13px;\n}\ncaption {\n  text-align: left;\n  margin: 10px 0;\n}\n.trials {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 12px;\n}\n.trials section {\n  background: #edf3ed;\n  padding: 16px;\n  border-radius: 10px;\n}\ndl {\n  font-size: 13px;\n}\ndt {\n  font-weight: 700;\n}\ndd {\n  margin: 2px 0 10px;\n}\nh4 {\n  margin-top: 0;\n}\n/*# sourceMappingURL=engineering-exhibit.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], snapshot: [{ type: Input, args: [{ isSignal: true, alias: "snapshot", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EngineeringExhibitComponent, { className: "EngineeringExhibitComponent", filePath: "src/app/templates/engineering-design/ui/engineering-exhibit.component.ts", lineNumber: 155 });
})();

export {
  EngineeringExhibitComponent
};
//# debugId=307ffcd4-aa31-57b6-82b7-a75ee51180e5
//# sourceMappingURL=chunk-QNAGWBLA.js.map
