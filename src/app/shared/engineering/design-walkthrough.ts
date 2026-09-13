/** Data-only requests interpreted by an installed simulation, never executable curriculum. */
export type DesignWalkthroughSetup = Readonly<Record<string, string | number | boolean>>;
export interface DesignWalkthroughAction {
  readonly label: string;
  readonly command: string;
  readonly value?: string | number;
}
export interface DesignWalkthroughTask {
  readonly id: string;
  readonly title: string;
  readonly instruction: string;
  readonly lookFor: string;
  readonly setup: DesignWalkthroughSetup;
  readonly actions?: readonly DesignWalkthroughAction[];
  readonly sampleId?: string;
  readonly requiredTargetId?: string;
  readonly requiredEvidenceCount?: number;
  readonly response?: {
    readonly saveAs?: 'exhibit';
    readonly label: string;
    readonly unit?: string;
    readonly options?: readonly string[];
  };
}
export interface DesignWalkthroughControls {
  readonly ready: () => boolean;
  readonly readings: () => readonly { label: string; value: string }[];
  readonly status: () => string;
  readonly run: (action: DesignWalkthroughAction) => void;
}
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim() && v.length <= 2000;
export function isWalkthroughSetup(v: unknown): v is DesignWalkthroughSetup {
  return (
    record(v) &&
    Object.keys(v).length <= 16 &&
    Object.entries(v).every(
      ([k, x]) =>
        k.length <= 80 &&
        (typeof x === 'boolean' ||
          (typeof x === 'number' && Number.isFinite(x)) ||
          (typeof x === 'string' && x.length <= 200)),
    )
  );
}
export function isWalkthroughTask(v: unknown): v is DesignWalkthroughTask {
  if (
    !record(v) ||
    !['id', 'title', 'instruction', 'lookFor'].every((k) => text(v[k])) ||
    !isWalkthroughSetup(v['setup'])
  )
    return false;
  const actions = v['actions'],
    response = v['response'];
  return (
    (v['sampleId'] === undefined || text(v['sampleId'])) &&
    (v['requiredEvidenceCount'] === undefined ||
      (Number.isInteger(v['requiredEvidenceCount']) &&
        Number(v['requiredEvidenceCount']) >= 1 &&
        Number(v['requiredEvidenceCount']) <= 20)) &&
    (v['requiredTargetId'] === undefined || text(v['requiredTargetId'])) &&
    (actions === undefined ||
      (Array.isArray(actions) &&
        actions.length <= 6 &&
        actions.every(
          (a) =>
            record(a) &&
            text(a['label']) &&
            text(a['command']) &&
            (a['value'] === undefined ||
              text(a['value']) ||
              (typeof a['value'] === 'number' && Number.isFinite(a['value']))),
        ))) &&
    (response === undefined ||
      (record(response) &&
        text(response['label']) &&
        (response['saveAs'] === undefined || response['saveAs'] === 'exhibit') &&
        (response['unit'] === undefined || text(response['unit'])) &&
        (response['options'] === undefined ||
          (Array.isArray(response['options']) &&
            response['options'].length >= 2 &&
            response['options'].length <= 6 &&
            response['options'].every(text)))))
  );
}
