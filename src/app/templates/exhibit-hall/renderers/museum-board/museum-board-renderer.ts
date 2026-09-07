import type {
  AccessibleExhibit,
  ExhibitRenderResult,
  ExhibitRenderer,
  MuseumBoardSnapshotData,
  PrintRenderResult,
} from '../../domain/exhibit-types';
import { parseMetaStepsEmbed } from '../metasteps/metasteps-embed';
import { parsePresentationVideo } from '../video/presentation-video';
import { isExhibitObjectModel } from '../../../../shared/media/object-model';

export class MuseumBoardRenderer implements ExhibitRenderer {
  readonly type = 'museum-board-v1';
  readonly version = 1;

  renderPreview(data: unknown): ExhibitRenderResult {
    return renderResult(assertMuseumBoard(data));
  }

  renderWalkUp(data: unknown): ExhibitRenderResult {
    return renderResult(assertMuseumBoard(data));
  }

  renderThumbnail(data: unknown): ExhibitRenderResult {
    return renderResult(assertMuseumBoard(data));
  }

  renderAccessible(data: unknown): AccessibleExhibit {
    const board = assertMuseumBoard(data);
    const sourcesById = new Map(board.sources.map((source) => [source.id, source]));
    const gallery = board.immersiveGallery;
    const galleryUrl = parseMetaStepsEmbed(gallery?.embedUrl ?? '').normalizedUrl;
    const video = board.videoPresentation;
    const videoUrl = parsePresentationVideo(video?.videoUrl ?? '').normalizedUrl;
    return {
      title: board.title,
      summary: board.centralClaim,
      sections: [
        {
          heading: 'Central claim',
          body: board.centralClaim,
        },
        ...board.objects.map((object) => ({
          heading: object.title,
          body: `${object.description} ${object.evidenceConnection}`.trim(),
          sourceLinks: object.sourceIds.flatMap((sourceId) => {
            const source = sourcesById.get(sourceId);
            return source?.url === undefined ? [] : [{ label: source.citation, url: source.url }];
          }),
        })),
        {
          heading: 'Sources',
          body: board.sources.map((source) => source.citation).join(' '),
          sourceLinks: board.sources.flatMap((source) =>
            source.url === undefined ? [] : [{ label: source.citation, url: source.url }],
          ),
        },
        ...(gallery !== undefined && galleryUrl !== undefined
          ? [
              {
                heading: `Immersive gallery: ${gallery.title}`,
                body: 'Open the team’s interactive 3D MetaSteps gallery in a new browser window.',
                sourceLinks: [{ label: `Open ${gallery.title}`, url: galleryUrl }],
              },
            ]
          : []),
        ...(video?.prototype
          ? [
              {
                heading: `Prototype curator video: ${video.title}`,
                body: 'This prototype station represents the student or group’s recorded artifact presentation.',
              },
            ]
          : video !== undefined && videoUrl !== undefined
            ? [
                {
                  heading: `Curator video: ${video.title}`,
                  body: 'Watch the student or group explain the researched artifact collection.',
                  sourceLinks: [{ label: `Open ${video.title}`, url: videoUrl }],
                },
              ]
            : []),
        {
          heading: 'Team credit',
          body: board.teamCredit.displayName,
        },
      ],
    };
  }

  renderPrint(data: unknown): PrintRenderResult {
    const board = assertMuseumBoard(data);
    return { title: board.title, accessible: this.renderAccessible(board) };
  }
}

export function isMuseumBoardSnapshotData(data: unknown): data is MuseumBoardSnapshotData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'title' in data &&
    typeof data.title === 'string' &&
    'centralClaim' in data &&
    typeof data.centralClaim === 'string' &&
    'objects' in data &&
    Array.isArray(data.objects) &&
    data.objects.every(
      (object) =>
        typeof object === 'object' &&
        object !== null &&
        (object.model === undefined || isExhibitObjectModel(object.model)),
    ) &&
    'sources' in data &&
    Array.isArray(data.sources) &&
    'teamCredit' in data &&
    typeof data.teamCredit === 'object' &&
    data.teamCredit !== null
  );
}

function assertMuseumBoard(data: unknown): MuseumBoardSnapshotData {
  if (!isMuseumBoardSnapshotData(data)) {
    throw new Error('Museum board renderer received an incompatible snapshot.');
  }
  return data;
}

function renderResult(data: MuseumBoardSnapshotData): ExhibitRenderResult {
  const words = `${data.centralClaim} ${data.objects
    .map((object) => `${object.description} ${object.evidenceConnection}`)
    .join(' ')}`
    .trim()
    .split(/\s+/u).length;
  return {
    title: data.title,
    summary: data.centralClaim,
    itemCount:
      data.objects.length +
      (data.immersiveGallery === undefined ? 0 : 1) +
      (data.videoPresentation === undefined ? 0 : 1),
    readingTimeMinutes: Math.max(1, Math.ceil(words / 180)),
  };
}
