import type { EncounterDefinition } from './encounter.models';

type Row = Record<string, unknown>;
const fail = (p: string): never => { throw new Error(`INVALID_ENCOUNTER: ${p}`); };
const row = (v: unknown, p: string): Row => v && typeof v === 'object' && !Array.isArray(v) ? v as Row : fail(p);
const text = (v: unknown, p: string): string => typeof v === 'string' && !!v.trim() && v.length <= 5000 ? v : fail(p);
const id = (v: unknown, p: string): string => { const s = text(v, p); return /^[a-z][a-z0-9-]{0,79}$/.test(s) && !['constructor', 'prototype'].includes(s) ? s : fail(p); };
const list = (v: unknown, p: string): unknown[] => Array.isArray(v) && v.length > 0 && v.length <= 30 ? v : fail(p);
const rows = (v: unknown, p: string): Row[] => { const r = list(v, p).map(x => row(x, p)); const ids = r.map(x => id(x['id'], p)); if (new Set(ids).size !== ids.length) fail(`${p} duplicate id`); return r; };
const refs = (v: unknown, allowed: ReadonlySet<string>, p: string) => { const r = list(v, p).map(x => id(x, p)); if (new Set(r).size !== r.length || r.some(x => !allowed.has(x))) fail(`${p} reference`); return r; };
const number = (v: unknown, min: number, max: number, p: string) => { if (typeof v !== 'number' || !Number.isFinite(v) || v < min || v > max) fail(p); };
const asset = (v: unknown, extensions: string, p: string) => { if (!new RegExp(`^/projects/[a-zA-Z0-9/_-]+\\.(${extensions})$`).test(text(v, p))) fail(p); };

/** The kind registry is deliberately small; unsupported required presenters fail closed. */
export const encounterKinds = { 'guided-scene': validateGuidedScene } as const;
function validateGuidedScene(d: Row, evidenceIds: ReadonlySet<string>, chamberIds: ReadonlySet<string>): void {
  id(d['id'], 'id');
  for (const key of ['version', 'title', 'location', 'date', 'invitation', 'imageAlt', 'attribution']) text(d[key], key);
  refs(d['chamberIds'], chamberIds, 'chamberIds'); asset(d['image'], 'webp|png|jpg', 'image');
  const host = row(d['host'], 'host'); for (const key of ['name', 'role', 'greeting']) text(host[key], `host.${key}`);
  const views = rows(d['views'], 'views');
  for (const view of views) {
    text(view['label'], 'view.label'); text(view['description'], 'view.description');
    number(view['position'], 0, 100, 'view.position'); number(view['zoom'], 1, 2.5, 'view.zoom');
    if (!['observe', 'listen', 'talk', 'object'].includes(String(view['mode']))) fail('view.mode');
  }
  if (!views.some(v => v['id'] === d['entryViewId'])) fail('entryViewId');
  for (const mode of ['observe', 'listen', 'talk', 'object']) if (!views.some(v => v['mode'] === mode)) fail(`unreachable ${mode} interaction`);
  const chapters = rows(d['chapters'], 'chapters'), questions = rows(d['questions'], 'questions');
  for (const speech of [...chapters, ...questions]) {
    for (const key of ['title', 'speaker', 'text']) text(speech[key], `speech.${key}`);
    asset(speech['audioSrc'], 'm4a|mp3|wav', 'speech.audioSrc'); refs(speech['evidenceIds'], evidenceIds, 'speech.evidenceIds');
  }
  const questionIds = new Set(questions.map(q => String(q['id'])));
  for (const question of questions) {
    const visited = new Set<unknown>([question['id']]); let dependency = question['requiresQuestionId'];
    while (dependency !== undefined) {
      if (!questionIds.has(String(dependency)) || visited.has(dependency)) fail('question dependency missing or cyclic');
      visited.add(dependency); dependency = questions.find(q => q['id'] === dependency)!['requiresQuestionId'];
    }
  }
  const object = row(d['object'], 'object'); id(object['id'], 'object.id');
  text(object['title'], 'object.title'); text(object['description'], 'object.description');
  number(object['position'], 0, 100, 'object.position'); refs(object['evidenceIds'], evidenceIds, 'object.evidenceIds');
  for (const feature of rows(object['features'], 'object.features')) { text(feature['label'], 'feature.label'); text(feature['text'], 'feature.text'); }
  const insight = row(d['insight'], 'insight');
  for (const key of ['title', 'claim', 'explanation', 'hint']) text(insight[key], `insight.${key}`);
  const offered = refs(insight['evidenceIds'], evidenceIds, 'insight.evidenceIds');
  if (!offered.includes(String(insight['answerEvidenceId']))) fail('insight answer unavailable');
  if (!['supports', 'contradicts', 'does-not-establish'].includes(String(insight['relationship']))) fail('insight.relationship');
}

export function requireEncounters(value: unknown, evidenceIds: ReadonlySet<string>, chamberIds: ReadonlySet<string>): readonly EncounterDefinition[] {
  const definitions = rows(value, 'encounters');
  for (const definition of definitions) {
    if (definition['type'] !== 'guided-scene') throw new Error(`CAPABILITY_NOT_INSTALLED: encounter.${String(definition['type'])}`);
    encounterKinds[definition['type']](definition, evidenceIds, chamberIds);
  }
  return value as readonly EncounterDefinition[];
}
