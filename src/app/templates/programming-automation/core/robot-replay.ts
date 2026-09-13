import type { ReplaySample } from '../domain/automation.models';

/** Interpolate presentation between recorded poses. Discrete cargo changes occur at their timestamp. */
export function sampleRobotReplay(samples: readonly ReplaySample[], timeMs: number): ReplaySample | undefined {
  if (!samples.length) return undefined;
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
  const turn = ((after.headingDeg - before.headingDeg + 540) % 360) - 180;
  return {
    ...before,
    timeMs,
    xCm: before.xCm + (after.xCm - before.xCm) * fraction,
    yCm: before.yCm + (after.yCm - before.yCm) * fraction,
    headingDeg: (before.headingDeg + turn * fraction + 360) % 360,
    batteryUsed: before.batteryUsed + (after.batteryUsed - before.batteryUsed) * fraction,
  };
}
