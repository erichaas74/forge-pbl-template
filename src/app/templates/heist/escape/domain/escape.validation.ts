import { validateGearLock } from '../gear-lock/gear-lock.domain';
import { validateBalanceLock } from '../balance-lock/balance-lock.domain';
import { escapePuzzleEvaluators } from './escape-puzzles';
import { validateExpeditionWorld } from './expedition.validation';
import type { EscapeMission } from './escape.models';

type Row = Record<string, unknown>;
const fail = (path: string): never => {
  throw new Error(`INVALID_HEIST_ESCAPE: ${path}`);
};
const obj = (v: unknown, path: string): Row =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Row) : fail(path);
const str = (v: unknown, path: string): string =>
  typeof v === 'string' && v.trim().length > 0 && v.length <= 3000 ? v : fail(path);
const num = (v: unknown, path: string, min = 0, max = 10000): number =>
  typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max ? v : fail(path);
const integer = (v: unknown, path: string, min = 0, max = 10000): number =>
  Number.isInteger(num(v, path, min, max)) ? (v as number) : fail(path);
const list = (v: unknown, path: string, min = 1, max = 20): unknown[] =>
  Array.isArray(v) && v.length >= min && v.length <= max ? v : fail(path);
const asset = (v: unknown, path: string): void => {
  if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(svg|webp|png)$/.test(str(v, path))) fail(path);
};
const rows = (v: unknown, path: string): Row[] => {
  const result = list(v, path).map((r) => obj(r, path));
  const ids = result.map((r) => str(r['id'], `${path}.id`));
  if (ids.some((id) => !/^[a-z][a-z0-9-]{0,60}$/.test(id)) || new Set(ids).size !== ids.length)
    fail(`${path}: invalid or duplicate IDs`);
  return result;
};

export function requireEscapeMission(value: unknown): EscapeMission {
  const m = obj(value, 'mission'),
    template = obj(m['template'], 'template');
  if (
    m['schemaVersion'] !== '1.2' ||
    m['experience'] !== 'escape' ||
    template['id'] !== 'heist' ||
    template['version'] !== '1.0'
  )
    fail('unsupported schema/template');
  for (const key of [
    'projectId',
    'projectVersion',
    'title',
    'subtitle',
    'briefing',
    'introductionTitle',
    'mapTitle',
    'setting',
    'finale',
  ])
    str(m[key], key);
  asset(m['environment'], 'environment');
  const animals = rows(m['animals'], 'animals'),
    animalIds = new Set(animals.map((a) => a['id']));
  for (const a of animals) {
    str(a['name'], 'animal.name');
    str(a['pen'], 'animal.pen');
    integer(a['count'], 'animal.count', 1, 12);
    asset(a['image'], 'animal.image');
  }
  const released = new Set<unknown>();
  for (const s of rows(m['steps'], 'steps')) {
    for (const key of ['title', 'place', 'story', 'action', 'success', 'explanation', 'icon'])
      str(s[key], `step.${key}`);
    num(s['x'], 'step.x', 5, 95);
    num(s['y'], 'step.y', 5, 95);
    for (const c of list(s['clues'], 'clues', 1, 6).map((c) => obj(c, 'clue'))) {
      str(c['label'], 'clue.label');
      str(c['value'], 'clue.value');
    }
    for (const id of list(s['release'], 'release', 0)) {
      if (!animalIds.has(id) || released.has(id)) fail('release: missing or duplicate animal');
      released.add(id);
    }
    const p = obj(s['puzzle'], 'puzzle'),
      type = str(p['type'], 'puzzle.type');
    if (!Object.hasOwn(escapePuzzleEvaluators, type))
      throw new Error(`CAPABILITY_NOT_INSTALLED: heist.escape.${type}`);
    for (const key of ['prompt', 'hint', 'skill']) str(p[key], `puzzle.${key}`);
    if (type === 'gear-lock') {
      if (m['world'] === undefined) fail('gear-lock requires expedition presentation');
      validateGearLock(p['lock']);
    }
    if (type === 'balance-lock') {
      if (m['world'] === undefined) fail('balance-lock requires expedition presentation');
      validateBalanceLock(p['lock']);
    }
    if (type === 'number') {
      const max = num(p['max'], 'number.max', 1);
      num(p['answer'], 'number.answer', 0, max);
      str(p['unit'], 'number.unit');
      if (p['visual'] !== undefined) {
        const visual = obj(p['visual'], 'number.visual');
        if (!['groups', 'length', 'fraction', 'capacity'].includes(String(visual['kind'])))
          fail('number.visual.kind');
        integer(visual['count'], 'number.visual.count', 1, 30);
        integer(visual['amount'], 'number.visual.amount', 1, 1000);
      }
    }
    if (type === 'code') {
      if (p['countAnimals'] !== undefined && typeof p['countAnimals'] !== 'boolean')
        fail('code.countAnimals');
      const answer = str(p['answer'], 'code.answer');
      if (!/^\d{2,6}$/.test(answer)) fail('code.answer');
      const labels = list(p['labels'], 'code.labels', answer.length, answer.length);
      labels.forEach((l) => str(l, 'code.label'));
    }
    if (type === 'timing') {
      const cycle = integer(p['cycle'], 'timing.cycle', 10, 120);
      const start = integer(p['safeStart'], 'timing.safeStart', 0, cycle - 1);
      const end = integer(p['safeEnd'], 'timing.safeEnd', start + 1, cycle);
      integer(p['crossing'], 'timing.crossing', 1, end - start);
    }
    if (type === 'balance') {
      const target = integer(p['target'], 'balance.target', 1, 100);
      const weights = list(p['weights'], 'balance.weights', 2, 10).map((w) =>
        integer(w, 'weight', 1, 100),
      );
      const totals = weights.reduce<Set<number>>(
        (sums, w) => new Set([...sums, ...[...sums].map((n) => n + w)]),
        new Set([0]),
      );
      if (!totals.has(target)) fail('balance has no solution');
    }
  }
  if (released.size !== animalIds.size) fail('all animals must have a reachable release step');
  if (m['world'] !== undefined) validateExpeditionWorld(m['world'], value as EscapeMission);
  return structuredClone(value) as EscapeMission;
}
