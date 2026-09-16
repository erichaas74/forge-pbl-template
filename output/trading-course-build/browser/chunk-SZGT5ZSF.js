import {
  DEBATE_EXCHANGE_PORT,
  DebateExchangeRuntime,
  debateCriteria
} from "./chunk-DBNLA5YS.js";
import "./chunk-GNKRFT3D.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UW6DFD2Z.js";
import "./chunk-3C62DQOL.js";
import "./chunk-OXVZ3VYX.js";
import "./chunk-ENCFJY7U.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  Output,
  computed,
  effect,
  inject,
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
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
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
  ɵɵtextInterpolate3
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/debate-studio/exchange/debate-recording.component.ts
function DebateRecordingComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function DebateRecordingComponent_Conditional_0_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.stop());
    });
    \u0275\u0275text(1, "Stop recording");
    \u0275\u0275domElementEnd();
  }
}
function DebateRecordingComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "button", 2);
    \u0275\u0275domListener("click", function DebateRecordingComponent_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.record());
    });
    \u0275\u0275text(2, "Record audio");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, DebateRecordingComponent_Conditional_0_Conditional_3_Template, 2, 0, "button", 3);
    \u0275\u0275domElementStart(4, "label");
    \u0275\u0275text(5, "Attach audio or video");
    \u0275\u0275domElementStart(6, "input", 4);
    \u0275\u0275domListener("change", function DebateRecordingComponent_Conditional_0_Template_input_change_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.upload($event));
    });
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r1.capturing() || ctx_r1.busy());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.capturing() ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.capturing() || ctx_r1.busy());
  }
}
function DebateRecordingComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "video", 8);
    \u0275\u0275domListener("ended", function DebateRecordingComponent_Conditional_1_Conditional_0_Template_video_ended_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.played.set(true));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", source_r5, \u0275\u0275sanitizeUrl);
  }
}
function DebateRecordingComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "audio", 9);
    \u0275\u0275domListener("ended", function DebateRecordingComponent_Conditional_1_Conditional_1_Template_audio_ended_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.played.set(true));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const source_r5 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", source_r5);
  }
}
function DebateRecordingComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 2);
    \u0275\u0275domListener("click", function DebateRecordingComponent_Conditional_1_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.review());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 5);
    \u0275\u0275domListener("click", function DebateRecordingComponent_Conditional_1_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove());
    });
    \u0275\u0275text(3, "Remove / retake");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "small");
    \u0275\u0275text(5, "Play to the end, then confirm your review. Keep a transcript for readers.");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("disabled", !ctx_r1.played() || ctx_r1.reviewed());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.reviewed() ? "Recording reviewed" : "I reviewed this recording");
  }
}
function DebateRecordingComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateRecordingComponent_Conditional_1_Conditional_0_Template, 1, 1, "video", 6)(1, DebateRecordingComponent_Conditional_1_Conditional_1_Template, 1, 1, "audio", 7);
    \u0275\u0275conditionalCreate(2, DebateRecordingComponent_Conditional_1_Conditional_2_Template, 6, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.video() ? 0 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editable() ? 2 : -1);
  }
}
var DebateRecordingComponent = class _DebateRecordingComponent {
  mediaId = input(
    ...ngDevMode ? [void 0, { debugName: "mediaId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editable = input(
    false,
    ...ngDevMode ? [{ debugName: "editable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reviewed = input(
    false,
    ...ngDevMode ? [{ debugName: "reviewed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  changed = output();
  port = inject(DEBATE_EXCHANGE_PORT);
  recorder;
  stream;
  disposed = false;
  url = signal(
    "",
    ...ngDevMode ? [{ debugName: "url" }] : (
      /* istanbul ignore next */
      []
    )
  );
  video = signal(
    false,
    ...ngDevMode ? [{ debugName: "video" }] : (
      /* istanbul ignore next */
      []
    )
  );
  played = signal(
    false,
    ...ngDevMode ? [{ debugName: "played" }] : (
      /* istanbul ignore next */
      []
    )
  );
  capturing = signal(
    false,
    ...ngDevMode ? [{ debugName: "capturing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  status = signal(
    "",
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect((onCleanup) => {
      const id = this.mediaId();
      let active = true;
      this.clearUrl();
      this.played.set(false);
      this.status.set("");
      if (id)
        void this.port.loadMedia(id).then((blob) => {
          if (!active)
            return;
          if (blob) {
            this.url.set(URL.createObjectURL(blob));
            this.video.set(blob.type.startsWith("video/"));
          } else
            this.status.set("Recording is on the author\u2019s browser. Use the transcript here.");
        }).catch(() => {
          if (active)
            this.status.set("Recording unavailable. Use the transcript.");
        });
      onCleanup(() => {
        active = false;
        this.clearUrl();
      });
    });
    inject(DestroyRef).onDestroy(() => {
      this.disposed = true;
      this.stop();
      this.clearUrl();
    });
  }
  clearUrl() {
    const url = untracked(this.url);
    if (url)
      URL.revokeObjectURL(url);
    this.url.set("");
  }
  async record() {
    this.busy.set(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined")
        throw new Error("Recording is unavailable in this browser. Attach an audio or video file.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.disposed) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      const recorder = new MediaRecorder(stream);
      this.recorder = recorder;
      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size)
          chunks.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        this.capturing.set(false);
        if (!this.disposed && chunks.length)
          void this.save(new Blob(chunks, { type: recorder.mimeType }));
      };
      recorder.onerror = () => {
        this.status.set("Recording failed. Try again or attach a file.");
        this.stop();
      };
      recorder.start();
      this.capturing.set(true);
      this.status.set("Recording\u2026");
    } catch (error) {
      this.stream?.getTracks().forEach((track) => track.stop());
      this.status.set(error instanceof Error ? error.message : "Microphone unavailable.");
    } finally {
      this.busy.set(false);
    }
  }
  stop() {
    if (this.recorder?.state === "recording")
      this.recorder.stop();
    this.stream?.getTracks().forEach((track) => track.stop());
  }
  async upload(event) {
    const input2 = event.target;
    const file = input2.files?.[0];
    if (file)
      await this.save(file);
    input2.value = "";
  }
  async save(blob) {
    this.busy.set(true);
    try {
      if (!/^(audio|video)\//.test(blob.type) || blob.size === 0 || blob.size > 4e7)
        throw new Error("Choose a playable audio or video file under 40 MB.");
      const id = await this.port.saveMedia(blob);
      if (this.disposed)
        return;
      this.played.set(false);
      this.changed.emit({ mediaId: id, mediaType: blob.type, mediaReviewed: false });
      this.status.set("Saved locally. Play and review this take.");
    } catch (error) {
      this.status.set(error instanceof Error ? error.message : "Recording could not be saved.");
    } finally {
      this.busy.set(false);
    }
  }
  review() {
    if (this.played())
      this.changed.emit({ mediaId: this.mediaId(), mediaReviewed: true });
  }
  remove() {
    this.changed.emit({ mediaId: void 0, mediaType: void 0, mediaReviewed: false });
  }
  static \u0275fac = function DebateRecordingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateRecordingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateRecordingComponent, selectors: [["app-debate-recording"]], inputs: { mediaId: [1, "mediaId"], editable: [1, "editable"], reviewed: [1, "reviewed"] }, outputs: { changed: "changed" }, decls: 4, vars: 3, consts: [[1, "controls"], ["role", "status"], ["type", "button", 3, "click", "disabled"], ["type", "button"], ["type", "file", "accept", "audio/*,video/*", 3, "change", "disabled"], ["type", "button", 3, "click"], ["controls", "", "playsinline", "", "aria-label", "Debate recording playback", 3, "src"], ["controls", "", "aria-label", "Debate recording playback", 3, "src"], ["controls", "", "playsinline", "", "aria-label", "Debate recording playback", 3, "ended", "src"], ["controls", "", "aria-label", "Debate recording playback", 3, "ended", "src"]], template: function DebateRecordingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DebateRecordingComponent_Conditional_0_Template, 7, 3, "div", 0);
      \u0275\u0275conditionalCreate(1, DebateRecordingComponent_Conditional_1_Template, 3, 2);
      \u0275\u0275domElementStart(2, "p", 1);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275conditional(ctx.editable() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_1_0 = ctx.url()) ? 1 : -1, tmp_1_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.status());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%] {\n  font: inherit;\n  max-width: 100%;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  cursor: pointer;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\naudio[_ngcontent-%COMP%], \nvideo[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-height: 300px;\n  margin: 12px 0;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  margin: 8px 0;\n}\np[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n/*# sourceMappingURL=debate-recording.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateRecordingComponent, [{
    type: Component,
    args: [{ selector: "app-debate-recording", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (editable()) {
      <div class="controls">
        <button type="button" (click)="record()" [disabled]="capturing() || busy()">Record audio</button>
        @if (capturing()) { <button type="button" (click)="stop()">Stop recording</button> }
        <label>Attach audio or video<input type="file" accept="audio/*,video/*" (change)="upload($event)" [disabled]="capturing() || busy()" /></label>
      </div>
    }
    @if (url(); as source) {
      @if (video()) { <video controls playsinline [src]="source" (ended)="played.set(true)" aria-label="Debate recording playback"></video> }
      @else { <audio controls [src]="source" (ended)="played.set(true)" aria-label="Debate recording playback"></audio> }
      @if (editable()) {
        <button type="button" [disabled]="!played() || reviewed()" (click)="review()">{{ reviewed() ? 'Recording reviewed' : 'I reviewed this recording' }}</button>
        <button type="button" (click)="remove()">Remove / retake</button>
        <small>Play to the end, then confirm your review. Keep a transcript for readers.</small>
      }
    }
    <p role="status">{{ status() }}</p>
  `, styles: ["/* angular:styles/component:scss;d94d3ced3490b7db395699a1711ac072a10b41198a40b51cf4630a8ecde24af7;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/debate-studio/exchange/debate-recording.component.ts */\n:host {\n  display: block;\n}\n.controls {\n  display: grid;\n  gap: 8px;\n}\nbutton,\ninput {\n  font: inherit;\n  max-width: 100%;\n}\nbutton {\n  padding: 8px 12px;\n  cursor: pointer;\n}\nlabel {\n  display: grid;\n  gap: 5px;\n}\naudio,\nvideo {\n  display: block;\n  width: 100%;\n  max-height: 300px;\n  margin: 12px 0;\n}\nsmall {\n  display: block;\n  margin: 8px 0;\n}\np:empty {\n  display: none;\n}\n/*# sourceMappingURL=debate-recording.component.css.map */\n"] }]
  }], () => [], { mediaId: [{ type: Input, args: [{ isSignal: true, alias: "mediaId", required: false }] }], editable: [{ type: Input, args: [{ isSignal: true, alias: "editable", required: false }] }], reviewed: [{ type: Input, args: [{ isSignal: true, alias: "reviewed", required: false }] }], changed: [{ type: Output, args: ["changed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateRecordingComponent, { className: "DebateRecordingComponent", filePath: "src/app/templates/debate-studio/exchange/debate-recording.component.ts", lineNumber: 28 });
})();

// src/app/templates/debate-studio/exchange/debate-author.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DebateAuthorComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 7);
    \u0275\u0275listener("click", function DebateAuthorComponent_For_9_Template_button_click_2_listener() {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removePoint($index_r2));
    });
    \u0275\u0275text(3, "Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r4 = ctx.$implicit;
    const $index_r2 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", point_r4, " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Remove point " + ($index_r2 + 1));
  }
}
function DebateAuthorComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 3)(1, "input", 8);
    \u0275\u0275listener("change", function DebateAuthorComponent_For_17_Template_input_change_1_listener() {
      const source_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.toggleSource(source_r6.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const source_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.runtime.draft().evidenceIds.includes(source_r6.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(source_r6.title);
  }
}
function DebateAuthorComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "Group name (leave empty for individual exchange)");
    \u0275\u0275elementStart(2, "input", 9);
    \u0275\u0275listener("ngModelChange", function DebateAuthorComponent_Conditional_18_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ group: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4, "Each performer submits their own contribution, even when working in a group.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.runtime.draft().group);
    \u0275\u0275control();
  }
}
function DebateAuthorComponent_Conditional_19_For_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 3)(1, "input", 8);
    \u0275\u0275listener("change", function DebateAuthorComponent_Conditional_19_For_7_Conditional_0_Template_input_change_1_listener() {
      \u0275\u0275restoreView(_r9);
      const review_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleFeedback(review_r10.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const review_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.runtime.draft().reviewIds.includes(review_r10.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", review_r10.name, ": ", review_r10.suggestion);
  }
}
function DebateAuthorComponent_Conditional_19_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DebateAuthorComponent_Conditional_19_For_7_Conditional_0_Template, 3, 3, "label", 3);
  }
  if (rf & 2) {
    const review_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(review_r10.contributionId === ctx_r2.runtime.draft().revises ? 0 : -1);
  }
}
function DebateAuthorComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, "What changed and why?");
    \u0275\u0275elementStart(2, "textarea", 10);
    \u0275\u0275listener("ngModelChange", function DebateAuthorComponent_Conditional_19_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.runtime.updateDraft({ changeNote: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "fieldset")(4, "legend");
    \u0275\u0275text(5, "Feedback used in this revision");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, DebateAuthorComponent_Conditional_19_For_7_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.runtime.draft().changeNote);
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.runtime.received());
  }
}
var DebateAuthorComponent = class _DebateAuthorComponent {
  runtime = inject(DebateExchangeRuntime);
  submitted = output();
  point = signal(
    "",
    ...ngDevMode ? [{ debugName: "point" }] : (
      /* istanbul ignore next */
      []
    )
  );
  addPoint() {
    if (this.point().trim()) {
      this.runtime.updateDraft({ points: [...this.runtime.draft().points, this.point().trim()] });
      this.point.set("");
    }
  }
  removePoint(index) {
    this.runtime.updateDraft({ points: this.runtime.draft().points.filter((_, at) => at !== index) });
  }
  toggleFeedback(id) {
    const ids = this.runtime.draft().reviewIds;
    this.runtime.updateDraft({ reviewIds: ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id] });
  }
  submit() {
    if (this.runtime.submit())
      this.submitted.emit();
  }
  static \u0275fac = function DebateAuthorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateAuthorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateAuthorComponent, selectors: [["app-debate-author"]], outputs: { submitted: "submitted" }, decls: 28, vars: 12, consts: [["maxlength", "600", 3, "ngModelChange", "ngModel"], ["type", "button", 3, "click", "disabled"], ["rows", "8", "maxlength", "12000", 3, "ngModelChange", "ngModel"], [1, "check"], [3, "changed", "editable", "mediaId", "reviewed"], ["role", "status"], ["type", "button", 1, "primary", 3, "click"], ["type", "button", 3, "click"], ["type", "checkbox", 3, "change", "checked"], ["maxlength", "100", 3, "ngModelChange", "ngModel"], ["rows", "3", "maxlength", "2000", 3, "ngModelChange", "ngModel"]], template: function DebateAuthorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "label");
      \u0275\u0275text(3, "Debate point");
      \u0275\u0275elementStart(4, "input", 0);
      \u0275\u0275listener("ngModelChange", function DebateAuthorComponent_Template_input_ngModelChange_4_listener($event) {
        return ctx.point.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 1);
      \u0275\u0275listener("click", function DebateAuthorComponent_Template_button_click_5_listener() {
        return ctx.addPoint();
      });
      \u0275\u0275text(6, "Add point");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "ol");
      \u0275\u0275repeaterCreate(8, DebateAuthorComponent_For_9_Template, 4, 2, "li", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "label");
      \u0275\u0275text(11, "Speech / transcript");
      \u0275\u0275elementStart(12, "textarea", 2);
      \u0275\u0275listener("ngModelChange", function DebateAuthorComponent_Template_textarea_ngModelChange_12_listener($event) {
        return ctx.runtime.updateDraft({ speech: $event });
      });
      \u0275\u0275elementEnd();
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "fieldset")(14, "legend");
      \u0275\u0275text(15, "Sources used");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(16, DebateAuthorComponent_For_17_Template, 3, 2, "label", 3, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, DebateAuthorComponent_Conditional_18_Template, 5, 1);
      \u0275\u0275conditionalCreate(19, DebateAuthorComponent_Conditional_19_Template, 8, 1);
      \u0275\u0275elementStart(20, "details")(21, "summary");
      \u0275\u0275text(22, "Record or attach a performance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-debate-recording", 4);
      \u0275\u0275listener("changed", function DebateAuthorComponent_Template_app_debate_recording_changed_23_listener($event) {
        return ctx.runtime.updateDraft($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "p", 5);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 6);
      \u0275\u0275listener("click", function DebateAuthorComponent_Template_button_click_26_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate2("Manual authoring \xB7 Session ", ctx.runtime.lesson().number, " \xB7 ", ctx.runtime.lesson().product);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.point());
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.point().trim());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.runtime.draft().points);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.runtime.draft().speech);
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.runtime.config.evidence);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.runtime.lesson().number % 2 === 0 ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.runtime.draft().revises ? 19 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("editable", true)("mediaId", ctx.runtime.draft().mediaId)("reviewed", !!ctx.runtime.draft().mediaReviewed);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.message());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Submit ", ctx.runtime.lesson().mode === "refine" ? "revision" : "argument");
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, DebateRecordingComponent], styles: ["\n[_nghost-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  font-weight: 600;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  font: inherit;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  border: 1px solid #91a49f;\n  border-radius: 6px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  cursor: pointer;\n}\n.check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  font-weight: 400;\n  margin: 8px 0;\n}\n.check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: auto;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 1px solid #b2c0ba;\n  border-radius: 6px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #20574e;\n  color: white;\n  border: 0;\n}\nsmall[_ngcontent-%COMP%] {\n  color: #425751;\n}\nli[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\np[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n/*# sourceMappingURL=debate-author.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateAuthorComponent, [{
    type: Component,
    args: [{ selector: "app-debate-author", imports: [FormsModule, DebateRecordingComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <p>Manual authoring \xB7 Session {{ runtime.lesson().number }} \xB7 {{ runtime.lesson().product }}</p>
    <label>Debate point<input maxlength="600" [ngModel]="point()" (ngModelChange)="point.set($event)" /></label>
    <button type="button" (click)="addPoint()" [disabled]="!point().trim()">Add point</button>
    <ol>@for (point of runtime.draft().points; track $index) {
      <li>{{ point }} <button type="button" [attr.aria-label]="'Remove point ' + ($index + 1)" (click)="removePoint($index)">Remove</button></li>
    }</ol>
    <label>Speech / transcript<textarea rows="8" maxlength="12000" [ngModel]="runtime.draft().speech" (ngModelChange)="runtime.updateDraft({speech: $event})"></textarea></label>
    <fieldset><legend>Sources used</legend>@for (source of runtime.config.evidence; track source.id) {
      <label class="check"><input type="checkbox" [checked]="runtime.draft().evidenceIds.includes(source.id)" (change)="runtime.toggleSource(source.id)" />{{ source.title }}</label>
    }</fieldset>
    @if (runtime.lesson().number % 2 === 0) {
      <label>Group name (leave empty for individual exchange)<input maxlength="100" [ngModel]="runtime.draft().group" (ngModelChange)="runtime.updateDraft({group: $event})" /></label>
      <small>Each performer submits their own contribution, even when working in a group.</small>
    }
    @if (runtime.draft().revises) {
      <label>What changed and why?<textarea rows="3" maxlength="2000" [ngModel]="runtime.draft().changeNote" (ngModelChange)="runtime.updateDraft({changeNote: $event})"></textarea></label>
      <fieldset><legend>Feedback used in this revision</legend>
        @for (review of runtime.received(); track review.id) {
          @if (review.contributionId === runtime.draft().revises) {
            <label class="check"><input type="checkbox" [checked]="runtime.draft().reviewIds.includes(review.id)" (change)="toggleFeedback(review.id)" />{{ review.name }}: {{ review.suggestion }}</label>
          }
        }
      </fieldset>
    }
    <details><summary>Record or attach a performance</summary>
      <app-debate-recording [editable]="true" [mediaId]="runtime.draft().mediaId" [reviewed]="!!runtime.draft().mediaReviewed" (changed)="runtime.updateDraft($event)" />
    </details>
    <p role="status">{{ runtime.message() }}</p>
    <button class="primary" type="button" (click)="submit()">Submit {{ runtime.lesson().mode === 'refine' ? 'revision' : 'argument' }}</button>
  `, styles: ["/* angular:styles/component:scss;18c7412a052965d976facd09d5f97c0028a010c365fc7a3ddb15401a6f73a510;C:/Users/erich/Desktop/pbl-lms/forge-pbl-template/src/app/templates/debate-studio/exchange/debate-author.component.ts */\n:host {\n  display: grid;\n  gap: 12px;\n}\nlabel {\n  display: grid;\n  gap: 6px;\n  font-weight: 600;\n}\ninput,\ntextarea,\nbutton {\n  font: inherit;\n}\ninput,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  border: 1px solid #91a49f;\n  border-radius: 6px;\n}\nbutton {\n  padding: 9px 14px;\n  cursor: pointer;\n}\n.check {\n  display: flex;\n  align-items: baseline;\n  font-weight: 400;\n  margin: 8px 0;\n}\n.check input {\n  width: auto;\n}\nfieldset {\n  border: 1px solid #b2c0ba;\n  border-radius: 6px;\n}\n.primary {\n  background: #20574e;\n  color: white;\n  border: 0;\n}\nsmall {\n  color: #425751;\n}\nli {\n  margin: 8px 0;\n}\np:empty {\n  display: none;\n}\n/*# sourceMappingURL=debate-author.component.css.map */\n"] }]
  }], null, { submitted: [{ type: Output, args: ["submitted"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateAuthorComponent, { className: "DebateAuthorComponent", filePath: "src/app/templates/debate-studio/exchange/debate-author.component.ts", lineNumber: 43 });
})();

// src/app/templates/debate-studio/exchange/debate-exchange.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.actorId;
var _forTrack2 = ($index, $item) => $item.performerId;
function DebateExchangeComponent_Conditional_14_For_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_14_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_For_10_Template_button_click_0_listener() {
      const faction_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.chooseSide(faction_r6.id));
    });
    \u0275\u0275elementStart(1, "span", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, DebateExchangeComponent_Conditional_14_For_10_Conditional_8_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const faction_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--%NS%side-accent", faction_r6.accent);
    \u0275\u0275attribute("aria-pressed", ctx_r3.runtime.side() === faction_r6.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faction_r6.emblem);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(faction_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faction_r6.position);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.runtime.side() === faction_r6.id ? 8 : -1);
  }
}
function DebateExchangeComponent_Conditional_14_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 58)(6, "button", 59);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_For_16_Template_button_click_6_listener() {
      const $index_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.movePoint($index_r8, -1));
    });
    \u0275\u0275text(7, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 59);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_For_16_Template_button_click_8_listener() {
      const $index_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.movePoint($index_r8, 1));
    });
    \u0275\u0275text(9, "\u2193");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const point_r9 = ctx.$implicit;
    const $index_r8 = ctx.$index;
    const \u0275$index_65_r10 = ctx.$index;
    const \u0275$count_65_r11 = ctx.$count;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(point_r9);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_65_r10 === 0);
    \u0275\u0275attribute("aria-label", "Move point " + ($index_r8 + 1) + " up");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_65_r10 === \u0275$count_65_r11 - 1);
    \u0275\u0275attribute("aria-label", "Move point " + ($index_r8 + 1) + " down");
  }
}
function DebateExchangeComponent_Conditional_14_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "span", 60);
    \u0275\u0275text(2, "01 \u2192 02 \u2192 03");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Add your first points in the tutor-area editor, then arrange them here.");
    \u0275\u0275elementEnd()();
  }
}
function DebateExchangeComponent_Conditional_14_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.selectedId.set(ctx_r3.runtime.draft().replyTo);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u21B3 Answering ", ctx_r3.author(ctx_r3.runtime.draft().replyTo));
  }
}
function DebateExchangeComponent_Conditional_14_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.selectedId.set(ctx_r3.runtime.draft().revises);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u21BA Revising ", ctx_r3.author(ctx_r3.runtime.draft().revises));
  }
}
function DebateExchangeComponent_Conditional_14_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_For_24_Template_button_click_1_listener() {
      const source_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      const sourcePanel_r16 = \u0275\u0275reference(81);
      return \u0275\u0275resetView(ctx_r3.inspectSource(source_r15.id, sourcePanel_r16));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_For_24_Template_button_click_5_listener() {
      const source_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.runtime.toggleSource(source_r15.id));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const source_r15 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("attached", ctx_r3.runtime.draft().evidenceIds.includes(source_r15.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", source_r15.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(source_r15.sourceType);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", (ctx_r3.runtime.draft().evidenceIds.includes(source_r15.id) ? "Detach " : "Attach ") + source_r15.title)("aria-pressed", ctx_r3.runtime.draft().evidenceIds.includes(source_r15.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.runtime.draft().evidenceIds.includes(source_r15.id) ? "\u2713" : "+");
  }
}
function DebateExchangeComponent_Conditional_14_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 54)(1, "summary");
    \u0275\u0275text(2, "Preview your speech");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.draft().speech);
  }
}
function DebateExchangeComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 12)(1, "div", 44)(2, "span", 45);
    \u0275\u0275text(3, "The question before the room");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_14_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.hearPrompt());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 46);
    \u0275\u0275repeaterCreate(9, DebateExchangeComponent_Conditional_14_For_10_Template, 9, 7, "button", 47, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 48)(12, "section", 49)(13, "h2");
    \u0275\u0275text(14, "Your argument order");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, DebateExchangeComponent_Conditional_14_For_16_Template, 10, 6, "div", 50, \u0275\u0275repeaterTrackByIndex, false, DebateExchangeComponent_Conditional_14_ForEmpty_17_Template, 5, 0, "div", 51);
    \u0275\u0275conditionalCreate(18, DebateExchangeComponent_Conditional_14_Conditional_18_Template, 2, 1, "button", 21);
    \u0275\u0275conditionalCreate(19, DebateExchangeComponent_Conditional_14_Conditional_19_Template, 2, 1, "button", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "section", 52)(21, "h2");
    \u0275\u0275text(22, "Connect evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, DebateExchangeComponent_Conditional_14_For_24_Template, 7, 7, "div", 53, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(25, DebateExchangeComponent_Conditional_14_Conditional_25_Template, 5, 1, "details", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.config.centralQuestion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.reading() ? "Stop prompt" : "Hear prompt");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.config.factions);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.runtime.draft().points);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.runtime.draft().replyTo ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.runtime.draft().revises ? 19 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.config.evidence);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.runtime.draft().speech ? 25 : -1);
  }
}
function DebateExchangeComponent_Conditional_15_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_15_For_5_Template_button_click_0_listener() {
      const performer_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.selectedId.set(performer_r19.id);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275elementStart(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Review \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const performer_r19 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(performer_r19.name.slice(0, 1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(performer_r19.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r3.factionName(performer_r19.side), " \xB7 ", performer_r19.kind);
  }
}
function DebateExchangeComponent_Conditional_15_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No submitted performances yet. Import an exchange or open the practice debate from the side tools.");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_15_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 59);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_15_For_13_Template_button_click_5_listener() {
      const $index_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.moveRank($index_r21, -1));
    });
    \u0275\u0275text(6, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 59);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_15_For_13_Template_button_click_7_listener() {
      const $index_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.moveRank($index_r21, 1));
    });
    \u0275\u0275text(8, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_15_For_13_Template_button_click_9_listener() {
      const judgment_r22 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeRank(judgment_r22.performerId));
    });
    \u0275\u0275text(10, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const judgment_r22 = ctx.$implicit;
    const $index_r21 = ctx.$index;
    const \u0275$index_162_r23 = ctx.$index;
    const \u0275$count_162_r24 = ctx.$count;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r21 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.author(judgment_r22.contributionId));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", \u0275$index_162_r23 === 0);
    \u0275\u0275attribute("aria-label", "Move rank " + ($index_r21 + 1) + " up");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_162_r23 === \u0275$count_162_r24 - 1);
    \u0275\u0275attribute("aria-label", "Move rank " + ($index_r21 + 1) + " down");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Remove " + ctx_r3.author(judgment_r22.contributionId) + " from ranking");
  }
}
function DebateExchangeComponent_Conditional_15_ForEmpty_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Read a performance, then use \u201CJudge performer\u201D to add your reasons.");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_15_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rank_r25 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rank_r25.place);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rank_r25.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", rank_r25.points, " points \xB7 ", rank_r25.ballots, " ballots");
  }
}
function DebateExchangeComponent_Conditional_15_ForEmpty_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Results appear after a ballot is submitted or imported.");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 62)(2, "h2");
    \u0275\u0275text(3, "Review a performer");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DebateExchangeComponent_Conditional_15_For_5_Template, 10, 4, "button", 63, _forTrack1, false, DebateExchangeComponent_Conditional_15_ForEmpty_6_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "section", 64)(8, "h2");
    \u0275\u0275text(9, "Your ranking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 37);
    \u0275\u0275text(11, "Up to three individuals \xB7 both sides");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, DebateExchangeComponent_Conditional_15_For_13_Template, 11, 7, "div", 65, _forTrack2, false, DebateExchangeComponent_Conditional_15_ForEmpty_14_Template, 2, 0, "p");
    \u0275\u0275elementStart(15, "button", 66);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_15_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.rank(ctx_r3.ballot()));
    });
    \u0275\u0275text(16, "Submit ranking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "details")(18, "summary");
    \u0275\u0275text(19, "How rankings work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21, "First gets 3 points, second 2, third 1. Each voter\u2019s latest ballot counts. Equal points share a place. Rankings recognize performances; they do not award standards mastery.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "section", 67)(23, "h2");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(25, DebateExchangeComponent_Conditional_15_For_26_Template, 7, 4, "div", 68, _forTrack02, false, DebateExchangeComponent_Conditional_15_ForEmpty_27_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.runtime.performers());
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r3.ballot());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r3.ballot().length);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.runtime.practice() ? "Practice results" : "Imported classroom results");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.runtime.ranks());
  }
}
function DebateExchangeComponent_Conditional_16_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_For_5_Template_button_click_0_listener() {
      const entry_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectedId.set(entry_r27.id));
    });
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275elementStart(2, "span")(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "b");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r27 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r3.selected()?.id === entry_r27.id);
    \u0275\u0275attribute("aria-current", ctx_r3.selected()?.id === entry_r27.id ? "true" : null);
    \u0275\u0275advance();
    \u0275\u0275classProp("your-side", entry_r27.side === ctx_r3.runtime.side());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("S", entry_r27.lesson, " \xB7 ", entry_r27.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r27.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r27.group || ctx_r3.factionName(entry_r27.side));
  }
}
function DebateExchangeComponent_Conditional_16_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No same-side peer work yet. Exchange files with a classmate or open the separate practice debate.");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.selectedId.set(entry_r29.replyTo);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r29 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u21B3 Response to ", ctx_r3.author(entry_r29.replyTo));
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.selectedId.set(entry_r29.revises);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275text(1, "\u21BA Earlier version");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r31 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(point_r31);
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-debate-recording", 79);
  }
  if (rf & 2) {
    const entry_r29 = \u0275\u0275nextContext();
    \u0275\u0275property("mediaId", entry_r29.mediaId);
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_For_22_Template_button_click_0_listener() {
      const id_r33 = \u0275\u0275restoreView(_r32).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      const sourcePanel_r16 = \u0275\u0275reference(81);
      return \u0275\u0275resetView(ctx_r3.inspectSource(id_r33, sourcePanel_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r33 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2197 ", ctx_r3.sourceName(id_r33));
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 80)(1, "summary");
    \u0275\u0275text(2, "Revision reasoning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r29 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(entry_r29.changeNote);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", entry_r29.reviewIds.length, " peer critiques used");
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.runtime.updateDraft({ replyTo: entry_r29.id });
      return \u0275\u0275resetView(ctx_r3.view.set("case"));
    });
    \u0275\u0275text(1, "Answer this argument");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.runtime.revise(entry_r29);
      return \u0275\u0275resetView(ctx_r3.view.set("case"));
    });
    \u0275\u0275text(1, "Use as revision");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r36);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      const critiquePanel_r37 = \u0275\u0275reference(107);
      return \u0275\u0275resetView(ctx_r3.prepareCritique(entry_r29, critiquePanel_r37));
    });
    \u0275\u0275text(1, "Critique this peer");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r38);
      const entry_r29 = \u0275\u0275nextContext();
      const ctx_r3 = \u0275\u0275nextContext(2);
      const judgmentPanel_r39 = \u0275\u0275reference(115);
      return \u0275\u0275resetView(ctx_r3.prepareJudgment(entry_r29, judgmentPanel_r39));
    });
    \u0275\u0275text(1, "Judge performer");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 83)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "blockquote");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "b");
    \u0275\u0275text(7, "Strength:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p")(10, "b");
    \u0275\u0275text(11, "Try next:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const review_r40 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Peer critique \xB7 ", review_r40.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r40.moment);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", review_r40.strength);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", review_r40.suggestion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("Evidence ", review_r40.ratings.evidence, "/4 \xB7 Reasoning ", review_r40.ratings.reasoning, "/4 \xB7 Response ", review_r40.ratings.response, "/4");
  }
}
function DebateExchangeComponent_Conditional_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 73)(1, "div", 75)(2, "span", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 76);
    \u0275\u0275conditionalCreate(12, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_12_Template, 2, 1, "button", 21);
    \u0275\u0275conditionalCreate(13, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_13_Template, 2, 0, "button", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ol", 77);
    \u0275\u0275repeaterCreate(15, DebateExchangeComponent_Conditional_16_Conditional_7_For_16_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 78);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_19_Template, 1, 1, "app-debate-recording", 79);
    \u0275\u0275elementStart(20, "div", 36);
    \u0275\u0275repeaterCreate(21, DebateExchangeComponent_Conditional_16_Conditional_7_For_22_Template, 2, 1, "button", 21, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_23_Template, 7, 2, "details", 80);
    \u0275\u0275elementStart(24, "div", 81);
    \u0275\u0275conditionalCreate(25, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_25_Template, 2, 0, "button", 82);
    \u0275\u0275conditionalCreate(26, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_26_Template, 2, 0, "button", 21);
    \u0275\u0275conditionalCreate(27, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_27_Template, 2, 0, "button", 82);
    \u0275\u0275conditionalCreate(28, DebateExchangeComponent_Conditional_16_Conditional_7_Conditional_28_Template, 2, 0, "button", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(29, DebateExchangeComponent_Conditional_16_Conditional_7_For_30_Template, 15, 7, "details", 83, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r29 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r29.name.slice(0, 1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r3.factionName(entry_r29.side), " \xB7 Session ", entry_r29.lesson);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r29.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", entry_r29.group ? entry_r29.group + " \xB7 " : "", "", entry_r29.kind);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r29.replyTo ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r29.revises ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(entry_r29.points);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r29.speech);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r29.mediaId ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(entry_r29.evidenceIds);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r29.changeNote ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r29.side !== ctx_r3.runtime.side() && ctx_r3.runtime.side() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r29.actorId === ctx_r3.runtime.actorId ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r29.side === ctx_r3.runtime.side() && entry_r29.actorId !== ctx_r3.runtime.actorId ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r29.actorId !== ctx_r3.runtime.actorId ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.feedback());
  }
}
function DebateExchangeComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "nav", 71)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DebateExchangeComponent_Conditional_16_For_5_Template, 9, 9, "button", 72, _forTrack02, false, DebateExchangeComponent_Conditional_16_ForEmpty_6_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, DebateExchangeComponent_Conditional_16_Conditional_7_Template, 31, 15, "article", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.view() === "critique" ? "Your side\u2019s speakers" : "Argument exchange");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.entries());
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_9_0 = ctx_r3.selected()) ? 7 : -1, tmp_9_0);
  }
}
function DebateExchangeComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r41);
  }
}
function DebateExchangeComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_46_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      \u0275\u0275nextContext();
      const contextPanel_r44 = \u0275\u0275reference(123);
      return \u0275\u0275resetView(contextPanel_r44.showModal());
    });
    \u0275\u0275text(1, "Context evidence & defense");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_For_51_Template_button_click_0_listener() {
      const review_r46 = \u0275\u0275restoreView(_r45).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.selectedId.set(review_r46.contributionId);
      return \u0275\u0275resetView(ctx_r3.view.set("debate"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const review_r46 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", review_r46.name, " \xB7 review argument");
  }
}
function DebateExchangeComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_64_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.closePractice());
    });
    \u0275\u0275text(1, "Return to classroom work");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_65_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.openPractice());
    });
    \u0275\u0275text(1, "Open practice debate");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "Fictional practice debate \xB7 separate from classroom work");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "Local classroom workspace \xB7 file exchange");
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-debate-author", 84);
    \u0275\u0275listener("submitted", function DebateExchangeComponent_Conditional_79_Template_app_debate_author_submitted_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r3 = \u0275\u0275nextContext();
      const authorPanel_r42 = \u0275\u0275reference(73);
      authorPanel_r42.close();
      ctx_r3.view.set("debate");
      return \u0275\u0275resetView(ctx_r3.selectedId.set(ctx_r3.runtime.own().at(-1).id));
    });
    \u0275\u0275elementEnd();
  }
}
function DebateExchangeComponent_Conditional_87_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 85);
    \u0275\u0275text(1, "Open original source \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r51 = \u0275\u0275nextContext();
    \u0275\u0275property("href", item_r51.sourceUrl, \u0275\u0275sanitizeUrl);
  }
}
function DebateExchangeComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "blockquote");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "Context");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9, "Perspective and limits");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "b");
    \u0275\u0275text(14, "Citation:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, DebateExchangeComponent_Conditional_87_Conditional_16_Template, 2, 1, "a", 85);
    \u0275\u0275elementStart(17, "button", 20);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_87_Template_button_click_17_listener() {
      const item_r51 = \u0275\u0275restoreView(_r50);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.runtime.toggleSource(item_r51.id));
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r51 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r51.dateLabel, " \xB7 ", item_r51.sourceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r51.excerpt);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r51.context);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r51.perspective);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r51.citation);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r51.sourceUrl ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.draft().evidenceIds.includes(item_r51.id) ? "Detach from your argument" : "Attach to your argument");
  }
}
function DebateExchangeComponent_For_99_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_For_99_Template_button_click_0_listener() {
      const $index_r53 = \u0275\u0275restoreView(_r52).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.skillChoice.set($index_r53));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r54 = ctx.$implicit;
    const $index_r53 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-pressed", ctx_r3.skillChoice() === $index_r53);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r54.text);
  }
}
function DebateExchangeComponent_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.skillChoice() === ctx_r3.runtime.lesson().skill.strongest ? "Stronger reasoning" : "Test the reasoning");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.lesson().skill.choices[ctx_r3.skillChoice()].feedback);
  }
}
function DebateExchangeComponent_For_103_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_For_103_Template_button_click_0_listener() {
      const id_r56 = \u0275\u0275restoreView(_r55).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      const sourcePanel_r16 = \u0275\u0275reference(81);
      return \u0275\u0275resetView(ctx_r3.inspectSource(id_r56, sourcePanel_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r56 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r3.sourceName(id_r56), " \u2197");
  }
}
function DebateExchangeComponent_Conditional_113_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_113_For_6_Template_button_click_0_listener() {
      const sentence_r59 = \u0275\u0275restoreView(_r58).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.moment.set(sentence_r59));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sentence_r59 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-pressed", ctx_r3.moment() === sentence_r59);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sentence_r59);
  }
}
function DebateExchangeComponent_Conditional_113_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 89);
    \u0275\u0275listener("input", function DebateExchangeComponent_Conditional_113_For_8_Template_input_input_2_listener($event) {
      const criterion_r61 = \u0275\u0275restoreView(_r60).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.rate(criterion_r61, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const criterion_r61 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", criterion_r61, " \xB7 ", ctx_r3.ratings()[criterion_r61], "/4");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r3.ratings()[criterion_r61]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.criterionHelp[criterion_r61]);
  }
}
function DebateExchangeComponent_Conditional_113_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "fieldset")(3, "legend");
    \u0275\u0275text(4, "Select the moment you are critiquing");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, DebateExchangeComponent_Conditional_113_For_6_Template, 2, 2, "button", 21, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, DebateExchangeComponent_Conditional_113_For_8_Template, 5, 4, "label", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "What works?");
    \u0275\u0275elementStart(11, "textarea", 86);
    \u0275\u0275listener("ngModelChange", function DebateExchangeComponent_Conditional_113_Template_textarea_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r57);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.strength.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13, "One specific improvement");
    \u0275\u0275elementStart(14, "textarea", 87);
    \u0275\u0275listener("ngModelChange", function DebateExchangeComponent_Conditional_113_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r57);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.suggestion.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 88);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 20);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_113_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r57);
      const ctx_r3 = \u0275\u0275nextContext();
      const critiquePanel_r37 = \u0275\u0275reference(107);
      return \u0275\u0275resetView(ctx_r3.submitCritique(critiquePanel_r37));
    });
    \u0275\u0275text(18, "Submit peer critique");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r62 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", target_r62.name, " \xB7 ", ctx_r3.factionName(target_r62.side));
    \u0275\u0275advance(4);
    \u0275\u0275repeater(target_r62.speech.split(". "));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.criteria);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.strength());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r3.suggestion());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.message());
  }
}
function DebateExchangeComponent_Conditional_121_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 89);
    \u0275\u0275listener("input", function DebateExchangeComponent_Conditional_121_For_5_Template_input_input_2_listener($event) {
      const criterion_r65 = \u0275\u0275restoreView(_r64).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.rate(criterion_r65, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const criterion_r65 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", criterion_r65, " \xB7 ", ctx_r3.ratings()[criterion_r65], "/4");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r3.ratings()[criterion_r65]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.criterionHelp[criterion_r65]);
  }
}
function DebateExchangeComponent_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "blockquote");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, DebateExchangeComponent_Conditional_121_For_5_Template, 5, 4, "label", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Why does this performance deserve its place?");
    \u0275\u0275elementStart(8, "textarea", 87);
    \u0275\u0275listener("ngModelChange", function DebateExchangeComponent_Conditional_121_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r63);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.reason.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10, "Judge the evidence, reasoning and response you can observe. Agreement with the side is not a scoring criterion.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 88);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 66);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_121_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r3 = \u0275\u0275nextContext();
      const judgmentPanel_r39 = \u0275\u0275reference(115);
      return \u0275\u0275resetView(ctx_r3.saveJudgment(judgmentPanel_r39));
    });
    \u0275\u0275text(14, "Add to my ranking");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r66 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", target_r66.name, " \xB7 Session ", target_r66.lesson, " ", target_r66.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(target_r66.speech);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.criteria);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.reason());
    \u0275\u0275control();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.runtime.message());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.reason().trim());
  }
}
function DebateExchangeComponent_Conditional_129_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r68 = ctx.$implicit;
    \u0275\u0275property("value", target_r68.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r68.label);
  }
}
function DebateExchangeComponent_Conditional_129_Conditional_7_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DebateExchangeComponent_Conditional_129_Conditional_7_For_4_Template_button_click_0_listener() {
      const id_r71 = \u0275\u0275restoreView(_r70).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      const sourcePanel_r16 = \u0275\u0275reference(81);
      return \u0275\u0275resetView(ctx_r3.inspectSource(id_r71, sourcePanel_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const id_r71 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.sourceName(id_r71));
  }
}
function DebateExchangeComponent_Conditional_129_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r69 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275repeaterCreate(3, DebateExchangeComponent_Conditional_129_Conditional_7_For_4_Template, 2, 1, "button", 21, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Independent evidence and explanation");
    \u0275\u0275elementStart(7, "textarea", 92);
    \u0275\u0275listener("ngModelChange", function DebateExchangeComponent_Conditional_129_Conditional_7_Template_textarea_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r69);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveContext($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const target_r72 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(target_r72.prompt);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(target_r72.sourceIds);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.contextDraft());
    \u0275\u0275control();
  }
}
function DebateExchangeComponent_Conditional_129_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label");
    \u0275\u0275text(3, "Context target");
    \u0275\u0275elementStart(4, "select", 90);
    \u0275\u0275listener("ngModelChange", function DebateExchangeComponent_Conditional_129_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r67);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.contextId.set($event));
    });
    \u0275\u0275repeaterCreate(5, DebateExchangeComponent_Conditional_129_For_6_Template, 2, 2, "option", 91, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, DebateExchangeComponent_Conditional_129_Conditional_7_Template, 8, 2);
    \u0275\u0275elementStart(8, "p", 88);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const inquiry_r73 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", inquiry_r73.recordSummary, " These responses require teacher review.");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r3.contextTarget()?.id);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(inquiry_r73.targets);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_12_0 = ctx_r3.contextTarget()) ? 7 : -1, tmp_12_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.runtime.message());
  }
}
var DebateExchangeComponent = class _DebateExchangeComponent {
  runtime = inject(DebateExchangeRuntime);
  config = this.runtime.config;
  view = signal(
    "debate",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedId = signal(
    "",
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  source = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "source" }] : (
      /* istanbul ignore next */
      []
    )
  );
  skillChoice = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "skillChoice" }] : (
      /* istanbul ignore next */
      []
    )
  );
  authorOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "authorOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reading = signal(
    false,
    ...ngDevMode ? [{ debugName: "reading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  criteria = debateCriteria;
  ratings = signal(
    { evidence: 2, reasoning: 2, response: 2 },
    ...ngDevMode ? [{ debugName: "ratings" }] : (
      /* istanbul ignore next */
      []
    )
  );
  criterionHelp = {
    evidence: "1 Unsupported \xB7 2 Source named \xB7 3 Relevant source explained \xB7 4 Source weighed with its limits",
    reasoning: "1 Assertion \xB7 2 Partial link \xB7 3 Clear claim\u2013evidence link \xB7 4 Coherent case with limitations",
    response: "1 No response \xB7 2 Mentions an objection \xB7 3 Answers fairly \xB7 4 Answers the strongest objection with evidence"
  };
  critiqueTarget = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "critiqueTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  moment = signal(
    "",
    ...ngDevMode ? [{ debugName: "moment" }] : (
      /* istanbul ignore next */
      []
    )
  );
  strength = signal(
    "",
    ...ngDevMode ? [{ debugName: "strength" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestion = signal(
    "",
    ...ngDevMode ? [{ debugName: "suggestion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  judgmentTarget = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "judgmentTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reason = signal(
    "",
    ...ngDevMode ? [{ debugName: "reason" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ballot = signal(
    [],
    ...ngDevMode ? [{ debugName: "ballot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  entries = computed(
    () => this.view() === "critique" ? this.runtime.peers() : this.runtime.state().contributions,
    ...ngDevMode ? [{ debugName: "entries" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = computed(
    () => this.entries().find((entry) => entry.id === this.selectedId()) ?? this.entries().filter((entry) => entry.lesson <= this.runtime.lesson().number).at(-1) ?? this.entries().at(-1),
    ...ngDevMode ? [{ debugName: "selected" }] : (
      /* istanbul ignore next */
      []
    )
  );
  feedback = computed(
    () => this.runtime.state().critiques.filter((review) => review.contributionId === this.selected()?.id),
    ...ngDevMode ? [{ debugName: "feedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contextId = signal(
    "",
    ...ngDevMode ? [{ debugName: "contextId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contextTarget = computed(
    () => this.config.inquiry?.targets.find((target) => target.id === this.contextId()) ?? this.config.inquiry?.targets[0],
    ...ngDevMode ? [{ debugName: "contextTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contextDraft = computed(
    () => this.runtime.drafts()[`context-${this.contextTarget()?.id}`]?.speech ?? "",
    ...ngDevMode ? [{ debugName: "contextDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.runtime.lesson();
      this.skillChoice.set(void 0);
    });
    effect(() => {
      this.runtime.practice();
      this.selectedId.set("");
    });
    effect(() => {
      this.runtime.practice();
      this.ballot.set(this.runtime.latestBallot()?.judgments ?? []);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.reading())
        globalThis.speechSynthesis?.cancel();
    });
  }
  factionName(id) {
    return this.config.factions.find((faction) => faction.id === id)?.shortName ?? id;
  }
  author(id) {
    return this.runtime.state().contributions.find((entry) => entry.id === id)?.name ?? "Argument";
  }
  sourceName(id) {
    return this.config.evidence.find((source) => source.id === id)?.title ?? id;
  }
  inspectSource(id, dialog) {
    this.source.set(this.config.evidence.find((source) => source.id === id));
    dialog.showModal();
  }
  hearPrompt() {
    if (!globalThis.speechSynthesis) {
      this.runtime.message.set("Spoken playback is unavailable. Read the debate prompt or have it read aloud.");
      return;
    }
    if (this.reading()) {
      speechSynthesis.cancel();
      this.reading.set(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(this.config.centralQuestion);
    utterance.onend = () => this.reading.set(false);
    utterance.onerror = () => {
      this.reading.set(false);
      this.runtime.message.set("Prompt playback unavailable. The prompt remains visible.");
    };
    this.reading.set(true);
    speechSynthesis.speak(utterance);
  }
  openAuthor(dialog) {
    this.authorOpen.set(true);
    dialog.showModal();
  }
  prepareCritique(entry, dialog) {
    this.critiqueTarget.set(entry);
    this.moment.set("");
    this.strength.set("");
    this.suggestion.set("");
    this.ratings.set({ evidence: 2, reasoning: 2, response: 2 });
    dialog.showModal();
  }
  rate(criterion, value) {
    this.ratings.update((ratings) => __spreadProps(__spreadValues({}, ratings), { [criterion]: Number(value) }));
  }
  submitCritique(dialog) {
    const target = this.critiqueTarget();
    if (!target)
      return;
    if (this.runtime.critique({ contributionId: target.id, moment: this.moment(), strength: this.strength(), suggestion: this.suggestion(), ratings: this.ratings() }))
      dialog.close();
  }
  prepareJudgment(entry, dialog) {
    this.judgmentTarget.set(entry);
    const prior = this.ballot().find((judgment) => judgment.performerId === entry.actorId);
    this.ratings.set(prior?.ratings ?? { evidence: 2, reasoning: 2, response: 2 });
    this.reason.set(prior?.reason ?? "");
    dialog.showModal();
  }
  saveJudgment(dialog) {
    const target = this.judgmentTarget();
    if (!target || !this.reason().trim())
      return;
    const judgment = { performerId: target.actorId, contributionId: target.id, ratings: this.ratings(), reason: this.reason().trim() };
    const prior = this.ballot().findIndex((entry) => entry.performerId === target.actorId);
    if (prior < 0 && this.ballot().length === 3) {
      this.runtime.message.set("Remove a performer before adding another; rank up to three.");
      return;
    }
    this.ballot.update((ballot) => prior < 0 ? [...ballot, judgment] : ballot.map((entry, index) => index === prior ? judgment : entry));
    dialog.close();
  }
  moveRank(index, delta) {
    const next = [...this.ballot()];
    const target = index + delta;
    if (target < 0 || target >= next.length)
      return;
    [next[index], next[target]] = [next[target], next[index]];
    this.ballot.set(next);
  }
  removeRank(id) {
    this.ballot.update((ballot) => ballot.filter((entry) => entry.performerId !== id));
  }
  exportExchange() {
    if (this.runtime.practice()) {
      this.runtime.message.set("Practice examples stay separate. Return to your classroom workspace to export.");
      return;
    }
    const url = URL.createObjectURL(new Blob([this.runtime.exportFile()], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.config.projectId}-exchange.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  async importExchange(event) {
    const input2 = event.target;
    const file = input2.files?.[0];
    try {
      if (file) {
        if (file.size > 4e6)
          throw new Error("Choose an exchange file under 4 MB.");
        this.runtime.importFile(await file.text());
      }
    } catch (error) {
      this.runtime.report(error);
    } finally {
      input2.value = "";
    }
  }
  saveContext(text) {
    this.runtime.saveContext(`context-${this.contextTarget()?.id}`, text);
  }
  static \u0275fac = function DebateExchangeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DebateExchangeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DebateExchangeComponent, selectors: [["app-debate-exchange"]], decls: 130, vars: 24, consts: [["authorPanel", ""], ["sourcePanel", ""], ["skill", ""], ["critiquePanel", ""], ["judgmentPanel", ""], ["contextPanel", ""], [1, "debate-layout"], ["aria-label", "Ongoing debate", 1, "debate-stage"], ["aria-label", "Debate tools", 1, "stage-controls"], [1, "views"], ["type", "button", 3, "click"], ["type", "button", 1, "skill-button", 3, "click"], ["aria-label", "Build your debate case", 1, "case-workspace"], ["aria-label", "Judge debate performers", 1, "judging-workspace"], [1, "debate-floor"], ["aria-label", "Tasks and tutor area", 1, "planning"], ["open", "", 1, "task-box"], [1, "product"], ["open", "", 1, "tutor-box"], [1, "tutor-status"], ["type", "button", 1, "primary", 3, "click"], ["type", "button"], [1, "received"], [1, "exchange-tools"], ["type", "file", "accept", "application/json,.json", 3, "change"], [1, "mode-notice"], ["role", "status", 1, "action-status"], ["aria-labelledby", "author-title", 3, "close"], ["id", "author-title"], ["aria-labelledby", "source-title"], ["id", "source-title"], ["aria-labelledby", "skill-title"], ["id", "skill-title"], [1, "skill-challenge"], [1, "skill-choices"], ["role", "status", 1, "skill-feedback"], [1, "evidence-links"], [1, "subtle"], ["aria-labelledby", "critique-title"], ["id", "critique-title"], ["aria-labelledby", "judgment-title"], ["id", "judgment-title"], ["aria-labelledby", "context-title"], ["id", "context-title"], [1, "resolution"], [1, "eyebrow"], ["aria-label", "Choose your side", 1, "side-picker"], ["type", "button", 3, "--%NS%side-accent"], [1, "argument-construction"], [1, "points"], [1, "point"], [1, "empty-object"], [1, "source-rack"], [1, "source-tile", 3, "attached"], [1, "draft-preview"], [1, "emblem"], ["aria-label", "Selected"], [1, "point-number"], [1, "order-buttons"], ["type", "button", 3, "click", "disabled"], [1, "outline-symbol"], [1, "source-tile"], [1, "judging-pool"], ["type", "button", 1, "performer"], [1, "ballot"], [1, "rank-row"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "results"], [1, "result-row"], ["type", "button", 1, "performer", 3, "click"], [1, "avatar"], ["aria-label", "Debate history", 1, "timeline"], ["type", "button", 3, "selected"], ["aria-label", "Selected debate argument", 1, "performance"], [1, "timeline-dot"], [1, "performance-heading"], [1, "argument-links"], [1, "speech-points"], [1, "speech"], [3, "mediaId"], ["open", ""], [1, "performance-actions"], ["type", "button", 1, "primary"], [1, "peer-feedback"], [3, "submitted"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["rows", "2", "maxlength", "2000", 3, "ngModelChange", "ngModel"], ["rows", "3", "maxlength", "2000", 3, "ngModelChange", "ngModel"], ["role", "status"], ["type", "range", "min", "1", "max", "4", "step", "1", 3, "input", "value"], [3, "ngModelChange", "ngModel"], [3, "value"], ["rows", "7", "maxlength", "6000", 3, "ngModelChange", "ngModel"]], template: function DebateExchangeComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 6)(1, "main", 7)(2, "nav", 8)(3, "div", 9)(4, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_4_listener() {
        return ctx.view.set("debate");
      });
      \u0275\u0275text(5, "Debate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_6_listener() {
        return ctx.view.set("case");
      });
      \u0275\u0275text(7, "Build case");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_8_listener() {
        return ctx.view.set("critique");
      });
      \u0275\u0275text(9, "Peer critique");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_10_listener() {
        return ctx.view.set("judging");
      });
      \u0275\u0275text(11, "Judging");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 11);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        const skill_r2 = \u0275\u0275reference(89);
        return \u0275\u0275resetView(skill_r2.showModal());
      });
      \u0275\u0275text(13, "Skill example \u2197");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, DebateExchangeComponent_Conditional_14_Template, 26, 6, "section", 12)(15, DebateExchangeComponent_Conditional_15_Template, 28, 5, "section", 13)(16, DebateExchangeComponent_Conditional_16_Template, 8, 3, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "aside", 15)(18, "details", 16)(19, "summary");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "h2");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "ul");
      \u0275\u0275repeaterCreate(24, DebateExchangeComponent_For_25_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 17)(27, "b");
      \u0275\u0275text(28, "Produce");
      \u0275\u0275elementEnd();
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "details", 18)(31, "summary");
      \u0275\u0275text(32, "AI Tutor ");
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34, "Disconnected");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "p", 19);
      \u0275\u0275text(36, "Planning only. Manual tools are available below.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "ul")(38, "li");
      \u0275\u0275text(39, "Inspect claims, sources and an opponent\u2019s argument.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "li");
      \u0275\u0275text(41, "Ask what changed after peer feedback.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "li");
      \u0275\u0275text(43, "Future teacher controls: model, hints and review.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "button", 20);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        const authorPanel_r42 = \u0275\u0275reference(73);
        return \u0275\u0275resetView(ctx.openAuthor(authorPanel_r42));
      });
      \u0275\u0275text(45, "Open argument editor");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(46, DebateExchangeComponent_Conditional_46_Template, 2, 0, "button", 21);
      \u0275\u0275elementStart(47, "details", 22)(48, "summary");
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(50, DebateExchangeComponent_For_51_Template, 2, 1, "button", 21, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "details", 23)(53, "summary");
      \u0275\u0275text(54, "Class exchange & practice");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p");
      \u0275\u0275text(56, "Local workspace \xB7 live classroom connection unavailable. Export submitted arguments, critiques and ballots; exchange files with your class and import their replies.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_57_listener() {
        return ctx.exportExchange();
      });
      \u0275\u0275text(58, "Export class exchange");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "label");
      \u0275\u0275text(60, "Import class exchange");
      \u0275\u0275elementStart(61, "input", 24);
      \u0275\u0275listener("change", function DebateExchangeComponent_Template_input_change_61_listener($event) {
        return ctx.importExchange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "small");
      \u0275\u0275text(63, "Drafts and context answers stay private. Recordings stay in this browser; exchange transcripts travel in the file. Import only files for your classroom.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(64, DebateExchangeComponent_Conditional_64_Template, 2, 0, "button", 21)(65, DebateExchangeComponent_Conditional_65_Template, 2, 0, "button", 21);
      \u0275\u0275elementStart(66, "small");
      \u0275\u0275text(67, "All sessions and examples are open for testing.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(68, DebateExchangeComponent_Conditional_68_Template, 2, 0, "p", 25)(69, DebateExchangeComponent_Conditional_69_Template, 2, 0, "p", 25);
      \u0275\u0275elementStart(70, "p", 26);
      \u0275\u0275text(71);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(72, "dialog", 27, 0);
      \u0275\u0275listener("close", function DebateExchangeComponent_Template_dialog_close_72_listener() {
        return ctx.authorOpen.set(false);
      });
      \u0275\u0275elementStart(74, "header")(75, "h2", 28);
      \u0275\u0275text(76, "Argument editor \xB7 Tutor area");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_77_listener() {
        \u0275\u0275restoreView(_r1);
        const authorPanel_r42 = \u0275\u0275reference(73);
        return \u0275\u0275resetView(authorPanel_r42.close());
      });
      \u0275\u0275text(78, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(79, DebateExchangeComponent_Conditional_79_Template, 1, 0, "app-debate-author");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "dialog", 29, 1)(82, "header")(83, "h2", 30);
      \u0275\u0275text(84);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_85_listener() {
        \u0275\u0275restoreView(_r1);
        const sourcePanel_r16 = \u0275\u0275reference(81);
        return \u0275\u0275resetView(sourcePanel_r16.close());
      });
      \u0275\u0275text(86, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(87, DebateExchangeComponent_Conditional_87_Template, 19, 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "dialog", 31, 2)(90, "header")(91, "h2", 32);
      \u0275\u0275text(92);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_93_listener() {
        \u0275\u0275restoreView(_r1);
        const skill_r2 = \u0275\u0275reference(89);
        return \u0275\u0275resetView(skill_r2.close());
      });
      \u0275\u0275text(94, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "p", 33);
      \u0275\u0275text(96);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "div", 34);
      \u0275\u0275repeaterCreate(98, DebateExchangeComponent_For_99_Template, 2, 2, "button", 21, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(100, DebateExchangeComponent_Conditional_100_Template, 5, 2, "div", 35);
      \u0275\u0275elementStart(101, "div", 36);
      \u0275\u0275repeaterCreate(102, DebateExchangeComponent_For_103_Template, 2, 1, "button", 21, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "p", 37);
      \u0275\u0275text(105, "Authored teaching example \xB7 discuss the reasoning, then apply it to your own argument.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(106, "dialog", 38, 3)(108, "header")(109, "h2", 39);
      \u0275\u0275text(110, "Peer critique \xB7 Tutor area");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_111_listener() {
        \u0275\u0275restoreView(_r1);
        const critiquePanel_r37 = \u0275\u0275reference(107);
        return \u0275\u0275resetView(critiquePanel_r37.close());
      });
      \u0275\u0275text(112, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(113, DebateExchangeComponent_Conditional_113_Template, 19, 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "dialog", 40, 4)(116, "header")(117, "h2", 41);
      \u0275\u0275text(118, "Judge performer \xB7 Tutor area");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_119_listener() {
        \u0275\u0275restoreView(_r1);
        const judgmentPanel_r39 = \u0275\u0275reference(115);
        return \u0275\u0275resetView(judgmentPanel_r39.close());
      });
      \u0275\u0275text(120, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(121, DebateExchangeComponent_Conditional_121_Template, 15, 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "dialog", 42, 5)(124, "header")(125, "h2", 43);
      \u0275\u0275text(126, "Context evidence \xB7 Tutor area");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "button", 10);
      \u0275\u0275listener("click", function DebateExchangeComponent_Template_button_click_127_listener() {
        \u0275\u0275restoreView(_r1);
        const contextPanel_r44 = \u0275\u0275reference(123);
        return \u0275\u0275resetView(contextPanel_r44.close());
      });
      \u0275\u0275text(128, "Close");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(129, DebateExchangeComponent_Conditional_129_Template, 10, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_24_0;
      let tmp_30_0;
      let tmp_31_0;
      let tmp_32_0;
      \u0275\u0275advance();
      \u0275\u0275attribute("data-session", ctx.runtime.lesson().number);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-pressed", ctx.view() === "debate");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.view() === "case");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.view() === "critique");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-pressed", ctx.view() === "judging");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.view() === "case" || ctx.view() === "debate" && !ctx.runtime.state().contributions.length ? 14 : ctx.view() === "judging" ? 15 : 16);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2("Week ", (ctx.runtime.lesson().number + ctx.runtime.lesson().number % 2) / 2, " \xB7 ", ctx.runtime.lesson().number % 2 ? "Individual" : "Group exchange");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.runtime.lesson().title);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.runtime.lesson().tasks);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.lesson().product);
      \u0275\u0275advance(17);
      \u0275\u0275conditional(ctx.config.inquiry ? 46 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Feedback received \xB7 ", ctx.runtime.received().length);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.runtime.received());
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.runtime.practice() ? 64 : 65);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.runtime.practice() ? 68 : 69);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.runtime.message());
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.authorOpen() ? 79 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.source()?.title);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_24_0 = ctx.source()) ? 87 : -1, tmp_24_0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.runtime.lesson().skill.title);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.runtime.lesson().skill.claim);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.runtime.lesson().skill.choices);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.skillChoice() !== void 0 ? 100 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.runtime.lesson().skill.sourceIds);
      \u0275\u0275advance(11);
      \u0275\u0275conditional((tmp_30_0 = ctx.critiqueTarget()) ? 113 : -1, tmp_30_0);
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_31_0 = ctx.judgmentTarget()) ? 121 : -1, tmp_31_0);
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_32_0 = ctx.config.inquiry) ? 129 : -1, tmp_32_0);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, DebateAuthorComponent, DebateRecordingComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  color: #213d37;\n  background: #e9ede7;\n  font-family:\n    "Aptos",\n    "Segoe UI",\n    sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbutton[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%] {\n  font: inherit;\n}\nbutton[_ngcontent-%COMP%], \nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%] {\n  color: inherit;\n  border: 1px solid #a8bab0;\n  background: #fffef8;\n  border-radius: 6px;\n  padding: 9px 12px;\n  line-height: 1.35;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #e8eee6;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #b67418;\n  outline-offset: 3px;\n}\n.primary[_ngcontent-%COMP%] {\n  color: #fffef5;\n  background: #245d50;\n  border-color: #245d50;\n}\n.primary[_ngcontent-%COMP%]:hover {\n  background: #173e36;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1.35;\n}\nsmall[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.5;\n}\n.subtle[_ngcontent-%COMP%] {\n  color: #596f65;\n  font-size: 13px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #627b6f;\n}\n.debate-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 292px;\n  gap: 18px;\n  padding: 18px;\n  max-width: 1760px;\n  margin: auto;\n  align-items: start;\n}\n.debate-stage[_ngcontent-%COMP%] {\n  min-width: 0;\n  min-height: calc(100dvh - 160px);\n  background: #fffdf5;\n  border: 1px solid #c6cec2;\n  border-radius: 12px;\n  overflow: clip;\n  box-shadow: 0 12px 32px rgba(52, 74, 50, 0.062745098);\n}\n.stage-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px;\n  background: #193d35;\n}\n.views[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.stage-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #eaf0df;\n  border-color: transparent;\n  background: transparent;\n  font-size: 13px;\n  font-weight: 600;\n}\n.stage-controls[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #f3eddb;\n  color: #193d35;\n}\n.stage-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #80978b;\n}\n.stage-controls[_ngcontent-%COMP%]   .skill-button[_ngcontent-%COMP%] {\n  border: 1px solid #69857a;\n  color: #eac683;\n}\n.case-workspace[_ngcontent-%COMP%] {\n  padding: 28px;\n}\n.resolution[_ngcontent-%COMP%] {\n  max-width: 680px;\n  margin: 0 auto 28px;\n  text-align: center;\n}\n.resolution[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: clamp(23px, 2.1vw, 34px);\n  font-weight: 500;\n  line-height: 1.25;\n  margin: 10px 0 16px;\n}\n.resolution[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  border-radius: 40px;\n  padding: 7px 14px;\n}\n.side-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 30px;\n}\n.side-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: left;\n  gap: 12px;\n  padding: 16px;\n  border: 2px solid #d0d7c9;\n}\n.side-picker[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  border-color: var(--%NS%side-accent);\n  background: #edeede;\n  box-shadow: inset 0 0 0 1px var(--%NS%side-accent);\n}\n.side-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 5px;\n  color: #586d62;\n}\n.emblem[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  width: 40px;\n  height: 48px;\n  border: 1px solid var(--%NS%side-accent);\n  border-radius: 18px 18px 22px 22px;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  color: #405748;\n}\n.argument-construction[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);\n  gap: 24px;\n}\n.points[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.source-rack[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.timeline[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.judging-pool[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.ballot[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: #627668;\n}\n.empty-object[_ngcontent-%COMP%] {\n  border: 1px dashed #adbba7;\n  border-radius: 8px;\n  padding: 28px 18px;\n  text-align: center;\n  color: #6c7e6d;\n}\n.empty-object[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.5;\n  margin: 20px 0 0;\n}\n.outline-symbol[_ngcontent-%COMP%] {\n  font-size: 26px;\n  letter-spacing: 5px;\n  color: #9ea997;\n}\n.point[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border-bottom: 1px solid #d9dfd1;\n  padding: 12px 0;\n}\n.point[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Georgia, serif;\n  line-height: 1.5;\n  flex: 1;\n  overflow-wrap: anywhere;\n}\n.point-number[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #83967d;\n}\n.order-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.order-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 4px 9px;\n}\n.source-rack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  align-content: start;\n}\n.source-rack[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.source-tile[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid #d7dece;\n  border-radius: 6px;\n  background: #f2f2e8;\n}\n.source-tile.attached[_ngcontent-%COMP%] {\n  border-color: #477c62;\n  background: #e3ecde;\n}\n.source-tile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  text-align: left;\n  font-size: 13px;\n}\n.source-tile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n}\n.source-tile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  font-size: 23px;\n  width: 44px;\n  text-align: center;\n}\n.source-tile[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #6b7a67;\n  font-size: 11px;\n}\n.draft-preview[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.draft-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  line-height: 1.7;\n  margin-top: 15px;\n}\n.debate-floor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 212px minmax(0, 1fr);\n  min-height: 630px;\n}\n.timeline[_ngcontent-%COMP%] {\n  background: #eff0e5;\n  padding: 20px 12px;\n  border-right: 1px solid #d8dece;\n}\n.timeline[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 0 8px;\n}\n.timeline[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  text-align: left;\n  width: 100%;\n  margin: 6px 0;\n  border-color: transparent;\n  background: transparent;\n  padding: 12px 8px;\n  border-radius: 7px;\n}\n.timeline[_ngcontent-%COMP%]    > button.selected[_ngcontent-%COMP%] {\n  background: #fffdf5;\n  border-color: #b9c4b2;\n  box-shadow: 0 4px 9px rgba(63, 84, 44, 0.0352941176);\n}\n.timeline[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.timeline[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.timeline[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 4px 0;\n}\n.timeline[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6a7d68;\n  font-size: 10px;\n}\n.timeline-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  margin-top: 5px;\n  background: #ab7155;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.timeline-dot.your-side[_ngcontent-%COMP%] {\n  background: #41806a;\n}\n.timeline[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.performance[_ngcontent-%COMP%] {\n  padding: 32px;\n  min-width: 0;\n}\n.performance-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.performance-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 25px;\n  margin: 5px 0;\n  font-weight: 500;\n}\n.performance-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #74816b;\n  text-transform: capitalize;\n}\n.avatar[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  background: #dce5d1;\n  color: #476548;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.argument-links[_ngcontent-%COMP%], \n.evidence-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin: 14px 0;\n}\n.argument-links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.evidence-links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 7px 10px;\n}\n.speech-points[_ngcontent-%COMP%] {\n  padding-left: 20px;\n  color: #496247;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.speech[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 20px;\n  line-height: 1.85;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  margin: 26px 0;\n}\n.performance-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 28px;\n}\n.performance-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.peer-feedback[_ngcontent-%COMP%] {\n  border-top: 1px solid #d4ddcd;\n  padding-top: 15px;\n  margin-top: 18px;\n}\n.peer-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n}\n.planning[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  min-width: 0;\n}\n.planning[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.task-box[_ngcontent-%COMP%], \n.tutor-box[_ngcontent-%COMP%] {\n  background: #f6f7f0;\n  border: 1px solid #c4cfc1;\n  border-radius: 10px;\n  padding: 16px;\n}\n.planning[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 650;\n  line-height: 1.5;\n}\n.planning[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 18px 0 12px;\n}\n.planning[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n  font-size: 13px;\n  line-height: 1.65;\n}\n.planning[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n.product[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  padding-top: 12px;\n  border-top: 1px solid #d9dfd2;\n  margin: 16px 0 0;\n}\n.product[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  color: #718466;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n}\n.tutor-box[_ngcontent-%COMP%] {\n  background: #fffdf7;\n}\n.tutor-box[_ngcontent-%COMP%]    > summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  float: right;\n  font-size: 10px;\n  font-weight: 400;\n  color: #697e76;\n  border: 1px solid #b8c5ba;\n  border-radius: 20px;\n  padding: 1px 6px;\n}\n.tutor-status[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 15px 0;\n  color: #778476;\n}\n.tutor-box[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], \n.exchange-tools[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.received[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin: 8px 0;\n  font-size: 12px;\n}\n.tutor-box[_ngcontent-%COMP%]    > details[_ngcontent-%COMP%] {\n  border-top: 1px solid #d7ddd0;\n  margin-top: 16px;\n  padding-top: 12px;\n}\n.exchange-tools[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.exchange-tools[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.65;\n}\n.exchange-tools[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n.exchange-tools[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin: 12px 0;\n}\n.exchange-tools[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 11px;\n}\n.mode-notice[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #586e62;\n  margin: 0 4px;\n}\n.action-status[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.6;\n  color: #295d48;\n  margin: 0 4px;\n}\n.action-status[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.judging-workspace[_ngcontent-%COMP%] {\n  padding: 28px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px;\n}\n.performer[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  text-align: left;\n  gap: 10px;\n  align-items: center;\n  margin: 10px 0;\n}\n.performer[_ngcontent-%COMP%]   b[_ngcontent-%COMP%], \n.performer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n}\n.performer[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.performer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 11px;\n  margin-left: auto;\n}\n.performer[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  font-size: 18px;\n}\n.ballot[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.judging-pool[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.ballot[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 18px;\n}\n.rank-row[_ngcontent-%COMP%], \n.result-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-bottom: 1px solid #d4dccd;\n  padding: 10px 0;\n  font-size: 13px;\n}\n.rank-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.rank-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 5px 9px;\n}\n.rank-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.result-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 23px;\n  font-family: Georgia, serif;\n  color: #9b7339;\n}\n.results[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.result-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #6d7c66;\n  font-size: 12px;\n}\ndialog[_ngcontent-%COMP%] {\n  color: #263e36;\n  background: #fffdf5;\n  border: 1px solid #9bac9c;\n  border-radius: 14px;\n  padding: 24px;\n  width: min(680px, 100vw - 28px);\n  max-height: calc(100dvh - 36px);\n  overflow: auto;\n  box-shadow: 0 28px 100px rgba(7, 27, 35, 0.3764705882);\n}\ndialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(16, 44, 43, 0.8);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n}\ndialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 22px;\n}\ndialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 23px;\n  font-weight: 500;\n  margin: 4px 0;\n}\ndialog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.7;\n}\ndialog[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin: 18px 0;\n  font-weight: 600;\n}\ndialog[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #6b7d6c;\n}\ndialog[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \ndialog[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #a6b49e;\n  border-radius: 6px;\n  color: inherit;\n  background: #fff;\n}\ndialog[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  border: 1px solid #d3dacb;\n  border-radius: 8px;\n}\ndialog[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  margin: 5px 0;\n  width: 100%;\n}\ndialog[_ngcontent-%COMP%]   button[aria-pressed=true][_ngcontent-%COMP%] {\n  background: #deead9;\n  border-color: #376b4f;\n}\nblockquote[_ngcontent-%COMP%] {\n  font-family: Georgia, serif;\n  font-size: 17px;\n  line-height: 1.7;\n  border-left: 3px solid #b3bc94;\n  padding-left: 18px;\n  margin: 20px 0;\n}\n.skill-challenge[_ngcontent-%COMP%] {\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.skill-choices[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n.skill-choices[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 18px;\n  line-height: 1.6;\n}\n.skill-feedback[_ngcontent-%COMP%] {\n  margin: 18px 0;\n  background: #e3eddc;\n  border-radius: 8px;\n  padding: 16px;\n}\n.skill-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n}\n@media (max-width: 1150px) {\n  .debate-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 250px;\n    gap: 12px;\n    padding: 12px;\n  }\n  .debate-floor[_ngcontent-%COMP%] {\n    grid-template-columns: 168px minmax(0, 1fr);\n  }\n  .performance[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .case-workspace[_ngcontent-%COMP%] {\n    padding: 22px;\n  }\n  .side-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .side-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .emblem[_ngcontent-%COMP%] {\n    width: 30px;\n    height: 38px;\n    font-size: 20px;\n  }\n  .judging-workspace[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .results[_ngcontent-%COMP%] {\n    grid-column: 1;\n  }\n}\n@media (max-width: 900px) {\n  .debate-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n  .mode-notice[_ngcontent-%COMP%], \n   .action-status[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n  .debate-stage[_ngcontent-%COMP%] {\n    min-height: 570px;\n  }\n  .debate-floor[_ngcontent-%COMP%] {\n    min-height: 520px;\n  }\n  .argument-construction[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .side-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@media (max-width: 560px) {\n  .debate-layout[_ngcontent-%COMP%] {\n    padding: 8px;\n    gap: 12px;\n  }\n  .stage-controls[_ngcontent-%COMP%] {\n    padding: 8px;\n    gap: 4px;\n  }\n  .stage-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 8px;\n  }\n  .stage-controls[_ngcontent-%COMP%]   .skill-button[_ngcontent-%COMP%] {\n    margin-left: auto;\n    padding: 5px 9px;\n  }\n  .debate-stage[_ngcontent-%COMP%] {\n    border-radius: 8px;\n    min-height: 0;\n  }\n  .case-workspace[_ngcontent-%COMP%] {\n    padding: 18px 14px;\n  }\n  .resolution[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n  .resolution[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 23px;\n  }\n  .side-picker[_ngcontent-%COMP%] {\n    gap: 7px;\n    margin-bottom: 24px;\n  }\n  .side-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 10px;\n    gap: 7px;\n    font-size: 12px;\n  }\n  .side-picker[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .emblem[_ngcontent-%COMP%] {\n    width: 23px;\n    height: 30px;\n    font-size: 16px;\n  }\n  .argument-construction[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n  .outline-symbol[_ngcontent-%COMP%] {\n    font-size: 21px;\n  }\n  .empty-object[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .planning[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .debate-floor[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n  }\n  .timeline[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 6px;\n    overflow-x: auto;\n    padding: 10px;\n    border-right: 0;\n    border-bottom: 1px solid #d7dfd0;\n  }\n  .timeline[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .timeline[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    min-width: 150px;\n    width: 150px;\n    padding: 8px;\n    margin: 0;\n    flex-shrink: 0;\n  }\n  .timeline[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    min-width: 260px;\n  }\n  .performance[_ngcontent-%COMP%] {\n    padding: 22px 18px;\n  }\n  .performance-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .speech[_ngcontent-%COMP%] {\n    font-size: 18px;\n    line-height: 1.75;\n  }\n  .performance-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .judging-workspace[_ngcontent-%COMP%] {\n    padding: 22px 16px;\n  }\n  .result-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .result-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .task-box[_ngcontent-%COMP%], \n   .tutor-box[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  dialog[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  dialog[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=debate-exchange.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DebateExchangeComponent, [{
    type: Component,
    args: [{ selector: "app-debate-exchange", imports: [FormsModule, DebateAuthorComponent, DebateRecordingComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="debate-layout">
  <main class="debate-stage" aria-label="Ongoing debate" [attr.data-session]="runtime.lesson().number">
    <nav class="stage-controls" aria-label="Debate tools">
      <div class="views">
        <button type="button" [attr.aria-pressed]="view() === 'debate'" (click)="view.set('debate')">Debate</button>
        <button type="button" [attr.aria-pressed]="view() === 'case'" (click)="view.set('case')">Build case</button>
        <button type="button" [attr.aria-pressed]="view() === 'critique'" (click)="view.set('critique')">Peer critique</button>
        <button type="button" [attr.aria-pressed]="view() === 'judging'" (click)="view.set('judging')">Judging</button>
      </div>
      <button type="button" class="skill-button" (click)="skill.showModal()">Skill example \u2197</button>
    </nav>

    @if (view() === 'case' || (view() === 'debate' && !runtime.state().contributions.length)) {
      <section class="case-workspace" aria-label="Build your debate case">
        <div class="resolution"><span class="eyebrow">The question before the room</span><h1>{{ config.centralQuestion }}</h1>
          <button type="button" (click)="hearPrompt()">{{ reading() ? 'Stop prompt' : 'Hear prompt' }}</button>
        </div>
        <div class="side-picker" aria-label="Choose your side">
          @for (faction of config.factions; track faction.id) {
            <button type="button" [style.--side-accent]="faction.accent" [attr.aria-pressed]="runtime.side() === faction.id" (click)="runtime.chooseSide(faction.id)">
              <span class="emblem">{{ faction.emblem }}</span><span><b>{{ faction.name }}</b><small>{{ faction.position }}</small></span>
              @if (runtime.side() === faction.id) { <span aria-label="Selected">\u2713</span> }
            </button>
          }
        </div>
        <div class="argument-construction">
          <section class="points"><h2>Your argument order</h2>
            @for (point of runtime.draft().points; track $index) {
              <div class="point"><span class="point-number">{{ $index + 1 }}</span><p>{{ point }}</p><span class="order-buttons">
                <button type="button" [disabled]="$first" [attr.aria-label]="'Move point ' + ($index + 1) + ' up'" (click)="runtime.movePoint($index, -1)">\u2191</button>
                <button type="button" [disabled]="$last" [attr.aria-label]="'Move point ' + ($index + 1) + ' down'" (click)="runtime.movePoint($index, 1)">\u2193</button>
              </span></div>
            } @empty { <div class="empty-object"><span class="outline-symbol">01 \u2192 02 \u2192 03</span><p>Add your first points in the tutor-area editor, then arrange them here.</p></div> }
            @if (runtime.draft().replyTo) { <button type="button" (click)="selectedId.set(runtime.draft().replyTo!); view.set('debate')">\u21B3 Answering {{ author(runtime.draft().replyTo) }}</button> }
            @if (runtime.draft().revises) { <button type="button" (click)="selectedId.set(runtime.draft().revises!); view.set('debate')">\u21BA Revising {{ author(runtime.draft().revises) }}</button> }
          </section>
          <section class="source-rack"><h2>Connect evidence</h2>
            @for (source of config.evidence; track source.id) {
              <div class="source-tile" [class.attached]="runtime.draft().evidenceIds.includes(source.id)">
                <button type="button" (click)="inspectSource(source.id, sourcePanel)">{{ source.title }} <small>{{ source.sourceType }}</small></button>
                <button type="button" [attr.aria-label]="(runtime.draft().evidenceIds.includes(source.id) ? 'Detach ' : 'Attach ') + source.title" [attr.aria-pressed]="runtime.draft().evidenceIds.includes(source.id)" (click)="runtime.toggleSource(source.id)">{{ runtime.draft().evidenceIds.includes(source.id) ? '\u2713' : '+' }}</button>
              </div>
            }
          </section>
        </div>
        @if (runtime.draft().speech) { <details class="draft-preview"><summary>Preview your speech</summary><p>{{ runtime.draft().speech }}</p></details> }
      </section>
    } @else if (view() === 'judging') {
      <section class="judging-workspace" aria-label="Judge debate performers">
        <div class="judging-pool"><h2>Review a performer</h2>
          @for (performer of runtime.performers(); track performer.actorId) {
            <button class="performer" type="button" (click)="selectedId.set(performer.id); view.set('debate')"><span class="avatar">{{ performer.name.slice(0, 1) }}</span><span><b>{{ performer.name }}</b><small>{{ factionName(performer.side) }} \xB7 {{ performer.kind }}</small></span><span>Review \u2192</span></button>
          } @empty { <p>No submitted performances yet. Import an exchange or open the practice debate from the side tools.</p> }
        </div>
        <section class="ballot"><h2>Your ranking</h2><p class="subtle">Up to three individuals \xB7 both sides</p>
          @for (judgment of ballot(); track judgment.performerId) {
            <div class="rank-row"><strong>{{ $index + 1 }}</strong><span>{{ author(judgment.contributionId) }}</span>
              <button type="button" [disabled]="$first" [attr.aria-label]="'Move rank ' + ($index + 1) + ' up'" (click)="moveRank($index, -1)">\u2191</button>
              <button type="button" [disabled]="$last" [attr.aria-label]="'Move rank ' + ($index + 1) + ' down'" (click)="moveRank($index, 1)">\u2193</button>
              <button type="button" [attr.aria-label]="'Remove ' + author(judgment.contributionId) + ' from ranking'" (click)="removeRank(judgment.performerId)">\xD7</button>
            </div>
          } @empty { <p>Read a performance, then use \u201CJudge performer\u201D to add your reasons.</p> }
          <button type="button" class="primary" [disabled]="!ballot().length" (click)="runtime.rank(ballot())">Submit ranking</button>
          <details><summary>How rankings work</summary><p>First gets 3 points, second 2, third 1. Each voter\u2019s latest ballot counts. Equal points share a place. Rankings recognize performances; they do not award standards mastery.</p></details>
        </section>
        <section class="results"><h2>{{ runtime.practice() ? 'Practice results' : 'Imported classroom results' }}</h2>
          @for (rank of runtime.ranks(); track rank.id) { <div class="result-row"><strong>{{ rank.place }}</strong><b>{{ rank.name }}</b><span>{{ rank.points }} points \xB7 {{ rank.ballots }} ballots</span></div> }
          @empty { <p>Results appear after a ballot is submitted or imported.</p> }
        </section>
      </section>
    } @else {
      <div class="debate-floor">
        <nav class="timeline" aria-label="Debate history"><h2>{{ view() === 'critique' ? 'Your side\u2019s speakers' : 'Argument exchange' }}</h2>
          @for (entry of entries(); track entry.id) {
            <button type="button" [class.selected]="selected()?.id === entry.id" [attr.aria-current]="selected()?.id === entry.id ? 'true' : null" (click)="selectedId.set(entry.id)">
              <span class="timeline-dot" [class.your-side]="entry.side === runtime.side()"></span>
              <span><small>S{{ entry.lesson }} \xB7 {{ entry.kind }}</small><b>{{ entry.name }}</b><small>{{ entry.group || factionName(entry.side) }}</small></span>
            </button>
          } @empty { <p>No same-side peer work yet. Exchange files with a classmate or open the separate practice debate.</p> }
        </nav>
        @if (selected(); as entry) {
          <article class="performance" aria-label="Selected debate argument">
            <div class="performance-heading"><span class="avatar">{{ entry.name.slice(0, 1) }}</span><div><span class="eyebrow">{{ factionName(entry.side) }} \xB7 Session {{ entry.lesson }}</span><h2>{{ entry.name }}</h2><small>{{ entry.group ? entry.group + ' \xB7 ' : '' }}{{ entry.kind }}</small></div></div>
            <div class="argument-links">
              @if (entry.replyTo) { <button type="button" (click)="selectedId.set(entry.replyTo!); view.set('debate')">\u21B3 Response to {{ author(entry.replyTo) }}</button> }
              @if (entry.revises) { <button type="button" (click)="selectedId.set(entry.revises!); view.set('debate')">\u21BA Earlier version</button> }
            </div>
            <ol class="speech-points">@for (point of entry.points; track $index) { <li>{{ point }}</li> }</ol>
            <p class="speech">{{ entry.speech }}</p>
            @if (entry.mediaId) { <app-debate-recording [mediaId]="entry.mediaId" /> }
            <div class="evidence-links">@for (id of entry.evidenceIds; track id) { <button type="button" (click)="inspectSource(id, sourcePanel)">\u2197 {{ sourceName(id) }}</button> }</div>
            @if (entry.changeNote) { <details open><summary>Revision reasoning</summary><p>{{ entry.changeNote }}</p><small>{{ entry.reviewIds.length }} peer critiques used</small></details> }
            <div class="performance-actions">
              @if (entry.side !== runtime.side() && runtime.side()) { <button type="button" class="primary" (click)="runtime.updateDraft({replyTo: entry.id}); view.set('case')">Answer this argument</button> }
              @if (entry.actorId === runtime.actorId) { <button type="button" (click)="runtime.revise(entry); view.set('case')">Use as revision</button> }
              @if (entry.side === runtime.side() && entry.actorId !== runtime.actorId) { <button type="button" class="primary" (click)="prepareCritique(entry, critiquePanel)">Critique this peer</button> }
              @if (entry.actorId !== runtime.actorId) { <button type="button" (click)="prepareJudgment(entry, judgmentPanel)">Judge performer</button> }
            </div>
            @for (review of feedback(); track review.id) {
              <details class="peer-feedback"><summary>Peer critique \xB7 {{ review.name }}</summary><blockquote>{{ review.moment }}</blockquote><p><b>Strength:</b> {{ review.strength }}</p><p><b>Try next:</b> {{ review.suggestion }}</p><small>Evidence {{ review.ratings.evidence }}/4 \xB7 Reasoning {{ review.ratings.reasoning }}/4 \xB7 Response {{ review.ratings.response }}/4</small></details>
            }
          </article>
        }
      </div>
    }
  </main>

  <aside class="planning" aria-label="Tasks and tutor area">
    <details class="task-box" open><summary>Week {{ (runtime.lesson().number + runtime.lesson().number % 2) / 2 }} \xB7 {{ runtime.lesson().number % 2 ? 'Individual' : 'Group exchange' }}</summary>
      <h2>{{ runtime.lesson().title }}</h2><ul>@for (task of runtime.lesson().tasks; track task) { <li>{{ task }}</li> }</ul><p class="product"><b>Produce</b>{{ runtime.lesson().product }}</p>
    </details>
    <details class="tutor-box" open><summary>AI Tutor <span>Disconnected</span></summary>
      <p class="tutor-status">Planning only. Manual tools are available below.</p>
      <ul><li>Inspect claims, sources and an opponent\u2019s argument.</li><li>Ask what changed after peer feedback.</li><li>Future teacher controls: model, hints and review.</li></ul>
      <button type="button" class="primary" (click)="openAuthor(authorPanel)">Open argument editor</button>
      @if (config.inquiry) { <button type="button" (click)="contextPanel.showModal()">Context evidence &amp; defense</button> }
      <details class="received"><summary>Feedback received \xB7 {{ runtime.received().length }}</summary>
        @for (review of runtime.received(); track review.id) { <button type="button" (click)="selectedId.set(review.contributionId); view.set('debate')">{{ review.name }} \xB7 review argument</button> }
      </details>
      <details class="exchange-tools"><summary>Class exchange &amp; practice</summary>
        <p>Local workspace \xB7 live classroom connection unavailable. Export submitted arguments, critiques and ballots; exchange files with your class and import their replies.</p>
        <button type="button" (click)="exportExchange()">Export class exchange</button>
        <label>Import class exchange<input type="file" accept="application/json,.json" (change)="importExchange($event)" /></label>
        <small>Drafts and context answers stay private. Recordings stay in this browser; exchange transcripts travel in the file. Import only files for your classroom.</small>
        @if (runtime.practice()) { <button type="button" (click)="runtime.closePractice()">Return to classroom work</button> }
        @else { <button type="button" (click)="runtime.openPractice()">Open practice debate</button> }
        <small>All sessions and examples are open for testing.</small>
      </details>
    </details>
    @if (runtime.practice()) { <p class="mode-notice">Fictional practice debate \xB7 separate from classroom work</p> }
    @else { <p class="mode-notice">Local classroom workspace \xB7 file exchange</p> }
    <p class="action-status" role="status">{{ runtime.message() }}</p>
  </aside>
</div>

<dialog #authorPanel aria-labelledby="author-title" (close)="authorOpen.set(false)"><header><h2 id="author-title">Argument editor \xB7 Tutor area</h2><button type="button" (click)="authorPanel.close()">Close</button></header>
  @if (authorOpen()) { <app-debate-author (submitted)="authorPanel.close(); view.set('debate'); selectedId.set(runtime.own().at(-1)!.id)" /> }
</dialog>
<dialog #sourcePanel aria-labelledby="source-title"><header><h2 id="source-title">{{ source()?.title }}</h2><button type="button" (click)="sourcePanel.close()">Close</button></header>
  @if (source(); as item) { <p class="eyebrow">{{ item.dateLabel }} \xB7 {{ item.sourceType }}</p><blockquote>{{ item.excerpt }}</blockquote><h3>Context</h3><p>{{ item.context }}</p><h3>Perspective and limits</h3><p>{{ item.perspective }}</p><p><b>Citation:</b> {{ item.citation }}</p>
    @if (item.sourceUrl) { <a [href]="item.sourceUrl" target="_blank" rel="noopener noreferrer">Open original source \u2197</a> }
    <button type="button" class="primary" (click)="runtime.toggleSource(item.id)">{{ runtime.draft().evidenceIds.includes(item.id) ? 'Detach from your argument' : 'Attach to your argument' }}</button>
  }
</dialog>
<dialog #skill aria-labelledby="skill-title"><header><h2 id="skill-title">{{ runtime.lesson().skill.title }}</h2><button type="button" (click)="skill.close()">Close</button></header>
  <p class="skill-challenge">{{ runtime.lesson().skill.claim }}</p><div class="skill-choices">@for (choice of runtime.lesson().skill.choices; track $index) { <button type="button" [attr.aria-pressed]="skillChoice() === $index" (click)="skillChoice.set($index)">{{ choice.text }}</button> }</div>
  @if (skillChoice() !== undefined) { <div class="skill-feedback" role="status"><b>{{ skillChoice() === runtime.lesson().skill.strongest ? 'Stronger reasoning' : 'Test the reasoning' }}</b><p>{{ runtime.lesson().skill.choices[skillChoice()!].feedback }}</p></div> }
  <div class="evidence-links">@for (id of runtime.lesson().skill.sourceIds; track id) { <button type="button" (click)="inspectSource(id, sourcePanel)">{{ sourceName(id) }} \u2197</button> }</div>
  <p class="subtle">Authored teaching example \xB7 discuss the reasoning, then apply it to your own argument.</p>
</dialog>
<dialog #critiquePanel aria-labelledby="critique-title"><header><h2 id="critique-title">Peer critique \xB7 Tutor area</h2><button type="button" (click)="critiquePanel.close()">Close</button></header>
  @if (critiqueTarget(); as target) {
    <p>{{ target.name }} \xB7 {{ factionName(target.side) }}</p>
    <fieldset><legend>Select the moment you are critiquing</legend>@for (sentence of target.speech.split('. '); track $index) {
      <button type="button" [attr.aria-pressed]="moment() === sentence" (click)="moment.set(sentence)">{{ sentence }}</button>
    }</fieldset>
    @for (criterion of criteria; track criterion) { <label>{{ criterion }} \xB7 {{ ratings()[criterion] }}/4<input type="range" min="1" max="4" step="1" [value]="ratings()[criterion]" (input)="rate(criterion, $any($event.target).value)" /><small>{{ criterionHelp[criterion] }}</small></label> }
    <label>What works?<textarea rows="2" maxlength="2000" [ngModel]="strength()" (ngModelChange)="strength.set($event)"></textarea></label>
    <label>One specific improvement<textarea rows="3" maxlength="2000" [ngModel]="suggestion()" (ngModelChange)="suggestion.set($event)"></textarea></label>
    <p role="status">{{ runtime.message() }}</p><button type="button" class="primary" (click)="submitCritique(critiquePanel)">Submit peer critique</button>
  }
</dialog>
<dialog #judgmentPanel aria-labelledby="judgment-title"><header><h2 id="judgment-title">Judge performer \xB7 Tutor area</h2><button type="button" (click)="judgmentPanel.close()">Close</button></header>
  @if (judgmentTarget(); as target) { <p>{{ target.name }} \xB7 Session {{ target.lesson }} {{ target.kind }}</p><blockquote>{{ target.speech }}</blockquote>
    @for (criterion of criteria; track criterion) { <label>{{ criterion }} \xB7 {{ ratings()[criterion] }}/4<input type="range" min="1" max="4" step="1" [value]="ratings()[criterion]" (input)="rate(criterion, $any($event.target).value)" /><small>{{ criterionHelp[criterion] }}</small></label> }
    <label>Why does this performance deserve its place?<textarea rows="3" maxlength="2000" [ngModel]="reason()" (ngModelChange)="reason.set($event)"></textarea></label>
    <small>Judge the evidence, reasoning and response you can observe. Agreement with the side is not a scoring criterion.</small>
    <p role="status">{{ runtime.message() }}</p><button type="button" class="primary" [disabled]="!reason().trim()" (click)="saveJudgment(judgmentPanel)">Add to my ranking</button>
  }
</dialog>
<dialog #contextPanel aria-labelledby="context-title"><header><h2 id="context-title">Context evidence \xB7 Tutor area</h2><button type="button" (click)="contextPanel.close()">Close</button></header>
  @if (config.inquiry; as inquiry) { <p>{{ inquiry.recordSummary }} These responses require teacher review.</p><label>Context target<select [ngModel]="contextTarget()?.id" (ngModelChange)="contextId.set($event)">@for (target of inquiry.targets; track target.id) { <option [value]="target.id">{{ target.label }}</option> }</select></label>
    @if (contextTarget(); as target) { <p>{{ target.prompt }}</p><div class="evidence-links">@for (id of target.sourceIds; track id) { <button type="button" (click)="inspectSource(id, sourcePanel)">{{ sourceName(id) }}</button> }</div><label>Independent evidence and explanation<textarea rows="7" maxlength="6000" [ngModel]="contextDraft()" (ngModelChange)="saveContext($event)"></textarea></label> }
    <p role="status">{{ runtime.message() }}</p>
  }
</dialog>
`, styles: ['/* src/app/templates/debate-studio/exchange/debate-exchange.component.scss */\n:host {\n  display: block;\n  color: #213d37;\n  background: #e9ede7;\n  font-family:\n    "Aptos",\n    "Segoe UI",\n    sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\ntextarea,\nselect {\n  font: inherit;\n}\nbutton,\nsummary {\n  cursor: pointer;\n}\nbutton {\n  color: inherit;\n  border: 1px solid #a8bab0;\n  background: #fffef8;\n  border-radius: 6px;\n  padding: 9px 12px;\n  line-height: 1.35;\n}\nbutton:hover {\n  background: #e8eee6;\n}\nbutton:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\nbutton:focus-visible,\nsummary:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible {\n  outline: 3px solid #b67418;\n  outline-offset: 3px;\n}\n.primary {\n  color: #fffef5;\n  background: #245d50;\n  border-color: #245d50;\n}\n.primary:hover {\n  background: #173e36;\n}\nh1,\nh2,\nh3,\np {\n  margin-top: 0;\n}\nh2 {\n  font-size: 18px;\n  line-height: 1.35;\n}\nsmall {\n  font-size: 12px;\n  line-height: 1.5;\n}\n.subtle {\n  color: #596f65;\n  font-size: 13px;\n}\n.eyebrow {\n  font-size: 11px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #627b6f;\n}\n.debate-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 292px;\n  gap: 18px;\n  padding: 18px;\n  max-width: 1760px;\n  margin: auto;\n  align-items: start;\n}\n.debate-stage {\n  min-width: 0;\n  min-height: calc(100dvh - 160px);\n  background: #fffdf5;\n  border: 1px solid #c6cec2;\n  border-radius: 12px;\n  overflow: clip;\n  box-shadow: 0 12px 32px rgba(52, 74, 50, 0.062745098);\n}\n.stage-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px;\n  background: #193d35;\n}\n.views {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.stage-controls button {\n  color: #eaf0df;\n  border-color: transparent;\n  background: transparent;\n  font-size: 13px;\n  font-weight: 600;\n}\n.stage-controls button[aria-pressed=true] {\n  background: #f3eddb;\n  color: #193d35;\n}\n.stage-controls button:hover {\n  border-color: #80978b;\n}\n.stage-controls .skill-button {\n  border: 1px solid #69857a;\n  color: #eac683;\n}\n.case-workspace {\n  padding: 28px;\n}\n.resolution {\n  max-width: 680px;\n  margin: 0 auto 28px;\n  text-align: center;\n}\n.resolution h1 {\n  font-family: Georgia, serif;\n  font-size: clamp(23px, 2.1vw, 34px);\n  font-weight: 500;\n  line-height: 1.25;\n  margin: 10px 0 16px;\n}\n.resolution button {\n  font-size: 12px;\n  border-radius: 40px;\n  padding: 7px 14px;\n}\n.side-picker {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 30px;\n}\n.side-picker button {\n  display: flex;\n  align-items: center;\n  text-align: left;\n  gap: 12px;\n  padding: 16px;\n  border: 2px solid #d0d7c9;\n}\n.side-picker button[aria-pressed=true] {\n  border-color: var(--side-accent);\n  background: #edeede;\n  box-shadow: inset 0 0 0 1px var(--side-accent);\n}\n.side-picker small {\n  display: block;\n  margin-top: 5px;\n  color: #586d62;\n}\n.emblem {\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  width: 40px;\n  height: 48px;\n  border: 1px solid var(--side-accent);\n  border-radius: 18px 18px 22px 22px;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  color: #405748;\n}\n.argument-construction {\n  display: grid;\n  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);\n  gap: 24px;\n}\n.points h2,\n.source-rack h2,\n.timeline h2,\n.judging-pool h2,\n.ballot h2,\n.results h2 {\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: #627668;\n}\n.empty-object {\n  border: 1px dashed #adbba7;\n  border-radius: 8px;\n  padding: 28px 18px;\n  text-align: center;\n  color: #6c7e6d;\n}\n.empty-object p {\n  font-size: 13px;\n  line-height: 1.5;\n  margin: 20px 0 0;\n}\n.outline-symbol {\n  font-size: 26px;\n  letter-spacing: 5px;\n  color: #9ea997;\n}\n.point {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border-bottom: 1px solid #d9dfd1;\n  padding: 12px 0;\n}\n.point p {\n  margin: 0;\n  font-family: Georgia, serif;\n  line-height: 1.5;\n  flex: 1;\n  overflow-wrap: anywhere;\n}\n.point-number {\n  font-size: 22px;\n  color: #83967d;\n}\n.order-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.order-buttons button {\n  padding: 4px 9px;\n}\n.source-rack {\n  display: grid;\n  gap: 7px;\n  align-content: start;\n}\n.source-rack h2 {\n  margin-bottom: 4px;\n}\n.source-tile {\n  display: flex;\n  border: 1px solid #d7dece;\n  border-radius: 6px;\n  background: #f2f2e8;\n}\n.source-tile.attached {\n  border-color: #477c62;\n  background: #e3ecde;\n}\n.source-tile button {\n  background: transparent;\n  border: 0;\n  text-align: left;\n  font-size: 13px;\n}\n.source-tile button:first-child {\n  flex: 1;\n}\n.source-tile button:last-child {\n  font-size: 23px;\n  width: 44px;\n  text-align: center;\n}\n.source-tile small {\n  display: block;\n  color: #6b7a67;\n  font-size: 11px;\n}\n.draft-preview {\n  margin-top: 24px;\n}\n.draft-preview p {\n  white-space: pre-wrap;\n  line-height: 1.7;\n  margin-top: 15px;\n}\n.debate-floor {\n  display: grid;\n  grid-template-columns: 212px minmax(0, 1fr);\n  min-height: 630px;\n}\n.timeline {\n  background: #eff0e5;\n  padding: 20px 12px;\n  border-right: 1px solid #d8dece;\n}\n.timeline h2 {\n  font-size: 11px;\n  padding: 0 8px;\n}\n.timeline > button {\n  display: flex;\n  gap: 10px;\n  text-align: left;\n  width: 100%;\n  margin: 6px 0;\n  border-color: transparent;\n  background: transparent;\n  padding: 12px 8px;\n  border-radius: 7px;\n}\n.timeline > button.selected {\n  background: #fffdf5;\n  border-color: #b9c4b2;\n  box-shadow: 0 4px 9px rgba(63, 84, 44, 0.0352941176);\n}\n.timeline b,\n.timeline small {\n  display: block;\n}\n.timeline b {\n  font-size: 13px;\n  margin: 4px 0;\n}\n.timeline small {\n  color: #6a7d68;\n  font-size: 10px;\n}\n.timeline-dot {\n  width: 8px;\n  height: 8px;\n  margin-top: 5px;\n  background: #ab7155;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.timeline-dot.your-side {\n  background: #41806a;\n}\n.timeline p {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.performance {\n  padding: 32px;\n  min-width: 0;\n}\n.performance-heading {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.performance-heading h2 {\n  font-family: Georgia, serif;\n  font-size: 25px;\n  margin: 5px 0;\n  font-weight: 500;\n}\n.performance-heading small {\n  color: #74816b;\n  text-transform: capitalize;\n}\n.avatar {\n  display: grid;\n  place-items: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  background: #dce5d1;\n  color: #476548;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.argument-links,\n.evidence-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin: 14px 0;\n}\n.argument-links button,\n.evidence-links button {\n  font-size: 12px;\n  padding: 7px 10px;\n}\n.speech-points {\n  padding-left: 20px;\n  color: #496247;\n  font-size: 14px;\n  line-height: 1.6;\n}\n.speech {\n  font-family: Georgia, serif;\n  font-size: 20px;\n  line-height: 1.85;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  margin: 26px 0;\n}\n.performance-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 28px;\n}\n.performance-actions button {\n  font-size: 13px;\n}\n.peer-feedback {\n  border-top: 1px solid #d4ddcd;\n  padding-top: 15px;\n  margin-top: 18px;\n}\n.peer-feedback p {\n  font-size: 14px;\n  line-height: 1.6;\n}\n.planning {\n  display: grid;\n  gap: 14px;\n  min-width: 0;\n}\n.planning details {\n  min-width: 0;\n}\n.task-box,\n.tutor-box {\n  background: #f6f7f0;\n  border: 1px solid #c4cfc1;\n  border-radius: 10px;\n  padding: 16px;\n}\n.planning summary {\n  font-size: 13px;\n  font-weight: 650;\n  line-height: 1.5;\n}\n.planning h2 {\n  font-size: 16px;\n  margin: 18px 0 12px;\n}\n.planning ul {\n  padding-left: 18px;\n  font-size: 13px;\n  line-height: 1.65;\n}\n.planning li {\n  margin: 8px 0;\n}\n.product {\n  font-size: 12px;\n  line-height: 1.6;\n  padding-top: 12px;\n  border-top: 1px solid #d9dfd2;\n  margin: 16px 0 0;\n}\n.product b {\n  display: block;\n  color: #718466;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.09em;\n}\n.tutor-box {\n  background: #fffdf7;\n}\n.tutor-box > summary span {\n  float: right;\n  font-size: 10px;\n  font-weight: 400;\n  color: #697e76;\n  border: 1px solid #b8c5ba;\n  border-radius: 20px;\n  padding: 1px 6px;\n}\n.tutor-status {\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 15px 0;\n  color: #778476;\n}\n.tutor-box > button,\n.exchange-tools button,\n.received button {\n  display: block;\n  width: 100%;\n  margin: 8px 0;\n  font-size: 12px;\n}\n.tutor-box > details {\n  border-top: 1px solid #d7ddd0;\n  margin-top: 16px;\n  padding-top: 12px;\n}\n.exchange-tools p,\n.exchange-tools small {\n  font-size: 12px;\n  line-height: 1.65;\n}\n.exchange-tools p {\n  margin-top: 14px;\n}\n.exchange-tools label {\n  font-size: 12px;\n  margin: 12px 0;\n}\n.exchange-tools input {\n  width: 100%;\n  font-size: 11px;\n}\n.mode-notice {\n  font-size: 11px;\n  color: #586e62;\n  margin: 0 4px;\n}\n.action-status {\n  font-size: 12px;\n  line-height: 1.6;\n  color: #295d48;\n  margin: 0 4px;\n}\n.action-status:empty {\n  display: none;\n}\n.judging-workspace {\n  padding: 28px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px;\n}\n.performer {\n  display: flex;\n  width: 100%;\n  text-align: left;\n  gap: 10px;\n  align-items: center;\n  margin: 10px 0;\n}\n.performer b,\n.performer small {\n  display: block;\n}\n.performer b {\n  font-size: 13px;\n}\n.performer span:last-child {\n  font-size: 11px;\n  margin-left: auto;\n}\n.performer .avatar {\n  width: 32px;\n  height: 32px;\n  font-size: 18px;\n}\n.ballot p,\n.results p,\n.judging-pool p {\n  font-size: 13px;\n  line-height: 1.6;\n}\n.ballot details {\n  font-size: 12px;\n  margin-top: 18px;\n}\n.rank-row,\n.result-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-bottom: 1px solid #d4dccd;\n  padding: 10px 0;\n  font-size: 13px;\n}\n.rank-row span {\n  flex: 1;\n}\n.rank-row button {\n  padding: 5px 9px;\n}\n.rank-row strong,\n.result-row strong {\n  font-size: 23px;\n  font-family: Georgia, serif;\n  color: #9b7339;\n}\n.results {\n  grid-column: 1/-1;\n}\n.result-row span {\n  margin-left: auto;\n  color: #6d7c66;\n  font-size: 12px;\n}\ndialog {\n  color: #263e36;\n  background: #fffdf5;\n  border: 1px solid #9bac9c;\n  border-radius: 14px;\n  padding: 24px;\n  width: min(680px, 100vw - 28px);\n  max-height: calc(100dvh - 36px);\n  overflow: auto;\n  box-shadow: 0 28px 100px rgba(7, 27, 35, 0.3764705882);\n}\ndialog::backdrop {\n  background: rgba(16, 44, 43, 0.8);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n}\ndialog header {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 22px;\n}\ndialog header h2 {\n  font-family: Georgia, serif;\n  font-size: 23px;\n  font-weight: 500;\n  margin: 4px 0;\n}\ndialog p {\n  line-height: 1.7;\n}\ndialog label {\n  display: grid;\n  gap: 8px;\n  margin: 18px 0;\n  font-weight: 600;\n}\ndialog label small {\n  font-weight: 400;\n  color: #6b7d6c;\n}\ndialog textarea,\ndialog select {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #a6b49e;\n  border-radius: 6px;\n  color: inherit;\n  background: #fff;\n}\ndialog fieldset {\n  border: 1px solid #d3dacb;\n  border-radius: 8px;\n}\ndialog fieldset button {\n  text-align: left;\n  margin: 5px 0;\n  width: 100%;\n}\ndialog button[aria-pressed=true] {\n  background: #deead9;\n  border-color: #376b4f;\n}\nblockquote {\n  font-family: Georgia, serif;\n  font-size: 17px;\n  line-height: 1.7;\n  border-left: 3px solid #b3bc94;\n  padding-left: 18px;\n  margin: 20px 0;\n}\n.skill-challenge {\n  font-size: 21px;\n  font-family: Georgia, serif;\n}\n.skill-choices {\n  display: grid;\n  gap: 12px;\n}\n.skill-choices button {\n  text-align: left;\n  padding: 18px;\n  line-height: 1.6;\n}\n.skill-feedback {\n  margin: 18px 0;\n  background: #e3eddc;\n  border-radius: 8px;\n  padding: 16px;\n}\n.skill-feedback p {\n  margin: 8px 0 0;\n}\n@media (max-width: 1150px) {\n  .debate-layout {\n    grid-template-columns: minmax(0, 1fr) 250px;\n    gap: 12px;\n    padding: 12px;\n  }\n  .debate-floor {\n    grid-template-columns: 168px minmax(0, 1fr);\n  }\n  .performance {\n    padding: 24px;\n  }\n  .case-workspace {\n    padding: 22px;\n  }\n  .side-picker button {\n    padding: 12px;\n  }\n  .side-picker small {\n    display: none;\n  }\n  .emblem {\n    width: 30px;\n    height: 38px;\n    font-size: 20px;\n  }\n  .judging-workspace {\n    grid-template-columns: 1fr;\n  }\n  .results {\n    grid-column: 1;\n  }\n}\n@media (max-width: 900px) {\n  .debate-layout {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .planning {\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n  .mode-notice,\n  .action-status {\n    grid-column: 1/-1;\n  }\n  .debate-stage {\n    min-height: 570px;\n  }\n  .debate-floor {\n    min-height: 520px;\n  }\n  .argument-construction {\n    grid-template-columns: 1fr 1fr;\n  }\n  .side-picker small {\n    display: block;\n  }\n}\n@media (max-width: 560px) {\n  .debate-layout {\n    padding: 8px;\n    gap: 12px;\n  }\n  .stage-controls {\n    padding: 8px;\n    gap: 4px;\n  }\n  .stage-controls button {\n    font-size: 11px;\n    padding: 8px;\n  }\n  .stage-controls .skill-button {\n    margin-left: auto;\n    padding: 5px 9px;\n  }\n  .debate-stage {\n    border-radius: 8px;\n    min-height: 0;\n  }\n  .case-workspace {\n    padding: 18px 14px;\n  }\n  .resolution {\n    margin-bottom: 20px;\n  }\n  .resolution h1 {\n    font-size: 23px;\n  }\n  .side-picker {\n    gap: 7px;\n    margin-bottom: 24px;\n  }\n  .side-picker button {\n    padding: 10px;\n    gap: 7px;\n    font-size: 12px;\n  }\n  .side-picker small {\n    display: none;\n  }\n  .emblem {\n    width: 23px;\n    height: 30px;\n    font-size: 16px;\n  }\n  .argument-construction {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n  .outline-symbol {\n    font-size: 21px;\n  }\n  .empty-object {\n    padding: 18px;\n  }\n  .planning {\n    grid-template-columns: 1fr;\n  }\n  .debate-floor {\n    display: flex;\n    flex-direction: column;\n  }\n  .timeline {\n    display: flex;\n    gap: 6px;\n    overflow-x: auto;\n    padding: 10px;\n    border-right: 0;\n    border-bottom: 1px solid #d7dfd0;\n  }\n  .timeline h2 {\n    display: none;\n  }\n  .timeline > button {\n    min-width: 150px;\n    width: 150px;\n    padding: 8px;\n    margin: 0;\n    flex-shrink: 0;\n  }\n  .timeline > p {\n    min-width: 260px;\n  }\n  .performance {\n    padding: 22px 18px;\n  }\n  .performance-heading h2 {\n    font-size: 22px;\n  }\n  .speech {\n    font-size: 18px;\n    line-height: 1.75;\n  }\n  .performance-actions button {\n    flex: 1;\n  }\n  .judging-workspace {\n    padding: 22px 16px;\n  }\n  .result-row {\n    flex-wrap: wrap;\n  }\n  .result-row span {\n    margin-left: 0;\n  }\n  .task-box,\n  .tutor-box {\n    padding: 15px;\n  }\n  dialog {\n    padding: 18px;\n  }\n  dialog header h2 {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=debate-exchange.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DebateExchangeComponent, { className: "DebateExchangeComponent", filePath: "src/app/templates/debate-studio/exchange/debate-exchange.component.ts", lineNumber: 16 });
})();
export {
  DebateExchangeComponent
};
//# debugId=25f266e0-65ad-567d-8933-3ce001c48c4a
//# sourceMappingURL=chunk-SZGT5ZSF.js.map
