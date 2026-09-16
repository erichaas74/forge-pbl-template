import {
  IntroError,
  isIntroSnapshot
} from "./chunk-5A6GBRKO.js";
import {
  safeBrowserStorage
} from "./chunk-OXVZ3VYX.js";

// src/app/infrastructure/persistence/browser-project-intro.adapter.ts
var BrowserProjectIntroAdapter = class {
  constructor(storage = safeBrowserStorage()) {
    this.storage = storage;
  }
  storage;
  saveLocation = "Saved on this browser";
  async load(scope) {
    return this.read(scope);
  }
  async save(scope, snapshot, expectedRevision) {
    if (!this.storage)
      throw new IntroError(
        "SAVE_FAILED",
        "This browser cannot save your response. Enable browser storage and try again."
      );
    const current = this.read(scope);
    if ((current?.revision ?? 0) !== expectedRevision) {
      throw new IntroError(
        "STATE_CONFLICT",
        "Your opening changed in another tab. Keep a copy of your text, then reload to see the saved version."
      );
    }
    if (!isIntroSnapshot(snapshot))
      throw new IntroError(
        "STATE_INVALID",
        "Your response could not be saved because its format is invalid."
      );
    try {
      this.storage.setItem(this.key(scope), JSON.stringify(snapshot));
    } catch {
      throw new IntroError(
        "SAVE_FAILED",
        "Your response is still here, but could not be saved. Check browser storage and try again."
      );
    }
  }
  read(scope) {
    if (!this.storage)
      throw new IntroError(
        "SAVE_FAILED",
        "Browser storage is unavailable. Your opening cannot be saved yet."
      );
    let raw;
    try {
      raw = this.storage.getItem(this.key(scope));
    } catch {
      throw new IntroError(
        "SAVE_FAILED",
        "Your saved opening could not be read. Check browser storage and reload."
      );
    }
    if (raw === null) return void 0;
    try {
      const value = JSON.parse(raw);
      if (isIntroSnapshot(value)) return value;
    } catch {
    }
    throw new IntroError(
      "STATE_INVALID",
      "Your saved opening could not be read. It has been kept unchanged for recovery."
    );
  }
  key({ session: s, introVersion }) {
    return [
      "forge",
      "project-intro",
      s.tenantId,
      s.classId ?? "",
      s.studentId ?? s.actorId,
      s.teamId ?? "",
      s.attemptId ?? "",
      s.projectId,
      s.projectVersion,
      introVersion
    ].map(encodeURIComponent).join(":");
  }
};

export {
  BrowserProjectIntroAdapter
};
//# debugId=3d755f44-a582-5742-97bc-05b6888c1bcd
//# sourceMappingURL=chunk-KANUZZVY.js.map
