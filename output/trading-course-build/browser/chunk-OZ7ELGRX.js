import {
  NarrativeStoryMapComponent
} from "./chunk-YQSRM7MS.js";
import "./chunk-M73YRRYA.js";
import {
  survivalIslandStoryLabConfig
} from "./chunk-5GZIIEA6.js";
import {
  Component,
  ElementRef,
  Input,
  afterRenderEffect,
  computed,
  inject,
  input,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/completed-samples/narrative.sample-data.ts
var scene = (nodeId, title, text, choiceLabels = {}) => ({ nodeId, title, text, choiceLabels, revisions: [] });
var survivalIslandSampleStory = {
  nodes: [
    ...survivalIslandStoryLabConfig.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      choices: node.choices.map((choice) => {
        if (choice.id === "lagoon-signal") return __spreadProps(__spreadValues({}, choice), { nextNodeId: "ending-return" });
        if (choice.id === "cave-truth") return __spreadProps(__spreadValues({}, choice), { nextNodeId: "ending-cave" });
        return choice;
      })
    })),
    __spreadProps(__spreadValues({}, survivalIslandStoryLabConfig.nodes.find((node) => node.id === "ending-stay")), {
      id: "ending-return",
      endingOutcome: "death",
      mapLabel: "Dead end \xB7 Swept out to sea",
      suggestedTitle: "The Whistle Beneath the Waves"
    }),
    __spreadProps(__spreadValues({}, survivalIslandStoryLabConfig.nodes.find((node) => node.id === "ending-stay")), {
      id: "ending-cave",
      endingOutcome: "death",
      mapLabel: "Dead end \xB7 Trapped by the tide",
      suggestedTitle: "The Rising Water"
    })
  ],
  authorNote: "I invented Tom\xE1s and his adventure around Selkirk\u2019s real rescue. Two choices lead to the fictional character\u2019s death: a dangerous solo crossing and a cave cut off by the tide. Other paths continue through the storm. Selkirk is rescued in every ending; the reader decides whether my fictional protagonist survives.",
  id: "sample-fire-above-cove",
  publishedAt: "2026-09-05T18:00:00.000Z",
  title: "The Fire Above the Cove",
  authorDisplayName: "Maya R. \xB7 Fictional Grade 5 author",
  historicalSettingId: "selkirk-1709",
  bible: {
    protagonist: "Tom\xE1s, a careful thirteen-year-old deckhand who notices small details but is afraid to speak up",
    immediateGoal: "Keep the landing boat safe and help bring the island survivor aboard the Duke",
    innerFear: "Tom\xE1s worries the older sailors will laugh if his idea is wrong",
    islandSecret: "The wild-looking stranger has survived alone for more than four years",
    companion: "Alexander Selkirk, the real survivor the crew has come to rescue",
    importantObject: "A brass whistle Tom\xE1s uses to signal the ship",
    pointOfView: "third",
    tone: "adventure"
  },
  scenes: {
    shore: scene(
      "shore",
      "The Man in Goatskins",
      `On February 2, 1709, Tom\xE1s pulled an oar through the cold blue water. The ship Duke waited beyond the rocks. Ahead, smoke curled above the island of M\xE1s a Tierra.

\u201CThere!\u201D cried a sailor.

A man in goatskins ran down the mountain. He waved both arms. He had been alone on the island for more than four years, but Tom\xE1s did not know that yet.

The landing boat struck the beach. A wave snapped the front rope out of Tom\xE1s\u2019s hands. The boat spun sideways. At the same time, the stranger pointed toward the ridge and shouted a warning Tom\xE1s could not hear.

Tom\xE1s gripped his brass whistle. He had time to follow the stranger or save the boat\u2019s rope. Not both.`,
      {
        "shore-high": "Climb toward the stranger and learn what he is warning them about.",
        "shore-water": "Chase the loose rope before the waves carry away the landing boat."
      }
    ),
    ridge: scene(
      "ridge",
      "The Warning on the Ridge",
      `Tom\xE1s climbed over sharp stones. Wind pushed against his back. The stranger moved quickly, even without shoes.

At the top, Tom\xE1s saw two things. A narrow cave path led down to the sheltered cove. Farther uphill, rain had nearly put out a signal fire.

The stranger pointed at the cave. Then he pointed at the Duke and made a wide circle with his hand. Tom\xE1s understood. The next wave would block the beach. The rescue boat needed a safer landing place.

Tom\xE1s could hurry through the cave to show the sailors the cove. Or he could rebuild the fire so the ship would see where to send help.`,
      {
        "ridge-cave": "Follow the stranger through the narrow cave path.",
        "ridge-signal": "Stay on the ridge and rebuild the dying signal fire."
      }
    ),
    lagoon: scene(
      "lagoon",
      "The Rope in the Water",
      `Tom\xE1s splashed into the cove. The loose rope slid past his fingers once. On his second try, he caught it and wrapped it around a black rock.

\u201CBoat is safe!\u201D he called. The wind stole his words.

Near the rock, Tom\xE1s found footprints. They were bare human feet, not animal tracks. They led toward a dark opening behind the cliff. Above him, a thin line of smoke bent in the wind.

The stranger had survived here somehow. The tracks might lead to him. Beyond the breaking waves, the Duke looked impossibly far away. Tom\xE1s could follow the footprints or take the boat back to the ship to ask for help. He tied the rope tight and chose his next move.`,
      {
        "lagoon-cave": "Follow the bare footprints into the opening in the cliff.",
        "lagoon-signal": "Take the boat back to the Duke and ask for help."
      }
    ),
    cave: scene(
      "cave",
      "A Voice in the Dark",
      `The cave was dry inside. Tom\xE1s saw a clay cup, shells, and pieces of goatskin stacked with care. This was not an animal\u2019s den. It was a home.

The stranger stepped into the light. His beard was long, but his eyes were bright.

\u201CShip?\u201D he asked in a rough voice.

Tom\xE1s nodded. \u201CYes. We came from the Duke.\u201D

Hope crossed the man\u2019s face. Then thunder shook dust from the cave roof. He drew a map in the sand. The beach would flood, but a hidden cove could protect the boat.

Tom\xE1s did not know the man\u2019s name. Still, the map matched the current he had seen. He raised his whistle and decided to trust what he had noticed.`,
      {
        "cave-eye": "Trust the sand map and lead everyone toward the hidden cove.",
        "cave-truth": "Wait inside the cave instead of following the warning about the tide."
      }
    ),
    signal: scene(
      "signal",
      "Smoke Through the Rain",
      `Tom\xE1s reached the fire as rain began to fall. The wood hissed. He found dry grass beneath a flat stone and pushed it under the coals.

A small flame rose. Then another.

Tom\xE1s took off his red neck cloth and held it over the smoke. Three short signals. That was the pattern the Duke\u2019s crew used for danger.

Far offshore, a lantern flashed three times.

They had seen him.

The stranger arrived and pointed toward a hidden cove. Tom\xE1s looked down at the rough water. If the next boat came to the open beach, it could break apart. His whistle felt cold against his lips. Should he hurry down to guide the boat, or keep the fire alive so the crew could find the island?`,
      {
        "signal-eye": "Race to the hidden cove before the rescue boat reaches the rocks.",
        "signal-stay": "Stay by the fire and protect the signal until help arrives."
      }
    ),
    eye: scene(
      "eye",
      "Three Quiet Minutes",
      `For a moment, the rain stopped. The sea was still rough, but the wind became quiet.

The older sailors reached the cove. One of them stared at the stranger. He had sailed with him years before.

\u201CAlexander Selkirk?\u201D he asked.

The stranger smiled. At last, Tom\xE1s knew his name.

Another wave struck the rocks. The sailors needed a signal from above to guide the boat. Selkirk\u2019s few belongings were still near the cave. A weather-stained notebook lay beside them.

The calm would not last. Tom\xE1s had to decide how he would help before the storm returned.`,
      {
        "eye-rescue": "Climb above the cove and guide the boat with the brass whistle.",
        "eye-truth": "Ask Selkirk before carrying his weather-stained notebook."
      }
    ),
    "ending-return": scene(
      "ending-return",
      "The Whistle Beneath the Waves",
      `Tom\xE1s untied the boat before asking the sailors to help. He thought he could prove he was useful by reaching the Duke alone.

The current caught the bow. He pulled hard on one oar, but the boat turned sideways. A wave rose between him and the island.

Tom\xE1s reached for his brass whistle. Its thin note vanished beneath the wind. The next wave overturned the boat and swept him beyond the sailors\u2019 reach. He could not make it back to shore. Tom\xE1s drowned.

Later that day, the other sailors brought Alexander Selkirk safely aboard the Duke. The real rescue still took place, but the fictional young deckhand never returned.

The empty place beside the galley stayed empty. His choice to cross alone had ended his story.`
    ),
    "ending-cave": scene(
      "ending-cave",
      "The Rising Water",
      `Tom\xE1s decided the cave was safer than the storm. He waved the stranger ahead. \u201CI\u2019ll wait here!\u201D he called.

At first, the stone walls kept out the wind. Then a thin ribbon of water crossed the sand map. Tom\xE1s moved his boots onto a rock. A second wave erased the map completely.

Now he understood the warning. The cave was part of the flooded passage.

He ran toward the entrance, but the tide had already covered the low opening. He blew his whistle until his breath failed. Outside, the storm swallowed the sound. The water kept rising, and Tom\xE1s drowned before anyone could reach him.

Alexander Selkirk reached the rescue crew by the higher path and was brought safely aboard the Duke. Tom\xE1s\u2019s fictional adventure ended in the cave. Ignoring the warning had left him with no way out.`
    ),
    "ending-rescue": scene(
      "ending-rescue",
      "Three Clear Notes",
      `Tom\xE1s climbed onto a high rock. The rescue boat looked tiny below him.

He saw a wave turning toward the cove. His stomach tightened. What if his signal was wrong?

Then he remembered the current below the rocks and the stranger\u2019s warning. Tom\xE1s blew three clear notes and pointed east.

The sailors turned just in time. The wave lifted the boat instead of pushing it onto the rocks. Selkirk climbed aboard.

By sunset, everyone was safe on the Duke. Selkirk\u2019s real rescue had finally come.

Tom\xE1s placed the whistle in his pocket. Courage, he decided, was not being sure. It was speaking when what you noticed might help someone.`
    ),
    "ending-truth": scene(
      "ending-truth",
      "The Story Belonged to Him",
      `Tom\xE1s reached for the notebook, then stopped.

\u201CMay I carry this?\u201D he asked.

Selkirk held the book for a moment. \u201CAye,\u201D he said. \u201CBut keep it dry.\u201D

Tom\xE1s tucked it beneath his coat. He wanted to open it and learn every island secret. Instead, he carried it closed.

The crew guided Selkirk into the boat. By sunset, he was safe aboard the Duke. Sailors crowded around him with questions, but Tom\xE1s waited.

He had helped rescue a man, not a treasure chest full of stories. When Selkirk was ready to speak, Tom\xE1s would listen. Until then, the story belonged to the person who had lived it.`
    ),
    "ending-stay": scene(
      "ending-stay",
      "The Last Trip from Shore",
      `Tom\xE1s stayed by the fire. Every time rain flattened a flame, he fed it another handful of dry grass. He could hear the rescue crew calling below, but leaving now might put out their only visible guide.

The stranger crouched beside him and shielded the coals with a flat stone. Together they kept the smoke rising until a sailor climbed the ridge and waved them down. \u201CSelkirk! We have a safe landing!\u201D he called.

\u201CYou kept a fire ready all this time?\u201D Tom\xE1s asked.

Selkirk looked at the mountain. \u201CFor four years and four months.\u201D

The storm returned as they pushed away from shore. Tom\xE1s helped row until his arms shook. At sunset, Selkirk stepped onto the Duke at last.

Tom\xE1s had feared that staying behind would look weak. Now he knew that courage could be quiet. Sometimes it meant refusing to leave another person alone for one minute more.`
    )
  }
};
var narrativeSampleGuide = {
  title: "The Fire Above the Cove",
  subtitle: "Play Maya\u2019s branching story about a fictional deckhand caught inside Alexander Selkirk\u2019s real 1709 rescue. Every path changes Tom\xE1s while protecting the historical outcome.",
  audience: "Historical fiction \xB7 Grade 5 sample",
  duration: "Eleven scenes \xB7 Five endings: two deaths and three survival outcomes",
  trail: [
    {
      label: "Historical launch",
      title: "A fictional child enters a real event.",
      text: "Maya kept Selkirk\u2019s rescue date and outcome fixed, then added Tom\xE1s as a fictional deckhand whose choices could branch safely around those facts.",
      evidence: "The player displays the historical anchor and accuracy boundary above every scene."
    },
    {
      label: "Character pressure",
      title: "The outer storm tests an inner fear.",
      text: "Tom\xE1s notices useful details but fears older sailors will laugh. Each choice asks whether he will speak, listen, help, or wait.",
      evidence: "His brass whistle changes from a simple object into a symbol of finding his voice."
    },
    {
      label: "Branching consequences",
      title: "Different paths reveal different courage.",
      text: "Readers may save the boat, follow Selkirk, rebuild the signal, or protect his belongings. Two paths end with Tom\xE1s\u2019s death. Other paths continue and meet at the final decision.",
      evidence: "Five endings include a fatal solo crossing, a fatal rising tide, speaking up, respecting another person\u2019s story, and staying to help."
    },
    {
      label: "Revision",
      title: "Every ending protects the fact.",
      text: "An early draft allowed Selkirk to remain on the island. Maya revised it because the real Selkirk was rescued on February 2, 1709.",
      evidence: "All five endings leave Selkirk safely aboard the Duke."
    }
  ],
  review: {
    strength: "The sample uses accessible sentences, concrete action, and repeated story details while clearly separating the fictional protagonist from the real historical person.",
    question: "Which details show Tom\xE1s changing, and how does that change connect to the choice you made?",
    revision: "The endings were rewritten so they differ emotionally while preserving the same documented rescue outcome.",
    assessment: "Look for a clear narrator, sequence, dialogue, sensory details, meaningful choices, historical boundaries, and an ending connected to the character\u2019s fear."
  }
};

// src/app/templates/narrative-studio/ui/narrative-showcase-player.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NarrativeShowcasePlayerComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 4)(1, "summary");
    \u0275\u0275text(2, "Historical setting and source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "aside", 21)(4, "div")(5, "span");
    \u0275\u0275text(6, "Historical anchor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "a", 22);
    \u0275\u0275text(14, "Check the source \u2197");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const setting_r1 = ctx;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(setting_r1.eraLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r1.historicalEvent);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(setting_r1.accuracyBoundary);
    \u0275\u0275advance();
    \u0275\u0275property("href", setting_r1.sourceUrl, \u0275\u0275sanitizeUrl);
  }
}
function NarrativeShowcasePlayerComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NarrativeShowcasePlayerComponent_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.back());
    });
    \u0275\u0275text(1, "\u2190 Back");
    \u0275\u0275elementEnd();
  }
}
function NarrativeShowcasePlayerComponent_Conditional_37_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NarrativeShowcasePlayerComponent_Conditional_37_For_4_Template_button_click_0_listener() {
      const choice_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.choose(choice_r5));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b", 23);
    \u0275\u0275text(4, "\u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const choice_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.currentScene().choiceLabels[choice_r5.id]);
  }
}
function NarrativeShowcasePlayerComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p");
    \u0275\u0275text(2, "What should the character do next?");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, NarrativeShowcasePlayerComponent_Conditional_37_For_4_Template, 5, 1, "button", 11, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.currentNode().choices);
  }
}
function NarrativeShowcasePlayerComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 23);
    \u0275\u0275text(2, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function NarrativeShowcasePlayerComponent_Conditional_38_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.restart());
    });
    \u0275\u0275text(8, "Try another path");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("You reached ", ctx_r2.currentNode().mapLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.currentNode().endingOutcome === "death" ? "The character has died. This path ends here. Start again and try a different choice." : "The character survives. Start again to discover another path.", " ");
  }
}
function NarrativeShowcasePlayerComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "footer", 20)(1, "strong");
    \u0275\u0275text(2, "Sample author\u2019s note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx);
  }
}
var NarrativeShowcasePlayerComponent = class _NarrativeShowcasePlayerComponent {
  config = input.required(
    ...ngDevMode ? [{ debugName: "config" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publication = input.required(
    ...ngDevMode ? [{ debugName: "publication" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentNodeId = signal(
    "",
    ...ngDevMode ? [{ debugName: "currentNodeId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  storyConfig = computed(
    () => __spreadProps(__spreadValues({}, this.config()), {
      nodes: this.publication().nodes ?? this.config().nodes
    }),
    ...ngDevMode ? [{ debugName: "storyConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  endingCount = computed(
    () => this.storyConfig().nodes.filter((node) => node.kind === "ending").length,
    ...ngDevMode ? [{ debugName: "endingCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  element = inject(ElementRef);
  constructor() {
    afterRenderEffect(() => {
      this.currentNodeId();
      const text = this.element.nativeElement.querySelector(".scene-text");
      if (text)
        text.scrollTop = 0;
      if (this.currentNodeId() && this.element.nativeElement.ownerDocument.defaultView?.matchMedia("(max-width: 780px)").matches) {
        this.element.nativeElement.querySelector(".sample-reading")?.scrollIntoView({ block: "nearest", behavior: "instant" });
      }
      this.element.nativeElement.querySelector(".sample-scene h2")?.focus({ preventScroll: true });
    });
  }
  path = signal(
    [],
    ...ngDevMode ? [{ debugName: "path" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentNode = computed(
    () => {
      const id = this.currentNodeId() || this.config().startNodeId;
      return this.storyConfig().nodes.find((node) => node.id === id);
    },
    ...ngDevMode ? [{ debugName: "currentNode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentScene = computed(
    () => this.publication().scenes[this.currentNode().id],
    ...ngDevMode ? [{ debugName: "currentScene" }] : (
      /* istanbul ignore next */
      []
    )
  );
  historicalSetting = computed(
    () => this.config().historicalSettings.find((setting) => setting.id === this.publication().historicalSettingId),
    ...ngDevMode ? [{ debugName: "historicalSetting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pathLength = computed(
    () => Math.max(this.path().length, 1),
    ...ngDevMode ? [{ debugName: "pathLength" }] : (
      /* istanbul ignore next */
      []
    )
  );
  choose(choice) {
    const path = this.path().length ? this.path() : [this.config().startNodeId];
    this.path.set([...path, choice.nextNodeId]);
    this.currentNodeId.set(choice.nextNodeId);
  }
  inspectScene(nodeId) {
    this.currentNodeId.set(nodeId);
    this.path.set([nodeId]);
  }
  back() {
    const path = this.path().slice(0, -1);
    if (!path.length)
      return;
    this.path.set(path);
    this.currentNodeId.set(path.at(-1));
  }
  restart() {
    this.currentNodeId.set(this.config().startNodeId);
    this.path.set([this.config().startNodeId]);
  }
  static \u0275fac = function NarrativeShowcasePlayerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NarrativeShowcasePlayerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NarrativeShowcasePlayerComponent, selectors: [["app-narrative-showcase-player"]], inputs: { config: [1, "config"], publication: [1, "publication"] }, decls: 40, vars: 18, consts: [[1, "story-player"], [1, "story-cover"], [3, "src", "alt"], [1, "cover-copy"], [1, "history-reference"], [1, "sample-workspace"], [1, "sample-map"], [1, "map-eyebrow"], [3, "nodeSelected", "config", "scenes", "activeNodeId"], [1, "sample-reading"], [1, "player-toolbar"], ["type", "button"], ["type", "button", 3, "click"], ["aria-live", "polite", 1, "sample-scene"], [1, "scene-kind"], ["tabindex", "-1"], [1, "reading-hint"], ["role", "region", "tabindex", "0", "aria-label", "Scene text \u2014 scroll to read the full scene", 1, "scene-text"], ["aria-label", "Choose what happens next", 1, "sample-choices"], [1, "ending-panel"], [1, "author-note"], [1, "history-anchor"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["aria-hidden", "true"]], template: function NarrativeShowcasePlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article", 0)(1, "header", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "p");
      \u0275\u0275text(5, "Completed Grade 5 sample \xB7 Playable historical fiction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, NarrativeShowcasePlayerComponent_Conditional_10_Template, 15, 4, "details", 4);
      \u0275\u0275elementStart(11, "div", 5)(12, "aside", 6)(13, "span", 7);
      \u0275\u0275text(14, "THE COMPLETE ADVENTURE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "h2");
      \u0275\u0275text(16, "Every choice opens a new path");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "app-narrative-story-map", 8);
      \u0275\u0275listener("nodeSelected", function NarrativeShowcasePlayerComponent_Template_app_narrative_story_map_nodeSelected_19_listener($event) {
        return ctx.inspectScene($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 9)(21, "div", 10)(22, "span");
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div");
      \u0275\u0275conditionalCreate(25, NarrativeShowcasePlayerComponent_Conditional_25_Template, 2, 0, "button", 11);
      \u0275\u0275elementStart(26, "button", 12);
      \u0275\u0275listener("click", function NarrativeShowcasePlayerComponent_Template_button_click_26_listener() {
        return ctx.restart();
      });
      \u0275\u0275text(27, "\u21BA Start over");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "section", 13)(29, "p", 14);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "h2", 15);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 16);
      \u0275\u0275text(34, " Read this scene, then choose a path below. Scroll inside the story if more text remains. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 17);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(37, NarrativeShowcasePlayerComponent_Conditional_37_Template, 5, 0, "div", 18)(38, NarrativeShowcasePlayerComponent_Conditional_38_Template, 9, 2, "div", 19);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(39, NarrativeShowcasePlayerComponent_Conditional_39_Template, 5, 1, "footer", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_15_0;
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.config().launchImage, \u0275\u0275sanitizeUrl)("alt", ctx.config().launchImageAlt);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.publication().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("by ", ctx.publication().authorDisplayName);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_4_0 = ctx.historicalSetting()) ? 10 : -1, tmp_4_0);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate2(" ", ctx.storyConfig().nodes.length, " scenes \xB7 ", ctx.endingCount(), " endings. Two choices lead to the character\u2019s death; other paths continue toward survival. Select any scene to read it. ");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.storyConfig())("scenes", ctx.publication().scenes)("activeNodeId", ctx.currentNode().id);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("Scene ", ctx.pathLength(), " \xB7 ", ctx.currentNode().mapLabel);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.path().length > 1 ? 25 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.currentNode().kind === "ending" ? ctx.currentNode().endingOutcome === "death" ? "Dead end \xB7 The character dies" : "Survival ending" : "The story continues", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentScene().title);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.currentScene().text, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentNode().choices.length ? 37 : 38);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_15_0 = ctx.publication().authorNote) ? 39 : -1, tmp_15_0);
    }
  }, dependencies: [NarrativeStoryMapComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #18383d;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \na[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.story-player[_ngcontent-%COMP%] {\n  max-width: 68rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #254d54;\n  border-radius: 1rem;\n  background: #fffdf3;\n  box-shadow: 0 1rem 3rem rgba(12, 47, 53, 0.16);\n}\n.story-cover[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 24rem;\n  overflow: hidden;\n  color: #fff9e8;\n  background: #092c36;\n}\n.story-cover[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 21, 28, 0.9),\n      rgba(4, 21, 28, 0.46),\n      transparent 78%);\n}\n.story-cover[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cover-copy[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  min-height: 24rem;\n  align-content: end;\n  gap: 0.5rem;\n  max-width: 37rem;\n  padding: clamp(1.5rem, 5vw, 3.5rem);\n}\n.cover-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.scene-kind[_ngcontent-%COMP%], \n.history-anchor[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #f4c66e;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.cover-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font: 700 clamp(2.7rem, 7vw, 5.2rem)/0.96 Georgia, serif;\n}\n.cover-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d6e5df;\n}\n.history-anchor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1.4fr auto;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.4rem;\n  color: #dcebe6;\n  background: #0d3a42;\n}\n.history-anchor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n}\n.history-anchor[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n}\n.history-anchor[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.history-anchor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #aee5dc;\n  font-size: 0.78rem;\n  font-weight: 800;\n  white-space: nowrap;\n}\n.player-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.8rem 1.4rem;\n  border-bottom: 1px solid #d6dfd7;\n  color: #607875;\n  background: #eef2ea;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n.player-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  color: #176166;\n  background: transparent;\n  font-weight: 900;\n}\n.sample-scene[_ngcontent-%COMP%] {\n  min-height: 31rem;\n  padding: clamp(2rem, 6vw, 4.5rem);\n}\n.sample-scene[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  max-width: 48rem;\n  margin: 0.4rem 0 1.5rem;\n  color: #143b40;\n  font: 700 clamp(2rem, 5vw, 3.7rem)/1.05 Georgia, serif;\n}\n.scene-text[_ngcontent-%COMP%] {\n  max-width: 48rem;\n  white-space: pre-line;\n  color: #29494c;\n  font: 1.08rem/1.85 Georgia, serif;\n}\n.sample-choices[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  margin-top: 2rem;\n  border-top: 1px solid #d7c590;\n  padding-top: 1.2rem;\n}\n.sample-choices[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  margin: 0;\n  color: #795c2d;\n  font-weight: 900;\n}\n.sample-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  min-height: 4.2rem;\n  border: 1px solid #74a29a;\n  border-radius: 0.55rem;\n  padding: 0.9rem 1rem;\n  color: #174f52;\n  background: #e3f0e8;\n  font-weight: 850;\n  text-align: left;\n}\n.sample-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #bc6948;\n  background: #fff0d9;\n}\n.sample-choices[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.ending-panel[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 0.55rem;\n  max-width: 36rem;\n  margin: 2.5rem auto 0;\n  border-top: 1px solid #d3b875;\n  padding-top: 1.5rem;\n  color: #73552d;\n  text-align: center;\n}\n.ending-panel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n}\n.ending-panel[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 700 1.25rem Georgia, serif;\n}\n.ending-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.5;\n}\n.ending-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: 0.4rem;\n  padding: 0.75rem 1rem;\n  color: #fff;\n  background: #b65338;\n  font-weight: 900;\n}\n.author-note[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 1rem;\n  border-top: 1px solid #d2ddd5;\n  padding: 1.2rem 1.5rem;\n  background: #edf2ea;\n}\n.author-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #31645f;\n}\n.author-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #56706b;\n  font-size: 0.84rem;\n  line-height: 1.55;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \n[tabindex="-1"][_ngcontent-%COMP%]:focus {\n  outline: 3px solid #d28a31;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .story-cover[_ngcontent-%COMP%], \n   .cover-copy[_ngcontent-%COMP%] {\n    min-height: 20rem;\n  }\n  .history-anchor[_ngcontent-%COMP%], \n   .author-note[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .sample-choices[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .sample-scene[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n}\n.story-cover[_ngcontent-%COMP%], \n.cover-copy[_ngcontent-%COMP%] {\n  min-height: 100px;\n}\n.cover-copy[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  max-width: none;\n}\n.cover-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(25px, 3vw, 38px);\n}\n.history-reference[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  background: #0d3a42;\n  color: #e2f1e9;\n  cursor: pointer;\n}\n.sample-scene[_ngcontent-%COMP%] {\n  min-height: 0;\n  padding: 12px 24px;\n}\n.sample-scene[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 26px;\n  margin: 5px 0;\n}\n.reading-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 8px 0;\n  color: #3b625d;\n}\n.scene-text[_ngcontent-%COMP%] {\n  max-height: clamp(150px, 100dvh - 540px, 320px);\n  overflow: auto;\n  scrollbar-gutter: stable;\n  padding-right: 12px;\n  font-size: 17px;\n  line-height: 1.65;\n}\n.sample-choices[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding-top: 10px;\n}\n.sample-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 10px;\n}\n.player-toolbar[_ngcontent-%COMP%] {\n  padding: 6px 24px;\n}\n.player-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n.scene-text[_ngcontent-%COMP%] {\n  max-height: clamp(140px, 100dvh - 630px, 360px);\n}\n.story-player[_ngcontent-%COMP%] {\n  max-width: none;\n}\n.sample-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n}\n.sample-map[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 22px;\n  background: #e9f0e9;\n  border-right: 1px solid #b5c8b9;\n}\n.sample-map[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font: 700 25px/1.1 Georgia, serif;\n}\n.sample-map[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #486852;\n}\n.map-eyebrow[_ngcontent-%COMP%] {\n  color: #8b5a33;\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n}\n.sample-reading[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.sample-scene[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n.sample-scene[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.scene-kind[_ngcontent-%COMP%] {\n  color: #8c5932;\n}\n.scene-text[_ngcontent-%COMP%] {\n  max-height: 420px;\n  font-size: 17px;\n}\n.sample-choices[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.player-toolbar[_ngcontent-%COMP%] {\n  padding: 6px 20px;\n  flex-wrap: wrap;\n}\n@media (max-width: 780px) {\n  .sample-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .sample-map[_ngcontent-%COMP%] {\n    border-right: 0;\n    border-bottom: 1px solid #b5c8b9;\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=narrative-showcase-player.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NarrativeShowcasePlayerComponent, [{
    type: Component,
    args: [{ selector: "app-narrative-showcase-player", imports: [NarrativeStoryMapComponent], template: `<article class="story-player">
  <header class="story-cover">
    <img [src]="config().launchImage" [alt]="config().launchImageAlt" />
    <div class="cover-copy">
      <p>Completed Grade 5 sample \xB7 Playable historical fiction</p>
      <h1>{{ publication().title }}</h1>
      <span>by {{ publication().authorDisplayName }}</span>
    </div>
  </header>

  @if (historicalSetting(); as setting) {
    <details class="history-reference">
      <summary>Historical setting and source</summary>
      <aside class="history-anchor">
        <div>
          <span>Historical anchor</span>
          <strong>{{ setting.eraLabel }}</strong>
          <p>{{ setting.historicalEvent }}</p>
        </div>
        <p>{{ setting.accuracyBoundary }}</p>
        <a [href]="setting.sourceUrl" target="_blank" rel="noopener noreferrer"
          >Check the source \u2197</a
        >
      </aside>
    </details>
  }

  <div class="sample-workspace">
    <aside class="sample-map">
      <span class="map-eyebrow">THE COMPLETE ADVENTURE</span>
      <h2>Every choice opens a new path</h2>
      <p>
        {{ storyConfig().nodes.length }} scenes \xB7 {{ endingCount() }} endings. Two choices lead to
        the character\u2019s death; other paths continue toward survival. Select any scene to read it.
      </p>
      <app-narrative-story-map
        [config]="storyConfig()"
        [scenes]="publication().scenes"
        [activeNodeId]="currentNode().id"
        (nodeSelected)="inspectScene($event)"
      />
    </aside>
    <div class="sample-reading">
      <div class="player-toolbar">
        <span>Scene {{ pathLength() }} \xB7 {{ currentNode().mapLabel }}</span>
        <div>
          @if (path().length > 1) {
            <button type="button" (click)="back()">\u2190 Back</button>
          }
          <button type="button" (click)="restart()">\u21BA Start over</button>
        </div>
      </div>

      <section class="sample-scene" aria-live="polite">
        <p class="scene-kind">
          {{
            currentNode().kind === 'ending'
              ? currentNode().endingOutcome === 'death'
                ? 'Dead end \xB7 The character dies'
                : 'Survival ending'
              : 'The story continues'
          }}
        </p>
        <h2 tabindex="-1">{{ currentScene().title }}</h2>
        <p class="reading-hint">
          Read this scene, then choose a path below. Scroll inside the story if more text remains.
        </p>
        <div
          class="scene-text"
          role="region"
          tabindex="0"
          aria-label="Scene text \u2014 scroll to read the full scene"
        >
          {{ currentScene().text }}
        </div>

        @if (currentNode().choices.length) {
          <div class="sample-choices" aria-label="Choose what happens next">
            <p>What should the character do next?</p>
            @for (choice of currentNode().choices; track choice.id) {
              <button type="button" (click)="choose(choice)">
                <span>{{ currentScene().choiceLabels[choice.id] }}</span
                ><b aria-hidden="true">\u2192</b>
              </button>
            }
          </div>
        } @else {
          <div class="ending-panel">
            <span aria-hidden="true">\u2726</span>
            <strong>You reached {{ currentNode().mapLabel }}</strong>
            <p>
              {{
                currentNode().endingOutcome === 'death'
                  ? 'The character has died. This path ends here. Start again and try a different choice.'
                  : 'The character survives. Start again to discover another path.'
              }}
            </p>
            <button type="button" (click)="restart()">Try another path</button>
          </div>
        }
      </section>
    </div>
  </div>
  @if (publication().authorNote; as note) {
    <footer class="author-note">
      <strong>Sample author\u2019s note</strong>
      <p>{{ note }}</p>
    </footer>
  }
</article>
`, styles: ['/* src/app/templates/narrative-studio/ui/narrative-showcase-player.component.scss */\n:host {\n  display: block;\n  color: #18383d;\n  font-family:\n    Inter,\n    Arial,\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\na {\n  font: inherit;\n}\nbutton {\n  cursor: pointer;\n}\n.story-player {\n  max-width: 68rem;\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid #254d54;\n  border-radius: 1rem;\n  background: #fffdf3;\n  box-shadow: 0 1rem 3rem rgba(12, 47, 53, 0.16);\n}\n.story-cover {\n  position: relative;\n  min-height: 24rem;\n  overflow: hidden;\n  color: #fff9e8;\n  background: #092c36;\n}\n.story-cover::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(4, 21, 28, 0.9),\n      rgba(4, 21, 28, 0.46),\n      transparent 78%);\n}\n.story-cover img {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cover-copy {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  min-height: 24rem;\n  align-content: end;\n  gap: 0.5rem;\n  max-width: 37rem;\n  padding: clamp(1.5rem, 5vw, 3.5rem);\n}\n.cover-copy p,\n.scene-kind,\n.history-anchor span {\n  margin: 0;\n  color: #f4c66e;\n  font-size: 0.75rem;\n  font-weight: 900;\n  letter-spacing: 0.11em;\n  text-transform: uppercase;\n}\n.cover-copy h1 {\n  margin: 0;\n  font: 700 clamp(2.7rem, 7vw, 5.2rem)/0.96 Georgia, serif;\n}\n.cover-copy span {\n  color: #d6e5df;\n}\n.history-anchor {\n  display: grid;\n  grid-template-columns: 1fr 1.4fr auto;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.4rem;\n  color: #dcebe6;\n  background: #0d3a42;\n}\n.history-anchor div {\n  display: grid;\n  gap: 0.2rem;\n}\n.history-anchor strong {\n  font-family: Georgia, serif;\n}\n.history-anchor p {\n  margin: 0;\n  font-size: 0.8rem;\n  line-height: 1.45;\n}\n.history-anchor a {\n  color: #aee5dc;\n  font-size: 0.78rem;\n  font-weight: 800;\n  white-space: nowrap;\n}\n.player-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.8rem 1.4rem;\n  border-bottom: 1px solid #d6dfd7;\n  color: #607875;\n  background: #eef2ea;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n.player-toolbar button {\n  border: 0;\n  color: #176166;\n  background: transparent;\n  font-weight: 900;\n}\n.sample-scene {\n  min-height: 31rem;\n  padding: clamp(2rem, 6vw, 4.5rem);\n}\n.sample-scene h2 {\n  max-width: 48rem;\n  margin: 0.4rem 0 1.5rem;\n  color: #143b40;\n  font: 700 clamp(2rem, 5vw, 3.7rem)/1.05 Georgia, serif;\n}\n.scene-text {\n  max-width: 48rem;\n  white-space: pre-line;\n  color: #29494c;\n  font: 1.08rem/1.85 Georgia, serif;\n}\n.sample-choices {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  margin-top: 2rem;\n  border-top: 1px solid #d7c590;\n  padding-top: 1.2rem;\n}\n.sample-choices > p {\n  grid-column: 1/-1;\n  margin: 0;\n  color: #795c2d;\n  font-weight: 900;\n}\n.sample-choices button {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  min-height: 4.2rem;\n  border: 1px solid #74a29a;\n  border-radius: 0.55rem;\n  padding: 0.9rem 1rem;\n  color: #174f52;\n  background: #e3f0e8;\n  font-weight: 850;\n  text-align: left;\n}\n.sample-choices button:hover {\n  border-color: #bc6948;\n  background: #fff0d9;\n}\n.sample-choices b {\n  font-size: 1.2rem;\n}\n.ending-panel {\n  display: grid;\n  justify-items: center;\n  gap: 0.55rem;\n  max-width: 36rem;\n  margin: 2.5rem auto 0;\n  border-top: 1px solid #d3b875;\n  padding-top: 1.5rem;\n  color: #73552d;\n  text-align: center;\n}\n.ending-panel > span {\n  font-size: 1.8rem;\n}\n.ending-panel strong {\n  font: 700 1.25rem Georgia, serif;\n}\n.ending-panel p {\n  margin: 0;\n  line-height: 1.5;\n}\n.ending-panel button {\n  border: 0;\n  border-radius: 0.4rem;\n  padding: 0.75rem 1rem;\n  color: #fff;\n  background: #b65338;\n  font-weight: 900;\n}\n.author-note {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 1rem;\n  border-top: 1px solid #d2ddd5;\n  padding: 1.2rem 1.5rem;\n  background: #edf2ea;\n}\n.author-note strong {\n  color: #31645f;\n}\n.author-note p {\n  margin: 0;\n  color: #56706b;\n  font-size: 0.84rem;\n  line-height: 1.55;\n}\nbutton:focus-visible,\na:focus-visible,\n[tabindex="-1"]:focus {\n  outline: 3px solid #d28a31;\n  outline-offset: 3px;\n}\n@media (max-width: 700px) {\n  .story-cover,\n  .cover-copy {\n    min-height: 20rem;\n  }\n  .history-anchor,\n  .author-note {\n    grid-template-columns: 1fr;\n  }\n  .sample-choices {\n    grid-template-columns: 1fr;\n  }\n  .sample-scene {\n    padding: 1.5rem;\n  }\n}\n.story-cover,\n.cover-copy {\n  min-height: 100px;\n}\n.cover-copy {\n  padding: 16px 24px;\n  max-width: none;\n}\n.cover-copy h1 {\n  font-size: clamp(25px, 3vw, 38px);\n}\n.history-reference summary {\n  padding: 10px 24px;\n  background: #0d3a42;\n  color: #e2f1e9;\n  cursor: pointer;\n}\n.sample-scene {\n  min-height: 0;\n  padding: 12px 24px;\n}\n.sample-scene h2 {\n  font-size: 26px;\n  margin: 5px 0;\n}\n.reading-hint {\n  font-size: 13px;\n  margin: 8px 0;\n  color: #3b625d;\n}\n.scene-text {\n  max-height: clamp(150px, 100dvh - 540px, 320px);\n  overflow: auto;\n  scrollbar-gutter: stable;\n  padding-right: 12px;\n  font-size: 17px;\n  line-height: 1.65;\n}\n.sample-choices {\n  margin-top: 12px;\n  padding-top: 10px;\n}\n.sample-choices button {\n  min-height: 44px;\n  padding: 10px;\n}\n.player-toolbar {\n  padding: 6px 24px;\n}\n.player-toolbar button {\n  min-height: 44px;\n}\n.scene-text {\n  max-height: clamp(140px, 100dvh - 630px, 360px);\n}\n.story-player {\n  max-width: none;\n}\n.sample-workspace {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n}\n.sample-map {\n  min-width: 0;\n  padding: 22px;\n  background: #e9f0e9;\n  border-right: 1px solid #b5c8b9;\n}\n.sample-map h2 {\n  margin: 8px 0;\n  font: 700 25px/1.1 Georgia, serif;\n}\n.sample-map p {\n  font-size: 13px;\n  line-height: 1.5;\n  color: #486852;\n}\n.map-eyebrow {\n  color: #8b5a33;\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  font-weight: 800;\n}\n.sample-reading {\n  min-width: 0;\n}\n.sample-scene {\n  padding: 22px;\n}\n.sample-scene h2 {\n  font-size: 28px;\n}\n.scene-kind {\n  color: #8c5932;\n}\n.scene-text {\n  max-height: 420px;\n  font-size: 17px;\n}\n.sample-choices {\n  grid-template-columns: 1fr;\n}\n.player-toolbar {\n  padding: 6px 20px;\n  flex-wrap: wrap;\n}\n@media (max-width: 780px) {\n  .sample-workspace {\n    grid-template-columns: 1fr;\n  }\n  .sample-map {\n    border-right: 0;\n    border-bottom: 1px solid #b5c8b9;\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=narrative-showcase-player.component.css.map */\n'] }]
  }], () => [], { config: [{ type: Input, args: [{ isSignal: true, alias: "config", required: true }] }], publication: [{ type: Input, args: [{ isSignal: true, alias: "publication", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NarrativeShowcasePlayerComponent, { className: "NarrativeShowcasePlayerComponent", filePath: "src/app/templates/narrative-studio/ui/narrative-showcase-player.component.ts", lineNumber: 24 });
})();

// src/app/runtime/project-showcase/narrative.sample.ts
function loadSample() {
  return __spreadProps(__spreadValues({}, narrativeSampleGuide), {
    component: NarrativeShowcasePlayerComponent,
    inputs: {
      config: survivalIslandStoryLabConfig,
      publication: survivalIslandSampleStory
    },
    providers: []
  });
}
export {
  loadSample
};
//# debugId=b87c1d36-f7d2-5dbc-afef-3a9d2af4252c
//# sourceMappingURL=chunk-OZ7ELGRX.js.map
