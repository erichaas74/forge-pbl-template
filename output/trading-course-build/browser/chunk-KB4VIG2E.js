import {
  requireCompetitionConfig,
  requireValid
} from "./chunk-2T3THWAB.js";
import {
  validAssetUrl
} from "./chunk-IIEET437.js";
import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/showcase/final-showcase.models.ts
var FINAL_SHOWCASE = new InjectionToken("Fictional championship showcase");
function requireFinalShowcase(value, project) {
  const d = value;
  requireValid(d && d.schemaVersion === "1.0" && d.fictional === true && typeof d.title === "string", "The final showcase must declare itself fictional.");
  requireValid(validAssetUrl(d.openingImage) && (d.mysteryImage === void 0 || validAssetUrl(d.mysteryImage)) && (d.recapVideo === void 0 || validAssetUrl(d.recapVideo)) && (d.recapCaptions === void 0 || validAssetUrl(d.recapCaptions)), "Invalid showcase media.");
  requireValid(Array.isArray(d.highlights) && d.highlights.length >= 1 && d.highlights.length <= 6 && d.highlights.every((h) => h && [h.id, h.week, h.title, h.caption, h.narration, h.skill].every((s) => typeof s === "string" && s.length > 0) && (h.image === void 0 || h.image && validAssetUrl(h.image.src) && typeof h.image.alt === "string" && h.image.alt.trim().length > 0) && h.points && Object.entries(h.points).every(([id, points]) => project.teams.some((t) => t.id === id) && Number.isInteger(points) && points >= 0)), "Invalid fictional season highlights.");
  requireValid(Array.isArray(d.rounds) && d.rounds.length === 3 && d.rounds.map((r) => r?.kind).join() === "simultaneous,buzzer,wager", "The sample final needs simultaneous, buzzer, and wager rounds.");
  requireCompetitionConfig(__spreadProps(__spreadValues({}, project), { rounds: d.rounds }));
  requireValid(d.answers && d.rounds.every((r) => typeof d.answers[r.id] === "string") && d.wagers && Object.entries(d.wagers).every(([id, v]) => project.teams.some((t) => t.id === id) && Number.isInteger(v) && v >= 0) && project.teams.some((t) => t.id === d.buzzerTeamId) && project.teams.some((t) => t.id === d.missedWagerTeamId), "Invalid demonstration answers or teams.");
  return d;
}

export {
  FINAL_SHOWCASE,
  requireFinalShowcase
};
//# debugId=790804c3-b424-5265-bfe6-702841fef339
//# sourceMappingURL=chunk-KB4VIG2E.js.map
