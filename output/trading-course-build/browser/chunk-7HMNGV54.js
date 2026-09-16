import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/balance-lock/balance-lock.migration.ts
var row = (value) => !!value && typeof value === "object" && !Array.isArray(value);
function pistonUpgrade(before, after) {
  return row(before) && row(after) && before["type"] === "balance-lock" && after["type"] === "balance-lock" && row(before["lock"]) && row(after["lock"]) && [void 0, "two-pan"].includes(before["lock"]["mechanism"]) && after["lock"]["mechanism"] === "piston-counterweight";
}
function acceptsPistonUpgrade(beforeFingerprint, afterFingerprint) {
  let upgraded = false;
  const same = (before, after) => {
    if (before === after) return true;
    if (Array.isArray(before) && Array.isArray(after))
      return before.length === after.length && before.every((value, i) => same(value, after[i]));
    if (!row(before) || !row(after)) return false;
    const puzzleUpgrade = pistonUpgrade(before, after);
    if (puzzleUpgrade) upgraded = true;
    const stepUpgrade = pistonUpgrade(before["puzzle"], after["puzzle"]);
    const keys = /* @__PURE__ */ new Set([...Object.keys(before), ...Object.keys(after)]);
    return [...keys].every((key) => {
      if (puzzleUpgrade && key === "hint" || stepUpgrade && key === "clues") return true;
      if (puzzleUpgrade && key === "lock") {
        const oldLock = __spreadValues({}, before[key]), newLock = __spreadValues({}, after[key]);
        delete oldLock["mechanism"];
        delete newLock["mechanism"];
        return same(oldLock, newLock);
      }
      return Object.hasOwn(before, key) && Object.hasOwn(after, key) && same(before[key], after[key]);
    });
  };
  try {
    return same(JSON.parse(beforeFingerprint), JSON.parse(afterFingerprint)) && upgraded;
  } catch {
    return false;
  }
}

// src/app/templates/heist/escape/locks/timing-cage/timing-cage.migration.ts
var row2 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var cageStep = (value) => {
  const puzzle = value["puzzle"];
  if (!row2(puzzle) || puzzle["type"] !== "machine-lock" || !row2(puzzle["lock"])) return false;
  const stages = puzzle["lock"]["stages"];
  return Array.isArray(stages) && stages.length === 1 && row2(stages[0]) && stages[0]["kind"] === "timing-wheels" && row2(stages[0]["presentation"]) && stages[0]["presentation"]["kind"] === "timing-cage";
};
function acceptsTimingCageUpgrade(before, after) {
  let upgraded = false;
  const normalize = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row2(a) || !row2(b)) return b;
    const result = {};
    const step = cageStep(b) && row2(a["puzzle"]) && a["puzzle"]["type"] === "machine-lock";
    const timing = a["kind"] === "timing-wheels" && b["kind"] === "timing-wheels" && a["presentation"] === void 0 && row2(b["presentation"]) && b["presentation"]["kind"] === "timing-cage";
    if (timing) upgraded = true;
    for (const key of Object.keys(b)) {
      if (timing && key === "presentation") continue;
      result[key] = (timing || step) && key === "success" ? a[key] : normalize(a[key], b[key]);
    }
    return result;
  };
  try {
    const old = JSON.parse(before), normalized = JSON.stringify(normalize(old, JSON.parse(after)));
    const canonical = (value) => JSON.stringify(
      value,
      (_key, item) => row2(item) ? Object.fromEntries(
        Object.keys(item).sort().map((key) => [key, item[key]])
      ) : item
    );
    return upgraded && (canonical(old) === canonical(JSON.parse(normalized)) || acceptsPistonUpgrade(before, normalized));
  } catch {
    return false;
  }
}

// src/app/templates/heist/escape/locks/fraction-cage/fraction-cage.migration.ts
var row3 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
function acceptsFractionCageUpgrade(before, after) {
  let changed = false;
  const normalize = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row3(a) || !row3(b)) return b;
    const result = {};
    const upgrade = a["kind"] === "fraction-gear" && b["kind"] === "fraction-gear" && a["presentation"] === void 0 && row3(b["presentation"]) && b["presentation"]["kind"] === "fraction-cage";
    for (const key of Object.keys(b)) {
      if (upgrade && key === "presentation") {
        changed = true;
        continue;
      }
      result[key] = normalize(a[key], b[key]);
    }
    return result;
  };
  const canonical = (v) => JSON.stringify(
    v,
    (_k, value) => row3(value) ? Object.fromEntries(
      Object.keys(value).sort().map((k) => [k, value[k]])
    ) : value
  );
  try {
    const old = JSON.parse(before), next = normalize(old, JSON.parse(after));
    const normalized = JSON.stringify(next);
    return changed && (canonical(old) === canonical(next) || acceptsTimingCageUpgrade(before, normalized) || acceptsPistonUpgrade(before, normalized));
  } catch {
    return false;
  }
}

// src/app/templates/heist/escape/gear-lock/gear-cage/gear-cage.migration.ts
var row4 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
function acceptsGearCageUpgrade(before, after) {
  let changed = false;
  const normalize = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row4(a) || !row4(b)) return b;
    const upgrade = Array.isArray(a["gears"]) && Array.isArray(b["gears"]) && a["driverTeeth"] !== void 0 && a["presentation"] === void 0 && row4(b["presentation"]) && b["presentation"]["kind"] === "gear-cage";
    const value = {};
    for (const key of Object.keys(b)) {
      if (upgrade && key === "presentation") {
        changed = true;
        continue;
      }
      value[key] = normalize(a[key], b[key]);
    }
    return value;
  };
  const canonical = (v) => JSON.stringify(
    v,
    (_key, value) => row4(value) ? Object.fromEntries(
      Object.keys(value).sort().map((k) => [k, value[k]])
    ) : value
  );
  try {
    const old = JSON.parse(before), next = normalize(old, JSON.parse(after)), text = JSON.stringify(next);
    return changed && (canonical(old) === canonical(next) || acceptsFractionCageUpgrade(before, text) || acceptsTimingCageUpgrade(before, text) || acceptsPistonUpgrade(before, text));
  } catch {
    return false;
  }
}

// src/app/templates/heist/escape/locks/optics-cage/optics-cage.migration.ts
var row5 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
function acceptsOpticsCageUpgrade(before, after) {
  let changed = false;
  const normalize = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row5(a) || !row5(b)) return b;
    const upgrade = a["kind"] === "reflection" && b["kind"] === "reflection" && a["presentation"] === void 0 && row5(b["presentation"]) && b["presentation"]["kind"] === "optics-cage";
    return Object.fromEntries(
      Object.keys(b).filter((key) => {
        if (upgrade && key === "presentation") {
          changed = true;
          return false;
        }
        return true;
      }).map((key) => [key, normalize(a[key], b[key])])
    );
  };
  const canonical = (v) => JSON.stringify(
    v,
    (_key, value) => row5(value) ? Object.fromEntries(
      Object.keys(value).sort().map((k) => [k, value[k]])
    ) : value
  );
  try {
    const old = JSON.parse(before), next = normalize(old, JSON.parse(after)), text = JSON.stringify(next);
    return changed && (canonical(old) === canonical(next) || acceptsGearCageUpgrade(before, text) || acceptsFractionCageUpgrade(before, text) || acceptsTimingCageUpgrade(before, text) || acceptsPistonUpgrade(before, text));
  } catch {
    return false;
  }
}

// src/app/templates/heist/escape/locks/bridge-cage/bridge-cage.migration.ts
var row6 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
function acceptsBridgeCageUpgrade(before, after) {
  let changed = false;
  const normalize = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) return b.map((v, i) => normalize(a[i], v));
    if (!row6(a) || !row6(b)) return b;
    const upgrade = Array.isArray(a["stages"]) && Array.isArray(b["stages"]) && a["stages"].length === 2 && b["stages"].length === 2 && row6(b["stages"][0]) && b["stages"][0]["kind"] === "coordinate" && row6(b["stages"][1]) && b["stages"][1]["kind"] === "cable" && a["presentation"] === void 0 && row6(b["presentation"]) && b["presentation"]["kind"] === "bridge-cage";
    return Object.fromEntries(
      Object.keys(b).filter((key) => {
        if (upgrade && key === "presentation") {
          changed = true;
          return false;
        }
        return true;
      }).map((key) => [key, normalize(a[key], b[key])])
    );
  };
  const canonical = (v) => JSON.stringify(
    v,
    (_key, value) => row6(value) ? Object.fromEntries(
      Object.keys(value).sort().map((k) => [k, value[k]])
    ) : value
  );
  try {
    const old = JSON.parse(before), next = normalize(old, JSON.parse(after)), text = JSON.stringify(next);
    return changed && (canonical(old) === canonical(next) || acceptsOpticsCageUpgrade(before, text) || acceptsGearCageUpgrade(before, text) || acceptsFractionCageUpgrade(before, text) || acceptsTimingCageUpgrade(before, text) || acceptsPistonUpgrade(before, text));
  } catch {
    return false;
  }
}

export {
  acceptsPistonUpgrade,
  acceptsTimingCageUpgrade,
  acceptsFractionCageUpgrade,
  acceptsGearCageUpgrade,
  acceptsOpticsCageUpgrade,
  acceptsBridgeCageUpgrade
};
//# debugId=84908d66-dbfa-5ef9-8129-fa15f6d159c9
//# sourceMappingURL=chunk-7HMNGV54.js.map
