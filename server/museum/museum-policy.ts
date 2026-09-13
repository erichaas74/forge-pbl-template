import type { MuseumBoardSnapshotData } from '../../src/app/templates/exhibit-hall/domain/exhibit-types';
import {
  boundedText,
  isRecord,
  type MuseumPublicationScope,
  type MuseumRoomContent,
} from '../../src/app/templates/exhibit-hall/rooms/museum-publication';
import {
  emptyMuseumRoom,
  placeMuseumObject,
  validateMuseumRoom,
  type AssignedMuseumConfig,
  type MuseumRoomAssignment,
} from '../../src/app/templates/exhibit-hall/rooms/museum-room';

export class MuseumApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}
export function parseMuseumScope(value: unknown): MuseumPublicationScope {
  if (
    !isRecord(value) ||
    !['tenantId', 'classId', 'projectId', 'projectVersion', 'museumId'].every((key) =>
      boundedText(value[key], 120),
    )
  ) {
    throw new MuseumApiError(400, 'INVALID_MUSEUM_SCOPE');
  }
  return {
    tenantId: value['tenantId'] as string,
    classId: value['classId'] as string,
    projectId: value['projectId'] as string,
    projectVersion: value['projectVersion'] as string,
    museumId: value['museumId'] as string,
  };
}
export function parseMuseumContent(value: unknown): MuseumRoomContent {
  if (
    !isRecord(value) ||
    !boundedText(value['roomId'], 120) ||
    !boundedText(value['layoutId'], 120) ||
    !boundedText(value['title'], 160) ||
    !boundedText(value['introduction'], 700) ||
    words(value['title']) > 12 ||
    words(value['introduction']) > 60 ||
    !Array.isArray(value['displays']) ||
    value['displays'].length < 1 ||
    value['displays'].length > 3 ||
    !value['displays'].every(
      (item) =>
        isRecord(item) &&
        boundedText(item['slotId'], 120) &&
        boundedText(item['objectId'], 120) &&
        boundedText(item['title'], 120) &&
        boundedText(item['label'], 1000) &&
        boundedText(item['connection'], 1000),
    )
  ) {
    throw new MuseumApiError(422, 'MUSEUM_LABELS_INCOMPLETE');
  }
  return value as unknown as MuseumRoomContent;
}
/** Canonical assets, source credit and curator identity come from server-owned records. */
export function createPublishedBoard(
  content: MuseumRoomContent,
  room: MuseumRoomAssignment,
  catalog: AssignedMuseumConfig['catalog'],
  curator: string,
): MuseumBoardSnapshotData {
  if (room.roomId !== content.roomId || room.layoutId !== content.layoutId)
    throw new MuseumApiError(403, 'MUSEUM_ROOM_NOT_ASSIGNED');
  const slots = new Set<string>(),
    objects = new Set<string>();
  let board = emptyMuseumRoom(room, { displayName: curator });
  for (const display of content.displays) {
    if (slots.has(display.slotId) || objects.has(display.objectId))
      throw new MuseumApiError(422, 'INVALID_MUSEUM_DISPLAY');
    slots.add(display.slotId);
    objects.add(display.objectId);
    const placed = placeMuseumObject(board, room, catalog, display.slotId, display.objectId);
    if (!placed) throw new MuseumApiError(422, 'INVALID_MUSEUM_DISPLAY');
    board = {
      ...placed,
      objects: placed.objects.map((object) =>
        object.id === display.objectId
          ? {
              ...object,
              title: display.title.trim(),
              description: display.label.trim(),
              evidenceConnection: display.connection.trim(),
            }
          : object,
      ),
    };
  }
  board = { ...board, title: content.title.trim(), centralClaim: content.introduction.trim() };
  if (validateMuseumRoom(board, room).length)
    throw new MuseumApiError(422, 'INVALID_MUSEUM_DISPLAY');
  return board;
}
function words(value: string): number {
  return value.trim().split(/\s+/).length;
}
