import {
  BlockPlanComponent
} from "./chunk-5NMHGW4V.js";
import {
  isBlockDesign,
  makePart
} from "./chunk-T7GOLBBA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import {
  Component,
  Input,
  Output,
  effect,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E2VJWGUE.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/engineering-design/ui/design-optics-builder.component.ts
function DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Color");
    \u0275\u0275elementStart(2, "select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Conditional_13_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.color, $event) || (ctx_r1.color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(3, "option", 25);
    \u0275\u0275text(4, "Clear");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 26);
    \u0275\u0275text(6, "Ruby red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 27);
    \u0275\u0275text(8, "Amber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 28);
    \u0275\u0275text(10, "Emerald green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 29);
    \u0275\u0275text(12, "Sapphire blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 30);
    \u0275\u0275text(14, "Amethyst violet");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.color);
    \u0275\u0275control();
  }
}
function DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "label");
    \u0275\u0275text(2, "Hole diameter (cm)");
    \u0275\u0275elementStart(3, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.diameter, $event) || (ctx_r1.diameter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label");
    \u0275\u0275text(5, "Insert");
    \u0275\u0275elementStart(6, "select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.insert, $event) || (ctx_r1.insert = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 22);
    \u0275\u0275text(8, "Empty hole");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 23);
    \u0275\u0275text(10, "Flat glass lens / filter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 24);
    \u0275\u0275text(12, "Jewel window");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Conditional_13_Template, 15, 1, "label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, " The centered hole must be smaller than 90% of both face dimensions. Turn the block to aim it. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.diameter);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.insert);
    \u0275\u0275control();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.insert !== "open" ? 13 : -1);
  }
}
function DesignOpticsBuilderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Opening");
    \u0275\u0275elementStart(2, "select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Conditional_12_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.axis, $event) || (ctx_r1.axis = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(3, "option", 17);
    \u0275\u0275text(4, "Solid block");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 18);
    \u0275\u0275text(6, "Front to back (local Z)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 19);
    \u0275\u0275text(8, "Side to side (local X)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 20);
    \u0275\u0275text(10, "Top to bottom (Y)");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DesignOpticsBuilderComponent_Conditional_12_Conditional_11_Template, 16, 3);
    \u0275\u0275elementStart(12, "button", 16);
    \u0275\u0275listener("click", function DesignOpticsBuilderComponent_Conditional_12_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveHole());
    });
    \u0275\u0275text(13, "Apply opening to selected block");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.axis);
    \u0275\u0275control();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r1.axis !== "none" ? 11 : -1);
  }
}
function DesignOpticsBuilderComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Select a block above to cut its hole and choose an insert.");
    \u0275\u0275elementEnd();
  }
}
function DesignOpticsBuilderComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function DesignOpticsBuilderComponent_Conditional_61_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeObject());
    });
    \u0275\u0275text(1, "Remove sculpture");
    \u0275\u0275elementEnd();
  }
}
var DesignOpticsBuilderComponent = class _DesignOpticsBuilderComponent {
  design = input.required(
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = input(
    "",
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  selected = output();
  axis = "none";
  diameter = 5;
  insert = "open";
  color = "red";
  model = "crystal";
  material = "limestone";
  objectWidth = 40;
  objectHeight = 65;
  objectX = 1.2;
  objectY = 0;
  objectZ = -0.7;
  objectRotation = 0;
  constructor() {
    effect(() => {
      const b = this.design().blocks.find((b2) => b2.id === this.selectedId());
      const a = b?.aperture;
      this.axis = a?.axis || "none";
      this.diameter = a ? a.diameter * 100 : b ? Math.min(b.width, b.height) * 50 : 5;
      this.insert = a?.insert || "open";
      this.color = a?.color || "red";
      const o = this.design().displayObject;
      if (o) {
        this.model = o.model;
        this.material = o.material;
        this.objectWidth = o.width * 100;
        this.objectHeight = o.height * 100;
        this.objectX = o.x;
        this.objectY = o.y;
        this.objectZ = o.z;
        this.objectRotation = o.rotation;
      }
    });
  }
  saveHole() {
    const aperture = this.axis === "none" ? void 0 : {
      axis: this.axis,
      diameter: this.diameter / 100,
      insert: this.insert,
      color: this.color
    };
    this.changed.emit(__spreadProps(__spreadValues({}, this.design()), {
      blocks: this.design().blocks.map((b) => b.id === this.selectedId() ? __spreadProps(__spreadValues({}, b), { aperture }) : b)
    }));
  }
  saveObject() {
    this.changed.emit(__spreadProps(__spreadValues({}, this.design()), {
      displayObject: {
        model: this.model,
        material: this.material,
        width: this.objectWidth / 100,
        height: this.objectHeight / 100,
        x: this.objectX,
        y: this.objectY,
        z: this.objectZ,
        rotation: this.objectRotation
      }
    }));
  }
  removeObject() {
    const _a = this.design(), { displayObject: _ } = _a, rest = __objRest(_a, ["displayObject"]);
    this.changed.emit(rest);
  }
  addWindow() {
    const positions = [
      1.2,
      -1.2,
      2.4,
      -2.4,
      3.6,
      -3.6,
      4.8,
      -4.8,
      6,
      -6,
      7.2,
      -7.2,
      8.4,
      -8.4,
      9.6,
      -9.6,
      10.8,
      -10.8
    ];
    const x = positions.find((x2) => !this.design().blocks.some((b) => Math.abs(b.x - x2) < 0.5 + Math.hypot(b.width, b.depth) / 2 && Math.abs(b.z) < 0.1 + Math.hypot(b.width, b.depth) / 2)) ?? 1.2;
    const id = crypto.randomUUID();
    this.changed.emit(__spreadProps(__spreadValues({}, this.design()), {
      blocks: [
        ...this.design().blocks,
        ...[-0.34, 0.34].map((dx) => ({
          id: crypto.randomUUID(),
          x: x + dx,
          y: 0,
          z: 0,
          width: 0.12,
          height: 0.6,
          depth: 0.12,
          rotation: 0
        })),
        {
          id,
          x,
          y: 0.6,
          z: 0,
          width: 0.8,
          height: 0.8,
          depth: 0.06,
          rotation: 0,
          aperture: { axis: "z", diameter: 0.48, insert: "glass", color: "red" }
        }
      ]
    }));
    this.objectX = x;
    this.selected.emit(id);
  }
  static \u0275fac = function DesignOpticsBuilderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DesignOpticsBuilderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DesignOpticsBuilderComponent, selectors: [["app-design-optics-builder"]], inputs: { design: [1, "design"], selectedId: [1, "selectedId"] }, outputs: { changed: "changed", selected: "selected" }, decls: 64, vars: 12, consts: [["aria-label", "Light windows and sculpture"], [3, "click", "disabled"], [1, "note"], [1, "fields"], [3, "ngModelChange", "ngModel"], ["value", "crystal"], ["value", "sphere"], ["value", "obelisk"], ["value", "limestone"], ["value", "porcelain"], ["value", "bronze"], ["type", "number", "min", "5", "max", "500", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "-12", "max", "12", "step", "0.05", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "10", "step", "0.05", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "359", 3, "ngModelChange", "ngModel"], [1, "actions"], [3, "click"], ["value", "none"], ["value", "z"], ["value", "x"], ["value", "y"], ["type", "number", "min", "0.5", "step", "0.5", 3, "ngModelChange", "ngModel"], ["value", "open"], ["value", "glass"], ["value", "jewel"], ["value", "clear"], ["value", "red"], ["value", "amber"], ["value", "green"], ["value", "blue"], ["value", "violet"]], template: function DesignOpticsBuilderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "h3");
      \u0275\u0275text(2, "Shape the light");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p");
      \u0275\u0275text(4, "A deep hole admits a narrow range of Sun angles. A thin window admits a wider range.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 1);
      \u0275\u0275listener("click", function DesignOpticsBuilderComponent_Template_button_click_5_listener() {
        return ctx.addWindow();
      });
      \u0275\u0275text(6, " Add a supported light window ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, " This adds three measured blocks in a free space. Select its upper block to change the insert. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "details")(10, "summary");
      \u0275\u0275text(11, "Cylindrical hole & colored insert");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, DesignOpticsBuilderComponent_Conditional_12_Template, 14, 2)(13, DesignOpticsBuilderComponent_Conditional_13_Template, 2, 0, "p");
      \u0275\u0275elementStart(14, "p", 2);
      \u0275\u0275text(15, " Inserts filter straight sunlight. Lens focusing, refraction and prism rainbows are not simulated. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "details")(17, "summary");
      \u0275\u0275text(18, "Central 3D sculpture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p");
      \u0275\u0275text(20, " Build around a sculpture. Compare its lit faces, cast shadow and colored light at each special date. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 3)(22, "label");
      \u0275\u0275text(23, "Model");
      \u0275\u0275elementStart(24, "select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_select_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model, $event) || (ctx.model = $event);
        return $event;
      });
      \u0275\u0275elementStart(25, "option", 5);
      \u0275\u0275text(26, "Faceted crystal sculpture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "option", 6);
      \u0275\u0275text(28, "Round sculpture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "option", 7);
      \u0275\u0275text(30, "Obelisk");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "label");
      \u0275\u0275text(32, "Surface");
      \u0275\u0275elementStart(33, "select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_select_ngModelChange_33_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.material, $event) || (ctx.material = $event);
        return $event;
      });
      \u0275\u0275elementStart(34, "option", 8);
      \u0275\u0275text(35, "Pale limestone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "option", 9);
      \u0275\u0275text(37, "White porcelain");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "option", 10);
      \u0275\u0275text(39, "Bronze");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "label");
      \u0275\u0275text(41, "Width (cm)");
      \u0275\u0275elementStart(42, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_42_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectWidth, $event) || (ctx.objectWidth = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "label");
      \u0275\u0275text(44, "Height (cm)");
      \u0275\u0275elementStart(45, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectHeight, $event) || (ctx.objectHeight = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "label");
      \u0275\u0275text(47, "East X (m)");
      \u0275\u0275elementStart(48, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_48_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectX, $event) || (ctx.objectX = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "label");
      \u0275\u0275text(50, "South Z (m)");
      \u0275\u0275elementStart(51, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectZ, $event) || (ctx.objectZ = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "label");
      \u0275\u0275text(53, "Base Y (m)");
      \u0275\u0275elementStart(54, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectY, $event) || (ctx.objectY = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "label");
      \u0275\u0275text(56, "Rotation (\xB0)");
      \u0275\u0275elementStart(57, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function DesignOpticsBuilderComponent_Template_input_ngModelChange_57_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.objectRotation, $event) || (ctx.objectRotation = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 15)(59, "button", 16);
      \u0275\u0275listener("click", function DesignOpticsBuilderComponent_Template_button_click_59_listener() {
        return ctx.saveObject();
      });
      \u0275\u0275text(60);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(61, DesignOpticsBuilderComponent_Conditional_61_Template, 2, 0, "button");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "p");
      \u0275\u0275text(63, " Place it behind a colored window, with space for the light to reach it. Pale surfaces show colors most clearly. ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.design().blocks.length > 97);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.selectedId() ? 12 : 13);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.model);
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.material);
      \u0275\u0275control();
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectWidth);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectHeight);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectX);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectZ);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectY);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.objectRotation);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.design().displayObject ? "Update sculpture" : "Add sculpture", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.design().displayObject ? 61 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  margin: 18px 0;\n  padding: 16px;\n  background: #f2ede5;\n  border: 1px solid #d5c5ad;\n  border-radius: 12px;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: #503b21;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #5d594d;\n}\n.fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));\n  gap: 10px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  font-size: 13px;\n  margin: 8px 0;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 42px;\n  padding: 8px;\n  border: 1px solid #b7a68d;\n  border-radius: 7px;\n  background: #fffdfa;\n  color: #3c362d;\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 14px 0;\n  font-weight: 650;\n  font-size: 14px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 10px;\n}\n.note[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n*[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bd7317;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=design-optics-builder.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DesignOpticsBuilderComponent, [{
    type: Component,
    args: [{ selector: "app-design-optics-builder", imports: [FormsModule], template: `
    <section aria-label="Light windows and sculpture">
      <h3>Shape the light</h3>
      <p>A deep hole admits a narrow range of Sun angles. A thin window admits a wider range.</p>
      <button (click)="addWindow()" [disabled]="design().blocks.length > 97">
        Add a supported light window
      </button>
      <p>
        This adds three measured blocks in a free space. Select its upper block to change the
        insert.
      </p>
      <details>
        <summary>Cylindrical hole &amp; colored insert</summary>
        @if (selectedId()) {
          <label
            >Opening<select [(ngModel)]="axis">
              <option value="none">Solid block</option>
              <option value="z">Front to back (local Z)</option>
              <option value="x">Side to side (local X)</option>
              <option value="y">Top to bottom (Y)</option>
            </select></label
          >
          @if (axis !== 'none') {
            <div class="fields">
              <label
                >Hole diameter (cm)<input type="number" min="0.5" step="0.5" [(ngModel)]="diameter"
              /></label>
              <label
                >Insert<select [(ngModel)]="insert">
                  <option value="open">Empty hole</option>
                  <option value="glass">Flat glass lens / filter</option>
                  <option value="jewel">Jewel window</option>
                </select></label
              >
              @if (insert !== 'open') {
                <label
                  >Color<select [(ngModel)]="color">
                    <option value="clear">Clear</option>
                    <option value="red">Ruby red</option>
                    <option value="amber">Amber</option>
                    <option value="green">Emerald green</option>
                    <option value="blue">Sapphire blue</option>
                    <option value="violet">Amethyst violet</option>
                  </select></label
                >
              }
            </div>
            <p>
              The centered hole must be smaller than 90% of both face dimensions. Turn the block to
              aim it.
            </p>
          }
          <button (click)="saveHole()">Apply opening to selected block</button>
        } @else {
          <p>Select a block above to cut its hole and choose an insert.</p>
        }
        <p class="note">
          Inserts filter straight sunlight. Lens focusing, refraction and prism rainbows are not
          simulated.
        </p>
      </details>
      <details>
        <summary>Central 3D sculpture</summary>
        <p>
          Build around a sculpture. Compare its lit faces, cast shadow and colored light at each
          special date.
        </p>
        <div class="fields">
          <label
            >Model<select [(ngModel)]="model">
              <option value="crystal">Faceted crystal sculpture</option>
              <option value="sphere">Round sculpture</option>
              <option value="obelisk">Obelisk</option>
            </select></label
          >
          <label
            >Surface<select [(ngModel)]="material">
              <option value="limestone">Pale limestone</option>
              <option value="porcelain">White porcelain</option>
              <option value="bronze">Bronze</option>
            </select></label
          >
          <label
            >Width (cm)<input type="number" min="5" max="500" [(ngModel)]="objectWidth"
          /></label>
          <label
            >Height (cm)<input type="number" min="5" max="500" [(ngModel)]="objectHeight"
          /></label>
          <label
            >East X (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="objectX"
          /></label>
          <label
            >South Z (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="objectZ"
          /></label>
          <label
            >Base Y (m)<input type="number" min="0" max="10" step="0.05" [(ngModel)]="objectY"
          /></label>
          <label
            >Rotation (\xB0)<input type="number" min="0" max="359" [(ngModel)]="objectRotation"
          /></label>
        </div>
        <div class="actions">
          <button (click)="saveObject()">
            {{ design().displayObject ? 'Update sculpture' : 'Add sculpture' }}
          </button>
          @if (design().displayObject) {
            <button (click)="removeObject()">Remove sculpture</button>
          }
        </div>
        <p>
          Place it behind a colored window, with space for the light to reach it. Pale surfaces show
          colors most clearly.
        </p>
      </details>
    </section>
  `, styles: ["/* angular:styles/component:scss;a58ca17a311f36c4ba6455854daef3d9a264bd329ab35028ad45976a251f1b0b;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/design-optics-builder.component.ts */\n:host {\n  display: block;\n  margin: 18px 0;\n  padding: 16px;\n  background: #f2ede5;\n  border: 1px solid #d5c5ad;\n  border-radius: 12px;\n}\nh3 {\n  margin: 0 0 8px;\n  color: #503b21;\n}\np {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #5d594d;\n}\n.fields {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));\n  gap: 10px;\n}\nlabel {\n  display: grid;\n  gap: 5px;\n  font-size: 13px;\n  margin: 8px 0;\n}\ninput,\nselect,\nbutton {\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 42px;\n  padding: 8px;\n  border: 1px solid #b7a68d;\n  border-radius: 7px;\n  background: #fffdfa;\n  color: #3c362d;\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n}\nsummary {\n  cursor: pointer;\n  padding: 14px 0;\n  font-weight: 650;\n  font-size: 14px;\n}\n.actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 10px;\n}\n.note {\n  font-size: 12px;\n}\n*:focus-visible {\n  outline: 3px solid #bd7317;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=design-optics-builder.component.css.map */\n"] }]
  }], () => [], { design: [{ type: Input, args: [{ isSignal: true, alias: "design", required: true }] }], selectedId: [{ type: Input, args: [{ isSignal: true, alias: "selectedId", required: false }] }], changed: [{ type: Output, args: ["changed"] }], selected: [{ type: Output, args: ["selected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DesignOpticsBuilderComponent, { className: "DesignOpticsBuilderComponent", filePath: "src/app/templates/engineering-design/ui/design-optics-builder.component.ts", lineNumber: 198 });
})();

// src/app/templates/engineering-design/ui/block-builder.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.size;
function BlockBuilderComponent_Conditional_3_For_60_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const stone_r5 = ctx_r3.$implicit;
    const \u0275$index_98_r6 = ctx_r3.$index;
    \u0275\u0275property("value", stone_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(stone_r5.label || "Block " + (\u0275$index_98_r6 + 1));
  }
}
function BlockBuilderComponent_Conditional_3_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BlockBuilderComponent_Conditional_3_For_60_Conditional_0_Template, 2, 2, "option", 14);
  }
  if (rf & 2) {
    const stone_r5 = ctx.$implicit;
    const edit_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!edit_r3.selection().includes(stone_r5.id) ? 0 : -1);
  }
}
function BlockBuilderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Choose a piece, then drag it in the plan or 3D scene. Shift-click selects more stones.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 23)(3, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPart("pillar"));
    });
    \u0275\u0275text(4, "\uFF0B Pillar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPart("lintel"));
    });
    \u0275\u0275text(6, "\uFF0B Lintel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPart("gate"));
    });
    \u0275\u0275text(8, "\uFF0B Gate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addPart("window"));
    });
    \u0275\u0275text(10, "\uFF0B Window stone");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 3)(12, "label");
    \u0275\u0275text(13, "Snap");
    \u0275\u0275elementStart(14, "select", 12);
    \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_select_ngModelChange_14_listener($event) {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.snap.set(+$event));
    });
    \u0275\u0275elementStart(15, "option", 14);
    \u0275\u0275text(16, "Free");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 14);
    \u0275\u0275text(18, "1 cm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 14);
    \u0275\u0275text(20, "5 cm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 14);
    \u0275\u0275text(22, "10 cm");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "label");
    \u0275\u0275text(24, "Select");
    \u0275\u0275elementStart(25, "select", 12);
    \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_select_ngModelChange_25_listener($event) {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.assemblies.set($event === true || $event === "true"));
    });
    \u0275\u0275elementStart(26, "option", 25);
    \u0275\u0275text(27, "Whole gate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 25);
    \u0275\u0275text(29, "Individual stone");
    \u0275\u0275elementEnd()();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275element(30, "app-block-plan", 26);
    \u0275\u0275elementStart(31, "div", 27)(32, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_32_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.transform({ turn: 15 }));
    });
    \u0275\u0275text(33, " \u21B6 15\xB0 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_34_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.transform({ turn: -15 }));
    });
    \u0275\u0275text(35, " \u21B7 15\xB0 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_36_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.duplicate());
    });
    \u0275\u0275text(37, "Duplicate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_38_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.group());
    });
    \u0275\u0275text(39, "Group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_40_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.ungroup());
    });
    \u0275\u0275text(41, "Ungroup");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.remove());
    });
    \u0275\u0275text(43, "Remove");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_44_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.undo());
    });
    \u0275\u0275text(45, "Undo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_46_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(edit_r3.redo());
    });
    \u0275\u0275text(47, "Redo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "p", 28);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "details")(51, "summary");
    \u0275\u0275text(52, "Snap to another stone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "label");
    \u0275\u0275text(54, "Reference stone");
    \u0275\u0275elementStart(55, "select", null, 0)(57, "option", 13);
    \u0275\u0275text(58, "Choose a stone");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(59, BlockBuilderComponent_Conditional_3_For_60_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 9)(62, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_62_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      const support_r7 = \u0275\u0275reference(56);
      return \u0275\u0275resetView(edit_r3.alignTo(support_r7.value, "top"));
    });
    \u0275\u0275text(63, " Stack on top");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_64_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      const support_r7 = \u0275\u0275reference(56);
      return \u0275\u0275resetView(edit_r3.alignTo(support_r7.value, "north"));
    });
    \u0275\u0275text(65, "North edge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_66_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      const support_r7 = \u0275\u0275reference(56);
      return \u0275\u0275resetView(edit_r3.alignTo(support_r7.value, "south"));
    });
    \u0275\u0275text(67, "South edge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_68_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      const support_r7 = \u0275\u0275reference(56);
      return \u0275\u0275resetView(edit_r3.alignTo(support_r7.value, "east"));
    });
    \u0275\u0275text(69, "East edge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_3_Template_button_click_70_listener() {
      const edit_r3 = \u0275\u0275restoreView(_r1);
      const support_r7 = \u0275\u0275reference(56);
      return \u0275\u0275resetView(edit_r3.alignTo(support_r7.value, "west"));
    });
    \u0275\u0275text(71, "West edge");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "p");
    \u0275\u0275text(73, " Edges align along the court axes. Top placement centers the selection over the reference stone. Check support before building. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "details")(75, "summary");
    \u0275\u0275text(76, "Piece sizes & classroom kit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 3)(78, "label");
    \u0275\u0275text(79, "Gate opening (cm)");
    \u0275\u0275elementStart(80, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_80_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.gateWidth, $event) || (ctx_r1.gateWidth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "label");
    \u0275\u0275text(82, "Gate height (cm)");
    \u0275\u0275elementStart(83, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_83_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.gateHeight, $event) || (ctx_r1.gateHeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "label");
    \u0275\u0275text(85, "Gate depth (cm)");
    \u0275\u0275elementStart(86, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_86_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.gateDepth, $event) || (ctx_r1.gateDepth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 3)(88, "label");
    \u0275\u0275text(89, "Pillar width (cm)");
    \u0275\u0275elementStart(90, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_90_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pillarWidth, $event) || (ctx_r1.pillarWidth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "label");
    \u0275\u0275text(92, "Pillar height (cm)");
    \u0275\u0275elementStart(93, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_93_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pillarHeight, $event) || (ctx_r1.pillarHeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "label");
    \u0275\u0275text(95, "Pillar depth (cm)");
    \u0275\u0275elementStart(96, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_96_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pillarDepth, $event) || (ctx_r1.pillarDepth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "label");
    \u0275\u0275text(98, "Lintel width (cm)");
    \u0275\u0275elementStart(99, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_99_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.lintelWidth, $event) || (ctx_r1.lintelWidth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "label");
    \u0275\u0275text(101, "Lintel height (cm)");
    \u0275\u0275elementStart(102, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_102_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.lintelHeight, $event) || (ctx_r1.lintelHeight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "label");
    \u0275\u0275text(104, "Lintel depth (cm)");
    \u0275\u0275elementStart(105, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Conditional_3_Template_input_ngModelChange_105_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.lintelDepth, $event) || (ctx_r1.lintelDepth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "p");
    \u0275\u0275text(107, " Set these sizes to match your classroom blocks. Gate sizes describe the clear opening; two pillars and one lintel are added together. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const edit_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("ngModel", edit_r3.snap());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 0.01);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 0.05);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 0.1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", edit_r3.assemblies());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("design", ctx_r1.design())("editor", edit_r3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", edit_r3.selection().length < 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.canUndo());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !edit_r3.canRedo());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("invalid", edit_r3.draftError());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", edit_r3.draftError() || edit_r3.message(), " ");
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.design().blocks);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !edit_r3.selection().length);
    \u0275\u0275advance(18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.gateWidth);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.gateHeight);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.gateDepth);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pillarWidth);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pillarHeight);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pillarDepth);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.lintelWidth);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.lintelHeight);
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.lintelDepth);
    \u0275\u0275control();
  }
}
function BlockBuilderComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function BlockBuilderComponent_Conditional_43_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.undo());
    });
    \u0275\u0275text(1, "Undo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.previous());
  }
}
function BlockBuilderComponent_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const block_r9 = ctx.$implicit;
    const \u0275$index_256_r10 = ctx.$index;
    \u0275\u0275property("value", block_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", block_r9.label || "Block " + (\u0275$index_256_r10 + 1), " \xB7 base ", block_r9.y * 100, " cm ");
  }
}
function BlockBuilderComponent_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const part_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", part_r11.count, " \xD7 ", part_r11.size);
  }
}
function BlockBuilderComponent_For_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 24);
    \u0275\u0275listener("click", function BlockBuilderComponent_For_96_Template_button_click_2_listener() {
      const target_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeTarget(target_r13.id));
    });
    \u0275\u0275text(3, " Remove ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const target_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", target_r13.label, " \xB7 X ", target_r13.x * 100, ", Y ", (target_r13.y ?? 0) * 100, ", Z ", target_r13.z * 100, " cm ");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Remove target " + target_r13.label);
  }
}
function BlockBuilderComponent_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
var BlockBuilderComponent = class _BlockBuilderComponent {
  design = input.required(
    ...ngDevMode ? [{ debugName: "design" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editor = input(
    ...ngDevMode ? [void 0, { debugName: "editor" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  selected = signal(
    "",
    ...ngDevMode ? [{ debugName: "selected" }] : (
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
  previous = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "previous" }] : (
      /* istanbul ignore next */
      []
    )
  );
  width = 10;
  height = 10;
  depth = 10;
  x = 0.2;
  y = 0;
  z = 0;
  rotation = 0;
  blockName = "";
  gateWidth = 60;
  gateHeight = 80;
  gateDepth = 25;
  pillarWidth = 20;
  pillarHeight = 80;
  pillarDepth = 25;
  lintelWidth = 100;
  lintelHeight = 10;
  lintelDepth = 25;
  targetLabel = "Season marker";
  targetX = 0;
  targetZ = -1;
  targetY = 0;
  targetFace = "up";
  constructor() {
    effect(() => {
      this.design();
      const edit = this.editor();
      const id = edit ? edit.selection()[0] ?? "" : this.selected();
      untracked(() => this.loadSelection(id));
    });
  }
  partsList() {
    const counts = /* @__PURE__ */ new Map();
    for (const b of this.design().blocks) {
      const key = [b.width, b.height, b.depth].map((n) => +(n * 100).toFixed(2)).join(" \xD7 ") + " cm" + (b.aperture ? " \xB7 opening" : "");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts].map(([size, count]) => ({ size, count }));
  }
  addPart(kind) {
    const gate = kind === "gate" || kind === "window";
    const sizes = gate ? [this.gateWidth, this.gateHeight, this.gateDepth] : kind === "lintel" ? [this.lintelWidth, this.lintelHeight, this.lintelDepth] : [this.pillarWidth, this.pillarHeight, this.pillarDepth];
    this.editor()?.place(makePart(kind, sizes[0] / 100, sizes[1] / 100, sizes[2] / 100));
  }
  block(id = crypto.randomUUID()) {
    return __spreadValues({
      id,
      width: this.width / 100,
      height: this.height / 100,
      depth: this.depth / 100,
      x: this.x,
      y: this.y,
      z: this.z,
      rotation: this.rotation
    }, this.blockName.trim() ? { label: this.blockName.trim() } : {});
  }
  change(next) {
    if (this.editor()) {
      this.editor().commit(next);
      return;
    }
    if (!isBlockDesign(next)) {
      this.error.set("Check the dimensions and positions. Blocks and the sculpture\u2019s reserved space must not overlap. A hole must fit within 90% of its face, leaving an unbroken rim. Targets need a label.");
      return;
    }
    this.error.set("");
    this.previous.set(structuredClone(this.design()));
    this.changed.emit(next);
  }
  add() {
    const block = this.block();
    this.change(__spreadProps(__spreadValues({}, this.design()), { blocks: [...this.design().blocks, block] }));
  }
  update() {
    this.change(__spreadProps(__spreadValues({}, this.design()), {
      blocks: this.design().blocks.map((b) => b.id === this.selected() ? __spreadValues(__spreadValues({}, b), this.block(b.id)) : b)
    }));
  }
  select(id) {
    if (this.editor() && this.editor().selection()[0] !== id)
      this.editor().select(id);
    this.loadSelection(id);
  }
  loadSelection(id) {
    this.selected.set(id);
    const b = this.design().blocks.find((b2) => b2.id === id);
    if (b) {
      this.width = b.width * 100;
      this.height = b.height * 100;
      this.depth = b.depth * 100;
      this.x = b.x;
      this.y = b.y;
      this.z = b.z;
      this.rotation = b.rotation;
      this.blockName = b.label ?? "";
    }
  }
  stack() {
    const b = this.design().blocks.find((b2) => b2.id === this.selected());
    if (b)
      this.change(__spreadProps(__spreadValues({}, this.design()), {
        blocks: [
          ...this.design().blocks,
          __spreadProps(__spreadValues({}, b), {
            assemblyId: void 0,
            id: crypto.randomUUID(),
            y: Math.round((b.y + b.height) * 1e4) / 1e4
          })
        ]
      }));
  }
  remove() {
    this.change(__spreadProps(__spreadValues({}, this.design()), {
      blocks: this.design().blocks.filter((b) => !(this.editor()?.selection() ?? [this.selected()]).includes(b.id))
    }));
    this.selected.set("");
  }
  undo() {
    if (this.editor()) {
      this.editor().undo();
      return;
    }
    const prev = this.previous();
    if (prev) {
      this.changed.emit(prev);
      this.previous.set(void 0);
      this.selected.set("");
    }
  }
  addTarget() {
    this.change(__spreadProps(__spreadValues({}, this.design()), {
      targets: [
        ...this.design().targets,
        {
          id: crypto.randomUUID(),
          label: this.targetLabel.trim(),
          x: this.targetX,
          z: this.targetZ,
          y: this.targetY,
          normal: {
            up: [0, 1, 0],
            east: [1, 0, 0],
            west: [-1, 0, 0],
            north: [0, 0, -1],
            south: [0, 0, 1]
          }[this.targetFace]
        }
      ]
    }));
  }
  removeTarget(id) {
    this.change(__spreadProps(__spreadValues({}, this.design()), { targets: this.design().targets.filter((t) => t.id !== id) }));
  }
  static \u0275fac = function BlockBuilderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BlockBuilderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BlockBuilderComponent, selectors: [["app-block-builder"]], inputs: { design: [1, "design"], editor: [1, "editor"] }, outputs: { changed: "changed" }, decls: 98, vars: 27, consts: [["support", ""], ["aria-label", "Measured block builder"], [3, "open"], [1, "fields"], ["type", "number", "min", "1", "max", "500", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "-1200", "max", "1200", "step", "1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "1000", "step", "1", 3, "ngModelChange", "ngModel"], ["maxlength", "80", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "359", "step", "1", 3, "ngModelChange", "ngModel"], [1, "actions"], [3, "click", "disabled"], [3, "disabled"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [3, "changed", "selected", "design", "selectedId"], ["type", "number", "min", "0", "max", "1500", "step", "1", 3, "ngModelChange", "ngModel"], ["value", "up"], ["value", "east"], ["value", "west"], ["value", "north"], ["value", "south"], ["role", "alert"], ["aria-label", "Construction pieces", 1, "actions", "parts"], [3, "click"], [3, "ngValue"], [3, "design", "editor"], ["aria-label", "Selected stone tools", 1, "actions"], ["role", "status"], ["type", "number", "min", "5", "max", "300", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "2", "max", "100", 3, "ngModelChange", "ngModel"]], template: function BlockBuilderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "h3");
      \u0275\u0275text(2, "Shape your monument");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, BlockBuilderComponent_Conditional_3_Template, 108, 31);
      \u0275\u0275elementStart(4, "details", 2)(5, "summary");
      \u0275\u0275text(6, "Exact measurements & openings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "All measurements are in centimetres. East +X, south +Z, height above the ground +Y.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 3)(10, "label");
      \u0275\u0275text(11, "Width (cm)");
      \u0275\u0275elementStart(12, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.width, $event) || (ctx.width = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "label");
      \u0275\u0275text(14, "Height (cm)");
      \u0275\u0275elementStart(15, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.height, $event) || (ctx.height = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "label");
      \u0275\u0275text(17, "Depth (cm)");
      \u0275\u0275elementStart(18, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.depth, $event) || (ctx.depth = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "label");
      \u0275\u0275text(20, "East X (cm)");
      \u0275\u0275elementStart(21, "input", 5);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_21_listener($event) {
        return ctx.x = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "label");
      \u0275\u0275text(23, "South Z (cm)");
      \u0275\u0275elementStart(24, "input", 5);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_24_listener($event) {
        return ctx.z = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "label");
      \u0275\u0275text(26, "Base Y (cm)");
      \u0275\u0275elementStart(27, "input", 6);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_27_listener($event) {
        return ctx.y = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "label");
      \u0275\u0275text(29, "Stone name");
      \u0275\u0275elementStart(30, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.blockName, $event) || (ctx.blockName = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "label");
      \u0275\u0275text(32, "Rotation (\xB0)");
      \u0275\u0275elementStart(33, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_33_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.rotation, $event) || (ctx.rotation = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 9)(35, "button", 10);
      \u0275\u0275listener("click", function BlockBuilderComponent_Template_button_click_35_listener() {
        return ctx.add();
      });
      \u0275\u0275text(36, "Add block");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 10);
      \u0275\u0275listener("click", function BlockBuilderComponent_Template_button_click_37_listener() {
        return ctx.update();
      });
      \u0275\u0275text(38, "Update selected");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 10);
      \u0275\u0275listener("click", function BlockBuilderComponent_Template_button_click_39_listener() {
        return ctx.stack();
      });
      \u0275\u0275text(40, " Stack a copy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 10);
      \u0275\u0275listener("click", function BlockBuilderComponent_Template_button_click_41_listener() {
        return ctx.remove();
      });
      \u0275\u0275text(42, "Remove selected");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(43, BlockBuilderComponent_Conditional_43_Template, 2, 1, "button", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "label");
      \u0275\u0275text(45, "Select a block");
      \u0275\u0275elementStart(46, "select", 12);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_select_ngModelChange_46_listener($event) {
        return ctx.select($event);
      });
      \u0275\u0275elementStart(47, "option", 13);
      \u0275\u0275text(48, "Choose a block");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(49, BlockBuilderComponent_For_50_Template, 2, 3, "option", 14, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "p");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "app-design-optics-builder", 15);
      \u0275\u0275listener("changed", function BlockBuilderComponent_Template_app_design_optics_builder_changed_53_listener($event) {
        return ctx.change($event);
      })("selected", function BlockBuilderComponent_Template_app_design_optics_builder_selected_53_listener($event) {
        return ctx.select($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "details")(55, "summary");
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(57, BlockBuilderComponent_For_58_Template, 2, 2, "p", null, _forTrack1);
      \u0275\u0275elementStart(59, "p");
      \u0275\u0275text(60, " Use these dimensions for the physical model. Support must be checked with your real blocks. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "details")(62, "summary");
      \u0275\u0275text(63, "Place ground or pillar targets");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "p");
      \u0275\u0275text(65, " Each ring marks a point to test for sunlight or shadow. Put a pillar mark exactly on its face. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 3)(67, "label");
      \u0275\u0275text(68, "Target label");
      \u0275\u0275elementStart(69, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.targetLabel, $event) || (ctx.targetLabel = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "label");
      \u0275\u0275text(71, "East X (cm)");
      \u0275\u0275elementStart(72, "input", 5);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_72_listener($event) {
        return ctx.targetX = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "label");
      \u0275\u0275text(74, "South Z (cm)");
      \u0275\u0275elementStart(75, "input", 5);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_75_listener($event) {
        return ctx.targetZ = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "div", 3)(77, "label");
      \u0275\u0275text(78, "Target height Y (cm)");
      \u0275\u0275elementStart(79, "input", 16);
      \u0275\u0275listener("ngModelChange", function BlockBuilderComponent_Template_input_ngModelChange_79_listener($event) {
        return ctx.targetY = $event / 100;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "label");
      \u0275\u0275text(81, "Face points");
      \u0275\u0275elementStart(82, "select", 12);
      \u0275\u0275twoWayListener("ngModelChange", function BlockBuilderComponent_Template_select_ngModelChange_82_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.targetFace, $event) || (ctx.targetFace = $event);
        return $event;
      });
      \u0275\u0275elementStart(83, "option", 17);
      \u0275\u0275text(84, "Up \xB7 floor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "option", 18);
      \u0275\u0275text(86, "East");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "option", 19);
      \u0275\u0275text(88, "West");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "option", 20);
      \u0275\u0275text(90, "North");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "option", 21);
      \u0275\u0275text(92, "South");
      \u0275\u0275elementEnd()();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(93, "button", 10);
      \u0275\u0275listener("click", function BlockBuilderComponent_Template_button_click_93_listener() {
        return ctx.addTarget();
      });
      \u0275\u0275text(94, "Add target");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(95, BlockBuilderComponent_For_96_Template, 4, 5, "p", null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(97, BlockBuilderComponent_Conditional_97_Template, 2, 1, "p", 22);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_0_0 = ctx.editor()) ? 3 : -1, tmp_0_0);
      \u0275\u0275advance();
      \u0275\u0275property("open", !ctx.editor());
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.width);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.height);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.depth);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.x * 100);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.z * 100);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.y * 100);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.blockName);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.rotation);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.design().blocks.length >= 100);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.selected());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.selected() || ctx.design().blocks.length >= 100);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.selected());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.editor() ? 43 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.selected());
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.design().blocks);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.design().blocks.length, " / 100 blocks. Check that every block is supported when you build the physical model. ");
      \u0275\u0275advance();
      \u0275\u0275property("design", ctx.design())("selectedId", ctx.selected());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Parts list \xB7 ", ctx.design().blocks.length, " stones");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.partsList());
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.targetLabel);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.targetX * 100);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.targetZ * 100);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.targetY * 100);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.targetFace);
      \u0275\u0275control();
      \u0275\u0275advance(11);
      \u0275\u0275property("disabled", ctx.design().targets.length >= 12);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.design().targets);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.error() ? 97 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, DesignOpticsBuilderComponent, BlockPlanComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\nh3[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));\n  gap: 10px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  font-size: 13px;\n}\ninput[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n  min-height: 42px;\n  border: 1px solid #aabcb4;\n  border-radius: 7px;\n  padding: 8px;\n  background: white;\n  color: #173c36;\n  width: 100%;\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%] {\n  width: auto;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin: 12px 0;\n}\np[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #49685f;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 10px 0;\n}\n*[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #bd7317;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=block-builder.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BlockBuilderComponent, [{
    type: Component,
    args: [{ selector: "app-block-builder", imports: [FormsModule, DesignOpticsBuilderComponent, BlockPlanComponent], template: ` <section aria-label="Measured block builder">
    <h3>Shape your monument</h3>
    @if (editor(); as edit) {
      <p>Choose a piece, then drag it in the plan or 3D scene. Shift-click selects more stones.</p>
      <div class="actions parts" aria-label="Construction pieces">
        <button (click)="addPart('pillar')">\uFF0B Pillar</button
        ><button (click)="addPart('lintel')">\uFF0B Lintel</button>
        <button (click)="addPart('gate')">\uFF0B Gate</button
        ><button (click)="addPart('window')">\uFF0B Window stone</button>
      </div>
      <div class="fields">
        <label
          >Snap<select [ngModel]="edit.snap()" (ngModelChange)="edit.snap.set(+$event)">
            <option [value]="0">Free</option>
            <option [value]="0.01">1 cm</option>
            <option [value]="0.05">5 cm</option>
            <option [value]="0.1">10 cm</option>
          </select></label
        >
        <label
          >Select<select
            [ngModel]="edit.assemblies()"
            (ngModelChange)="edit.assemblies.set($event === true || $event === 'true')"
          >
            <option [ngValue]="true">Whole gate</option>
            <option [ngValue]="false">Individual stone</option>
          </select></label
        >
      </div>
      <app-block-plan [design]="design()" [editor]="edit" />
      <div class="actions" aria-label="Selected stone tools">
        <button (click)="edit.transform({ turn: 15 })" [disabled]="!edit.selection().length">
          \u21B6 15\xB0
        </button>
        <button (click)="edit.transform({ turn: -15 })" [disabled]="!edit.selection().length">
          \u21B7 15\xB0
        </button>
        <button (click)="edit.duplicate()" [disabled]="!edit.selection().length">Duplicate</button>
        <button (click)="edit.group()" [disabled]="edit.selection().length < 2">Group</button>
        <button (click)="edit.ungroup()" [disabled]="!edit.selection().length">Ungroup</button>
        <button (click)="remove()" [disabled]="!edit.selection().length">Remove</button>
        <button (click)="edit.undo()" [disabled]="!edit.canUndo()">Undo</button>
        <button (click)="edit.redo()" [disabled]="!edit.canRedo()">Redo</button>
      </div>
      <p role="status" [class.invalid]="edit.draftError()">
        {{ edit.draftError() || edit.message() }}
      </p>
      <details>
        <summary>Snap to another stone</summary>
        <label
          >Reference stone<select #support>
            <option value="">Choose a stone</option>
            @for (stone of design().blocks; track stone.id; let i = $index) {
              @if (!edit.selection().includes(stone.id)) {
                <option [value]="stone.id">{{ stone.label || 'Block ' + (i + 1) }}</option>
              }
            }
          </select></label
        >
        <div class="actions">
          <button
            (click)="edit.alignTo(support.value, 'top')"
            [disabled]="!edit.selection().length"
          >
            Stack on top</button
          ><button (click)="edit.alignTo(support.value, 'north')">North edge</button
          ><button (click)="edit.alignTo(support.value, 'south')">South edge</button
          ><button (click)="edit.alignTo(support.value, 'east')">East edge</button
          ><button (click)="edit.alignTo(support.value, 'west')">West edge</button>
        </div>
        <p>
          Edges align along the court axes. Top placement centers the selection over the reference
          stone. Check support before building.
        </p>
      </details>
      <details>
        <summary>Piece sizes & classroom kit</summary>
        <div class="fields">
          <label
            >Gate opening (cm)<input
              type="number"
              min="5"
              max="300"
              [(ngModel)]="gateWidth" /></label
          ><label
            >Gate height (cm)<input
              type="number"
              min="5"
              max="300"
              [(ngModel)]="gateHeight" /></label
          ><label
            >Gate depth (cm)<input type="number" min="2" max="100" [(ngModel)]="gateDepth"
          /></label>
        </div>
        <div class="fields">
          <label
            >Pillar width (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarWidth" /></label
          ><label
            >Pillar height (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarHeight" /></label
          ><label
            >Pillar depth (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarDepth" /></label
          ><label
            >Lintel width (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="lintelWidth" /></label
          ><label
            >Lintel height (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="lintelHeight" /></label
          ><label
            >Lintel depth (cm)<input type="number" min="1" max="500" [(ngModel)]="lintelDepth"
          /></label>
        </div>
        <p>
          Set these sizes to match your classroom blocks. Gate sizes describe the clear opening; two
          pillars and one lintel are added together.
        </p>
      </details>
    }
    <details [open]="!editor()">
      <summary>Exact measurements & openings</summary>
      <p>All measurements are in centimetres. East +X, south +Z, height above the ground +Y.</p>
      <div class="fields">
        <label>Width (cm)<input type="number" min="1" max="500" [(ngModel)]="width" /></label>
        <label>Height (cm)<input type="number" min="1" max="500" [(ngModel)]="height" /></label>
        <label>Depth (cm)<input type="number" min="1" max="500" [(ngModel)]="depth" /></label>
        <label
          >East X (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="x * 100"
            (ngModelChange)="x = $event / 100"
        /></label>
        <label
          >South Z (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="z * 100"
            (ngModelChange)="z = $event / 100"
        /></label>
        <label
          >Base Y (cm)<input
            type="number"
            min="0"
            max="1000"
            step="1"
            [ngModel]="y * 100"
            (ngModelChange)="y = $event / 100"
        /></label>
        <label>Stone name<input maxlength="80" [(ngModel)]="blockName" /></label>
        <label
          >Rotation (\xB0)<input type="number" min="0" max="359" step="1" [(ngModel)]="rotation"
        /></label>
      </div>
      <div class="actions">
        <button (click)="add()" [disabled]="design().blocks.length >= 100">Add block</button
        ><button (click)="update()" [disabled]="!selected()">Update selected</button
        ><button (click)="stack()" [disabled]="!selected() || design().blocks.length >= 100">
          Stack a copy</button
        ><button (click)="remove()" [disabled]="!selected()">Remove selected</button>
        @if (!editor()) {
          <button (click)="undo()" [disabled]="!previous()">Undo</button>
        }
      </div>
      <label
        >Select a block<select [ngModel]="selected()" (ngModelChange)="select($event)">
          <option value="">Choose a block</option>
          @for (block of design().blocks; track block.id; let i = $index) {
            <option [value]="block.id">
              {{ block.label || 'Block ' + (i + 1) }} \xB7 base {{ block.y * 100 }} cm
            </option>
          }
        </select></label
      >
      <p>
        {{ design().blocks.length }} / 100 blocks. Check that every block is supported when you
        build the physical model.
      </p>
      <app-design-optics-builder
        [design]="design()"
        [selectedId]="selected()"
        (changed)="change($event)"
        (selected)="select($event)"
      />
    </details>
    <details>
      <summary>Parts list \xB7 {{ design().blocks.length }} stones</summary>
      @for (part of partsList(); track part.size) {
        <p>{{ part.count }} \xD7 {{ part.size }}</p>
      }
      <p>
        Use these dimensions for the physical model. Support must be checked with your real blocks.
      </p>
    </details>
    <details>
      <summary>Place ground or pillar targets</summary>
      <p>
        Each ring marks a point to test for sunlight or shadow. Put a pillar mark exactly on its
        face.
      </p>
      <div class="fields">
        <label>Target label<input maxlength="80" [(ngModel)]="targetLabel" /></label
        ><label
          >East X (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="targetX * 100"
            (ngModelChange)="targetX = $event / 100" /></label
        ><label
          >South Z (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="targetZ * 100"
            (ngModelChange)="targetZ = $event / 100"
        /></label>
      </div>
      <div class="fields">
        <label
          >Target height Y (cm)<input
            type="number"
            min="0"
            max="1500"
            step="1"
            [ngModel]="targetY * 100"
            (ngModelChange)="targetY = $event / 100"
        /></label>
        <label
          >Face points<select [(ngModel)]="targetFace">
            <option value="up">Up \xB7 floor</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north">North</option>
            <option value="south">South</option>
          </select></label
        >
      </div>
      <button (click)="addTarget()" [disabled]="design().targets.length >= 12">Add target</button>
      @for (target of design().targets; track target.id) {
        <p>
          {{ target.label }} \xB7 X {{ target.x * 100 }}, Y {{ (target.y ?? 0) * 100 }}, Z
          {{ target.z * 100 }} cm
          <button
            [attr.aria-label]="'Remove target ' + target.label"
            (click)="removeTarget(target.id)"
          >
            Remove
          </button>
        </p>
      }
    </details>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
  </section>`, styles: ["/* angular:styles/component:scss;d7328e282149203591a7e370573d54b2b9d5d39cc7d547ecec0462391b1bd06d;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/engineering-design/ui/block-builder.component.ts */\n:host {\n  display: block;\n}\nh3 {\n  margin-top: 0;\n}\n.fields {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));\n  gap: 10px;\n}\nlabel {\n  display: grid;\n  gap: 5px;\n  font-size: 13px;\n}\ninput,\nselect,\nbutton {\n  font: inherit;\n  min-height: 42px;\n  border: 1px solid #aabcb4;\n  border-radius: 7px;\n  padding: 8px;\n  background: white;\n  color: #173c36;\n  width: 100%;\n  box-sizing: border-box;\n}\nbutton {\n  width: auto;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin: 12px 0;\n}\np {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #49685f;\n}\nsummary {\n  cursor: pointer;\n  padding: 10px 0;\n}\n*:focus-visible {\n  outline: 3px solid #bd7317;\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=block-builder.component.css.map */\n"] }]
  }], () => [], { design: [{ type: Input, args: [{ isSignal: true, alias: "design", required: true }] }], editor: [{ type: Input, args: [{ isSignal: true, alias: "editor", required: false }] }], changed: [{ type: Output, args: ["changed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BlockBuilderComponent, { className: "BlockBuilderComponent", filePath: "src/app/templates/engineering-design/ui/block-builder.component.ts", lineNumber: 354 });
})();

export {
  BlockBuilderComponent
};
//# debugId=aec8e5d0-a420-5bd0-990d-e98cfc3f5aeb
//# sourceMappingURL=chunk-SCMANZFT.js.map
