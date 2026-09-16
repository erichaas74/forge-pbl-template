import {
  wordCount
} from "./chunk-M73YRRYA.js";
import {
  Component,
  ElementRef,
  Input,
  Output,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
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
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";

// src/app/templates/narrative-studio/ui/narrative-story-map.layout.ts
function createNarrativeStoryMapLayout(config, _compact = false) {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const incoming = new Map(config.nodes.map((node) => [node.id, 0]));
  for (const node of config.nodes)
    for (const choice of node.choices)
      incoming.set(choice.nextNodeId, (incoming.get(choice.nextNodeId) ?? 0) + 1);
  const depths = /* @__PURE__ */ new Map([[config.startNodeId, 0]]);
  const pending = config.nodes.filter((node) => !incoming.get(node.id)).map((node) => node.id);
  while (pending.length) {
    const id = pending.shift();
    for (const choice of byId.get(id)?.choices ?? []) {
      depths.set(
        choice.nextNodeId,
        Math.max(depths.get(choice.nextNodeId) ?? 0, (depths.get(id) ?? 0) + 1)
      );
      incoming.set(choice.nextNodeId, incoming.get(choice.nextNodeId) - 1);
      if (!incoming.get(choice.nextNodeId)) pending.push(choice.nextNodeId);
    }
  }
  const order = /* @__PURE__ */ new Map();
  const walk = (id) => {
    if (order.has(id)) return;
    order.set(id, order.size);
    for (const choice of byId.get(id)?.choices ?? []) walk(choice.nextNodeId);
  };
  walk(config.startNodeId);
  const rows = /* @__PURE__ */ new Map();
  for (const node of config.nodes) {
    const depth = depths.get(node.id) ?? 0;
    rows.set(depth, [...rows.get(depth) ?? [], node]);
  }
  const width = Math.max(480, ...[...rows.values()].map((row) => row.length * 224 + 32));
  const height = (Math.max(...rows.keys(), 0) + 1) * 228;
  const nodes = [...rows.entries()].flatMap(
    ([depth, row]) => row.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)).map((node, index) => ({
      node,
      depth,
      x: width * (index + 0.5) / row.length,
      y: 94 + depth * 228
    }))
  );
  const positions = new Map(nodes.map((item) => [item.node.id, item]));
  const edges = config.nodes.flatMap(
    (node) => node.choices.flatMap((choice, choiceIndex) => {
      const from = positions.get(node.id), to = positions.get(choice.nextNodeId);
      if (!from || !to) return [];
      const x = from.x + (choiceIndex ? 44 : -44), y = from.y + 76;
      const endY = to.y - 76, middle = (y + endY) / 2;
      return [
        {
          id: `${node.id}:${choice.id}`,
          sourceId: node.id,
          destinationId: choice.nextNodeId,
          choice,
          choiceIndex,
          path: `M ${x} ${y} C ${x} ${middle}, ${to.x} ${middle}, ${to.x} ${endY}`,
          labelX: (x + to.x) / 2,
          labelY: middle
        }
      ];
    })
  );
  return { width, height, nodes, edges };
}

// src/app/templates/narrative-studio/ui/narrative-story-map.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.node.id;
function NarrativeStoryMapComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "path")(1, "circle", 9);
    \u0275\u0275domElementStart(2, "text", 10);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const edge_r1 = ctx.$implicit;
    \u0275\u0275attribute("d", edge_r1.path)("class", "choice-line choice-" + (edge_r1.choiceIndex + 1));
    \u0275\u0275advance();
    \u0275\u0275attribute("cx", edge_r1.labelX)("cy", edge_r1.labelY)("class", "choice-marker choice-" + (edge_r1.choiceIndex + 1));
    \u0275\u0275advance();
    \u0275\u0275attribute("x", edge_r1.labelX)("y", edge_r1.labelY + 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", edge_r1.choiceIndex + 1, " ");
  }
}
function NarrativeStoryMapComponent_For_7_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 15)(1, "i");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const choice_r5 = ctx.$implicit;
    const \u0275$index_29_r6 = ctx.$index;
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("title", ctx_r3.choiceLabel(item_r3.node.id, choice_r5));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_29_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.choiceLabel(item_r3.node.id, choice_r5));
  }
}
function NarrativeStoryMapComponent_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 13);
    \u0275\u0275repeaterCreate(1, NarrativeStoryMapComponent_For_7_Conditional_5_For_2_Template, 5, 3, "span", 15, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r3.node.choices);
  }
}
function NarrativeStoryMapComponent_For_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.node.kind === "ending" ? "This path stops here." : "Continue or end this path.");
  }
}
function NarrativeStoryMapComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 11);
    \u0275\u0275domListener("click", function NarrativeStoryMapComponent_For_7_Template_button_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.nodeSelected.emit(item_r3.node.id));
    });
    \u0275\u0275domElementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, NarrativeStoryMapComponent_For_7_Conditional_5_Template, 3, 0, "span", 13)(6, NarrativeStoryMapComponent_For_7_Conditional_6_Template, 2, 1, "span", 14);
    \u0275\u0275domElementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", item_r3.x, "px")("top", item_r3.y, "px");
    \u0275\u0275classProp("active", item_r3.node.id === ctx_r3.activeNodeId())("ending", item_r3.node.kind === "ending")("death", item_r3.node.endingOutcome === "death")("complete", ctx_r3.words(item_r3.node.id) >= 20);
    \u0275\u0275attribute("data-node-id", item_r3.node.id)("aria-label", ctx_r3.nodeAccessibleLabel(item_r3))("aria-pressed", item_r3.node.id === ctx_r3.activeNodeId());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.node.id === ctx_r3.config().startNodeId ? "Start here" : item_r3.node.kind === "ending" ? item_r3.node.endingOutcome === "death" ? "Dead end \xB7 Character dies" : "Survival ending" : item_r3.node.choices.length ? "Story continues" : "Write this branch");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.scene(item_r3.node.id)?.title || item_r3.node.suggestedTitle);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.node.choices.length ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r3.words(item_r3.node.id), " words", item_r3.node.id === ctx_r3.activeNodeId() ? " \xB7 Selected" : "");
  }
}
var NarrativeStoryMapComponent = class _NarrativeStoryMapComponent {
  element = inject(ElementRef);
  constructor() {
    afterRenderEffect(() => {
      this.activeNodeId();
      this.layout();
      const host = this.element.nativeElement;
      const selected = host.querySelector(".tree-node.active");
      const viewport = host.querySelector(".map-scroll");
      if (selected && viewport)
        viewport.scrollTo({
          left: Math.max(0, selected.offsetLeft - viewport.clientWidth / 2),
          top: Math.max(0, selected.offsetTop - viewport.clientHeight / 2),
          behavior: "instant"
        });
    });
  }
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scenes = input.required(
    ...ngDevMode ? [{ debugName: "scenes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeNodeId = input(
    "",
    ...ngDevMode ? [{ debugName: "activeNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recommendedNodeId = input(
    "",
    ...ngDevMode ? [{ debugName: "recommendedNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  compact = input(
    false,
    ...ngDevMode ? [{ debugName: "compact" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nodeSelected = output();
  layout = computed(
    () => createNarrativeStoryMapLayout(this.config(), this.compact()),
    ...ngDevMode ? [{ debugName: "layout" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeNode = computed(
    () => this.config().nodes.find((node) => node.id === this.activeNodeId()),
    ...ngDevMode ? [{ debugName: "activeNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scene(nodeId) {
    return this.scenes()[nodeId];
  }
  words(nodeId) {
    return wordCount(this.scene(nodeId)?.text ?? "");
  }
  destinationTitle(nodeId) {
    return this.scene(nodeId)?.title || this.config().nodes.find((node) => node.id === nodeId)?.mapLabel || nodeId;
  }
  choiceLabel(nodeId, choice) {
    return this.scene(nodeId)?.choiceLabels[choice.id]?.trim() || choice.prompt;
  }
  nodeState(item) {
    if (item.node.id === this.activeNodeId() && this.compact())
      return "Writing here";
    if (item.node.id === this.recommendedNodeId())
      return "Write next";
    if (item.node.id === this.activeNodeId())
      return "Selected";
    if (this.words(item.node.id) >= 20)
      return "Saved";
    return item.node.kind === "ending" ? "Ending" : "Scene";
  }
  nodeAccessibleLabel(item) {
    const options = item.node.choices.map((choice, index) => `option ${index + 1}: ${this.choiceLabel(item.node.id, choice)}`).join(", ");
    return `${item.node.endingOutcome === "death" ? "Dead end, character dies. " : ""}${this.nodeState(item)}: ${this.scene(item.node.id)?.title || item.node.suggestedTitle}, ${this.words(item.node.id)} words${options ? `. ${item.node.choiceQuestion} ${options}` : ""}`;
  }
  static \u0275fac = function NarrativeStoryMapComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeStoryMapComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativeStoryMapComponent, selectors: [["app-narrative-story-map"]], inputs: { config: [1, "config"], scenes: [1, "scenes"], activeNodeId: [1, "activeNodeId"], recommendedNodeId: [1, "recommendedNodeId"], compact: [1, "compact"] }, outputs: { nodeSelected: "nodeSelected" }, decls: 20, vars: 5, consts: [["aria-label", "Branching story map", 1, "story-tree"], ["tabindex", "0", "role", "region", "aria-label", "Story map. Scroll to explore all branches.", 1, "map-scroll"], [1, "tree-canvas"], ["aria-hidden", "true"], ["type", "button", 1, "tree-node", 3, "active", "ending", "death", "complete", "left", "top"], [1, "tree-legend"], [1, "active-key"], [1, "ending-key"], [1, "death-key"], ["r", "12"], [1, "choice-number"], ["type", "button", 1, "tree-node", 3, "click"], [1, "node-state"], [1, "node-options"], [1, "node-hint"], [3, "title"]], template: function NarrativeStoryMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 3);
      \u0275\u0275repeaterCreate(4, NarrativeStoryMapComponent_For_5_Template, 4, 8, null, null, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(6, NarrativeStoryMapComponent_For_7_Template, 9, 20, "button", 4, _forTrack1);
      \u0275\u0275domElementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(8, "footer", 5)(9, "span");
      \u0275\u0275domElement(10, "i", 6);
      \u0275\u0275text(11, "Selected scene");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "span");
      \u0275\u0275domElement(13, "i", 7);
      \u0275\u0275text(14, "Survival ending");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "span");
      \u0275\u0275domElement(16, "i", 8);
      \u0275\u0275text(17, "Character dies");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "span");
      \u0275\u0275text(19, "Follow 1 or 2 to the next scene");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.layout().width, "px")("height", ctx.layout().height, "px");
      \u0275\u0275advance();
      \u0275\u0275attribute("viewBox", "0 0 " + ctx.layout().width + " " + ctx.layout().height);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.layout().edges);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.layout().nodes);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.story-tree[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 0;\n}\n.map-scroll[_ngcontent-%COMP%] {\n  max-height: calc(100dvh - 260px);\n  min-height: 300px;\n  overflow: auto;\n  border: 1px solid #adc8c0;\n  border-radius: 16px;\n  background: #e9f1eb;\n  scrollbar-width: thin;\n}\n.tree-canvas[_ngcontent-%COMP%] {\n  position: relative;\n  margin: 0 auto;\n  background: radial-gradient(rgba(166, 195, 185, 0.4392156863) 1px, transparent 1px) 0 0/18px 18px;\n}\nsvg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.choice-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-width: 3;\n}\n.choice-1[_ngcontent-%COMP%] {\n  stroke: #bc644a;\n}\n.choice-2[_ngcontent-%COMP%] {\n  stroke: #2b797c;\n}\n.choice-marker[_ngcontent-%COMP%] {\n  fill: #fffdf5;\n  stroke-width: 2;\n}\n.choice-number[_ngcontent-%COMP%] {\n  fill: #24494b;\n  font: 800 12px system-ui;\n  text-anchor: middle;\n}\n.tree-node[_ngcontent-%COMP%] {\n  position: absolute;\n  display: grid;\n  align-content: start;\n  gap: 7px;\n  width: 192px;\n  height: 152px;\n  transform: translate(-50%, -50%);\n  border: 1px solid #83a69a;\n  border-top: 4px solid #658f81;\n  border-radius: 12px;\n  padding: 12px;\n  background: #fffdf5;\n  color: #173c40;\n  box-shadow: 0 4px 10px rgba(37, 74, 65, 0.0705882353);\n  text-align: left;\n  cursor: pointer;\n  font: inherit;\n}\n.tree-node[_ngcontent-%COMP%]:hover {\n  border-color: #1a6763;\n  background: #f4fbf5;\n}\n.tree-node.active[_ngcontent-%COMP%] {\n  border-color: #166d69;\n  outline: 3px solid rgba(22, 109, 105, 0.1882352941);\n  background: #f5fff9;\n}\n.tree-node.ending[_ngcontent-%COMP%] {\n  border-top-color: #bd8041;\n  background: #fff3dc;\n}\n.node-state[_ngcontent-%COMP%] {\n  color: #3d6c61;\n  font: 800 10px system-ui;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.ending[_ngcontent-%COMP%]   .node-state[_ngcontent-%COMP%] {\n  color: #8b5c27;\n}\n.tree-node[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font: 700 16px/1.2 Georgia, serif;\n}\n.node-options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\n.node-options[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  min-width: 0;\n  font: 12px system-ui;\n}\n.node-options[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.node-options[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  flex: 0 0 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #f8e6dc;\n  color: #8f432d;\n  text-align: center;\n  font: 700 11px/18px system-ui;\n}\n.node-options[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:nth-child(2)   i[_ngcontent-%COMP%] {\n  color: #206466;\n  background: #dfeeed;\n}\n.node-hint[_ngcontent-%COMP%] {\n  color: #62786c;\n  font: 12px/1.5 system-ui;\n}\n.tree-node[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: auto;\n  color: #5b786b;\n  font: 11px system-ui;\n}\n.tree-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px 16px;\n  color: #426759;\n  font: 11px system-ui;\n}\n.tree-legend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.tree-legend[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border: 2px solid #166d69;\n  border-radius: 3px;\n}\n.tree-legend[_ngcontent-%COMP%]   .ending-key[_ngcontent-%COMP%] {\n  border-color: #bd8041;\n  background: #fff3dc;\n}\n[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #ba6b19;\n  outline-offset: 3px;\n}\n@media (max-width: 780px) {\n  .map-scroll[_ngcontent-%COMP%] {\n    max-height: 340px;\n  }\n}\n.tree-node.death[_ngcontent-%COMP%] {\n  border-top-color: #ae534a;\n  background: #fff0eb;\n}\n.death[_ngcontent-%COMP%]   .node-state[_ngcontent-%COMP%] {\n  color: #98473d;\n}\n.tree-legend[_ngcontent-%COMP%]   .death-key[_ngcontent-%COMP%] {\n  border-color: #ae534a;\n  background: #fff0eb;\n}\n/*# sourceMappingURL=narrative-story-map.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeStoryMapComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-story-map", template: `<section class="story-tree" aria-label="Branching story map">
  <div
    class="map-scroll"
    tabindex="0"
    role="region"
    aria-label="Story map. Scroll to explore all branches."
  >
    <div class="tree-canvas" [style.width.px]="layout().width" [style.height.px]="layout().height">
      <svg [attr.viewBox]="'0 0 ' + layout().width + ' ' + layout().height" aria-hidden="true">
        @for (edge of layout().edges; track edge.id) {
          <path
            [attr.d]="edge.path"
            [attr.class]="'choice-line choice-' + (edge.choiceIndex + 1)"
          />
          <circle
            [attr.cx]="edge.labelX"
            [attr.cy]="edge.labelY"
            r="12"
            [attr.class]="'choice-marker choice-' + (edge.choiceIndex + 1)"
          />
          <text [attr.x]="edge.labelX" [attr.y]="edge.labelY + 4" class="choice-number">
            {{ edge.choiceIndex + 1 }}
          </text>
        }
      </svg>
      @for (item of layout().nodes; track item.node.id) {
        <button
          type="button"
          class="tree-node"
          [class.active]="item.node.id === activeNodeId()"
          [class.ending]="item.node.kind === 'ending'"
          [class.death]="item.node.endingOutcome === 'death'"
          [class.complete]="words(item.node.id) >= 20"
          [style.left.px]="item.x"
          [style.top.px]="item.y"
          [attr.data-node-id]="item.node.id"
          [attr.aria-label]="nodeAccessibleLabel(item)"
          [attr.aria-pressed]="item.node.id === activeNodeId()"
          (click)="nodeSelected.emit(item.node.id)"
        >
          <span class="node-state">{{
            item.node.id === config().startNodeId
              ? 'Start here'
              : item.node.kind === 'ending'
                ? item.node.endingOutcome === 'death'
                  ? 'Dead end \xB7 Character dies'
                  : 'Survival ending'
                : item.node.choices.length
                  ? 'Story continues'
                  : 'Write this branch'
          }}</span>
          <strong>{{ scene(item.node.id)?.title || item.node.suggestedTitle }}</strong>
          @if (item.node.choices.length) {
            <span class="node-options">
              @for (choice of item.node.choices; track choice.id; let index = $index) {
                <span [title]="choiceLabel(item.node.id, choice)"
                  ><i>{{ index + 1 }}</i
                  ><span>{{ choiceLabel(item.node.id, choice) }}</span></span
                >
              }
            </span>
          } @else {
            <span class="node-hint">{{
              item.node.kind === 'ending' ? 'This path stops here.' : 'Continue or end this path.'
            }}</span>
          }
          <small
            >{{ words(item.node.id) }} words{{
              item.node.id === activeNodeId() ? ' \xB7 Selected' : ''
            }}</small
          >
        </button>
      }
    </div>
  </div>
  <footer class="tree-legend">
    <span><i class="active-key"></i>Selected scene</span
    ><span><i class="ending-key"></i>Survival ending</span
    ><span><i class="death-key"></i>Character dies</span
    ><span>Follow 1 or 2 to the next scene</span>
  </footer>
</section>
`, styles: ["/* src/app/templates/narrative-studio/ui/narrative-story-map.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.story-tree {\n  display: grid;\n  gap: 12px;\n  min-width: 0;\n}\n.map-scroll {\n  max-height: calc(100dvh - 260px);\n  min-height: 300px;\n  overflow: auto;\n  border: 1px solid #adc8c0;\n  border-radius: 16px;\n  background: #e9f1eb;\n  scrollbar-width: thin;\n}\n.tree-canvas {\n  position: relative;\n  margin: 0 auto;\n  background: radial-gradient(rgba(166, 195, 185, 0.4392156863) 1px, transparent 1px) 0 0/18px 18px;\n}\nsvg {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n}\n.choice-line {\n  fill: none;\n  stroke-width: 3;\n}\n.choice-1 {\n  stroke: #bc644a;\n}\n.choice-2 {\n  stroke: #2b797c;\n}\n.choice-marker {\n  fill: #fffdf5;\n  stroke-width: 2;\n}\n.choice-number {\n  fill: #24494b;\n  font: 800 12px system-ui;\n  text-anchor: middle;\n}\n.tree-node {\n  position: absolute;\n  display: grid;\n  align-content: start;\n  gap: 7px;\n  width: 192px;\n  height: 152px;\n  transform: translate(-50%, -50%);\n  border: 1px solid #83a69a;\n  border-top: 4px solid #658f81;\n  border-radius: 12px;\n  padding: 12px;\n  background: #fffdf5;\n  color: #173c40;\n  box-shadow: 0 4px 10px rgba(37, 74, 65, 0.0705882353);\n  text-align: left;\n  cursor: pointer;\n  font: inherit;\n}\n.tree-node:hover {\n  border-color: #1a6763;\n  background: #f4fbf5;\n}\n.tree-node.active {\n  border-color: #166d69;\n  outline: 3px solid rgba(22, 109, 105, 0.1882352941);\n  background: #f5fff9;\n}\n.tree-node.ending {\n  border-top-color: #bd8041;\n  background: #fff3dc;\n}\n.node-state {\n  color: #3d6c61;\n  font: 800 10px system-ui;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.ending .node-state {\n  color: #8b5c27;\n}\n.tree-node strong {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  font: 700 16px/1.2 Georgia, serif;\n}\n.node-options {\n  display: grid;\n  gap: 5px;\n}\n.node-options > span {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  min-width: 0;\n  font: 12px system-ui;\n}\n.node-options > span > span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.node-options i {\n  flex: 0 0 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #f8e6dc;\n  color: #8f432d;\n  text-align: center;\n  font: 700 11px/18px system-ui;\n}\n.node-options > span:nth-child(2) i {\n  color: #206466;\n  background: #dfeeed;\n}\n.node-hint {\n  color: #62786c;\n  font: 12px/1.5 system-ui;\n}\n.tree-node small {\n  margin-top: auto;\n  color: #5b786b;\n  font: 11px system-ui;\n}\n.tree-legend {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px 16px;\n  color: #426759;\n  font: 11px system-ui;\n}\n.tree-legend span {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.tree-legend i {\n  width: 12px;\n  height: 12px;\n  border: 2px solid #166d69;\n  border-radius: 3px;\n}\n.tree-legend .ending-key {\n  border-color: #bd8041;\n  background: #fff3dc;\n}\n:focus-visible {\n  outline: 3px solid #ba6b19;\n  outline-offset: 3px;\n}\n@media (max-width: 780px) {\n  .map-scroll {\n    max-height: 340px;\n  }\n}\n.tree-node.death {\n  border-top-color: #ae534a;\n  background: #fff0eb;\n}\n.death .node-state {\n  color: #98473d;\n}\n.tree-legend .death-key {\n  border-color: #ae534a;\n  background: #fff0eb;\n}\n/*# sourceMappingURL=narrative-story-map.component.css.map */\n"] }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], scenes: [{ type: Input, args: [{ isSignal: true, alias: "scenes", required: true }] }], activeNodeId: [{ type: Input, args: [{ isSignal: true, alias: "activeNodeId", required: false }] }], recommendedNodeId: [{ type: Input, args: [{ isSignal: true, alias: "recommendedNodeId", required: false }] }], compact: [{ type: Input, args: [{ isSignal: true, alias: "compact", required: false }] }], nodeSelected: [{ type: Output, args: ["nodeSelected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativeStoryMapComponent, { className: "NarrativeStoryMapComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-story-map.component.ts", lineNumber: 27 });
})();

export {
  NarrativeStoryMapComponent
};
//# debugId=1ba34dd5-7183-5100-8796-b61508ad892c
//# sourceMappingURL=chunk-YQSRM7MS.js.map
