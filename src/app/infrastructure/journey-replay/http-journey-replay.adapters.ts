import { distinctUntilChanged, from, Observable, shareReplay, switchMap, timer } from 'rxjs';

import type { AssetStorageAdapter, AssetUploadInput, StoredAsset } from '../../core/state/persistence-contracts';
import type {
  JourneyAuthoritySession,
  JourneyClassSummary,
  JourneyEnrollment,
  JourneySubmission,
} from '../../templates/journey-replay/domain/journey-replay.models';
import type {
  AuthoritativeJourneyRecord,
  JourneyAuthorityLocator,
  JourneyRecordSaveRequest,
  JourneyReplayAuthorityAdapter,
  JourneySubmissionRequest,
  JourneySubmissionReviewRequest,
} from '../../templates/journey-replay/persistence/journey-replay.authority';

export class JourneyAuthorityHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message);
  }
}

export class HttpJourneyReplayAuthorityAdapter implements JourneyReplayAuthorityAdapter {
  constructor(
    private readonly baseUrl = '/api/journey',
    private readonly fetcher: typeof fetch = fetch,
    private readonly pollIntervalMs = 4_000,
  ) {}

  openSession(
    locator: JourneyAuthorityLocator,
    enrollmentHint: JourneyEnrollment,
  ): Promise<JourneyAuthoritySession> {
    return this.request<JourneyAuthoritySession>('/session', {
      method: 'POST',
      body: JSON.stringify({ locator, studentDisplayName: enrollmentHint.studentDisplayName }),
    });
  }

  async loadRecord(locator: JourneyAuthorityLocator): Promise<AuthoritativeJourneyRecord | undefined> {
    try {
      return await this.request<AuthoritativeJourneyRecord>(`/record${locatorQuery(locator)}`);
    } catch (error) {
      if (error instanceof JourneyAuthorityHttpError && error.status === 404) return undefined;
      throw error;
    }
  }

  saveRecord(request: JourneyRecordSaveRequest): Promise<AuthoritativeJourneyRecord> {
    return this.request<AuthoritativeJourneyRecord>('/record', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async loadSubmission(locator: JourneyAuthorityLocator): Promise<JourneySubmission | undefined> {
    try {
      return await this.request<JourneySubmission>(`/submission${locatorQuery(locator)}`);
    } catch (error) {
      if (error instanceof JourneyAuthorityHttpError && error.status === 404) return undefined;
      throw error;
    }
  }

  submitJourney(request: JourneySubmissionRequest): Promise<JourneySubmission> {
    return this.request<JourneySubmission>('/submission', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  reviewSubmission(request: JourneySubmissionReviewRequest): Promise<JourneySubmission> {
    return this.request<JourneySubmission>(`/submissions/${encodeURIComponent(request.submissionId)}/review`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  classSummary(locator: JourneyAuthorityLocator): Observable<JourneyClassSummary> {
    return timer(0, this.pollIntervalMs).pipe(
      switchMap(() => from(this.request<JourneyClassSummary>(`/class-summary${locatorQuery(locator)}`))),
      distinctUntilChanged((previous, next) => previous.revision === next.revision),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (init.body !== undefined && !(init.body instanceof FormData)) headers.set('content-type', 'application/json');
    headers.set('accept', 'application/json');
    const response = await this.fetcher(`${this.baseUrl}${path}`, {
      ...init,
      headers,
      credentials: 'same-origin',
    });
    const body = await responseBody(response);
    if (!response.ok) {
      const message = isErrorBody(body) ? body.error : `JOURNEY_AUTHORITY_HTTP_${response.status}`;
      throw new JourneyAuthorityHttpError(response.status, message, body);
    }
    return body as T;
  }
}

export class HttpJourneyReplayMediaAdapter implements AssetStorageAdapter {
  private readonly localAssetIds = new Set<string>();

  constructor(
    private readonly locator: JourneyAuthorityLocator,
    private readonly fallback?: AssetStorageAdapter,
    private readonly baseUrl = '/api/journey',
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async upload(input: AssetUploadInput): Promise<StoredAsset> {
    const data = new FormData();
    data.set('file', input.file, input.fileName);
    data.set('locator', JSON.stringify(this.locator));
    data.set('metadata', JSON.stringify(input.metadata ?? {}));
    try {
      const response = await this.fetcher(`${this.baseUrl}/media`, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: { accept: 'application/json' },
      });
      const body = await responseBody(response);
      if (!response.ok) {
        const message = isErrorBody(body) ? body.error : `JOURNEY_MEDIA_HTTP_${response.status}`;
        throw new JourneyAuthorityHttpError(response.status, message, body);
      }
      return body as StoredAsset;
    } catch (error) {
      if (this.fallback !== undefined && isLocalApiUnavailable(error)) {
        const asset = await this.fallback.upload(input);
        this.localAssetIds.add(asset.id);
        return asset;
      }
      throw error;
    }
  }

  async getReference(assetId: string): Promise<StoredAsset> {
    if (this.localAssetIds.has(assetId) && this.fallback !== undefined) {
      return this.fallback.getReference(assetId);
    }
    return {
      id: assetId,
      reference: `${this.baseUrl}/media/${encodeURIComponent(assetId)}`,
    };
  }
}

function locatorQuery(locator: JourneyAuthorityLocator): string {
  const params = new URLSearchParams({
    tenantId: locator.tenantId,
    classId: locator.classId,
    classLabel: locator.classLabel,
    projectId: locator.projectId,
    projectVersion: locator.projectVersion,
  });
  return `?${params.toString()}`;
}

async function responseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return undefined;
  return response.json();
}

function isErrorBody(value: unknown): value is { readonly error: string } {
  return typeof value === 'object' && value !== null && 'error' in value && typeof value.error === 'string';
}

function isLocalApiUnavailable(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof JourneyAuthorityHttpError && (error.status === 404 || error.status === 405))
  );
}
