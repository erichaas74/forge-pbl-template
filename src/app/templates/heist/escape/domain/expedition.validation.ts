import type { EscapeMission } from './escape.models';
import type { ExpeditionWorldDefinition } from './expedition.models';
import { ExpeditionNavigation } from './expedition.navigation';

export function validateExpeditionWorld(value: unknown, mission: EscapeMission): void {
  const fail = (path: string): never => {
    throw new Error(`INVALID_HEIST_EXPEDITION: ${path}`);
  };
  const object = (v: unknown): Record<string, unknown> =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : fail('object required');
  const number = (v: unknown, min: number, max: number): number =>
    typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max
      ? v
      : fail('numeric bounds');
  const array = (v: unknown, min: number, max: number): unknown[] =>
    Array.isArray(v) && v.length >= min && v.length <= max ? v : fail('array bounds');
  const world = object(value),
    width = number(world['width'], 600, 4096),
    height = number(world['height'], 400, 4096);
  const point = (v: unknown): void => {
    const p = object(v);
    number(p['x'], 16, width - 16);
    number(p['y'], 16, height - 16);
  };
  number(world['speed'], 40, 400);
  number(world['pathRadius'], 15, 100);
  number(world['interactionRadius'], 20, 130);
  point(world['spawn']);
  for (const key of ['characters', 'animalAtlas', 'mechanismAtlas', ...(world['boat'] !== undefined ? ['boat'] : [])])
    if (
      typeof world[key] !== 'string' ||
      !/^\/projects\/[a-zA-Z0-9/_-]+\.(webp|png)$/.test(world[key])
    )
      fail(`asset ${key}`);
  const nodes = array(world['nodes'], 2, 80).map(object),
    ids = new Set(nodes.map((n) => n['id']));
  if (
    ids.size !== nodes.length ||
    nodes.some((n) => typeof n['id'] !== 'string' || !/^[a-z][a-z0-9-]{0,60}$/.test(n['id']))
  )
    fail('unique node IDs');
  nodes.forEach(point);
  for (const edge of array(world['paths'], 1, 120)) {
    const pair = array(edge, 2, 2);
    if (!pair.every((n) => ids.has(n)) || pair[0] === pair[1]) fail('path references');
  }
  if (world['pathLocks'] !== undefined)
    for (const value of array(world['pathLocks'], 1, 40)) {
      const lock = object(value);
      if (!mission.steps.some((step) => step.id === lock['stepId'])) fail('lock step reference');
      for (const edge of array(lock['paths'], 1, 120)) {
        const [a, b] = array(edge, 2, 2);
        if (!(world['paths'] as unknown[][]).some(([x, y]) =>
          (x === a && y === b) || (x === b && y === a))) fail('locked path reference');
      }
    }
  const animalRows = object(world['animalRows']);
  for (const animal of mission.animals)
    if (!Number.isInteger(number(animalRows[animal.id], 0, 2))) fail('animal atlas row');
  if (world['animalFrames'] !== undefined)
    for (const frame of array(world['animalFrames'], 12, 12)) {
      const values = array(frame, 4, 4).map((v) => number(v, 0, 1));
      if (
        values[2] <= 0 ||
        values[3] <= 0 ||
        values[0] + values[2] > 1.00001 ||
        values[1] + values[3] > 1.00001
      )
        fail('animal frame bounds');
    }
  for (const key of ['lanterns', 'water', 'patrol']) array(world[key], 1, 40).forEach(point);
  const definition = value as ExpeditionWorldDefinition;
  const navigation = new ExpeditionNavigation(definition);
  if (!navigation.walkable(definition.spawn)) fail('spawn is outside navigation');
  const solved = new Set<string>();
  for (const step of mission.steps) {
    const position = { x: (step.x / 100) * width, y: (step.y / 100) * height };
    if (!navigation.navigate(position)) fail(`unreachable mechanism: ${step.id}`);
    navigation.position = position;
    solved.add(step.id);
    navigation.setSolved(solved);
  }
}
