import {
  boundedText,
  isMuseumAssignment,
  isPublishedMuseumRoom,
  isRecord,
  MuseumPublicationError,
  museumScopeKey,
  type MuseumPublicationAdapter,
  type MuseumPublicationScope,
  type MuseumPublicationSession,
  type MuseumRoomPublishRequest,
  type PublishedMuseumRoom,
} from '../../templates/exhibit-hall/rooms/museum-publication';

/** Same-origin host authentication; callers cannot select an actor or a role. */
export class HttpMuseumPublicationAdapter implements MuseumPublicationAdapter {
  constructor(
    private readonly baseUrl = '/api/museum',
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async openSession(scope: MuseumPublicationScope): Promise<MuseumPublicationSession> {
    const value = await this.request('/session' + this.query(scope));
    if (
      !isRecord(value) ||
      !isRecord(value['scope']) ||
      museumScopeKey(value['scope'] as unknown as MuseumPublicationScope) !==
        museumScopeKey(scope) ||
      !boundedText(value['actorId'], 180) ||
      !boundedText(value['teamId'], 120) ||
      !isMuseumAssignment(value['room']) ||
      typeof value['submissionLocked'] !== 'boolean' ||
      (value['publishedRoom'] !== undefined &&
        (!isPublishedMuseumRoom(value['publishedRoom']) ||
          value['publishedRoom'].teamId !== value['teamId'] ||
          value['publishedRoom'].room.roomId !== value['room'].roomId))
    ) {
      throw new MuseumPublicationError('INVALID_MUSEUM_RESPONSE');
    }
    return value as unknown as MuseumPublicationSession;
  }
  async publish(request: MuseumRoomPublishRequest): Promise<PublishedMuseumRoom> {
    const value = await this.request('/submissions', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    if (
      !isPublishedMuseumRoom(value) ||
      value.room.roomId !== request.content.roomId ||
      value.room.layoutId !== request.content.layoutId
    ) {
      throw new MuseumPublicationError('INVALID_MUSEUM_RESPONSE');
    }
    return value;
  }
  async loadCollection(scope: MuseumPublicationScope): Promise<readonly PublishedMuseumRoom[]> {
    const value = await this.request('/collection' + this.query(scope));
    if (
      !isRecord(value) ||
      !Array.isArray(value['rooms']) ||
      value['rooms'].length > 500 ||
      !value['rooms'].every(isPublishedMuseumRoom) ||
      new Set(value['rooms'].map((room) => room.room.roomId)).size !== value['rooms'].length
    ) {
      throw new MuseumPublicationError('INVALID_MUSEUM_RESPONSE');
    }
    return value['rooms'];
  }
  private query(scope: MuseumPublicationScope): string {
    return '?' + new URLSearchParams({ ...scope }).toString();
  }
  private async request(path: string, init: RequestInit = {}): Promise<unknown> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await this.fetcher(this.baseUrl + path, {
        ...init,
        credentials: 'same-origin',
        signal: controller.signal,
        headers: {
          accept: 'application/json',
          ...(init.body ? { 'content-type': 'application/json' } : {}),
        },
      });
      const value: unknown = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : undefined;
      if (!response.ok)
        throw new MuseumPublicationError(
          isRecord(value) && typeof value['error'] === 'string'
            ? value['error']
            : 'MUSEUM_UNAVAILABLE',
          response.status,
        );
      if (value === undefined)
        throw new MuseumPublicationError('MUSEUM_UNAVAILABLE', response.status);
      return value;
    } finally {
      clearTimeout(timeout);
    }
  }
}
