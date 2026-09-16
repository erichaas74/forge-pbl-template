import {
  requirePreviewState
} from "./chunk-VU6DZYCP.js";
import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";

// src/app/templates/heist/restoration/weekly/restoration-preview.persistence.ts
var RESTORATION_PREVIEW_SESSION = new InjectionToken("RESTORATION_PREVIEW_SESSION");
var RESTORATION_PREVIEW_PERSISTENCE = new InjectionToken("RESTORATION_PREVIEW_PERSISTENCE");
var LocalRestorationPreviewAdapter = class {
  constructor(session, mission) {
    this.mission = mission;
    this.key = "forge:restoration:weekly:1:" + JSON.stringify([session.tenantId, session.classId, session.projectId, session.projectVersion, session.actorId, session.teamId, session.attemptId]);
  }
  mission;
  key;
  load() {
    const raw = localStorage.getItem(this.key);
    return raw === null ? void 0 : requirePreviewState(JSON.parse(raw), this.mission);
  }
  save(state) {
    localStorage.setItem(this.key, JSON.stringify(state));
  }
};

export {
  RESTORATION_PREVIEW_SESSION,
  RESTORATION_PREVIEW_PERSISTENCE,
  LocalRestorationPreviewAdapter
};
//# debugId=dbcd1504-42c0-58ce-9a2a-547dbf2ea3f9
//# sourceMappingURL=chunk-4FYN5UCY.js.map
