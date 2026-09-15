import { inventionCapabilities, validPressSettings, pullProof } from './printing-press.engine';
import type { InventionProject } from './invention.models';
import { validKnowledgeDefinition } from './knowledge/knowledge.engine';

function check(value: unknown, path: string): asserts value {
  if (!value) throw new Error(`INVALID_INVENTION_PACKAGE: ${path}`);
}
function object(value: unknown): Record<string, unknown> {
  check(value && typeof value === 'object' && !Array.isArray(value), 'expected object');
  return value as Record<string, unknown>;
}
function text(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length < 4000;
}
function rows(value: unknown, min: number, max = min): Record<string, unknown>[] {
  check(Array.isArray(value) && value.length >= min && value.length <= max, 'array length');
  return value.map(object);
}
function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
export function requireInventionProject(value: unknown): InventionProject {
  const p = object(value),
    template = object(p['template']),
    c = object(p['inventionRescue']);
  check(
    p['schemaVersion'] === '1.0' &&
      template['id'] === 'time-repair' &&
      template['version'] === '1.1',
    'schema/template version',
  );
  check(typeof p['projectId'] === 'string' && /^[a-z0-9-]+$/.test(p['projectId']), 'projectId');
  check(
    typeof p['projectVersion'] === 'string' && /^\d+\.\d+\.\d+$/.test(p['projectVersion']),
    'projectVersion',
  );
  check(text(p['title']) && text(p['subtitle']), 'title/subtitle');
  check(c['version'] === '1.0', 'extension version');
  check(
    typeof c['capability'] === 'string' && inventionCapabilities.has(c['capability']),
    `CAPABILITY_NOT_INSTALLED: ${String(c['capability'])}`,
  );
  check(text(c['fiction']) && text(c['modelNote']), 'scenario context');
  const inks = rows(c['inks'], 3, 3);
  for (const ink of inks) {
    check(
      ['id', 'mark', 'name'].every((k) => text(ink[k])),
      'ink identity',
    );
    check(typeof ink['color'] === 'string' && /^#[0-9a-f]{6}$/i.test(ink['color']), 'ink color');
    for (const k of ['adhesion', 'spread', 'paperAdhesion'])
      check(
        typeof ink[k] === 'number' && Number.isFinite(ink[k]) && ink[k] >= 0 && ink[k] <= 1,
        `ink.${k}`,
      );
  }
  check(new Set(inks.map((i) => i['id'])).size === inks.length, 'duplicate ink');
  const sources = rows(c['sources'], 1, 12);
  for (const s of sources)
    check(
      ['id', 'title', 'detail'].every((k) => text(s[k])) &&
        typeof s['url'] === 'string' &&
        /^https:\/\/[^\s]+$/.test(s['url']),
      'source',
    );
  check(new Set(sources.map((s) => s['id'])).size === sources.length, 'duplicate source');
  for (const w of rows(c['weeks'], 4))
    check(
      text(w['title']) &&
        text(w['goal']) &&
        Array.isArray(w['evidence']) &&
        w['evidence'].length > 0 &&
        w['evidence'].every(text),
      'week',
    );
  const sessions = rows(c['sessions'], 8);
  const modes = [
    'courtyard',
    'reference',
    'compose',
    'recompose',
    'ink',
    'packing',
    'production',
    'return',
    'knowledge',
  ];
  check(new Set(sessions.map((s) => s['id'])).size === 8, 'duplicate session');
  const project = structuredClone(value) as InventionProject;
  for (const [i, s] of sessions.entries()) {
    check(s['number'] === i + 1 && modes.includes(String(s['mode'])), 'session number/mode');
    check(
      [
        'id',
        'title',
        'location',
        'date',
        'task',
        'goal',
        'product',
        'historicalNote',
        'question',
      ].every((k) => text(s[k])),
      'session content',
    );
    check(
      typeof s['target'] === 'string' && /^[A-Z]{5}$/.test(s['target']),
      'five letter specimen',
    );
    check(
      Array.isArray(s['sourceIds']) &&
        s['sourceIds'].length > 0 &&
        s['sourceIds'].every((id) => sources.some((source) => source['id'] === id)),
      'source reference',
    );
    check(
      Number.isInteger(s['batchSize']) &&
        Number(s['batchSize']) >= 1 &&
        Number(s['batchSize']) <= 5,
      'batch size',
    );
    const session = project.inventionRescue.sessions[i];
    check(
      s['mode'] === 'knowledge'
        ? validKnowledgeDefinition(s['knowledge'])
        : s['knowledge'] === undefined,
      'knowledge capability configuration',
    );
    check(validPressSettings(session.initial, project, session), 'initial settings');
    check(
      inks.some(
        (ink) =>
          pullProof(
            project,
            session,
            {
              type: [...session.target].reverse(),
              ink: String(ink['id']),
              pressure: 1,
              packing: [1, 1, 1],
            },
            1,
          ).usable,
      ),
      'no feasible repair',
    );
  }
  return deepFreeze(project);
}
