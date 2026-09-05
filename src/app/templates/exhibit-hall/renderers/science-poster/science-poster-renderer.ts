import type {
  AccessibleExhibit,
  ExhibitRenderResult,
  ExhibitRenderer,
} from '../../domain/exhibit-types';

export interface SciencePosterSnapshotData {
  readonly title: string;
  readonly question: string;
  readonly method: string;
  readonly finding: string;
  readonly limitation: string;
}

/** Small second renderer fixture proving the hall shell is project-type agnostic. */
export class SciencePosterRenderer implements ExhibitRenderer {
  readonly type = 'science-poster-demo';
  readonly version = 1;

  renderPreview(data: unknown): ExhibitRenderResult {
    return this.result(this.read(data));
  }

  renderWalkUp(data: unknown): ExhibitRenderResult {
    return this.result(this.read(data));
  }

  renderThumbnail(data: unknown): ExhibitRenderResult {
    return this.result(this.read(data));
  }

  renderAccessible(data: unknown): AccessibleExhibit {
    const poster = this.read(data);
    return {
      title: poster.title,
      summary: poster.finding,
      sections: [
        { heading: 'Research question', body: poster.question },
        { heading: 'Method', body: poster.method },
        { heading: 'Finding', body: poster.finding },
        { heading: 'Limitation', body: poster.limitation },
      ],
    };
  }

  private result(poster: SciencePosterSnapshotData): ExhibitRenderResult {
    return {
      title: poster.title,
      summary: poster.finding,
      itemCount: 4,
      readingTimeMinutes: 1,
    };
  }

  private read(data: unknown): SciencePosterSnapshotData {
    if (
      typeof data !== 'object' ||
      data === null ||
      !('title' in data) ||
      !('question' in data) ||
      !('method' in data) ||
      !('finding' in data) ||
      !('limitation' in data) ||
      typeof data.title !== 'string' ||
      typeof data.question !== 'string' ||
      typeof data.method !== 'string' ||
      typeof data.finding !== 'string' ||
      typeof data.limitation !== 'string'
    ) {
      throw new Error('Science poster renderer received an incompatible snapshot.');
    }
    return data as SciencePosterSnapshotData;
  }
}
