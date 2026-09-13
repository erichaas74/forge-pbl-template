import type { Mission, Point } from './heist.models';
import { blockedSight } from './heist.patrol';
export function requireMission(value: unknown): Mission {
  const fail = (message: string): never => { throw new Error(`INVALID_HEIST_CONFIG: ${message}`); };
  const record = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
  const positive = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v > 0;
  const nonnegative = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0;
  const text = (v: unknown) => typeof v === 'string' && v.trim().length > 0;
  if (!record(value)) fail('Expected a mission object.');
  const c = value as Mission;
  if (c.schemaVersion !== '1.0' || c.template?.id !== 'heist' || c.template.version !== '1.0' || !text(c.projectId) || !text(c.projectVersion)) fail('Unsupported schema or template version.');
  if (![c.title, c.briefing, c.history].every(text)) fail('Mission text is required.');
  if (!c.map || ![c.map.width, c.map.height, c.map.pixelsPerCm, c.map.metersPerCm, c.speed, c.deadline, c.detectionGrace].every(positive)) fail('Map, rates, deadline, and detection grace must be positive.');
  if (!text(c.map.image) || !/^\/(?!\/)[\w/.-]+\.(svg|png|webp)$/.test(c.map.image)) fail('Use a local map asset.');
  if (c.presentation !== undefined) {
    const art = c.presentation;
    const asset = (path: unknown) => typeof path === 'string' && /^\/(?!\/)[\w/.-]+\.(png|webp)$/.test(path) && !path.includes('..');
    if (!record(art) || ![art.ground, art.buildings, art.characters, art.props].every(asset)
      || !Array.isArray(art.wallFrames) || !art.wallFrames.every(n => Number.isInteger(n) && n >= 0 && n < 4)
      || !record(art.responseStyles) || !Object.values(art.responseStyles).every(s => ['carry', 'repair', 'cart'].includes(s))) fail('Invalid presentation manifest.');
    const rect = (r: readonly number[]) => Array.isArray(r) && r.length === 4 && r.every(nonnegative) && r[2] > 0 && r[3] > 0;
    if (!Array.isArray(art.buildingFrames) || art.buildingFrames.length !== 4 || !art.buildingFrames.every(r => r && rect([r.x, r.y, r.width, r.height]))
      || !Array.isArray(art.groundSlices) || !art.groundSlices.length || !art.groundSlices.every(r => r && rect(r.source) && rect(r.destination))) fail('Invalid artwork regions.');
    if (art.landmarks !== undefined && (!Array.isArray(art.landmarks) || !art.landmarks.every(r => r && rect([r.x, r.y, r.width, r.height]) && Number.isInteger(r.frame) && r.frame >= 0 && r.frame < 4 && r.x + r.width <= c.map.width && r.y + r.height <= c.map.height))) fail('Invalid artwork landmarks.');
  }
  const point = (p: unknown): boolean => record(p) && nonnegative(p['x']) && nonnegative(p['y']) && Number(p['x']) <= c.map.width && Number(p['y']) <= c.map.height;
  if (!Array.isArray(c.locations) || c.locations.length < 3 || !c.locations.every(n => n && text(n.id) && text(n.name) && text(n.description) && point(n))) fail('Locations need IDs, text, and map coordinates.');
  const ids = new Set(c.locations.map(n => n.id));
  if (ids.size !== c.locations.length || !ids.has(c.entry) || !ids.has(c.extraction) || c.entry === c.extraction) fail('Duplicate locations or invalid entry/extraction.');
  if (!c.target || !ids.has(c.target.location) || c.target.location === c.entry || c.target.location === c.extraction || !text(c.target.name) || ![c.target.mass, c.target.capacity, c.target.pickupSeconds, c.target.loadedSpeed].every(positive)) fail('Invalid target.');
  if (!Array.isArray(c.walls) || !c.walls.every(w => point(w) && positive(w.width) && positive(w.height))) fail('Invalid blocking geometry.');
  if (!Array.isArray(c.routes) || !c.routes.every(r => r && ids.has(r.from) && ids.has(r.to) && r.from !== r.to && (r.blocked === undefined || typeof r.blocked === 'boolean'))) fail('Routes must reference distinct locations.');
  for (const route of c.routes.filter(r => !r.blocked)) {
    if (blockedSight(c.locations.find(n => n.id === route.from)!, c.locations.find(n => n.id === route.to)!, c.walls)) fail('An open route crosses blocking geometry.');
  }
  const reachable = new Set([c.entry]);
  for (let i = 0; i < c.locations.length; i++) for (const r of c.routes.filter(r => !r.blocked)) { if (reachable.has(r.from)) reachable.add(r.to); if (reachable.has(r.to)) reachable.add(r.from); }
  if (!reachable.has(c.extraction) || !reachable.has(c.target.location)) fail('Target and extraction must be reachable.');
  if (c.guidance !== undefined) {
    const routes = c.guidance?.routes;
    if (!record(c.guidance) || !Array.isArray(routes) || routes.length < 1 || routes.length > 3
      || !routes.every(r => r && text(r.id) && text(r.label) && text(r.description) && Array.isArray(r.nodes)
        && r.nodes.length >= 3 && r.nodes.length <= 30 && r.nodes[0] === c.entry && r.nodes.at(-1) === c.extraction
        && r.nodes.includes(c.target.location) && r.nodes.every((id: string) => ids.has(id))
        && r.nodes.slice(1).every((id: string, i: number) => c.routes.some(edge => !edge.blocked && ((edge.from === r.nodes[i] && edge.to === id) || (edge.to === r.nodes[i] && edge.from === id)))))
      || new Set(routes.map(r => r.id)).size !== routes.length) fail('Guided paths need unique IDs and connected routes through the target to extraction.');
  }
  if (!Array.isArray(c.guards) || !c.guards.every(g => g && text(g.id) && text(g.name) && [g.speed, g.range, g.angle].every(positive) && g.angle <= 360 && Array.isArray(g.points) && g.points.length >= 2 && g.points.every((p: Point & { wait: number }) => point(p) && nonnegative(p.wait)))) fail('Invalid guard patrol.');
  if (new Set(c.guards.map(g => g.id)).size !== c.guards.length) fail('Duplicate guard IDs.');
  if (!c.gate || !ids.has(c.gate.location) || !positive(c.gate.cycle) || !positive(c.gate.openSeconds) || c.gate.openSeconds > c.gate.cycle) fail('Invalid gate cycle.');
  if (!c.math || !nonnegative(c.math.distanceTolerance) || !nonnegative(c.math.timeTolerance) || !Array.isArray(c.math.required) || !c.crisis || !text(c.crisis.title) || !text(c.crisis.description)) fail('Math and crisis configuration required.');
  if (c.math.routeChecks !== undefined && !['all', 'first-leg'].includes(c.math.routeChecks)) fail('Invalid route math selection.');
  const challenges = [...c.math.required, c.crisis.challenge];
  if (!challenges.every(q => q && text(q.id) && !/^(distance|time)-/.test(q.id) && ['DISTANCE_SCALE', 'RATE_TIME_DISTANCE', 'CAPACITY', 'ELAPSED_TIME', 'PERCENT_CHANGE'].includes(q.type) && text(q.title) && text(q.prompt) && text(q.hint) && text(q.unit) && Number.isFinite(q.answer) && nonnegative(q.tolerance)) || new Set(challenges.map(q => q.id)).size !== challenges.length) fail('Invalid or duplicate math challenges.');
  if (!Array.isArray(c.crisis.choices) || !c.crisis.choices.length || !c.crisis.choices.every(o => o && text(o.id) && text(o.label) && positive(o.capacity) && positive(o.speedMultiplier) && nonnegative(o.delay)) || !c.crisis.choices.some(o => o.capacity >= c.target.mass)) fail('Crisis needs a feasible response.');
  if (new Set(c.crisis.choices.map(o => o.id)).size !== c.crisis.choices.length) fail('Duplicate response IDs.');
  return freeze(structuredClone(c));
}
function freeze<T>(value: T): T {
  if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(freeze); }
  return value;
}
