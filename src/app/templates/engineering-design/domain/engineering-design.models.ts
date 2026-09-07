import {
  isBlockDesign,
  isDesignCapture,
  isDesignChecks,
  type DesignCheck,
  type BlockDesign,
  type DesignCapture,
} from '../../../shared/engineering/block-design';
export interface EngineeringDesignConfig {
  readonly schemaVersion: '1.0';
  readonly projectId: string;
  readonly version: string;
  readonly template: { readonly id: 'engineering-design'; readonly version: '1.0' };
  readonly title: string;
  readonly mission: string;
  readonly simulationId: string;
  readonly research: readonly {
    readonly id: string;
    readonly title: string;
    readonly prompt: string;
    readonly explanation: string;
    readonly source: { readonly label: string; readonly url: string };
  }[];
  readonly designBrief: string;
  readonly testInstructions: readonly string[];
  readonly exhibitPrompts: readonly string[];
  readonly starterDesign: BlockDesign;
}
export interface EngineeringSnapshot {
  readonly schemaVersion: '1.0';
  readonly revision: number;
  readonly design: BlockDesign;
  readonly research: Readonly<Record<string, string>>;
  readonly prediction: string;
  readonly exhibit: string;
  readonly checks?: readonly DesignCheck[];
  readonly trials: readonly (DesignCapture & { readonly prediction: string })[];
  readonly events: readonly {
    readonly id: string;
    readonly eventType: string;
    readonly timestamp: string;
  }[];
}
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim() && v.length <= 10000;
export function requireEngineeringConfig(v: unknown, projectId: string): EngineeringDesignConfig {
  if (
    !record(v) ||
    v['schemaVersion'] !== '1.0' ||
    v['projectId'] !== projectId ||
    !text(v['version']) ||
    !/^\d+\.\d+\.\d+$/.test(v['version']) ||
    !record(v['template']) ||
    v['template']['id'] !== 'engineering-design' ||
    v['template']['version'] !== '1.0' ||
    !['title', 'mission', 'simulationId', 'designBrief'].every((k) => text(v[k])) ||
    !isBlockDesign(v['starterDesign']) ||
    !Array.isArray(v['research']) ||
    !v['research'].length ||
    v['research'].some(
      (r: unknown) =>
        !record(r) ||
        !['id', 'title', 'prompt', 'explanation'].every((k) => text(r[k])) ||
        !record(r['source']) ||
        !text(r['source']['label']) ||
        !text(r['source']['url']) ||
        !r['source']['url'].startsWith('https://'),
    ) ||
    !['testInstructions', 'exhibitPrompts'].every(
      (k) => Array.isArray(v[k]) && v[k].length > 0 && v[k].every(text),
    )
  ) {
    throw new Error('CONFIG_INVALID: The engineering design package is incomplete or unsupported.');
  }
  const config = v as unknown as EngineeringDesignConfig;
  if (new Set(config.research.map((r) => r.id)).size !== config.research.length)
    throw new Error('CONFIG_INVALID: Research IDs must be unique.');
  return config;
}
export function isEngineeringSnapshot(v: unknown): v is EngineeringSnapshot {
  return (
    record(v) &&
    v['schemaVersion'] === '1.0' &&
    Number.isInteger(v['revision']) &&
    (v['revision'] as number) >= 0 &&
    isBlockDesign(v['design']) &&
    record(v['research']) &&
    Object.keys(v['research']).length <= 30 &&
    Object.values(v['research']).every((t) => typeof t === 'string' && t.length <= 10000) &&
    typeof v['prediction'] === 'string' &&
    v['prediction'].length <= 10000 &&
    typeof v['exhibit'] === 'string' &&
    v['exhibit'].length <= 10000 &&
    (v['checks'] === undefined || isDesignChecks(v['checks'])) &&
    Array.isArray(v['trials']) &&
    v['trials'].length <= 40 &&
    v['trials'].every(
      (t: unknown) =>
        isDesignCapture(t) &&
        'prediction' in t &&
        typeof t.prediction === 'string' &&
        t.prediction.length <= 10000,
    ) &&
    Array.isArray(v['events']) &&
    v['events'].length <= 200 &&
    v['events'].every(
      (e: unknown) => record(e) && text(e['id']) && text(e['eventType']) && text(e['timestamp']),
    )
  );
}
