import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";

// src/app/templates/journey-replay/persistence/journey-path.persistence.ts
var key = (scope) => `forge:journey-path:1:${JSON.stringify([scope.tenantId, scope.classId, scope.studentId, scope.projectId, scope.projectVersion])}`;
var MemoryJourneyPathPersistence = class {
  records = /* @__PURE__ */ new Map();
  load(scope) {
    const state = this.records.get(key(scope));
    return state && structuredClone(state);
  }
  save(scope, state) {
    this.records.set(key(scope), structuredClone(state));
  }
};
var BrowserJourneyPathPersistence = class {
  load(scope) {
    const value = localStorage.getItem(key(scope));
    return value ? JSON.parse(value) : void 0;
  }
  save(scope, state) {
    localStorage.setItem(key(scope), JSON.stringify(state));
  }
};
var JOURNEY_PATH_PERSISTENCE = new InjectionToken(
  "JOURNEY_PATH_PERSISTENCE",
  { providedIn: "root", factory: () => new MemoryJourneyPathPersistence() }
);

export {
  BrowserJourneyPathPersistence,
  JOURNEY_PATH_PERSISTENCE
};
//# debugId=9879d853-9ec3-559f-b4f6-35b5f9e676c6
//# sourceMappingURL=chunk-Q7O3ZRXD.js.map
