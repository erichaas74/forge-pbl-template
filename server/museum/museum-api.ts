import {
  boundedText,
  isRecord,
  type MuseumRoomContent,
  type PublishedMuseumRoom,
} from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import type { AssignedMuseumConfig } from '../../src/app/templates/exhibit-hall/rooms/museum-room';
import {
  MuseumApiError,
  createPublishedBoard,
  parseMuseumContent,
  parseMuseumScope,
} from './museum-policy';
import { MuseumRepository, type MuseumDatabase } from './museum-repository';

export interface MuseumApiDependencies {
  readonly db: MuseumDatabase;
  /** Must be resolved by a trusted ingress, never by a request body/query actor ID. */
  readonly authenticate: (request: Request) => Promise<string> | string;
  readonly policies: ReadonlyMap<string, AssignedMuseumConfig>;
}
export async function handleMuseumRequest(
  request: Request,
  dependencies: MuseumApiDependencies,
): Promise<Response> {
  try {
    const actorId = await dependencies.authenticate(request);
    if (!boundedText(actorId, 180)) throw new MuseumApiError(401, 'AUTHENTICATION_REQUIRED');
    const url = new URL(request.url);
    const path = url.pathname.slice('/api/museum'.length);
    if (!(
      (request.method === 'GET' && ['/session', '/collection'].includes(path)) ||
      (request.method === 'POST' && path === '/submissions')
    ))
      throw new MuseumApiError(404, 'MUSEUM_API_NOT_FOUND');
    if (
      request.method === 'POST' &&
      request.headers.get('origin') &&
      request.headers.get('origin') !== url.origin
    )
      throw new MuseumApiError(403, 'MUSEUM_ORIGIN_DENIED');
    let content: MuseumRoomContent | undefined, operationId: string | undefined;
    const body =
      request.method === 'POST' ? await readBody(request) : Object.fromEntries(url.searchParams);
    const scope = parseMuseumScope(request.method === 'POST' ? body['scope'] : body);
    const policy = dependencies.policies.get(
      JSON.stringify([scope.projectId, scope.projectVersion]),
    );
    if (!policy) throw new MuseumApiError(422, 'MUSEUM_PROJECT_UNAVAILABLE');
    const repository = new MuseumRepository(dependencies.db);
    const enrollment = await repository.enrollment(scope, actorId);
    const room = policy.rooms.find(
      (item) => item.roomId === enrollment.room_id && item.layoutId === enrollment.layout_id,
    );
    if (!room) throw new MuseumApiError(409, 'MUSEUM_ASSIGNMENT_UNAVAILABLE');
    const assignment = { ...room, label: enrollment.room_label };
    if (path === '/session') {
      const saved = await repository.own(scope, room.roomId);
      return json({
        scope,
        actorId,
        teamId: enrollment.team_id,
        room: assignment,
        submissionLocked: enrollment.submission_locked !== 0 || enrollment.role !== 'student',
        ...(saved ? { publishedRoom: JSON.parse(saved.publication_json) } : {}),
      });
    }
    if (path === '/collection') {
      if (!enrollment.collection_open) throw new MuseumApiError(403, 'MUSEUM_NOT_OPEN');
      return json({ rooms: await repository.collection(scope) });
    }
    if (enrollment.role !== 'student') throw new MuseumApiError(403, 'MUSEUM_SUBMISSION_DENIED');
    if (!boundedText(body['operationId'], 180))
      throw new MuseumApiError(400, 'MUSEUM_OPERATION_REQUIRED');
    operationId = body['operationId'];
    content = parseMuseumContent(body['content']);
    const board = createPublishedBoard(
      content,
      assignment,
      policy.catalog,
      enrollment.curator_name,
    );
    const hashBytes = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(JSON.stringify(board)),
    );
    const contentHash = Array.from(new Uint8Array(hashBytes), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('');
    const publication: PublishedMuseumRoom = {
      id: crypto.randomUUID(),
      room: assignment,
      position: enrollment.position,
      teamId: enrollment.team_id,
      submittedAt: new Date().toISOString(),
      board,
    };
    return json(await repository.publish(scope, actorId, operationId, contentHash, publication));
  } catch (error) {
    if (error instanceof MuseumApiError) return json({ error: error.code }, error.status);
    return json({ error: 'MUSEUM_SERVICE_UNAVAILABLE' }, 503);
  }
}
async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get('content-type')?.includes('application/json'))
    throw new MuseumApiError(415, 'MUSEUM_JSON_REQUIRED');
  const reader = request.body?.getReader();
  if (!reader) throw new MuseumApiError(400, 'MUSEUM_BODY_REQUIRED');
  const decoder = new TextDecoder();
  let text = '',
    bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 32_768) {
        await reader.cancel();
        throw new MuseumApiError(413, 'MUSEUM_REQUEST_TOO_LARGE');
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    const value: unknown = JSON.parse(text);
    if (!isRecord(value)) throw new Error();
    return value;
  } catch (error) {
    if (error instanceof MuseumApiError) throw error;
    throw new MuseumApiError(400, 'INVALID_MUSEUM_REQUEST');
  } finally {
    reader.releaseLock();
  }
}
function json(value: unknown, status = 200): Response {
  return Response.json(value, {
    status,
    headers: { 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' },
  });
}
