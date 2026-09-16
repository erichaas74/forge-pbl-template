import {
  PROJECT_CATALOG_ENTRY,
  PROJECT_DEFINITION,
  PROJECT_SESSION_CONTEXT
} from "./chunk-CN67HRIA.js";
import {
  DeterministicRuleEngine,
  RuntimeEventBus,
  runtimeError,
  runtimeScopeKey
} from "./chunk-PJ67YSEX.js";
import {
  projectSessionRuntimeScope
} from "./chunk-G626JLCU.js";
import {
  ActionRegistry,
  CapabilityRegistry,
  CommandHandlerRegistry,
  ConditionRegistry,
  EventCommandRegistry,
  EventRegistry,
  Registry
} from "./chunk-2WXJ5NX3.js";
import {
  Inject,
  Injectable,
  Optional,
  ReplaySubject,
  Subject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-E2VJWGUE.js";
import {
  mysterySubstanceLocation,
  mysterySubstanceProjectPackage
} from "./chunk-EOGBHGAA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/infrastructure/persistence/in-memory-project-package-source.ts
var InMemoryProjectPackageSource = class {
  constructor(packages) {
    this.packages = packages;
  }
  packages;
  async read(location, fileName) {
    const packageFiles = this.packages[location.reference];
    const value = packageFiles?.[fileName];
    return value === void 0 ? void 0 : structuredClone(value);
  }
};

// src/app/core/state/state-mutation-applier.ts
var forbiddenSegments = /* @__PURE__ */ new Set(["__proto__", "prototype", "constructor"]);
function applyStateMutations(state, mutations) {
  const working = structuredClone(state);
  for (const mutation of mutations) {
    const result = applyMutation(working, mutation);
    if (result !== void 0) {
      return { success: false, state: structuredClone(state), errors: [result] };
    }
  }
  return { success: true, state: working };
}
function applyMutation(target, mutation) {
  const segments = parsePointer(mutation.path);
  if (segments.length === 0 || segments.some((segment) => forbiddenSegments.has(segment))) {
    return runtimeError(
      "INVALID_MUTATION_PATH",
      `Mutation path "${mutation.path}" is invalid.`
    );
  }
  let parent = target;
  for (const segment of segments.slice(0, -1)) {
    if (!isContainer(parent)) {
      return runtimeError(
        "INVALID_MUTATION_PATH",
        `Mutation path "${mutation.path}" does not resolve to a container.`
      );
    }
    parent = parent[segment];
  }
  if (!isContainer(parent)) {
    return runtimeError(
      "INVALID_MUTATION_PATH",
      `Mutation path "${mutation.path}" does not resolve to a writable target.`
    );
  }
  const key = segments[segments.length - 1];
  if (key === void 0) {
    return runtimeError("INVALID_MUTATION_PATH", "Mutation path has no target.");
  }
  const current = parent[key];
  switch (mutation.operation) {
    case "set":
      parent[key] = structuredClone(mutation.value);
      return void 0;
    case "increment":
    case "decrement": {
      if (typeof current !== "number" || typeof mutation.value !== "number") {
        return runtimeError(
          "INVALID_MUTATION_VALUE",
          `${mutation.operation} requires numeric current and mutation values.`
        );
      }
      parent[key] = mutation.operation === "increment" ? current + mutation.value : current - mutation.value;
      return void 0;
    }
    case "toggle":
      if (typeof current !== "boolean") {
        return runtimeError("INVALID_MUTATION_VALUE", "toggle requires a boolean target.");
      }
      parent[key] = !current;
      return void 0;
    case "append":
      if (!Array.isArray(current)) {
        return runtimeError("INVALID_MUTATION_VALUE", "append requires an array target.");
      }
      current.push(structuredClone(mutation.value));
      return void 0;
    case "add":
      if (!Array.isArray(current)) {
        return runtimeError("INVALID_MUTATION_VALUE", "add requires an array target.");
      }
      if (!current.some((value) => Object.is(value, mutation.value))) {
        current.push(structuredClone(mutation.value));
      }
      return void 0;
    case "remove":
      if (!Array.isArray(current)) {
        return runtimeError("INVALID_MUTATION_VALUE", "remove requires an array target.");
      }
      parent[key] = current.filter((value) => !Object.is(value, mutation.value));
      return void 0;
  }
}
function parsePointer(pointer2) {
  if (!pointer2.startsWith("/")) {
    return [];
  }
  return pointer2.slice(1).split("/").map((segment) => segment.replaceAll("~1", "/").replaceAll("~0", "~"));
}
function isContainer(value) {
  return typeof value === "object" && value !== null;
}
function pointer(...segments) {
  return `/${segments.map((segment) => segment.replaceAll("~", "~0").replaceAll("/", "~1")).join("/")}`;
}

// src/app/core/time/clock.ts
var SystemClock = class {
  now() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
};

// src/app/infrastructure/persistence/browser-runtime-persistence.adapter.ts
var BrowserRuntimePersistenceAdapter = class {
  constructor(storage, clock = new SystemClock(), prefix = "forge-pbl.runtime.v1") {
    this.storage = storage;
    this.clock = clock;
    this.prefix = prefix;
  }
  storage;
  clock;
  prefix;
  async initializeRuntime(scope, snapshot, overwrite = false) {
    const existing = this.read(scope);
    if (existing !== void 0 && !overwrite) {
      const hydrated = __spreadValues(__spreadValues({}, structuredClone(snapshot)), structuredClone(existing));
      this.write(scope, hydrated);
      return this.success(existing.version, existing.version, hydrated, false);
    }
    const stored = structuredClone(snapshot);
    this.write(scope, stored);
    return this.success(stored.version, stored.version, stored, true);
  }
  async loadRuntime(scope) {
    const snapshot = this.read(scope);
    if (snapshot === void 0) {
      throw new Error(`Runtime scope "${runtimeScopeKey(scope)}" is not initialized.`);
    }
    return structuredClone(snapshot);
  }
  async saveRuntime(scope, mutations, expectedVersion) {
    const current = this.read(scope);
    if (current === void 0) {
      return {
        success: false,
        applied: false,
        previousVersion: expectedVersion,
        errors: [
          runtimeError(
            "RUNTIME_NOT_FOUND",
            `Runtime scope "${runtimeScopeKey(scope)}" is not initialized.`
          )
        ]
      };
    }
    if (current.version !== expectedVersion) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        conflict: true,
        errors: [
          runtimeError(
            "STATE_CONFLICT",
            `Expected runtime version ${expectedVersion}, but current version is ${current.version}.`
          )
        ]
      };
    }
    const applied = applyStateMutations(current, mutations);
    if (!applied.success) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        errors: applied.errors
      };
    }
    const next = applied.state;
    next.version = current.version + 1;
    next.lastUpdated = this.clock.now();
    this.write(scope, next);
    return this.success(current.version, next.version, next, true);
  }
  async resetRuntime(scope) {
    this.storage.removeItem(this.key(scope));
  }
  read(scope) {
    const raw = this.storage.getItem(this.key(scope));
    if (raw === null) {
      return void 0;
    }
    try {
      const value = JSON.parse(raw);
      return isRuntimeState(value) ? value : void 0;
    } catch {
      return void 0;
    }
  }
  write(scope, snapshot) {
    this.storage.setItem(this.key(scope), JSON.stringify(snapshot));
  }
  key(scope) {
    return `${this.prefix}:${runtimeScopeKey(scope)}`;
  }
  success(previousVersion, newVersion, snapshot, applied) {
    return {
      success: true,
      applied,
      previousVersion,
      newVersion,
      version: newVersion,
      snapshot: structuredClone(snapshot)
    };
  }
};
function isRuntimeState(value) {
  return typeof value === "object" && value !== null && typeof value.version === "number" && typeof value.tenantId === "string" && typeof value.projectId === "string" && typeof value.projectVersion === "string";
}

// src/app/infrastructure/persistence/in-memory-runtime-persistence.adapter.ts
var InMemoryRuntimePersistenceAdapter = class {
  constructor(clock = new SystemClock()) {
    this.clock = clock;
  }
  clock;
  snapshots = /* @__PURE__ */ new Map();
  async initializeRuntime(scope, snapshot, overwrite = false) {
    const key = runtimeScopeKey(scope);
    const existing = this.snapshots.get(key);
    if (existing !== void 0 && !overwrite) {
      return this.success(existing.version, existing.version, existing, false);
    }
    const stored = structuredClone(snapshot);
    this.snapshots.set(key, stored);
    return this.success(stored.version, stored.version, stored, true);
  }
  async loadRuntime(scope) {
    const snapshot = this.snapshots.get(runtimeScopeKey(scope));
    if (snapshot === void 0) {
      throw new Error(`Runtime scope "${runtimeScopeKey(scope)}" is not initialized.`);
    }
    return structuredClone(snapshot);
  }
  async saveRuntime(scope, mutations, expectedVersion) {
    const key = runtimeScopeKey(scope);
    const current = this.snapshots.get(key);
    if (current === void 0) {
      return {
        success: false,
        applied: false,
        previousVersion: expectedVersion,
        errors: [
          runtimeError("RUNTIME_NOT_FOUND", `Runtime scope "${key}" is not initialized.`)
        ]
      };
    }
    if (current.version !== expectedVersion) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        conflict: true,
        errors: [
          runtimeError(
            "STATE_CONFLICT",
            `Expected runtime version ${expectedVersion}, but current version is ${current.version}.`
          )
        ]
      };
    }
    const applied = applyStateMutations(current, mutations);
    if (!applied.success) {
      return {
        success: false,
        applied: false,
        previousVersion: current.version,
        errors: applied.errors
      };
    }
    const next = applied.state;
    next.version = current.version + 1;
    next.lastUpdated = this.clock.now();
    this.snapshots.set(key, structuredClone(next));
    return this.success(current.version, next.version, next, true);
  }
  async resetRuntime(scope) {
    this.snapshots.delete(runtimeScopeKey(scope));
  }
  success(previousVersion, newVersion, snapshot, applied) {
    return {
      success: true,
      applied,
      previousVersion,
      newVersion,
      version: newVersion,
      snapshot: structuredClone(snapshot)
    };
  }
};

// src/app/core/commands/command-executor.ts
var RegisteredCommandExecutor = class {
  constructor(handlers, authorization, clock = new SystemClock()) {
    this.handlers = handlers;
    this.authorization = authorization;
    this.clock = clock;
  }
  handlers;
  authorization;
  clock;
  async execute(commands, state, context) {
    let working = structuredClone(state);
    const mutations = [];
    const derivedEvents = [];
    const executedCommands = [];
    const requiresAuthoritativeConfirmation = [];
    const errors = [];
    for (const command of commands) {
      const registration = this.handlers.get(command.commandType);
      if (registration === void 0) {
        errors.push(
          runtimeError(
            "INVALID_COMMAND",
            `Command type "${command.commandType}" has no registered handler.`,
            { sourceId: command.targetId }
          )
        );
        break;
      }
      const authorizationError = this.authorization?.authorize(
        command,
        working,
        context
      );
      if (authorizationError !== void 0) {
        errors.push(authorizationError);
        break;
      }
      if (registration.authority === "serverRequired" && context.authorityMode !== "serverConfirmed") {
        requiresAuthoritativeConfirmation.push(command);
        if (context.allowLocalAuthorityBypass !== true) {
          errors.push(
            runtimeError(
              "AUTHORITATIVE_CONFIRMATION_REQUIRED",
              `Command "${command.commandType}" must be confirmed by the authoritative server.`,
              { sourceId: command.targetId }
            )
          );
          break;
        }
      }
      let handled;
      try {
        handled = registration.handler.execute(command, working, context);
      } catch {
        errors.push(
          runtimeError(
            "COMMAND_HANDLER_FAILED",
            `Command handler "${command.commandType}" failed safely.`,
            { sourceId: command.targetId }
          )
        );
        break;
      }
      if (handled.errors !== void 0 && handled.errors.length > 0) {
        errors.push(...handled.errors);
        break;
      }
      const applied = applyStateMutations(working, handled.mutations);
      if (!applied.success) {
        errors.push(...applied.errors ?? []);
        break;
      }
      working = applied.state;
      mutations.push(...handled.mutations);
      derivedEvents.push(...handled.derivedEvents ?? []);
      executedCommands.push(command);
    }
    if (errors.length > 0) {
      return {
        success: false,
        snapshot: structuredClone(state),
        executedCommands: [],
        mutations: [],
        requiresAuthoritativeConfirmation: requiresAuthoritativeConfirmation.length > 0 ? requiresAuthoritativeConfirmation : void 0,
        errors
      };
    }
    if (mutations.length > 0) {
      working.version = state.version + 1;
      working.lastUpdated = this.clock.now();
    }
    return {
      success: true,
      snapshot: working,
      executedCommands,
      mutations,
      derivedEvents,
      requiresAuthoritativeConfirmation
    };
  }
};

// src/app/core/commands/core-state-command-pack.ts
var coreStateCommandTypes = [
  "state.set",
  "state.increment",
  "state.decrement",
  "state.toggle",
  "state.addToList",
  "state.removeFromList"
];
function registerCoreStateCommandPack(actions, commands) {
  for (const commandType of coreStateCommandTypes) {
    actions.register({
      id: commandType,
      version: "1.0.0",
      status: "core",
      handler: passthroughAction(commandType)
    });
    commands.register({
      id: commandType,
      version: "1.0.0",
      status: "core",
      authority: "local",
      handler: {
        commandType,
        execute: (command, state, context) => handleStateCommand(command, state, context)
      }
    });
  }
  commands.register({
    id: "runtime.markRuleFired",
    version: "1.0.0",
    status: "core",
    authority: "local",
    handler: {
      commandType: "runtime.markRuleFired",
      execute: (command) => command.targetId === void 0 ? failure("INVALID_COMMAND", "runtime.markRuleFired requires targetId.") : {
        mutations: [
          {
            operation: "add",
            path: "/firedRuleIds",
            value: command.targetId
          }
        ]
      }
    }
  });
}
function passthroughAction(type) {
  return {
    type,
    createCommands: (action) => [
      {
        commandType: type,
        targetId: action.targetId,
        value: action.value,
        params: action.params
      }
    ]
  };
}
function handleStateCommand(command, state, context) {
  const id = command.targetId;
  if (id === void 0) {
    return failure("INVALID_COMMAND", `${command.commandType} requires targetId.`);
  }
  const definition = context.stateDefinitions?.get(id);
  if (definition === void 0) {
    return failure(
      "STATE_VARIABLE_NOT_FOUND",
      `State variable "${id}" is not declared.`,
      id
    );
  }
  if (definition.mutable === false) {
    return failure("STATE_VARIABLE_IMMUTABLE", `State variable "${id}" is immutable.`, id);
  }
  const current = state.stateValues[id];
  let next;
  switch (command.commandType) {
    case "state.set":
      next = command.value;
      break;
    case "state.increment":
    case "state.decrement": {
      if (typeof current !== "number" || typeof command.value !== "number") {
        return failure(
          "INVALID_STATE_OPERATION",
          `${command.commandType} requires numeric state and value.`,
          id
        );
      }
      next = command.commandType === "state.increment" ? current + command.value : current - command.value;
      break;
    }
    case "state.toggle":
      if (typeof current !== "boolean") {
        return failure("INVALID_STATE_OPERATION", "state.toggle requires boolean state.", id);
      }
      next = !current;
      break;
    case "state.addToList":
      if (!Array.isArray(current)) {
        return failure("INVALID_STATE_OPERATION", "state.addToList requires list state.", id);
      }
      next = current.some((value) => Object.is(value, command.value)) ? [...current] : [...current, command.value];
      break;
    case "state.removeFromList":
      if (!Array.isArray(current)) {
        return failure(
          "INVALID_STATE_OPERATION",
          "state.removeFromList requires list state.",
          id
        );
      }
      next = current.filter((value) => !Object.is(value, command.value));
      break;
    default:
      return failure("INVALID_COMMAND", `Unsupported state command "${command.commandType}".`, id);
  }
  const validationError = validateStateValue(definition, next);
  if (validationError !== void 0) {
    return { mutations: [], errors: [validationError] };
  }
  return {
    mutations: [{ operation: "set", path: pointer("stateValues", id), value: next }]
  };
}
function validateStateValue(definition, value) {
  const typeValid = definition.stateType === "boolean" && typeof value === "boolean" || (definition.stateType === "number" || definition.stateType === "counter") && typeof value === "number" && Number.isFinite(value) || (definition.stateType === "string" || definition.stateType === "choice" || definition.stateType === "status") && typeof value === "string" || definition.stateType === "list" && Array.isArray(value);
  if (!typeValid) {
    return runtimeError(
      "INVALID_STATE_VALUE",
      `Value for state "${definition.id}" does not match type "${definition.stateType}".`,
      { sourceId: definition.id }
    );
  }
  if (definition.allowedValues !== void 0 && definition.stateType !== "list" && !definition.allowedValues.some((allowed) => Object.is(allowed, value))) {
    return runtimeError(
      "INVALID_STATE_VALUE",
      `Value for state "${definition.id}" is not allowed.`,
      { sourceId: definition.id }
    );
  }
  if (typeof value === "number") {
    if (definition.min !== void 0 && value < definition.min) {
      return runtimeError("STATE_MIN_EXCEEDED", `State "${definition.id}" is below minimum.`, {
        sourceId: definition.id
      });
    }
    if (definition.max !== void 0 && value > definition.max) {
      return runtimeError("STATE_MAX_EXCEEDED", `State "${definition.id}" exceeds maximum.`, {
        sourceId: definition.id
      });
    }
  }
  return void 0;
}
function failure(code, message, sourceId) {
  return {
    mutations: [],
    errors: [runtimeError(code, message, { sourceId })]
  };
}

// src/app/core/events/idempotency-store.ts
var InMemoryIdempotencyStore = class {
  constructor(maximumEntries = 1e3) {
    this.maximumEntries = maximumEntries;
  }
  maximumEntries;
  results = /* @__PURE__ */ new Map();
  order = [];
  get(scope, key) {
    const result = this.results.get(this.key(scope, key));
    return result === void 0 ? void 0 : structuredClone(result);
  }
  record(scope, key, result) {
    const storageKey = this.key(scope, key);
    if (!this.results.has(storageKey)) {
      this.order.push(storageKey);
    }
    this.results.set(storageKey, structuredClone(result));
    while (this.order.length > this.maximumEntries) {
      const oldest = this.order.shift();
      if (oldest !== void 0) {
        this.results.delete(oldest);
      }
    }
  }
  clear(scope) {
    if (scope === void 0) {
      this.results.clear();
      this.order.length = 0;
      return;
    }
    const prefix = `${runtimeScopeKey(scope)}::`;
    for (const key of [...this.results.keys()]) {
      if (key.startsWith(prefix)) {
        this.results.delete(key);
      }
    }
    for (let index = this.order.length - 1; index >= 0; index -= 1) {
      if (this.order[index]?.startsWith(prefix)) {
        this.order.splice(index, 1);
      }
    }
  }
  key(scope, key) {
    return `${runtimeScopeKey(scope)}::${key}`;
  }
};

// src/app/core/events/runtime-event-log.ts
var RuntimeEventLog = class {
  constructor(maximumEventsPerScope = 250) {
    this.maximumEventsPerScope = maximumEventsPerScope;
  }
  maximumEventsPerScope;
  events = /* @__PURE__ */ new Map();
  append(scope, event) {
    const key = runtimeScopeKey(scope);
    const entries = this.events.get(key) ?? [];
    entries.push(structuredClone(event));
    if (entries.length > this.maximumEventsPerScope) {
      entries.shift();
    }
    this.events.set(key, entries);
  }
  list(scope) {
    return structuredClone(this.events.get(runtimeScopeKey(scope)) ?? []);
  }
};

// src/app/core/packages/project-package-loader.service.ts
var ProjectPackageLoaderService = class {
  constructor(source, assembler, descriptor, validation, registryView) {
    this.source = source;
    this.assembler = assembler;
    this.descriptor = descriptor;
    this.validation = validation;
    this.registryView = registryView;
  }
  source;
  assembler;
  descriptor;
  validation;
  registryView;
  cache = /* @__PURE__ */ new Map();
  async load(location) {
    const cacheKey = this.cacheKey(location);
    const cached = this.cache.get(cacheKey);
    if (cached !== void 0) {
      return { graph: cached.graph, issues: [...cached.issues], fromCache: true };
    }
    const files = {};
    const issues = [];
    const required = [...new Set(this.descriptor.requiredFiles)];
    const optional = [...new Set(this.descriptor.optionalFiles)].filter(
      (fileName) => !required.includes(fileName)
    );
    const entries = await Promise.all(
      [...required, ...optional].map(async (fileName) => {
        try {
          return {
            fileName,
            value: await this.source.read(location, fileName),
            required: required.includes(fileName),
            error: void 0
          };
        } catch (error) {
          return {
            fileName,
            value: void 0,
            required: required.includes(fileName),
            error
          };
        }
      })
    );
    for (const { fileName, value, required: isRequired, error } of entries) {
      if (error !== void 0) {
        issues.push({
          code: "PACKAGE_FILE_READ_FAILED",
          severity: "error",
          file: fileName,
          message: `Project package file "${fileName}" could not be read.`
        });
        continue;
      }
      if (value === void 0) {
        if (isRequired) {
          issues.push({
            code: "REQUIRED_FILE_MISSING",
            severity: "error",
            file: fileName,
            message: `Required project package file "${fileName}" is missing.`
          });
        }
      } else {
        files[fileName] = value;
      }
    }
    if (issues.length > 0) {
      return { issues, fromCache: false };
    }
    const assembled = this.assembler.assemble(
      location,
      Object.freeze(files)
    );
    issues.push(...assembled.issues);
    if (assembled.graph === void 0) {
      return { issues, fromCache: false };
    }
    issues.push(...this.validation.validate(assembled.graph, this.registryView));
    if (issues.some((issue) => issue.severity === "error")) {
      return { graph: assembled.graph, issues, fromCache: false };
    }
    const graph = deepFreeze(assembled.graph);
    this.cache.set(cacheKey, { graph, issues: Object.freeze([...issues]) });
    return { graph, issues, fromCache: false };
  }
  clearCache(location) {
    if (location === void 0) {
      this.cache.clear();
    } else {
      this.cache.delete(this.cacheKey(location));
    }
  }
  cacheKey(location) {
    return [
      location.tenantId,
      `${location.projectId}@${location.projectVersion}`,
      location.reference
    ].join("::");
  }
};
function deepFreeze(value) {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const nested of Object.values(value)) {
    deepFreeze(nested);
  }
  return value;
}

// src/app/core/tracing/runtime-tracer.ts
var NoopRuntimeTracer = class {
  trace(_entry) {
  }
};
var MemoryRuntimeTracer = class {
  constructor(maximumEntries = 250) {
    this.maximumEntries = maximumEntries;
  }
  maximumEntries;
  entries = [];
  trace(entry) {
    this.entries.push(structuredClone(entry));
    if (this.entries.length > this.maximumEntries) {
      this.entries.shift();
    }
  }
  list() {
    return structuredClone(this.entries);
  }
};

// src/app/core/runtime/runtime-engine.ts
var RuntimeEngine = class {
  constructor(eventBus, state, ruleEngine, commandExecutor, eventCommands, definitionAdapter2, idempotency = new InMemoryIdempotencyStore(), eventLog = new RuntimeEventLog(), tracer = new NoopRuntimeTracer(), maximumDerivedEventDepth = 8, authorityPolicy = { mode: "localMock" }) {
    this.eventBus = eventBus;
    this.state = state;
    this.ruleEngine = ruleEngine;
    this.commandExecutor = commandExecutor;
    this.eventCommands = eventCommands;
    this.definitionAdapter = definitionAdapter2;
    this.idempotency = idempotency;
    this.eventLog = eventLog;
    this.tracer = tracer;
    this.maximumDerivedEventDepth = maximumDerivedEventDepth;
    this.authorityPolicy = authorityPolicy;
  }
  eventBus;
  state;
  ruleEngine;
  commandExecutor;
  eventCommands;
  definitionAdapter;
  idempotency;
  eventLog;
  tracer;
  maximumDerivedEventDepth;
  authorityPolicy;
  inFlight = /* @__PURE__ */ new Map();
  async dispatch(scope, event, definitions) {
    const idempotencyKey = event.clientEventId ?? event.id;
    const inFlightKey = `${runtimeScopeKey(scope)}::${idempotencyKey}`;
    const pending = this.inFlight.get(inFlightKey);
    if (pending !== void 0) {
      return this.duplicateResult(await pending, event, idempotencyKey);
    }
    const operation = this.process(scope, event, definitions, 0);
    this.inFlight.set(inFlightKey, operation);
    try {
      return await operation;
    } finally {
      this.inFlight.delete(inFlightKey);
    }
  }
  async process(scope, event, definitions, depth) {
    if (depth > this.maximumDerivedEventDepth) {
      return {
        event,
        errors: [
          runtimeError(
            "DERIVED_EVENT_DEPTH_EXCEEDED",
            `Derived event processing exceeded depth ${this.maximumDerivedEventDepth}.`,
            { sourceId: event.id }
          )
        ]
      };
    }
    const idempotencyKey = event.clientEventId ?? event.id;
    const previous = this.idempotency.get(scope, idempotencyKey);
    if (previous !== void 0) {
      return this.duplicateResult(previous, event, idempotencyKey);
    }
    const snapshot = this.state.getSnapshot(scope);
    if (snapshot === void 0) {
      return {
        event,
        errors: [
          runtimeError("RUNTIME_NOT_FOUND", "Runtime scope must be initialized before dispatch.")
        ]
      };
    }
    if (snapshot.tenantId !== event.tenantId || snapshot.tenantId !== scope.tenantId || snapshot.tenantId !== this.definitionAdapter.tenantId(definitions) || snapshot.projectId !== event.projectId || snapshot.projectId !== scope.projectId || snapshot.projectVersion !== scope.projectVersion || event.attemptId !== scope.attemptId) {
      return {
        event,
        snapshot,
        errors: [
          runtimeError(
            "EVENT_SCOPE_MISMATCH",
            "Event, runtime snapshot, and scope do not identify the same project version.",
            { sourceId: event.id }
          )
        ]
      };
    }
    const published = this.eventBus.publish(scope, event);
    if (!published.accepted) {
      return { event, snapshot, errors: published.errors };
    }
    this.eventLog.append(scope, event);
    const errors = [];
    const producer = this.eventCommands.get(event.eventType)?.producer;
    let direct = {
      commands: []
    };
    try {
      direct = producer?.createCommands(event, snapshot, {
        tenantId: snapshot.tenantId,
        projectId: snapshot.projectId,
        projectVersion: snapshot.projectVersion,
        definitions
      }) ?? { commands: [] };
    } catch {
      direct = {
        commands: [],
        errors: [
          runtimeError(
            "EVENT_COMMAND_PRODUCER_FAILED",
            `Event command producer for "${event.eventType}" failed safely.`,
            { sourceId: event.id }
          )
        ]
      };
    }
    errors.push(...direct.errors ?? []);
    const executionContext = {
      tenantId: snapshot.tenantId,
      projectId: snapshot.projectId,
      projectVersion: snapshot.projectVersion,
      requestId: event.id,
      eventTimestamp: event.timestamp,
      actor: event.actor,
      scope,
      definitions,
      stateDefinitions: this.definitionAdapter.stateDefinitions(definitions),
      authorityMode: this.authorityPolicy.mode,
      allowLocalAuthorityBypass: this.authorityPolicy.allowLocalAuthorityBypass
    };
    const directPreview = await this.commandExecutor.execute(
      direct.commands,
      snapshot,
      executionContext
    );
    errors.push(...directPreview.errors ?? []);
    const ruleState = directPreview.success ? directPreview.snapshot ?? snapshot : snapshot;
    const rules = this.ruleEngine.evaluateEvent(
      event,
      ruleState,
      this.definitionAdapter.rules(definitions),
      definitions
    );
    errors.push(...rules.errors ?? []);
    if (errors.some((error) => error.severity === "error" || error.severity === "fatal")) {
      const result2 = {
        event,
        matchedRuleIds: rules.matchedRules,
        commands: [],
        snapshot,
        errors
      };
      this.finish(scope, event, result2);
      return result2;
    }
    const commands = [
      ...direct.commands,
      ...rules.commands,
      ...(rules.ruleIdsToMarkFired ?? []).map((ruleId) => ({
        commandType: "runtime.markRuleFired",
        targetId: ruleId
      }))
    ];
    const execution = await this.commandExecutor.execute(
      commands,
      snapshot,
      executionContext
    );
    errors.push(...execution.errors ?? []);
    if (!execution.success) {
      const result2 = {
        event,
        matchedRuleIds: rules.matchedRules,
        commands,
        snapshot,
        errors
      };
      this.finish(scope, event, result2);
      return result2;
    }
    let acceptedSnapshot = snapshot;
    if (execution.mutations.length > 0) {
      const persistence = await this.state.applyMutations(
        scope,
        execution.mutations,
        snapshot.version
      );
      errors.push(...persistence.errors ?? []);
      if (!persistence.success || persistence.snapshot === void 0) {
        const result2 = {
          event,
          matchedRuleIds: rules.matchedRules,
          commands,
          snapshot,
          errors
        };
        this.finish(scope, event, result2);
        return result2;
      }
      acceptedSnapshot = persistence.snapshot;
    }
    for (const derivedEvent of execution.derivedEvents ?? []) {
      const derivedResult = await this.process(
        scope,
        derivedEvent,
        definitions,
        depth + 1
      );
      errors.push(...derivedResult.errors ?? []);
      acceptedSnapshot = derivedResult.snapshot ?? acceptedSnapshot;
    }
    const result = {
      event,
      matchedRuleIds: rules.matchedRules,
      commands,
      snapshot: acceptedSnapshot,
      errors: errors.length === 0 ? void 0 : errors
    };
    this.finish(scope, event, result);
    return result;
  }
  finish(scope, event, result) {
    this.idempotency.record(scope, event.clientEventId ?? event.id, result);
    this.tracer.trace({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      eventId: event.id,
      eventType: event.eventType,
      matchedRuleIds: result.matchedRuleIds,
      commandTypes: result.commands?.map((command) => command.commandType),
      stateVersion: result.snapshot?.version,
      attemptId: scope.attemptId,
      errors: result.errors
    });
  }
  duplicateResult(previous, event, idempotencyKey) {
    return __spreadProps(__spreadValues({}, previous), {
      event,
      duplicate: true,
      errors: [
        ...previous.errors ?? [],
        runtimeError(
          "DUPLICATE_EVENT",
          `Event "${idempotencyKey}" has already been processed for this scope.`,
          { severity: "info", sourceId: event.id }
        )
      ]
    });
  }
};

// src/app/core/state/runtime-state.service.ts
var RuntimeStateService = class {
  constructor(persistence, realtime) {
    this.persistence = persistence;
    this.realtime = realtime;
  }
  persistence;
  realtime;
  snapshots = /* @__PURE__ */ new Map();
  subjects = /* @__PURE__ */ new Map();
  async initialize(scope, snapshot, overwrite = false) {
    const result = await this.persistence.initializeRuntime(
      scope,
      snapshot,
      overwrite
    );
    if (result.success && result.snapshot !== void 0) {
      this.acceptSnapshot(scope, result.snapshot);
    }
    return result;
  }
  async load(scope) {
    const snapshot = await this.persistence.loadRuntime(scope);
    this.acceptSnapshot(scope, snapshot);
    return structuredClone(snapshot);
  }
  getSnapshot(scope) {
    const snapshot = this.snapshots.get(runtimeScopeKey(scope));
    return snapshot === void 0 ? void 0 : structuredClone(snapshot);
  }
  getStateValue(scope, id) {
    return this.snapshots.get(runtimeScopeKey(scope))?.stateValues[id];
  }
  async applyMutations(scope, mutations, expectedVersion) {
    const result = await this.persistence.saveRuntime(
      scope,
      mutations,
      expectedVersion
    );
    if (result.success && result.snapshot !== void 0) {
      this.acceptSnapshot(scope, result.snapshot);
    }
    return result;
  }
  subscribe(scope, callback) {
    const subject = this.subjectFor(scope);
    const subscription = subject.subscribe(callback);
    return () => subscription.unsubscribe();
  }
  async reset(scope) {
    const key = runtimeScopeKey(scope);
    this.snapshots.delete(key);
    const subject = this.subjects.get(key);
    subject?.complete();
    this.subjects.delete(key);
    await this.persistence.resetRuntime(scope);
  }
  acceptSnapshot(scope, snapshot) {
    const copy = structuredClone(snapshot);
    this.snapshots.set(runtimeScopeKey(scope), copy);
    this.subjectFor(scope).next(structuredClone(copy));
    this.realtime?.publish({ scope, topic: "runtime" }, structuredClone(copy));
  }
  subjectFor(scope) {
    const key = runtimeScopeKey(scope);
    let subject = this.subjects.get(key);
    if (subject === void 0) {
      subject = new ReplaySubject(1);
      this.subjects.set(key, subject);
      const current = this.snapshots.get(key);
      if (current !== void 0) {
        subject.next(structuredClone(current));
      }
    }
    return subject;
  }
};

// src/app/core/validation/validation.service.ts
var ValidationService = class {
  validators = new Registry("project-validators");
  register(validator) {
    return this.validators.register({ id: validator.id, validator });
  }
  validate(graph, registry) {
    return this.validators.list().flatMap((entry) => entry.validator.validate(graph, registry));
  }
};

// src/app/infrastructure/realtime/in-memory-realtime.adapter.ts
var InMemoryRealtimeAdapter = class {
  channels = /* @__PURE__ */ new Map();
  subscribe(channel, listener) {
    const subscription = this.subjectFor(channel).subscribe(listener);
    return () => subscription.unsubscribe();
  }
  publish(channel, snapshot) {
    this.subjectFor(channel).next(structuredClone(snapshot));
  }
  subjectFor(channel) {
    const key = `${runtimeScopeKey(channel.scope)}::${channel.topic ?? "runtime"}`;
    let subject = this.channels.get(key);
    if (subject === void 0) {
      subject = new Subject();
      this.channels.set(key, subject);
    }
    return subject;
  }
};

// src/app/infrastructure/storage/in-memory-asset-storage.adapter.ts
var InMemoryAssetStorageAdapter = class {
  assets = /* @__PURE__ */ new Map();
  nextId = 1;
  async upload(input) {
    const id = `asset-local-${this.nextId}`;
    this.nextId += 1;
    const asset = {
      id,
      reference: `memory://${id}`,
      fileName: input.fileName,
      contentType: input.contentType,
      size: input.file.size,
      metadata: input.metadata === void 0 ? void 0 : __spreadValues({}, input.metadata)
    };
    this.assets.set(id, Object.freeze(asset));
    return __spreadValues({}, asset);
  }
  async getReference(assetId) {
    const asset = this.assets.get(assetId);
    if (asset === void 0) {
      throw new Error(`Asset "${assetId}" was not found.`);
    }
    return __spreadValues({}, asset);
  }
};

// src/app/templates/investigation/runtime/investigation-command-handlers.ts
function investigationCommandHandler(commandType) {
  return {
    commandType,
    execute: (command, state, context) => execute(command, state, context)
  };
}
function execute(command, state, context) {
  const graph = context.definitions;
  if (graph === void 0) {
    return failure2("PROJECT_DEFINITION_REQUIRED", "Investigation command requires definitions.");
  }
  switch (command.commandType) {
    case "evidence.unlock":
    case "evidence.reveal":
      return setEvidenceStatus(command, state, graph, "available");
    case "evidence.lock":
      return setEvidenceStatus(command, state, graph, "locked");
    case "evidence.hide":
      return setEvidenceStatus(command, state, graph, "hidden");
    case "evidence.view":
      return setEvidenceStatus(command, state, graph, "viewed", ["available", "unopened"]);
    case "evidence.collect":
      return setEvidenceStatus(command, state, graph, "collected", [
        "available",
        "unopened",
        "viewed"
      ]);
    case "evidence.useInClaim":
      return useEvidenceInFinal(command, state, graph);
    case "evidence.setImportance":
      return setEvidenceImportance(command, state, graph);
    case "evidence.classify":
      return classifyEvidence(command, state, graph);
    case "evidence.annotate":
      return annotateEvidence(command, state, graph);
    case "evidence.connect":
      return connectEvidence(command, state, graph, context);
    case "evidence.disconnect":
      return disconnectEvidence(command, state);
    case "evidence.create":
    case "evidence.studentCreate":
      return createEvidence(command, state, graph, context);
    case "board.createQuestion":
      return createQuestion(command, state, context);
    case "activity.unlock":
      return setActivityStatus(command, state, graph, "notStarted");
    case "activity.lock":
      return setActivityStatus(command, state, graph, "locked");
    case "activity.start":
      return setActivityStatus(command, state, graph, "inProgress");
    case "activity.complete":
      return setActivityStatus(command, state, graph, "complete");
    case "activity.submitResult":
      return submitActivityResult(command, state, graph);
    case "lesson.unlock":
      return setLessonStatus(command, state, graph);
    case "phase.unlock":
      return setPhaseStatus(command, state, graph, "available");
    case "phase.complete":
      return setPhaseStatus(command, state, graph, "complete");
    case "resource.add":
    case "resource.spend":
      return changeResource(command, state, graph);
    case "message.show":
      return appendMessage(command, state, context, false);
    case "teacher.notify":
      return appendMessage(command, state, context, true);
    case "hypothesis.require":
      return setRequirement("hypothesisRequired", command.value ?? true);
    case "revision.require":
      return setRequirement("revisionRequired", command.value ?? true);
    case "finalSubmission.open":
      return setFinalStatus("open");
    case "finalSubmission.close":
      return setFinalStatus("closed");
    case "finalSubmission.submit":
      return submitFinal(state, context);
    case "finalSubmission.updateDraft":
      return updateFinalDraft(command, state);
    case "solution.reveal":
      return { mutations: [{ operation: "set", path: "/solutionRevealed", value: true }] };
    case "npc.unlockDialogue":
      return unlockDialogue(command, state, graph);
    case "npc.completeDialogue":
      return completeDialogue(command, state, graph);
    case "hypothesis.create":
      return createHypothesis(command, state, context);
    case "hypothesis.revise":
      return reviseHypothesis(command, state, context);
    case "hypothesis.select":
      return selectHypothesis(command, state);
    case "hypothesis.rank":
      return setHypothesisField(command, state, "ranking", "number");
    case "hypothesis.eliminate":
      return setHypothesisField(command, state, "eliminated", "boolean", true);
    case "hypothesis.attachEvidence":
      return attachEvidence(command, state, graph);
    case "confidence.set":
      return setConfidence(command, state);
    case "teacher.release":
      return command.targetId === void 0 ? failure2("INVALID_COMMAND", "teacher.release requires targetId.") : {
        mutations: [
          {
            operation: "set",
            path: pointer("teacherReleases", command.targetId),
            value: true
          }
        ]
      };
    case "artifact.saveVersion":
      return saveArtifactVersion(command, state, context);
    default:
      return failure2("INVALID_COMMAND", `Unsupported command "${command.commandType}".`);
  }
}
function saveArtifactVersion(command, state, context) {
  const artifactId = command.targetId;
  if (artifactId === void 0 || !isRecord(command.value)) {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "artifact.saveVersion requires an artifact ID and content payload.",
      artifactId
    );
  }
  const current = state.artifacts[artifactId];
  const version = (current?.latestVersion ?? 0) + 1;
  const evidenceIds = stringArray(command.value["evidenceIds"]);
  const sourceActivityId = command.value["sourceActivityId"];
  return {
    mutations: [
      {
        operation: "set",
        path: pointer("artifacts", artifactId),
        value: {
          artifactId,
          latestVersion: version,
          versions: [
            ...current?.versions ?? [],
            {
              version,
              savedAt: context.eventTimestamp ?? state.lastUpdated,
              actor: context.actor ?? { type: "system" },
              content: structuredClone(command.value["content"] ?? command.value),
              evidenceIds,
              sourceActivityId: typeof sourceActivityId === "string" ? sourceActivityId : void 0
            }
          ]
        }
      }
    ]
  };
}
function setEvidenceStatus(command, state, graph, status, allowedCurrent) {
  const id = command.targetId;
  if (id === void 0 || !graph.evidenceById.has(id) || state.evidence[id] === void 0) {
    return missing("evidence", id);
  }
  if (allowedCurrent !== void 0 && !allowedCurrent.includes(state.evidence[id].status)) {
    return failure2(
      "INVALID_EVIDENCE_TRANSITION",
      `Evidence "${id}" cannot transition from ${state.evidence[id].status} to ${status}.`,
      id
    );
  }
  return {
    mutations: [{ operation: "set", path: pointer("evidence", id, "status"), value: status }]
  };
}
function classifyEvidence(command, state, graph) {
  const id = command.targetId;
  if (id === void 0 || !graph.evidenceById.has(id) && state.studentEvidence[id] === void 0) {
    return missing("evidence", id);
  }
  if (typeof command.value !== "string" || command.value.length === 0) {
    return failure2("INVALID_COMMAND_VALUE", "evidence.classify requires a classification.", id);
  }
  return state.studentEvidence[id] === void 0 ? {
    mutations: [
      {
        operation: "set",
        path: pointer("evidence", id, "classification"),
        value: command.value
      },
      { operation: "set", path: pointer("evidence", id, "status"), value: "classified" }
    ]
  } : {
    mutations: [
      {
        operation: "set",
        path: pointer("studentEvidence", id, "classification"),
        value: command.value
      }
    ]
  };
}
function annotateEvidence(command, state, graph) {
  const id = command.targetId;
  if (id === void 0 || !graph.evidenceById.has(id) && state.studentEvidence[id] === void 0) {
    return missing("evidence", id);
  }
  if (typeof command.value !== "string" || command.value.length === 0) {
    return failure2("INVALID_COMMAND_VALUE", "evidence.annotate requires note text.", id);
  }
  return state.studentEvidence[id] === void 0 ? {
    mutations: [
      { operation: "append", path: pointer("evidence", id, "notes"), value: command.value },
      { operation: "set", path: pointer("evidence", id, "status"), value: "annotated" }
    ]
  } : {
    mutations: [
      {
        operation: "append",
        path: pointer("studentEvidence", id, "notes"),
        value: command.value
      }
    ]
  };
}
function useEvidenceInFinal(command, state, graph) {
  const id = command.targetId;
  if (id === void 0 || !graph.evidenceById.has(id) && state.studentEvidence[id] === void 0) {
    return missing("evidence", id);
  }
  return state.studentEvidence[id] === void 0 ? setEvidenceStatus(command, state, graph, "usedInClaim") : {
    mutations: [
      {
        operation: "set",
        path: pointer("studentEvidence", id, "usedInFinalClaim"),
        value: true
      }
    ]
  };
}
function setEvidenceImportance(command, state, graph) {
  const id = command.targetId;
  if (id === void 0 || typeof command.value !== "boolean" || !graph.evidenceById.has(id) && state.studentEvidence[id] === void 0) {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "evidence.setImportance requires an evidence ID and boolean value.",
      id
    );
  }
  const collection = state.studentEvidence[id] === void 0 ? "evidence" : "studentEvidence";
  return {
    mutations: [
      {
        operation: "set",
        path: pointer(collection, id, "important"),
        value: command.value
      }
    ]
  };
}
function createQuestion(command, state, context) {
  if (command.targetId === void 0 || typeof command.value !== "string" || command.value.trim().length === 0) {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "board.createQuestion requires a question ID and text.",
      command.targetId
    );
  }
  if (state.board.questions?.some((question) => question.id === command.targetId)) {
    return failure2("DUPLICATE_QUESTION", `Question "${command.targetId}" already exists.`);
  }
  return {
    mutations: [
      {
        operation: "append",
        path: "/board/questions",
        value: {
          id: command.targetId,
          text: command.value.trim(),
          status: "open",
          sourceEvidenceId: typeof command.params?.["sourceEvidenceId"] === "string" ? command.params["sourceEvidenceId"] : void 0,
          createdAt: context.eventTimestamp ?? state.lastUpdated,
          authorId: context.actor?.id
        }
      }
    ]
  };
}
function connectEvidence(command, state, graph, context) {
  const sourceId = command.targetId;
  const targetId = command.params?.["targetId"];
  const relationshipType = command.params?.["relationshipType"];
  if (sourceId === void 0 || !graph.evidenceById.has(sourceId) || typeof targetId !== "string" || typeof relationshipType !== "string") {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "evidence.connect requires valid source, targetId, and relationshipType.",
      sourceId
    );
  }
  const id = typeof command.params?.["relationshipId"] === "string" ? command.params["relationshipId"] : `${sourceId}:${relationshipType}:${targetId}`;
  if (state.evidenceRelationships.some((relationship2) => relationship2.id === id)) {
    return { mutations: [] };
  }
  const relationship = {
    id,
    sourceId,
    targetId,
    relationshipType,
    actor: context.actor ?? { type: "system" },
    createdAt: context.eventTimestamp ?? state.lastUpdated
  };
  return {
    mutations: [{ operation: "append", path: "/evidenceRelationships", value: relationship }]
  };
}
function disconnectEvidence(command, state) {
  const relationshipId = typeof command.value === "string" ? command.value : command.params?.["relationshipId"];
  if (typeof relationshipId !== "string") {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "evidence.disconnect requires a relationship ID.",
      command.targetId
    );
  }
  return {
    mutations: [
      {
        operation: "set",
        path: "/evidenceRelationships",
        value: state.evidenceRelationships.filter(
          (relationship) => relationship.id !== relationshipId
        )
      }
    ]
  };
}
function createEvidence(command, state, graph, context) {
  const id = command.targetId;
  if (id !== void 0 && graph.evidenceById.has(id)) {
    return setEvidenceStatus(command, state, graph, "available");
  }
  if (id === void 0 || !isRecord(command.value)) {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "Evidence creation requires targetId and a value object.",
      id
    );
  }
  if (state.studentEvidence[id] !== void 0 || state.evidence[id] !== void 0) {
    return failure2("DUPLICATE_EVIDENCE", `Evidence "${id}" already exists.`, id);
  }
  const evidenceType = command.value["evidenceType"];
  const title = command.value["title"];
  if (typeof evidenceType !== "string" || typeof title !== "string") {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "Student evidence requires evidenceType and title.",
      id
    );
  }
  const record = {
    id,
    evidenceType,
    title,
    content: structuredClone(command.value["content"]),
    createdAt: context.eventTimestamp ?? state.lastUpdated,
    actor: context.actor ?? { type: "system" },
    sourceActivityId: typeof command.value["sourceActivityId"] === "string" ? command.value["sourceActivityId"] : void 0,
    metadata: isRecord(command.value["metadata"]) ? structuredClone(command.value["metadata"]) : void 0,
    notes: [],
    important: false,
    usedInFinalClaim: false
  };
  return {
    mutations: [{ operation: "set", path: pointer("studentEvidence", id), value: record }]
  };
}
function setActivityStatus(command, state, graph, status) {
  const id = command.targetId;
  if (id === void 0 || !graph.activitiesById.has(id) || state.activities[id] === void 0) {
    return missing("activity", id);
  }
  const mutations = [
    { operation: "set", path: pointer("activities", id, "status"), value: status }
  ];
  if (status === "notStarted" || status === "inProgress" || status === "complete") {
    mutations.push({
      operation: "set",
      path: pointer("activities", id, "completionStatus"),
      value: status === "notStarted" ? "notStarted" : status === "inProgress" ? "inProgress" : "complete"
    });
  }
  if (status === "submitted") {
    mutations.push({
      operation: "set",
      path: pointer("activities", id, "submissionStatus"),
      value: "submitted"
    });
  }
  return {
    mutations
  };
}
function submitActivityResult(command, state, graph) {
  const status = setActivityStatus(command, state, graph, "submitted");
  if (status.errors !== void 0) {
    return status;
  }
  const activity = state.activities[command.targetId ?? ""];
  const resultHistory = [
    ...activity?.resultHistory ?? (activity?.lastResult === void 0 ? [] : [activity.lastResult]),
    structuredClone(command.value)
  ].slice(-100);
  return {
    mutations: [
      ...status.mutations,
      {
        operation: "set",
        path: pointer("activities", command.targetId ?? "", "lastResult"),
        value: command.value
      },
      {
        operation: "set",
        path: pointer("activities", command.targetId ?? "", "resultHistory"),
        value: resultHistory
      }
    ]
  };
}
function setLessonStatus(command, state, graph) {
  const id = command.targetId;
  if (id === void 0 || !graph.lessonsById.has(id) || state.lessons[id] === void 0) {
    return missing("lesson", id);
  }
  return {
    mutations: [{ operation: "set", path: pointer("lessons", id, "status"), value: "available" }]
  };
}
function setPhaseStatus(command, state, graph, status) {
  const id = command.targetId;
  const exists = graph.investigation.phases.some((phase) => phase.id === id);
  if (id === void 0 || !exists || state.phases[id] === void 0) {
    return missing("phase", id);
  }
  return {
    mutations: [{ operation: "set", path: pointer("phases", id, "status"), value: status }]
  };
}
function changeResource(command, state, graph) {
  const id = command.targetId;
  const definition = id === void 0 ? void 0 : graph.resourcesById.get(id);
  const current = id === void 0 ? void 0 : state.resources[id];
  if (id === void 0 || definition === void 0 || current === void 0) {
    return missing("resource", id);
  }
  if (typeof command.value !== "number" || !Number.isFinite(command.value) || command.value < 0) {
    return failure2("INVALID_RESOURCE_AMOUNT", "Resource amount must be non-negative.", id);
  }
  const next = command.commandType === "resource.spend" ? current - command.value : current + command.value;
  if (definition.min !== void 0 && next < definition.min) {
    return failure2("INSUFFICIENT_RESOURCE", `Resource "${id}" is below its minimum.`, id);
  }
  if (definition.max !== void 0 && next > definition.max) {
    return failure2("RESOURCE_MAX_EXCEEDED", `Resource "${id}" exceeds its maximum.`, id);
  }
  return {
    mutations: [{ operation: "set", path: pointer("resources", id), value: next }]
  };
}
function appendMessage(command, state, context, teacher) {
  if (typeof command.value !== "string" || command.value.length === 0) {
    return failure2("INVALID_COMMAND_VALUE", `${command.commandType} requires message text.`);
  }
  const level = command.params?.["level"] === "warning" ? "warning" : "info";
  return {
    mutations: [
      {
        operation: "append",
        path: teacher ? "/teacherNotifications" : "/messages",
        value: {
          id: `${teacher ? "teacher" : "message"}-${context.requestId ?? state.version}`,
          message: command.value,
          level,
          createdAt: context.eventTimestamp ?? state.lastUpdated
        }
      }
    ]
  };
}
function setRequirement(key, value) {
  if (typeof value !== "boolean") {
    return failure2("INVALID_COMMAND_VALUE", `${key} requires a boolean value.`);
  }
  return {
    mutations: [{ operation: "set", path: pointer("requirements", key), value }]
  };
}
function setFinalStatus(status) {
  const availabilityStatus = status === "open" ? "open" : "closed";
  return {
    mutations: [
      { operation: "set", path: "/finalSubmission/status", value: status },
      {
        operation: "set",
        path: "/finalSubmission/availabilityStatus",
        value: availabilityStatus
      }
    ]
  };
}
function submitFinal(state, context) {
  if (state.finalSubmission.status !== "open") {
    return failure2("FINAL_SUBMISSION_CLOSED", "Final submission is not open.");
  }
  return {
    mutations: [
      { operation: "set", path: "/finalSubmission/status", value: "submitted" },
      {
        operation: "set",
        path: "/finalSubmission/submissionStatus",
        value: "submitted"
      },
      {
        operation: "set",
        path: "/finalSubmission/submittedAt",
        value: context.eventTimestamp ?? state.lastUpdated
      }
    ]
  };
}
function updateFinalDraft(command, state) {
  if (!isRecord(command.value)) {
    return failure2("INVALID_COMMAND_VALUE", "finalSubmission.updateDraft requires a draft object.");
  }
  const next = structuredClone(state.finalSubmission.argumentDraft);
  const stringFields = [
    "claim",
    "identification",
    "diagnosis",
    "cause",
    "recommendation",
    "reasoning",
    "counterevidence",
    "alternativeExplanation",
    "uncertainty",
    "nextTest",
    "safetyRecommendation",
    "reflection",
    "individualContribution"
  ];
  for (const field of stringFields) {
    const value = command.value[field];
    if (typeof value === "string") {
      next[field] = value;
    }
  }
  const evidenceIds = stringArray(command.value["evidenceIds"]);
  if (evidenceIds !== void 0) {
    next.evidenceIds = evidenceIds;
  }
  const confidence = command.value["confidence"];
  if (typeof confidence === "number" && Number.isFinite(confidence)) {
    next.confidence = Math.max(0, Math.min(100, confidence));
  }
  return {
    mutations: [
      {
        operation: "set",
        path: "/finalSubmission/argumentDraft",
        value: next
      }
    ]
  };
}
function unlockDialogue(command, state, graph) {
  const npcId = command.targetId;
  const dialogueId = typeof command.value === "string" ? command.value : command.params?.["dialogueId"];
  if (npcId === void 0 || !graph.npcsById.has(npcId) || state.npc?.[npcId] === void 0 || typeof dialogueId !== "string") {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "npc.unlockDialogue requires valid NPC and dialogue IDs.",
      npcId
    );
  }
  return {
    mutations: [
      {
        operation: "add",
        path: pointer("npc", npcId, "unlockedDialogueIds"),
        value: dialogueId
      }
    ]
  };
}
function completeDialogue(command, state, graph) {
  const npcId = command.targetId;
  const dialogueId = command.value;
  if (npcId === void 0 || !graph.npcsById.has(npcId) || state.npc?.[npcId] === void 0 || typeof dialogueId !== "string") {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "npc.completeDialogue requires valid NPC and dialogue IDs.",
      npcId
    );
  }
  return {
    mutations: [
      {
        operation: "add",
        path: pointer("npc", npcId, "dialogueCompletedIds"),
        value: dialogueId
      }
    ]
  };
}
function createHypothesis(command, state, context) {
  const id = command.targetId;
  if (id === void 0 || typeof command.value !== "string" || command.value.length === 0) {
    return failure2(
      "INVALID_COMMAND_VALUE",
      "hypothesis.create requires targetId and statement.",
      id
    );
  }
  if (state.hypotheses.some((hypothesis2) => hypothesis2.id === id)) {
    return failure2("DUPLICATE_HYPOTHESIS", `Hypothesis "${id}" already exists.`, id);
  }
  const hypothesis = {
    id,
    statement: command.value,
    revisions: [
      {
        revisionId: `${id}-initial`,
        hypothesisId: id,
        timestamp: context.eventTimestamp ?? state.lastUpdated,
        statement: command.value,
        confidence: typeof command.params?.["confidence"] === "number" ? command.params["confidence"] : void 0,
        evidenceIds: stringArray(command.params?.["evidenceIds"]),
        reasoning: typeof command.params?.["reasoning"] === "string" ? command.params["reasoning"] : void 0,
        remainingQuestion: typeof command.params?.["remainingQuestion"] === "string" ? command.params["remainingQuestion"] : void 0
      }
    ],
    confidence: typeof command.params?.["confidence"] === "number" ? command.params["confidence"] : void 0,
    evidenceIds: stringArray(command.params?.["evidenceIds"]) ?? [],
    reasoning: typeof command.params?.["reasoning"] === "string" ? command.params["reasoning"] : void 0,
    remainingQuestion: typeof command.params?.["remainingQuestion"] === "string" ? command.params["remainingQuestion"] : void 0,
    selected: context.definitions?.investigation.hypotheses?.allowMultiple === false || !state.hypotheses.some((hypothesis2) => hypothesis2.selected)
  };
  return { mutations: [{ operation: "append", path: "/hypotheses", value: hypothesis }] };
}
function reviseHypothesis(command, state, context) {
  const id = command.targetId;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === void 0 || index < 0) {
    return missing("hypothesis", id);
  }
  if (typeof command.value !== "string" || command.value.length === 0) {
    return failure2("INVALID_COMMAND_VALUE", "hypothesis.revise requires statement.", id);
  }
  const revisionId = typeof command.params?.["revisionId"] === "string" ? command.params["revisionId"] : `${id}-revision-${state.hypotheses[index]?.revisions.length ?? 0}`;
  return {
    mutations: [
      {
        operation: "append",
        path: pointer("hypotheses", String(index), "revisions"),
        value: {
          revisionId,
          hypothesisId: id,
          timestamp: context.eventTimestamp ?? state.lastUpdated,
          statement: command.value,
          confidence: typeof command.params?.["confidence"] === "number" ? command.params["confidence"] : void 0,
          evidenceIds: stringArray(command.params?.["evidenceIds"]),
          reasonForChange: typeof command.params?.["reasonForChange"] === "string" ? command.params["reasonForChange"] : void 0,
          reasoning: typeof command.params?.["reasoning"] === "string" ? command.params["reasoning"] : void 0,
          remainingQuestion: typeof command.params?.["remainingQuestion"] === "string" ? command.params["remainingQuestion"] : void 0
        }
      },
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "statement"),
        value: command.value
      },
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "confidence"),
        value: typeof command.params?.["confidence"] === "number" ? command.params["confidence"] : state.hypotheses[index]?.confidence
      },
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "reasoning"),
        value: typeof command.params?.["reasoning"] === "string" ? command.params["reasoning"] : state.hypotheses[index]?.reasoning
      },
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "remainingQuestion"),
        value: typeof command.params?.["remainingQuestion"] === "string" ? command.params["remainingQuestion"] : state.hypotheses[index]?.remainingQuestion
      },
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "evidenceIds"),
        value: stringArray(command.params?.["evidenceIds"]) ?? state.hypotheses[index]?.evidenceIds
      }
    ]
  };
}
function selectHypothesis(command, state) {
  const id = command.targetId;
  if (id === void 0 || !state.hypotheses.some((hypothesis) => hypothesis.id === id)) {
    return missing("hypothesis", id);
  }
  return {
    mutations: [
      {
        operation: "set",
        path: "/hypotheses",
        value: state.hypotheses.map((hypothesis) => __spreadProps(__spreadValues({}, hypothesis), {
          selected: hypothesis.id === id
        }))
      }
    ]
  };
}
function setHypothesisField(command, state, field, expectedType, defaultValue) {
  const id = command.targetId;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === void 0 || index < 0) {
    return missing("hypothesis", id);
  }
  const value = command.value ?? defaultValue;
  if (typeof value !== expectedType) {
    return failure2("INVALID_COMMAND_VALUE", `${command.commandType} has invalid value.`, id);
  }
  return {
    mutations: [
      {
        operation: "set",
        path: pointer("hypotheses", String(index), field),
        value
      }
    ]
  };
}
function attachEvidence(command, state, graph) {
  const id = command.targetId;
  const evidenceId = command.value;
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === void 0 || index < 0) {
    return missing("hypothesis", id);
  }
  if (typeof evidenceId !== "string" || !graph.evidenceById.has(evidenceId) && state.studentEvidence[evidenceId] === void 0) {
    return missing("evidence", typeof evidenceId === "string" ? evidenceId : void 0);
  }
  return {
    mutations: [
      {
        operation: "add",
        path: pointer("hypotheses", String(index), "evidenceIds"),
        value: evidenceId
      }
    ]
  };
}
function setConfidence(command, state) {
  const id = command.targetId;
  if (typeof command.value !== "number" || !Number.isFinite(command.value)) {
    return failure2("INVALID_COMMAND_VALUE", "confidence.set requires numeric value.", id);
  }
  const index = state.hypotheses.findIndex((hypothesis) => hypothesis.id === id);
  if (id === void 0 || index < 0) {
    return missing("hypothesis", id);
  }
  return {
    mutations: [
      {
        operation: "set",
        path: pointer("hypotheses", String(index), "confidence"),
        value: command.value
      }
    ]
  };
}
function missing(entity, id) {
  return failure2(
    `${entity.toUpperCase()}_NOT_FOUND`,
    `${entity} "${id ?? "(missing)"}" was not found.`,
    id
  );
}
function failure2(code, message, sourceId) {
  return { mutations: [], errors: [runtimeError(code, message, { sourceId })] };
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function stringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? [...value] : void 0;
}

// src/app/templates/investigation/runtime/investigation-action-pack.ts
var investigationActionTypes = [
  "evidence.unlock",
  "evidence.lock",
  "evidence.hide",
  "evidence.reveal",
  "evidence.create",
  "activity.unlock",
  "activity.lock",
  "lesson.unlock",
  "phase.unlock",
  "phase.complete",
  "resource.add",
  "resource.spend",
  "message.show",
  "hypothesis.require",
  "revision.require",
  "finalSubmission.open",
  "finalSubmission.close",
  "solution.reveal",
  "teacher.notify",
  "npc.unlockDialogue"
];
var investigationInternalCommandTypes = [
  "activity.start",
  "activity.complete",
  "activity.submitResult",
  "evidence.view",
  "evidence.collect",
  "evidence.classify",
  "evidence.annotate",
  "evidence.connect",
  "evidence.disconnect",
  "evidence.studentCreate",
  "evidence.useInClaim",
  "evidence.setImportance",
  "board.createQuestion",
  "hypothesis.create",
  "hypothesis.revise",
  "hypothesis.select",
  "hypothesis.rank",
  "hypothesis.eliminate",
  "hypothesis.attachEvidence",
  "confidence.set",
  "npc.completeDialogue",
  "finalSubmission.submit",
  "finalSubmission.updateDraft",
  "teacher.release",
  "artifact.saveVersion"
];
function registerInvestigationActionPack(actions, commands) {
  for (const type of investigationActionTypes) {
    actions.register({
      id: type,
      version: "1.0.0",
      status: "core",
      handler: passthroughAction(type)
    });
  }
  for (const type of [...investigationActionTypes, ...investigationInternalCommandTypes]) {
    commands.register({
      id: type,
      version: "1.0.0",
      status: "core",
      authority: authoritativeCommandTypes.has(type) ? "serverRequired" : "local",
      handler: investigationCommandHandler(type)
    });
  }
}
var authoritativeCommandTypes = /* @__PURE__ */ new Set([
  "resource.spend",
  "finalSubmission.submit",
  "solution.reveal",
  "teacher.release"
]);

// src/app/templates/investigation/runtime/investigation-capability-pack.ts
var investigationCapabilityIds = [
  "caseBoard",
  "evidence",
  "studentEvidence",
  "hypotheses",
  "activities",
  "rules",
  "state",
  "limitedResources",
  "randomization",
  "scriptedNPCs",
  "teams",
  "finalSubmission",
  "performanceArtifacts"
];
function registerInvestigationCapabilities(registry) {
  for (const id of investigationCapabilityIds) {
    registry.register({
      id,
      version: "1.0.0",
      status: "core"
    });
  }
}

// src/app/core/rules/comparison.ts
var operators = /* @__PURE__ */ new Set([
  "equals",
  "notEquals",
  "greaterThan",
  "greaterThanOrEqual",
  "lessThan",
  "lessThanOrEqual",
  "contains",
  "notContains",
  "in",
  "notIn",
  "exists"
]);
function compareValues(actual, operator, expected) {
  if (!operators.has(operator)) {
    return {
      matched: false,
      errors: [
        runtimeError(
          "INVALID_COMPARISON_OPERATOR",
          `Comparison operator "${operator}" is not supported.`
        )
      ]
    };
  }
  switch (operator) {
    case "equals":
      return { matched: Object.is(actual, expected) };
    case "notEquals":
      return { matched: !Object.is(actual, expected) };
    case "exists":
      return { matched: actual !== void 0 && actual !== null };
    case "greaterThan":
    case "greaterThanOrEqual":
    case "lessThan":
    case "lessThanOrEqual":
      if (typeof actual !== "number" || typeof expected !== "number") {
        return invalidValues(operator);
      }
      return {
        matched: operator === "greaterThan" ? actual > expected : operator === "greaterThanOrEqual" ? actual >= expected : operator === "lessThan" ? actual < expected : actual <= expected
      };
    case "contains":
    case "notContains": {
      const contains = Array.isArray(actual) && actual.some((value) => Object.is(value, expected)) || typeof actual === "string" && typeof expected === "string" && actual.includes(expected);
      if (!Array.isArray(actual) && typeof actual !== "string") {
        return invalidValues(operator);
      }
      return { matched: operator === "contains" ? contains : !contains };
    }
    case "in":
    case "notIn":
      if (!Array.isArray(expected)) {
        return invalidValues(operator);
      }
      return {
        matched: operator === "in" ? expected.some((value) => Object.is(value, actual)) : !expected.some((value) => Object.is(value, actual))
      };
  }
}
function invalidValues(operator) {
  return {
    matched: false,
    errors: [
      runtimeError(
        "INVALID_COMPARISON_VALUE",
        `Comparison operator "${operator}" received incompatible values.`
      )
    ]
  };
}

// src/app/templates/investigation/runtime/investigation-condition-pack.ts
function registerInvestigationConditionPack(registry) {
  const evaluators = [
    targetEvaluator("activity.status", (id, state) => state.activities[id]?.status),
    targetEvaluator("evidence.status", (id, state) => state.evidence[id]?.status),
    evidenceCountEvaluator(),
    targetEvaluator(
      "evidence.classification",
      (id, state) => state.evidence[id]?.classification
    ),
    evidenceRelationshipEvaluator(),
    hypothesisExistsEvaluator(),
    hypothesisSelectedEvaluator(),
    hypothesisRevisedEvaluator(),
    valueEvaluator(
      "hypothesis.count",
      (_condition, state) => state.hypotheses.filter((hypothesis) => !hypothesis.eliminated).length
    ),
    targetEvaluator(
      "hypothesis.confidence",
      (id, state) => state.hypotheses.find((hypothesis) => hypothesis.id === id)?.confidence
    ),
    targetEvaluator("state.value", (id, state) => state.stateValues[id]),
    targetEvaluator("resource.amount", (id, state) => state.resources[id]),
    targetEvaluator("phase.status", (id, state) => state.phases[id]?.status),
    targetEvaluator("team.taskStatus", (id, state) => state.teamTasks[id]),
    targetEvaluator("teacher.release", (id, state) => state.teacherReleases[id])
  ];
  for (const evaluator of evaluators) {
    registry.register({
      id: evaluator.type,
      version: "1.0.0",
      status: "core",
      evaluator
    });
  }
}
function targetEvaluator(type, read) {
  return {
    type,
    evaluate: (condition, state) => {
      if (condition.targetId === void 0) {
        return conditionError(
          "CONDITION_TARGET_REQUIRED",
          `Condition "${type}" requires targetId.`
        );
      }
      const actual = read(condition.targetId, state);
      if (actual === void 0) {
        return conditionError(
          "CONDITION_TARGET_NOT_FOUND",
          `Condition "${type}" target "${condition.targetId}" was not found.`,
          condition.targetId
        );
      }
      return compareValues(actual, condition.operator ?? "equals", condition.value);
    }
  };
}
function valueEvaluator(type, read) {
  return {
    type,
    evaluate: (condition, state) => compareValues(read(condition, state), condition.operator ?? "equals", condition.value)
  };
}
function evidenceCountEvaluator() {
  return {
    type: "evidence.count",
    evaluate: (condition, state, context) => {
      const status = condition.params?.["status"];
      const requirement = condition.params?.["requirement"];
      const evidenceType = condition.params?.["type"];
      const phase = condition.params?.["phase"];
      const count = Object.entries(state.evidence).filter(([id, runtime]) => {
        const definition = context.definitions?.evidenceById.get(id);
        return (status === void 0 || runtime.status === status) && (requirement === void 0 || definition?.requirement === requirement) && (evidenceType === void 0 || definition?.evidenceType === evidenceType) && (phase === void 0 || definition?.availability.availableFromPhaseId === phase);
      }).length;
      return compareValues(count, condition.operator ?? "equals", condition.value);
    }
  };
}
function evidenceRelationshipEvaluator() {
  return {
    type: "evidence.relationship",
    evaluate: (condition, state) => {
      if (condition.targetId === void 0) {
        return conditionError(
          "CONDITION_TARGET_REQUIRED",
          "evidence.relationship requires source targetId."
        );
      }
      const relatedTargetId = condition.params?.["targetId"];
      const relationshipType = condition.params?.["relationshipType"];
      if (typeof relatedTargetId !== "string" || typeof relationshipType !== "string") {
        return conditionError(
          "INVALID_CONDITION_VALUE",
          "evidence.relationship requires string targetId and relationshipType params.",
          condition.targetId
        );
      }
      const exists = state.evidenceRelationships.some(
        (relationship) => relationship.sourceId === condition.targetId && relationship.targetId === relatedTargetId && relationship.relationshipType === relationshipType
      );
      return compareValues(
        exists,
        condition.operator ?? "equals",
        condition.value ?? true
      );
    }
  };
}
function hypothesisExistsEvaluator() {
  return {
    type: "hypothesis.exists",
    evaluate: (condition, state) => {
      const exists = condition.targetId === void 0 ? state.hypotheses.some((hypothesis) => !hypothesis.eliminated) : state.hypotheses.some(
        (hypothesis) => hypothesis.id === condition.targetId && !hypothesis.eliminated
      );
      return compareValues(
        exists,
        condition.operator ?? "equals",
        condition.value ?? true
      );
    }
  };
}
function hypothesisSelectedEvaluator() {
  return {
    type: "hypothesis.selected",
    evaluate: (condition, state) => {
      const selected = state.hypotheses.some(
        (hypothesis) => hypothesis.selected && (condition.targetId === void 0 || hypothesis.id === condition.targetId)
      );
      return compareValues(
        selected,
        condition.operator ?? "equals",
        condition.value ?? true
      );
    }
  };
}
function hypothesisRevisedEvaluator() {
  return {
    type: "hypothesis.revised",
    evaluate: (condition, state) => {
      const hypotheses = condition.targetId === void 0 ? state.hypotheses : state.hypotheses.filter((hypothesis) => hypothesis.id === condition.targetId);
      if (condition.targetId !== void 0 && hypotheses.length === 0) {
        return conditionError(
          "CONDITION_TARGET_NOT_FOUND",
          `Hypothesis "${condition.targetId}" was not found.`,
          condition.targetId
        );
      }
      const revisionCount = hypotheses.reduce(
        (sum, hypothesis) => sum + hypothesis.revisions.length,
        0
      );
      return compareValues(
        revisionCount,
        condition.operator ?? "greaterThan",
        condition.value ?? 0
      );
    }
  };
}
function conditionError(code, message, sourceId) {
  const error = runtimeError(code, message, { sourceId });
  return { matched: false, errors: [error] };
}

// src/app/templates/investigation/runtime/investigation-event-pack.ts
var investigationEventTypes = [
  "activity.started",
  "activity.completed",
  "activity.resultSubmitted",
  "evidence.viewed",
  "evidence.collected",
  "evidence.classified",
  "evidence.annotationAdded",
  "evidence.connected",
  "evidence.disconnected",
  "evidence.studentCreated",
  "evidence.usedInClaim",
  "evidence.importanceChanged",
  "board.questionCreated",
  "hypothesis.created",
  "hypothesis.revised",
  "hypothesis.selected",
  "hypothesis.rankChanged",
  "hypothesis.eliminated",
  "hypothesis.evidenceAttached",
  "confidence.changed",
  "resource.spendRequested",
  "resource.addRequested",
  "npc.questionAsked",
  "npc.dialogueCompleted",
  "phase.openRequested",
  "phase.completed",
  "teacher.commandRequested",
  "teacher.releaseTriggered",
  "finalSubmission.openRequested",
  "finalSubmission.draftUpdated",
  "finalSubmission.submitted",
  "artifact.versionSaved"
];
var futureEventTypes = [
  "mastery.met",
  "reasoningCheck.requested",
  "reasoningCheck.passed",
  "reasoningCheck.needsRevision",
  "defense.passed"
];
function registerInvestigationEventPack(events, producers) {
  for (const id of investigationEventTypes) {
    events.register({ id, version: "1.0.0", status: "core" });
  }
  for (const id of futureEventTypes) {
    events.register({ id, version: "1.0.0", status: "future" });
  }
  const mappings = [
    ["activity.started", (event) => targetCommand(event, "activity.start")],
    ["activity.completed", (event) => targetCommand(event, "activity.complete")],
    [
      "activity.resultSubmitted",
      (event) => targetCommand(event, "activity.submitResult", event.payload?.["result"])
    ],
    ["evidence.viewed", (event) => targetCommand(event, "evidence.view")],
    ["evidence.collected", (event) => targetCommand(event, "evidence.collect")],
    [
      "evidence.classified",
      (event) => targetCommand(event, "evidence.classify", event.payload?.["classification"])
    ],
    [
      "evidence.annotationAdded",
      (event) => targetCommand(event, "evidence.annotate", event.payload?.["note"])
    ],
    [
      "evidence.connected",
      (event) => targetCommand(event, "evidence.connect", void 0, {
        targetId: event.payload?.["targetId"],
        relationshipType: event.payload?.["relationshipType"],
        relationshipId: event.payload?.["relationshipId"]
      })
    ],
    [
      "evidence.disconnected",
      (event) => targetCommand(event, "evidence.disconnect", event.payload?.["relationshipId"])
    ],
    [
      "evidence.studentCreated",
      (event) => targetCommand(event, "evidence.studentCreate", event.payload)
    ],
    ["evidence.usedInClaim", (event) => targetCommand(event, "evidence.useInClaim")],
    [
      "evidence.importanceChanged",
      (event) => targetCommand(event, "evidence.setImportance", event.payload?.["important"])
    ],
    [
      "board.questionCreated",
      (event) => targetCommand(event, "board.createQuestion", event.payload?.["text"], event.payload)
    ],
    [
      "hypothesis.created",
      (event) => targetCommand(event, "hypothesis.create", event.payload?.["statement"], event.payload)
    ],
    [
      "hypothesis.revised",
      (event) => targetCommand(event, "hypothesis.revise", event.payload?.["statement"], event.payload)
    ],
    ["hypothesis.selected", (event) => targetCommand(event, "hypothesis.select")],
    [
      "hypothesis.rankChanged",
      (event) => targetCommand(event, "hypothesis.rank", event.payload?.["ranking"])
    ],
    [
      "hypothesis.eliminated",
      (event) => targetCommand(event, "hypothesis.eliminate", event.payload?.["eliminated"] ?? true)
    ],
    [
      "hypothesis.evidenceAttached",
      (event) => targetCommand(event, "hypothesis.attachEvidence", event.payload?.["evidenceId"])
    ],
    [
      "confidence.changed",
      (event) => targetCommand(event, "confidence.set", event.payload?.["value"])
    ],
    [
      "resource.spendRequested",
      (event) => targetCommand(event, "resource.spend", event.payload?.["amount"])
    ],
    [
      "resource.addRequested",
      (event) => targetCommand(event, "resource.add", event.payload?.["amount"])
    ],
    [
      "npc.dialogueCompleted",
      (event) => targetCommand(event, "npc.completeDialogue", event.payload?.["dialogueId"])
    ],
    ["phase.completed", (event) => targetCommand(event, "phase.complete")],
    ["phase.openRequested", (event) => targetCommand(event, "phase.unlock")],
    ["teacher.releaseTriggered", (event) => targetCommand(event, "teacher.release")],
    ["finalSubmission.openRequested", () => ({ commandType: "finalSubmission.open" })],
    [
      "finalSubmission.draftUpdated",
      (event) => ({ commandType: "finalSubmission.updateDraft", value: event.payload?.["draft"] })
    ],
    ["finalSubmission.submitted", (event) => ({ commandType: "finalSubmission.submit" })],
    [
      "artifact.versionSaved",
      (event) => targetCommand(event, "artifact.saveVersion", event.payload)
    ]
  ];
  for (const [eventType, map] of mappings) {
    producers.register({
      id: eventType,
      version: "1.0.0",
      status: "core",
      producer: mappingProducer(eventType, map)
    });
  }
  producers.register({
    id: "teacher.commandRequested",
    version: "1.0.0",
    status: "core",
    producer: teacherCommandProducer()
  });
}
function mappingProducer(eventType, map) {
  return {
    eventType,
    createCommands: (event) => {
      const command = map(event);
      return command === void 0 ? {
        commands: [],
        errors: [
          runtimeError(
            "INVALID_EVENT_PAYLOAD",
            `Event "${eventType}" is missing its required sourceId.`,
            { sourceId: event.id }
          )
        ]
      } : { commands: [command] };
    }
  };
}
function teacherCommandProducer() {
  return {
    eventType: "teacher.commandRequested",
    createCommands: (event) => {
      if (event.actor.type !== "teacher") {
        return {
          commands: [],
          errors: [
            runtimeError(
              "PERMISSION_DENIED",
              "Only a teacher actor can request a teacher command.",
              { sourceId: event.id }
            )
          ]
        };
      }
      const command = event.payload?.["command"];
      if (!isRuntimeCommand(command)) {
        return {
          commands: [],
          errors: [
            runtimeError(
              "INVALID_EVENT_PAYLOAD",
              "teacher.commandRequested requires a RuntimeCommand payload.",
              { sourceId: event.id }
            )
          ]
        };
      }
      return { commands: [structuredClone(command)] };
    }
  };
}
function targetCommand(event, commandType, value, params) {
  return event.sourceId === void 0 ? void 0 : {
    commandType,
    targetId: event.sourceId,
    value,
    params
  };
}
function isRuntimeCommand(value) {
  return typeof value === "object" && value !== null && "commandType" in value && typeof value.commandType === "string";
}

// src/app/templates/investigation/runtime/investigation-runtime-initializer.ts
var InvestigationRuntimeInitializer = class {
  constructor(clock = new SystemClock()) {
    this.clock = clock;
  }
  clock;
  create(graph, scope) {
    const assignedAt = this.clock.now();
    const stateValues = Object.fromEntries(
      [...graph.stateById.values()].map((definition) => [
        definition.id,
        structuredClone(definition.initialValue)
      ])
    );
    const randomization = {};
    const errors = [];
    if (graph.tenantId !== scope.tenantId) {
      errors.push(
        runtimeError(
          "PROJECT_TENANT_MISMATCH",
          "Project definition tenant does not match the requested runtime scope.",
          { sourceId: graph.projectId }
        )
      );
    }
    for (const definition of graph.randomizationsById.values()) {
      const result = this.randomize(definition, scope);
      if (result.error !== void 0) {
        errors.push(result.error);
        continue;
      }
      randomization[definition.id] = {
        seed: result.seed,
        value: structuredClone(result.value),
        assignedAt
      };
      stateValues[definition.outputStateId] = structuredClone(result.value);
    }
    const phases = [...graph.investigation.phases].sort(
      (left, right) => left.order - right.order || left.id.localeCompare(right.id)
    );
    const snapshot = {
      version: 0,
      tenantId: scope.tenantId,
      projectId: graph.projectId,
      projectVersion: graph.projectVersion,
      lastUpdated: assignedAt,
      scope: structuredClone(scope),
      stateValues,
      firedRuleIds: [],
      evidence: Object.fromEntries(
        [...graph.evidenceById.values()].map((definition) => [
          definition.id,
          {
            status: definition.availability.initialState,
            notes: [],
            relationshipIds: []
          }
        ])
      ),
      studentEvidence: {},
      evidenceRelationships: [],
      artifacts: {},
      activities: Object.fromEntries(
        [...graph.activitiesById.keys()].map((id) => [
          id,
          {
            status: "notStarted",
            resultHistory: [],
            completionStatus: "notStarted",
            submissionStatus: "notRequired",
            masteryStatus: "notMeasured",
            approvalStatus: "notRequired",
            gradeStatus: "ungraded"
          }
        ])
      ),
      hypotheses: [],
      resources: Object.fromEntries(
        [...graph.resourcesById.values()].map((definition) => [
          definition.id,
          definition.initialAmount
        ])
      ),
      board: { itemLocations: {}, itemOrder: {}, notes: [], questions: [] },
      phases: Object.fromEntries(
        phases.map((phase, index) => [
          phase.id,
          {
            status: index === 0 && (phase.entryRuleIds?.length ?? 0) === 0 ? "available" : "locked"
          }
        ])
      ),
      lessons: Object.fromEntries(
        [...graph.lessonsById.keys()].map((id) => [id, { status: "locked" }])
      ),
      requirements: {
        hypothesisRequired: false,
        revisionRequired: graph.investigation.hypotheses?.requireRevision ?? false
      },
      finalSubmission: {
        status: "closed",
        availabilityStatus: "closed",
        submissionStatus: "notSubmitted",
        approvalStatus: "notRequired",
        gradeStatus: "ungraded",
        argumentDraft: { evidenceIds: [] },
        artifactIds: []
      },
      solutionRevealed: false,
      messages: [],
      teacherNotifications: [],
      teacherReleases: {},
      teamTasks: {},
      mastery: {},
      randomization,
      npc: Object.fromEntries(
        [...graph.npcsById.values()].map((definition) => [
          definition.id,
          {
            dialogueCompletedIds: [],
            unlockedDialogueIds: [],
            state: structuredClone(definition.initialState ?? {})
          }
        ])
      )
    };
    return {
      snapshot,
      errors: errors.length === 0 ? void 0 : errors
    };
  }
  randomize(definition, scope) {
    const seed = this.seed(definition, scope);
    const random = seededRandom(seed);
    const options = definition.options ?? [];
    if (definition.strategy === "numericRange") {
      return {
        seed,
        error: runtimeError(
          "RANDOMIZATION_CONFIGURATION_UNDERSPECIFIED",
          `Randomization "${definition.id}" uses numericRange, but the V1 schema defines no range bounds.`,
          { sourceId: definition.id }
        )
      };
    }
    if (options.length === 0) {
      return {
        seed,
        error: runtimeError(
          "RANDOMIZATION_OPTIONS_MISSING",
          `Randomization "${definition.id}" requires at least one option.`,
          { sourceId: definition.id }
        )
      };
    }
    if (definition.strategy === "shuffle") {
      const values = options.map((option) => structuredClone(option.value));
      for (let index = values.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
      }
      return { seed, value: values };
    }
    if (definition.strategy === "weightedChoice") {
      const weights = options.map((option) => option.weight ?? 1);
      if (weights.some((weight) => weight <= 0 || !Number.isFinite(weight))) {
        return {
          seed,
          error: runtimeError(
            "RANDOMIZATION_WEIGHT_INVALID",
            `Randomization "${definition.id}" has an invalid weight.`,
            { sourceId: definition.id }
          )
        };
      }
      const total = weights.reduce((sum, weight) => sum + weight, 0);
      let selection = random() * total;
      for (let index = 0; index < options.length; index += 1) {
        selection -= weights[index] ?? 0;
        if (selection <= 0) {
          return { seed, value: structuredClone(options[index]?.value) };
        }
      }
    }
    const selected = options[Math.floor(random() * options.length)];
    return { seed, value: structuredClone(selected?.value) };
  }
  seed(definition, scope) {
    if (definition.seedStrategy === "fixed" && definition.fixedSeed !== void 0) {
      return definition.fixedSeed;
    }
    const scopeValue = definition.scope === "student" ? scope.studentId : definition.scope === "team" ? scope.teamId : definition.scope === "class" ? scope.classId : scope.projectId;
    return [scope.projectId, scope.projectVersion, definition.id, scopeValue ?? "default"].join(
      "::"
    );
  }
};
function seededRandom(seed) {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 1831565813;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

// src/app/templates/investigation/package/investigation-runtime-validators.ts
var RegisteredProjectCapabilityValidator = class {
  id = "registered-project-capabilities";
  validate(graph, registry) {
    return [...graph.capabilities].filter((capabilityId) => !registry.has(capabilityId)).map((capabilityId) => ({
      code: "CAPABILITY_NOT_INSTALLED",
      severity: "error",
      entityId: graph.manifest.id,
      capabilityId,
      message: `Required capability "${capabilityId}" is not registered.`
    }));
  }
};
var InvestigationCoreReferenceValidator = class {
  id = "investigation-core-references";
  validate(graph) {
    const issues = [];
    const requireReference = (exists, sourceId, targetId, relation) => {
      if (!exists) {
        issues.push({
          code: "REFERENCE_NOT_FOUND",
          severity: "error",
          entityId: sourceId,
          relatedEntityIds: [targetId],
          message: `${sourceId} references missing ${relation} "${targetId}".`
        });
      }
    };
    for (const phase of graph.investigation.phases) {
      for (const id of phase.activityIds ?? []) {
        requireReference(graph.activitiesById.has(id), phase.id, id, "activity");
      }
      for (const id of phase.lessonIds ?? []) {
        requireReference(graph.lessonsById.has(id), phase.id, id, "lesson");
      }
      for (const id of [...phase.entryRuleIds ?? [], ...phase.completionRuleIds ?? []]) {
        requireReference(graph.rulesById.has(id), phase.id, id, "rule");
      }
    }
    for (const evidence of graph.evidenceById.values()) {
      if (evidence.availability.availableFromPhaseId !== void 0) {
        const phaseId = evidence.availability.availableFromPhaseId;
        requireReference(
          graph.investigation.phases.some((phase) => phase.id === phaseId),
          evidence.id,
          phaseId,
          "phase"
        );
      }
      for (const id of [
        ...evidence.availability.ruleIds ?? [],
        ...evidence.unlockRuleIds ?? []
      ]) {
        requireReference(graph.rulesById.has(id), evidence.id, id, "rule");
      }
    }
    for (const activity of graph.activitiesById.values()) {
      const extension = investigationExtension(activity.extensions?.["investigation"]);
      for (const id of extension?.evidenceProducedIds ?? []) {
        requireReference(graph.evidenceById.has(id), activity.id, id, "evidence");
      }
      for (const id of extension?.ruleIds ?? []) {
        requireReference(graph.rulesById.has(id), activity.id, id, "rule");
      }
      for (const id of extension?.randomizationIds ?? []) {
        requireReference(graph.randomizationsById.has(id), activity.id, id, "randomization");
      }
      for (const cost of extension?.resourceCosts ?? []) {
        requireReference(
          graph.resourcesById.has(cost.resourceId),
          activity.id,
          cost.resourceId,
          "resource"
        );
      }
    }
    for (const randomization of graph.randomizationsById.values()) {
      requireReference(
        graph.stateById.has(randomization.outputStateId),
        randomization.id,
        randomization.outputStateId,
        "state variable"
      );
    }
    for (const npc of graph.npcsById.values()) {
      for (const dialogue of npc.dialogueNodes ?? []) {
        for (const id of dialogue.availabilityRuleIds ?? []) {
          requireReference(graph.rulesById.has(id), npc.id, id, "rule");
        }
        for (const id of dialogue.evidenceProducedIds ?? []) {
          requireReference(graph.evidenceById.has(id), npc.id, id, "evidence");
        }
      }
    }
    for (const id of graph.finalSubmission.availabilityRuleIds ?? []) {
      requireReference(graph.rulesById.has(id), graph.finalSubmission.id, id, "rule");
    }
    return issues;
  }
};
var InvestigationValueValidator = class {
  id = "investigation-values";
  validate(graph) {
    const issues = [];
    if (graph.investigation.phases.length === 0) {
      issues.push({
        code: "INVESTIGATION_PHASES_EMPTY",
        severity: "error",
        entityId: graph.investigation.id,
        message: "An investigation requires at least one phase."
      });
    }
    collectDuplicateNumbers(
      graph.investigation.phases.map((phase) => ({ id: phase.id, value: phase.order })),
      "PHASE_ORDER_DUPLICATE",
      issues
    );
    collectDuplicateNumbers(
      graph.caseBoard.sections.map((section) => ({ id: section.id, value: section.order })),
      "BOARD_SECTION_ORDER_DUPLICATE",
      issues
    );
    for (const section of graph.finalSubmission.sections) {
      if ((section.minEvidenceCount ?? 0) < 0) {
        issues.push({
          code: "FINAL_EVIDENCE_COUNT_INVALID",
          severity: "error",
          entityId: section.id,
          message: `Final section "${section.id}" cannot require a negative evidence count.`
        });
      }
    }
    for (const resource of graph.resourcesById.values()) {
      if (resource.min !== void 0 && resource.initialAmount < resource.min || resource.max !== void 0 && resource.initialAmount > resource.max || resource.min !== void 0 && resource.max !== void 0 && resource.min > resource.max) {
        issues.push({
          code: "RESOURCE_BOUNDS_INVALID",
          severity: "error",
          entityId: resource.id,
          message: `Resource "${resource.id}" has inconsistent initial/minimum/maximum values.`
        });
      }
    }
    return issues;
  }
};
var InvestigationPublicationValidator = class {
  id = "investigation-publication";
  validate(graph) {
    const issues = [];
    if (graph.manifest.status !== "published") {
      issues.push({
        code: "PROJECT_NOT_PUBLISHED",
        severity: "warning",
        entityId: graph.manifest.id,
        message: `Project "${graph.manifest.id}" is in ${graph.manifest.status} status.`,
        suggestion: "Publish the package before assigning it to a classroom."
      });
    }
    for (const phase of graph.investigation.phases) {
      const hasWork = (phase.activityIds?.length ?? 0) + (phase.lessonIds?.length ?? 0) > 0;
      const hasCompletion = (phase.completionRuleIds?.length ?? 0) > 0;
      if (!phase.optional && !hasWork && !hasCompletion) {
        issues.push({
          code: "PHASE_WITHOUT_PROGRESS_PATH",
          severity: "warning",
          entityId: phase.id,
          phaseId: phase.id,
          message: `Required phase "${phase.id}" has no configured work or completion rule.`
        });
      }
    }
    if (graph.finalSubmission.sections.length === 0) {
      issues.push({
        code: "FINAL_SUBMISSION_EMPTY",
        severity: "error",
        entityId: graph.finalSubmission.id,
        message: "A final submission requires at least one configured section."
      });
    }
    return issues;
  }
};
function collectDuplicateNumbers(entries, code, issues) {
  const seen = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (!Number.isFinite(entry.value) || entry.value < 0) {
      issues.push({
        code: "ORDER_VALUE_INVALID",
        severity: "error",
        entityId: entry.id,
        message: `Order for "${entry.id}" must be a non-negative number.`
      });
      continue;
    }
    const prior = seen.get(entry.value);
    if (prior !== void 0) {
      issues.push({
        code,
        severity: "error",
        entityId: entry.id,
        relatedEntityIds: [prior],
        message: `Order ${entry.value} is shared by "${prior}" and "${entry.id}".`
      });
    } else {
      seen.set(entry.value, entry.id);
    }
  }
}
function investigationExtension(value) {
  return typeof value === "object" && value !== null ? value : void 0;
}

// src/app/core/collections/immutable-collections.ts
var ImmutableMap = class {
  storage;
  constructor(entries = []) {
    this.storage = new Map(entries);
  }
  get size() {
    return this.storage.size;
  }
  get(key) {
    return this.storage.get(key);
  }
  has(key) {
    return this.storage.has(key);
  }
  entries() {
    return this.storage.entries();
  }
  keys() {
    return this.storage.keys();
  }
  values() {
    return this.storage.values();
  }
  forEach(callbackfn, thisArg) {
    this.storage.forEach((value, key) => callbackfn.call(thisArg, value, key, this));
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get [Symbol.toStringTag]() {
    return "ImmutableMap";
  }
};
var ImmutableSet = class {
  storage;
  constructor(values = []) {
    this.storage = new Set(values);
  }
  get size() {
    return this.storage.size;
  }
  has(value) {
    return this.storage.has(value);
  }
  entries() {
    return this.storage.entries();
  }
  keys() {
    return this.storage.keys();
  }
  values() {
    return this.storage.values();
  }
  forEach(callbackfn, thisArg) {
    this.storage.forEach((value) => callbackfn.call(thisArg, value, value, this));
  }
  [Symbol.iterator]() {
    return this.values();
  }
  get [Symbol.toStringTag]() {
    return "ImmutableSet";
  }
};

// src/app/templates/investigation/package/investigation-project-package-assembler.ts
var investigationProjectPackageDescriptor = {
  requiredFiles: [
    "project.json",
    "investigation.json",
    "case-board.json",
    "evidence.json",
    "activities.json",
    "rules.json",
    "state.json",
    "final-submission.json"
  ],
  optionalFiles: [
    "lessons.json",
    "resources.json",
    "randomization.json",
    "npcs.json",
    "teams.json",
    "assessments.json"
  ]
};
var InvestigationProjectPackageAssembler = class {
  assemble(location, files) {
    const issues = [];
    const manifest = this.entity(files["project.json"], "project.json", issues);
    const investigation = this.entity(
      files["investigation.json"],
      "investigation.json",
      issues
    );
    const caseBoard = this.entity(
      files["case-board.json"],
      "case-board.json",
      issues
    );
    const finalSubmission = this.entity(
      files["final-submission.json"],
      "final-submission.json",
      issues
    );
    if (manifest === void 0 || investigation === void 0 || caseBoard === void 0 || finalSubmission === void 0) {
      return { issues };
    }
    if (manifest.id !== location.projectId) {
      issues.push({
        code: "PROJECT_ID_MISMATCH",
        severity: "error",
        file: "project.json",
        entityId: manifest.id,
        message: `Manifest ID "${manifest.id}" does not match requested project "${location.projectId}".`
      });
    }
    if (manifest.template?.id !== "investigation") {
      issues.push({
        code: "TEMPLATE_NOT_SUPPORTED",
        severity: "error",
        file: "project.json",
        entityId: manifest.id,
        message: "Project package does not declare the Investigation template."
      });
    }
    if (!this.supportsSchema(manifest.schemaVersion)) {
      issues.push({
        code: "SCHEMA_VERSION_UNSUPPORTED",
        severity: "error",
        file: "project.json",
        entityId: manifest.id,
        message: `Schema version "${manifest.schemaVersion}" is not supported by this V1 loader.`
      });
    }
    const globallySeen = /* @__PURE__ */ new Set();
    for (const entity of [manifest, investigation, caseBoard, finalSubmission]) {
      this.trackId(entity.id, "project package", globallySeen, issues);
    }
    for (const section of caseBoard.sections ?? []) {
      this.trackId(section.id, "case-board.json", globallySeen, issues);
    }
    const evidenceById = this.index(
      files["evidence.json"],
      "evidence.json",
      globallySeen,
      issues
    );
    const activitiesById = this.index(
      files["activities.json"],
      "activities.json",
      globallySeen,
      issues
    );
    const lessonsById = this.index(
      files["lessons.json"],
      "lessons.json",
      globallySeen,
      issues,
      true
    );
    const rulesById = this.index(
      files["rules.json"],
      "rules.json",
      globallySeen,
      issues
    );
    const stateById = this.index(
      files["state.json"],
      "state.json",
      globallySeen,
      issues
    );
    const resourcesById = this.index(
      files["resources.json"],
      "resources.json",
      globallySeen,
      issues,
      true
    );
    const randomizationsById = this.index(
      files["randomization.json"],
      "randomization.json",
      globallySeen,
      issues,
      true
    );
    const npcsById = this.index(
      files["npcs.json"],
      "npcs.json",
      globallySeen,
      issues,
      true
    );
    const teams = files["teams.json"] === void 0 ? void 0 : this.record(files["teams.json"], "teams.json", issues);
    if (issues.some((issue) => issue.severity === "error")) {
      return { issues };
    }
    return {
      graph: {
        tenantId: location.tenantId,
        projectId: location.projectId,
        projectVersion: location.projectVersion,
        manifest: freeze(manifest),
        investigation: freeze(investigation),
        caseBoard: freeze(caseBoard),
        evidenceById,
        activitiesById,
        lessonsById,
        rulesById,
        stateById,
        resourcesById,
        randomizationsById,
        npcsById,
        teams: teams === void 0 ? void 0 : freeze(teams),
        finalSubmission: freeze(finalSubmission),
        capabilities: new ImmutableSet(manifest.capabilities)
      },
      issues
    };
  }
  index(value, file, globallySeen, issues, optional = false) {
    if (value === void 0 && optional) {
      return new ImmutableMap();
    }
    if (!isRecord2(value) || !Array.isArray(value["items"])) {
      issues.push({
        code: "INVALID_FILE_SHAPE",
        severity: "error",
        file,
        message: `Project file "${file}" must contain an items array.`
      });
      return new ImmutableMap();
    }
    const entries = [];
    const fileSeen = /* @__PURE__ */ new Set();
    for (const item of value["items"]) {
      if (!isEntity(item)) {
        issues.push({
          code: "INVALID_ENTITY",
          severity: "error",
          file,
          message: `Project file "${file}" contains an entity without stable id/schemaVersion.`
        });
        continue;
      }
      if (fileSeen.has(item.id)) {
        issues.push({
          code: "DUPLICATE_ID",
          severity: "error",
          file,
          entityId: item.id,
          message: `ID "${item.id}" is duplicated in "${file}".`
        });
        continue;
      }
      fileSeen.add(item.id);
      this.trackId(item.id, file, globallySeen, issues);
      entries.push([item.id, freeze(item)]);
    }
    return new ImmutableMap(entries);
  }
  entity(value, file, issues) {
    if (!isEntity(value)) {
      issues.push({
        code: "INVALID_ENTITY",
        severity: "error",
        file,
        message: `Project file "${file}" must contain an entity with id and schemaVersion.`
      });
      return void 0;
    }
    return value;
  }
  record(value, file, issues) {
    if (!isRecord2(value)) {
      issues.push({
        code: "INVALID_FILE_SHAPE",
        severity: "error",
        file,
        message: `Project file "${file}" must contain an object.`
      });
      return void 0;
    }
    return value;
  }
  trackId(id, file, seen, issues) {
    if (seen.has(id)) {
      issues.push({
        code: "DUPLICATE_ID",
        severity: "error",
        file,
        entityId: id,
        message: `ID "${id}" is duplicated across the project package.`
      });
    }
    seen.add(id);
  }
  supportsSchema(version) {
    return version.split(".")[0] === "1";
  }
};
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isEntity(value) {
  return isRecord2(value) && typeof value["id"] === "string" && value["id"].trim() === value["id"] && /^[a-z0-9][a-z0-9._-]*$/i.test(value["id"]) && typeof value["schemaVersion"] === "string" && /^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/.test(value["schemaVersion"]);
}
function freeze(value) {
  const copy = structuredClone(value);
  return deepFreeze2(copy);
}
function deepFreeze2(value) {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const nested of Object.values(value)) {
    deepFreeze2(nested);
  }
  return value;
}

// src/app/runtime/local-investigation-runtime.ts
var definitionAdapter = {
  tenantId: (definitions) => definitions.tenantId,
  rules: (definitions) => [...definitions.rulesById.values()],
  stateDefinitions: (definitions) => definitions.stateById
};
var LocalInvestigationRuntime = class {
  capabilities = new CapabilityRegistry();
  events = new EventRegistry();
  conditions = new ConditionRegistry();
  actions = new ActionRegistry();
  commandHandlers = new CommandHandlerRegistry();
  eventCommands = new EventCommandRegistry();
  validation = new ValidationService();
  persistence;
  realtime = new InMemoryRealtimeAdapter();
  assets = new InMemoryAssetStorageAdapter();
  state;
  eventBus;
  tracer = new MemoryRuntimeTracer();
  idempotency = new InMemoryIdempotencyStore();
  eventLog = new RuntimeEventLog();
  initializer;
  loader;
  engine;
  constructor(source, clock = new SystemClock(), persistence) {
    registerInvestigationCapabilities(this.capabilities);
    registerInvestigationEventPack(this.events, this.eventCommands);
    registerInvestigationConditionPack(this.conditions);
    registerCoreStateCommandPack(this.actions, this.commandHandlers);
    registerInvestigationActionPack(this.actions, this.commandHandlers);
    this.validation.register(new RegisteredProjectCapabilityValidator());
    this.validation.register(new InvestigationCoreReferenceValidator());
    this.validation.register(new InvestigationValueValidator());
    this.validation.register(new InvestigationPublicationValidator());
    this.persistence = persistence ?? new InMemoryRuntimePersistenceAdapter(clock);
    this.state = new RuntimeStateService(this.persistence, this.realtime);
    this.eventBus = new RuntimeEventBus(this.events);
    this.initializer = new InvestigationRuntimeInitializer(clock);
    this.loader = new ProjectPackageLoaderService(
      source,
      new InvestigationProjectPackageAssembler(),
      investigationProjectPackageDescriptor,
      this.validation,
      this.capabilities
    );
    this.engine = new RuntimeEngine(
      this.eventBus,
      this.state,
      new DeterministicRuleEngine(this.conditions, this.actions),
      new RegisteredCommandExecutor(this.commandHandlers, void 0, clock),
      this.eventCommands,
      definitionAdapter,
      this.idempotency,
      this.eventLog,
      this.tracer,
      8,
      { mode: "localMock", allowLocalAuthorityBypass: true }
    );
  }
  loadProject(location) {
    return this.loader.load(location);
  }
  async initializeScope(graph, scope, overwrite = false) {
    const initialized = this.initializer.create(graph, scope);
    if (initialized.errors?.some((error) => error.severity === "error" || error.severity === "fatal")) {
      return initialized;
    }
    const persisted = await this.state.initialize(scope, initialized.snapshot, overwrite);
    return {
      snapshot: persisted.snapshot ?? initialized.snapshot,
      errors: [...initialized.errors ?? [], ...persisted.errors ?? []]
    };
  }
  dispatch(scope, event, graph) {
    return this.engine.dispatch(scope, event, graph);
  }
};

// src/app/projects/mystery-substance/legacy-mystery-state.adapter.ts
var legacyProjectKey = "pbl.mysterySubstance.state.v1";
var legacyEvidenceMap = {
  sample: "evidence-inventory",
  photo: "evidence-shelf-scene",
  temperature: "evidence-temperature-log",
  label: "evidence-label-list",
  witness: "evidence-witness-note",
  solution: "evidence-test-kit",
  conductivity: "evidence-probe-calibration",
  "water-reference": "evidence-water-reference",
  "indicator-key": "evidence-indicator-key",
  "shelf-audit": "evidence-shelf-audit"
};
var LegacyMysteryStateAdapter = class {
  read(storage) {
    const raw = storage?.getItem(legacyProjectKey);
    if (raw === null || raw === void 0) {
      return void 0;
    }
    try {
      const value = JSON.parse(raw);
      if (!isRecord3(value)) {
        return void 0;
      }
      const savedClues = Array.isArray(value["savedClues"]) ? value["savedClues"].filter((item) => typeof item === "string") : [];
      const vialObservations = isRecord3(value["vialObservations"]) ? Object.fromEntries(
        Object.entries(value["vialObservations"]).filter(
          (entry) => typeof entry[1] === "string"
        )
      ) : {};
      return {
        savedEvidenceIds: savedClues.map((id) => legacyEvidenceMap[id]).filter((id) => id !== void 0),
        vialObservations
      };
    } catch {
      return void 0;
    }
  }
};
function isRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/app/projects/mystery-substance/mystery-evidence-records.ts
var mysteryEvidenceRecords = {
  "evidence-inventory": {
    text: "THE UNLABELED SHELF\nEVIDENCE FILE E-01: FOUR-VIAL INVENTORY\n\nVial A \u2014 sealed; blue cap; small white cubic crystals visible\nVial B \u2014 sealed; yellow cap; shiny white crystals visible\nVial C \u2014 sealed; violet cap; fine white powder visible\nVial D \u2014 sealed; teal cap; very fine white powder visible\n\nAll four original product labels are missing. Temporary vial codes A\u2013D were\nadded without opening the containers.\n\nInventory questions:\n1. Which vials can be grouped by appearance?\n2. Why can two materials look similar but have different properties?\n3. Which test should be run on all four vials under the same conditions?"
  },
  "evidence-shelf-scene": {
    text: "THE UNLABELED SHELF\nEVIDENCE FILE E-02: SHELF SCENE RECORD\n\n- Four sealed vials were found on the dry-materials shelf.\n- Four empty label clips were attached to the shelf edge.\n- No spill, broken container, or open lid was found.\n- A conductivity probe, water station, Solution A, and Indicator B were in the\n  nearby virtual test kit.\n- A product inventory listed four materials: table salt, sugar, baking soda,\n  and cornstarch.\n\nThe scene record documents where objects were found. It does not identify any\nvial. Students must use multiple repeatable tests before restoring labels."
  },
  "evidence-temperature-log": {
    columns: ["case id", "vial id", "time minutes", "temperature celsius", "observer note"],
    rows: [
      ["SHELF-4", "C", "0", "22", "Starting temperature"],
      ["SHELF-4", "C", "1", "21", "Small bubbles begin"],
      ["SHELF-4", "C", "2", "20", "Steady bubbles"],
      ["SHELF-4", "C", "3", "19", "Strong bubbling; temperature lower"],
      ["SHELF-4", "C", "4", "19", "Bubbling slows"],
      ["SHELF-4", "C", "5", "19", "Final temperature"]
    ]
  },
  "evidence-label-list": {
    text: "THE UNLABELED SHELF\nEVIDENCE FILE E-04: RECOVERED LABEL LIST\n\nThe four missing shelf labels are:\n\n- TABLE SALT\n- SUGAR\n- BAKING SODA\n- CORNSTARCH\n\nAll four are dry white materials stored in sealed containers. This list does\nnot show which label belongs to Vial A, B, C, or D.\n\nDo not assign a label using appearance alone. Use the property matrix,\nchemical screening results, and evidence files together."
  },
  "evidence-witness-note": {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-05: SHELF MONITOR STATEMENT\n\n"I remember two vials having crystals and two looking like powders. During an\nearlier virtual test, only one vial bubbled strongly with Solution A. Another\npowder made Indicator B turn dark blue-black. I do not remember the vial\nletters, so the tests should be repeated."\n\nReliability questions:\n1. Which claims can be checked with the test matrix?\n2. Which details are incomplete?\n3. Why should repeatable measurements outweigh memory alone?'
  },
  "evidence-test-kit": {
    text: "THE UNLABELED SHELF\nEVIDENCE FILE E-06: VIRTUAL TEST KIT SAFETY CARD\n\nAvailable simulation tools:\n- Water solubility station\n- Conductivity probe\n- Test Solution A reaction screen\n- Indicator B color-change screen\n- Digital temperature sensor\n\nFair-test controls:\n- Use the same virtual amount of each material.\n- Use the same amount of test solution.\n- Use the same container and starting temperature.\n- Change only the vial being tested.\n\nThis is a simulation, not a real-world mixing guide. Never open, touch, smell,\ntaste, or mix unknown real substances."
  },
  "evidence-probe-calibration": {
    columns: [
      "control sample",
      "expected result",
      "probe light",
      "reading quality",
      "technician note"
    ],
    rows: [
      ["Distilled water", "Does not conduct", "Off", "Pass", "No false positive observed"],
      ["Salt solution", "Conducts", "Strong on", "Pass", "Probe responds immediately"],
      ["Sugar solution", "Does not conduct", "Off", "Pass", "Control remains dark"],
      [
        "Repeat salt solution",
        "Conducts",
        "Strong on",
        "Pass",
        "Response repeated under same conditions"
      ]
    ]
  },
  "evidence-water-reference": {
    columns: [
      "known material",
      "starting appearance",
      "water test observation",
      "final appearance",
      "reference use"
    ],
    rows: [
      [
        "Table salt",
        "Cubic crystals",
        "Dissolves steadily",
        "Clear solution",
        "Compare dissolving pattern only"
      ],
      [
        "Sugar",
        "Shiny crystals",
        "Dissolves steadily",
        "Clear solution",
        "Compare dissolving pattern only"
      ],
      [
        "Baking soda",
        "Fine powder",
        "Dissolves after a cloudy start",
        "Mostly clear solution",
        "Compare dissolving pattern only"
      ],
      [
        "Cornstarch",
        "Very fine powder",
        "Does not fully dissolve",
        "Cloudy suspension",
        "Compare suspension pattern only"
      ]
    ]
  },
  "evidence-indicator-key": {
    text: "INDICATOR B COLOR KEY\nCase: SHELF-4\n\nAMBER OR TAN\nNo starch response observed. Salt, sugar, and baking soda reference samples remain\nin this color range during the virtual test.\n\nDARK BLUE-BLACK\nStarch response observed. The cornstarch reference sample changes to this color.\n\nFAIR-TEST REMINDER\nUse equal virtual sample amounts, equal drops, equal timing, and the same display\nconditions. Describe the visible color before naming a material."
  },
  "evidence-shelf-audit": {
    text: "SHELF POSITION AUDIT\nCase: SHELF-4\n\nPOSITION 1 - Upper left:  Vial A, blue cap, sealed\nPOSITION 2 - Upper right: Vial B, gold cap, sealed\nPOSITION 3 - Lower left:  Vial C, violet cap, sealed\nPOSITION 4 - Lower right: Vial D, teal cap, sealed\n\nRECOVERED SCENE DETAILS\n- Four empty label clips were attached to the shelf edge.\n- No loose label remained beside a specific vial.\n- No container was broken and no substance was spilled.\n- Vial position documents the scene; it does not identify the contents.\n\nCHAIN-OF-EVIDENCE NOTE\nUse this record to reconstruct where each vial was found. Use repeatable property\nand reaction evidence to decide which product label belongs on each vial."
  }
};

// src/app/projects/mystery-substance/mystery-workbench.config.ts
var properties = "activity-property-comparison";
var reaction = "activity-reaction-comparison";
var scans = ["a", "b", "c", "d"].map((id) => `activity-scan-vial-${id}`);
var requiredCaseClueIds = [
  "evidence-inventory",
  "evidence-shelf-scene",
  "evidence-temperature-log",
  "evidence-label-list",
  "evidence-witness-note"
];
var links = [
  { evidenceId: "evidence-inventory", category: "clue", activityIds: scans },
  { evidenceId: "evidence-shelf-scene", category: "clue", activityIds: scans },
  {
    evidenceId: "evidence-temperature-log",
    category: "clue",
    activityIds: [reaction],
    keywords: "heat thermometer cold bubbles"
  },
  {
    evidenceId: "evidence-label-list",
    category: "clue",
    activityIds: ["activity-shelf-restoration"]
  },
  { evidenceId: "evidence-witness-note", category: "clue", activityIds: scans },
  {
    evidenceId: "evidence-test-kit",
    category: "guide",
    activityIds: [properties, reaction, ...scans],
    keywords: "equipment tools magnifier water probe scanner",
    instruction: "Use the on-screen instruments. Keep sample amounts and conditions equal when comparing vials. Do not taste or touch an unknown substance.",
    action: { activityId: properties, label: "Use the property tools" }
  },
  {
    evidenceId: "evidence-probe-calibration",
    category: "guide",
    activityIds: [properties],
    keywords: "conductivity electrical meter",
    instruction: "Compare the calibrated probe readings after the same water preparation. Keep the sample amount, water volume and testing conditions equal.",
    action: { activityId: properties, toolId: "conductivity", label: "Use the conductivity probe" }
  },
  {
    evidenceId: "evidence-water-reference",
    category: "guide",
    activityIds: [properties],
    keywords: "dissolve solubility cup",
    instruction: "Use equal 2 g samples in equal 50 mL water. Stir the same way and observe for 60 seconds. Compare clearing, cloudiness and settling.",
    action: { activityId: properties, toolId: "solubility", label: "Use the water test" }
  },
  {
    evidenceId: "evidence-indicator-key",
    category: "guide",
    activityIds: [reaction],
    keywords: "color colour reagent drops",
    instruction: "In the reaction rig, measure 5 mL and weigh 2 g before the sealed-vessel test. Add three drops of Indicator B at the indicated step. Compare the observed color with the source key.",
    action: { activityId: reaction, label: "Use the reaction rig" }
  },
  {
    evidenceId: "evidence-shelf-audit",
    category: "clue",
    activityIds: ["activity-shelf-restoration"],
    action: { activityId: "activity-shelf-restoration", label: "Open the shelf plan" }
  },
  ...scans.map((activityId, index) => ({
    evidenceId: `evidence-scan-vial-${"abcd"[index]}`,
    category: "result",
    activityIds: [activityId],
    action: { activityId, label: "Inspect this vial" }
  })),
  ...[
    ["evidence-property-trials", properties, "Run a physical test"],
    ["evidence-reaction-trials", reaction, "Run a reaction test"],
    ["evidence-conservation-trials", "activity-conservation-model", "Open the matter tracker"],
    ["evidence-shelf-case", "activity-shelf-restoration", "Open the shelf plan"],
    ["evidence-emergency-response", "activity-emergency-response", "Open the transfer challenge"]
  ].map(([evidenceId, activityId, label]) => ({
    evidenceId,
    category: "result",
    activityIds: [activityId],
    action: { activityId, label }
  }))
];
var mysteryWorkbenchLinks = links.map((link) => __spreadProps(__spreadValues({}, link), {
  sourceRecord: mysteryEvidenceRecords[link.evidenceId]
}));

// src/app/projects/mystery-substance/mystery-investigation.service.ts
var MysteryInvestigationService = class _MysteryInvestigationService {
  clock = new SystemClock();
  storage = browserStorage();
  runtime;
  scope;
  location;
  graph;
  initialization;
  snapshot = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "snapshot" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    true,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  errors = signal(
    [],
    ...ngDevMode ? [{ debugName: "errors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  legacyDrafts = signal(
    {},
    ...ngDevMode ? [{ debugName: "legacyDrafts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  importedLegacyState = signal(
    false,
    ...ngDevMode ? [{ debugName: "importedLegacyState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveState = signal(
    "saved",
    ...ngDevMode ? [{ debugName: "saveState" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor(projectDefinition, session, catalogEntry) {
    this.location = session === void 0 ? mysterySubstanceLocation : {
      tenantId: session.tenantId,
      projectId: session.projectId,
      projectVersion: session.projectVersion,
      reference: catalogEntry?.packageReference ?? mysterySubstanceLocation.reference
    };
    const packageFiles = isPackageFiles(projectDefinition) ? projectDefinition : mysterySubstanceProjectPackage;
    const source = new InMemoryProjectPackageSource({
      [this.location.reference]: packageFiles
    });
    const persistence = this.storage === void 0 ? new InMemoryRuntimePersistenceAdapter(this.clock) : new BrowserRuntimePersistenceAdapter(this.storage, this.clock);
    this.runtime = new LocalInvestigationRuntime(source, this.clock, persistence);
    this.scope = session === void 0 ? {
      tenantId: mysterySubstanceLocation.tenantId,
      projectId: mysterySubstanceLocation.projectId,
      projectVersion: mysterySubstanceLocation.projectVersion,
      classId: "local-class",
      studentId: "local-investigator",
      scopeType: "student"
    } : projectSessionRuntimeScope(session, "student");
  }
  async initialize() {
    if (this.initialization !== void 0) {
      return this.initialization;
    }
    this.initialization = this.initializeRuntime();
    return this.initialization;
  }
  async startActivity(activityId) {
    await this.dispatch("activity.started", activityId);
  }
  async reviewEvidence(evidenceId) {
    await this.collectEvidence(evidenceId);
    const evidence = this.snapshot()?.evidence;
    const reviewedCaseClues = requiredCaseClueIds.every((id) => {
      const status = evidence?.[id]?.status;
      return status !== void 0 && !["locked", "hidden", "available", "unopened"].includes(status);
    });
    if (reviewedCaseClues && this.snapshot()?.activities["activity-evidence-locker"]?.status !== "complete") {
      await this.dispatch("activity.completed", "activity-evidence-locker");
    }
  }
  async classifyEvidence(evidenceId, classification) {
    await this.dispatch("evidence.classified", evidenceId, { classification });
  }
  async annotateEvidence(evidenceId, note) {
    if (note.trim().length > 0) {
      await this.dispatch("evidence.annotationAdded", evidenceId, { note: note.trim() });
    }
  }
  async setEvidenceImportance(evidenceId, important) {
    await this.dispatch("evidence.importanceChanged", evidenceId, { important });
  }
  async addEvidenceToFinal(evidenceId) {
    await this.dispatch("evidence.usedInClaim", evidenceId);
    const draft = this.snapshot()?.finalSubmission.argumentDraft;
    const evidenceIds = [.../* @__PURE__ */ new Set([...draft?.evidenceIds ?? [], evidenceId])];
    await this.dispatch("finalSubmission.draftUpdated", "final-submission-case-file", {
      draft: __spreadProps(__spreadValues({}, structuredClone(draft ?? { evidenceIds: [] })), { evidenceIds })
    });
  }
  async createQuestion(text, sourceEvidenceId) {
    const question = text.trim();
    if (question.length === 0) {
      return;
    }
    await this.dispatch("board.questionCreated", `question-${createId()}`, {
      text: question,
      sourceEvidenceId
    });
  }
  async createStudentEvidence(title, observation) {
    await this.dispatch("evidence.studentCreated", `student-evidence-${createId()}`, {
      evidenceType: "observation",
      title: title.trim(),
      content: { text: observation.trim() }
    });
  }
  async saveTheory(draft) {
    const current = this.currentTheory();
    const payload = {
      statement: draft.statement,
      confidence: draft.confidence,
      reasoning: draft.reasoning,
      remainingQuestion: draft.remainingQuestion,
      evidenceIds: [...draft.evidenceIds],
      reasonForChange: draft.reasonForChange
    };
    if (current === void 0 || draft.createNew === true) {
      const hypothesisId = `hypothesis-${createId()}`;
      await this.dispatch("hypothesis.created", hypothesisId, payload);
      await this.selectTheory(hypothesisId);
      return;
    }
    await this.dispatch("hypothesis.revised", current.id, payload);
  }
  async selectTheory(hypothesisId) {
    await this.dispatch("hypothesis.selected", hypothesisId);
  }
  async openFinalInvestigation() {
    if (this.snapshot()?.finalSubmission.status === "closed") {
      await this.dispatch("finalSubmission.openRequested", "final-submission-case-file");
    }
  }
  async saveFinalDraft(draft) {
    await this.dispatch("finalSubmission.draftUpdated", "final-submission-case-file", {
      draft: __spreadProps(__spreadValues({}, draft), { evidenceIds: [...draft.evidenceIds] })
    });
    for (const evidenceId of draft.evidenceIds) {
      const state = this.snapshot();
      if (state?.evidence[evidenceId]?.status !== "usedInClaim" && state?.studentEvidence[evidenceId]?.usedInFinalClaim !== true) {
        await this.dispatch("evidence.usedInClaim", evidenceId);
      }
    }
  }
  async submitFinalInvestigation() {
    await this.openFinalInvestigation();
    await this.dispatch("finalSubmission.submitted", "final-submission-case-file");
    await this.dispatch("activity.completed", "activity-case-showcase");
    await this.dispatch("artifact.versionSaved", "artifact-final-investigation", {
      sourceActivityId: "activity-case-showcase",
      evidenceIds: this.snapshot()?.finalSubmission.argumentDraft.evidenceIds ?? [],
      content: this.snapshot()?.finalSubmission.argumentDraft ?? {}
    });
  }
  currentTheory() {
    const hypotheses = this.snapshot()?.hypotheses ?? [];
    return hypotheses.find((hypothesis) => hypothesis.selected) ?? hypotheses.at(-1);
  }
  async initializeRuntime() {
    const loaded = await this.runtime.loadProject(this.location);
    const errors = loaded.issues.filter((issue) => issue.severity === "error").map((issue) => issue.message);
    if (loaded.graph === void 0 || errors.length > 0) {
      this.errors.set(errors.length > 0 ? errors : ["The project package could not be loaded."]);
      this.loading.set(false);
      return;
    }
    this.graph = loaded.graph;
    const initialized = await this.runtime.initializeScope(loaded.graph, this.scope, false);
    this.snapshot.set(initialized.snapshot);
    this.errors.set((initialized.errors ?? []).map((error) => error.message));
    await this.importLegacyState();
    this.loading.set(false);
  }
  async startScan(vialId) {
    await this.startActivity(`activity-scan-${vialId}`);
  }
  async captureScan(vialId, observation, tags) {
    const activityId = `activity-scan-${vialId}`;
    const evidenceId = `evidence-scan-${vialId}`;
    await this.dispatch("activity.resultSubmitted", activityId, {
      result: {
        activityId,
        completed: true,
        outputs: { vialId, observation, tags: [...tags] },
        evidenceProduced: [{ evidenceId }]
      }
    });
    await this.dispatch("activity.completed", activityId);
    await this.dispatch("evidence.collected", evidenceId);
    if (observation.trim().length > 0) {
      await this.dispatch("evidence.annotationAdded", evidenceId, {
        note: observation.trim()
      });
    }
  }
  async collectEvidence(evidenceId) {
    const status = this.snapshot()?.evidence[evidenceId]?.status;
    if (status === "available" || status === "unopened" || status === "viewed") {
      await this.dispatch("evidence.collected", evidenceId);
    }
  }
  async captureActivity(activityId, evidenceId, result, note) {
    await this.dispatch("activity.started", activityId);
    await this.dispatch("activity.resultSubmitted", activityId, {
      result: {
        activityId,
        completed: true,
        outputs: structuredClone(result),
        evidenceProduced: [{ evidenceId }]
      }
    });
    await this.dispatch("activity.completed", activityId);
    await this.collectEvidence(evidenceId);
    if (note?.trim()) {
      await this.dispatch("evidence.annotationAdded", evidenceId, {
        note: note.trim()
      });
    }
    if (evidenceId === "evidence-shelf-case" || evidenceId === "evidence-final-case-file") {
      await this.dispatch("artifact.versionSaved", `artifact-${evidenceId}`, {
        sourceActivityId: activityId,
        evidenceIds: [evidenceId],
        content: structuredClone(result)
      });
    }
  }
  nextArtifactVersion(artifactId) {
    return (this.snapshot()?.artifacts?.[artifactId]?.latestVersion ?? 0) + 1;
  }
  async importLegacyState() {
    const storage = typeof localStorage === "undefined" ? void 0 : localStorage;
    const projection = new LegacyMysteryStateAdapter().read(storage);
    if (projection === void 0) {
      return;
    }
    this.legacyDrafts.set(projection.vialObservations);
    for (const evidenceId of projection.savedEvidenceIds) {
      await this.collectEvidence(evidenceId);
    }
    this.importedLegacyState.set(projection.savedEvidenceIds.length > 0 || Object.keys(projection.vialObservations).length > 0);
  }
  async dispatch(eventType, sourceId, payload) {
    if (this.graph === void 0) {
      return;
    }
    this.saveState.set(isOnline() ? "saving" : "pending");
    const id = createId();
    const event = {
      id,
      clientEventId: `client-${id}`,
      tenantId: this.location.tenantId,
      eventType,
      projectId: this.location.projectId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      actor: { type: "student", id: this.scope.studentId },
      sourceId,
      payload
    };
    const result = await this.runtime.dispatch(this.scope, event, this.graph);
    if (result.snapshot !== void 0) {
      this.snapshot.set(result.snapshot);
    }
    const errors = (result.errors ?? []).filter((error) => error.severity === "error" || error.severity === "fatal").map((error) => error.message);
    if (errors.length > 0) {
      this.errors.update((current) => [...current, ...errors]);
    }
    this.saveState.set(isOnline() ? "saved" : "pending");
  }
  static \u0275fac = function MysteryInvestigationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MysteryInvestigationService)(\u0275\u0275inject(PROJECT_DEFINITION, 8), \u0275\u0275inject(PROJECT_SESSION_CONTEXT, 8), \u0275\u0275inject(PROJECT_CATALOG_ENTRY, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MysteryInvestigationService, factory: _MysteryInvestigationService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MysteryInvestigationService, [{
    type: Injectable
  }], () => [{ type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [PROJECT_DEFINITION]
  }] }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [PROJECT_SESSION_CONTEXT]
  }] }, { type: void 0, decorators: [{
    type: Optional
  }, {
    type: Inject,
    args: [PROJECT_CATALOG_ENTRY]
  }] }], null);
})();
function createId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function browserStorage() {
  try {
    return typeof localStorage === "undefined" ? void 0 : localStorage;
  } catch {
    return void 0;
  }
}
function isOnline() {
  return typeof navigator === "undefined" || navigator.onLine;
}
function isPackageFiles(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "project.json" in value;
}

export {
  SystemClock,
  BrowserRuntimePersistenceAdapter,
  LocalInvestigationRuntime,
  mysteryWorkbenchLinks,
  MysteryInvestigationService
};
//# debugId=95350b92-f858-5b3e-a477-ee48c9ab6e15
//# sourceMappingURL=chunk-ITTVRLH2.js.map
