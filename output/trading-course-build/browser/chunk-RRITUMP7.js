import {
  evaluateBalanceLock
} from "./chunk-YQ5R4IZP.js";
import {
  evaluateGearLock
} from "./chunk-RAYONVPN.js";
import {
  evaluateMachine
} from "./chunk-NRR2X4JL.js";

// src/app/templates/heist/escape/domain/escape-puzzles.ts
var escapePuzzleEvaluators = {
  "machine-lock": (p, a) => p.type === "machine-lock" && evaluateMachine(p.lock, a),
  "gear-lock": (p, a) => p.type === "gear-lock" && Array.isArray(a) && evaluateGearLock(p.lock, a),
  "balance-lock": (p, a) => p.type === "balance-lock" && Array.isArray(a) && evaluateBalanceLock(p.lock, a),
  number: (p, a) => p.type === "number" && typeof a === "number" && Number.isFinite(a) && a === p.answer,
  code: (p, a) => p.type === "code" && typeof a === "string" && a === p.answer,
  timing: (p, a) => p.type === "timing" && typeof a === "number" && Number.isInteger(a) && a >= p.safeStart && a === p.safeEnd - p.crossing,
  balance: (p, a) => p.type === "balance" && Array.isArray(a) && a.length > 0 && new Set(a).size === a.length && a.every((i) => Number.isInteger(i) && i >= 0 && i < p.weights.length) && a.reduce((sum, i) => sum + p.weights[i], 0) === p.target
};
function evaluateEscapePuzzle(puzzle, answer) {
  return escapePuzzleEvaluators[puzzle.type](puzzle, answer);
}

export {
  escapePuzzleEvaluators,
  evaluateEscapePuzzle
};
//# debugId=f9b29fc5-6f01-5290-9b8b-5ce448fe4dc0
//# sourceMappingURL=chunk-RRITUMP7.js.map
