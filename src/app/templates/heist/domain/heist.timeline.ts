import type { Action, Challenge, Mission, Plan, Point } from './heist.models';

export const distance = (a: Point, b: Point): number => Math.hypot(b.x - a.x, b.y - a.y);
export const location = (m: Mission, id: string) => m.locations.find(n => n.id === id)!;
export const measure = (m: Mission, from: Point, to: Point) => ({ from, to, cm: distance(from, to) / m.map.pixelsPerCm, meters: distance(from, to) / m.map.pixelsPerCm * m.map.metersPerCm });
export function timeline(m: Mission, plan: Plan, response?: string): Action[] {
  const actions: Action[] = [];
  let time = 0, loaded = false;
  const choice = m.crisis.choices.find(c => c.id === response);
  const add = (type: Action['type'], from: string, to: string, duration: number, meters = 0, speed = 0, segment?: number) => {
    actions.push({ id: `${type}-${actions.length}`, type, from, to, start: time, end: time + duration, distance: meters, speed, segment });
    time += duration;
  };
  plan.nodes.forEach((id, i) => {
    if (i > 0) {
      const from = plan.nodes[i - 1];
      const meters = measure(m, location(m, from), location(m, id)).meters;
      const speed = loaded ? m.target.loadedSpeed * (choice?.speedMultiplier ?? 1) : m.speed;
      add('MOVE', from, id, meters / speed, meters, speed, i - 1);
    }
    if (plan.waits[String(i)] > 0) add('WAIT', id, id, plan.waits[String(i)]);
    if (id === m.target.location && plan.pickup && !loaded) {
      add('PICKUP', id, id, m.target.pickupSeconds);
      loaded = true;
      if (choice?.delay) add('WAIT', id, id, choice.delay);
    }
  });
  return actions;
}
export function position(m: Mission, actions: readonly Action[], time: number): Point {
  const action = actions.find(a => time < a.end) ?? actions.at(-1);
  if (!action) return location(m, m.entry);
  const a = location(m, action.from), b = location(m, action.to);
  const fraction = Math.max(0, Math.min(1, (time - action.start) / (action.end - action.start)));
  return { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction };
}
export function routeChallenges(m: Mission, plan: Plan): Challenge[] {
  const moves = timeline(m, plan).filter(a => a.type === 'MOVE');
  return (m.math.routeChecks === 'first-leg' ? moves.slice(0, 1) : moves).flatMap(a => [
    { id: `distance-${a.segment}`, type: 'DISTANCE_SCALE' as const, title: m.math.routeChecks === 'first-leg' ? 'How far is the first walk?' : `${a.segment! + 1}. Scale distance`, prompt: `${location(m, a.from).name} to ${location(m, a.to).name} is ${Number((a.distance / m.map.metersPerCm).toFixed(2))} cm on the map. Each cm stands for ${m.map.metersPerCm} meters. How many meters will your team walk?`, answer: a.distance, tolerance: m.math.distanceTolerance, unit: 'm', hint: `Multiply the number of centimeters by ${m.map.metersPerCm}.` },
    { id: `time-${a.segment}`, type: 'RATE_TIME_DISTANCE' as const, title: m.math.routeChecks === 'first-leg' ? 'How long will the walk take?' : `${a.segment! + 1}. Travel time`, prompt: `Your team walks ${Number(a.distance.toFixed(2))} meters. They move ${a.speed} meters each second. How many seconds will the walk take?`, answer: a.end - a.start, tolerance: m.math.timeTolerance, unit: 's', hint: `Divide ${Number(a.distance.toFixed(2))} by ${a.speed}. You can count in groups of ${a.speed}.` },
  ]);
}
export const correct = (c: Challenge, answer: number, unit: string): boolean => Number.isFinite(answer) && unit.trim() === c.unit && Math.abs(answer - c.answer) <= c.tolerance + 1e-8;
export const verified = (c: Challenge, p: Plan): boolean => { const a = p.answers[c.id]?.at(-1); return !!a && correct(c, a.answer, a.unit); };
export function readiness(m: Mission, p: Plan): string[] {
  const problems: string[] = [];
  if (p.nodes[0] !== m.entry) problems.push('Start at the entry.');
  if (!p.nodes.includes(m.target.location) || !p.pickup) problems.push('Visit the archive and include target pickup.');
  if (p.nodes.at(-1) !== m.extraction) problems.push('Finish at extraction.');
  if (p.nodes.length < 2 || p.nodes.slice(1).some((id, i) => !m.routes.some(r => !r.blocked && ((r.from === p.nodes[i] && r.to === id) || (r.to === p.nodes[i] && r.from === id))))) problems.push('Use connected, open routes.');
  const pending = [...routeChallenges(m, p), ...m.math.required].filter(c => !verified(c, p));
  if (pending.length) problems.push(`Verify ${pending.length} required calculations.`);
  if (m.target.mass > m.target.capacity) problems.push('The target exceeds carrying capacity.');
  if ((timeline(m, p).at(-1)?.end ?? 0) > m.deadline) problems.push('The plan exceeds the extraction deadline.');
  return problems;
}
