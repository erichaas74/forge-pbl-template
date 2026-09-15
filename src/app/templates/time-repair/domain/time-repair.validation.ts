import { repairCapabilities } from './time-repair.engine';
import type { TimeRepairConfig } from './time-repair.models';
import { validateRepairPreview } from './time-repair-preview.validation';

function check(condition: unknown, path: string): asserts condition {
  if (!condition) throw new Error(`INVALID_TIME_REPAIR_PACKAGE: ${path}`);
}
function record(value: unknown, path: string): Record<string, unknown> {
  check(value && typeof value === 'object' && !Array.isArray(value), path);
  return value as Record<string, unknown>;
}
function text(value: unknown, path: string): asserts value is string {
  check(typeof value === 'string' && value.trim().length > 0 && value.length <= 8000, path);
}
function list(value: unknown, path: string, min = 1): unknown[] {
  check(Array.isArray(value) && value.length >= min && value.length <= 100, path);
  return value;
}
function strings(value: unknown, path: string, min = 1): string[] {
  const values = list(value, path, min);
  values.forEach((v) => text(v, path));
  check(new Set(values).size === values.length, `${path}: duplicate value`);
  return values as string[];
}
function number(value: unknown, path: string, min: number, max: number): asserts value is number {
  check(typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max, path);
}
function entities(value: unknown, path: string): Record<string, unknown>[] {
  const items = list(value, path).map((v) => record(v, path));
  for (const item of items)
    check(
      typeof item['id'] === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(item['id']),
      `${path}.id`,
    );
  check(new Set(items.map((i) => i['id'])).size === items.length, `${path}: duplicate ID`);
  return items;
}
function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.freeze(value);
    Object.values(value).forEach(freeze);
  }
  return value;
}

export function requireTimeRepairConfig(value: unknown): TimeRepairConfig {
  const c = record(value, 'project');
  const template = record(c['template'], 'template');
  check(
    c['schemaVersion'] === '1.0' &&
      template['id'] === 'time-repair' &&
      template['version'] === '1.0',
    'schema/template version',
  );
  for (const key of ['projectId', 'projectVersion', 'title', 'subtitle', 'briefing'])
    text(c[key], key);
  check(['history', 'literature'].includes(String(c['subject'])), 'subject');
  const settings = record(c['settings'], 'settings');
  number(settings['repairCharges'], 'repairCharges', 1, 30);
  check(Number.isInteger(settings['repairCharges']), 'repairCharges must be an integer');
  number(settings['initialStability'], 'initialStability', 0, 99);
  number(settings['wrongRepairPenalty'], 'wrongRepairPenalty', 1, 100);
  number(settings['minReasoningLength'], 'minReasoningLength', 20, 500);
  for (const stage of list(c['stages'], 'stages')) {
    const s = record(stage, 'stage');
    text(s['title'], 'stage.title');
    text(s['description'], 'stage.description');
  }
  const nodes = entities(c['nodes'], 'nodes');
  for (const node of nodes) {
    for (const key of ['title', 'dateLabel', 'summary']) text(node[key], `node.${key}`);
    number(node['order'], 'node.order', 0, 1000);
    check(
      ['stable', 'uncertain', 'missing'].includes(String(node['initialStatus'])),
      'node.initialStatus',
    );
  }
  check(new Set(nodes.map((n) => n['order'])).size === nodes.length, 'node orders must be unique');
  const evidence = entities(c['evidence'], 'evidence');
  for (const e of evidence) {
    for (const key of ['title', 'content', 'citation', 'perspective'])
      text(e[key], `evidence.${key}`);
    check(
      ['primary', 'secondary', 'quotation', 'map'].includes(String(e['kind'])),
      'evidence.kind',
    );
    if (e['url'] !== undefined) {
      text(e['url'], 'evidence.url');
      check(/^https:\/\/[^\s]+$/.test(e['url']), 'evidence URL must use HTTPS');
    }
  }
  const scenes = entities(c['scenes'], 'scenes');
  for (const scene of scenes) {
    for (const key of ['title', 'image', 'imageAlt']) text(scene[key], `scene.${key}`);
    check(
      /^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(String(scene['image'])),
      'scene image must be a local asset',
    );
    const views = entities(scene['views'], 'views');
    check(views.length <= 4, 'at most four views');
    for (const view of views) {
      text(view['label'], 'view.label');
      check(/^\d{1,3}% \d{1,3}%$/.test(String(view['position'])), 'view.position');
    }
    for (const hotspot of entities(scene['hotspots'], 'hotspots')) {
      text(hotspot['label'], 'hotspot.label');
      text(hotspot['description'], 'hotspot.description');
      for (const key of ['objectImage', 'restoredObjectImage']) {
        if (hotspot[key] !== undefined)
          check(
            typeof hotspot[key] === 'string' &&
              /^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|webp|jpg|svg)$/.test(hotspot[key]),
            `hotspot.${key} must be a local asset`,
          );
      }
      if (hotspot['restoredObjectImage'] !== undefined)
        text(hotspot['objectImage'], 'restored object requires an initial image');
      number(hotspot['x'], 'hotspot.x', 5, 95);
      number(hotspot['y'], 'hotspot.y', 5, 90);
    }
  }
  const missions = entities(c['missions'], 'missions');
  check(
    new Set(missions.map((m) => m['nodeId'])).size === missions.length,
    'one repair mission per node',
  );
  const reference = (items: Record<string, unknown>[], id: unknown, path: string) =>
    check(
      items.some((i) => i['id'] === id),
      `REFERENCE_NOT_FOUND: ${path}`,
    );
  for (const m of missions) {
    reference(nodes, m['nodeId'], 'mission.nodeId');
    reference(scenes, m['sceneId'], 'mission.sceneId');
    for (const key of ['signal', 'canonicalSummary', 'verificationPrompt'])
      text(m[key], `mission.${key}`);
    strings(m['prerequisiteMissionIds'], 'prerequisites', 0).forEach((id) =>
      reference(missions, id, 'prerequisite'),
    );
    strings(m['evidenceRequired'], 'evidenceRequired').forEach((id) =>
      reference(evidence, id, 'required evidence'),
    );
    const categories = strings(m['categories'], 'categories');
    const defense = record(m['defense'], 'defense');
    text(defense['prompt'], 'defense.prompt');
    const answers = entities(defense['options'], 'defense.options');
    answers.forEach((o) => text(o['label'], 'answer.label'));
    const repair = record(m['repair'], 'repair');
    check(
      typeof repair['capability'] === 'string' &&
        Object.hasOwn(repairCapabilities, repair['capability']),
      `CAPABILITY_NOT_INSTALLED: ${String(repair['capability'])}`,
    );
    const scene = scenes.find((s) => s['id'] === m['sceneId'])!;
    reference(entities(scene['hotspots'], 'hotspots'), repair['targetHotspotId'], 'repair target');
    const options = entities(repair['options'], 'repair.options');
    for (const o of options)
      for (const key of ['label', 'description', 'objectLabel']) text(o[key], `option.${key}`);
    const evaluation = record(m['evaluation'], 'evaluation');
    check(categories.includes(String(evaluation['category'])), 'evaluation.category');
    reference(answers, evaluation['defenseOptionId'], 'defense answer');
    reference(options, evaluation['repairOptionId'], 'repair answer');
    const rippleNodes: unknown[] = [];
    for (const item of list(m['ripples'], 'ripples')) {
      const r = record(item, 'ripple');
      reference(nodes, r['nodeId'], 'ripple.nodeId');
      text(r['before'], 'ripple.before');
      text(r['after'], 'ripple.after');
      check(
        Number(nodes.find((n) => n['id'] === r['nodeId'])!['order']) >
          Number(nodes.find((n) => n['id'] === m['nodeId'])!['order']),
        'ripples must point forward',
      );
      rippleNodes.push(r['nodeId']);
    }
    check(new Set(rippleNodes).size === rippleNodes.length, 'duplicate ripple node');
    number(m['stabilityValue'], 'stabilityValue', 1, 100);
  }
  const config = structuredClone(value) as TimeRepairConfig;
  const visit = (id: string, path: string[]): void => {
    check(!path.includes(id), 'cyclic prerequisites');
    config.missions
      .find((m) => m.id === id)!
      .prerequisiteMissionIds.forEach((p) => visit(p, [...path, id]));
  };
  config.missions.forEach((m) => visit(m.id, []));
  check(
    config.settings.repairCharges >= missions.length,
    'insufficient charges to complete all missions',
  );
  check(
    config.settings.initialStability +
      config.missions.reduce((sum, m) => sum + m.stabilityValue, 0) ===
      100,
    'stability values must total 100',
  );
  if (config.previewWeeks !== undefined) validateRepairPreview(config.previewWeeks, config);
  return freeze(config);
}
