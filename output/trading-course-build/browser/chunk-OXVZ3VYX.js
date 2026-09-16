// src/app/shared/persistence/scoped-browser-store.ts
var ScopedBrowserStore = class {
  constructor(namespace, storage, validate) {
    this.namespace = namespace;
    this.storage = storage;
    this.validate = validate;
  }
  namespace;
  storage;
  validate;
  load(scope) {
    const raw = this.storage?.getItem(this.key(scope));
    if (raw === void 0 || raw === null) return void 0;
    try {
      const value = JSON.parse(raw);
      return this.validate(value) ? value : void 0;
    } catch {
      return void 0;
    }
  }
  save(scope, value) {
    this.storage?.setItem(this.key(scope), JSON.stringify(value));
  }
  clear(scope) {
    this.storage?.removeItem(this.key(scope));
  }
  key(scope) {
    return [
      "forge",
      this.namespace,
      scope.tenantId,
      scope.projectId,
      scope.projectVersion,
      scope.classId ?? "",
      scope.actorId ?? "",
      scope.teamId ?? "",
      scope.attemptId ?? "",
      scope.sessionId ?? ""
    ].map(encodeURIComponent).join(":");
  }
};
function safeBrowserStorage() {
  try {
    return typeof localStorage === "undefined" ? void 0 : localStorage;
  } catch {
    return void 0;
  }
}

export {
  ScopedBrowserStore,
  safeBrowserStorage
};
//# debugId=bd20cd84-224d-5c3a-8c4b-c58dc8595bbd
//# sourceMappingURL=chunk-OXVZ3VYX.js.map
