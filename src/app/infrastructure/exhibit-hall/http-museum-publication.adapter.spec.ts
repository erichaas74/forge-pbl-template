import { HttpMuseumPublicationAdapter } from './http-museum-publication.adapter';
import { studentMuseumConfig as config } from '../../projects/class-exhibit-hall/student-museum.config';
import { museumRoomContent } from '../../templates/exhibit-hall/rooms/museum-publication';

describe('museum HTTP publication contract', () => {
  const scope = {
    tenantId: 'school',
    classId: 'class',
    projectId: config.projectId,
    projectVersion: config.projectVersion,
    museumId: 'museum',
  };
  const board = config.seedBoards[0].data;
  const published = {
    id: 'receipt-1',
    room: config.museum!.rooms[0],
    position: 0,
    teamId: config.viewer.teamId,
    submittedAt: '2026-09-13T12:00:00Z',
    board,
  };
  const session = {
    scope,
    actorId: 'student',
    teamId: published.teamId,
    room: published.room,
    submissionLocked: false,
    publishedRoom: published,
  };
  it('uses same-origin credentials and sends content references without client identity or asset records', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json(published));
    const adapter = new HttpMuseumPublicationAdapter('/api/museum', fetcher);
    expect(
      await adapter.publish({ scope, operationId: 'request', content: museumRoomContent(board) }),
    ).toEqual(published);
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toBe('/api/museum/submissions');
    expect(options.credentials).toBe('same-origin');
    const body = JSON.parse(options.body);
    expect(body.actorId).toBeUndefined();
    expect(body.content.objects).toBeUndefined();
    expect(body.content.displays).toHaveLength(board.objects.length);
  });
  it('validates restored session scope and rejects mismatched publications', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(Response.json(session))
      .mockResolvedValueOnce(Response.json({ ...session, scope: { ...scope, classId: 'other' } }))
      .mockResolvedValueOnce(Response.json({ ...published, room: config.museum!.rooms[1] }));
    const adapter = new HttpMuseumPublicationAdapter('/api/museum', fetcher);
    expect(await adapter.openSession(scope)).toEqual(session);
    await expect(adapter.openSession(scope)).rejects.toMatchObject({
      code: 'INVALID_MUSEUM_RESPONSE',
    });
    await expect(
      adapter.publish({ scope, operationId: 'request', content: museumRoomContent(board) }),
    ).rejects.toMatchObject({ code: 'INVALID_MUSEUM_RESPONSE' });
  });
  it('rejects HTML, malformed collections and duplicate room receipts without a local fallback', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(new Response('<html>App fallback</html>'))
      .mockResolvedValueOnce(Response.json({ rooms: [published, published] }))
      .mockResolvedValueOnce(Response.json({ rooms: [{ id: 'bad' }] }))
      .mockResolvedValueOnce(Response.json({ error: 'MUSEUM_NOT_OPEN' }, { status: 403 }));
    const adapter = new HttpMuseumPublicationAdapter('/api/museum', fetcher);
    await expect(adapter.openSession(scope)).rejects.toMatchObject({ code: 'MUSEUM_UNAVAILABLE' });
    await expect(adapter.loadCollection(scope)).rejects.toMatchObject({
      code: 'INVALID_MUSEUM_RESPONSE',
    });
    await expect(adapter.loadCollection(scope)).rejects.toMatchObject({
      code: 'INVALID_MUSEUM_RESPONSE',
    });
    await expect(adapter.loadCollection(scope)).rejects.toMatchObject({
      code: 'MUSEUM_NOT_OPEN',
      status: 403,
    });
  });
});
