import {
  acceptsBridgeCageUpgrade,
  acceptsFractionCageUpgrade,
  acceptsGearCageUpgrade,
  acceptsOpticsCageUpgrade,
  acceptsPistonUpgrade,
  acceptsTimingCageUpgrade
} from "./chunk-7HMNGV54.js";
import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";

// src/app/templates/heist/escape/weekly/expedition-preview.persistence.ts
var EXPEDITION_PREVIEW_SESSION = new InjectionToken(
  "EXPEDITION_PREVIEW_SESSION"
);
var EXPEDITION_PREVIEW_PERSISTENCE = new InjectionToken(
  "EXPEDITION_PREVIEW_PERSISTENCE"
);
function changedSetting(before, after) {
  const difference = (a, b, path) => {
    if (a === b) return void 0;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return `${path}.length`;
      for (let i = 0; i < a.length; i++) {
        const found = difference(a[i], b[i], `${path}[${i}]`);
        if (found) return found;
      }
      return void 0;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      const x = a, y = b;
      for (const key of /* @__PURE__ */ new Set([...Object.keys(x), ...Object.keys(y)])) {
        const found = difference(x[key], y[key], `${path}.${key}`);
        if (found) return found;
      }
      return void 0;
    }
    return path;
  };
  try {
    return difference(JSON.parse(before), JSON.parse(after), "steps") ?? "descriptive settings";
  } catch {
    return "package fingerprint";
  }
}
var LocalExpeditionPreviewAdapter = class {
  key;
  fingerprint;
  constructor(session, mission) {
    if (session.mode !== "preview" || session.authorityMode !== "localDemo")
      throw new Error("PERMISSION_DENIED: local authoring preview required");
    this.key = "forge:heist:expedition-preview:1:" + JSON.stringify([
      session.tenantId,
      session.classId,
      session.projectId,
      session.projectVersion,
      session.actorId,
      session.teamId,
      session.attemptId
    ]);
    this.fingerprint = JSON.stringify(mission.steps);
  }
  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw) return void 0;
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("fingerprint" in value) || typeof value.fingerprint !== "string" || value.fingerprint !== this.fingerprint && !acceptsPistonUpgrade(value.fingerprint, this.fingerprint) && !acceptsTimingCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsFractionCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsGearCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsOpticsCageUpgrade(value.fingerprint, this.fingerprint) && !acceptsBridgeCageUpgrade(value.fingerprint, this.fingerprint) || !("snapshot" in value))
      throw new Error(
        "STATE_CONFLICT: preview settings do not match this package" + (value && typeof value === "object" && "fingerprint" in value && typeof value.fingerprint === "string" ? ` (${changedSetting(value.fingerprint, this.fingerprint)})` : "")
      );
    return value.snapshot;
  }
  save(snapshot) {
    localStorage.setItem(this.key, JSON.stringify({ fingerprint: this.fingerprint, snapshot }));
  }
};

export {
  EXPEDITION_PREVIEW_SESSION,
  EXPEDITION_PREVIEW_PERSISTENCE,
  LocalExpeditionPreviewAdapter
};
//# debugId=97c2ab35-c91d-545a-9c06-65046445a40f
//# sourceMappingURL=chunk-DCCGK2JP.js.map
