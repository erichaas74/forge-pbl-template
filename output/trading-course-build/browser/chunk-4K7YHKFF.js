import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/programming-automation/core/robot-replay.ts
function sampleRobotReplay(samples, timeMs) {
  if (!samples.length) return void 0;
  let low = 0;
  let high = samples.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (samples[middle].timeMs <= timeMs) low = middle;
    else high = middle - 1;
  }
  const before = samples[low];
  const after = samples[low + 1];
  if (!after || timeMs <= before.timeMs) return before;
  const fraction = (timeMs - before.timeMs) / (after.timeMs - before.timeMs);
  const turn = (after.headingDeg - before.headingDeg + 540) % 360 - 180;
  return __spreadProps(__spreadValues({}, before), {
    timeMs,
    xCm: before.xCm + (after.xCm - before.xCm) * fraction,
    yCm: before.yCm + (after.yCm - before.yCm) * fraction,
    headingDeg: (before.headingDeg + turn * fraction + 360) % 360,
    batteryUsed: before.batteryUsed + (after.batteryUsed - before.batteryUsed) * fraction
  });
}

export {
  sampleRobotReplay
};
//# debugId=8d8f6e4e-d33d-58d4-9c13-536f0370a89e
//# sourceMappingURL=chunk-4K7YHKFF.js.map
