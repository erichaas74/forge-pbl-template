import { studentMuseumConfig } from '../../../projects/class-exhibit-hall/student-museum.config';
import {
  emptyMuseumRoom,
  isMuseumRoomData,
  placeMuseumObject,
  validateMuseumRoom,
} from './museum-room';
import { isExhibitDraft } from '../persistence/exhibit-draft-validation';
import {
  MuseumBoardAdapter,
  validateMuseumBoard,
} from '../renderers/museum-board/museum-board-adapter';
import { museumRoomTemplate } from './museum-room-template';
import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';

describe('assigned museum room contents', () => {
  const museum = studentMuseumConfig.museum!;
  const room = museum.rooms[0];
  const empty = () => emptyMuseumRoom(room, { displayName: 'Curators' });
  it('places an artifact in a fixed spot without copying teacher labels or mutating the catalog', () => {
    const before = structuredClone(museum);
    const board = placeMuseumObject(empty(), room, museum.catalog, 'display-1', 'nefertiti')!;
    expect(board.museumRoom?.placements).toEqual([{ slotId: 'display-1', objectId: 'nefertiti' }]);
    expect(board.objects[0].description).toBe('');
    expect(board.objects[0].model).toEqual(museum.catalog.objects[0].model);
    expect(board.sources[0].url).toBe(museum.catalog.objects[0].model?.sourceUrl);
    expect(museum).toEqual(before);
    expect(isExhibitDraft(board)).toBe(true);
    expect(validateMuseumBoard(museumRoomTemplate, board).valid).toBe(false);
  });
  it('rejects unknown spots, another assigned room, unknown artifacts, and duplicate objects', () => {
    const board = placeMuseumObject(empty(), room, museum.catalog, 'display-1', 'nefertiti')!;
    expect(placeMuseumObject(board, room, museum.catalog, 'door', 'temple')).toBeUndefined();
    expect(
      placeMuseumObject(board, museum.rooms[1], museum.catalog, 'display-2', 'temple'),
    ).toBeUndefined();
    expect(placeMuseumObject(board, room, museum.catalog, 'display-2', 'unknown')).toBeUndefined();
    expect(
      placeMuseumObject(board, room, museum.catalog, 'display-2', 'nefertiti'),
    ).toBeUndefined();
    expect(
      validateMuseumRoom(board, museum.rooms[1]).some((error) =>
        error.message.includes('assigned room'),
      ),
    ).toBe(true);
  });
  it('replaces and removes exhibits with their unreferenced sources', () => {
    const first = placeMuseumObject(empty(), room, museum.catalog, 'display-1', 'nefertiti')!;
    const second = placeMuseumObject(first, room, museum.catalog, 'display-2', 'coffin')!;
    const changed = placeMuseumObject(second, room, museum.catalog, 'display-1', 'temple')!;
    expect(changed.objects.map((object) => object.id).sort()).toEqual(['coffin', 'temple']);
    expect(changed.sources.map((source) => source.id).sort()).toEqual([
      'coffin-model',
      'temple-model',
    ]);
    const removed = placeMuseumObject(changed, room, museum.catalog, 'display-2')!;
    expect(removed.objects.map((object) => object.id)).toEqual(['temple']);
    expect(removed.sources.map((source) => source.id)).toEqual(['temple-model']);
    expect(first.objects.map((object) => object.id)).toEqual(['nefertiti']);
  });
  it('rejects corrupt saved placements and dangling references while accepting incomplete drafts', () => {
    const board = placeMuseumObject(empty(), room, museum.catalog, 'display-1', 'nefertiti')!;
    const placement = board.museumRoom!.placements[0];
    expect(isMuseumRoomData({ ...board.museumRoom, placements: [placement, placement] })).toBe(
      false,
    );
    expect(isMuseumRoomData({ ...board.museumRoom, layoutId: 'custom-layout' })).toBe(false);
    expect(isExhibitDraft({ ...board, objects: [] })).toBe(false);
    expect(isExhibitDraft(empty())).toBe(true);
  });
  it('preserves a native room through the approved notebook adapter and keeps publication requirements', () => {
    const board = studentMuseumConfig.seedBoards[0].data;
    const result = new MuseumBoardAdapter(undefined, museumRoomTemplate).compose({
      projectInstanceId: 'sample',
      teamId: 'sample',
      slots: {
        'exhibit-title': board.title,
        'central-claim': board.centralClaim,
        'selected-objects': board.objects,
        'source-list': board.sources,
        'team-credit': board.teamCredit,
        'museum-room': board.museumRoom,
      },
    });
    expect(result.validation.valid).toBe(true);
    expect(result.data?.museumRoom).toEqual(board.museumRoom);
    expect(result.data?.museumRoom).not.toBe(board.museumRoom);
    expect(validateMuseumBoard(museumRoomTemplate, { ...board, museumRoom: undefined }).valid).toBe(
      false,
    );
    expect(
      validateMuseumBoard(museumRoomTemplate, {
        ...board,
        objects: board.objects.map((object) => ({ ...object, description: '' })),
      }).valid,
    ).toBe(false);
  });
  it('uses the same room capability for a different subject collection', () => {
    const science: MuseumBoardSnapshotData = {
      ...studentMuseumConfig.seedBoards[0].data,
      title: 'Materials under the microscope',
      centralClaim: 'Surface structure changes how materials behave.',
      objects: studentMuseumConfig.seedBoards[0].data.objects.map((object, index) => ({
        ...object,
        title: `Material sample ${index + 1}`,
        description: 'The surface has repeating ridges.',
        evidenceConnection: 'Ridges change the area in contact with another surface.',
      })),
    };
    expect(validateMuseumBoard(museumRoomTemplate, science).valid).toBe(true);
  });
});
