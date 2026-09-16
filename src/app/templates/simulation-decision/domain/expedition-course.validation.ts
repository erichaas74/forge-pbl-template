import type { ExpeditionCourse } from './expedition-course.models';
import type { SimulationDecisionConfig } from './simulation-decision.models';

export function isExpeditionCourse(value: unknown): value is ExpeditionCourse {
  const record = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === 'object' && !Array.isArray(v);
  const text = (v: unknown) => typeof v === 'string' && v.length > 0;
  const integer = (v: unknown, min = 0) => Number.isSafeInteger(v) && Number(v) >= min;
  const strings = (v: unknown) => Array.isArray(v) && v.length > 0 && v.every(text);
  return (
    record(value) &&
    value['capability'] === 'roundTripTrading' &&
    Array.isArray(value['cycles']) &&
    value['cycles'].length === 4 &&
    value['cycles'].every(
      (c) =>
        record(c) &&
        text(c['id']) &&
        text(c['title']) &&
        integer(c['budgetCents'], 1) &&
        integer(c['capacity'], 1) &&
        strings(c['goodIds']) &&
        strings(c['requiredLocationIds']) &&
        Array.isArray(c['legs']) &&
        c['legs'].length > 1 &&
        c['legs'].every(
          (l) =>
            record(l) && text(l['routeId']) && integer(l['days'], 1) && integer(l['costCents']),
        ) &&
        Array.isArray(c['hazards']) &&
        c['hazards'].every(
          (h) =>
            record(h) &&
            text(h['id']) &&
            text(h['title']) &&
            text(h['description']) &&
            ['winter-storm', 'flood', 'conflict'].includes(String(h['kind'])) &&
            integer(h['afterLeg']) &&
            integer(h['day'], 1) &&
            Array.isArray(h['choices']) &&
            h['choices'].length > 1 &&
            h['choices'].every(
              (ch) =>
                record(ch) &&
                text(ch['id']) &&
                text(ch['label']) &&
                integer(ch['costCents']) &&
                integer(ch['delayDays']) &&
                integer(ch['lossUnits']),
            ),
        ),
    )
  );
}
export function validateExpeditionCourse(config: SimulationDecisionConfig): string[] {
  if (!config.expeditionCourse) return [];
  if (!isExpeditionCourse(config.expeditionCourse))
    return ['Invalid roundTripTrading configuration.'];
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const c of config.expeditionCourse.cycles) {
    if (ids.has(c.id)) errors.push(`Duplicate expedition ${c.id}.`);
    ids.add(c.id);
    const roadIds = new Set(c.legs.map((l) => l.routeId));
    if (roadIds.size !== c.legs.length) errors.push(`${c.id}: duplicate road.`);
    const roads = c.legs.flatMap((l) => {
      const r = config.routes.find((r) => r.id === l.routeId);
      if (!r) errors.push(`${c.id}: missing route ${l.routeId}.`);
      return r ? [r] : [];
    });
    const reachable = (start: string) => {
      const visited = new Set([start]);
      for (let i = 0; i < roads.length; i++)
        for (const r of roads) if (visited.has(r.fromLocationId)) visited.add(r.toLocationId);
      return visited;
    };
    const fromHome = reachable(config.startingLocationId);
    for (const id of c.requiredLocationIds) {
      if (!fromHome.has(id) || !reachable(id).has(config.startingLocationId))
        errors.push(`${c.id}: ${id} has no round trip.`);
    }
    for (const id of c.goodIds)
      if (!config.goods.some((g) => g.id === id)) errors.push(`${c.id}: missing good ${id}.`);
    for (const h of c.hazards) {
      if (!h.choices.some((ch) => ch.costCents === 0))
        errors.push(`${c.id}: hazard ${h.id} needs a zero-cash response.`);
      if (new Set(h.choices.map((ch) => ch.id)).size !== h.choices.length)
        errors.push(`${c.id}: duplicate hazard choice.`);
    }
  }
  return errors;
}
