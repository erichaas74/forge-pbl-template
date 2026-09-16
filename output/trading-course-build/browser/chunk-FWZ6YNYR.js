import {
  emptyBalance,
  validPlacements
} from "./chunk-YQ5R4IZP.js";
import {
  emptyGears,
  validGearDraft
} from "./chunk-RAYONVPN.js";
import {
  initialMachine,
  validMachineAnswer
} from "./chunk-NRR2X4JL.js";

// src/app/templates/heist/escape/weekly/expedition-preview.models.ts
function initialPreviewAnswer(step) {
  const p = step.puzzle;
  if (p.type === "balance-lock") return emptyBalance(p.lock);
  if (p.type === "gear-lock") return emptyGears();
  if (p.type === "machine-lock") return initialMachine(p.lock);
  throw new Error(`CAPABILITY_NOT_INSTALLED: expedition preview renderer ${p.type}`);
}
function validPreviewAnswer(step, value) {
  const p = step.puzzle;
  if (p.type === "balance-lock") return Array.isArray(value) && validPlacements(p.lock, value);
  if (p.type === "gear-lock") return Array.isArray(value) && validGearDraft(p.lock, value);
  return p.type === "machine-lock" && validMachineAnswer(p.lock, value) && value.seals.length === 0;
}
function validatePreviewWeeks(value, steps) {
  const fail = () => {
    throw new Error("INVALID_HEIST_ESCAPE: previewWeeks");
  };
  const row = (v) => !!v && typeof v === "object" && !Array.isArray(v);
  const text = (v) => typeof v === "string" && v.trim().length > 0 && v.length <= 1500;
  const texts = (v) => Array.isArray(v) && v.length > 0 && v.length <= 8 && v.every(text);
  if (!Array.isArray(value) || value.length !== 4) return fail();
  const seen = /* @__PURE__ */ new Set();
  value.forEach((week, index) => {
    if (!row(week) || week["week"] !== index + 1 || !text(week["title"]) || !text(week["setting"]) || !texts(week["questions"]) || !texts(week["evidence"]) || !texts(week["controls"]) || !Array.isArray(week["sessions"]) || week["sessions"].length !== 2)
      return fail();
    for (const session of week["sessions"]) {
      if (!row(session) || !text(session["stepId"]) || !text(session["product"]) || !text(session["sample"]))
        return fail();
      const step = steps.find((s) => s.id === session["stepId"]);
      if (!step || seen.has(step.id)) return fail();
      seen.add(step.id);
    }
  });
  for (const step of steps) {
    if (!["balance-lock", "gear-lock", "machine-lock"].includes(step.puzzle.type))
      throw new Error(`CAPABILITY_NOT_INSTALLED: expedition preview renderer ${step.puzzle.type}`);
  }
}

export {
  initialPreviewAnswer,
  validPreviewAnswer,
  validatePreviewWeeks
};
//# debugId=c07d343d-8bb4-5082-baa3-e8049d921616
//# sourceMappingURL=chunk-FWZ6YNYR.js.map
