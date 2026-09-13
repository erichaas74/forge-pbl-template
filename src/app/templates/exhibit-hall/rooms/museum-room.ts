import type {
  ArtifactValidationResult,
  MuseumBoardObject,
  MuseumBoardSnapshotData,
  MuseumBoardSource,
} from '../domain/exhibit-types';

/** Teacher-owned assignment. Students never store room geometry or camera positions. */
export interface MuseumRoomAssignment {
  readonly roomId: string;
  readonly label: string;
  readonly layoutId: string;
}
export interface MuseumRoomData {
  readonly roomId: string;
  readonly layoutId: string;
  readonly placements: readonly { readonly slotId: string; readonly objectId: string }[];
}
export interface MuseumRoomCatalog {
  readonly objects: readonly MuseumBoardObject[];
  readonly sources: readonly MuseumBoardSource[];
}
export interface AssignedMuseumConfig {
  readonly rooms: readonly MuseumRoomAssignment[];
  readonly catalog: MuseumRoomCatalog;
}
export interface MuseumDisplaySlot {
  readonly id: string;
  readonly label: string;
  readonly position: readonly [number, number, number];
}
export interface MuseumRoomLayout {
  readonly id: string;
  readonly width: number;
  readonly depth: number;
  readonly height: number;
  readonly slots: readonly MuseumDisplaySlot[];
}

const classicRoom: MuseumRoomLayout = Object.freeze({
  id: 'classic-museum-room-v1',
  width: 12,
  depth: 12,
  height: 5.8,
  slots: Object.freeze([
    { id: 'display-1', label: 'Display 1', position: [-3.4, 0, -0.6] as const },
    { id: 'display-2', label: 'Display 2', position: [0, 0, -2.6] as const },
    { id: 'display-3', label: 'Display 3', position: [3.4, 0, -0.6] as const },
  ]),
});
/** Registered, versioned room designs. No layout picker is exposed to students. */
const layouts = new Map([[classicRoom.id, classicRoom]]);
export function museumRoomLayout(id: string): MuseumRoomLayout | undefined {
  return layouts.get(id);
}
export const DEFAULT_MUSEUM_ROOM_LAYOUT = classicRoom.id;

export function emptyMuseumRoom(
  room: MuseumRoomAssignment,
  credit: MuseumBoardSnapshotData['teamCredit'],
): MuseumBoardSnapshotData {
  return {
    title: '',
    centralClaim: '',
    objects: [],
    sources: [],
    teamCredit: credit,
    museumRoom: { roomId: room.roomId, layoutId: room.layoutId, placements: [] },
  };
}

export function furnishMuseumRoom(
  board: MuseumBoardSnapshotData,
  room: MuseumRoomAssignment,
): MuseumBoardSnapshotData {
  const layout = museumRoomLayout(room.layoutId);
  if (!layout)
    throw new Error('CAPABILITY_NOT_INSTALLED: The assigned museum room design is unavailable.');
  const { immersiveGallery: _gallery, videoPresentation: _video, ...content } = board;
  return {
    ...content,
    museumRoom: {
      roomId: room.roomId,
      layoutId: room.layoutId,
      placements: board.objects.map((object, index) => ({
        slotId: layout.slots[index]?.id ?? '',
        objectId: object.id,
      })),
    },
  };
}

export function isMuseumRoomData(value: unknown): value is MuseumRoomData {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  const layout =
    typeof data['layoutId'] === 'string' ? museumRoomLayout(data['layoutId']) : undefined;
  if (
    !layout ||
    typeof data['roomId'] !== 'string' ||
    !data['roomId'].trim() ||
    !Array.isArray(data['placements'])
  )
    return false;
  const slots = new Set<string>(),
    objects = new Set<string>();
  return (
    data['placements'].length <= layout.slots.length &&
    data['placements'].every((entry: unknown) => {
      if (!entry || typeof entry !== 'object') return false;
      const placement = entry as Record<string, unknown>;
      const slot = placement['slotId'],
        object = placement['objectId'];
      if (
        typeof slot !== 'string' ||
        typeof object !== 'string' ||
        !object.trim() ||
        !layout.slots.some((item) => item.id === slot) ||
        slots.has(slot) ||
        objects.has(object)
      )
        return false;
      slots.add(slot);
      objects.add(object);
      return true;
    })
  );
}

/** Bounds, ownership and references are checked before the runtime accepts a room mutation. */
export function placeMuseumObject(
  board: MuseumBoardSnapshotData,
  assignment: MuseumRoomAssignment,
  catalog: MuseumRoomCatalog,
  slotId: string,
  objectId?: string,
): MuseumBoardSnapshotData | undefined {
  const room = board.museumRoom;
  if (
    !room ||
    room.roomId !== assignment.roomId ||
    room.layoutId !== assignment.layoutId ||
    !isMuseumRoomData(room) ||
    !museumRoomLayout(room.layoutId)?.slots.some((slot) => slot.id === slotId)
  )
    return undefined;
  const item =
    objectId === undefined ? undefined : catalog.objects.find((object) => object.id === objectId);
  if (objectId !== undefined && !item) return undefined;
  if (
    item &&
    room.placements.some(
      (placement) => placement.objectId === item.id && placement.slotId !== slotId,
    )
  )
    return undefined;
  if (room.placements.find((placement) => placement.slotId === slotId)?.objectId === objectId)
    return board;
  const placements = room.placements.filter((placement) => placement.slotId !== slotId);
  if (item) placements.push({ slotId, objectId: item.id });
  const objects = board.objects.filter((object) =>
    placements.some((placement) => placement.objectId === object.id),
  );
  if (item && !objects.some((object) => object.id === item.id))
    objects.push({ ...structuredClone(item), description: '', evidenceConnection: '' });
  const sourceIds = new Set(objects.flatMap((object) => object.sourceIds));
  const sourcePool = new Map(
    [...catalog.sources, ...board.sources].map((source) => [source.id, source]),
  );
  return {
    ...board,
    objects,
    sources: [...sourcePool.values()].filter((source) => sourceIds.has(source.id)),
    museumRoom: { ...room, placements },
  };
}

export function validateMuseumRoom(
  board: MuseumBoardSnapshotData,
  assignment?: MuseumRoomAssignment,
): ArtifactValidationResult['errors'] {
  const errors: { fieldId: string; message: string }[] = [];
  const room = board.museumRoom;
  if (!isMuseumRoomData(room))
    return [
      { fieldId: 'museum-room', message: 'The assigned room or its display spots are invalid.' },
    ];
  if (assignment && (assignment.roomId !== room.roomId || assignment.layoutId !== room.layoutId))
    errors.push({ fieldId: 'museum-room', message: 'You can submit only your assigned room.' });
  if (
    new Set(board.objects.map((object) => object.id)).size !== board.objects.length ||
    room.placements.length !== board.objects.length ||
    room.placements.some(
      (placement) => !board.objects.some((object) => object.id === placement.objectId),
    )
  )
    errors.push({
      fieldId: 'museum-room',
      message: 'Every artifact must occupy one display spot in your room.',
    });
  for (const object of board.objects) {
    if (!object.title.trim() || !object.description.trim() || !object.evidenceConnection.trim())
      errors.push({
        fieldId: object.id,
        message: `Finish the label and “Why it matters” for ${object.title || 'each artifact'}.`,
      });
    if (
      !object.sourceIds.length ||
      object.sourceIds.some(
        (id) => !board.sources.some((source) => source.id === id && source.citation.trim()),
      )
    )
      errors.push({ fieldId: object.id, message: `Add the source credit for ${object.title}.` });
  }
  return errors;
}
