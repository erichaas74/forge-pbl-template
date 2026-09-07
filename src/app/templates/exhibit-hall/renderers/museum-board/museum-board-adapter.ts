import { ArtifactValidator } from '../../core/artifact-validator';
import type {
  ArtifactComposerAdapter,
  ArtifactComposerResult,
  ArtifactValidationResult,
  ExhibitTemplateDefinition,
  ExhibitVideoPresentation,
  ImmersiveGalleryEmbed,
  MuseumBoardObject,
  MuseumBoardSnapshotData,
  MuseumBoardSource,
  NotebookArtifactSource,
} from '../../domain/exhibit-types';
import { museumBoardTemplate } from './museum-board-template';
import { isExhibitObjectModel } from '../../../../shared/media/object-model';
import { parseMetaStepsEmbed } from '../metasteps/metasteps-embed';
import { parsePresentationVideo } from '../video/presentation-video';

export class MuseumBoardAdapter implements ArtifactComposerAdapter<MuseumBoardSnapshotData> {
  readonly type = 'notebook-slots';
  readonly allowedSlotIds = museumBoardTemplate.sourceAdapter.allowedSlotIds;

  constructor(private readonly validator = new ArtifactValidator()) {}

  compose(source: NotebookArtifactSource): ArtifactComposerResult<MuseumBoardSnapshotData> {
    const approved = Object.fromEntries(
      this.allowedSlotIds
        .filter((slotId) => Object.hasOwn(source.slots, slotId))
        .map((slotId) => [slotId, structuredClone(source.slots[slotId])]),
    );
    const omittedSlotIds = Object.keys(source.slots).filter(
      (slotId) => !this.allowedSlotIds.includes(slotId),
    );
    const data = normalizeMuseumBoard(approved);
    const validation = validateMuseumBoard(museumBoardTemplate, data, this.validator);
    return { data, validation, omittedSlotIds };
  }
}

export function museumBoardFieldValue(data: MuseumBoardSnapshotData, fieldId: string): unknown {
  switch (fieldId) {
    case 'exhibit-title':
      return data.title;
    case 'central-claim':
      return data.centralClaim;
    case 'selected-objects':
      return data.objects;
    case 'object-captions':
      return data.objects.map((object) => object.description);
    case 'source-list':
      return data.sources;
    case 'team-credit':
      return data.teamCredit.displayName;
    case 'immersive-gallery':
      return data.immersiveGallery?.embedUrl;
    case 'video-presentation':
      return data.videoPresentation?.prototype
        ? 'prototype-video-preview'
        : data.videoPresentation?.videoUrl;
    default:
      return undefined;
  }
}

function normalizeMuseumBoard(slots: Readonly<Record<string, unknown>>): MuseumBoardSnapshotData {
  return {
    title: stringValue(slots['exhibit-title']),
    centralClaim: stringValue(slots['central-claim']),
    objects: objectList(slots['selected-objects'], slots['object-captions']),
    sources: sourceList(slots['source-list']),
    immersiveGallery: immersiveGallery(slots['immersive-gallery']),
    videoPresentation: videoPresentation(slots['video-presentation']),
    teamCredit: teamCredit(slots['team-credit']),
    themeVariant: stringValue(slots['theme-variant']) || undefined,
  };
}

export function validateMuseumBoard(
  template: ExhibitTemplateDefinition,
  data: MuseumBoardSnapshotData,
  validator = new ArtifactValidator(),
): ArtifactValidationResult {
  const base = validator.validate(template, data, museumBoardFieldValue);
  const errors = [...base.errors];
  for (const object of data.objects) {
    if (object.model !== undefined && !isExhibitObjectModel(object.model)) {
      errors.push({
        fieldId: 'selected-objects',
        message: `The 3D model for ${object.title} needs a GLB URL, description, source, and credit.`,
        focusTarget: '[data-field-id="selected-objects"]',
      });
    }
  }
  const galleryValue = data.immersiveGallery?.embedUrl.trim() ?? '';
  const parsedGallery = parseMetaStepsEmbed(galleryValue);
  if (galleryValue.length > 0 && !parsedGallery.valid) {
    errors.push({
      fieldId: 'immersive-gallery',
      message: parsedGallery.message ?? 'The MetaSteps gallery embed is invalid.',
      focusTarget: '[data-field-id="immersive-gallery"]',
    });
  }
  const videoValue = data.videoPresentation?.videoUrl?.trim() ?? '';
  const parsedVideo = parsePresentationVideo(videoValue);
  if (!data.videoPresentation?.prototype && videoValue.length > 0 && !parsedVideo.valid) {
    errors.push({
      fieldId: 'video-presentation',
      message: parsedVideo.message ?? 'The presentation video link is invalid.',
      focusTarget: '[data-field-id="video-presentation"]',
    });
  }
  return {
    ...base,
    valid: errors.length === 0,
    errors,
  };
}

function videoPresentation(value: unknown): ExhibitVideoPresentation | undefined {
  const source =
    typeof value === 'string' ? value : isRecord(value) ? value['videoUrl'] : undefined;
  if (isRecord(value) && value['prototype'] === true) {
    return {
      title: stringValue(value['title']) || 'Student curator presentation',
      prototype: true,
      presenterLabel: optionalString(value['presenterLabel']),
    };
  }
  const parsed = parsePresentationVideo(stringValue(source));
  if (!parsed.valid || parsed.normalizedUrl === undefined) return undefined;
  const title = isRecord(value) ? stringValue(value['title']) : '';
  return {
    title: title || 'Curator video presentation',
    videoUrl: parsed.normalizedUrl,
  };
}

function immersiveGallery(value: unknown): ImmersiveGalleryEmbed | undefined {
  const source =
    typeof value === 'string' ? value : isRecord(value) ? value['embedUrl'] : undefined;
  const parsed = parseMetaStepsEmbed(stringValue(source));
  if (!parsed.valid || parsed.normalizedUrl === undefined) return undefined;
  const title = isRecord(value) ? stringValue(value['title']) : '';
  return {
    provider: 'metasteps',
    title: title || 'Immersive gallery',
    embedUrl: parsed.normalizedUrl,
  };
}

function objectList(value: unknown, captions: unknown): readonly MuseumBoardObject[] {
  if (!Array.isArray(value)) return [];
  const captionRecord = isRecord(captions) ? captions : {};
  return value.flatMap((candidate, index) => {
    if (!isRecord(candidate)) return [];
    const id = stringValue(candidate['id']) || `object-${index + 1}`;
    const description = stringValue(candidate['description']) || stringValue(captionRecord[id]);
    const sourceIds = Array.isArray(candidate['sourceIds'])
      ? candidate['sourceIds'].filter((item): item is string => typeof item === 'string')
      : [];
    return [
      {
        id,
        title: stringValue(candidate['title']),
        imageAssetId: optionalString(candidate['imageAssetId']),
        imageAlt: optionalString(candidate['imageAlt']),
        model: candidate['model'] as MuseumBoardObject['model'],
        description,
        evidenceConnection: stringValue(candidate['evidenceConnection']),
        sourceIds,
      },
    ];
  });
}

function sourceList(value: unknown): readonly MuseumBoardSource[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((candidate, index) => {
    if (typeof candidate === 'string') {
      return [{ id: `source-${index + 1}`, citation: candidate }];
    }
    if (!isRecord(candidate)) return [];
    return [
      {
        id: stringValue(candidate['id']) || `source-${index + 1}`,
        citation: stringValue(candidate['citation']),
        url: optionalString(candidate['url']),
      },
    ];
  });
}

function teamCredit(value: unknown): MuseumBoardSnapshotData['teamCredit'] {
  if (typeof value === 'string') return { displayName: value };
  if (!isRecord(value)) return { displayName: 'Project team' };
  return {
    displayName: stringValue(value['displayName']) || 'Project team',
    memberDisplayNames: Array.isArray(value['memberDisplayNames'])
      ? value['memberDisplayNames'].filter((item): item is string => typeof item === 'string')
      : undefined,
  };
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function optionalString(value: unknown): string | undefined {
  const result = stringValue(value);
  return result.length > 0 ? result : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
