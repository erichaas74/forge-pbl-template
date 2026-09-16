import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/programming-automation/core/course-actors.ts
function sampleCourseActor(actor, timeMs) {
  const indices = actor.path.map((_, index) => index);
  if (actor.patrol === "ping-pong") indices.push(...indices.slice(1, -1).reverse());
  const legs = indices.map((index, i) => {
    const from = actor.path[index], to = actor.path[indices[(i + 1) % indices.length]];
    return {
      from,
      to,
      seconds: Math.hypot(to.xCm - from.xCm, to.yCm - from.yCm) / actor.speedCmPerSecond
    };
  });
  const pause = actor.pauseSeconds ?? 0;
  const cycle = legs.reduce((sum, leg) => sum + leg.seconds + pause, 0);
  let time = ((Math.max(0, timeMs) / 1e3 + (actor.phaseSeconds ?? 0)) % cycle + cycle) % cycle;
  for (const leg of legs) {
    const headingDeg = (Math.atan2(leg.to.xCm - leg.from.xCm, leg.to.yCm - leg.from.yCm) * 180 / Math.PI + 360) % 360;
    if (time < pause) return __spreadProps(__spreadValues({}, leg.from), { headingDeg, moving: false });
    time -= pause;
    if (time <= leg.seconds) {
      const fraction = leg.seconds ? time / leg.seconds : 0;
      return {
        xCm: leg.from.xCm + (leg.to.xCm - leg.from.xCm) * fraction,
        yCm: leg.from.yCm + (leg.to.yCm - leg.from.yCm) * fraction,
        headingDeg,
        moving: true
      };
    }
    time -= leg.seconds;
  }
  return __spreadProps(__spreadValues({}, actor.path[0]), { headingDeg: 0, moving: false });
}
function touchesCourseActor(pose, radius, actor, timeMs) {
  const other = sampleCourseActor(actor, timeMs);
  if (actor.kind === "robot")
    return Math.hypot(pose.xCm - other.xCm, pose.yCm - other.yCm) <= radius + actor.radiusCm;
  const dx = Math.max(0, Math.abs(pose.xCm - other.xCm) - actor.widthCm / 2);
  const dy = Math.max(0, Math.abs(pose.yCm - other.yCm) - actor.heightCm / 2);
  return Math.hypot(dx, dy) <= radius;
}
function validCourseActors(value, width, height) {
  if (!Array.isArray(value) || value.length > 6) return false;
  const finite = (n, min, max) => typeof n === "number" && Number.isFinite(n) && n >= min && n <= max;
  const ids = /* @__PURE__ */ new Set();
  return value.every((actor) => {
    if (!actor || typeof actor !== "object" || typeof actor.id !== "string" || !actor.id || ids.has(actor.id) || typeof actor.label !== "string" || !actor.label || !["robot", "barrier"].includes(actor.kind) || !["ping-pong", "loop"].includes(actor.patrol) || !finite(actor.speedCmPerSecond, 1, 80) || actor.pauseSeconds !== void 0 && !finite(actor.pauseSeconds, 0, 60) || actor.phaseSeconds !== void 0 && !finite(actor.phaseSeconds, 0, 600))
      return false;
    ids.add(actor.id);
    if (actor.kind === "robot" ? !finite(actor.radiusCm, 4, 30) : !finite(actor.widthCm, 8, 100) || !finite(actor.heightCm, 8, 100))
      return false;
    const halfWidth = actor.kind === "robot" ? actor.radiusCm : actor.widthCm / 2;
    const halfHeight = actor.kind === "robot" ? actor.radiusCm : actor.heightCm / 2;
    return Array.isArray(actor.path) && actor.path.length >= 2 && actor.path.length <= 8 && actor.path.every(
      (point) => point && finite(point.xCm, halfWidth, width - halfWidth) && finite(point.yCm, halfHeight, height - halfHeight)
    ) && actor.path.some(
      (point) => point.xCm !== actor.path[0].xCm || point.yCm !== actor.path[0].yCm
    );
  });
}

export {
  sampleCourseActor,
  touchesCourseActor,
  validCourseActors
};
//# debugId=e80d30d1-4f8e-570e-8ab9-1f99692b493a
//# sourceMappingURL=chunk-3ZI5RM4E.js.map
