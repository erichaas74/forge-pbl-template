import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/heist/escape/domain/expedition.navigation.ts
var worldDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function segmentDistance(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const t = Math.max(
    0,
    Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1))
  );
  return worldDistance(p, { x: a.x + dx * t, y: a.y + dy * t });
}
var ExpeditionNavigation = class {
  constructor(world, position = world.spawn, allowLockedPaths = false) {
    this.world = world;
    this.allowLockedPaths = allowLockedPaths;
    this.position = __spreadValues({}, position);
    this.segments = world.paths.map(([a, b]) => [
      world.nodes.find((n) => n.id === a),
      world.nodes.find((n) => n.id === b)
    ]);
  }
  world;
  allowLockedPaths;
  position;
  facing = Math.PI / 2;
  moving = false;
  route = [];
  solved = /* @__PURE__ */ new Set();
  segments;
  setSolved(solved) {
    this.solved = new Set(solved);
    this.stop();
  }
  pathOpen(index) {
    if (this.allowLockedPaths) return true;
    const [a, b] = this.world.paths[index];
    return !(this.world.pathLocks ?? []).some(
      (lock) => !this.solved.has(lock.stepId) && lock.paths.some(([x, y]) => x === a && y === b || x === b && y === a)
    );
  }
  walkable(p) {
    return Number.isFinite(p.x) && Number.isFinite(p.y) && p.x >= 16 && p.y >= 16 && p.x <= this.world.width - 16 && p.y <= this.world.height - 16 && this.segments.some(
      ([a, b], i) => this.pathOpen(i) && segmentDistance(p, a, b) <= this.world.pathRadius
    );
  }
  /** Dijkstra over a small authored graph; unobstructed local movement stays direct. */
  navigate(destination) {
    if (!this.walkable(destination)) return false;
    if (this.lineClear(this.position, destination)) {
      this.route = [__spreadValues({}, destination)];
      return true;
    }
    const nodes = [
      __spreadValues({ id: "__start" }, this.position),
      ...this.world.nodes,
      __spreadValues({ id: "__end" }, destination)
    ];
    const costs = /* @__PURE__ */ new Map([["__start", 0]]), previous = /* @__PURE__ */ new Map();
    const open = new Set(nodes.map((n) => n.id));
    while (open.size) {
      const id2 = [...open].sort(
        (a, b) => (costs.get(a) ?? Infinity) - (costs.get(b) ?? Infinity)
      )[0];
      if (!Number.isFinite(costs.get(id2))) break;
      open.delete(id2);
      if (id2 === "__end") break;
      const node = nodes.find((n) => n.id === id2);
      for (const other of nodes) {
        if (!open.has(other.id) || !this.lineClear(node, other)) continue;
        const cost = costs.get(id2) + worldDistance(node, other);
        if (cost < (costs.get(other.id) ?? Infinity)) {
          costs.set(other.id, cost);
          previous.set(other.id, id2);
        }
      }
    }
    if (!previous.has("__end")) return false;
    const route = [];
    let id = "__end";
    while (id !== "__start") {
      route.unshift(nodes.find((n) => n.id === id));
      id = previous.get(id);
    }
    this.route = route;
    return true;
  }
  tick(deltaSeconds, direction) {
    const dt = Math.max(0, Math.min(0.05, Number.isFinite(deltaSeconds) ? deltaSeconds : 0));
    this.moving = false;
    const input = Math.hypot(direction.x, direction.y);
    if (Number.isFinite(input) && input > 0) {
      this.route = [];
      this.move(
        direction.x / input * this.world.speed * dt,
        direction.y / input * this.world.speed * dt
      );
      return;
    }
    const next = this.route[0];
    if (!next) return;
    const d = worldDistance(this.position, next), step = this.world.speed * dt;
    if (d <= step) {
      this.position = { x: next.x, y: next.y };
      this.route.shift();
      this.moving = d > 0;
    } else
      this.move((next.x - this.position.x) / d * step, (next.y - this.position.y) / d * step);
  }
  stop() {
    this.route = [];
    this.moving = false;
  }
  move(dx, dy) {
    let next = { x: this.position.x + dx, y: this.position.y + dy };
    if (!this.walkable(next)) {
      next = { x: this.position.x + dx, y: this.position.y };
      if (!this.walkable(next)) next = { x: this.position.x, y: this.position.y + dy };
    }
    if (this.walkable(next) && worldDistance(next, this.position) > 1e-3) {
      this.facing = Math.atan2(next.y - this.position.y, next.x - this.position.x);
      this.position = next;
      this.moving = true;
    }
  }
  lineClear(a, b) {
    const steps = Math.ceil(worldDistance(a, b) / 10);
    for (let i = 0; i <= steps; i++) {
      const t = i / (steps || 1);
      if (!this.walkable({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })) return false;
    }
    return true;
  }
};

export {
  worldDistance,
  ExpeditionNavigation
};
//# debugId=598c9c6d-7a57-5fc4-a7ea-f0303b488594
//# sourceMappingURL=chunk-GAXYVDGI.js.map
