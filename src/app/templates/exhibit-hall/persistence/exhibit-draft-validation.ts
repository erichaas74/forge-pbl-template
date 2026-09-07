import { isExhibitObjectModel } from '../../../shared/media/object-model';
import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function optionalText(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

/** Incomplete drafts are valid storage; publication requirements are checked separately. */
export function isExhibitDraft(value: unknown): value is MuseumBoardSnapshotData {
  if (
    !record(value) ||
    typeof value['title'] !== 'string' ||
    typeof value['centralClaim'] !== 'string'
  )
    return false;
  if (!record(value['teamCredit']) || typeof value['teamCredit']['displayName'] !== 'string')
    return false;
  if (
    !Array.isArray(value['objects']) ||
    !value['objects'].every(
      (item: unknown) =>
        record(item) &&
        ['id', 'title', 'description', 'evidenceConnection'].every(
          (key) => typeof item[key] === 'string',
        ) &&
        Array.isArray(item['sourceIds']) &&
        item['sourceIds'].every((id) => typeof id === 'string') &&
        optionalText(item['imageAssetId']) &&
        optionalText(item['imageAlt']) &&
        (item['model'] === undefined || isExhibitObjectModel(item['model'])),
    )
  )
    return false;
  if (
    !Array.isArray(value['sources']) ||
    !value['sources'].every(
      (item: unknown) =>
        record(item) &&
        typeof item['id'] === 'string' &&
        typeof item['citation'] === 'string' &&
        optionalText(item['url']),
    )
  )
    return false;
  const gallery = value['immersiveGallery'];
  if (
    gallery !== undefined &&
    (!record(gallery) ||
      gallery['provider'] !== 'metasteps' ||
      typeof gallery['title'] !== 'string' ||
      typeof gallery['embedUrl'] !== 'string')
  )
    return false;
  const video = value['videoPresentation'];
  return (
    video === undefined ||
    (record(video) &&
      typeof video['title'] === 'string' &&
      optionalText(video['videoUrl']) &&
      (video['prototype'] === undefined || typeof video['prototype'] === 'boolean'))
  );
}
