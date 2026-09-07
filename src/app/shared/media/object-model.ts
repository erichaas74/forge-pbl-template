/** A self-contained glTF binary and its accessible description and source credit. */
export interface ExhibitObjectModel {
  readonly src: string;
  readonly alt: string;
  readonly sizeBytes?: number;
  readonly initialView?: {
    readonly azimuthDegrees: number;
    readonly elevationDegrees: number;
    readonly distancePercent: number;
  };
  readonly credit: string;
  readonly sourceUrl: string;
  readonly license: string;
}

export function isExhibitObjectModel(value: unknown): value is ExhibitObjectModel {
  if (typeof value !== 'object' || value === null) return false;
  const model = value as Record<string, unknown>;
  const view = model['initialView'] as Record<string, unknown> | undefined;
  const validView =
    view === undefined ||
    (typeof view === 'object' &&
      view !== null &&
      ['azimuthDegrees', 'elevationDegrees', 'distancePercent'].every(
        (key) => typeof view[key] === 'number' && Number.isFinite(view[key]),
      ) &&
      Number(view['elevationDegrees']) > 0 &&
      Number(view['elevationDegrees']) < 180 &&
      Number(view['distancePercent']) > 0);
  return (
    validView &&
    typeof model['src'] === 'string' &&
    /^(\/[^/]|https:\/\/)/u.test(model['src']) &&
    /\.glb$/iu.test(model['src']) &&
    ['alt', 'credit', 'license'].every(
      (key) => typeof model[key] === 'string' && model[key].trim().length > 0,
    ) &&
    typeof model['sourceUrl'] === 'string' &&
    /^https:\/\//u.test(model['sourceUrl']) &&
    (model['sizeBytes'] === undefined ||
      (typeof model['sizeBytes'] === 'number' &&
        Number.isFinite(model['sizeBytes']) &&
        model['sizeBytes'] > 0))
  );
}
