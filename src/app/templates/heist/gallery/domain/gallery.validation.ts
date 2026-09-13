import { lockEvaluators } from './academic-locks';
import type { GalleryMission, LockType } from './gallery.models';
import { requireEncounters } from '../../../../shared/encounters/encounter.validation';

type Row = Record<string, unknown>;
const fail = (path: string): never => { throw new Error(`INVALID_HEIST_GALLERY: ${path}`); };
const obj = (value: unknown, path: string): Row => value && typeof value === 'object' && !Array.isArray(value) ? value as Row : fail(path);
const str = (value: unknown, path: string): string => typeof value === 'string' && value.trim().length > 0 && value.length <= 5000 ? value : fail(path);
const num = (value: unknown, path: string, min = -10000, max = 10000): number => typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : fail(path);
const list = (value: unknown, path: string, min = 1, max = 100): unknown[] => Array.isArray(value) && value.length >= min && value.length <= max ? value : fail(path);
const id = (value: unknown, path: string): string => { const result = str(value, path); return /^[a-z][a-z0-9-]{0,79}$/.test(result) && !['constructor', 'prototype'].includes(result) ? result : fail(path); };
const ids = (value: unknown, path: string, min = 1): string[] => { const result = list(value, path, min).map(v => id(v, path)); return new Set(result).size === result.length ? result : fail(`${path}: duplicate ID`); };
const rows = (value: unknown, path: string): Row[] => { const result = list(value, path).map(v => obj(v, path)); ids(result.map(v => v['id']), `${path}.id`); return result; };
const localAsset = (value: unknown, path: string): void => { if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(str(value, path))) fail(path); };

export function requireGalleryMission(value: unknown): GalleryMission {
  const m = obj(value, 'mission'), template = obj(m['template'], 'template');
  if (!['1.1', '1.2'].includes(String(m['schemaVersion'])) || m['experience'] !== 'gallery' || template['id'] !== 'heist' || template['version'] !== '1.0') fail('Unsupported gallery schema/template');
  id(m['projectId'], 'projectId'); str(m['projectVersion'], 'projectVersion');
  for (const key of ['title', 'subtitle', 'briefing']) str(m[key], key);
  if (!['math', 'history', 'hybrid'].includes(String(m['subject']))) fail('subject');
  localAsset(m['environment'], 'environment');
  list(m['defensePrompts'], 'defensePrompts', 1, 6).forEach(v => str(v, 'defense prompt'));
  const evidence = rows(m['evidence'], 'evidence');
  const evidenceIds = new Set(evidence.map(e => e['id']));
  for (const e of evidence) {
    for (const key of ['title', 'text', 'sourceTitle']) str(e[key], `evidence.${key}`);
    if (!['Timeline', 'People', 'Technology', 'Exchange', 'Routes', 'Mathematics'].includes(String(e['category']))) fail('evidence.category');
    if (!/^https:\/\//.test(str(e['sourceUrl'], 'sourceUrl'))) fail('sourceUrl');
  }
  const refs = (value: unknown, allowed: Set<unknown>, path: string, min = 1): string[] => { const result = ids(value, path, min); if (result.some(v => !allowed.has(v))) fail(`${path}: missing reference`); return result; };
  const locks = rows(m['locks'], 'locks'), lockIds = new Set(locks.map(l => l['id']));
  for (const l of locks) {
    const type = str(l['type'], 'lock.type') as LockType;
    if (!Object.hasOwn(lockEvaluators, type)) throw new Error(`CAPABILITY_NOT_INSTALLED: heist.lock.${type}`);
    for (const key of ['title', 'prompt', 'standard', 'hint', 'consequence']) str(l[key], `lock.${key}`);
    if (!['math', 'history'].includes(String(l['domain']))) fail('lock.domain');
    refs(l['evidenceIds'], evidenceIds, 'lock.evidenceIds', 0);
    if (['combo', 'rotation', 'measurement'].includes(type)) {
      const min = num(l['min'], 'lock.min'), max = num(l['max'], 'lock.max', min + 1), target = num(l['target'], 'lock.target', min, max);
      const step = num(l['step'], 'lock.step', 0.01, max - min);
      const tolerance = num(l['tolerance'], 'lock.tolerance', 0, (max - min) / 10);
      if (Math.abs(Math.round((target - min) / step) * step + min - target) > tolerance + 1e-8) fail('lock.target cannot be reached by the control');
      str(l['unit'], 'lock.unit');
      if (l['wrap'] !== undefined && typeof l['wrap'] !== 'boolean') fail('lock.wrap');
      if (type === 'combo') { const digits = num(l['digits'], 'lock.digits', 1, 6); if (!Number.isInteger(digits) || max >= 10 ** digits || min < 0 || step !== 1) fail('combo bounds'); }
    } else {
      const items = rows(l['items'], 'lock.items'), itemIds = new Set(items.map(i => i['id']));
      items.forEach(i => str(i['label'], 'item.label'));
      if (['timeline', 'map-route', 'lever'].includes(type)) {
        const solution = refs(l['solution'], itemIds, 'lock.solution');
        if (type === 'timeline' && solution.length !== items.length || type === 'lever' && solution.length !== 1) fail('lock.solution length');
        if (type === 'map-route') for (const item of items) { num(item['x'], 'map.x', 5, 95); num(item['y'], 'map.y', 5, 95); }
      } else if (type === 'cargo') {
        const capacity = num(l['capacity'], 'capacity', 1);
        items.forEach(i => num(i['mass'], 'item.mass', 0));
        const required = refs(l['requiredItems'], itemIds, 'requiredItems');
        if (items.filter(i => required.includes(String(i['id']))).reduce((sum, i) => sum + Number(i['mass']), 0) > capacity) fail('cargo has no feasible recovery');
      } else {
        const zones = rows(l['zones'], 'lock.zones'), zoneIds = new Set(zones.map(z => z['id']));
        zones.forEach(z => str(z['label'], 'zone.label'));
        const matches = obj(l['matches'], 'lock.matches');
        if (Object.keys(matches).length !== items.length || items.some(i => !zoneIds.has(matches[String(i['id'])]))) fail('lock.matches');
      }
    }
  }
  const chambers = rows(m['chambers'], 'chambers'), chamberIds = new Set(chambers.map(c => c['id']));
  const paintingIds = new Set<string>();
  const recoveryIds = new Set<string>();
  const mainLockIds = new Set<string>();
  for (const c of chambers) {
    for (const key of ['title', 'date', 'location', 'briefing']) str(c[key], `chamber.${key}`);
    if (!['gallery', 'workshop', 'port', 'cargo', 'map', 'archive', 'treaty', 'vault'].includes(String(c['layout']))) fail('chamber.layout');
    refs(c['factIds'], evidenceIds, 'chamber.factIds');
    refs(c['lockIds'], lockIds, 'chamber.lockIds').forEach(lockId => { if (mainLockIds.has(lockId)) fail('main locks must have unique IDs per chamber'); mainLockIds.add(lockId); });
    if (c['next'] !== undefined && !chamberIds.has(c['next'])) fail('chamber.next');
    const paintings = rows(c['paintings'], 'paintings');
    if (paintings.length !== 3 || paintings.filter(p => p['authentic'] === true).length !== 1) fail('Each gallery requires three paintings and exactly one authentic painting');
    for (const p of paintings) {
      const paintingId = id(p['id'], 'painting.id'); if (paintingIds.has(paintingId)) fail('duplicate painting ID'); paintingIds.add(paintingId);
      for (const key of ['title', 'caption']) str(p[key], `painting.${key}`);
      localAsset(p['image'], 'painting.image');
      if (!Number.isInteger(num(p['artFrame'], 'painting.artFrame', 0, 8))) fail('painting.artFrame');
      const hotspots = rows(p['hotspots'], 'hotspots');
      for (const h of hotspots) { for (const key of ['label', 'detail', 'symbol']) str(h[key], `hotspot.${key}`); num(h['x'], 'hotspot.x', 5, 95); num(h['y'], 'hotspot.y', 5, 95); }
      if (typeof p['authentic'] !== 'boolean') fail('painting.authentic');
      if (!p['authentic']) {
        const fraud = obj(p['fraud'], 'painting.fraud');
        if (!['timeline', 'animal-plant', 'people', 'technology'].includes(String(fraud['category']))) fail('fraud.category');
        if (!hotspots.some(h => h['id'] === fraud['hotspotId'])) fail('fraud.hotspotId');
        str(fraud['explanation'], 'fraud.explanation');
        const recovery = id(fraud['recoveryLockId'], 'fraud.recoveryLockId');
        if (!lockIds.has(recovery) || recoveryIds.has(recovery)) fail('fraud requires a unique recovery lock'); recoveryIds.add(recovery);
      } else if (p['fraud'] !== undefined) fail('authentic painting has fraud metadata');
    }
  }
  if ([...recoveryIds].some(id => mainLockIds.has(id))) fail('recovery locks must be separate from passage locks');
  const visited = new Set<unknown>(); let next: unknown = m['entry'];
  if (!chamberIds.has(next)) fail('entry');
  while (next !== undefined) { if (visited.has(next)) fail('correct route contains a cycle'); visited.add(next); next = chambers.find(c => c['id'] === next)!['next']; }
  if (visited.size !== chambers.length) fail('unreachable chamber');
  if (m['encounters'] !== undefined) {
    if (m['schemaVersion'] !== '1.2') fail('encounters require schema 1.2');
    requireEncounters(m['encounters'], new Set(evidence.map(e => String(e['id']))), new Set(chambers.map(c => String(c['id']))));
  }
  return value as GalleryMission;
}
