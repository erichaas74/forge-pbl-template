import type { RestorationDefinition } from './restoration.models';
type Row = Record<string, unknown>;
const fail = (p: string): never => { throw new Error(`INVALID_RESTORATION: ${p}`); };
const row = (v: unknown, p: string): Row => v && typeof v === 'object' && !Array.isArray(v) ? v as Row : fail(p);
const str = (v: unknown, p: string) => typeof v === 'string' && v.trim().length && v.length <= 5000 ? v : fail(p);
const id = (v: unknown) => typeof v === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(v) && !['constructor', 'prototype'].includes(v) ? v : fail('id');
const items = (v: unknown, p: string): unknown[] => Array.isArray(v) && v.length > 0 && v.length <= 50 ? v : fail(p);
const rows = (v: unknown, p: string) => { const r = items(v, p).map(x => row(x, p)); if (new Set(r.map(x => id(x['id']))).size !== r.length) fail(`${p} duplicate id`); return r; };
const n = (v: unknown, min: number, max: number) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max ? v : fail('bounds');
const asset = (v: unknown) => { if (!/^\/projects\/[a-zA-Z0-9/_-]+\.(png|webp|jpg)$/.test(str(v, 'asset'))) fail('asset'); };
function layered(d: Row, sources: ReadonlySet<string>) {
  for (const key of ['title', 'collection', 'date', 'location', 'commission', 'attribution', 'imageAlt']) str(d[key], key);
  const media = row(d['image'], 'image'); asset(media['src']); const grid = n(media['grid'], 1, 8), frame = n(media['frame'], 0, grid * grid - 1);
  if (!Number.isInteger(grid) || !Number.isInteger(frame)) fail('image grid');
  for (const r of rows(d['regions'], 'regions')) {
    for (const key of ['title', 'claim', 'instruction', 'hint']) str(r[key], key);
    const x = n(r['x'], 0, 100), y = n(r['y'], 0, 100); n(r['width'], 5, 100 - x); n(r['height'], 5, 100 - y);
    const options = rows(r['options'], 'options'), optionIds = new Set(options.map(o => o['id']));
    if (!optionIds.has(r['originalOptionId'])) fail('original option');
    for (const o of options) {
      str(o['label'], 'option.label'); str(o['description'], 'option.description');
      if (!['keep', 'remove', 'replace', 'relabel'].includes(String(o['tool']))) fail('option tool');
      if (o['image'] !== undefined) asset(o['image']); if (o['text'] !== undefined) str(o['text'], 'option.text');
      if (o['tool'] !== 'remove' && o['image'] === undefined && o['text'] === undefined) fail('invisible option');
      if (o['tool'] === 'remove' && (o['image'] !== undefined || o['text'] !== undefined)) fail('remove option has content');
    }
    const evidenceIds = items(r['evidenceIds'], 'evidenceIds').map(id);
    if (new Set(evidenceIds).size !== evidenceIds.length || evidenceIds.some(e => !sources.has(e))) fail('source reference');
    for (const value of items(r['answers'], 'answers')) {
      const a = row(value, 'answer');
      if (!optionIds.has(a['optionId']) || !evidenceIds.includes(String(a['evidenceId'])) || !['supports', 'contradicts', 'does-not-establish'].includes(String(a['relationship']))) fail('unreachable answer');
    }
  }
}
export const restorationKinds = { 'layered-painting': layered } as const;
export function requireRestorations(value: unknown, sources: ReadonlySet<string>): readonly RestorationDefinition[] {
  for (const d of rows(value, 'works')) {
    if (d['type'] !== 'layered-painting') throw new Error(`CAPABILITY_NOT_INSTALLED: restoration.${String(d['type'])}`);
    restorationKinds[d['type']](d, sources);
  }
  return value as readonly RestorationDefinition[];
}
