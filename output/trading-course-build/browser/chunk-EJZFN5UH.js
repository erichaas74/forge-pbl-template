import {
  MuseumRoomPresentationComponent,
  isMuseumBoardSnapshotData,
  parseMetaStepsEmbed,
  parsePresentationVideo
} from "./chunk-NP2TX5O3.js";
import {
  ObjectModelViewerComponent
} from "./chunk-ICIU3PCK.js";
import {
  DomSanitizer
} from "./chunk-SKMWBOWD.js";
import {
  Component,
  Input,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E2VJWGUE.js";

// src/app/templates/exhibit-hall/ui/museum-board.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function MuseumBoardComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-museum-room-presentation", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("board", ctx_r0.board);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-object-model-viewer", 11);
  }
  if (rf & 2) {
    const object_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("model", object_r2.model);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "360\xB0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "Rotatable 3D object \xB7 Open wing");
    \u0275\u0275elementEnd();
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Conditional_0_Template, 1, 1, "app-object-model-viewer", 11)(1, MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Conditional_1_Template, 4, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r0.mode !== "thumbnail" ? 0 : 1);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const object_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", object_r2.imageAssetId, \u0275\u0275sanitizeUrl)("alt", object_r2.imageAlt ?? "");
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "small", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_20_r3 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.objectMark(\u0275$index_20_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Object ", \u0275$index_20_r3 + 1);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", source_r4.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r4.citation);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r4.citation);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Conditional_0_Template, 2, 2, "a", 14)(1, MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Conditional_1_Template, 2, 1, "span");
  }
  if (rf & 2) {
    const source_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(source_r4.url ? 0 : 1);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Conditional_0_Template, 2, 1);
  }
  if (rf & 2) {
    const source_r4 = ctx.$implicit;
    const object_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275conditional(object_r2.sourceIds.includes(source_r4.id) ? 0 : -1);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Why it matters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 13)(7, "small");
    \u0275\u0275text(8, "Supporting sources:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, MuseumBoardComponent_Conditional_1_For_10_Conditional_8_For_10_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const object_r2 = \u0275\u0275nextContext().$implicit;
    const board_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(object_r2.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(object_r2.evidenceConnection);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(board_r5.sources);
  }
}
function MuseumBoardComponent_Conditional_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "div", 9);
    \u0275\u0275conditionalCreate(2, MuseumBoardComponent_Conditional_1_For_10_Conditional_2_Template, 2, 1)(3, MuseumBoardComponent_Conditional_1_For_10_Conditional_3_Template, 1, 2, "img", 10)(4, MuseumBoardComponent_Conditional_1_For_10_Conditional_4_Template, 4, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, MuseumBoardComponent_Conditional_1_For_10_Conditional_8_Template, 11, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const object_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(object_r2.model ? 2 : object_r2.imageAssetId ? 3 : 4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(object_r2.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mode !== "thumbnail" ? 8 : -1);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 12);
    \u0275\u0275text(2, "360\xB0");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Includes a 3D gallery");
    \u0275\u0275elementEnd();
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 12);
    \u0275\u0275text(2, "\u25B6");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Includes a curator video");
    \u0275\u0275elementEnd();
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 7)(1, "div", 15)(2, "div")(3, "span");
    \u0275\u0275text(4, "Final interactive exhibit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 16);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 17);
    \u0275\u0275text(8, " Open full screen ");
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10, "\u2197");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 18);
    \u0275\u0275element(12, "iframe", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 20);
    \u0275\u0275text(14, " Click inside the gallery to explore. Keyboard and motion controls are provided by MetaSteps. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const board_r5 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(board_r5.immersiveGallery?.title);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.galleryUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", board_r5.immersiveGallery?.title ?? "MetaSteps immersive gallery");
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17);
    \u0275\u0275text(1, " Open video ");
    \u0275\u0275elementStart(2, "span", 12);
    \u0275\u0275text(3, "\u2197");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("href", ctx, \u0275\u0275sanitizeUrl);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Playing sample curator explanation\u2026 ");
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Select play to preview the student presentation station ");
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.togglePrototypeVideo());
    });
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2, "NC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275conditionalCreate(7, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Conditional_7_Template, 1, 0)(8, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "i");
    \u0275\u0275element(10, "b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 25);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 26);
    \u0275\u0275text(14, " Prototype: the finished version plays the student or group\u2019s recorded artifact tour here. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const presentation_r7 = \u0275\u0275nextContext();
    const board_r5 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("playing", ctx_r0.prototypePlaying());
    \u0275\u0275attribute("aria-pressed", ctx_r0.prototypePlaying());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(presentation_r7.presenterLabel ?? board_r5.teamCredit.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.prototypePlaying() ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r0.prototypePlaying() ? 42 : 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.prototypePlaying() ? "\u2161" : "\u25B6");
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 28);
  }
  if (rf & 2) {
    const presentation_r7 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", presentation_r7.title);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "video", 29);
    \u0275\u0275text(1, " Your browser cannot play this presentation video. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const video_r8 = \u0275\u0275nextContext();
    \u0275\u0275property("src", video_r8.normalizedUrl, \u0275\u0275sanitizeUrl);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275conditionalCreate(1, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Conditional_1_Template, 1, 2, "iframe", 28)(2, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Conditional_2_Template, 2, 1, "video", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 20);
    \u0275\u0275text(4, "Watch the curator explanation before posting a question card.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const video_r8 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = video_r8.kind === "embedded" && ctx_r0.presentationEmbedUrl) ? 1 : video_r8.kind === "direct" && video_r8.normalizedUrl ? 2 : -1, tmp_6_0);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 15)(2, "div")(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_7_Template, 4, 1, "a", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_8_Template, 15, 8)(9, MuseumBoardComponent_Conditional_1_Conditional_14_Conditional_9_Template, 5, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    const presentation_r7 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(presentation_r7.prototype ? "Prototype video station" : "Student curator presentation");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(presentation_r7.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = ctx_r0.presentationVideo?.normalizedUrl) ? 7 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(presentation_r7.prototype ? 8 : (tmp_7_0 = ctx_r0.presentationVideo) ? 9 : -1, tmp_7_0);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", source_r9.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r9.citation);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const source_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", source_r9.citation, " ");
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275conditionalCreate(1, MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Conditional_1_Template, 2, 2, "a", 14)(2, MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(source_r9.url ? 1 : 2);
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const board_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(board_r5.teamCredit.memberDisplayNames.join(" \xB7 "));
  }
}
function MuseumBoardComponent_Conditional_1_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "footer")(1, "div")(2, "strong");
    \u0275\u0275text(3, "Sources");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ol");
    \u0275\u0275repeaterCreate(5, MuseumBoardComponent_Conditional_1_Conditional_15_For_6_Template, 3, 1, "li", null, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, " Curated by ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, MuseumBoardComponent_Conditional_1_Conditional_15_Conditional_11_Template, 2, 1, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const board_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(board_r5.sources);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(board_r5.teamCredit.displayName);
    \u0275\u0275advance();
    \u0275\u0275conditional(board_r5.teamCredit.memberDisplayNames?.length ? 11 : -1);
  }
}
function MuseumBoardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 3)(1, "header")(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 4);
    \u0275\u0275repeaterCreate(9, MuseumBoardComponent_Conditional_1_For_10_Template, 9, 3, "section", 5, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, MuseumBoardComponent_Conditional_1_Conditional_11_Template, 4, 0, "div", 6);
    \u0275\u0275conditionalCreate(12, MuseumBoardComponent_Conditional_1_Conditional_12_Template, 4, 0, "div", 6);
    \u0275\u0275conditionalCreate(13, MuseumBoardComponent_Conditional_1_Conditional_13_Template, 15, 4, "section", 7);
    \u0275\u0275conditionalCreate(14, MuseumBoardComponent_Conditional_1_Conditional_14_Template, 10, 4, "section", 8);
    \u0275\u0275conditionalCreate(15, MuseumBoardComponent_Conditional_1_Conditional_15_Template, 12, 2, "footer");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_11_0;
    const board_r5 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("museum-board " + ctx_r0.mode + " " + (board_r5.themeVariant ?? "ochre"));
    \u0275\u0275attribute("aria-label", board_r5.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", board_r5.teamCredit.displayName, " presents");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(board_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(board_r5.centralClaim);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(board_r5.objects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.mode === "thumbnail" && board_r5.immersiveGallery ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mode === "thumbnail" && board_r5.videoPresentation ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_10_0 = ctx_r0.mode !== "thumbnail" && ctx_r0.galleryEmbedUrl) ? 13 : -1, tmp_10_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_11_0 = ctx_r0.mode !== "thumbnail" && board_r5.videoPresentation) ? 14 : -1, tmp_11_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mode !== "thumbnail" ? 15 : -1);
  }
}
function MuseumBoardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1, " This snapshot cannot be displayed by the museum-board renderer. ");
    \u0275\u0275elementEnd();
  }
}
var MuseumBoardComponent = class _MuseumBoardComponent {
  sanitizer = inject(DomSanitizer);
  data;
  mode = "thumbnail";
  prototypePlaying = signal(
    false,
    ...ngDevMode ? [{ debugName: "prototypePlaying" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get board() {
    return isMuseumBoardSnapshotData(this.data) ? this.data : void 0;
  }
  get galleryUrl() {
    const value = this.board?.immersiveGallery?.embedUrl;
    if (value === void 0)
      return void 0;
    return parseMetaStepsEmbed(value).normalizedUrl;
  }
  get galleryEmbedUrl() {
    const value = this.galleryUrl;
    return value === void 0 ? void 0 : this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
  get presentationVideo() {
    const value = this.board?.videoPresentation?.videoUrl;
    if (value === void 0)
      return void 0;
    const parsed = parsePresentationVideo(value);
    return parsed.valid ? parsed : void 0;
  }
  get presentationEmbedUrl() {
    const video = this.presentationVideo;
    return video?.kind === "embedded" && video.normalizedUrl !== void 0 ? this.sanitizer.bypassSecurityTrustResourceUrl(video.normalizedUrl) : void 0;
  }
  objectMark(index) {
    return ["\u2625", "\u224B", "\u25B3", "\u25C8", "\u273A"][index % 5] ?? "\u25C8";
  }
  togglePrototypeVideo() {
    this.prototypePlaying.update((playing) => !playing);
  }
  static \u0275fac = function MuseumBoardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumBoardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MuseumBoardComponent, selectors: [["app-museum-board"]], inputs: { data: "data", mode: "mode" }, decls: 3, vars: 1, consts: [[3, "board"], [1, "museum-board", 3, "class"], ["role", "alert", 1, "render-error"], [1, "museum-board"], [1, "object-grid"], [1, "object-card"], [1, "immersive-badge"], ["aria-labelledby", "immersive-gallery-title", 1, "immersive-gallery"], ["aria-labelledby", "video-presentation-title", 1, "video-presentation"], [1, "object-portrait"], [3, "src", "alt"], [3, "model"], ["aria-hidden", "true"], [1, "object-sources"], ["target", "_blank", "rel", "noreferrer", 3, "href"], [1, "gallery-heading"], ["id", "immersive-gallery-title"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "embed-frame"], ["loading", "lazy", "allow", "fullscreen; autoplay; accelerometer; gyroscope; xr-spatial-tracking", "sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-popups", "allowfullscreen", "", 3, "src", "title"], [1, "embed-help"], ["id", "video-presentation-title"], ["type", "button", 1, "prototype-video", 3, "click"], ["aria-hidden", "true", 1, "prototype-presenter"], [1, "prototype-copy"], ["aria-hidden", "true", 1, "prototype-play"], [1, "prototype-note"], [1, "video-frame"], ["loading", "lazy", "allow", "fullscreen; autoplay; encrypted-media; picture-in-picture", "sandbox", "allow-scripts allow-same-origin allow-presentation", "allowfullscreen", "", 3, "src", "title"], ["controls", "", "preload", "metadata", 3, "src"]], template: function MuseumBoardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, MuseumBoardComponent_Conditional_0_Template, 1, 1, "app-museum-room-presentation", 0)(1, MuseumBoardComponent_Conditional_1_Template, 16, 11, "article", 1)(2, MuseumBoardComponent_Conditional_2_Template, 2, 0, "div", 2);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(ctx.board?.museumRoom && ctx.mode !== "thumbnail" ? 0 : (tmp_0_0 = ctx.board) ? 1 : 2, tmp_0_0);
    }
  }, dependencies: [ObjectModelViewerComponent, MuseumRoomPresentationComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n[_nghost-%COMP%], \n[_nghost-%COMP%]   *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.museum-board[_ngcontent-%COMP%] {\n  --%NS%ink: #221c18;\n  --%NS%accent: #a56a2c;\n  --%NS%accent-soft: #e8c78d;\n  display: grid;\n  gap: clamp(0.75rem, 2vw, 1.25rem);\n  min-width: 0;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.8rem, 2.4vw, 1.55rem);\n  color: var(--%NS%ink);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.031372549) 1px,\n      transparent 1px) 0 0/18px 18px,\n    #f4eddd;\n  box-shadow: inset 0 0 3rem rgba(128, 101, 51, 0.1019607843);\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.museum-board.indigo[_ngcontent-%COMP%] {\n  --%NS%accent: #53638e;\n  --%NS%accent-soft: #c7cfea;\n}\n.museum-board.sage[_ngcontent-%COMP%] {\n  --%NS%accent: #55745e;\n  --%NS%accent-soft: #c5d6bd;\n}\n.museum-board.rose[_ngcontent-%COMP%] {\n  --%NS%accent: #8a514f;\n  --%NS%accent-soft: #e2c1b9;\n}\nheader[_ngcontent-%COMP%] {\n  border-bottom: 0.28rem solid var(--%NS%accent);\n  padding-bottom: 0.8rem;\n  text-align: center;\n}\nheader[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n}\nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0.22rem 0 0.45rem;\n  font: 800 clamp(1.25rem, 3vw, 2.35rem)/1.02 Georgia, serif;\n  letter-spacing: -0.025em;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 52rem;\n  margin-inline: auto;\n  color: #4f463d;\n  font: italic 1rem/1.45 Georgia, serif;\n}\n.object-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));\n  align-items: stretch;\n  gap: 0.75rem;\n}\n.object-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: hidden;\n  border: 1px solid #c6b99e;\n  background: #fffdf6;\n  box-shadow: 0 0.3rem 0.8rem rgba(75, 59, 36, 0.1254901961);\n}\n.object-portrait[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 8rem;\n  place-items: center;\n  overflow: hidden;\n  color: #fff9e7;\n  background:\n    radial-gradient(\n      circle at 50% 40%,\n      color-mix(in srgb, var(--%NS%accent-soft) 72%, white),\n      transparent 38%),\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--%NS%accent) 88%, #29221c),\n      #29221c);\n}\n.object-portrait[_ngcontent-%COMP%]::after {\n  pointer-events: none;\n  position: absolute;\n  inset: 0.5rem;\n  border: 1px solid rgba(255, 245, 199, 0.3882352941);\n  content: "";\n}\n.object-portrait[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  z-index: 1;\n  font: 700 3.3rem Georgia, serif;\n  text-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.5333333333);\n}\n.object-portrait[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  bottom: 0.8rem;\n  font-size: 0.5rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.object-portrait[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.object-card[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  align-content: start;\n  gap: 0.42rem;\n  padding: 0.72rem;\n}\nh3[_ngcontent-%COMP%] {\n  color: var(--%NS%accent);\n  font: 800 1rem Georgia, serif;\n}\n.object-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4e4942;\n  font-size: 0.77rem;\n  line-height: 1.45;\n}\n.object-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: var(--%NS%accent);\n  font-size: 0.57rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.immersive-badge[_ngcontent-%COMP%] {\n  justify-self: center;\n  border: 1px solid color-mix(in srgb, var(--%NS%accent) 65%, white);\n  border-radius: 999px;\n  padding: 0.35rem 0.65rem;\n  color: var(--%NS%accent);\n  background: #fffdf6;\n  font-size: 0.62rem;\n  font-weight: 850;\n  letter-spacing: 0.04em;\n}\n.immersive-badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 0.25rem;\n  font-weight: 950;\n}\n.immersive-gallery[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.6rem, 2vw, 0.9rem);\n  background: #221f1c;\n  box-shadow: 0 0.5rem 1.1rem rgba(43, 33, 23, 0.2392156863);\n}\n.video-presentation[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.6rem, 2vw, 0.9rem);\n  background: #221f1c;\n  box-shadow: 0 0.5rem 1.1rem rgba(43, 33, 23, 0.2392156863);\n}\n.gallery-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  color: #fff7e8;\n}\n.gallery-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.1rem;\n}\n.gallery-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d9b567;\n  font-size: 0.56rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.gallery-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #fff7e8;\n  font-size: clamp(1rem, 2vw, 1.35rem);\n}\n.gallery-heading[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f0d28e;\n  font-size: 0.68rem;\n  font-weight: 800;\n}\n.embed-frame[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #7c6b50;\n  background: #0e0f12;\n  aspect-ratio: 7/5;\n}\n.embed-frame[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.video-frame[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #7c6b50;\n  background: #0e0f12;\n  aspect-ratio: 16/9;\n}\n.video-frame[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%], \n.video-frame[_ngcontent-%COMP%]   video[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.prototype-video[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: clamp(0.65rem, 2vw, 1rem);\n  align-items: center;\n  width: 100%;\n  min-height: 9rem;\n  border: 1px solid #7c6b50;\n  padding: clamp(0.8rem, 3vw, 1.4rem);\n  color: #fff7e8;\n  background:\n    radial-gradient(\n      circle at 82% 25%,\n      rgba(181, 140, 71, 0.3215686275),\n      transparent 28%),\n    linear-gradient(\n      135deg,\n      #33303a,\n      #121318);\n  text-align: left;\n}\n.prototype-presenter[_ngcontent-%COMP%] {\n  display: grid;\n  width: clamp(3.8rem, 10vw, 6rem);\n  aspect-ratio: 1;\n  place-items: center;\n  border: 2px solid #d6b66e;\n  border-radius: 50%;\n  color: #1d1a17;\n  background: #e4c77e;\n  font: 900 clamp(1.1rem, 3vw, 1.8rem) Georgia, serif;\n}\n.prototype-copy[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n}\n.prototype-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font: 800 clamp(0.9rem, 2vw, 1.15rem) Georgia, serif;\n}\n.prototype-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.prototype-note[_ngcontent-%COMP%] {\n  color: #cec3b4;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.prototype-copy[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n  height: 0.3rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.1411764706);\n}\n.prototype-copy[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background: #dfbd6b;\n  transition: width 1.2s ease;\n}\n.prototype-play[_ngcontent-%COMP%] {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #221c18;\n  background: #f1d58f;\n  font-weight: 900;\n}\n.prototype-video.playing[_ngcontent-%COMP%] {\n  box-shadow: inset 0 0 0 2px #dfbd6b;\n}\n.prototype-note[_ngcontent-%COMP%] {\n  margin: 0;\n  font-style: italic;\n}\n.embed-help[_ngcontent-%COMP%] {\n  color: #cfc3b2;\n  font-size: 0.65rem;\n}\nfooter[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1rem;\n  border-top: 1px solid #bcad90;\n  padding-top: 0.85rem;\n  color: #5e554b;\n  font-size: 0.7rem;\n}\nfooter[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n  margin: 0.3rem 0 0;\n  padding-left: 1.1rem;\n}\nfooter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #244d69;\n}\nfooter[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  justify-items: end;\n  text-align: right;\n}\nfooter[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 0.62rem;\n}\n.thumbnail[_ngcontent-%COMP%] {\n  gap: 0.45rem;\n  height: 100%;\n  min-height: 13rem;\n  padding: 0.65rem;\n}\n.thumbnail[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  border-bottom-width: 0.18rem;\n  padding-bottom: 0.45rem;\n}\n.thumbnail[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 0.45rem;\n}\n.thumbnail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-block: 0.12rem;\n  font-size: clamp(0.88rem, 1.7vw, 1.18rem);\n}\n.thumbnail[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  overflow: hidden;\n  font-size: 0.59rem;\n  line-height: 1.25;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.35rem;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-card[_ngcontent-%COMP%] {\n  display: block;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-portrait[_ngcontent-%COMP%] {\n  min-height: 4.6rem;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-portrait[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-portrait[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] {\n  display: none;\n}\n.thumbnail[_ngcontent-%COMP%]   .object-card[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  padding: 0.3rem;\n}\n.thumbnail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  overflow: hidden;\n  font-size: 0.58rem;\n  text-align: center;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.render-error[_ngcontent-%COMP%] {\n  border: 1px solid #b8594d;\n  padding: 1rem;\n  color: #71261f;\n  background: #ffe2dc;\n}\n@media (max-width: 640px) {\n  footer[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  footer[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    justify-items: start;\n    text-align: left;\n  }\n}\n@media print {\n  .museum-board[_ngcontent-%COMP%] {\n    min-height: 100vh;\n    border: 0;\n    box-shadow: none;\n  }\n}\n@media (max-width: 560px) {\n  .gallery-heading[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n}\n@media print {\n  .embed-frame[_ngcontent-%COMP%], \n   .video-frame[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .immersive-gallery[_ngcontent-%COMP%], \n   .video-presentation[_ngcontent-%COMP%] {\n    color: #221c18;\n    background: #fff;\n  }\n  .gallery-heading[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n   .embed-help[_ngcontent-%COMP%] {\n    color: #221c18;\n  }\n}\n.object-sources[_ngcontent-%COMP%] {\n  border-top: 1px solid #d9cdb5;\n  padding-top: 10px;\n  margin-top: 12px !important;\n}\n.object-sources[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 700;\n  margin-bottom: 5px;\n}\n.object-sources[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.object-sources[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  color: #48605c;\n  font-size: 0.7rem;\n  line-height: 1.6;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=museum-board.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumBoardComponent, [{
    type: Component,
    args: [{ selector: "app-museum-board", imports: [ObjectModelViewerComponent, MuseumRoomPresentationComponent], template: `@if (board?.museumRoom && mode !== 'thumbnail') {
  <app-museum-room-presentation [board]="board!" />
} @else if (board; as board) {
  <article
    class="museum-board"
    [class]="'museum-board ' + mode + ' ' + (board.themeVariant ?? 'ochre')"
    [attr.aria-label]="board.title"
  >
    <header>
      <span>{{ board.teamCredit.displayName }} presents</span>
      <h2>{{ board.title }}</h2>
      <p>{{ board.centralClaim }}</p>
    </header>

    <div class="object-grid">
      @for (object of board.objects; track object.id; let index = $index) {
        <section class="object-card">
          <div class="object-portrait">
            @if (object.model) {
              @if (mode !== 'thumbnail') {
                <app-object-model-viewer [model]="object.model" />
              } @else {
                <span aria-hidden="true">360\xB0</span>
                <small>Rotatable 3D object \xB7 Open wing</small>
              }
            } @else if (object.imageAssetId) {
              <img [src]="object.imageAssetId" [alt]="object.imageAlt ?? ''" />
            } @else {
              <span aria-hidden="true">{{ objectMark(index) }}</span>
              <small aria-hidden="true">Object {{ index + 1 }}</small>
            }
          </div>
          <div>
            <h3>{{ object.title }}</h3>
            @if (mode !== 'thumbnail') {
              <p>{{ object.description }}</p>
              <strong>Why it matters</strong>
              <p>{{ object.evidenceConnection }}</p>
              <p class="object-sources">
                <small>Supporting sources:</small>
                @for (source of board.sources; track source.id) {
                  @if (object.sourceIds.includes(source.id)) {
                    @if (source.url) {
                      <a [href]="source.url" target="_blank" rel="noreferrer">{{
                        source.citation
                      }}</a>
                    } @else {
                      <span>{{ source.citation }}</span>
                    }
                  }
                }
              </p>
            }
          </div>
        </section>
      }
    </div>

    @if (mode === 'thumbnail' && board.immersiveGallery) {
      <div class="immersive-badge"><span aria-hidden="true">360\xB0</span> Includes a 3D gallery</div>
    }
    @if (mode === 'thumbnail' && board.videoPresentation) {
      <div class="immersive-badge"><span aria-hidden="true">\u25B6</span> Includes a curator video</div>
    }

    @if (mode !== 'thumbnail' && galleryEmbedUrl; as embedUrl) {
      <section class="immersive-gallery" aria-labelledby="immersive-gallery-title">
        <div class="gallery-heading">
          <div>
            <span>Final interactive exhibit</span>
            <h3 id="immersive-gallery-title">{{ board.immersiveGallery?.title }}</h3>
          </div>
          <a [href]="galleryUrl" target="_blank" rel="noopener noreferrer">
            Open full screen <span aria-hidden="true">\u2197</span>
          </a>
        </div>
        <div class="embed-frame">
          <iframe
            [src]="embedUrl"
            [title]="board.immersiveGallery?.title ?? 'MetaSteps immersive gallery'"
            loading="lazy"
            allow="fullscreen; autoplay; accelerometer; gyroscope; xr-spatial-tracking"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
            allowfullscreen
          ></iframe>
        </div>
        <p class="embed-help">
          Click inside the gallery to explore. Keyboard and motion controls are provided by
          MetaSteps.
        </p>
      </section>
    }

    @if (mode !== 'thumbnail' && board.videoPresentation; as presentation) {
      <section class="video-presentation" aria-labelledby="video-presentation-title">
        <div class="gallery-heading">
          <div>
            <span>{{
              presentation.prototype ? 'Prototype video station' : 'Student curator presentation'
            }}</span>
            <h3 id="video-presentation-title">{{ presentation.title }}</h3>
          </div>
          @if (presentationVideo?.normalizedUrl; as videoUrl) {
            <a [href]="videoUrl" target="_blank" rel="noopener noreferrer">
              Open video <span aria-hidden="true">\u2197</span>
            </a>
          }
        </div>
        @if (presentation.prototype) {
          <button
            type="button"
            class="prototype-video"
            [class.playing]="prototypePlaying()"
            (click)="togglePrototypeVideo()"
            [attr.aria-pressed]="prototypePlaying()"
          >
            <span class="prototype-presenter" aria-hidden="true">NC</span>
            <span class="prototype-copy">
              <strong>{{ presentation.presenterLabel ?? board.teamCredit.displayName }}</strong>
              <small>
                @if (prototypePlaying()) {
                  Playing sample curator explanation\u2026
                } @else {
                  Select play to preview the student presentation station
                }
              </small>
              <i><b [style.width.%]="prototypePlaying() ? 42 : 0"></b></i>
            </span>
            <span class="prototype-play" aria-hidden="true">{{
              prototypePlaying() ? '\u2161' : '\u25B6'
            }}</span>
          </button>
          <p class="prototype-note">
            Prototype: the finished version plays the student or group\u2019s recorded artifact tour
            here.
          </p>
        } @else if (presentationVideo; as video) {
          <div class="video-frame">
            @if (video.kind === 'embedded' && presentationEmbedUrl; as embedUrl) {
              <iframe
                [src]="embedUrl"
                [title]="presentation.title"
                loading="lazy"
                allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allowfullscreen
              ></iframe>
            } @else if (video.kind === 'direct' && video.normalizedUrl) {
              <video controls preload="metadata" [src]="video.normalizedUrl">
                Your browser cannot play this presentation video.
              </video>
            }
          </div>
          <p class="embed-help">Watch the curator explanation before posting a question card.</p>
        }
      </section>
    }

    @if (mode !== 'thumbnail') {
      <footer>
        <div>
          <strong>Sources</strong>
          <ol>
            @for (source of board.sources; track source.id) {
              <li>
                @if (source.url) {
                  <a [href]="source.url" target="_blank" rel="noreferrer">{{ source.citation }}</a>
                } @else {
                  {{ source.citation }}
                }
              </li>
            }
          </ol>
        </div>
        <p>
          Curated by <strong>{{ board.teamCredit.displayName }}</strong>
          @if (board.teamCredit.memberDisplayNames?.length) {
            <span>{{ board.teamCredit.memberDisplayNames.join(' \xB7 ') }}</span>
          }
        </p>
      </footer>
    }
  </article>
} @else {
  <div class="render-error" role="alert">
    This snapshot cannot be displayed by the museum-board renderer.
  </div>
}
`, styles: ['/* src/app/templates/exhibit-hall/ui/museum-board.component.scss */\n:host {\n  display: block;\n  min-width: 0;\n}\n:host,\n:host * {\n  box-sizing: border-box;\n}\n.museum-board {\n  --ink: #221c18;\n  --accent: #a56a2c;\n  --accent-soft: #e8c78d;\n  display: grid;\n  gap: clamp(0.75rem, 2vw, 1.25rem);\n  min-width: 0;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.8rem, 2.4vw, 1.55rem);\n  color: var(--ink);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0.031372549) 1px,\n      transparent 1px) 0 0/18px 18px,\n    #f4eddd;\n  box-shadow: inset 0 0 3rem rgba(128, 101, 51, 0.1019607843);\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    sans-serif;\n}\n.museum-board.indigo {\n  --accent: #53638e;\n  --accent-soft: #c7cfea;\n}\n.museum-board.sage {\n  --accent: #55745e;\n  --accent-soft: #c5d6bd;\n}\n.museum-board.rose {\n  --accent: #8a514f;\n  --accent-soft: #e2c1b9;\n}\nheader {\n  border-bottom: 0.28rem solid var(--accent);\n  padding-bottom: 0.8rem;\n  text-align: center;\n}\nheader > span {\n  color: var(--accent);\n  font-size: 0.62rem;\n  font-weight: 900;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n}\nh2,\nh3,\np {\n  margin: 0;\n}\nh2 {\n  margin: 0.22rem 0 0.45rem;\n  font: 800 clamp(1.25rem, 3vw, 2.35rem)/1.02 Georgia, serif;\n  letter-spacing: -0.025em;\n}\nheader p {\n  max-width: 52rem;\n  margin-inline: auto;\n  color: #4f463d;\n  font: italic 1rem/1.45 Georgia, serif;\n}\n.object-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));\n  align-items: stretch;\n  gap: 0.75rem;\n}\n.object-card {\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: hidden;\n  border: 1px solid #c6b99e;\n  background: #fffdf6;\n  box-shadow: 0 0.3rem 0.8rem rgba(75, 59, 36, 0.1254901961);\n}\n.object-portrait {\n  position: relative;\n  display: grid;\n  min-height: 8rem;\n  place-items: center;\n  overflow: hidden;\n  color: #fff9e7;\n  background:\n    radial-gradient(\n      circle at 50% 40%,\n      color-mix(in srgb, var(--accent-soft) 72%, white),\n      transparent 38%),\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--accent) 88%, #29221c),\n      #29221c);\n}\n.object-portrait::after {\n  pointer-events: none;\n  position: absolute;\n  inset: 0.5rem;\n  border: 1px solid rgba(255, 245, 199, 0.3882352941);\n  content: "";\n}\n.object-portrait > span {\n  z-index: 1;\n  font: 700 3.3rem Georgia, serif;\n  text-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.5333333333);\n}\n.object-portrait > small {\n  position: absolute;\n  z-index: 1;\n  bottom: 0.8rem;\n  font-size: 0.5rem;\n  font-weight: 900;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n}\n.object-portrait img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.object-card > div:last-child {\n  display: grid;\n  align-content: start;\n  gap: 0.42rem;\n  padding: 0.72rem;\n}\nh3 {\n  color: var(--accent);\n  font: 800 1rem Georgia, serif;\n}\n.object-card p {\n  color: #4e4942;\n  font-size: 0.77rem;\n  line-height: 1.45;\n}\n.object-card strong {\n  margin-top: 0.2rem;\n  color: var(--accent);\n  font-size: 0.57rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.immersive-badge {\n  justify-self: center;\n  border: 1px solid color-mix(in srgb, var(--accent) 65%, white);\n  border-radius: 999px;\n  padding: 0.35rem 0.65rem;\n  color: var(--accent);\n  background: #fffdf6;\n  font-size: 0.62rem;\n  font-weight: 850;\n  letter-spacing: 0.04em;\n}\n.immersive-badge span {\n  margin-right: 0.25rem;\n  font-weight: 950;\n}\n.immersive-gallery {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.6rem, 2vw, 0.9rem);\n  background: #221f1c;\n  box-shadow: 0 0.5rem 1.1rem rgba(43, 33, 23, 0.2392156863);\n}\n.video-presentation {\n  display: grid;\n  gap: 0.55rem;\n  border: 1px solid #aa9a7b;\n  padding: clamp(0.6rem, 2vw, 0.9rem);\n  background: #221f1c;\n  box-shadow: 0 0.5rem 1.1rem rgba(43, 33, 23, 0.2392156863);\n}\n.gallery-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  color: #fff7e8;\n}\n.gallery-heading > div {\n  display: grid;\n  gap: 0.1rem;\n}\n.gallery-heading span {\n  color: #d9b567;\n  font-size: 0.56rem;\n  font-weight: 900;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.gallery-heading h3 {\n  color: #fff7e8;\n  font-size: clamp(1rem, 2vw, 1.35rem);\n}\n.gallery-heading a {\n  color: #f0d28e;\n  font-size: 0.68rem;\n  font-weight: 800;\n}\n.embed-frame {\n  overflow: hidden;\n  border: 1px solid #7c6b50;\n  background: #0e0f12;\n  aspect-ratio: 7/5;\n}\n.embed-frame iframe {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.video-frame {\n  overflow: hidden;\n  border: 1px solid #7c6b50;\n  background: #0e0f12;\n  aspect-ratio: 16/9;\n}\n.video-frame iframe,\n.video-frame video {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.prototype-video {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: clamp(0.65rem, 2vw, 1rem);\n  align-items: center;\n  width: 100%;\n  min-height: 9rem;\n  border: 1px solid #7c6b50;\n  padding: clamp(0.8rem, 3vw, 1.4rem);\n  color: #fff7e8;\n  background:\n    radial-gradient(\n      circle at 82% 25%,\n      rgba(181, 140, 71, 0.3215686275),\n      transparent 28%),\n    linear-gradient(\n      135deg,\n      #33303a,\n      #121318);\n  text-align: left;\n}\n.prototype-presenter {\n  display: grid;\n  width: clamp(3.8rem, 10vw, 6rem);\n  aspect-ratio: 1;\n  place-items: center;\n  border: 2px solid #d6b66e;\n  border-radius: 50%;\n  color: #1d1a17;\n  background: #e4c77e;\n  font: 900 clamp(1.1rem, 3vw, 1.8rem) Georgia, serif;\n}\n.prototype-copy {\n  display: grid;\n  gap: 0.35rem;\n}\n.prototype-copy strong {\n  font: 800 clamp(0.9rem, 2vw, 1.15rem) Georgia, serif;\n}\n.prototype-copy small,\n.prototype-note {\n  color: #cec3b4;\n  font-size: 0.68rem;\n  line-height: 1.4;\n}\n.prototype-copy i {\n  display: block;\n  overflow: hidden;\n  height: 0.3rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.1411764706);\n}\n.prototype-copy b {\n  display: block;\n  height: 100%;\n  background: #dfbd6b;\n  transition: width 1.2s ease;\n}\n.prototype-play {\n  display: grid;\n  width: 2.7rem;\n  aspect-ratio: 1;\n  place-items: center;\n  border-radius: 50%;\n  color: #221c18;\n  background: #f1d58f;\n  font-weight: 900;\n}\n.prototype-video.playing {\n  box-shadow: inset 0 0 0 2px #dfbd6b;\n}\n.prototype-note {\n  margin: 0;\n  font-style: italic;\n}\n.embed-help {\n  color: #cfc3b2;\n  font-size: 0.65rem;\n}\nfooter {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1rem;\n  border-top: 1px solid #bcad90;\n  padding-top: 0.85rem;\n  color: #5e554b;\n  font-size: 0.7rem;\n}\nfooter ol {\n  display: grid;\n  gap: 0.2rem;\n  margin: 0.3rem 0 0;\n  padding-left: 1.1rem;\n}\nfooter a {\n  color: #244d69;\n}\nfooter > p {\n  display: grid;\n  align-content: start;\n  justify-items: end;\n  text-align: right;\n}\nfooter > p span {\n  margin-top: 0.2rem;\n  font-size: 0.62rem;\n}\n.thumbnail {\n  gap: 0.45rem;\n  height: 100%;\n  min-height: 13rem;\n  padding: 0.65rem;\n}\n.thumbnail header {\n  border-bottom-width: 0.18rem;\n  padding-bottom: 0.45rem;\n}\n.thumbnail header > span {\n  font-size: 0.45rem;\n}\n.thumbnail h2 {\n  margin-block: 0.12rem;\n  font-size: clamp(0.88rem, 1.7vw, 1.18rem);\n}\n.thumbnail header p {\n  display: -webkit-box;\n  overflow: hidden;\n  font-size: 0.59rem;\n  line-height: 1.25;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.thumbnail .object-grid {\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.35rem;\n}\n.thumbnail .object-card {\n  display: block;\n}\n.thumbnail .object-portrait {\n  min-height: 4.6rem;\n}\n.thumbnail .object-portrait > span {\n  font-size: 1.6rem;\n}\n.thumbnail .object-portrait > small {\n  display: none;\n}\n.thumbnail .object-card > div:last-child {\n  padding: 0.3rem;\n}\n.thumbnail h3 {\n  overflow: hidden;\n  font-size: 0.58rem;\n  text-align: center;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.render-error {\n  border: 1px solid #b8594d;\n  padding: 1rem;\n  color: #71261f;\n  background: #ffe2dc;\n}\n@media (max-width: 640px) {\n  footer {\n    grid-template-columns: 1fr;\n  }\n  footer > p {\n    justify-items: start;\n    text-align: left;\n  }\n}\n@media print {\n  .museum-board {\n    min-height: 100vh;\n    border: 0;\n    box-shadow: none;\n  }\n}\n@media (max-width: 560px) {\n  .gallery-heading {\n    align-items: start;\n    flex-direction: column;\n  }\n}\n@media print {\n  .embed-frame,\n  .video-frame {\n    display: none;\n  }\n  .immersive-gallery,\n  .video-presentation {\n    color: #221c18;\n    background: #fff;\n  }\n  .gallery-heading h3,\n  .embed-help {\n    color: #221c18;\n  }\n}\n.object-sources {\n  border-top: 1px solid #d9cdb5;\n  padding-top: 10px;\n  margin-top: 12px !important;\n}\n.object-sources small {\n  display: block;\n  font-weight: 700;\n  margin-bottom: 5px;\n}\n.object-sources a,\n.object-sources span {\n  display: block;\n  color: #48605c;\n  font-size: 0.7rem;\n  line-height: 1.6;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=museum-board.component.css.map */\n'] }]
  }], null, { data: [{
    type: Input,
    args: [{ required: true }]
  }], mode: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MuseumBoardComponent, { className: "MuseumBoardComponent", filePath: "src/app/templates/exhibit-hall/ui/museum-board.component.ts", lineNumber: 21 });
})();

export {
  MuseumBoardComponent
};
//# debugId=64b35976-0cb7-56db-92c6-45b456e7c7ec
//# sourceMappingURL=chunk-EJZFN5UH.js.map
