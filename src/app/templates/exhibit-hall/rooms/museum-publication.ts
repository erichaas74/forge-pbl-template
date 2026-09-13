import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';
import { isExhibitDraft } from '../persistence/exhibit-draft-validation';
import { museumRoomLayout, validateMuseumRoom, type MuseumRoomAssignment } from './museum-room';

export interface MuseumPublicationScope {
  readonly tenantId: string;
  readonly classId: string;
  readonly projectId: string;
  readonly projectVersion: string;
  /** A class-wide museum instance, shared by all assigned curators. */
  readonly museumId: string;
}
export interface MuseumRoomContent {
  readonly roomId: string;
  readonly layoutId: string;
  readonly title: string;
  readonly introduction: string;
  readonly displays: readonly {
    readonly slotId: string;
    readonly objectId: string;
    readonly title: string;
    readonly label: string;
    readonly connection: string;
  }[];
}
export interface PublishedMuseumRoom {
  readonly id: string;
  readonly room: MuseumRoomAssignment;
  readonly position: number;
  readonly teamId: string;
  readonly submittedAt: string;
  readonly board: MuseumBoardSnapshotData;
}
export interface MuseumPublicationSession {
  readonly scope: MuseumPublicationScope;
  readonly actorId: string;
  readonly teamId: string;
  readonly room: MuseumRoomAssignment;
  readonly submissionLocked: boolean;
  readonly publishedRoom?: PublishedMuseumRoom;
}
export interface MuseumRoomPublishRequest {
  readonly scope: MuseumPublicationScope;
  readonly operationId: string;
  readonly content: MuseumRoomContent;
}
export interface MuseumPublicationAdapter {
  openSession(scope: MuseumPublicationScope): Promise<MuseumPublicationSession>;
  publish(request: MuseumRoomPublishRequest): Promise<PublishedMuseumRoom>;
  loadCollection(scope: MuseumPublicationScope): Promise<readonly PublishedMuseumRoom[]>;
}
export class MuseumPublicationError extends Error {
  constructor(
    readonly code: string,
    readonly status = 0,
  ) {
    super(code);
  }
}
export function museumScopeKey(scope: MuseumPublicationScope): string {
  return JSON.stringify([
    scope.tenantId,
    scope.classId,
    scope.projectId,
    scope.projectVersion,
    scope.museumId,
  ]);
}
export function museumRoomContent(board: MuseumBoardSnapshotData): MuseumRoomContent {
  return {
    roomId: board.museumRoom?.roomId ?? '',
    layoutId: board.museumRoom?.layoutId ?? '',
    title: board.title,
    introduction: board.centralClaim,
    displays: (board.museumRoom?.placements ?? []).map((placement) => {
      const object = board.objects.find((item) => item.id === placement.objectId);
      return {
        ...placement,
        title: object?.title ?? '',
        label: object?.description ?? '',
        connection: object?.evidenceConnection ?? '',
      };
    }),
  };
}
export function isMuseumAssignment(value: unknown): value is MuseumRoomAssignment {
  return (
    isRecord(value) &&
    boundedText(value['roomId'], 120) &&
    boundedText(value['label'], 160) &&
    typeof value['layoutId'] === 'string' &&
    !!museumRoomLayout(value['layoutId'])
  );
}
export function isPublishedMuseumRoom(value: unknown): value is PublishedMuseumRoom {
  return (
    isRecord(value) &&
    boundedText(value['id'], 180) &&
    isMuseumAssignment(value['room']) &&
    boundedText(value['teamId'], 120) &&
    boundedText(value['submittedAt'], 40) &&
    Number.isFinite(Date.parse(value['submittedAt'])) &&
    Number.isInteger(value['position']) &&
    (value['position'] as number) >= 0 &&
    (value['position'] as number) < 500 &&
    isExhibitDraft(value['board']) &&
    validateMuseumRoom(value['board'], value['room']).length === 0 &&
    value['board'].objects.length > 0 &&
    value['board'].objects.length <= 3 &&
    boundedText(value['board'].title, 160) &&
    boundedText(value['board'].centralClaim, 700)
  );
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function boundedText(value: unknown, length: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= length;
}
