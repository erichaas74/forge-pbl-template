// src/app/templates/heist/gallery/domain/academic-locks.ts
var angularDistance = (a, b) => Math.abs(((a - b + 180) % 360 + 360) % 360 - 180);
var numeric = { evaluate: (lock, answer) => {
  const { calculation, setting } = answer;
  if (!Number.isFinite(calculation) || !Number.isFinite(setting) || setting < lock.min || setting > lock.max) return false;
  const tolerance = lock.tolerance ?? 0;
  const delta = lock.type === "rotation" && lock.wrap ? angularDistance(setting, lock.target) : Math.abs(setting - lock.target);
  return Math.abs(calculation - lock.target) <= tolerance && delta <= tolerance;
} };
var ordered = { evaluate: (lock, answer) => !!answer.order && answer.order.length === lock.solution.length && answer.order.every((id, i) => id === lock.solution[i]) };
var matching = { evaluate: (lock, answer) => !!answer.placements && Object.keys(answer.placements).length === lock.items.length && lock.items.every((item) => answer.placements[item.id] === lock.matches[item.id]) };
var selection = { evaluate: (lock, answer) => answer.selected?.length === 1 && answer.selected[0] === lock.solution[0] };
var cargo = { evaluate: (lock, answer) => {
  const selected = answer.selected;
  if (!selected || new Set(selected).size !== selected.length || selected.some((id) => !lock.items.some((item) => item.id === id))) return false;
  const mass = cargoMass(lock, selected);
  return answer.calculation === lock.capacity && mass <= lock.capacity && lock.requiredItems.every((id) => selected.includes(id));
} };
var cargoMass = (lock, selected) => lock.items?.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + (item.mass ?? 0), 0) ?? 0;
var lockEvaluators = {
  combo: numeric,
  rotation: numeric,
  measurement: numeric,
  lever: selection,
  timeline: ordered,
  "map-route": ordered,
  sorting: matching,
  "people-placement": matching,
  "technology-sort": matching,
  "evidence-board": matching,
  cargo
};
function evaluateLock(lock, answer) {
  return lockEvaluators[lock.type].evaluate(lock, answer);
}

export {
  cargoMass,
  lockEvaluators,
  evaluateLock
};
//# debugId=2e48618c-8c60-5494-a9fa-fcdfedbd7714
//# sourceMappingURL=chunk-AVOS3LLT.js.map
