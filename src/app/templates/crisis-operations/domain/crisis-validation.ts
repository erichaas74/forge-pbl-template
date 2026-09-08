import type { CrisisConfig } from './crisis.models';
import { validateStationExperiences } from './crisis-station-validation';

/** Validate external JSON before allowing resource or evidence operations. */
export function requireCrisisConfig(value: unknown): CrisisConfig {
  const fail = (message: string): never => {
    throw new Error(`INVALID_CRISIS_PACKAGE: ${message}`);
  };
  const record = (item: unknown): item is Record<string, unknown> =>
    typeof item === 'object' && item !== null && !Array.isArray(item);
  if (!record(value)) return fail('Expected a configuration object.');
  if (
    value['schemaVersion'] !== '1.0' ||
    !record(value['template']) ||
    value['template']['id'] !== 'crisis-operations' ||
    value['template']['version'] !== '1.0'
  )
    return fail('Unsupported schema or template version.');
  for (const key of [
    'projectId',
    'projectVersion',
    'title',
    'region',
    'operationCode',
    'roomImage',
    'newsImage',
  ]) {
    if (typeof value[key] !== 'string' || !value[key].trim()) fail(`Missing ${key}.`);
  }
  for (const key of ['crews', 'evidenceLimit', 'bulletinIntervalSeconds', 'startHour']) {
    if (!Number.isInteger(value[key]) || Number(value[key]) < 0) fail(`Invalid ${key}.`);
  }
  if (
    Number(value['evidenceLimit']) < 1 ||
    Number(value['bulletinIntervalSeconds']) < 10 ||
    Number(value['startHour']) > 23
  )
    fail('Invalid timing or briefing capacity.');
  for (const key of ['roles', 'locations', 'evidence', 'actions', 'bulletins']) {
    if (!Array.isArray(value[key]) || !value[key].length || !value[key].every(record))
      fail(`Missing ${key}.`);
  }
  const config = value as unknown as CrisisConfig;
  const unique = (items: readonly { readonly id: string }[], name: string) => {
    if (
      items.some((i) => typeof i.id !== 'string' || !i.id) ||
      new Set(items.map((i) => i.id)).size !== items.length
    )
      fail(`Duplicate or missing ${name} ID.`);
  };
  unique(config.roles, 'role');
  unique(config.locations, 'location');
  unique(config.evidence, 'evidence');
  unique(config.actions, 'action');
  const textFields = (item: object, fields: readonly string[]) => {
    for (const key of fields)
      if (typeof (item as Record<string, unknown>)[key] !== 'string')
        fail(`Missing text field ${key}.`);
  };
  const finite = (n: unknown) => typeof n === 'number' && Number.isFinite(n) && n >= 0;
  if (config.companion) {
    if (
      !record(config.companion) ||
      typeof config.companion.name !== 'string' ||
      !config.companion.name.trim() ||
      typeof config.companion.sprite !== 'string' ||
      !config.companion.sprite.trim() ||
      !Array.isArray(config.companion.roamPoints) ||
      config.companion.roamPoints.length < 2 ||
      config.companion.roamPoints.length > 16
    )
      fail('Invalid companion configuration.');
    for (const point of config.companion.roamPoints)
      if (
        !record(point) ||
        ![point.x, point.y, point.scale].every(finite) ||
        point.x > 100 ||
        point.y > 100 ||
        point.scale < 0.4 ||
        point.scale > 2
      )
        fail('Invalid companion roam point.');
  }
  for (const role of config.roles) textFields(role, ['name', 'shortName', 'focus']);
  if (config.workstations !== undefined) {
    if (
      !Array.isArray(config.workstations) ||
      config.workstations.length > 2 ||
      !config.workstations.every(record)
    )
      fail('Expected up to two workstations.');
    unique(config.workstations, 'workstation');
    const sides = new Set<string>();
    for (const station of config.workstations) {
      if (
        typeof station.name !== 'string' ||
        !station.name.trim() ||
        typeof station.description !== 'string' ||
        !station.description.trim()
      )
        fail('Missing workstation name or description.');
      if (!['left', 'right'].includes(station.side) || sides.has(station.side))
        fail('Each workstation must occupy a distinct left or right position.');
      sides.add(station.side);
      if (
        !Array.isArray(station.roleIds) ||
        !station.roleIds.length ||
        new Set(station.roleIds).size !== station.roleIds.length ||
        station.roleIds.some(
          (id: unknown) => typeof id !== 'string' || !config.roles.some((role) => role.id === id),
        )
      )
        fail('Invalid workstation role reference.');
      if (!['telemetry', 'resources', 'reports'].includes(station.instrument))
        fail('Unsupported workstation instrument.');
    }
  }
  for (const l of config.locations) {
    textFields(l, ['name', 'detail']);
    if (
      ![l.x, l.y, l.population, l.elevation].every(finite) ||
      l.x > 1000 ||
      l.y > 600 ||
      !['community', 'bridge', 'hospital', 'shelter', 'sensor'].includes(l.kind)
    )
      fail('Invalid map location.');
  }
  for (const e of config.evidence) {
    textFields(e, ['title', 'source', 'channel', 'body']);
    if (
      !config.locations.some((l) => l.id === e.locationId) ||
      !Number.isInteger(e.stage) ||
      e.stage < 0 ||
      e.stage >= config.bulletins.length ||
      !finite(e.minute)
    )
      fail('Invalid evidence reference or release stage.');
    if (!Array.isArray(e.roleIds) || e.roleIds.some((id) => !config.roles.some((r) => r.id === id)))
      fail('Invalid evidence visibility.');
    if (!['Confirmed', 'Forecast', 'Unverified'].includes(e.confidence))
      fail('Invalid evidence confidence.');
    for (const id of [e.requiresActionId, e.excludesActionId])
      if (id !== undefined && !config.actions.some((a) => a.id === id))
        fail('Unknown conditional report action.');
    if (e.requiresActionId && e.requiresActionId === e.excludesActionId)
      fail('Unreachable conditional report.');
    if (
      e.reading &&
      (typeof e.reading.value !== 'string' ||
        typeof e.reading.label !== 'string' ||
        typeof e.reading.unit !== 'string' ||
        !Array.isArray(e.reading.trend) ||
        e.reading.trend.length < 2 ||
        !e.reading.trend.every(finite))
    )
      fail('Invalid sensor reading.');
  }
  for (const a of config.actions) {
    textFields(a, ['title', 'description', 'tradeoff', 'outcome', 'mapLabel']);
    if (
      !config.locations.some((l) => l.id === a.locationId) ||
      ![a.crews, a.duration, a.riskReduction, a.protects, a.minStage].every(finite) ||
      !Number.isInteger(a.crews) ||
      !Number.isInteger(a.minStage) ||
      a.minStage >= config.bulletins.length ||
      a.riskReduction > 100
    )
      fail('Invalid action cost or reference.');
    if (
      a.expiresAtStage !== undefined &&
      (!Number.isInteger(a.expiresAtStage) ||
        a.expiresAtStage <= a.minStage ||
        a.expiresAtStage > config.bulletins.length)
    )
      fail('Invalid response window.');
  }
  for (const [index, b] of config.bulletins.entries()) {
    textFields(b, ['title', 'summary', 'forecast', 'uncertainty']);
    if (
      ![b.minute, b.metricValue, b.risk, b.affected].every(finite) ||
      b.risk > 100 ||
      (index > 0 && b.minute <= config.bulletins[index - 1].minute) ||
      !['Watch', 'Emergency', 'Critical', 'Stabilizing'].includes(b.alert)
    )
      fail('Invalid bulletin sequence.');
  }
  if (
    !record(config.map) ||
    typeof config.map.coast !== 'string' ||
    typeof config.map.river !== 'string' ||
    typeof config.map.hazard !== 'string' ||
    !Array.isArray(config.map.roads) ||
    !Array.isArray(config.map.contours) ||
    ![...config.map.roads, ...config.map.contours].every((p) => typeof p === 'string')
  )
    fail('Invalid map geometry.');
  for (const pair of [config.roomTagline, config.analysisHeadline])
    if (!Array.isArray(pair) || pair.length !== 2 || !pair.every((s) => typeof s === 'string'))
      fail('Invalid room text.');
  if (!Array.isArray(config.systemChain) || !config.systemChain.every((s) => typeof s === 'string'))
    fail('Invalid system connection labels.');
  if (!record(config.primaryMetric) || !record(config.newsCamera))
    fail('Missing monitor configuration.');
  textFields(config.primaryMetric, ['label', 'unit', 'caption']);
  textFields(config.newsCamera, ['label', 'network', 'locationId', 'description']);
  if (
    !Array.isArray(config.primaryMetric.initialTrend) ||
    config.primaryMetric.initialTrend.length < 2 ||
    !config.primaryMetric.initialTrend.every(finite)
  )
    fail('Invalid monitor trend.');
  if (
    !finite(config.newsCamera.minute) ||
    !config.locations.some((l) => l.id === config.newsCamera.locationId)
  )
    fail('Invalid camera reference.');
  if (
    !Array.isArray(config.map.labels) ||
    !config.map.labels.every(
      (l) =>
        record(l) &&
        typeof l['text'] === 'string' &&
        finite(l['x']) &&
        finite(l['y']) &&
        typeof l['rotation'] === 'number' &&
        Number.isFinite(l['rotation']) &&
        ['water', 'land'].includes(String(l['kind'])),
    )
  )
    fail('Invalid map labels.');
  validateStationExperiences(config);
  return freezeConfig(structuredClone(config));
}

function freezeConfig<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    Object.freeze(value);
    for (const nested of Object.values(value)) freezeConfig(nested);
  }
  return value;
}
