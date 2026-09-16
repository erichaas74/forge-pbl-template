import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/core/registries/registry.ts
var Registry = class {
  constructor(name) {
    this.name = name;
  }
  name;
  entries = /* @__PURE__ */ new Map();
  register(entry) {
    if (entry.id.length === 0 || entry.id.trim() !== entry.id) {
      return this.failure(
        "INVALID_REGISTRATION_ID",
        entry.id,
        `Registry "${this.name}" requires a non-empty ID without surrounding whitespace.`
      );
    }
    if (this.entries.has(entry.id)) {
      return this.failure(
        "DUPLICATE_REGISTRATION",
        entry.id,
        `Registration "${entry.id}" already exists in registry "${this.name}".`
      );
    }
    const storedEntry = Object.freeze(__spreadValues({}, entry));
    this.entries.set(entry.id, storedEntry);
    return { ok: true, value: storedEntry };
  }
  registerAll(entries) {
    return entries.map((entry) => this.register(entry));
  }
  has(id) {
    return this.entries.has(id);
  }
  get(id) {
    return this.entries.get(id);
  }
  resolve(id) {
    const entry = this.entries.get(id);
    if (entry === void 0) {
      return this.failure(
        "REGISTRATION_NOT_FOUND",
        id,
        `Registration "${id}" was not found in registry "${this.name}".`
      );
    }
    return { ok: true, value: entry };
  }
  list() {
    return Object.freeze(
      [...this.entries.values()].sort(
        (left, right) => left.id.localeCompare(right.id)
      )
    );
  }
  failure(code, id, message) {
    return {
      ok: false,
      error: Object.freeze({ code, registry: this.name, id, message })
    };
  }
};

// src/app/core/registries/specialized-registries.ts
var CapabilityRegistry = class extends Registry {
  constructor() {
    super("capabilities");
  }
};
var EventRegistry = class extends Registry {
  constructor() {
    super("events");
  }
};
var ConditionRegistry = class extends Registry {
  constructor() {
    super("conditions");
  }
};
var CommandHandlerRegistry = class extends Registry {
  constructor() {
    super("command-handlers");
  }
};
var EventCommandRegistry = class extends Registry {
  constructor() {
    super("event-command-producers");
  }
};
var ActionRegistry = class extends Registry {
  constructor() {
    super("actions");
  }
};

export {
  Registry,
  CapabilityRegistry,
  EventRegistry,
  ConditionRegistry,
  CommandHandlerRegistry,
  EventCommandRegistry,
  ActionRegistry
};
//# debugId=cefe6f65-f47d-55e1-a387-01b88bd5c026
//# sourceMappingURL=chunk-2WXJ5NX3.js.map
