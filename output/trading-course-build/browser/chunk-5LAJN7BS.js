// src/app/shared/drafts/draft-autosave.ts
var DraftAutosaveController = class {
  constructor(save, delayMs = 700) {
    this.save = save;
    this.delayMs = delayMs;
  }
  save;
  delayMs;
  timer;
  pending;
  schedule(draft) {
    this.pending = draft;
    if (this.timer !== void 0) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(), this.delayMs);
  }
  async flush() {
    if (this.timer !== void 0) clearTimeout(this.timer);
    this.timer = void 0;
    const draft = this.pending;
    this.pending = void 0;
    if (draft !== void 0) await this.save(draft);
  }
  cancel() {
    if (this.timer !== void 0) clearTimeout(this.timer);
    this.timer = void 0;
    this.pending = void 0;
  }
};

export {
  DraftAutosaveController
};
//# debugId=4c4f56ac-3b5b-58a2-96c5-cbcc478ad7df
//# sourceMappingURL=chunk-5LAJN7BS.js.map
