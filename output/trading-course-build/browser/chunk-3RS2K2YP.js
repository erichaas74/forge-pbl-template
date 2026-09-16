import {
  EMPTY_INTRO_RESPONSE,
  IntroError,
  introEvents,
  responseReady,
  validateIntroConfig
} from "./chunk-5A6GBRKO.js";
import {
  Injectable,
  InjectionToken,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E2VJWGUE.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/project-intro/project-intro.runtime.ts
var PROJECT_INTRO_CONFIG = new InjectionToken("PROJECT_INTRO_CONFIG");
var PROJECT_INTRO_PERSISTENCE = new InjectionToken("PROJECT_INTRO_PERSISTENCE");
var ProjectIntroRuntime = class _ProjectIntroRuntime {
  persistence = inject(PROJECT_INTRO_PERSISTENCE);
  scope;
  config;
  queue = Promise.resolve();
  ready = false;
  snapshot = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draft = signal(
    __spreadValues({}, EMPTY_INTRO_RESPONSE),
    ...ngDevMode ? [{ debugName: "draft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  status = signal(
    "Your opening response is ungraded.",
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saving = signal(
    false,
    ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dirty = signal(
    false,
    ...ngDevMode ? [{ debugName: "dirty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async initialize(scope, config) {
    validateIntroConfig(config);
    this.scope = scope;
    this.config = config;
    try {
      const snapshot = await this.persistence.load(scope);
      this.snapshot.set(snapshot);
      this.draft.set(snapshot?.draft ?? __spreadValues({}, EMPTY_INTRO_RESPONSE));
      this.ready = true;
      if (snapshot)
        this.status.set(this.persistence.saveLocation);
    } catch (error) {
      this.report(error);
    }
  }
  update(patch) {
    this.draft.update((draft) => __spreadValues(__spreadValues({}, draft), patch));
    this.dirty.set(true);
    this.status.set("Unsaved changes");
  }
  saveDraft() {
    return this.save(false);
  }
  accept(clientEventId = crypto.randomUUID()) {
    return this.save(true, clientEventId);
  }
  save(accept, clientEventId) {
    const draft = __spreadValues({}, this.draft());
    const run = async () => {
      if (!this.scope || !this.config)
        return false;
      if (!this.ready) {
        try {
          this.snapshot.set(await this.persistence.load(this.scope));
          this.ready = true;
        } catch (error) {
          this.report(error);
          return false;
        }
      }
      if (accept && !responseReady(this.config, draft)) {
        this.error.set("Choose an answer and a direction, then add your reason and a question before starting.");
        return false;
      }
      const previous = this.snapshot();
      if (clientEventId && previous?.history.some((entry) => entry.clientEventId === clientEventId))
        return true;
      if (!accept && JSON.stringify(previous?.draft) === JSON.stringify(draft))
        return true;
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      const snapshot = {
        schemaVersion: "1.0",
        revision: (previous?.revision ?? 0) + 1,
        updatedAt: timestamp,
        draft,
        history: accept ? [
          ...previous?.history ?? [],
          {
            clientEventId,
            timestamp,
            eventType: previous?.history.length ? introEvents.revised : introEvents.accepted,
            response: draft
          }
        ] : previous?.history ?? []
      };
      this.saving.set(true);
      try {
        await this.persistence.save(this.scope, snapshot, previous?.revision ?? 0);
        this.snapshot.set(snapshot);
        this.error.set(void 0);
        const unchanged = JSON.stringify(this.draft()) === JSON.stringify(draft);
        this.dirty.set(!unchanged);
        this.status.set(unchanged ? this.persistence.saveLocation : "Unsaved changes");
        return true;
      } catch (error) {
        this.report(error);
        return false;
      } finally {
        this.saving.set(false);
      }
    };
    const result = this.queue.then(run, run);
    this.queue = result;
    return result;
  }
  report(error) {
    this.error.set(error instanceof IntroError ? error.message : "Your response could not be saved. Please try again.");
    this.status.set("Not saved");
  }
  static \u0275fac = function ProjectIntroRuntime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectIntroRuntime)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectIntroRuntime, factory: _ProjectIntroRuntime.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectIntroRuntime, [{
    type: Injectable
  }], null, null);
})();

export {
  PROJECT_INTRO_CONFIG,
  PROJECT_INTRO_PERSISTENCE
};
//# debugId=50113d54-2d13-54fc-9ae6-4703c1bf41c9
//# sourceMappingURL=chunk-3RS2K2YP.js.map
