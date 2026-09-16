import {
  InjectionToken,
  computed,
  signal
} from "./chunk-E2VJWGUE.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/engineering/block-design.ts
function isDesignChecks(value) {
  return Array.isArray(value) && value.length <= 20 && value.every(
    (entry) => record(entry) && text(entry["scenarioId"], 80) && text(entry["targetId"]) && text(entry["expectedValue"], 80) && (entry["settings"] === void 0 || record(entry["settings"]) && Object.entries(entry["settings"]).length <= 4 && Object.entries(entry["settings"]).every(
      ([key, value2]) => text(key, 40) && (text(value2, 80) || finite(value2, -1e5, 1e5))
    ))
  ) && new Set(value.map((entry) => entry.scenarioId)).size === value.length;
}
var record = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var finite = (v, min, max) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
var text = (v, max = 200) => typeof v === "string" && v.length > 0 && v.length <= max;
function isBlockDesign(v) {
  if (!record(v) || !Array.isArray(v["blocks"]) || !Array.isArray(v["targets"])) return false;
  const blocks = v["blocks"], targets = v["targets"];
  return blocks.length <= 100 && targets.length <= 12 && blocks.every(
    (b) => record(b) && text(b["id"]) && (b["label"] === void 0 || text(b["label"], 80)) && (b["assemblyId"] === void 0 || text(b["assemblyId"], 80)) && finite(b["x"], -12, 12) && finite(b["z"], -12, 12) && finite(b["y"], 0, 10) && finite(b["width"], 0.01, 5) && finite(b["height"], 0.01, 5) && finite(b["depth"], 0.01, 5) && finite(b["rotation"], 0, 360) && Number(b["rotation"]) < 360 && (b["aperture"] === void 0 || isDesignAperture(b["aperture"], b))
  ) && targets.every(
    (t) => record(t) && text(t["id"]) && text(t["label"], 80) && finite(t["x"], -12, 12) && finite(t["z"], -12, 12) && (t["y"] === void 0 || finite(t["y"], 0, 15)) && (t["normal"] === void 0 || Array.isArray(t["normal"]) && t["normal"].length === 3 && t["normal"].every((n) => finite(n, -1, 1)) && Math.abs(Math.hypot(...t["normal"]) - 1) < 1e-6) && (t["settings"] === void 0 || record(t["settings"]) && Object.entries(t["settings"]).length <= 8 && Object.entries(t["settings"]).every(
      ([k, v2]) => text(k, 40) && (text(v2, 80) || finite(v2, -1e5, 1e5))
    ))
  ) && new Set(blocks.map((b) => b.id)).size === blocks.length && new Set(targets.map((t) => t.id)).size === targets.length && !blocks.some(
    (a, i) => blocks.slice(i + 1).some((b) => blocksOverlap(a, b))
  ) && (v["displayObject"] === void 0 || isDesignDisplayObject(v["displayObject"]) && !blocks.some(
    (b) => blocksOverlap(b, displayObjectEnvelope(v["displayObject"]))
  ));
}
function isDesignAperture(a, b) {
  if (!record(a) || !["x", "y", "z"].includes(String(a["axis"]))) return false;
  const cross = a["axis"] === "x" ? [b["height"], b["depth"]] : a["axis"] === "y" ? [b["width"], b["depth"]] : [b["width"], b["height"]];
  return finite(a["diameter"], 5e-3, Math.min(...cross.map(Number)) * 0.9) && ["open", "glass", "jewel"].includes(String(a["insert"])) && ["clear", "red", "amber", "green", "blue", "violet"].includes(String(a["color"]));
}
function isDesignDisplayObject(v) {
  return record(v) && ["sphere", "crystal", "obelisk"].includes(String(v["model"])) && ["limestone", "bronze", "porcelain"].includes(String(v["material"])) && finite(v["x"], -12, 12) && finite(v["z"], -12, 12) && finite(v["y"], 0, 10) && finite(v["width"], 0.05, 5) && finite(v["height"], 0.05, 5) && finite(v["rotation"], 0, 359);
}
function displayObjectEnvelope(v) {
  return __spreadProps(__spreadValues({}, v), { id: "display-object-envelope", depth: v.width });
}
function blocksOverlap(a, b) {
  if (a.y + a.height <= b.y + 1e-8 || b.y + b.height <= a.y + 1e-8) return false;
  const axes = (block) => {
    const r = block.rotation * Math.PI / 180;
    return [
      [Math.cos(r), -Math.sin(r)],
      [Math.sin(r), Math.cos(r)]
    ];
  };
  const aa = axes(a), bb = axes(b);
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
  return [...aa, ...bb].every((axis) => {
    const radiusA = a.width / 2 * Math.abs(dot(axis, aa[0])) + a.depth / 2 * Math.abs(dot(axis, aa[1]));
    const radiusB = b.width / 2 * Math.abs(dot(axis, bb[0])) + b.depth / 2 * Math.abs(dot(axis, bb[1]));
    return Math.abs(dot([b.x - a.x, b.z - a.z], axis)) < radiusA + radiusB - 1e-8;
  });
}
function isDesignCapture(v) {
  return record(v) && text(v["id"]) && text(v["pluginId"]) && text(v["capturedAt"]) && Number.isFinite(Date.parse(v["capturedAt"])) && isBlockDesign(v["design"]) && record(v["settings"]) && Object.keys(v["settings"]).length <= 20 && Object.values(v["settings"]).every((n) => text(n) || finite(n, -1e6, 1e6)) && Array.isArray(v["measurements"]) && v["measurements"].length <= 30 && v["measurements"].every((m) => record(m) && text(m["label"]) && text(m["value"], 500));
}

// src/app/shared/engineering/design-editor.ts
var DESIGN_EDITOR = new InjectionToken("DESIGN_EDITOR");
var rounded = (n) => Math.round(n * 1e5) / 1e5;
function transformBlocks(design, ids, op) {
  const chosen = design.blocks.filter((b) => ids.includes(b.id));
  if (!chosen.length)
    return design;
  const cx = chosen.reduce((s2, b) => s2 + b.x, 0) / chosen.length;
  const cz = chosen.reduce((s2, b) => s2 + b.z, 0) / chosen.length;
  const turn = Math.round(op.turn ?? 0);
  const angle = turn * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle);
  return __spreadProps(__spreadValues({}, design), {
    blocks: design.blocks.map((b) => ids.includes(b.id) ? __spreadProps(__spreadValues({}, b), {
      x: rounded(cx + c * (b.x - cx) + s * (b.z - cz) + (op.dx ?? 0)),
      z: rounded(cz - s * (b.x - cx) + c * (b.z - cz) + (op.dz ?? 0)),
      y: rounded(b.y + (op.dy ?? 0)),
      rotation: rounded(((b.rotation + turn) % 360 + 360) % 360) % 360
    }) : b)
  });
}
function designError(design) {
  for (let i = 0; i < design.blocks.length; i++)
    for (let j = i + 1; j < design.blocks.length; j++) {
      if (blocksOverlap(design.blocks[i], design.blocks[j]))
        return `${design.blocks[i].label ?? "Block " + (i + 1)} overlaps ${design.blocks[j].label ?? "block " + (j + 1)}. Move it to a clear space.`;
    }
  if (design.displayObject && design.blocks.some((b) => blocksOverlap(b, displayObjectEnvelope(design.displayObject))))
    return "This placement overlaps the sculpture\u2019s reserved space.";
  return isBlockDesign(design) ? "" : "Keep blocks inside the court, above the floor, and use valid dimensions and openings.";
}
function makePart(kind, width, height, depth) {
  const assemblyId = crypto.randomUUID(), id = () => crypto.randomUUID();
  if (kind === "window")
    return [
      {
        id: id(),
        label: "Standing stone \xB7 horizontal opening",
        x: 0,
        y: 0,
        z: 0,
        width,
        height,
        depth,
        rotation: 0,
        aperture: {
          axis: "z",
          diameter: Math.min(width, height) * 0.3,
          insert: "open",
          color: "clear"
        }
      }
    ];
  if (kind === "pillar" || kind === "lintel")
    return [
      {
        id: id(),
        label: kind === "pillar" ? "Pillar" : "Lintel",
        x: 0,
        z: 0,
        y: 0,
        width,
        height,
        depth,
        rotation: 0
      }
    ];
  const post = Math.min(0.2, width / 4), beam = Math.min(0.1, height / 4);
  return [
    {
      id: id(),
      assemblyId,
      label: "Gate \xB7 left pillar",
      x: -(width + post) / 2,
      z: 0,
      y: 0,
      width: post,
      height,
      depth,
      rotation: 0
    },
    {
      id: id(),
      assemblyId,
      label: "Gate \xB7 right pillar",
      x: (width + post) / 2,
      z: 0,
      y: 0,
      width: post,
      height,
      depth,
      rotation: 0
    },
    {
      id: id(),
      assemblyId,
      label: "Gate \xB7 lintel",
      x: 0,
      z: 0,
      y: height,
      width: width + 2 * post,
      height: beam,
      depth,
      rotation: 0
    }
  ];
}
var DesignEditor = class {
  constructor(read, write, editable) {
    this.read = read;
    this.write = write;
    this.editable = editable;
  }
  read;
  write;
  editable;
  selection = signal(
    [],
    ...ngDevMode ? [{ debugName: "selection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  snap = signal(
    0.05,
    ...ngDevMode ? [{ debugName: "snap" }] : (
      /* istanbul ignore next */
      []
    )
  );
  assemblies = signal(
    true,
    ...ngDevMode ? [{ debugName: "assemblies" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "Select a stone in the scene or plan. Drag to move; Shift-click adds a stone.",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftError = computed(
    () => this.draft() ? designError(this.draft()) : "",
    ...ngDevMode ? [{ debugName: "draftError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = signal(
    {
      past: [],
      future: []
    },
    ...ngDevMode ? [{ debugName: "history" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canUndo = computed(
    () => this.history().past.length > 0,
    ...ngDevMode ? [{ debugName: "canUndo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canRedo = computed(
    () => this.history().future.length > 0,
    ...ngDevMode ? [{ debugName: "canRedo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  base;
  known = "";
  scope = "";
  sync(scope) {
    const key = JSON.stringify(this.read());
    if (scope !== this.scope || this.known && key !== this.known) {
      this.history.set({ past: [], future: [] });
      this.selection.set([]);
      this.cancel();
    }
    this.scope = scope;
    this.known = key;
    const ids = this.selection().filter((id) => this.read().blocks.some((b) => b.id === id));
    if (ids.length !== this.selection().length)
      this.selection.set(ids);
  }
  select(id, additive = false) {
    this.cancel();
    const block = this.read().blocks.find((b) => b.id === id);
    if (!block) {
      this.selection.set([]);
      return;
    }
    const ids = this.assemblies() && block.assemblyId ? this.read().blocks.filter((b) => b.assemblyId === block.assemblyId).map((b) => b.id) : [id];
    this.selection.set(additive ? [.../* @__PURE__ */ new Set([...this.selection(), ...ids])] : ids);
    this.message.set(`${ids.length > 1 ? "Assembly" : block.label ?? "Stone"} selected. Drag to move or use the plan controls.`);
  }
  begin() {
    this.base = this.read();
    this.draft.set(void 0);
  }
  preview(op, snap = true) {
    if (!this.editable())
      return;
    this.base ??= this.read();
    const step = this.snap();
    const adjusted = __spreadValues({}, op);
    if (snap && step > 0) {
      if (op.dx !== void 0)
        adjusted.dx = rounded(Math.round(op.dx / step) * step);
      if (op.dz !== void 0)
        adjusted.dz = rounded(Math.round(op.dz / step) * step);
      if (op.turn !== void 0)
        adjusted.turn = Math.round(op.turn / 15) * 15;
    }
    this.draft.set(transformBlocks(this.base, this.selection(), adjusted));
  }
  commitDraft() {
    const next = this.draft();
    if (this.base !== this.read()) {
      this.cancel();
      this.message.set("The design changed. Select the stone and try again.");
      return;
    }
    if (next)
      this.commit(next);
    this.cancel();
  }
  cancel() {
    this.base = void 0;
    this.draft.set(void 0);
  }
  transform(op) {
    this.begin();
    this.preview(op, false);
    this.commitDraft();
  }
  commit(next) {
    if (!this.editable())
      return false;
    const error = designError(next);
    if (error) {
      this.message.set(error);
      return false;
    }
    const before = this.read(), key = JSON.stringify(next);
    if (key === JSON.stringify(before))
      return true;
    try {
      this.known = key;
      this.write(next);
    } catch (e) {
      this.known = JSON.stringify(before);
      this.message.set(e instanceof Error ? e.message : "Could not save the placement.");
      return false;
    }
    this.history.update((h) => ({
      past: [...h.past.slice(-39), structuredClone(before)],
      future: []
    }));
    this.message.set("Placement saved. Undo is available.");
    return true;
  }
  undo() {
    this.travel("past");
  }
  redo() {
    this.travel("future");
  }
  travel(side) {
    if (!this.editable())
      return;
    const h = this.history(), next = h[side].at(-1);
    if (!next)
      return;
    const current = structuredClone(this.read());
    this.known = JSON.stringify(next);
    try {
      this.write(next);
    } catch {
      this.known = JSON.stringify(current);
      this.message.set("The change could not be saved.");
      return;
    }
    this.history.set(side === "past" ? { past: h.past.slice(0, -1), future: [...h.future, current] } : { past: [...h.past, current], future: h.future.slice(0, -1) });
    this.cancel();
    this.selection.set(this.selection().filter((id) => next.blocks.some((b) => b.id === id)));
    this.message.set(side === "past" ? "Change undone." : "Change restored.");
  }
  duplicate() {
    const chosen = this.read().blocks.filter((b) => this.selection().includes(b.id));
    if (!chosen.length)
      return;
    const groups = /* @__PURE__ */ new Map();
    const copies = chosen.map((b) => {
      if (b.assemblyId && !groups.has(b.assemblyId))
        groups.set(b.assemblyId, crypto.randomUUID());
      return __spreadValues(__spreadProps(__spreadValues({}, b), {
        id: crypto.randomUUID()
      }), b.assemblyId ? { assemblyId: groups.get(b.assemblyId) } : {});
    });
    this.place(copies);
  }
  place(parts) {
    if (!parts.length)
      return;
    if (!this.editable())
      return;
    if (this.read().blocks.length + parts.length > 100) {
      this.message.set("The design already has the maximum number of stones.");
      return;
    }
    if (!isBlockDesign({ blocks: parts, targets: [] })) {
      this.message.set("Check the piece dimensions before adding it.");
      return;
    }
    for (let ring = 0; ring <= 24; ring++)
      for (let x = -ring; x <= ring; x++)
        for (let z = -ring; z <= ring; z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) !== ring)
            continue;
          const blocks = parts.map((b) => __spreadProps(__spreadValues({}, b), { x: b.x + x * 0.5, z: b.z + z * 0.5 }));
          const next = __spreadProps(__spreadValues({}, this.read()), { blocks: [...this.read().blocks, ...blocks] });
          if (isBlockDesign(next)) {
            if (this.commit(next))
              this.selection.set(blocks.map((b) => b.id));
            return;
          }
        }
    this.message.set("No clear space for this piece. Move a stone or use smaller dimensions.");
  }
  group() {
    if (this.selection().length < 2)
      return;
    const assemblyId = crypto.randomUUID();
    this.commit(__spreadProps(__spreadValues({}, this.read()), {
      blocks: this.read().blocks.map((b) => this.selection().includes(b.id) ? __spreadProps(__spreadValues({}, b), { assemblyId }) : b)
    }));
  }
  ungroup() {
    this.commit(__spreadProps(__spreadValues({}, this.read()), {
      blocks: this.read().blocks.map((b) => {
        if (!this.selection().includes(b.id))
          return b;
        const _a = b, { assemblyId: _assembly } = _a, stone = __objRest(_a, ["assemblyId"]);
        return stone;
      })
    }));
  }
  alignTo(id, side) {
    const chosen = this.read().blocks.filter((b2) => this.selection().includes(b2.id));
    const support = this.read().blocks.find((b2) => b2.id === id && !this.selection().includes(id));
    if (!support || !chosen.length)
      return;
    const bounds = (blocks) => {
      const extent = blocks.map((b2) => {
        const a2 = b2.rotation * Math.PI / 180;
        return __spreadProps(__spreadValues({}, b2), {
          rx: (Math.abs(Math.cos(a2)) * b2.width + Math.abs(Math.sin(a2)) * b2.depth) / 2,
          rz: (Math.abs(Math.sin(a2)) * b2.width + Math.abs(Math.cos(a2)) * b2.depth) / 2
        });
      });
      return {
        left: Math.min(...extent.map((b2) => b2.x - b2.rx)),
        right: Math.max(...extent.map((b2) => b2.x + b2.rx)),
        north: Math.min(...extent.map((b2) => b2.z - b2.rz)),
        south: Math.max(...extent.map((b2) => b2.z + b2.rz)),
        base: Math.min(...extent.map((b2) => b2.y))
      };
    };
    const a = bounds(chosen), b = bounds([support]);
    const dx = support.x - (a.left + a.right) / 2, dz = support.z - (a.north + a.south) / 2;
    this.transform(side === "top" ? { dx, dz, dy: support.y + support.height - a.base } : side === "north" ? { dx, dz: b.north - a.south } : side === "south" ? { dx, dz: b.south - a.north } : side === "east" ? { dx: b.right - a.left, dz } : { dx: b.left - a.right, dz });
  }
};

// src/app/shared/engineering/design-simulation.registry.ts
var DesignSimulationRegistry = class {
  entries = /* @__PURE__ */ new Map();
  register(id, component) {
    if (this.entries.has(id)) throw new Error(`DUPLICATE_REGISTRATION: ${id}`);
    this.entries.set(id, component);
  }
  require(id) {
    const component = this.entries.get(id);
    if (!component) throw new Error(`CAPABILITY_NOT_INSTALLED: ${id}`);
    return component;
  }
};
var DESIGN_SIMULATIONS = new InjectionToken(
  "DESIGN_SIMULATIONS"
);
var DESIGN_CAPTURE = new InjectionToken("DESIGN_CAPTURE");
var DESIGN_CAPTURE_BATCH = new InjectionToken("DESIGN_CAPTURE_BATCH");
var DESIGN_CHECKS_CHANGE = new InjectionToken("DESIGN_CHECKS_CHANGE");
var DESIGN_VIEW_REQUEST = new InjectionToken(
  "DESIGN_VIEW_REQUEST"
);
var DESIGN_CHANGE = new InjectionToken("DESIGN_CHANGE");
var DESIGN_QUEST_PROGRESS = new InjectionToken(
  "DESIGN_QUEST_PROGRESS"
);
var DESIGN_CHROME = new InjectionToken(
  "DESIGN_CHROME"
);

export {
  isDesignChecks,
  isBlockDesign,
  isDesignCapture,
  DESIGN_EDITOR,
  transformBlocks,
  makePart,
  DesignEditor,
  DesignSimulationRegistry,
  DESIGN_SIMULATIONS,
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
  DESIGN_VIEW_REQUEST,
  DESIGN_CHANGE,
  DESIGN_QUEST_PROGRESS,
  DESIGN_CHROME
};
//# debugId=7798263b-b040-5def-a97c-64c0ac9eb4c4
//# sourceMappingURL=chunk-T7GOLBBA.js.map
